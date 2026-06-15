// app/dashboard/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

interface DispatchPayload {
  recipient: string;
  subject: string;
  payload: string;
}

function WorkspaceCore() {
  const searchParams = useSearchParams();
  const [isLinked, setIsLinked] = useState<boolean>(false);
  
  // Terminal State Controls
  const [form, setForm] = useState<DispatchPayload>({ recipient: "", subject: "", payload: "" });
  const [logs, setLogs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (searchParams.get("google") === "connected") {
      setIsLinked(true);
      appendLog("System kernel successfully linked with Google OAuth2 secure relays.");
    }
  }, [searchParams]);

  const appendLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev]);
  };

  const handlePipelineDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    appendLog(`Initializing outbound routing to: ${form.recipient}`);

    try {
      const response = await fetch("/api/gmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: "stored_secure_token", 
          to: form.recipient,
          subject: form.subject,
          body: form.payload,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        appendLog(`[SUCCESS] Message successfully dispatched through upstream Gmail SMTP server.`);
        setForm({ recipient: "", subject: "", payload: "" });
      } else {
        appendLog(`[ERROR] Dispatch rejected by relay: ${result.error || "Internal error"}`);
      }
    } catch (err) {
      appendLog("[CRITICAL] Failed to establish connection to local API cluster.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E5E5E5] font-mono selection:bg-zinc-800 p-6 md:p-12">
      {/* Structural Header */}
      <header className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 pb-8 mb-10 gap-4">
        <div>
          <h1 className="text-lg font-bold tracking-tighter text-white uppercase">
            Loop // Core Engine
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Autonomous Business Infrastructure Layer</p>
        </div>
        <div className="flex items-center gap-2.5 bg-zinc-900/40 border border-zinc-800 px-3 py-1.5 rounded">
          <span className={`h-2 w-2 rounded-full ${isLinked ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`}></span>
          <span className="text-xs font-medium text-zinc-400">
            {isLinked ? "Relays Active" : "Authentication Pending"}
          </span>
        </div>
      </header>

      {/* Primary Layout Engine */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Outbound Dispatch Panel */}
        <section className="lg:col-span-5 bg-zinc-900/20 border border-zinc-900 p-6 rounded-lg">
          <h2 className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-6">
            Outbound Communications Relay
          </h2>

          <form onSubmit={handlePipelineDispatch} className="space-y-5 text-xs">
            <div>
              <label className="block text-zinc-500 mb-1.5 uppercase font-semibold">Target Address</label>
              <input 
                type="email" 
                required
                placeholder="name@destination.com"
                value={form.recipient}
                onChange={(e) => setForm({ ...form, recipient: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 rounded p-3 focus:border-zinc-700 focus:outline-none transition font-sans"
              />
            </div>
            <div>
              <label className="block text-zinc-500 mb-1.5 uppercase font-semibold">Transmission Header</label>
              <input 
                type="text" 
                required
                placeholder="Operational Sync Status"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 rounded p-3 focus:border-zinc-700 focus:outline-none transition font-sans"
              />
            </div>
            <div>
              <label className="block text-zinc-500 mb-1.5 uppercase font-semibold">Payload Data (HTML / Plaintext)</label>
              <textarea 
                rows={5}
                required
                placeholder="Enter message context to compile..."
                value={form.payload}
                onChange={(e) => setForm({ ...form, payload: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 rounded p-3 focus:border-zinc-700 focus:outline-none transition font-sans resize-none"
              />
            </div>

            <button 
              type="submit"
              disabled={isProcessing || !isLinked}
              className="w-full bg-zinc-100 text-black font-bold uppercase py-3 rounded hover:bg-zinc-300 transition disabled:opacity-20 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Transmitting..." : "Execute Pipeline Send"}
            </button>
          </form>
        </section>

        {/* Live Logs & System Metrics */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Node Infrastructure Monitor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-zinc-300 uppercase">Gmail Messaging Cluster</span>
                <span className="text-[10px] text-zinc-500">v1.2.0</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                Outbound node mapped to `/api/gmail`. Ready to execute atomic multi-channel transmissions.
              </p>
            </div>

            <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-zinc-300 uppercase">Calendar Core Node</span>
                <span className="text-[10px] text-zinc-500">v1.0.4</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                Full bi-directional read/write sequences mapped. Operational for real-time slot conflict resolution.
              </p>
            </div>
          </div>

          {/* Active Terminal Stream */}
          <div className="flex-1 min-h-[250px] bg-zinc-950 border border-zinc-900 p-5 rounded flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold tracking-wider text-zinc-600 uppercase mb-4 border-b border-zinc-900 pb-2 flex justify-between">
                <span>Kernel Event Diagnostics</span>
                <span>Console Stream</span>
              </div>
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2">
                {logs.length === 0 ? (
                  <div className="text-zinc-700 text-xs italic">[Idle] Awaiting data stream triggers...</div>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="text-xs leading-relaxed text-zinc-400 break-words">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] font-mono flex items-center justify-center text-zinc-600 text-xs">
        [LOADING] Initializing system workspace cluster...
      </div>
    }>
      <WorkspaceCore />
    </Suspense>
  );
}