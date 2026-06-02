'use client';

import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#030303] text-zinc-300 antialiased selection:bg-emerald-500/20 selection:text-white relative overflow-hidden">
      
      {/* Premium Deep Color Core Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-emerald-500/10 via-violet-600/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40vh] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Clean High-End Geometric Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.15] pointer-events-none" />

      {/* Overhauled Premium Header */}
      <header className="fixed w-full top-0 z-50 bg-[#030303]/60 backdrop-blur-md border-b border-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <span className="text-md font-bold tracking-[0.2em] text-white uppercase font-sans">Loop</span>
            <nav className="hidden md:flex items-center gap-6 text-[11px] text-zinc-400 uppercase tracking-widest font-medium">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#integrations" className="hover:text-white transition-colors">Integrations</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="/login" className="text-[11px] uppercase tracking-widest text-zinc-400 hover:text-white font-medium transition-colors">Login</a>
            <a href="/signup" className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[11px] uppercase tracking-wider font-semibold rounded-full hover:brightness-110 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              Start Free Trial
            </a>
          </div>
          <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        
        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/[0.05] px-6 py-6 flex flex-col gap-4 bg-[#030303]/95 backdrop-blur-xl text-[11px] uppercase tracking-widest">
            <a href="#features" onClick={() => setMenuOpen(false)} className="text-zinc-400">Features</a>
            <a href="#integrations" onClick={() => setMenuOpen(false)} className="text-zinc-400">Integrations</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-zinc-400">Pricing</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="text-zinc-400">FAQ</a>
            <div className="h-px bg-white/[0.05] my-2" />
            <a href="/login" className="text-zinc-400">Login</a>
            <a href="/signup" className="px-5 py-2.5 bg-emerald-500 text-white text-center font-semibold rounded-full">Start Free Trial</a>
          </div>
        )}
      </header>

      {/* Kept Original Centered Structure — But Swapped with New Luxury Colors */}
      <section className="relative pt-44 pb-24 px-6 max-w-5xl mx-auto flex flex-col items-center text-center min-h-[85vh] justify-center">
        
        {/* Master Centered Headline with Premium Silver/White Gradient */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.1] mb-8">
          Your business. <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-indigo-400 bg-clip-text text-transparent">
            On autopilot.
          </span>
        </h1>
        
        {/* Crisp Subtext */}
        <p className="text-sm sm:text-base md:text-md text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-12 tracking-wide">
          Loop connects your Gmail, Google Drive and Calendar into one intelligent workspace. Your AI handles follow-ups, files and scheduling automatically — you stay in control. Always.
        </p>
        
        {/* Perfectly Color-Balanced Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-md">
          <a href="/signup" className="w-full sm:w-auto px-7 py-3.5 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-zinc-200 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.08)] flex items-center justify-center gap-2 group">
            Start Free Trial <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a href="#features" className="w-full sm:w-auto px-7 py-3.5 border border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.04] text-zinc-300 text-xs font-medium uppercase tracking-wider rounded-full transition-all">
            See How It Works
          </a>
        </div>
        
        {/* Subtle Bottom Footer Notice */}
        <div className="text-[10px] text-zinc-600 uppercase tracking-widest mt-16 flex flex-col sm:flex-row gap-2 sm:gap-4 font-medium">
          <span>No credit card required</span>
          <span className="hidden sm:inline text-zinc-800">&middot;</span>
          <span>Free 14-day trial</span>
          <span className="hidden sm:inline text-zinc-800">&middot;</span>
          <span>Cancel anytime</span>
        </div>

      </section>

    </main>
  );
}