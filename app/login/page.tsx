"use client";

import { useState } from 'react';
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Get stored user data
      const userData = localStorage.getItem('loop_user_data');
      
      if (!userData) {
        setError('No account found. Please sign up first.');
        setIsLoading(false);
        return;
      }

      const parsed = JSON.parse(userData);

      if (parsed.email !== email || parsed.password !== password) {
        setError('Invalid email or password.');
        setIsLoading(false);
        return;
      }

      // Restore or create trial session
      const existingTrial = localStorage.getItem('loop_user');
      if (!existingTrial) {
        const trialData = {
          ...parsed,
          plan: 'trial',
          trialStart: new Date().toISOString(),
          trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
        };
        localStorage.setItem('loop_user', JSON.stringify(trialData));
      }

      router.push('/workspace');

    } catch (err: any) {
      setError('Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans flex flex-col">
      <nav className="flex items-center justify-between px-4 md:px-6 py-5 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-2xl font-bold tracking-tight">Loop</Link>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Don't have an account?</span>
          <Link href="/signup" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">Sign up</Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="h-14 w-14 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={24} className="text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back</h1>
            <p className="text-gray-400">Log in to continue your workspace.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-14 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors text-sm"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Forgot password?
              </button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-500 text-white font-medium py-3 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Log in'}
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      <footer className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-6 text-sm text-gray-500">
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <span>© 2026 Loop</span>
        </div>
      </footer>
    </div>
  );
}