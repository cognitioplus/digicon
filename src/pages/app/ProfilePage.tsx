import { useState } from 'react';
import { User, Mail, Phone, Globe, Building2, Save, LogOut, Crown, CreditCard, Bell, Shield } from 'lucide-react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';
import { navigateTo } from '@/hooks/useRouter';
import { getPlanConfig, NETWORKING_GOALS } from '@/config/constants';

export function ProfilePage() {
  const { profile, updateProfile, signOut } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [jobTitle, setJobTitle] = useState(profile?.job_title || '');
  const [company, setCompany] = useState(profile?.company || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [website, setWebsite] = useState(profile?.website || '');
  const [goal, setGoal] = useState(profile?.networking_goal || '');

  if (!profile) return null;
  const planConfig = getPlanConfig(profile.plan);

  const handleSave = async () => {
    setSaving(true);
    await updateProfile({ full_name: fullName, job_title: jobTitle, company, bio, phone, email, website, networking_goal: goal });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSignOut = async () => {
    await signOut();
    navigateTo('/');
  };

  return (
    <AppLayout activePath="/profile">
      <h1 className="font-heading font-bold text-2xl text-white mb-6">Profile & Settings</h1>

      {/* Profile header */}
      <div className="glass-strong rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <Avatar src={profile.avatar_url} name={profile.full_name || 'User'} size="xl" />
          <div className="flex-1">
            <h2 className="font-heading font-bold text-xl text-white">{profile.full_name || 'User'}</h2>
            <p className="text-cyan-400 font-ui text-sm">{jobTitle || '—'}{company ? ` at ${company}` : ''}</p>
            <div className="flex gap-2 mt-2">
              <Badge color="bg-electric-500/20 text-electric-300 border-electric-500/30">{planConfig.name} Plan</Badge>
              {profile.plan === 'free' && <Button size="sm" variant="gold" onClick={() => navigateTo('/pricing')}><Crown className="w-3 h-3" /> Upgrade</Button>}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profile info */}
        <div className="glass-panel p-5">
          <h3 className="font-heading font-semibold text-white mb-4">Professional Information</h3>
          <div className="space-y-4">
            <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} icon={<User className="w-4 h-4" />} />
            <Input label="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} icon={<Building2 className="w-4 h-4" />} />
            <Input label="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
            <Textarea label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
          </div>
        </div>

        {/* Contact info */}
        <div className="space-y-6">
          <div className="glass-panel p-5">
            <h3 className="font-heading font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-4">
              <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail className="w-4 h-4" />} />
              <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} icon={<Phone className="w-4 h-4" />} />
              <Input label="Website" value={website} onChange={(e) => setWebsite(e.target.value)} icon={<Globe className="w-4 h-4" />} />
            </div>
          </div>
          <div className="glass-panel p-5">
            <h3 className="font-heading font-semibold text-white mb-4">Networking</h3>
            <Select label="Primary Goal" value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option value="">Select a goal...</option>
              {NETWORKING_GOALS.map(g => <option key={g} value={g}>{g}</option>)}
            </Select>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}</Button>
      </div>

      {/* Subscription & Account */}
      <div className="grid lg:grid-cols-3 gap-4 mt-8">
        <div className="glass-card rounded-2xl p-5">
          <CreditCard className="w-5 h-5 text-cyan-400 mb-2" />
          <h3 className="font-ui font-semibold text-white text-sm">Subscription</h3>
          <p className="text-xs text-white/40 mt-1">{planConfig.name} plan · ${planConfig.price}/{planConfig.period}</p>
          <button onClick={() => navigateTo('/pricing')} className="text-xs text-cyan-400 font-ui font-medium mt-2">{profile.plan === 'free' ? 'Upgrade' : 'Manage'}</button>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <Shield className="w-5 h-5 text-cyan-400 mb-2" />
          <h3 className="font-ui font-semibold text-white text-sm">Privacy</h3>
          <p className="text-xs text-white/40 mt-1">Control your data and visibility</p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <Bell className="w-5 h-5 text-cyan-400 mb-2" />
          <h3 className="font-ui font-semibold text-white text-sm">Notifications</h3>
          <p className="text-xs text-white/40 mt-1">Follow-up reminders enabled</p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10">
        <button onClick={handleSignOut} className="flex items-center gap-2 text-sm text-error-400/70 hover:text-error-400 font-ui font-medium">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </AppLayout>
  );
}
