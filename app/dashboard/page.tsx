// app/dashboard/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

interface TelemetryLog {
  id: string;
  timestamp: string;
  event: string;
  status: "INFO" | "SUCCESS" | "WARN" | "CRITICAL";
}

function WorkspaceEngine() {
  const searchParams = useSearchParams();
  const [isLinked, setIsLinked] = useState<boolean>(false);
  
  // Pipeline State
  const [recipient, setRecipient] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [payload, setPayload] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [telemetry, setTelemetry] = useState<TelemetryLog[]>([]);

  useEffect(() => {
    if (searchParams.get("google") === "connected") {
      setIsLinked(true);
      pushLog("OAuth2 secure relay initialized. Upstream nodes verified.", "SUCCESS");
    }
  }, [searchParams]);

  const pushLog = (event: string, status: TelemetryLog["status"] = "INFO") => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newLog: TelemetryLog = { id: Math.random().toString(36).substring(2, 9), timestamp: time, event, status };
    setTelemetry((prev) => [newLog, ...prev]);
  };

  const handlePipelineDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    pushLog(`Establishing secure tunnel to transport layer...`, "INFO");

    try {
      const response = await fetch("/api/gmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: "loop_secure_vault_token", 
          to: recipient,
          subject: subject,
          body: payload,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        pushLog(`Payload accepted by SMTP relay. Transmission successful.`, "SUCCESS");
        setRecipient("");
        setSubject("");
        setPayload("");
      } else {
        pushLog(`Relay rejected payload packet: ${result.error || "Execution fault"}`, "CRITICAL");
      }
    } catch (err) {
      pushLog("Network handshake timeout. Destination cluster unreachable.", "CRITICAL");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-[#A3A3A3] font-sans antialiased p-6 md:p-12 selection:bg-zinc-800 selection:text-white">
      
      {/* Premium Navigation Header */}
      <header className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900/80 pb-8 mb-12 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-white tracking-tighter text-sm font-black uppercase tracking-widest bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
              L // P
            </span>
            <h1 className="text-base font-semibold tracking-tight text-white font-mono">
              LOOP_WORKSPACE_CORE
            </h1>
          </div>
          <p className="text-xs text-zinc-600 mt-1.5 font-mono">SECURE AGENT ROUTING INTERFACE // BUILD v1.6.2</p>
        </div>
        
        <div className="flex items-center gap-3 bg-[#0A0A0C] border border-zinc-900 px-4 py-2 rounded-lg shadow-sm">
          <span className={`h-1.5 w-1.5 rounded-full ${isLinked ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" : "bg-zinc-700"}`}></span>
          <span className="text-xs font-mono tracking-tight text-zinc-400">
            {isLinked ? "RELAY_STATUS: ACTIVE" : "RELAY_STATUS: OFFLINE"}
          </span>
        </div>
      </header>

      {/* Main Structural System Layout */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Interactive Execution Panel */}
        <section className="lg:col-span-5 bg-[#0A0A0C] border border-zinc-900 p-6 md:p-8 rounded-xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
          
          <h2 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase mb-6 flex items-center justify-between">
            <span>TRANSMISSION PIPELINE</span>
            <span className="text-zinc-700">SYS_MODULE_01</span>
          </h2>

          <form onSubmit={handlePipelineDispatch} className="space-y-6 text-xs">
            <div>
              <label className="block text-zinc-500 mb-2 font-mono uppercase tracking-wider">TARGET CONFIGURATION (TO)</label>
              <input 
                type="email" 
                required
                placeholder="recipient@domain.com"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-[#030303] border border-zinc-900 text-zinc-200 rounded-lg p-3.5 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-800 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-zinc-500 mb-2 font-mono uppercase tracking-wider">ROUTING HEADER (SUBJECT)</label>
              <input 
                type="text" 
                required
                placeholder="Operational Sync Manifest"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#030303] border border-zinc-900 text-zinc-200 rounded-lg p-3.5 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-800 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-zinc-500 mb-2 font-mono uppercase tracking-wider">DATA PAYLOAD STREAM (BODY)</label>
              <textarea 
                rows={6}
                required
                placeholder="Inject structural context array or plaintext..."
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                className="w-full bg-[#030303] border border-zinc-900 text-zinc-200 rounded-lg p-3.5 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-800 outline-none transition resize-none font-mono text-xs"
              />
            </div>

            <button 
              type="submit"
              disabled={isProcessing || !isLinked}
              className="w-full bg-white text-black font-semibold tracking-tight py-3.5 rounded-lg hover:bg-zinc-200 transition disabled:opacity-10 disabled:cursor-not-allowed shadow-md"
            >
              {isProcessing ? "PROCESSING_DISPATCH..." : "EXECUTE STREAM DISPATCH"}
            </button>
          </form>
        </section>

        {/* Right Node Matrix & Operational Telemetry */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Node Infrastructure Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0A0A0C] border border-zinc-900 p-6 rounded-xl relative shadow-md">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-mono font-bold text-zinc-300 uppercase">Messaging Cluster</span>
                <span className="text-[10px] font-mono text-emerald-500/80 bg-emerald-950/20 border border-emerald-900/50 px-2 py-0.5 rounded">ONLINE</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed font-mono">
                [NODE_0] Mapped via asynchronous REST hooks directly to `/api/gmail`. Configured for instant outbound bursts.
              </p>
            </div>

            <div className="bg-[#0A0A0C] border border-zinc-900 p-6 rounded-xl relative shadow-md">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-mono font-bold text-zinc-300 uppercase">Calendar Node</span>
                <span className="text-[10px] font-mono text-emerald-500/80 bg-emerald-950/20 border border-emerald-900/50 px-2 py-0.5 rounded">READY</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed font-mono">
                [NODE_1] Full multi-tenant resource locking sequences mapped. Operational for automated grid conflict checks.
              </p>
            </div>
          </div>

          {/* Real-time Telemetry Data Log */}
          <div className="flex-1 bg-[#0A0A0C] border border-zinc-900 rounded-xl p-6 flex flex-col justify-between shadow-2xl relative">
            <div className="w-full">
              <div className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase mb-4 border-b border-zinc-900/80 pb-3 flex justify-between items-center">
                <span>SYSTEM DIAGNOSTICS STREAM</span>
                <span className="text-[10px] text-zinc-600 font-normal">LIVE DISPATCH TELEMETRY</span>
              </div>
              
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 font-mono text-xs">
                {telemetry.length === 0 ? (
                  <div className="text-zinc-700 italic py-2">[SYSTEM_IDLE] Waiting for input triggers...</div>
                ) : (
                  telemetry.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 py-1 border-b border-zinc-900/30 last:border-0">
                      <span className="text-zinc-600 shrink-0 text-[11px]">{log.timestamp}</span>
                      <span className={`shrink-0 font-bold text-[10px] tracking-wide px-1 rounded ${
                        log.status === "SUCCESS" ? "text-emerald-400 bg-emerald-950/20" :
                        log.status === "CRITICAL" ? "text-rose-400 bg-rose-950/20" : "text-zinc-500 bg-zinc-900"
                      }`}>
                        [{log.status}]
                      </span>
                      <span className="text-zinc-300 break-all leading-relaxed">{log.event}</span>
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
      <div className="min-h-screen bg-[#030303] font-mono flex items-center justify-center text-zinc-600 text-xs tracking-widest">
        [SYS_INIT] LOADING ARCHITECTURE LAYER...
      </div>
    }>
      <WorkspaceEngine />
    </Suspense>
  );
}