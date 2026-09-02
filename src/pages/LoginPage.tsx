import { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { AuthLayout } from '@/layouts/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { navigateTo } from '@/hooks/useRouter';

export function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      navigateTo('/dashboard');
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your DigiCon account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-4 h-4" />}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock className="w-4 h-4" />}
          required
        />
        {error && (
          <div className="glass border border-error-500/30 rounded-xl p-3 text-sm text-error-300 font-body">
            {error}
          </div>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
        </Button>
      </form>
      <p className="text-center text-sm text-white/50 font-body mt-6">
        Don't have an account?{' '}
        <button onClick={() => navigateTo('/signup')} className="text-cyan-400 hover:text-cyan-300 font-ui font-medium">
          Sign Up
        </button>
      </p>
    </AuthLayout>
  );
}
