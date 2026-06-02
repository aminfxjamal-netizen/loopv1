'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Shield, Cpu, Activity, Layers } from 'lucide-react';

export default function Home() {
  const [terminalLine, setTerminalLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalLine((prev) => (prev < 3 ? prev + 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-400 font-mono text-xs antialiased selection:bg-zinc-800 selection:text-white">
      
      {/* Decorative Status Bar */}
      <div className="fixed top-0 left-0 w-full h-8 bg-[#09090b] border-b border-zinc-900 z-50 flex items-center justify-between px-6 text-[10px] tracking-widest uppercase text-zinc-500">
        <div className="flex items-center gap-4">
          <span className="text-zinc-400 font-bold">LOOP // CORE v1.0</span>
          <span className="hidden sm:inline text-zinc-800">|</span>
          <span className="hidden sm:inline flex items-center gap-1.5"><Activity size={10} className="text-emerald-500 animate-pulse" /> ENGINE_STATUS: NOMINAL</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#architecture" className="hover:text-zinc-300 transition-colors">.architecture()</a>
          <a href="#pricing" className="hover:text-zinc-300 transition-colors">.licensing()</a>
          <a href="/login" className="text-zinc-300 hover:text-white transition-colors">[ LOGIN ]</a>
        </div>
      </div>

      {/* Radical Typography Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto border-b border-zinc-900/60 min-h-[80vh] flex flex-col justify-between">
        
        {/* Main Terminal String Statement */}
        <div className="space-y-8 max-w-4xl">
          <div className="text-[10px] tracking-widest uppercase text-zinc-600 flex items-center gap-2">
            <Terminal size={12} /> INITIALIZING SYSTEM PROTOCOLS
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-normal tracking-tight text-zinc-100 leading-[1.1] font-sans">
            Autonomous execution engine for <br />
            <span className="line-through text-zinc-600 decoration-zinc-700 decoration-2">manual admin tasks</span> 
            <span className="text-zinc-400 block sm:inline sm:ml-4 font-mono font-light text-xl sm:text-2xl md:text-3xl tracking-wide text-zinc-500">
              // Gmail, Drive & Calendar fully automated.
            </span>
          </h1>

          <p className="text-zinc-500 max-w-xl leading-relaxed text-xs">
            Loop securely maps to your core communication channels, synthesizing unstructured legacy files and ongoing message threads into a single localized memory framework. The AI acts autonomously, but executes only upon your direct validation.
          </p>
        </div>

        {/* Live Terminal Console Action Block */}
        <div className="my-12 p-4 bg-[#09090b] border border-zinc-900 rounded max-w-2xl font-mono text-[11px] leading-relaxed relative">
          <div className="absolute top-3 right-4 flex gap-1.5">
            <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
            <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
          </div>
          
          <div className="space-y-1 text-zinc-500">
            <p className={`${terminalLine >= 0 ? 'text-zinc-400' : 'opacity-30'}`}>&gt; loop --init --sync-workspace</p>
            <p className={`text-emerald-500/80 ${terminalLine >= 1 ? 'opacity-100' : 'opacity-0'} transition-opacity`}>✓ Linked channels: Gmail API, Google Drive Context, Calendar Hooks.</p>
            <p className={`${terminalLine >= 2 ? 'text-zinc-400' : 'opacity-30'}`}>&gt; loop --analyze --pending-deadlines</p>
            <p className={`text-amber-400/80 ${terminalLine >= 3 ? 'opacity-100' : 'opacity-0'} transition-opacity`}>! 2 Actions queued: [Draft Follow-up Email], [Block Recovery Buffer]. Awaiting manual validation click...</p>
          </div>
        </div>

        {/* CTA Elements */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-6">
          <a href="/signup" className="px-6 py-3.5 bg-zinc-100 text-black font-semibold hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 text-[11px] tracking-wider uppercase rounded-sm">
            Deploy Engine (14-Day Free Trial) <ArrowRight size={12} />
          </a>
          <div className="text-[10px] text-zinc-600 tracking-wider flex items-center gap-2">
            <span>[ STAGE: PUBLIC BETA ]</span>
            <span>•</span>
            <span>NO CREDIT CARD SIGNUP AUTH REQ.</span>
          </div>
        </div>

      </section>

      {/* Raw System Pillars Architecture */}
      <section id="architecture" className="py-20 px-6 max-w-6xl mx-auto border-b border-zinc-900/60">
        <div className="text-zinc-500 mb-12 tracking-widest text-[10px] uppercase">// ENGINE_ARCHITECTURAL_PILLARS</div>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-zinc-300 font-medium">
              <Layers size={14} className="text-zinc-500" />
              <span>01 / CONTEXT INDEXER</span>
            </div>
            <p className="text-zinc-500 leading-relaxed font-light">
              Constructs continuous localized vector representations of unstructured document data, timelines, and multi-threaded interactions automatically.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-zinc-300 font-medium">
              <Shield size={14} className="text-zinc-500" />
              <span>02 / HARDENED GUARDRAILS</span>
            </div>
            <p className="text-zinc-500 leading-relaxed font-light">
              Absolute zero outbound transmission without manual operator clearance. Generated system executions sit inside a strict queue holding platform.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-zinc-300 font-medium">
              <Cpu size={14} className="text-zinc-500" />
              <span>03 / DYNAMIC TRIGGERS</span>
            </div>
            <p className="text-zinc-500 leading-relaxed font-light">
              Monitors external timeline deadlines. If expected nodes fail to deliver data strings, alternative prompt flows compile into your pending interface.
            </p>
          </div>
        </div>
      </section>

      {/* No-Nonsense Flat Grid Pricing System */}
      <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-zinc-500 tracking-widest text-[10px] uppercase">// LICENSING_TIERS</div>

        <div className="border border-zinc-900 divide-y md:divide-y-0 md:divide-x divide-zinc-900 grid md:grid-cols-3 bg-[#09090b]/50 rounded-sm">
          {[
            { name: '01 / EVALUATION_RUN', price: '$0', period: '14 DAYS', desc: 'Full infrastructure access parameters to evaluate localized routing models.' },
            { name: '02 / BASIC_SEAT', price: '$9', period: 'PER USER / MO', desc: 'Uncapped processing access keys for individual developers and solo operations.' },
            { name: '03 / PRO_CLUSTER', price: '$29', period: 'PER USER / MO', desc: 'Shared collective workspace permission mapping for scaling multi-admin organizations.' }
          ].map((tier, i) => (
            <div key={i} className="p-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-zinc-300 font-medium tracking-wide">{tier.name}</div>
                <p className="text-zinc-500 text-[11px] leading-relaxed font-light">{tier.desc}</p>
                <div className="pt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-zinc-100 font-mono tracking-tight">{tier.price}</span>
                  <span className="text-[9px] text-zinc-600 tracking-wider font-mono">{tier.period}</span>
                </div>
              </div>
              <a href="/signup" className="block w-full py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 text-center text-[10px] tracking-wider uppercase rounded-sm transition-all font-medium">
                [ INITIALIZE_TIER ]
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Minimal System Footer */}
      <footer className="py-12 px-6 max-w-6xl mx-auto text-[10px] text-zinc-600 tracking-widest flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-900/60">
        <div>SYS_LOC // 2026 LOOP_ENGINE_INC</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-zinc-400 transition-colors">SECURITY.TXT</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">TERMS.MD</a>
        </div>
      </footer>

    </main>
  );
}