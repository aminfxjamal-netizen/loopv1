'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, 
  Mail, 
  HardDrive, 
  Calendar, 
  Settings, 
  Layers, 
  LogOut, 
  Search, 
  Bell,
  Sliders,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

export default function WorkspaceDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSyncing, setIsSyncing] = useState(false);

  const triggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#121212] font-sans antialiased flex overflow-hidden h-screen w-screen">
      
      {/* 1. Left Sidebar Navigation Container */}
      <aside className="w-64 bg-white border-r border-gray-200/80 flex flex-col justify-between h-full z-20 flex-shrink-0">
        <div>
          {/* Logo Context Frame */}
          <div className="h-16 border-b border-gray-100 flex items-center px-6 gap-2">
            <span className="w-5 h-5 bg-violet-600 rounded-md flex items-center justify-center text-white text-xs font-black">L</span>
            <span className="text-sm font-bold tracking-tight text-gray-950">Loop Workspace</span>
            <span className="ml-auto px-1.5 py-0.5 rounded bg-violet-50 border border-violet-100 text-[9px] font-mono font-bold text-violet-700">V1.0</span>
          </div>

          {/* Navigation Route Nodes */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'overview' ? 'bg-violet-50 text-violet-700' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <LayoutDashboard size={15} /> Overview Terminal
            </button>
            <button
              onClick={() => setActiveTab('gmail')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'gmail' ? 'bg-violet-50 text-violet-700' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <Mail size={15} /> Gmail Analytics
            </button>
            <button
              onClick={() => setActiveTab('drive')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'drive' ? 'bg-violet-50 text-violet-700' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <HardDrive size={15} /> Drive Context Vector
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'schedule' ? 'bg-violet-50 text-violet-700' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <Calendar size={15} /> Routine Scheduler
            </button>
          </nav>
        </div>

        {/* System Settings & Outbound Portal */}
        <div className="p-4 border-t border-gray-100 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition">
            <Settings size={15} /> System Settings
          </button>
          <Link href="/login" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold text-red-500 hover:bg-red-50/50 transition no-underline">
            <LogOut size={15} /> Terminate Session
          </Link>
        </div>
      </aside>

      {/* 2. Main Terminal Content Workspace Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Engineering Canvas Grid Mesh Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:32px_32px] opacity-10 pointer-events-none z-0" />

        {/* Global Action Header Banner */}
        <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between relative z-10 flex-shrink-0">
          <div className="flex items-center gap-3 bg-[#FAFAFA] border border-gray-200 rounded-lg px-3 py-1.5 w-72">
            <Search size={13} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Query workspace indexes..." 
              className="bg-transparent border-none outline-none text-xs w-full font-medium placeholder:text-gray-300"
            />
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={triggerSync}
              disabled={isSyncing}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold bg-white hover:bg-gray-50 transition shadow-sm inline-flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw size={12} className={isSyncing ? "animate-spin text-violet-600" : ""} />
              {isSyncing ? "Syncing Integration Matrices..." : "Sync Datastream"}
            </button>
            <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-violet-600/20">
              A
            </div>
          </div>
        </header>

        {/* Core Interactive Grid Engine Space */}
        <main className="flex-1 p-6 overflow-y-auto relative z-10 space-y-6">
          
          {/* Section: Operational Overview Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Component: Gmail Analytics Tracker */}
            <div className="bg-white border border-gray-200/90 rounded-xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-left">
              <div className="flex items-center justify-between mb-4">
                <span className="p-2 bg-violet-50 text-violet-600 rounded-lg"><Mail size={16} /></span>
                <span className="text-[10px] font-mono font-bold uppercase text-green-600 tracking-wider bg-green-50 px-2 py-0.5 rounded border border-green-100">Live Listening</span>
              </div>
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Gmail Intelligence</h3>
              <p className="text-2xl font-black text-gray-950 tracking-tight mt-1">1,420</p>
              <p className="text-[11px] text-gray-400 mt-2">Emails parsed today • <span className="text-violet-600 font-bold">12 drafting routines pending</span></p>
            </div>

            {/* Component: Vector Files Context Deck */}
            <div className="bg-white border border-gray-200/90 rounded-xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-left">
              <div className="flex items-center justify-between mb-4">
                <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><HardDrive size={16} /></span>
                <span className="text-[10px] font-mono font-bold uppercase text-blue-600 tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-100">8.4 GB Indexed</span>
              </div>
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Drive Context Blocks</h3>
              <p className="text-2xl font-black text-gray-950 tracking-tight mt-1">348</p>
              <p className="text-[11px] text-gray-400 mt-2">Vector embeddings calculated • <span className="text-blue-600 font-bold">Drive Sync Stable</span></p>
            </div>

            {/* Component: Calendar Routine Engine */}
            <div className="bg-white border border-gray-200/90 rounded-xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-left">
              <div className="flex items-center justify-between mb-4">
                <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Calendar size={16} /></span>
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-600 tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Optimal Blocks</span>
              </div>
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Automated Schedule Blocks</h3>
              <p className="text-2xl font-black text-gray-950 tracking-tight mt-1">14 / 18</p>
              <p className="text-[11px] text-gray-400 mt-2">Conflicts resolved autonomously • <span className="text-emerald-600 font-bold">4 blocks clear</span></p>
            </div>

          </div>

          {/* Section: Active Log Pipeline Event Stream */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-left">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-sm font-bold text-gray-950 tracking-tight">Active Automation Runtime Logs</h2>
                <p className="text-[11px] text-gray-400 mt-0.5">Real-time breakdown of single-operator analytical routines running in your pipeline container.</p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-1 bg-[#FAFAFA] border border-gray-200 rounded text-gray-500">Streaming Console</span>
            </div>

            <div className="space-y-3.5 max-h-72 overflow-y-auto pr-2 font-mono text-[11px]">
              <div className="flex items-start gap-3 p-2 bg-[#FAFAFA] border border-gray-100 rounded-lg">
                <span className="text-violet-600 font-bold mt-0.5">●</span>
                <div>
                  <span className="text-gray-400 font-bold">[06:12:44] [GMAIL_AGENT]:</span> Analyzed deep thread context regarding 'Corporate Q3 Metric Signoff'. Drafted structural confirmation response.
                </div>
              </div>

              <div className="flex items-start gap-3 p-2 bg-[#FAFAFA] border border-gray-100 rounded-lg">
                <span className="text-blue-600 font-bold mt-0.5">●</span>
                <div>
                  <span className="text-gray-400 font-bold">[05:48:12] [DRIVE_INDEXER]:</span> Vectorized new context block matching file path: <code className="bg-gray-100 text-gray-800 px-1 rounded font-mono">/proposals/premium_structure_2026.pdf</code>.
                </div>
              </div>

              <div className="flex items-start gap-3 p-2 bg-[#FAFAFA] border border-gray-100 rounded-lg">
                <span className="text-emerald-600 font-bold mt-0.5">●</span>
                <div>
                  <span className="text-gray-400 font-bold">[04:30:00] [CALENDAR_ROUTINE]:</span> Detected appointment overlay at 14:00. Rescheduled routine focus window block automatically. No prompt fallback required.
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}