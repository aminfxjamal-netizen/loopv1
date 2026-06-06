'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Shield, Zap, Terminal, 
  CheckCircle2, Sparkles, Mail, Calendar, Database, Layers
} from 'lucide-react';

export default function LoopLandingPage() {
  const [activeTab, setActiveTab] = useState<'email' | 'calendar' | 'tokens'>('email');

  return (
    <div className="min-h-screen bg-[#000000] text-[#F4F4F5] font-sans antialiased selection:bg-violet-500/30 relative overflow-x-hidden">
      {/* Premium Minimal Grid Mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f08_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-violet-500/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* FIXED HUD NAVIGATION */}
      <header className="h-16 border-b border-[#18181B] bg-[#000000]/60 backdrop-blur-xl flex items-center justify-between px-8 md:px-16 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded bg-white flex items-center justify-center">
            <div className="w-2 h-2 rounded-sm bg-black" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest text-white">Loop</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-[10px] uppercase font-bold tracking-widest text-[#A1A1AA]">
          <a href="#engine" className="hover:text-white transition">The Engine</a>
          <a href="#pricing" className="hover:text-white transition">Pricing Ledger</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-[10px] uppercase font-bold tracking-widest text-[#A1A1AA] hover:text-white transition">
            Console
          </Link>
          <Link href="/signup" className="h-9 px-4 bg-white hover:bg-[#E4E4E7] text-black text-[10px] font-black uppercase rounded transition flex items-center gap-1.5 cursor-pointer">
            Initialize <ArrowRight size={12} />
          </Link>
        </div>
      </header>

      {/* HERO HERO COLUMN FRAME */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 border border-[#27272A] bg-[#09090B] px-3 py-1 rounded text-[9px] font-mono tracking-widest text-[#A1A1AA]">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" /> ENGINE_STATUS :: DEPLOYED_PRODUCTION
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase max-w-4xl mx-auto leading-none">
          Autonomous workspace infrastructure <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A1A1AA] via-white to-[#52525B]">built for high-speed scale</span>
        </h1>

        <p className="text-xs md:text-sm text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed font-medium font-sans">
          Loop runs programmatic micro-agents directly inside your communication layers. Connect your tools, set internal token fences, and let intelligence execute background jobs at absolute zero margin loss.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/signup" className="w-full sm:w-auto h-11 px-6 bg-white hover:bg-[#E4E4E7] text-black text-xs font-bold uppercase rounded transition flex items-center justify-center gap-2 cursor-pointer">
            Boot Sandbox Environment <ArrowRight size={14} />
          </Link>
          <a href="#pricing" className="w-full sm:w-auto h-11 px-6 border border-[#18181B] bg-[#000000] text-[#A1A1AA] hover:text-white hover:border-[#27272A] text-xs font-bold uppercase rounded transition flex items-center justify-center gap-2 cursor-pointer">
            Analyze Credit Plans
          </a>
        </div>
      </section>

      {/* UNIQUE INTERACTIVE INTERFACE SHOWCASE */}
      <section id="engine" className="max-w-5xl mx-auto px-6 pb-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Interactive Dynamic Selectors */}
          <div className="lg:col-span-1 space-y-2 lg:pt-6">
            <div className="text-[9px] font-bold text-[#52525B] uppercase tracking-widest px-1 mb-3">Interactive Blueprints</div>
            {[
              { id: 'email', label: 'Gmail Interception Link', icon: Mail, desc: 'Scans inbox flows, filters high-value leads, and drafts contextual replies.' },
              { id: 'calendar', label: 'Calendar Engine Scheduler', icon: Calendar, desc: 'Coordinates scheduling slots cleanly without leaving the system container.' },
              { id: 'tokens', label: 'Token Arbitrage Vault', icon: Database, desc: 'Deducts internal user credits while leveraging rock-bottom raw API compute costs.' }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-4 rounded-xl border transition flex flex-col gap-1.5 relative ${
                    activeTab === tab.id 
                      ? 'bg-[#09090B] border-[#27272A] text-white' 
                      : 'border-transparent text-[#71717A] hover:text-[#A1A1AA] hover:bg-[#09090B]/30'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <Icon size={12} className={activeTab === tab.id ? 'text-violet-400' : 'text-[#52525B]'} />
                    {tab.label}
                  </div>
                  <p className="text-[11px] font-sans text-[#71717A] leading-normal">{tab.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Interactive Screen Simulation Frame */}
          <div className="lg:col-span-2 bg-[#09090B] border border-[#18181B] rounded-xl overflow-hidden shadow-2xl flex flex-col h-[320px]">
            <div className="bg-[#030303] border-b border-[#18181B] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[10px]">
                <Terminal size={12} className="text-violet-400" />
                <span className="text-white font-bold uppercase tracking-wider">simulation_node.log</span>
              </div>
              <div className="text-[9px] text-[#52525B] font-mono uppercase">Interactive Frame</div>
            </div>

            <div className="p-6 flex-1 font-mono text-[11px] leading-relaxed text-[#A1A1AA] overflow-y-auto bg-gradient-to-b from-[#09090B] to-[#040406]">
              {activeTab === 'email' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="space-y-1.5">
                  <p className="text-[#52525B]">// Connecting to user inbound SMTP stream...</p>
                  <p className="text-white">→ Found unread inquiry: <span className="text-violet-400">"Looking for partnership terms..."</span></p>
                  <p className="text-[#A1A1AA]">↳ Invoking pipeline parser via Groq Llama 3.1 8B Core.</p>
                  <p className="text-emerald-400">✓ Reply drafted and queued successfully. Execution complete.</p>
                </motion.div>
              )}

              {activeTab === 'calendar' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="space-y-1.5">
                  <p className="text-[#52525B]">// Scanning primary Google Calendar resource slots...</p>
                  <p className="text-white">→ Request: <span className="text-blue-400">"Reschedule dev sync to Monday afternoon."</span></p>
                  <p className="text-[#A1A1AA]">↳ Mutating time block boundaries: 14:00 UTC - 14:30 UTC.</p>
                  <p className="text-emerald-400">✓ Database index updated. Notification packet broadcasted.</p>
                </motion.div>
              )}

              {activeTab === 'tokens' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="space-y-1.5">
                  <p className="text-[#52525B]">// Arbitrage calculation gate initialized.</p>
                  <p className="text-[#A1A1AA]">User profile tier: <span className="text-white font-bold">Basic Tier</span></p>
                  <p className="text-violet-400">↳ Deducted: 42,500 Loop Tokens from internal storage ledger.</p>
                  <p className="text-[#52525B]">↳ Actual backend cost to you via Groq API network: $0.00012</p>
                  <p className="text-emerald-400">✓ Profit margin safeguarded: ~98.4% allocation retained.</p>
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* CLEAN PRICING LEDGER CARDS */}
      <section id="pricing" className="border-t border-[#18181B] bg-[#030303]/40 py-24 relative z-10">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-2">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-violet-400 flex items-center justify-center gap-1.5"><Layers size={12} /> System Quotas</h2>
            <p className="text-xl font-black uppercase text-white tracking-tight">Predictable Container Allocation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* FREE TIER */}
            <div className="bg-[#000000] border border-[#18181B] rounded-xl p-6 flex flex-col justify-between hover:border-[#27272A] transition">
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] uppercase font-bold text-[#52525B] tracking-widest">Sandbox</p>
                  <h3 className="text-2xl font-black text-white mt-1">$0</h3>
                </div>
                <p className="text-[11px] font-sans text-[#A1A1AA]">Evaluate autonomous execution pipelines completely free.</p>
                <div className="space-y-2 text-[10px] font-mono text-[#71717A]">
                  <p className="flex items-center gap-2"><CheckCircle2 size={12} className="text-white" /> 1.5M Monthly Loop Credits</p>
                  <p className="flex items-center gap-2"><CheckCircle2 size={12} className="text-white" /> Llama 3.1 Inference Access</p>
                </div>
              </div>
              <Link href="/signup" className="w-full h-9 border border-[#18181B] hover:border-[#27272A] text-white text-[10px] font-bold uppercase rounded transition flex items-center justify-center mt-8 cursor-pointer">
                Boot Node
              </Link>
            </div>

            {/* BASIC TIER */}
            <div className="bg-[#000000] border border-violet-500/30 rounded-xl p-6 flex flex-col justify-between relative shadow-[0_0_30px_rgba(139,92,246,0.03)]">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white text-black px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">Standard</div>
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] uppercase font-bold text-violet-400 tracking-widest">Basic Plan</p>
                  <h3 className="text-2xl font-black text-white mt-1">$19<span className="text-xs font-normal text-[#52525B]"> / mo</span></h3>
                </div>
                <p className="text-[11px] font-sans text-[#A1A1AA]">For individual professionals automating heavy daily routines.</p>
                <div className="space-y-2 text-[10px] font-mono text-[#71717A]">
                  <p className="flex items-center gap-2"><CheckCircle2 size={12} className="text-violet-400" /> 50M Monthly Loop Credits</p>
                  <p className="flex items-center gap-2"><CheckCircle2 size={12} className="text-violet-400" /> Automated Active Routing</p>
                </div>
              </div>
              <Link href="/signup" className="w-full h-9 bg-white text-black text-[10px] font-bold uppercase rounded hover:bg-[#E4E4E7] transition flex items-center justify-center mt-8 cursor-pointer">
                Provision Link
              </Link>
            </div>

            {/* PRO TIER */}
            <div className="bg-[#000000] border border-[#18181B] rounded-xl p-6 flex flex-col justify-between hover:border-[#27272A] transition">
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] uppercase font-bold text-[#52525B] tracking-widest">Professional</p>
                  <h3 className="text-2xl font-black text-white mt-1">$49<span className="text-xs font-normal text-[#52525B]"> / mo</span></h3>
                </div>
                <p className="text-[11px] font-sans text-[#A1A1AA]">Enterprise-level volume volume ceiling for extreme multi-task scaling.</p>
                <div className="space-y-2 text-[10px] font-mono text-[#71717A]">
                  <p className="flex items-center gap-2"><CheckCircle2 size={12} className="text-white" /> 200M Monthly Loop Credits</p>
                  <p className="flex items-center gap-2"><CheckCircle2 size={12} className="text-white" /> DeepSeek Core Reasoning Matrix</p>
                </div>
              </div>
              <Link href="/signup" className="w-full h-9 border border-[#18181B] hover:border-[#27272A] text-white text-[10px] font-bold uppercase rounded transition flex items-center justify-center mt-8 cursor-pointer">
                Deploy Matrix
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LOGISTICS FOOTER BLOCK */}
      <footer className="h-16 border-t border-[#18181B] bg-[#000000] px-8 md:px-16 flex items-center justify-between text-[9px] text-[#52525B] tracking-wider uppercase font-mono">
        <p>© 2026 Loop Technology Stack. All systems isolated.</p>
        <p className="hidden sm:block">Cluster Node: Active_Stable</p>
      </footer>
    </div>
  );
}