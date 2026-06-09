'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoopLoginPage() {
  const router = useRouter();
  
  // Form Fields State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // UI Utilities State
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fade-in on page load trigger
  useEffect(() => {
    setMounted(true);
  }, []);

  // Form Submission Logic
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Advanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulated login processing latency
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Basic login authentication check (placeholder)
      if (email === 'test@loop.ai' && password === 'password') {
        router.push('/workspace');
      } else {
        setErrorMessage('Invalid email or password. Please try again.');
      }
    }, 1800);
  };

  return (
    <div 
      className={`min-h-screen bg-[#FFFFFF] text-[#000000] font-sans flex flex-col items-center justify-center p-6 transition-opacity duration-700 ease-out select-none ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Logo Section */}
      <div className="text-center space-y-2 mb-8">
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded bg-[#2563EB] flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#FFFFFF]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#000000]">Loop</span>
        </div>
        <p className="text-xs text-[#71717A] tracking-wide font-medium">
          The AI Workspace for Modern Businesses
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#FFFFFF] border border-[#E4E4E7] rounded-xl p-8 shadow-2xl space-y-6">
        <div className="space-y-1.5 text-center">
          <h1 className="text-xl font-bold text-[#000000]">Welcome Back</h1>
          <p className="text-xs text-[#71717A]">
            Sign in to access your workspace and continue where you left off.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-100 border border-red-200 rounded text-xs text-red-600 font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {/* Work Email */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider">
              Work Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full h-10 px-3 bg-[#F4F4F5] border border-[#E4E4E7] rounded text-sm text-[#000000] placeholder-[#A1A1AA] focus:outline-none focus:border-[#2563EB] transition"
              disabled={isSubmitting}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5 relative">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] font-medium text-[#71717A] hover:text-[#000000] transition focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-10 px-3 bg-[#F4F4F5] border border-[#E4E4E7] rounded text-sm text-[#000000] placeholder-[#A1A1AA] focus:outline-none focus:border-[#2563EB] transition"
              disabled={isSubmitting}
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-[#E4E4E7] text-[#2563EB] focus:ring-[#2563EB]"
                disabled={isSubmitting}
              />
              <label htmlFor="rememberMe" className="text-xs text-[#71717A]">
                Remember Me
              </label>
            </div>
            <Link href="/forgot-password" className="text-xs text-[#2563EB] hover:text-[#1D4ED8] font-medium transition">
              Forgot Password?
            </Link>
          </div>

          {/* Primary CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 mt-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] text-sm font-medium rounded transition active:scale-[0.99] flex items-center justify-center focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Alternative Sign In Divider */}
        <div className="flex items-center my-4 text-[11px] text-[#A1A1AA] font-medium uppercase tracking-widest">
          <div className="flex-1 h-[1px] bg-[#E4E4E7]" />
          <span className="px-3">or continue with</span>
          <div className="flex-1 h-[1px] bg-[#E4E4E7]" />
        </div>

        {/* Third-Party Authentication Providers */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            type="button"
            className="h-10 border border-[#E4E4E7] bg-[#FFFFFF] hover:border-[#A1A1AA] text-xs font-medium rounded transition flex items-center justify-center gap-2 focus:outline-none"
          >
            Google
          </button>
          <button 
            type="button"
            className="h-10 border border-[#E4E4E7] bg-[#FFFFFF] hover:border-[#A1A1AA] text-xs font-medium rounded transition flex items-center justify-center gap-2 focus:outline-none"
          >
            Microsoft
          </button>
        </div>

        {/* Signup Link */}
        <div className="text-center text-xs text-[#71717A] pt-2">
          Don't have an account?{' '}
          <Link href="/signup" className="text-[#2563EB] hover:text-[#1D4ED8] font-medium transition">
            Start Free Trial
          </Link>
        </div>
      </div>

      {/* Trust Section */}
      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#71717A] font-medium">
        <div className="flex items-center gap-1.5">
          <span className="text-[#2563EB]">✓</span> Secure Authentication
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#2563EB]">✓</span> Fast Access
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#2563EB]">✓</span> Trusted Workspace
        </div>
      </div>
    </div>
  );
}