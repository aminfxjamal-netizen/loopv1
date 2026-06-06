'use client';

import Link from 'next/link';
import { 
  Cpu, ArrowRight, ShieldCheck, Zap, 
  Terminal as TerminalIcon, CheckCircle2, Layers, HelpCircle
} from 'lucide-react';

export default function LoopLandingPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-[#E4E4E7] font-mono flex flex-col antialiased relative selection:bg-violet-500/30">
      {/* Background Matrix Grid Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f15_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-violet-500/5 via-transparent to-transparent blur-3xl pointer-events-none z-0" />

      {/* NAVIGATION NAVBAR BAR */}
      <header className="border-b border-[#18181B] bg-[#030303]/80 backdrop-blur-md h-16 flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-violet-500/10 border border-violet-500/30 text-violet-400 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <Cpu size={14} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-white">Loop Engine</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-[10px] uppercase font-bold tracking-wider text-[#A1A1AA]">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#architecture" className="hover:text-white transition">Architecture</a>
          <a href="#pricing" className="hover:text-white transition">Container Tiers</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-[10px] uppercase font-bold tracking-wider text-[#A1A1AA] hover:text-white transition">
            Console Login
          </Link>
          <Link href="/signup" className="h-9 px-4 bg-white hover:bg-[#E4E4E7] text-black text-[10px] font-black uppercase rounded-md transition flex items-center gap-1.5 cursor-pointer">
            Initialize Sandbox <ArrowRight size={12} />
          </Link>
        </div>
      </header>

      {/* HERO SECTION CONTAINER */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-16 text-center space-y-8">
        <div className="inline-flex items-center gap-2 border border-violet-500/30 bg-violet-500/5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.1)] animate-pulse">
          <Zap size={10} /> Live Token Arbitrage Engine Configured
        </div>

        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase max-w-3xl mx-auto leading-none">
          Automate your workspace operations with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white">isolated AI runtimes</span>
        </h1>

        <p className="text-xs md:text-sm text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed font-sans font-medium">
          Loop Engine links secure AI agents directly to your Gmail, Google Drive, and Calendar. Execute multi-step routines instantly on raw infrastructure built for hyper-scale profit margins.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/signup" className="w-full sm:w-auto h-11 px-6 bg-violet-600 hover:bg-violet-500 text-white text-xs font-black uppercase rounded-md transition flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(139,92,246,0.3)] cursor-pointer">
            Deploy Free Core Node <ArrowRight size={14} />
          </Link>
          <a href="#pricing" className="w-full sm:w-auto h-11 px-6 border border-[#18181B] bg-[#030303] text-[#A1A1AA] hover:text-white hover:border-[#27272A] text-xs font-black uppercase rounded-md transition flex items-center justify-center gap-2 cursor-pointer">
            View Pricing Tiers
          </a>
        </div>
      </section>

      {/* APP INTERACTIVE PREVIEW */}
      <section id="features" className="relative z-10 max-w-5xl w-full mx-auto px-6 pb-24">
        <div className="bg-[#030303] border border-[#18181B] rounded-xl overflow-hidden shadow-2xl flex flex-col">
          <div className="bg-[#09090B] border-b border-[#18181B] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TerminalIcon size={12} className="text-violet-400" />
              <span className="text-[10px] font-black uppercase text-white tracking-wider">loop_agent_runtime.sh</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#27272A]" />
              <div className="w-2 h-2 rounded-full bg-[#27272A]" />
              <div className="w-2 h-2 rounded-full bg-[#27272A]" />
            </div>
          </div>
          <div className="p-6 bg-gradient-to-b from-[#030303] to-[#050507] min-h-[180px] space-y-2 text-[11px] text-[#A1A1AA]">
            <p className="text-[#52525B]">// Initializing direct pipeline proxy triggers...</p>
            <p className="text-emerald-400">$ loop-engine connect --pipeline=G_MAIL --mode=auto</p>
            <p className="text-white">✓ Securely locked onto Google workspace access layer node.</p>
            <p className="text-violet-400">⚡ Core Router: Executing task tracking matrix via Groq Llama 3.1 8B...</p>
            <p className="text-[#A1A1AA]">↳ Deducting internal compute credits. Core loop completed seamlessly.</p>
          </div>
        </div>
      </section>

      {/* CORE BUSINESS METRICS / FEATURES SECTION */}
      <section id="architecture" className="relative z-10 border-t border-[#18181B] bg-[#030303]/40 py-20">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-8 h-8 bg-violet-500/5 border border-violet-500/10 text-violet-400 rounded-lg flex items-center justify-center"><Zap size={14} /></div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white">Sub-Millisecond Inference</h3>
            <p className="text-[11px] text-[#A1A1AA] leading-relaxed font-sans">Powered directly by Groq architecture. Run workspace automations at lightning speeds with zero latency bottlenecks.</p>
          </div>
          <div className="space-y-3">
            <div className="w-8 h-8 bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center"><ShieldCheck size={14} /></div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white">RLS Tenant Isolation</h3>
            <p className="text-[11px] text-[#A1A1AA] leading-relaxed font-sans">Strict Supabase Row-Level Security ensures your credentials, emails, and token data paths are perfectly isolated and cryptographically secure.</p>
          </div>
          <div className="space-y-3">
            <div className="w-8 h-8 bg-blue-500/5 border border-blue-500/10 text-blue-400 rounded-lg flex items-center justify-center"><Layers size={14} /></div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white">Token Arbitrage Ledger</h3>
            <p className="text-[11px] text-[#A1A1AA] leading-relaxed font-sans">Our customized internal credit tracking parameters keep server costs at fraction-of-a-penny limits, protecting operational gross profit margins.</p>
          </div>
        </div>
      </section>

      {/* PRICING PLANS MATRICES */}
      <section id="pricing" className="relative z-10 max-w-5xl w-full mx-auto px-6 py-24 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-black uppercase tracking-widest text-violet-400 flex items-center justify-center gap-1.5"><Layers size={12} /> Secure Infrastructure Billing</h2>
          <p className="text-xl font-black uppercase text-white tracking-tight">Select your compute cluster container</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FREE TRIAL TIER */}
          <div className="bg-[#030303] border border-[#18181B] rounded-xl p-6 flex flex-col justify-between relative group hover:border-[#27272A] transition">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-[#52525B]">Evaluation Sandbox</p>
                <h3 className="text-2xl font-black text-white mt-1">$0<span className="text-xs font-normal text-[#52525B]"> / mo</span></h3>
              </div>
              <p className="text-[11px] text-[#A1A1AA] font-sans">Perfect environment parameters to run testing routines on local systems.</p>
              <ul className="space-y-2 text-[10px] text-[#A1A1AA]">
                <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-violet-400" /> 1,500,000 Monthly Tokens</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-violet-400" /> Standard Google Pipeline Connections</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-violet-400" /> Llama 3.1 8B Processing Core</li>
              </ul>
            </div>
            <Link href="/signup" className="w-full h-9 border border-[#18181B] bg-[#09090B] hover:border-[#27272A] text-white text-[10px] font-black uppercase rounded-md transition flex items-center justify-center mt-6 cursor-pointer">
              Initialize Free Node
            </Link>
          </div>

          {/* BASIC PLAN */}
          <div className="bg-[#030303] border border-violet-500/30 rounded-xl p-6 flex flex-col justify-between relative shadow-[0_0_30px_rgba(139,92,246,0.05)] group">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-violet-600 border border-violet-400/30 px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest text-white">Most Active</div>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-violet-400">Basic Container</p>
                <h3 className="text-2xl font-black text-white mt-1">$19<span className="text-xs font-normal text-[#52525B]"> / mo</span></h3>
              </div>
              <p className="text-[11px] text-[#A1A1AA] font-sans">Built specifically for individual system operators managing heavy workflows.</p>
              <ul className="space-y-2 text-[10px] text-[#A1A1AA]">
                <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-violet-400" /> 50,000,000 Monthly Tokens</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-violet-400" /> Automated Background Agents</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-violet-400" /> Hybrid 8B / 70B Routing Matrices</li>
              </ul>
            </div>
            <Link href="/signup" className="w-full h-9 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-black uppercase rounded-md transition flex items-center justify-center mt-6 shadow-[0_0_15px_rgba(139,92,246,0.2)] cursor-pointer">
              Provision Basic Container
            </Link>
          </div>

          {/* PRO PLAN */}
          <div className="bg-[#030303] border border-[#18181B] rounded-xl p-6 flex flex-col justify-between relative group hover:border-[#27272A] transition">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-[#52525B]">Professional Routine</p>
                <h3 className="text-2xl font-black text-white mt-1">$49<span className="text-xs font-normal text-[#52525B]"> / mo</span></h3>
              </div>
              <p className="text-[11px] text-[#A1A1AA] font-sans">Enterprise-tier architecture for power-operators requiring heavy raw compute.</p>
              <ul className="space-y-2 text-[10px] text-[#A1A1AA]">
                <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-violet-400" /> 200,000,000 Monthly Tokens</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-violet-400" /> DeepSeek Reasoning Matrix Processing</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-violet-400" /> Unlimited Priority Context Folders</li>
              </ul>
            </div>
            <Link href="/signup" className="w-full h-9 border border-[#18181B] bg-[#09090B] hover:border-[#27272A] text-white text-[10px] font-black uppercase rounded-md transition flex items-center justify-center mt-6 cursor-pointer">
              Deploy Professional Matrix
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER COCKPIT TERMINAL HEADER */}
      <footer className="border-t border-[#18181B] bg-[#030303] py-8 px-6 text-center md:flex md:items-center md:justify-between md:px-12 text-[10px] text-[#52525B]">
        <p>© 2026 LOOP SYSTEM TECHNOLOGIES INC. RUNTIME CORE SECURED AND VERIFIED.</p>
        <p className="mt-2 md:mt-0 tracking-wider uppercase">V1.0.4 // INFRASTRUCTURE_ONLINE</p>
      </footer>
    </div>
  );
}