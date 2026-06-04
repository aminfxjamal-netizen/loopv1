'use client';

import Link from 'next/link';
import { Terminal, Activity, ArrowRight, Shield, Layers, Cpu } from 'lucide-react';

export default function LuxuryLandingPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-[#E4E4E7] font-mono antialiased relative selection:bg-violet-500/30 selection:text-white">
      
      {/* Engineering Grid Background Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f10_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f10_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Top Navigation Bar */}
      <header className="border-b border-[#18181B] bg-[#030303]/80 backdrop-blur-md sticky top-0 z-50 h-14 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-white">Loop Engine</span>
        </div>
        
        {/* Real Authentication Navigation Node Links */}
        <div className="flex items-center gap-5">
          <Link 
            href="/login" 
            className="text-[10px] uppercase tracking-wider font-bold text-[#A1A1AA] hover:text-white transition"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            className="h-8 px-4 bg-white hover:bg-[#E4E4E7] text-black font-black rounded-md transition text-[10px] uppercase tracking-wider flex items-center justify-center shadow-md"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-16 relative z-10 text-center space-y-8">
        
        {/* Status System Badge */}
        <div className="inline-flex items-center gap-2 text-[10px] text-[#A1A1AA] border border-[#27272A] px-2.5 py-1 rounded-full bg-[#030303] shadow-inner mx-auto">
          <Activity size={12} className="text-violet-500" />
          <span>SINGLE-OPERATOR AUTOMATION NODE LIVE // v1.0.0</span>
        </div>

        {/* Main Value Proposition */}
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white max-w-2xl mx-auto uppercase leading-tight">
          Orchestrate Your Entire Workspace In One Terminal
        </h1>
        
        <p className="text-xs md:text-sm text-[#A1A1AA] max-w-lg mx-auto font-sans font-medium leading-relaxed">
          Connect your real production data pipelines. Let AI index your files, manage schedules, and coordinate background operations without template clutter.
        </p>

        {/* Premium Core Action Redirect Route */}
        <div className="pt-4">
          <Link 
            href="/signup" 
            className="inline-flex items-center gap-2 h-11 px-6 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-lg transition text-xs uppercase tracking-wider shadow-lg group shadow-violet-600/10 border border-violet-500/50"
          >
            Get Started
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Live Interface Preview Block */}
        <div className="pt-12 max-w-3xl mx-auto">
          <div className="bg-[#030303] border border-[#18181B] rounded-xl overflow-hidden shadow-2xl text-left font-mono text-[11px]">
            {/* Window Header */}
            <div className="bg-[#09090B] border-b border-[#18181B] px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#27272A] rounded-full" />
                <span className="w-2.5 h-2.5 bg-[#27272A] rounded-full" />
                <span className="w-2.5 h-2.5 bg-[#27272A] rounded-full" />
              </div>
              <span className="text-[#52525B] text-[10px]">PREVIEW_STREAM@LOOP</span>
              <div className="w-4" />
            </div>
            {/* Code Body */}
            <div className="p-4 space-y-2 text-[#A1A1AA]">
              <p className="text-[#52525B]">// Live runtime authorization preview</p>
              <p><span className="text-violet-400">@loop/engine:</span> secure_handshake initiated successfully.</p>
              <p><span className="text-emerald-400">✔</span> connected_apps: <span className="text-white">["Gmail", "Google_Drive", "Calendar"]</span></p>
              <p><span className="text-violet-400">@loop/engine:</span> awaiting natural language instruction stream...</p>
            </div>
          </div>
        </div>
      </main>

      <hr className="border-[#18181B] max-w-4xl mx-auto" />

      {/* Feature Architecture Matrix */}
      <section className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        
        <div className="bg-[#030303] border border-[#18181B] p-5 rounded-xl space-y-3 shadow-md">
          <div className="w-8 h-8 bg-[#09090B] border border-[#18181B] rounded-lg flex items-center justify-center text-violet-400">
            <Cpu size={14} />
          </div>
          <h3 className="text-xs font-bold uppercase text-white tracking-wider">Zero Fake Data</h3>
          <p className="text-[11px] text-[#A1A1AA] font-sans font-medium leading-relaxed">
            Direct authenticated integration blocks connect natively to live app records with full encryption protocols.
          </p>
        </div>

        <div className="bg-[#030303] border border-[#18181B] p-5 rounded-xl space-y-3 shadow-md">
          <div className="w-8 h-8 bg-[#09090B] border border-[#18181B] rounded-lg flex items-center justify-center text-violet-400">
            <Layers size={14} />
          </div>
          <h3 className="text-xs font-bold uppercase text-white tracking-wider">Unified Context</h3>
          <p className="text-[11px] text-[#A1A1AA] font-sans font-medium leading-relaxed">
            Cross-reference emails, documents, and dynamic schedules simultaneously within a single running context session.
          </p>
        </div>

        <div className="bg-[#030303] border border-[#18181B] p-5 rounded-xl space-y-3 shadow-md">
          <div className="w-8 h-8 bg-[#09090B] border border-[#18181B] rounded-lg flex items-center justify-center text-violet-400">
            <Shield size={14} />
          </div>
          <h3 className="text-xs font-bold uppercase text-white tracking-wider">Isolated Sandbox</h3>
          <p className="text-[11px] text-[#A1A1AA] font-sans font-medium leading-relaxed">
            Your runtime is entirely isolated and secured via Row Level Database Security constraints inside your user container.
          </p>
        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-[#18181B] bg-[#030303] py-6 text-center text-[10px] text-[#52525B]">
        <p>© 2026 LOOP SYSTEM TECHNOLOGIES. ALL CORE REGISTERS RESERVED.</p>
      </footer>

    </div>
  );
}