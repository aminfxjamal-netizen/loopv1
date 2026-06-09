'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoopPremiumSignupPage() {
  const router = useRouter();
  
  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI Mechanics State
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const getPasswordStrength = () => {
    if (!password) return { label: '', color: 'bg-transparent', width: 'w-0' };
    if (password.length < 6) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/3' };
    if (password.length < 10) return { label: 'Medium', color: 'bg-yellow-500', width: 'w-2/3' };
    return { label: 'Strong', color: 'bg-[#2563EB]', width: 'w-full' };
  };

  const strength = getPasswordStrength();

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

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

    try {
      // 1. Create User inside Supabase Auth Layer
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (authError) throw authError;

      // 2. Insert profile information into users public ledger table
      if (authData?.user) {
        const { error: dbError } = await supabase
          .from('users')
          .insert([
            { 
              id: authData.user.id, 
              full_name: fullName, 
              email: email,
              created_at: new Date().toISOString()
            }
          ]);

        if (dbError) throw dbError;
      }

      setSuccessMessage('Account created successfully! Redirecting...');
      
      setTimeout(() => {
        router.push('/workspace');
      }, 1000);

    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during account registration.');
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={`min-h-screen bg-[#FFFFFF] text-[#111827] font-sans antialiased flex flex-col justify-between transition-opacity duration-500 select-none ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* NAVIGATION */}
      <header className="h-16 border-b border-[#E5E7EB] bg-[#FFFFFF] flex items-center justify-between px-6 md:px-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#2563EB] flex items-center justify-center">
            <div className="w-2 h-2 rounded-sm bg-[#FFFFFF]" />
          </div>
          <span className="text-sm font-bold tracking-tight text-[#111827]">Loop</span>
        </Link>
        <Link href="/login" className="h-9 px-4 border border-[#E5E7EB] hover:border-[#6B7280] text-xs font-semibold rounded-lg transition flex items-center justify-center">
          Login
        </Link>
      </header>

      {/* SIGNUP MAIN CONTAINER */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-6">
          
          {/* Header Texts */}
          <div className="space-y-1.5 text-center">
            <h1 className="text-2xl font-black tracking-tight text-[#111827]">
              Create Your Loop Account
            </h1>
            <p className="text-xs text-[#6B7280] font-medium">
              Start your 14-day free trial and explore your AI workspace.
            </p>
            <div className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider pt-0.5">
              No Credit Card Required
            </div>
          </div>

          {/* Validation Feedback Containers */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 font-medium">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-600 font-medium">
              {successMessage}
            </div>
          )}

          {/* Registration Core Form */}
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] transition font-medium"
                disabled={isSubmitting}
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] transition font-medium"
                disabled={isSubmitting}
              />
            </div>

            {/* Password */}
            <div className="space-y-1 relative">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] font-bold text-[#6B7280] hover:text-[#111827] transition focus:outline-none"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] transition font-medium"
                disabled={isSubmitting}
              />

              {/* Password Strength Meter */}
              {password && (
                <div className="pt-1.5 space-y-1">
                  <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
                  </div>
                  <div className="text-[10px] text-right text-[#6B7280] font-semibold">
                    Strength: <span className="text-[#111827]">{strength.label}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] transition font-medium"
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Action Block */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] text-xs font-bold rounded-lg transition flex items-center justify-center shadow-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                'Start Free Trial'
              )}
            </button>
          </form>

          {/* Alternative Sign Up Area */}
          <div className="flex items-center my-4 text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest">
            <div className="flex-1 h-[1px] bg-[#E5E7EB]" />
            <span className="px-3">or continue with</span>
            <div className="flex-1 h-[1px] bg-[#E5E7EB]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              className="h-10 border border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#6B7280] text-xs font-semibold rounded-lg transition flex items-center justify-center gap-2 focus:outline-none text-[#111827]"
            >
              Google
            </button>
            <button 
              type="button"
              className="h-10 border border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#6B7280] text-xs font-semibold rounded-lg transition flex items-center justify-center gap-2 focus:outline-none text-[#111827]"
            >
              Microsoft
            </button>
          </div>

          {/* Login Link Node */}
          <div className="text-center text-xs text-[#6B7280] pt-2 font-medium">
            Already have an account?{' '}
            <Link href="/login" className="text-[#2563EB] hover:text-[#1D4ED8] font-bold transition">
              Sign In
            </Link>
          </div>

          {/* Benefits Matrix Checklist */}
          <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-[#6B7280] font-bold">
            <div><span className="text-[#2563EB]">✓</span> 14-Day Free Trial</div>
            <div><span className="text-[#2563EB]">✓</span> No Credit Card Required</div>
            <div><span className="text-[#2563EB]">✓</span> Cancel Anytime</div>
            <div><span className="text-[#2563EB]">✓</span> Secure Authentication</div>
          </div>

        </div>
      </main>

      {/* MINIMAL FOOTER */}
      <footer className="h-14 border-t border-[#E5E7EB] bg-[#FFFFFF] flex items-center justify-center gap-6 text-[11px] text-[#6B7280] font-semibold">
        <span className="hover:text-[#2563EB] cursor-pointer transition">Privacy Policy</span>
        <span className="hover:text-[#2563EB] cursor-pointer transition">Terms of Service</span>
      </footer>
    </div>
  );
}