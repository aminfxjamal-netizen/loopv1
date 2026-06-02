'use client';

import { useState } from 'react';
import { Mail, FolderOpen, Calendar, Check, ArrowRight, Menu, X, Play, Shield, Terminal, Sparkles } from 'lucide-react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved'>('pending');

  // Interactive Live Dashboard Queue Preview Data
  const queueTasks = [
    { id: 1, type: 'email', source: 'Gmail', target: 'Client Follow-up', desc: 'Drafted follow-up regarding missed contract deadline.', status: 'pending', time: 'Just now' },
    { id: 2, type: 'calendar', source: 'Google Calendar', target: 'Deep Work Block', desc: 'Suggested 45m recovery buffer after consecutive high-intensity syncs.', status: 'pending', time: '2m ago' },
    { id: 3, type: 'drive', source: 'Google Drive', target: 'Project Sheet', desc: 'Extracted executive summary and structured pricing logs.', status: 'approved', time: '10m ago' },
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0C] text-zinc-200 antialiased selection:bg-violet-500/30 selection:text-white">
      
      {/* Subtle Grid Border Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px)] bg-[size:15%_100%] opacity-20 pointer-events-none" />

      {/* Modern Fixed Navbar */}
      <header className="border-b border-zinc-900 fixed w-full top-0 z-50 bg-[#0A0A0C]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <span className="text-md font-bold tracking-wider text-white uppercase">Loop</span>
            <nav className="hidden md:flex items-center gap-6 text-xs text-zinc-400 uppercase tracking-wider font-medium">
              <a href="#features" className="hover:text-zinc-200 transition-colors">Platform</a>
              <a href="#workflow" className="hover:text-zinc-200 transition-colors">Workflow</a>
              <a href="#pricing" className="hover:text-zinc-200 transition-colors">Pricing</a>
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="/login" className="text-xs uppercase tracking-wider text-zinc-400 hover:text-zinc-200 font-medium transition-colors">Login</a>
            <a href="/signup" className="px-4 py-2 bg-zinc-100 text-black text-xs uppercase tracking-wider font-semibold rounded hover:bg-zinc-200 transition-all shadow-sm">
              Start Free Trial
            </a>
          </div>
          <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-zinc-900 px-6 py-6 flex flex-col gap-4 bg-[#0A0A0C] text-xs uppercase tracking-wider">
            <a href="#features" onClick={() => setMenuOpen(false)} className="text-zinc-400">Platform</a>
            <a href="#workflow" onClick={() => setMenuOpen(false)} className="text-zinc-400">Workflow</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-zinc-400">Pricing</a>
            <div className="h-px bg-zinc-900 my-2" />
            <a href="/login" className="text-zinc-400">Login</a>
            <a href="/signup" className="px-4 py-2.5 bg-violet-600 text-white text-center font-semibold rounded">Start Free Trial</a>
          </div>
        )}
      </header>

      {/* Asymmetric Split Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto border-b border-zinc-900 min-h-[90vh] flex items-center">
        <div className="grid lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Side: Premium Conservative Typography */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-widest text-zinc-400">
              <span className="w-1 h-1 rounded-full bg-violet-500 animate-pulse" />
              Automated Workspace Protocol
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
              Your business operations. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">
                Executed on autopilot.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed font-light">
              Loop safely bridges your Gmail, Google Drive, and Calendar channels into a singular localized memory engine. The assistant autonomously drafts follow-ups and organizes scheduling, keeping you in complete validation control.
            </p>
            
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a href="/signup" className="px-5 py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group shadow-lg shadow-violet-600/10">
                Initiate 14-Day Free Trial <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#features" className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-xs uppercase tracking-wider text-zinc-300 text-center transition-colors">
                Explore Mechanics
              </a>
            </div>
            <div className="text-[10px] text-zinc-500 tracking-wider">No credit card authorization required to build.</div>
          </div>

          {/* Right Side: High-End Live Queue UI Dashboard Component */}
          <div className="lg:col-span-6 bg-zinc-950 border border-zinc-900 rounded-xl p-4 sm:p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Mock Header */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-violet-400" />
                <span className="text-xs font-mono text-zinc-400">loop-agent-dashboard // pending_queue</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-zinc-800" />
                <span className="w-2 h-2 rounded-full bg-zinc-800" />
                <span className="w-2 h-2 rounded-full bg-zinc-800" />
              </div>
            </div>

            {/* Sub-tabs */}
            <div className="flex gap-2 mb-4">
              {['all', 'pending', 'approved'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-wider uppercase border transition-all ${activeTab === tab ? 'bg-zinc-900 border-zinc-700 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Task list container */}
            <div className="space-y-2.5">
              {queueTasks
                .filter((t) => activeTab === 'all' || t.status === activeTab)
                .map((task) => (
                  <div key={task.id} className="p-3 bg-zinc-900/40 border border-zinc-900 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-zinc-800/80 transition-all">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">
                          {task.source}
                        </span>
                        <span className="text-xs font-medium text-zinc-200">{task.target}</span>
                        <span className="text-[10px] text-zinc-500 font-mono ml-auto sm:ml-0">{task.time}</span>
                      </div>
                      <p className="text-xs text-zinc-400 font-light">{task.desc}</p>
                    </div>
                    {task.status === 'pending' ? (
                      <button className="sm:self-center self-end px-3 py-1 bg-violet-600/10 border border-violet-500/30 text-violet-400 text-[10px] font-mono uppercase rounded hover:bg-violet-600 hover:text-white transition-all flex items-center gap-1">
                        <Check size={10} /> Approve Execution
                      </button>
                    ) : (
                      <span className="sm:self-center self-end px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase rounded flex items-center gap-1">
                        ✓ Dispatched
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>

        </div>
      </section>

      {/* Core Platform Pillars */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto border-b border-zinc-900">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-violet-400 font-mono text-[10px] uppercase tracking-widest mb-2">// 01 / CONTEXT SYNC</p>
            <h2 className="text-lg font-medium text-white mb-2">Centralized Architecture</h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Index and query across legacy files, calendar event spaces, and email timelines inside a localized repository context. No manual folder sorting maps required.
            </p>
          </div>
          <div>
            <p className="text-violet-400 font-mono text-[10px] uppercase tracking-widest mb-2">// 02 / SAFEGUARDS</p>
            <h2 className="text-lg font-medium text-white mb-2">Human-in-the-Loop Protocol</h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Autonomous execution requires explicit physical validation. All proposed communications or calendar blocks land directly inside your dashboard queue.
            </p>
          </div>
          <div>
            <p className="text-violet-400 font-mono text-[10px] uppercase tracking-widest mb-2">// 03 / AUTOMATIONS</p>
            <h2 className="text-lg font-medium text-white mb-2">Smart Deadline Triggers</h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Assign task boundaries dynamically. If outbound touchpoints are missed by external nodes, Loop constructs structured alternative prompts waiting for clearance.
            </p>
          </div>
        </div>
      </section>

      {/* Structural Workflow Breakdown */}
      <section id="workflow" className="py-20 px-6 max-w-5xl mx-auto border-b border-zinc-900 text-center space-y-12">
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Operational Sequence</span>
          <h2 className="text-2xl font-semibold text-white tracking-tight">Structured and Predictable Ecosystem</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 text-left">
          {[
            { step: '01', title: 'OAuth Tool Mapping', desc: 'Securely authenticate your Google Workspace apps. Loop structures structural metadata layers without overriding document values.' },
            { step: '02', title: 'Natural Language Prompting', desc: 'Direct operations via basic prose. Command intricate multi-app steps like "Draft performance updates and coordinate distribution lists."' },
            { step: '03', title: 'Physical Validation Run', desc: 'Review, modify, or verify pending outputs within the core administrative interface before final deployment routes occur.' }
          ].map((w, idx) => (
            <div key={idx} className="p-5 bg-zinc-950 border border-zinc-900 rounded-lg space-y-4">
              <span className="text-xs font-mono text-zinc-600 block">{w.step} —</span>
              <h3 className="text-sm font-medium text-zinc-200">{w.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Strict Per-User Subscription Architecture Pricing */}
      <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Pricing Structure</span>
          <h2 className="text-2xl font-semibold text-white tracking-tight">Predictable Per-Seat Plans</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { name: 'Evaluation Tiers', price: '$0', period: '14 day run', desc: 'Analyze platform capabilities safely.', features: ['Full infrastructure evaluation windows', 'Standard operational parsing loops', 'Single workspace instance profile'] },
            { name: 'Basic Core', price: '$9', period: 'per user / mo', desc: 'For independent operators requiring baseline sync channels.', features: ['Uncapped document processing runs', 'Continuous automated response logs', 'Priority pipeline calculation speeds'] },
            { name: 'Pro Enterprise', price: '$29', period: 'per user / mo', desc: 'For scaling teams linking multi-admin vector permission trees.', features: ['Advanced collective context memory engines', 'Shared workspace team queues', 'Dedicated priority routing channels'] }
          ].map((tier, idx) => (
            <div key={idx} className="p-6 bg-zinc-950 border border-zinc-900 rounded-lg flex flex-col justify-between space-y-6 hover:border-zinc-800 transition-colors">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">{tier.name}</h3>
                  <p className="text-[11px] text-zinc-500 font-light mt-1 min-h-[32px]">{tier.desc}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-mono font-semibold text-white">{tier.price}</span>
                  <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider">{tier.period}</span>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-zinc-900">
                  {tier.features.map((f, fIdx) => (
                    <li key={fIdx} className="text-xs text-zinc-400 flex items-start gap-2 font-light">
                      <span className="text-violet-400 mt-0.5 text-[10px]">■</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <a href="/signup" className="block w-full py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 text-center text-xs font-medium uppercase tracking-wider rounded hover:bg-zinc-800 transition-colors">
                Select Protocol
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Clean Minimalist Footer */}
      <footer className="border-t border-zinc-900 py-10 px-6 text-[11px] text-zinc-500 font-mono tracking-wider">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-zinc-300 uppercase text-xs tracking-widest">Loop</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Security</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Endpoints</a>
          </div>
          <p>© 2026 Loop Engine Inc.</p>
        </div>
      </footer>

    </main>
  );
}