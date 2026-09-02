/*
# DigiCon Schema — Part 2: Relationships, Follow-ups, Opportunities, Interactions, Blog

## New Tables
- relationships: links contacts to relationship metadata (status, interest, health, opportunity value)
- relationship_interactions: log of interactions per relationship
- follow_ups: tasks/reminders with due dates and status
- opportunities: pipeline deals linked to relationships
- blog_posts: CMS-managed blog articles with draft/publish/slug/SEO
- blog_categories: categories for blog posts
- badges: achievement badges with criteria
- user_badges: badge assignments to users

## Security
- RLS on all tables, owner-scoped via user_id or through relationship ownership
- Blog posts/categories readable publicly when published
- Badges readable by all authenticated users
*/

-- RELATIONSHIPS
CREATE TABLE IF NOT EXISTS relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  contact_id uuid NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'new',
  interest text,
  notes text,
  conversation_context text,
  shared_purpose text,
  last_interaction date,
  next_action text,
  follow_up_date date,
  opportunity_value numeric(12,2) DEFAULT 0,
  relationship_health text DEFAULT 'good',
  is_archived boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE relationships ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_relationships" ON relationships;
CREATE POLICY "select_own_relationships" ON relationships FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_relationships" ON relationships;
CREATE POLICY "insert_own_relationships" ON relationships FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_relationships" ON relationships;
CREATE POLICY "update_own_relationships" ON relationships FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_relationships" ON relationships;
CREATE POLICY "delete_own_relationships" ON relationships FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- RELATIONSHIP INTERACTIONS
CREATE TABLE IF NOT EXISTS relationship_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  relationship_id uuid NOT NULL REFERENCES relationships(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL DEFAULT 'note',
  summary text NOT NULL,
  details text,
  interaction_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE relationship_interactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_interactions" ON relationship_interactions;
CREATE POLICY "select_own_interactions" ON relationship_interactions FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_interactions" ON relationship_interactions;
CREATE POLICY "insert_own_interactions" ON relationship_interactions FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_interactions" ON relationship_interactions;
CREATE POLICY "update_own_interactions" ON relationship_interactions FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_interactions" ON relationship_interactions;
CREATE POLICY "delete_own_interactions" ON relationship_interactions FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- FOLLOW UPS
CREATE TABLE IF NOT EXISTS follow_ups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  relationship_id uuid REFERENCES relationships(id) ON DELETE CASCADE,
  contact_id uuid REFERENCES contacts(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date date,
  status text NOT NULL DEFAULT 'pending',
  priority text DEFAULT 'medium',
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE follow_ups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_followups" ON follow_ups;
CREATE POLICY "select_own_followups" ON follow_ups FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_followups" ON follow_ups;
CREATE POLICY "insert_own_followups" ON follow_ups FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_followups" ON follow_ups;
CREATE POLICY "update_own_followups" ON follow_ups FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_followups" ON follow_ups;
CREATE POLICY "delete_own_followups" ON follow_ups FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- OPPORTUNITIES
CREATE TABLE IF NOT EXISTS opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  relationship_id uuid REFERENCES relationships(id) ON DELETE CASCADE,
  contact_id uuid REFERENCES contacts(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  value numeric(12,2) DEFAULT 0,
  stage text NOT NULL DEFAULT 'new',
  expected_close_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_opportunities" ON opportunities;
CREATE POLICY "select_own_opportunities" ON opportunities FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_opportunities" ON opportunities;
CREATE POLICY "insert_own_opportunities" ON opportunities FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_opportunities" ON opportunities;
CREATE POLICY "update_own_opportunities" ON opportunities FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_opportunities" ON opportunities;
CREATE POLICY "delete_own_opportunities" ON opportunities FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- BLOG CATEGORIES
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_blog_categories" ON blog_categories;
CREATE POLICY "read_blog_categories" ON blog_categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_manage_blog_categories" ON blog_categories;
CREATE POLICY "admin_manage_blog_categories" ON blog_categories FOR ALL
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'super_admin'))
  );

-- BLOG POSTS
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  category_id uuid REFERENCES blog_categories(id),
  tags text[] DEFAULT '{}',
  featured_image_url text,
  seo_title text,
  seo_description text,
  status text NOT NULL DEFAULT 'draft',
  author_id uuid REFERENCES auth.users(id),
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_published_posts" ON blog_posts;
CREATE POLICY "read_published_posts" ON blog_posts FOR SELECT
  TO anon, authenticated USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_blog_posts" ON blog_posts;
CREATE POLICY "admin_manage_blog_posts" ON blog_posts FOR ALL
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'super_admin'))
  );

-- BADGES
CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  criteria jsonb DEFAULT '{}',
  tier text DEFAULT 'bronze',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_active_badges" ON badges;
CREATE POLICY "read_active_badges" ON badges FOR SELECT
  TO authenticated USING (true);

-- USER BADGES
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id uuid NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  awarded_at timestamptz DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_badges" ON user_badges;
CREATE POLICY "select_own_badges" ON user_badges FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_badges" ON user_badges;
CREATE POLICY "insert_own_badges" ON user_badges FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_badges" ON user_badges;
CREATE POLICY "delete_own_badges" ON user_badges FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_relationships_user_id ON relationships(user_id);
CREATE INDEX IF NOT EXISTS idx_relationships_contact_id ON relationships(contact_id);
CREATE INDEX IF NOT EXISTS idx_follow_ups_user_id ON follow_ups(user_id);
CREATE INDEX IF NOT EXISTS idx_follow_ups_due_date ON follow_ups(due_date);
CREATE INDEX IF NOT EXISTS idx_opportunities_user_id ON opportunities(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
