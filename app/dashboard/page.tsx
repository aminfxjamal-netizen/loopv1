// app/dashboard/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function DashboardContent() {
  const searchParams = useSearchParams();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (searchParams.get("google") === "connected") {
      setIsConnected(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center border-b border-zinc-800 pb-6 mb-12">
        <h1 className="text-2xl font-bold tracking-wider bg-gradient-to-r bg-clip-text text-transparent from-white to-zinc-400">
          LOOP AGENT WORKSPACE
        </h1>
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <p className="text-sm text-zinc-400 font-medium">System Online</p>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-6xl mx-auto">
        {/* Connection Banner */}
        {isConnected && (
          <div className="mb-8 p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚡</span>
              <p className="text-sm text-emerald-400 font-medium">
                Google Engine Successfully Linked: Access Granted to Calendar, Drive, and Gmail.
              </p>
            </div>
          </div>
        )}

        {/* Workspace Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Email */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl hover:border-zinc-700 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Gmail Inbox</h3>
              <span className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full">Connected</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Monitoring client threads. Agent is ready to draft automated responses and summarize context.
            </p>
            <div className="text-xs text-zinc-500 italic">0 pending tasks</div>
          </div>

          {/* Card 2: Calendar */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl hover:border-zinc-700 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Google Calendar</h3>
              <span className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full">Connected</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Syncing schedules and automated availability mappings. Ready to organize upcoming syncs.
            </p>
            <div className="text-xs text-zinc-500 italic">Awaiting sync query...</div>
          </div>

          {/* Card 3: Drive Docs */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl hover:border-zinc-700 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Drive Knowledge</h3>
              <span className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full">Connected</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              File ingestion network initialized. Agent can parse uploaded folders for meeting insights.
            </p>
            <div className="text-xs text-zinc-500 italic">Index ready</div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Wrapping it in Suspense fixes the Next.js prerender error completely
export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-zinc-500">
        Loading Workspace Engine...
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}