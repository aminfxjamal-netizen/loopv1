'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using project environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default function SignupPage() {
  const router = useRouter();

  // Form input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Interface micro-interaction states
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: 'Weak', color: 'bg-red-500' });

  // Processing flow states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Password structural integrity analyzer
  useEffect(() => {
    if (!password) {
      setPasswordStrength({ score: 0, label: 'None', color: 'bg-[#F3F4F6]' });
      return;
    }
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) {
      setPasswordStrength({ score: 25, label: 'Weak', color: 'bg-red-500' });
    } else if (score <= 3) {
      setPasswordStrength({ score: 60, label: 'Medium', color: 'bg-amber-500' });
    } else {
      setPasswordStrength({ score: 100, label: 'Strong', color: 'bg-emerald-500' });
    }
  }, [password]);

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Pre-flight form validation parameter checks
    if (password !== confirmPassword) {
      setErrorMessage('Validation error: Password parameters do not match.');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Security error: Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    if (!supabase) {
      setErrorMessage('Configuration error: Live database credentials are missing.');
      setLoading(false);
      return;
    }

    try {
      // Execute account creation directly inside Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (data?.user) {
        setSuccessMessage('Account established successfully. Forwarding to plans configuration...');
        
        // Link connected to pricing funnel layout view per parameters instructions
        setTimeout(() => {
          router.push('/pricing');
        }, 1200);
      }
    } catch (err: any) {
      setErrorMessage('An unexpected database verification timeout occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111827] font-sans antialiased flex flex-col justify-between p-4 sm:p-6 md:p-8 selection:bg-[#2563EB]/10 transition-colors duration-300">
      
      {/* NAVIGATION HEADER BAR */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between border-b border-gray-50 pb-4">
        <div 
          onClick={() => router.push('/')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          {/* Loop Minimal Premium Blue Icon Node */}
          <div className="w-6 h-6 rounded-lg bg-[#2563EB] flex items-center justify-center transition-all duration-300 shadow-[0_4px_12px_rgba(37,99,235,0.2)] group-hover:bg-[#1D4ED8]">
            <div className="w-2.5 h-2.5 rounded-sm bg-white" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-[#111827]">Loop</span>
        </div>

        <button 
          onClick={() => router.push('/login')}
          className="h-9 px-4 rounded-xl border border-[#E5E7EB] bg-white text-xs font-bold text-[#111827] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all shadow-sm"
        >
          Sign In
        </button>
      </header>

      {/* CORE PLATFORM SIGNUP SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-md w-full mx-auto my-10 space-y-6 animate-fade-in">
        <div className="w-full space-y-6">
          
          {/* Section Headings */}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-black tracking-tight text-[#111827]">Create Your Account</h1>
            <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
              Start your 14-day free trial and explore your AI workspace.
              <span className="block text-[11px] font-bold text-[#2563EB] mt-1">No credit card required.</span>
            </p>
          </div>

          <form onSubmit={handleSignupSubmit} className="space-y-4">
            {/* Status Notification Alerts */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs font-semibold text-red-600">
                ⚠️ {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-semibold text-emerald-600">
                ✓ {successMessage}
              </div>
            )}

            {/* Full Name Input Parameter */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#4B5563] tracking-wide uppercase">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Netizen"
                className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/10 transition-all"
              />
            </div>

            {/* Email Input Parameter */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#4B5563] tracking-wide uppercase">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/10 transition-all"
              />
            </div>

            {/* Password Input Parameter */}
            <div className="space-y-1 relative">
              <label className="text-[11px] font-bold text-[#4B5563] tracking-wide uppercase">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-3 pr-12 bg-white border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#6B7280] hover:text-[#111827] transition-colors select-none"
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>

              {/* Real-time Password Strength Visualization Grid */}
              {password && (
                <div className="pt-1.5 space-y-1">
                  <div className="w-full h-1 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${passwordStrength.color} transition-all duration-300`} 
                      style={{ width: `${passwordStrength.score}%` }}
                    />
                  </div>
                  <div className="text-[9px] font-bold text-[#6B7280] flex justify-between tracking-wide uppercase">
                    <span>Security strength</span>
                    <span>{passwordStrength.label}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Input Parameter */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#4B5563] tracking-wide uppercase">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/10 transition-all"
              />
            </div>

            {/* Primary Blue Action Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[56px] rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-[#2563EB]/60 text-white text-xs font-semibold shadow-[0_10px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_10px_35px_rgba(37,99,235,0.35)] transition-all duration-200 flex items-center justify-center mt-6 hover:scale-[1.005] active:scale-[0.995]"
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                'Start Free Trial'
              )}
            </button>
          </form>

          {/* Alternative Signup Section Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-[#F3F4F6]"></div>
            <span className="flex-shrink mx-4 text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest">or continue with</span>
            <div className="flex-grow border-t border-[#F3F4F6]"></div>
          </div>

          {/* Third Party OAuth Networks */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              className="h-10 px-3 rounded-xl border border-[#E5E7EB] bg-white text-xs font-bold text-[#4B5563] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.113-5.136 4.113-3.41 0-6.165-2.755-6.165-6.165 0-3.41 2.756-6.165 6.165-6.165 1.48 0 2.83.52 3.89 1.39l3.14-3.14C18.88 1.91 15.77 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.84 0 10.74-4.25 11.24-10.05v-3.14h-11.24z"/>
              </svg>
              Google
            </button>
            <button 
              type="button"
              className="h-10 px-3 rounded-xl border border-[#E5E7EB] bg-white text-xs font-bold text-[#4B5563] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 23 23">
                <path fill="#F25022" d="M0 0h11v11H0z"/>
                <path fill="#7FBA00" d="M12 0h11v11H12z"/>
                <path fill="#01A6F0" d="M0 12h11v11H0z"/>
                <path fill="#FFB900" d="M12 12h11v11H12z"/>
              </svg>
              Microsoft
            </button>
          </div>

          {/* Bottom Redirect Node */}
          <div className="text-center pt-2">
            <p className="text-xs text-[#6B7280] font-medium">
              Already have an account?{' '}
              <span 
                onClick={() => router.push('/login')}
                className="text-[#2563EB] hover:text-[#1D4ED8] font-bold cursor-pointer hover:underline transition-colors ml-0.5"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>

        {/* VERIFIED OPERATING PARAMETERS ACCREDITATION */}
        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-2 pt-4 border-t border-[#F3F4F6] text-[11px] font-semibold text-[#6B7280] select-none">
          <div className="flex items-center gap-1.5 justify-start"><span className="text-[#2563EB] text-xs">✓</span> 14-Day Free Trial</div>
          <div className="flex items-center gap-1.5 justify-start"><span className="text-[#2563EB] text-xs">✓</span> No Credit Card Required</div>
          <div className="flex items-center gap-1.5 justify-start"><span className="text-[#2563EB] text-xs">✓</span> Secure Authentication</div>
          <div className="flex items-center gap-1.5 justify-start"><span className="text-[#2563EB] text-xs">✓</span> Cancel Anytime</div>
        </div>
      </main>

      {/* FOOTER METADATA COMPLIANCE */}
      <footer className="max-w-7xl w-full mx-auto border-t border-[#F3F4F6] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-[#9CA3AF]">
        <span>© {new Date().getFullYear()} Loop Technologies Inc. All parameters reserved.</span>
        <div className="flex items-center gap-5 text-[#6B7280] font-semibold">
          <span className="hover:text-[#111827] cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-[#111827] cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}