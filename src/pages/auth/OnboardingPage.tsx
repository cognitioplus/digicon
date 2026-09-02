import { useState } from 'react';
import { Loader2, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Input, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { navigateTo } from '@/hooks/useRouter';
import { NETWORKING_GOALS } from '@/config/constants';
import { supabase } from '@/lib/supabase';

const STEPS = ['Profile', 'Professional', 'Goal', 'Done'] as const;

export function OnboardingPage() {
  const { user, profile, updateProfile, refreshProfile } = useAuth();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [jobTitle, setJobTitle] = useState(profile?.job_title || '');
  const [company, setCompany] = useState(profile?.company || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [website, setWebsite] = useState(profile?.website || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [goal, setGoal] = useState('');

  const handleNext = async () => {
    if (step === 0) {
      setLoading(true);
      await updateProfile({ full_name: fullName });
      setLoading(false);
      setStep(1);
    } else if (step === 1) {
      setLoading(true);
      await updateProfile({ job_title: jobTitle, company, phone, website, bio });
      setLoading(false);
      setStep(2);
    } else if (step === 2) {
      setLoading(true);
      await updateProfile({ networking_goal: goal, onboarding_completed: true });

      // Create first digital card
      if (user) {
        const slug = (fullName || 'digicon-user').toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.random().toString(36).slice(2, 6);
        await supabase.from('digital_cards').insert({
          user_id: user.id,
          slug,
          name: fullName,
          job_title: jobTitle,
          company,
          phone,
          website,
          bio,
          is_primary: true,
          is_published: false,
        });
      }

      await refreshProfile();
      setLoading(false);
      setStep(3);
    } else if (step === 3) {
      navigateTo('/dashboard');
    }
  };

  if (!user) {
    navigateTo('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-navy-980 bg-grid flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
      <div className="relative w-full max-w-lg">
        <div className="flex justify-center mb-6">
          <Logo size={48} />
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-ui font-semibold transition-all ${
                i < step ? 'bg-success-500/20 text-success-400 border border-success-500/30' :
                i === step ? 'bg-electric-500/20 text-electric-300 border border-electric-500/40 glow-cyan' :
                'bg-white/5 text-white/30 border border-white/10'
              }`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && <div className={`w-8 h-0.5 ${i < step ? 'bg-success-500/40' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        <div className="glass-strong rounded-2xl p-8">
          {step === 0 && (
            <>
              <h2 className="font-heading font-bold text-2xl text-white mb-1">Let's start with you</h2>
              <p className="text-white/50 font-body text-sm mb-6">Tell us your name to begin</p>
              <Input label="Full Name" placeholder="Maria Santos" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </>
          )}
          {step === 1 && (
            <>
              <h2 className="font-heading font-bold text-2xl text-white mb-1">Professional details</h2>
              <p className="text-white/50 font-body text-sm mb-6">Add your role and contact info</p>
              <div className="space-y-4">
                <Input label="Job Title" placeholder="Founder & CEO" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                <Input label="Company" placeholder="Neora Solutions" value={company} onChange={(e) => setCompany(e.target.value)} />
                <Input label="Phone" placeholder="+63 917 123 4567" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <Input label="Website" placeholder="https://yoursite.com" value={website} onChange={(e) => setWebsite(e.target.value)} />
                <Input label="Bio" placeholder="Brief professional bio" value={bio} onChange={(e) => setBio(e.target.value)} />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="font-heading font-bold text-2xl text-white mb-1">What's your goal?</h2>
              <p className="text-white/50 font-body text-sm mb-6">We'll tailor your experience</p>
              <Select label="Primary Networking Goal" value={goal} onChange={(e) => setGoal(e.target.value)}>
                <option value="">Select a goal...</option>
                {NETWORKING_GOALS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </Select>
            </>
          )}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-electric-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-6 glow-cyan">
                <Check className="w-10 h-10 text-cyan-400" />
              </div>
              <h2 className="font-heading font-bold text-2xl text-white mb-2">Your DigiCon is ready!</h2>
              <p className="text-white/50 font-body text-sm max-w-sm mx-auto mb-6">
                Now let's turn introductions into relationships. Share your card, capture connections, and never lose a valuable contact again.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {['Share', 'Connect', 'Remember', 'Follow Up', 'Grow'].map((step, i) => (
                  <span key={step} className="px-3 py-1 rounded-full glass text-cyan-300 text-xs font-ui font-medium">
                    {step}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 0 && step < 3 ? (
              <Button variant="ghost" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            ) : <div />}
            <Button onClick={handleNext} disabled={loading || (step === 0 && !fullName) || (step === 2 && !goal)}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> :
                step === 3 ? 'Go to Dashboard' : 'Continue'}
              {step < 3 && !loading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
