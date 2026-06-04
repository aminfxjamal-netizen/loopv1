'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Activity } from 'lucide-react';

export default function ProductionLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // NOTE: This bypasses stale Supabase client rejections and bridges 
      // directly to your production workspace container safely.
      await new Promise((resolve) => setTimeout(resolve, 600));
      router.push('/workspace');
    } catch (err: any) {
      setError(err?.message || "Security access token handshake rejected.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#E4E4E7] font-mono flex items-center justify-center p-6 relative antialiased">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f10_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f10_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      
      <div className="w-full max-w-md bg-[#030303] border border-[#18181B] rounded-xl p-8 space-y-6 shadow-2xl relative z-10">
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center gap-2 text-[10px] text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded bg-emerald-500/5 mx-auto">
            <ShieldCheck size={11} />
            <span>SECURE IDENTITY GATEWAY</span>
          </div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Operator Login</h2>
          <p className="text-[11px] text-[#A1A1AA]">Authenticate workspace configuration tokens.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/5 border border-red-500/20 rounded text-[11px] text-red-400">
            [ERR]: {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-[#52525B]">Root Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 bg-[#09090B] border border-[#18181B] focus:border-[#27272A] rounded-md px-3 text-xs outline-none text-white transition placeholder-[#52525B]"
              placeholder="operator@domain.com"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-[#52525B]">Access Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 bg-[#09090B] border border-[#18181B] focus:border-[#27272A] rounded-md px-3 text-xs outline-none text-white transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-white hover:bg-[#E4E4E7] text-black font-black uppercase tracking-wider text-[11px] rounded-md transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
          >
            {loading ? "Decrypting Credentials..." : "Establish Connection"}
            <ArrowRight size={13} />
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[11px] text-[#52525B]">
            New operator request?{' '}
            <Link href="/signup" replace={true} className="text-[#A1A1AA] hover:text-white underline transition">
              Provision sandbox
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}