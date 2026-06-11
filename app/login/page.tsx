'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using project environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default function LoginPage() {
  const router = useRouter();

  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Status tracking states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (!supabase) {
      setErrorMessage('Configuration error: Live credentials are missing.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (data?.user) {
        setSuccessMessage('Authentication verified. Welcome back.');
        
        // Match the user flow blueprint: Route directly to workspace
        setTimeout(() => {
          router.push('/workspace');
        }, 1000);
      }
    } catch (err: any) {
      setErrorMessage('An unexpected validation timeout occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FFFFFF] font-sans antialiased flex flex-col justify-between p-4 sm:p-6 md:p-8 selection:bg-[#7C3AED]/30 selection:text-white animate-fade-in">
      
      {/* LOGO / BRANDING SECTION */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-start pt-2">
        <div 
          onClick={() => router.push('/')} 
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          {/* Loop Geometric Logo Icon */}
          <div className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.3)] group-hover:bg-[#8B5CF6] group-hover:scale-105">
            <div className="w-3 h-3 rounded-sm bg-[#09090B] rotate-45 transition-transform duration-500 group-hover:rotate-90" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-wider text-[#FFFFFF] uppercase">Loop</span>
            <span className="text-[10px] text-[#A1A1AA] font-medium tracking-tight">The AI Workspace for Modern Businesses</span>
          </div>
        </div>
      </header>

      {/* LOGIN CONTAINER CARD */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-md w-full mx-auto my-10 space-y-6">
        <div className="w-full bg-[#18181B] border border-[#27272A] rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 hover:border-[#27272A]/80 space-y-6">
          
          {/* Card Headings */}
          <div className="space-y-1.5 text-center">
            <h1 className="text-xl font-bold tracking-tight text-[#FFFFFF]">Welcome Back</h1>
            <p className="text-xs text-[#A1A1AA] font-medium">
              Sign in to access your workspace and continue where you left off.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Status Feedback Banners */}
            {errorMessage && (
              <div className="p-3 bg-red-950/40 border border-red-900/50 rounded-xl text-[11px] font-semibold text-red-400 transition-all duration-200">
                ⚠️ {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-900/50 rounded-xl text-[11px] font-semibold text-emerald-400 transition-all duration-200">
                ✓ {successMessage}
              </div>
            )}

            {/* Email Input Field */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#A1A1AA] tracking-wider uppercase">Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full h-10 px-3 bg-[#09090B] border border-[#27272A] rounded-xl text-xs font-medium text-[#FFFFFF] placeholder-[#52525B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all duration-200"
              />
            </div>

            {/* Password Input Field */}
            <div className="space-y-1 relative">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-[#A1A1AA] tracking-wider uppercase">Password</label>
                <span className="text-[10px] font-semibold text-[#A1A1AA] hover:text-[#7C3AED] transition-colors cursor-pointer">
                  Forgot Password?
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-10 pl-3 pr-10 bg-[#09090B] border border-[#27272A] rounded-xl text-xs font-medium text-[#FFFFFF] placeholder-[#52525B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all duration-200"
                />
                {/* Show/Hide Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors select-none"
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            {/* Remember Me Controls */}
            <div className="flex items-center justify-start pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none group text-[11px] font-medium text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-[#09090B] border-[#27272A] text-[#7C3AED] focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 transition-all"
                />
                <span>Remember me on this operational device</span>
              </label>
            </div>

            {/* Primary Submit Button CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-[#7C3AED] hover:bg-[#8B5CF6] disabled:bg-[#7C3AED]/50 text-white text-xs font-bold rounded-xl shadow-md transition-all duration-200 flex items-center justify-center mt-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Alternative Sign In Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[#27272A]"></div>
            <span className="flex-shrink mx-4 text-[10px] text-[#52525B] font-bold uppercase tracking-widest">or continue with</span>
            <div className="flex-grow border-t border-[#27272A]"></div>
          </div>

          {/* Third Party OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              className="h-9 px-3 rounded-xl border border-[#27272A] bg-[#09090B] text-[11px] font-bold text-[#FFFFFF] hover:bg-[#18181B] hover:border-[#52525B] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Google
            </button>
            <button 
              type="button"
              className="h-9 px-3 rounded-xl border border-[#27272A] bg-[#09090B] text-[11px] font-bold text-[#FFFFFF] hover:bg-[#18181B] hover:border-[#52525B] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 23 23">
                <path fill="currentColor" d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z"/>
              </svg>
              Microsoft
            </button>
          </div>

          {/* Signup Pipeline Link */}
          <div className="text-center pt-2">
            <p className="text-xs text-[#A1A1AA] font-medium">
              Don't have an account?{' '}
              <span 
                onClick={() => router.push('/signup')}
                className="text-[#7C3AED] hover:text-[#8B5CF6] font-bold cursor-pointer hover:underline transition-colors ml-0.5"
              >
                Start Free Trial
              </span>
            </p>
          </div>
        </div>

        {/* COMPLIANCE TRUST BADGES */}
        <div className="flex items-center justify-center gap-5 text-[10px] font-bold text-[#52525B] tracking-wider uppercase select-none">
          <span className="flex items-center gap-1"><span className="text-[#7C3AED]">✓</span> Secure Authentication</span>
          <span className="flex items-center gap-1"><span className="text-[#7C3AED]">✓</span> Fast Access</span>
          <span className="flex items-center gap-1"><span className="text-[#7C3AED]">✓</span> Trusted Workspace</span>
        </div>
      </main>

      {/* FOOTER METADATA */}
      <footer className="max-w-7xl w-full mx-auto border-t border-[#18181B] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[11px] font-medium text-[#52525B]">
          © {new Date().getFullYear()} Loop Technologies Inc. All nodes secured.
        </span>
      </footer>
    </div>
  );
}