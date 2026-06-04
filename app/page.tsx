'use client';

import Link from 'next/link';
import { Activity, ArrowRight, Shield, Layers, Cpu } from 'lucide-react';

export default function Luxury3DLandingPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-[#E4E4E7] font-mono antialiased relative overflow-x-hidden selection:bg-violet-500/30 selection:text-white">
      
      {/* 1. 3D GRID BACKGROUND MATRIX WITH PERSPECTIVE PULL */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f15_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f15_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [perspective:1000px] [transform-style:preserve-3d]" />
      
      {/* Ambient Radial Depth Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 2. HEADER NAVIGATION */}
      <header className="border-b border-[#18181B] bg-[#030303]/80 backdrop-blur-md sticky top-0 z-50 h-14 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-white">Loop Engine</span>
        </div>
        
        <div className="flex items-center gap-5">
          <Link 
            href="/login" 
            replace={true}
            className="text-[10px] uppercase tracking-wider font-bold text-[#A1A1AA] hover:text-white transition cursor-pointer"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            replace={true}
            className="h-8 px-4 bg-white hover:bg-[#E4E4E7] text-black font-black rounded-md transition text-[10px] uppercase tracking-wider flex items-center justify-center shadow-md cursor-pointer"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* 3. HERO CONTENT & 3D VIEWPORT */}
      <main className="max-w-5xl mx-auto px-6 pt-20 pb-24 relative z-10 text-center space-y-8 [perspective:1200px]">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 text-[10px] text-[#A1A1AA] border border-[#27272A] px-2.5 py-1 rounded-full bg-[#030303] shadow-[0_2px_10px_rgba(0,0,0,0.8)] mx-auto backdrop-blur-sm">
          <Activity size={12} className="text-violet-500" />
          <span>3D RUNTIME ENGINE DEPLOYED // REALTIME MATRIX</span>
        </div>

        {/* Main Value Prop */}
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-3xl mx-auto uppercase leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">
          Orchestrate Your Entire Workspace In One Terminal
        </h1>
        
        <p className="text-xs md:text-sm text-[#A1A1AA] max-w-lg mx-auto font-sans font-medium leading-relaxed">
          Connect your real production data pipelines. Let AI index your files, manage schedules, and coordinate background operations without template clutter.
        </p>

        {/* Action Gate Button */}
        <div className="pt-2">
          <Link 
            href="/signup" 
            replace={true}
            className="inline-flex items-center gap-2 h-11 px-7 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-lg transition-all duration-300 text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] group border border-violet-500/50 hover:-translate-y-0.5 cursor-pointer"
          >
            Get Started
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* ---- HIGH-END LUXURY 3D TERMINAL CONTAINER ---- */}
        <div className="pt-12 max-w-3xl mx-auto hidden md:block [transform-style:preserve-3d]">
          <div 
            className="bg-[#030303] border border-[#27272A] rounded-xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9),0_30px_60px_-30px_rgba(124,58,237,0.15)] text-left font-mono text-[11px] transition-transform duration-700 ease-out hover:rotate-x-[8deg] hover:rotate-y-[-12deg] hover:scale-[1.02]"
            style={{
              transform: 'rotateX(12deg) rotateY(-18deg) rotateZ(3deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front Raised Face Decor Overlay */}
            <div className="absolute inset-0 rounded-xl border border-white/5 pointer-events-none [transform:translateZ(10px)]" />

            {/* Window Management Bar */}
            <div className="bg-[#09090B] border-b border-[#18181B] px-4 py-2.5 flex items-center justify-between rounded-t-xl">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-red-500/40 rounded-full" />
                <span className="w-2.5 h-2.5 bg-yellow-500/40 rounded-full" />
                <span className="w-2.5 h-2.5 bg-green-500/40 rounded-full" />
              </div>
              <span className="text-[#52525B] text-[10px] tracking-widest font-bold">WORKSPACE_CORE_3D@LOOP</span>
              <div className="text-[#3F3F46] text-[10px]">XYZ_LOC: [12.4, -18.0, 3.0]</div>
            </div>

            {/* Log Stream Body with Internal Layered Depth */}
            <div className="p-5 space-y-3 text-[#A1A1AA] bg-gradient-to-b from-[#030303] to-[#060608]">
              <p className="text-[#52525B]">// Layered 3D runtime context stream initialized</p>
              <p className="flex items-center gap-2">
                <span className="text-violet-400">@loop/engine:</span> 
                <span className="bg-violet-500/10 text-violet-300 px-1.5 py-0.5 rounded text-[10px] border border-violet-500/20">secure_handshake</span> 
                initiated successfully.
              </p>
              <p><span className="text-emerald-400">✔</span> connected_apps: <span className="text-white bg-[#09090B] border border-[#18181B] px-1.5 py-0.5 rounded">["Gmail", "Google_Drive", "Calendar"]</span></p>
              <p className="animate-pulse"><span className="text-violet-400">@loop/engine:</span> awaiting natural language instruction stream<span className="text-white">_</span></p>
            </div>
          </div>
        </div>

        {/* Fallback 2D display for tiny screens/mobile devices to protect layouts */}
        <div className="block md:hidden pt-6 text-left font-mono text-[11px] bg-[#030303] border border-[#18181B] rounded-xl p-4">
          <p className="text-[#52525B]">// Context runtime live</p>
          <p><span className="text-violet-400">@loop/engine:</span> connected successfully.</p>
        </div>

      </main>

      <hr className="border-[#18181B] max-w-4xl mx-auto" />

      {/* 4. STRUCTURAL MATRIX BLOCKS WITH 3D HOVER LIFTS */}
      <section className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        
        {/* Card 1 */}
        <div className="bg-[#030303] border border-[#18181B] p-6 rounded-xl space-y-3 shadow-md hover:border-[#27272A] hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-8 h-8 bg-[#09090B] border border-[#18181B] rounded-lg flex items-center justify-center text-violet-400 group-hover:bg-violet-500 group-hover:text-black transition-colors duration-300">
            <Cpu size={14} />
          </div>
          <h3 className="text-xs font-bold uppercase text-white tracking-wider">Zero Fake Data</h3>
          <p className="text-[11px] text-[#A1A1AA] font-sans font-medium leading-relaxed">
            Direct authenticated integration blocks connect natively to live app records with full encryption protocols.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#030303] border border-[#18181B] p-6 rounded-xl space-y-3 shadow-md hover:border-[#27272A] hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-8 h-8 bg-[#09090B] border border-[#18181B] rounded-lg flex items-center justify-center text-violet-400 group-hover:bg-violet-500 group-hover:text-black transition-colors duration-300">
            <Layers size={14} />
          </div>
          <h3 className="text-xs font-bold uppercase text-white tracking-wider">Unified Context</h3>
          <p className="text-[11px] text-[#A1A1AA] font-sans font-medium leading-relaxed">
            Cross-reference emails, documents, and dynamic schedules simultaneously within a single running context session.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#030303] border border-[#18181B] p-6 rounded-xl space-y-3 shadow-md hover:border-[#27272A] hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-8 h-8 bg-[#09090B] border border-[#18181B] rounded-lg flex items-center justify-center text-violet-400 group-hover:bg-violet-500 group-hover:text-black transition-colors duration-300">
            <Shield size={14} />
          </div>
          <h3 className="text-xs font-bold uppercase text-white tracking-wider">Isolated Sandbox</h3>
          <p className="text-[11px] text-[#A1A1AA] font-sans font-medium leading-relaxed">
            Your runtime is entirely isolated and secured via Row Level Database Security constraints inside your user container.
          </p>
        </div>

      </section>

      {/* 5. FOOTER REGISTER */}
      <footer className="border-t border-[#18181B] bg-[#030303] py-6 text-center text-[10px] text-[#52525B]">
        <p>© 2026 LOOP SYSTEM TECHNOLOGIES. ALL CORE REGISTERS RESERVED.</p>
      </footer>

    </div>
  );
}