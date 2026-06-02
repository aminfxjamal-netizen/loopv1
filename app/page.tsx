'use client';

import { useState } from 'react';
import { Mail, FolderOpen, Calendar, ArrowRight, Shield, Zap, CheckCircle2, Menu, X, ArrowUpRight, Globe, Fingerprint } from 'lucide-react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#030303] text-zinc-300 antialiased selection:bg-violet-500/20 selection:text-white overflow-x-hidden">
      
      {/* Cinematic Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-violet-600/10 via-indigo-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[60vh] -left-40 w-[400px] h-[400px] bg-violet-800/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[120vh] -right-40 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Subtle Premium Geometric Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#16161a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Luxury Minimalist Header */}
      <header className="fixed w-full top-0 z-50 bg-[#030303]/40 backdrop-blur-xl border-b border-white/[0.03]">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-14">
            <span className="text-xl font-medium tracking-[0.25em] text-white uppercase font-sans">Loop</span>
            <nav className="hidden md:flex items-center gap-8 text-[11px] text-zinc-400 uppercase tracking-[0.2em] font-medium">
              <a href="#ecosystem" className="hover:text-white transition-colors duration-300">Ecosystem</a>
              <a href="#safeguards" className="hover:text-white transition-colors duration-300">Safeguards</a>
              <a href="#pricing" className="hover:text-white transition-colors duration-300">Licensing</a>
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="/login" className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 hover:text-white font-medium transition-colors duration-300">Client Portal</a>
            <a href="/signup" className="relative group overflow-hidden px-6 py-3 rounded-full bg-white text-black text-[11px] uppercase tracking-[0.15em] font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]">
              <span className="relative z-10">Start Free Trial</span>
            </a>
          </div>
          <button className="md:hidden text-zinc-400 hover:text-white transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/[0.05] px-8 py-8 flex flex-col gap-6 bg-[#030303]/95 backdrop-blur-2xl text-[11px] uppercase tracking-[0.2em]">
            <a href="#ecosystem" onClick={() => setMenuOpen(false)} className="text-zinc-400 hover:text-white">Ecosystem</a>
            <a href="#safeguards" onClick={() => setMenuOpen(false)} className="text-zinc-400 hover:text-white">Safeguards</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-zinc-400 hover:text-white">Licensing</a>
            <div className="h-px bg-white/[0.05] my-2" />
            <a href="/login" className="text-zinc-400 hover:text-white">Client Portal</a>
            <a href="/signup" className="px-6 py-4 bg-white text-black text-center font-bold rounded-full">Start Free Trial</a>
          </div>
        )}
      </header>

      {/* Cinematic Hero Section */}
      <section className="relative pt-48 pb-32 px-8 max-w-7xl mx-auto flex flex-col items-center text-center min-h-[95vh] justify-center">
        
        {/* High-End Innovation Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-[10px] uppercase tracking-[0.25em] text-violet-300 mb-10 shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.5)] animate-pulse" />
          Autonomous Workspace Protocol
        </div>
        
        {/* Master Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white max-w-5xl leading-[1.08] mb-8">
          Your business operations. <br />
          <span className="font-normal bg-gradient-to-r from-zinc-100 via-white to-zinc-500 bg-clip-text text-transparent">
            Executed on beautiful autopilot.
          </span>
        </h1>
        
        {/* Balanced, Persuasive Subtext */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-12 tracking-wide">
          Loop elegantly bridges your Gmail, Google Drive, and Calendar assets into a singular, hyper-intelligent operation matrix. The system maps client workflows seamlessly, keeping you in absolute creative control.
        </p>
        
        {/* Premium Action Triggers */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 w-full max-w-md">
          <a href="/signup" className="w-full sm:w-auto px-8 py-4 bg-white text-black text-xs font-semibold uppercase tracking-[0.15em] rounded-full hover:bg-zinc-200 transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 group">
            Experience Loop <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <a href="#ecosystem" className="w-full sm:w-auto px-8 py-4 border border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.04] text-white text-xs font-medium uppercase tracking-[0.15em] rounded-full transition-all duration-300 backdrop-blur-sm">
            Study Mechanics
          </a>
        </div>
        
        <p className="text-[10px] text-zinc-600 mt-6 tracking-[0.15em] uppercase font-medium">No credit card required &middot; 14-day initialization access</p>

        {/* Floating High-Fidelity UI Frame Preview */}
        <div className="w-full max-w-5xl mt-24 border border-white/[0.06] rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md relative">
          <div className="absolute -top-px left-20 right-20 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
          <div className="rounded-xl overflow-hidden bg-[#070709] border border-white/[0.02] aspect-[16/9] flex flex-col">
            {/* Window chrome header */}
            <div className="h-12 border-b border-white/[0.03] px-6 flex items-center justify-between bg-[#09090c]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <span className="text-[10px] text-zinc-500 font-mono tracking-wider ml-4">WORKSPACE_ORCHESTRATION_ENGINE // ACTIVE</span>
              </div>
              <div className="w-32 h-4 rounded bg-white/[0.02] border border-white/[0.03]" />
            </div>
            {/* Content Area Representing Premium Workspace Layout */}
            <div className="flex-1 p-8 grid grid-cols-12 gap-6 text-left">
              <div className="col-span-4 border-r border-white/[0.03] pr-6 space-y-4">
                <div className="h-6 w-24 bg-white/[0.04] rounded border border-white/[0.02]" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-white/[0.02] rounded" />
                  <div className="h-3 w-4/5 bg-white/[0.02] rounded" />
                  <div className="h-3 w-5/6 bg-white/[0.02] rounded" />
                </div>
              </div>
              <div className="col-span-8 space-y-4 pl-2">
                <div className="h-8 w-full bg-gradient-to-r from-violet-500/10 to-transparent rounded border border-violet-500/10 p-2 flex items-center justify-between">
                  <div className="h-3 w-48 bg-white/[0.05] rounded" />
                  <div className="h-4 w-16 bg-white text-black text-[9px] font-bold rounded flex items-center justify-center uppercase tracking-wider">LIVE</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-white/[0.01] border border-white/[0.03] rounded-xl p-4 space-y-2">
                    <Mail size={16} className="text-violet-400" />
                    <div className="h-3 w-20 bg-white/[0.05] rounded mt-4" />
                    <div className="h-2 w-full bg-white/[0.02] rounded" />
                  </div>
                  <div className="h-32 bg-white/[0.01] border border-white/[0.03] rounded-xl p-4 space-y-2">
                    <Calendar size={16} className="text-indigo-400" />
                    <div className="h-3 w-20 bg-white/[0.05] rounded mt-4" />
                    <div className="h-2 w-full bg-white/[0.02] rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* The Ecosystem Interactive Matrix */}
      <section id="ecosystem" className="py-32 px-8 max-w-7xl mx-auto border-t border-white/[0.03]">
        <div className="max-w-3xl mb-20">
          <span className="text-violet-400 text-[10px] font-semibold uppercase tracking-[0.3em] block mb-3">01 / Ecosystem Integration</span>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight leading-snug">
            Unified data execution. Zero structural frictions.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Mail className="text-violet-400" />, title: 'Gmail Automation Node', desc: 'Loop extracts raw context from complicated email chains, draft schedules, and populates follow-up sequences automatically.' },
            { icon: <FolderOpen className="text-indigo-400" />, title: 'Drive Memory Indexer', desc: 'No manual sorting configurations required. Documents and company guides synthesize safely into local context models.' },
            { icon: <Calendar className="text-emerald-400" />, title: 'Calendar Sync Engine', desc: 'The system protects high-intensity deep work blocks, builds dynamic buffer windows, and optimizes meeting spaces instantly.' }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-2xl border border-white/[0.03] bg-gradient-to-b from-white/[0.01] to-transparent transition-all duration-500 hover:border-white/[0.08] hover:translate-y-[-4px]"
              onMouseEnter={() => setHoveredFeature(idx)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] inline-block mb-6 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-lg font-normal text-white mb-3 tracking-wide">{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Safeguard Protocol Section */}
      <section id="safeguards" className="py-32 px-8 bg-gradient-to-b from-white/[0.01] to-transparent border-t border-white/[0.03]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-zinc-500 text-[10px] font-semibold uppercase tracking-[0.3em] block">02 / Safeguard Infrastructure</span>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-[1.15]">
              Absolute human authority, guaranteed.
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed font-light max-w-xl">
              Loop acts autonomously but executes exclusively upon your authorization. Outbound responses, scheduling shifts, and file alterations wait safely inside your localized authorization queue dashboard for manual verification.
            </p>
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <CheckCircle2 size={16} className="text-violet-400" />
                <span className="font-light">End-to-end data transmission safeguards</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <CheckCircle2 size={16} className="text-violet-400" />
                <span className="font-light">Localized operational context sandboxing</span>
              </div>
            </div>
          </div>
          
          <div className="border border-white/[0.04] p-8 rounded-2xl bg-black/40 backdrop-blur-md space-y-6 relative">
            <div className="absolute top-0 right-12 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3 border-b border-white/[0.04] pb-4">
              <Fingerprint size={18} className="text-violet-400" />
              <span className="text-xs uppercase tracking-[0.15em] font-medium text-white">Security Verification Standard</span>
            </div>
            <p className="text-xs text-zinc-500 font-mono leading-relaxed">
              &gt; verification_status: ENFORCED <br />
              &gt; workspace_isolation: ACTIVE <br />
              &gt; zero_data_leakage_protocol: VERIFIED
            </p>
          </div>
        </div>
      </section>

      {/* Luxury Per-User Plan Pricing Cards */}
      <section id="pricing" className="py-32 px-8 max-w-7xl mx-auto border-t border-white/[0.03]">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <span className="text-violet-400 text-[10px] font-semibold uppercase tracking-[0.3em]">03 / Tier Licensing</span>
          <h2 className="text-3xl font-light text-white tracking-tight">Predictable scaling, zero bloat.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {[
            { name: 'Evaluation', price: '$0', period: '14 days access', desc: 'Complete environment setup to review core mapping models.', action: 'Initiate Run' },
            { name: 'Professional Core', price: '$9', period: 'per user / mo', desc: 'Continuous contextual integration across individual profiles.', action: 'Deploy Core', popular: true },
            { name: 'Enterprise Matrix', price: '$29', period: 'per user / mo', desc: 'Complex cross-admin access logic trees for multi-tier scaling companies.', action: 'Request Cluster' }
          ].map((tier, idx) => (
            <div 
              key={idx} 
              className={`p-8 rounded-2xl border transition-all duration-500 flex flex-col justify-between space-y-8 relative overflow-hidden bg-gradient-to-b ${tier.popular ? 'border-violet-500/30 from-violet-500/[0.03] to-transparent shadow-[0_10px_30px_rgba(139,92,246,0.05)]' : 'border-white/[0.03] from-white/[0.01] to-transparent'}`}
            >
              {tier.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-white text-black text-[9px] font-bold tracking-widest rounded-full uppercase">
                  RECOMMENDED
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold tracking-[0.15em] text-white uppercase">{tier.name}</h3>
                  <p className="text-xs text-zinc-500 font-light mt-2 leading-relaxed min-h-[36px]">{tier.desc}</p>
                </div>
                <div className="flex items-baseline gap-2 pt-2">
                  <span className="text-4xl font-light text-white tracking-tight">{tier.price}</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">{tier.period}</span>
                </div>
              </div>
              <a 
                href="/signup" 
                className={`w-full py-3 text-center text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${tier.popular ? 'bg-white text-black hover:bg-zinc-200' : 'bg-white/[0.02] border border-white/[0.08] text-white hover:bg-white/[0.06]'}`}
              >
                {tier.action}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Elite Executive Footer */}
      <footer className="border-t border-white/[0.03] py-16 px-8 text-[11px] text-zinc-600 tracking-[0.15em] uppercase font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-white font-sans text-sm tracking-[0.25em]">Loop</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors duration-300">Security</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Systems</a>
          </div>
          <p className="font-mono text-[10px] text-zinc-700 tracking-normal">&copy; 2026 Loop Workspace Inc.</p>
        </div>
      </footer>

    </main>
  );
}