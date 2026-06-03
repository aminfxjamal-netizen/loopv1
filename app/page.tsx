'use client';

import { useState } from 'react';
import { ArrowRight, Bot, Zap, Shield, Sparkles, Layers, Activity, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#121212] font-sans antialiased selection:bg-violet-100 selection:text-violet-900 overflow-x-hidden flex flex-col relative">
      
      {/* Miro-Style Premium Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none z-0" />

      {/* 10/10 Interactive Sticky Header */}
      <header className="border-b border-gray-200/60 sticky top-0 w-full h-16 z-50 bg-white/80 backdrop-blur-md flex-shrink-0">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-lg font-bold tracking-tight text-[#121212] flex items-center gap-2 no-underline">
              <span className="w-5 h-5 bg-violet-600 rounded-md flex items-center justify-center text-white text-xs font-black">L</span>
              Loop
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-[13px] text-gray-500 font-medium">
              <a href="#features" className="hover:text-black transition no-underline">Features</a>
              <Link href="/pricing" className="hover:text-black transition no-underline">Pricing</Link>
              <a href="#architecture" className="hover:text-black transition no-underline">Architecture</a>
            </nav>
          </div>
          
          {/* Dual Path Entry Gates */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="/login" className="text-[13px] text-gray-500 hover:text-black font-semibold transition no-underline">
              Access Old Account
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-violet-600 text-white text-[13px] font-bold rounded-lg hover:bg-violet-700 transition shadow-sm shadow-violet-600/10 no-underline">
              Start free trial
            </Link>
          </div>

          <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Slide Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 right-0 border-b border-gray-200 px-6 py-6 flex flex-col gap-4 bg-white shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <a href="#features" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-black text-sm font-medium no-underline">Features</a>
            <Link href="/pricing" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-black text-sm font-medium no-underline">Pricing</Link>
            <div className="h-px bg-gray-100 my-1" />
            <Link href="/login" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-black text-sm font-semibold no-underline">Access Old Account</Link>
            <Link href="/signup" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 bg-violet-600 text-white text-sm font-bold rounded-lg text-center no-underline shadow-sm">Start free trial</Link>
          </div>
        )}
      </header>

      {/* Billion-Dollar Hero Section Frame */}
      <section className="relative z-10 pt-20 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Tech Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-200 bg-violet-50 text-[10px] text-violet-700 font-bold uppercase tracking-wider font-mono shadow-sm mx-auto">
            <Sparkles size={11} /> Next-Gen Workspace Engine
          </div>

          {/* Main Statement Title */}
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-gray-950 leading-[1.05] max-w-3xl mx-auto">
            Autonomous agency.<br />Zero friction context.
          </h1>
          
          {/* High-Converting Subtext */}
          <p className="text-sm sm:text-base text-gray-400 max-w-lg mx-auto font-normal leading-relaxed pt-2">
            Connect your Gmail, Drive, and system workflows into a unified, AI-orchestrated environment built for hyper-scale operations.
          </p>

          {/* Core Action Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 max-w-md mx-auto">
            <Link href="/signup" className="w-full sm:w-auto px-6 py-3 bg-violet-600 text-white text-sm font-bold rounded-lg hover:bg-violet-700 transition shadow-md shadow-violet-600/20 text-center no-underline flex items-center justify-center gap-2">
              Deploy Workspace Now <ArrowRight size={14} />
            </Link>
            <Link href="/login" className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-200 text-gray-600 hover:text-black text-sm font-bold rounded-lg hover:bg-gray-50 transition text-center no-underline shadow-sm">
              Access Old Account
            </Link>
          </div>

        </div>
      </section>

      {/* High-Fidelity Feature Matrix Section */}
      <section id="features" className="relative z-10 py-20 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] font-bold text-violet-600 font-mono uppercase tracking-widest">Platform capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950">Engineered to automate your runtime.</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl border border-gray-100 bg-[#FAFAFA] text-left space-y-4 hover:border-violet-200 transition duration-300">
              <div className="w-8 h-8 rounded-lg bg-violet-600/5 flex items-center justify-center text-violet-600">
                <Bot size={18} />
              </div>
              <h3 className="font-bold text-sm text-gray-950 tracking-tight">Dynamic AI Agents</h3>
              <p className="text-xs text-gray-400 font-normal leading-relaxed">
                Autonomous models that listen to complex execution commands and manage context variables seamlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl border border-gray-100 bg-[#FAFAFA] text-left space-y-4 hover:border-violet-200 transition duration-300">
              <div className="w-8 h-8 rounded-lg bg-violet-600/5 flex items-center justify-center text-violet-600">
                <Zap size={18} />
              </div>
              <h3 className="font-bold text-sm text-gray-950 tracking-tight">Deep Integrations</h3>
              <p className="text-xs text-gray-400 font-normal leading-relaxed">
                Connect your workspace structures like Gmail, Google Drive, and calendars instantly with absolute stability.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl border border-gray-100 bg-[#FAFAFA] text-left space-y-4 hover:border-violet-200 transition duration-300">
              <div className="w-8 h-8 rounded-lg bg-violet-600/5 flex items-center justify-center text-violet-600">
                <Shield size={18} />
              </div>
              <h3 className="font-bold text-sm text-gray-950 tracking-tight">Enterprise Token Security</h3>
              <p className="text-xs text-gray-400 font-normal leading-relaxed">
                Your keys, credentials, and data vectors are entirely encrypted and securely isolated at rest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Platform Status Grid Footer */}
      <footer className="border-t border-gray-200 py-12 px-6 bg-white text-xs text-gray-400 font-medium mt-auto relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
            <span className="w-4 h-4 bg-violet-600 rounded flex items-center justify-center text-white text-[9px] font-black">L</span>
            Loop Technology Inc.
          </span>
          <div className="flex gap-8 font-sans">
            <a href="#" className="hover:text-black transition no-underline text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-black transition no-underline text-gray-400">Terms of Operation</a>
            <a href="#" className="hover:text-black transition no-underline text-gray-400">Contact Systems</a>
          </div>
          <p className="font-mono text-[10px]">&copy; 2026 Loop Engine. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}