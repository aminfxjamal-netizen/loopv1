'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2, KeyRound, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function PerfectLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication sequence failed.');
      }

      // If login token validates, push directly into active workspace instance
      if (data.token) {
        router.push('/workspace');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid parameters provided or connection dropped.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#121212] font-sans antialiased overflow-x-hidden flex flex-col md:grid md:grid-cols-12 relative">
      
      {/* Grid Canvas Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none z-0" />

      {/* Left Column: Re-entry Assurance Panel */}
      <div className="hidden md:flex md:col-span-5 bg-white border-r border-gray-200/80 p-12 flex-col justify-between relative z-10">
        <div>
          <Link href="/" className="text-lg font-bold tracking-tight text-[#121212] flex items-center gap-2 no-underline mb-16">
            <span className="w-5 h-5 bg-violet-600 rounded-md flex items-center justify-center text-white text-xs font-black">L</span>
            Loop
          </Link>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gray-100 text-[10px] text-gray-600 font-bold uppercase tracking-wider font-mono border border-gray-200">
              Session Port: Active
            </div>
            <h2 className="text-3xl font-black tracking-tight text-gray-900 leading-[1.15]">
              Welcome back to your core workspace.
            </h2>
            <p className="text-xs text-gray-400 font-normal leading-relaxed max-w-sm">
              Re-authenticate your developer token to instantly access active context files, automation loops, and calendar engines.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-gray-100 pt-6 text-[11px] text-gray-400">
          <ShieldCheck size={14} className="text-green-600" /> All runtime logins are tokenized and securely hashed.
        </div>

        <div className="text-[10px] font-mono text-gray-400 font-medium tracking-wide">
          &copy; 2026 Loop Engine Studio.
        </div>
      </div>

      {/* Right Column: Interactive Login Core Form */}
      <div className="flex-1 md:col-span-7 flex items-center justify-center px-6 py-12 relative z-10">
        
        {/* Mobile Header representation */}
        <div className="absolute top-6 left-6 md:hidden">
          <Link href="/" className="text-lg font-bold tracking-tight text-[#121212] flex items-center gap-2 no-underline">
            <span className="w-5 h-5 bg-violet-600 rounded-md flex items-center justify-center text-white text-xs font-black">L</span>
            Loop
          </Link>
        </div>

        <div className="max-w-sm w-full bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.01)] text-left">
          <div className="mb-6">
            <h1 className="text-xl font-bold tracking-tight text-gray-950">Access Old Account</h1>
            <p className="text-xs text-gray-400 mt-1">Provide your workspace credentials below to enter your runtime.</p>
          </div>

          {error && (
            <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 font-mono">Registered Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3 py-2 bg-[#FAFAFA] border border-gray-200 rounded-lg text-xs font-medium placeholder:text-gray-300 focus:outline-none focus:border-violet-600 focus:bg-white transition"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Password</label>
                <a href="#" className="text-[10px] font-bold text-violet-600 hover:text-violet-700 no-underline">Forgot?</a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-[#FAFAFA] border border-gray-200 rounded-lg text-xs font-medium placeholder:text-gray-300 focus:outline-none focus:border-violet-600 focus:bg-white transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-50 shadow-sm shadow-violet-600/10"
            >
              {isLoading ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Verifying Credentials...
                </>
              ) : (
                <>
                  Unlock Workspace <ArrowRight size={13} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-4 text-center">
            <p className="text-[11px] text-gray-400 font-medium">
              New to our automation environment?{' '}
              <Link href="/signup" className="text-violet-600 hover:text-violet-700 font-bold no-underline">
                Deploy a new instance
              </Link>
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}