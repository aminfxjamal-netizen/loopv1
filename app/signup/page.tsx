'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Cpu, ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';

export default function EnhancedSignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [statusLog, setStatusLog] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegisterPipeline = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusLog('Initializing authentication register packet...');

    try {
      // 1. Fire registration request to Supabase Auth Handler
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) throw authError;

      if (authData?.user) {
        setStatusLog('Auth record verified. Provisioning internal database container with metadata...');

        // 2. Provision the custom user profile with ALL metadata fields
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([
            {
              user_id: authData.user.id,
              display_name: displayName,
              company_name: companyName,
              plan_tier: 'free',
              remaining_tokens: 1500000, // Allocating the 1.5M Evaluation Sandbox tokens
              last_reset_date: new Date().toISOString(),
            },
          ]);

        if (profileError) {
          throw new Error(`Database instantiation failed: ${profileError.message}`);
        }

        setStatusLog('Registration successful. Redirecting to workspace console...');
        router.push('/dashboard');
      }

    } catch (err: any) {
      setStatusLog(`[REGISTRATION_REJECTION]: ${err.message || 'Handshake failed.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#E4E4E7] font-mono flex items-center justify-center p-4 relative selection:bg-violet-500/30">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f10_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f10_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-md w-full bg-[#030303] border border-[#18181B] rounded-xl p-8 shadow-2xl space-y-6 relative z-10">
        
        {/* BRAND IDENTITY NODE */}
        <div className="space-y-2 text-center">
          <div className="w-10 h-10 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <Cpu size={20} />
          </div>
          <h2 className="text-sm font-black uppercase tracking-widest text-white">Create Operator Account</h2>
          <p className="text-[10px] text-[#52525B]">PROVISION A NEW LOOP ENGINE RUNTIME NODE</p>
        </div>

        {/* INPUT DISPATCH FORM */}
        <form onSubmit={handleRegisterPipeline} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-[#A1A1AA] tracking-wider">Display Name</label>
              <input
                type="text"
                required
                disabled={loading}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Amin"
                className="w-full h-10 bg-[#09090B] border border-[#18181B] focus:border-[#27272A] rounded-md px-4 text-xs outline-none text-white transition placeholder-[#52525B]"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-[#A1A1AA] tracking-wider">Company</label>
              <input
                type="text"
                required
                disabled={loading}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Loop Sys"
                className="w-full h-10 bg-[#09090B] border border-[#18181B] focus:border-[#27272A] rounded-md px-4 text-xs outline-none text-white transition placeholder-[#52525B]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-[#A1A1AA] tracking-wider">Email Address</label>
            <input
              type="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@domain.internal"
              className="w-full h-10 bg-[#09090B] border border-[#18181B] focus:border-[#27272A] rounded-md px-4 text-xs outline-none text-white transition placeholder-[#52525B]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-[#A1A1AA] tracking-wider">Security Access Key</label>
            <input
              type="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full h-10 bg-[#09090B] border border-[#18181B] focus:border-[#27272A] rounded-md px-4 text-xs outline-none text-white transition placeholder-[#52525B]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-white hover:bg-[#E4E4E7] text-black text-[11px] font-black uppercase rounded-md transition flex items-center justify-center gap-1.5 disabled:opacity-40 cursor-pointer mt-2"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <>
                Initialize Sandbox
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* FEEDBACK MONITOR CONSOLE */}
        {statusLog && (
          <div className="bg-[#09090B] border border-[#18181B] p-3 rounded-md text-[10px] text-[#A1A1AA] flex items-start gap-2 animate-fadeIn">
            <ShieldAlert size={14} className="text-violet-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed font-mono">{statusLog}</p>
          </div>
        )}

        {/* ROUTING FOOTNOTE */}
        <div className="text-center pt-2 border-t border-[#18181B]">
          <p className="text-[10px] text-[#52525B]">
            Existing system operator?{' '}
            <Link href="/login" className="text-[#A1A1AA] hover:text-white underline underline-offset-2 transition font-bold">
              Access Console
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}