'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Firebase auth logic will attach directly here later
    setTimeout(() => setIsLoading(false), 1000); 
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#121212] font-sans antialiased flex flex-col md:grid md:grid-cols-12 overflow-x-hidden relative">
      
      {/* Miro-Style Engineering Grid Sub-layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0" />

      {/* Left Panel: Value Proposition & Blueprint Aesthetics (Hidden on Mobile) */}
      <div className="hidden md:flex md:col-span-5 bg-white border-r border-[#EEEEEE] p-12 flex-col justify-between relative z-10">
        <div>
          <Link href="/" className="text-lg font-bold tracking-tight text-[#121212] flex items-center gap-2 mb-16 no-underline">
            <span className="w-5 h-5 bg-violet-600 rounded-md flex items-center justify-center text-white text-xs font-black">L</span>
            Loop
          </Link>

          <div className="space-y-8 mt-12 max-w-sm">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-violet-200 bg-violet-50 text-[10px] uppercase tracking-wider font-mono font-bold text-violet-700">
              System Initialization
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-950 leading-tight">
              Deploy your automated workspace framework.
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed font-normal">
              Set up your environment parameters to start orchestrating cross-app context streams natively.
            </p>
          </div>
        </div>

        {/* Feature Checkpoints */}
        <div className="space-y-4 max-w-sm border-t border-gray-100 pt-8 font-sans">
          {[
            { icon: <Zap size={14} className="text-violet-600" />, title: '14-Day Free Evaluation Run', desc: 'Complete access to full system feature arrays right out of the box.' },
            { icon: <Shield size={14} className="text-violet-600" />, title: 'Hardened Encryption Layers', desc: 'Your tokens and workspace profiles remain bound to local secure structures.' },
            { icon: <CheckCircle size={14} className="text-violet-600" />, title: 'Granular Approval Controls', desc: 'No background command transmits without your explicit dashboard confirmation.' }
          ].map((item, i) => (
            <div key={i} className="flex gap-3 text-left">
              <div className="mt-0.5">{item.icon}</div>
              <div>
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide">{item.title}</h4>
                <p className="text-[11px] text-gray-400 leading-normal font-normal mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-gray-400 font-mono tracking-tight">&copy; 2026 Loop Engine Studio. Security status verified.</p>
      </div>

      {/* Right Panel: Pristine Minimalist Form Block */}
      <div className="flex-1 md:col-span-7 flex items-center justify-center p-6 sm:p-12 relative z-10">
        
        {/* Mobile Header Logo replacement */}
        <div className="absolute top-6 left-6 md:hidden">
          <Link href="/" className="text-base font-bold tracking-tight text-[#121212] flex items-center gap-2 no-underline">
            <span className="w-4 h-4 bg-violet-600 rounded flex items-center justify-center text-white text-[10px] font-black">L</span>
            Loop
          </Link>
        </div>

        <div className="w-full max-w-[380px] bg-white border border-gray-200/80 rounded-xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] text-left">
          <div className="mb-6">
            <h1 className="text-xl font-bold tracking-tight text-gray-950 mb-1.5">Create account</h1>
            <p className="text-xs text-gray-400">Initialize your environment instance to get started.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 font-mono">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Alex Carter"
                className="w-full px-3 py-2 bg-[#FAFAFA] border border-gray-200 rounded-lg text-xs font-sans placeholder:text-gray-300 focus:outline-none focus:border-violet-600 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 font-mono">Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3 py-2 bg-[#FAFAFA] border border-gray-200 rounded-lg text-xs font-sans placeholder:text-gray-300 focus:outline-none focus:border-violet-600 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 font-mono">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-[#FAFAFA] border border-gray-200 rounded-lg text-xs font-sans placeholder:text-gray-300 focus:outline-none focus:border-violet-600 focus:bg-white transition"
              />
              <span className="text-[10px] text-gray-400 block mt-1 font-sans">Minimum 8 operational characters required.</span>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg text-xs shadow-sm shadow-violet-600/10 flex items-center justify-center gap-1.5 transition disabled:opacity-50"
              >
                {isLoading ? 'Initializing Instance...' : 'Initialize Instance'}
                {!isLoading && <ArrowRight size={13} />}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 font-sans">
              Already possess an active workspace?{' '}
              <Link href="/login" className="text-violet-600 hover:text-violet-700 font-semibold transition no-underline">
                Log in
              </Link>
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}