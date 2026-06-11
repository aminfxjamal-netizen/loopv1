'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using active project environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default function SignupPage() {
  const router = useRouter();

  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');

  // Interface tracking states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Safety fallback check for missing environment keys
    if (!supabase) {
      setErrorMessage('Application configuration error: Live Supabase credentials are missing.');
      setLoading(false);
      return;
    }

    try {
      // Execute registration inside Supabase authentication database
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            company_name: companyName,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (data?.user) {
        setSuccessMessage('Secure registration established. Moving to plan options...');
        
        // Match the user flow blueprint: Route directly to Pricing after a successful signup
        setTimeout(() => {
          router.push('/pricing');
        }, 1200);
      }
    } catch (err: any) {
      setErrorMessage('An unexpected validation timeout occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111827] font-sans antialiased flex flex-col justify-between p-6 md:p-8">
      {/* HEADER SECTION */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <div 
          onClick={() => router.push('/')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-6 h-6 rounded-lg bg-[#2563EB] flex items-center justify-center transition shadow-sm group-hover:bg-[#1D4ED8]">
            <div className="w-2.5 h-2.5 rounded-sm bg-white" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-[#111827]">Loop</span>
        </div>

        <div className="flex items-center gap-5">
          <span className="text-xs font-semibold text-[#6B7280] hidden sm:inline">Already have an enterprise space?</span>
          <button 
            onClick={() => router.push('/login')}
            className="h-9 px-4 rounded-xl border border-[#E5E7EB] bg-white text-xs font-bold text-[#111827] hover:bg-[#F9FAFB] transition shadow-sm"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* FORM INTERFACE BLOCK */}
      <main className="flex-1 flex items-center justify-center max-w-md w-full mx-auto my-12">
        <div className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-1.5 text-center">
            <h1 className="text-xl font-black tracking-tight text-[#111827]">Initialize Sandbox Space</h1>
            <p className="text-xs text-[#6B7280] font-medium">Activate autonomous automation infrastructure workflows.</p>
          </div>

          <form onSubmit={handleSignupSubmit} className="space-y-4">
            {/* Status Feedback Messages */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs font-semibold text-red-600 animate-fade-in">
                ⚠️ {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-semibold text-emerald-600 animate-fade-in">
                ✓ {successMessage}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#4B5563] tracking-wide uppercase">Corporate Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full h-10 px-3 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:bg-white transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#4B5563] tracking-wide uppercase">Access Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-10 px-3 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:bg-white transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#4B5563] tracking-wide uppercase">Company Name</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Labs Inc."
                className="w-full h-10 px-3 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:bg-white transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-[#93C5FD] text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center justify-center mt-2"
            >
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                'Create Workspace Space'
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-[11px] text-[#9CA3AF] font-medium leading-relaxed max-w-[280px] mx-auto">
              By initiating registration, you sanction the structural Terms of Service and Privacy Protocols.
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER SECTION */}
      <footer className="max-w-7xl w-full mx-auto border-t border-[#F3F4F6] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[11px] font-medium text-[#9CA3AF]">
          © {new Date().getFullYear()} Loop Technologies Inc. All parameters reserved.
        </span>
        <div className="flex items-center gap-5 text-[11px] font-semibold text-[#6B7280]">
          <span className="hover:text-[#111827] cursor-pointer transition">System Operational Status</span>
          <span className="hover:text-[#111827] cursor-pointer transition">Security Compliance</span>
        </div>
      </footer>
    </div>
  );
}