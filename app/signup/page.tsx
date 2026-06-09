'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoopSignupPage() {
  const router = useRouter();
  
  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI Utilities State
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fade-in on page load trigger
  useEffect(() => {
    setMounted(true);
  }, []);

  // Password Strength Calculator
  const getPasswordStrength = () => {
    if (!password) return { label: '', color: 'bg-transparent', width: 'w-0' };
    if (password.length < 6) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/3' };
    if (password.length < 10) return { label: 'Medium', color: 'bg-yellow-500', width: 'w-2/3' };
    return { label: 'Strong', color: 'bg-[#7C3AED]', width: 'w-full' };
  };

  const strength = getPasswordStrength();

  // Form Submission & Validation Logic
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);

    // Simulated network processing latency to demonstrate professional loading state
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/workspace');
    }, 1500);
  };

  return (
    <div 
      className={`min-h-screen bg-[#09090B] text-[#FFFFFF] font-sans flex flex-col items-center justify-center p-6 transition-opacity duration-700 ease-out select-none ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Logo Section */}
      <div className="text-center space-y-2 mb-8">
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded bg-[#FFFFFF] flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#09090B]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#FFFFFF]">Loop</span>
        </div>
        <p className="text-xs text-[#A1A1AA] tracking-wide font-medium">
          The AI Workspace for Modern Businesses
        </p>
      </div>

      {/* Signup Card */}
      <div className="w-full max-w-md bg-[#18181B] border border-[#27272A] rounded-xl p-8 shadow-2xl space-y-6">
        <div className="space-y-1.5 text-center">
          <h1 className="text-xl font-bold text-[#FFFFFF]">Create your account</h1>
          <p className="text-xs text-[#A1A1AA]">
            Start your 14-day free trial. No credit card required.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400 font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSignupSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full h-10 px-3 bg-[#09090B] border border-[#27272A] rounded text-sm text-[#FFFFFF] placeholder-[#52525B] focus:outline-none focus:border-[#7C3AED] transition"
              disabled={isSubmitting}
            />
          </div>

          {/* Work Email */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider">
              Work Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full h-10 px-3 bg-[#09090B] border border-[#27272A] rounded text-sm text-[#FFFFFF] placeholder-[#52525B] focus:outline-none focus:border-[#7C3AED] transition"
              disabled={isSubmitting}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5 relative">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] font-medium text-[#A1A1AA] hover:text-[#FFFFFF] transition focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-10 px-3 bg-[#09090B] border border-[#27272A] rounded text-sm text-[#FFFFFF] placeholder-[#52525B] focus:outline-none focus:border-[#7C3AED] transition"
              disabled={isSubmitting}
            />

            {/* Password Strength Indicator */}
            {password && (
              <div className="pt-2 space-y-1">
                <div className="w-full h-1 bg-[#09090B] rounded-full overflow-hidden">
                  <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
                </div>
                <div className="text-[10px] text-right text-[#A1A1AA] font-medium">
                  Password Strength: <span className="text-[#FFFFFF]">{strength.label}</span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider">
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-10 px-3 bg-[#09090B] border border-[#27272A] rounded text-sm text-[#FFFFFF] placeholder-[#52525B] focus:outline-none focus:border-[#7C3AED] transition"
              disabled={isSubmitting}
            />
          </div>

          {/* Primary CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 mt-2 bg-[#7C3AED] hover:bg-[#8B5CF6] text-[#FFFFFF] text-sm font-medium rounded transition active:scale-[0.99] flex items-center justify-center focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              'Start Free Trial'
            )}
          </button>
        </form>

        {/* Alternative Sign Up Divider */}
        <div className="flex items-center my-4 text-[11px] text-[#52525B] font-medium uppercase tracking-widest">
          <div className="flex-1 h-[1px] bg-[#27272A]" />
          <span className="px-3">or continue with</span>
          <div className="flex-1 h-[1px] bg-[#27272A]" />
        </div>

        {/* Third-Party Authentication Providers */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            type="button"
            className="h-10 border border-[#27272A] bg-[#09090B] hover:border-[#52525B] text-xs font-medium rounded transition flex items-center justify-center gap-2 focus:outline-none"
          >
            Google
          </button>
          <button 
            type="button"
            className="h-10 border border-[#27272A] bg-[#09090B] hover:border-[#52525B] text-xs font-medium rounded transition flex items-center justify-center gap-2 focus:outline-none"
          >
            Microsoft
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center text-xs text-[#A1A1AA] pt-2">
          Already have an account?{' '}
          <Link href="/login" className="text-[#7C3AED] hover:text-[#8B5CF6] font-medium transition">
            Sign in
          </Link>
        </div>
      </div>

      {/* Trust Section */}
      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#A1A1AA] font-medium">
        <div className="flex items-center gap-1.5">
          <span className="text-[#7C3AED]">✓</span> 14-Day Free Trial
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#7C3AED]">✓</span> No Credit Card Required
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#7C3AED]">✓</span> Cancel Anytime
        </div>
      </div>
    </div>
  );
}