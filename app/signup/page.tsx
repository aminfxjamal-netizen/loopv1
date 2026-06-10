'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoopStripeStyleSignupPage() {
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

  // Real-time password strength computation
  const getPasswordStrength = () => {
    if (!password) return { label: '', color: 'bg-transparent', width: 'w-0' };
    if (password.length < 6) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/3' };
    if (password.length < 10) return { label: 'Medium', color: 'bg-yellow-500', width: 'w-2/3' };
    return { label: 'Strong', color: 'bg-[#2563EB]', width: 'w-full' };
  };

  const strength = getPasswordStrength();

  // Submission handler with native validation rules
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all layout field containers.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match your structural parameters.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password length must clear the 6-character barrier.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Core Supabase authentication layer process tracking initialization
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

      // 2. Structural sync to custom public user ledger database tables
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

      setSuccessMessage('Secure registration established. Initializing your sandbox workspace...');
      
      setTimeout(() => {
        router.push('/workspace');
      }, 1200);

    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during account verification.');
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={`min-h-screen bg-[#FFFFFF] text-[#111827] font-sans antialiased flex flex-col justify-between transition-all duration-700 ease-out select-none ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* NAVIGATION LAYER */}
      <header className="h-20 border-b border-[#F3F4F6] bg-[#FFFFFF] flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-6 h-6 rounded-lg bg-[#2563EB] flex items-center justify-center transition shadow-[0_2px_8px_rgba(37,99,235,0.2)] group-hover:scale-[1.02]">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#FFFFFF]" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-[#111827]">Loop</span>
        </Link>
        <Link 
          href="/login" 
          className="h-10 px-4 border border-[#E5E7EB] hover:border-[#9CA3AF] text-xs font-bold text-[#6B7280] hover:text-[#111827] rounded-xl transition flex items-center justify-center bg-[#FFFFFF]"
        >
          Sign In
        </Link>
      </header>

      {/* STRIPE-INSPIRED CORE CARD INTERFACE */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 bg-[#FAFAFA]">
        <div className="w-full max-w-[460px] bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-8 md:p-10 shadow-[0_24px_48px_rgba(0,0,0,0.02)] space-y-7 transition duration-300">
          
          {/* Card Top Block */}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-black tracking-tight text-[#111827]">
              Create Your Account
            </h1>
            <p className="text-xs text-[#6B7280] font-medium max-w-xs mx-auto leading-relaxed">
              Start your 14-day free trial and explore your AI workspace.
            </p>
          </div>

          {/* Validation Micro-Interaction Components */}
          {errorMessage && (
            <div className="p-3.5 bg-red-50 border border-red-200/60 rounded-xl text-xs text-red-600 font-semibold transition">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200/60 rounded-xl text-xs text-emerald-600 font-semibold transition">
              {successMessage}
            </div>
          )}

          {/* Input Data Submission Loop Forms */}
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            
            {/* Field: Full Name */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full h-11 px-3.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] placeholder-[#A1A1AA] focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 transition font-medium"
                disabled={isSubmitting}
              />
            </div>

            {/* Field: Email Address */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full h-11 px-3.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] placeholder-[#A1A1AA] focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 transition font-medium"
                disabled={isSubmitting}
              />
            </div>

            {/* Field: Password */}
            <div className="space-y-1.5 relative">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] font-bold text-[#6B7280] hover:text-[#2563EB] transition focus:outline-none pb-0.5"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-3.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] placeholder-[#A1A1AA] focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 transition font-medium"
                disabled={isSubmitting}
              />

              {/* Real-time Indicator Line */}
              {password && (
                <div className="pt-2 space-y-1">
                  <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
                  </div>
                  <div className="text-[10px] text-right text-[#6B7280] font-bold">
                    Security Metric: <span className="text-[#111827]">{strength.label}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Field: Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-3.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] placeholder-[#A1A1AA] focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 transition font-medium"
                disabled={isSubmitting}
              />
            </div>

            {/* PREMIUM INTERACTIVE CTAS */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-sm font-semibold text-[#FFFFFF] bg-[#2563EB] hover:bg-[#1D4ED8] transition-all duration-200 shadow-[0_10px_30px_rgba(37,99,235,0.25)] flex items-center justify-center focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
                style={{ height: '56px', borderRadius: '16px' }}
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
            </div>
          </form>

          {/* Alternative OAuth Divider Component */}
          <div className="flex items-center text-[10px] text-[#A1A1AA] font-bold uppercase tracking-widest my-2">
            <div className="flex-1 h-[1px] bg-[#E5E7EB]" />
            <span className="px-3">or continue with</span>
            <div className="flex-1 h-[1px] bg-[#E5E7EB]" />
          </div>

          {/* White Third Party Provider Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              className="h-11 border border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#A1A1AA] hover:bg-[#FAFAFA] text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 focus:outline-none text-[#4B5563]"
            >
              Google
            </button>
            <button 
              type="button"
              className="h-11 border border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#A1A1AA] hover:bg-[#FAFAFA] text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 focus:outline-none text-[#4B5563]"
            >
              Microsoft
            </button>
          </div>

          {/* Card Bottom Authentication Navigation Anchor */}
          <div className="text-center text-xs text-[#6B7280] font-medium pt-2">
            Already have an account?{' '}
            <Link href="/login" className="text-[#2563EB] hover:text-[#1D4ED8] font-bold transition">
              Sign In
            </Link>
          </div>

          {/* Benefits Feature Checklist Row */}
          <div className="pt-5 border-t border-[#F3F4F6] grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-[#6B7280] font-bold">
            <div className="flex items-center gap-1.5"><span className="text-[#2563EB]">✓</span> 14-Day Free Trial</div>
            <div className="flex items-center gap-1.5"><span className="text-[#2563EB]">✓</span> No Credit Card Required</div>
            <div className="flex items-center gap-1.5"><span className="text-[#2563EB]">✓</span> Cancel Anytime</div>
            <div className="flex items-center gap-1.5"><span className="text-[#2563EB]">✓</span> Secure Authentication</div>
          </div>

        </div>
      </main>

      {/* MINIMAL STRUCTURAL FOOTER */}
      <footer className="h-16 border-t border-[#F3F4F6] bg-[#FFFFFF] flex items-center justify-center gap-8 text-[11px] text-[#6B7280] font-bold">
        <span className="hover:text-[#2563EB] cursor-pointer transition">Privacy Policy</span>
        <span className="hover:text-[#2563EB] cursor-pointer transition">Terms of Service</span>
      </footer>
    </div>
  );
}