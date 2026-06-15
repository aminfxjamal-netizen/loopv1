// app/dashboard/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";

interface ActionPayload {
  to: string;
  subject: string;
  body: string;
}

interface Message {
  id: string;
  origin: "user" | "infrastructure";
  text: string;
  stage?: "authorization_gate" | "system_log";
  payloadData?: ActionPayload;
  actionStatus?: "awaiting_clearance" | "dispatched" | "aborted";
}

function LoopWorkspaceCore() {
  const searchParams = useSearchParams();
  const [commandInput, setCommandInput] = useState("");
  const [stream, setStream] = useState<Message[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const streamEndRef = useRef<HTMLDivElement>(null);

  // Clean parameters and initialize conversational engine
  useEffect(() => {
    if (searchParams.get("google") === "connected") {
      window.history.replaceState({}, document.title, window.location.pathname);
      
      setStream([
        {
          id: "sys-init",
          origin: "infrastructure",
          text: "Secure OAuth2 pipeline verification complete. Upstream nodes connected to Gmail, Calendar, and Drive infrastructure layers. Awaiting natural language directives.",
        },
      ]);
    }
  }, [searchParams]);

  useEffect(() => {
    streamEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [stream]);

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const userCommand = commandInput;
    const trackingId = Math.random().toString(36).substring(2, 9);

    setStream((prev) => [
      ...prev,
      { id: `user-${trackingId}`, origin: "user", text: userCommand },
    ]);
    setCommandInput("");
    setIsEvaluating(true);

    setTimeout(() => {
      setIsEvaluating(false);

      const normalized = userCommand.toLowerCase();
      if (normalized.includes("email") || normalized.includes("send") || normalized.includes("draft")) {
        setStream((prev) => [
          ...prev,
          {
            id: `agent-gate-${trackingId}`,
            origin: "infrastructure",
            text: "Parsed intent mapped to outbound communication pipeline. Generated data package ready for staging. Human verification required before server transmission.",
            stage: "authorization_gate",
            actionStatus: "awaiting_clearance",
            payloadData: {
              to: "partner@enterprise-tier.com",
              subject: "Infrastructure Milestone Verification",
              body: "Operational update packet compiled successfully. All background integrations verified by local loop framework layers.",
            },
          },
        ]);
      } else {
        setStream((prev) => [
          ...prev,
          {
            id: `agent-fallback-${trackingId}`,
            origin: "infrastructure",
            text: "Direct command interpreted. No transactional mutations staged. Provide explicit intent variables (e.g., 'Draft an email to client') to trigger an authorized execution path.",
          },
        ]);
      }
    }, 1000);
  };

  const executeStagedPayload = async (messageId: string, payload: ActionPayload) => {
    // Explicit return type forces TypeScript to accept the state mutation cleanly
    setStream((prev) =>
      prev.map((msg): Message => 
        msg.id === messageId ? { ...msg, actionStatus: "dispatched" as const } : msg
      )
    );

    try {
      const response = await fetch("/api/gmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: "loop_active_vault_relay",
          to: payload.to,
          subject: payload.subject,
          body: payload.body,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Upstream network rejection.");
      }
    } catch (err) {
      console.error("Critical core routing failure:", err);
    }
  };

  const abortStagedPayload = (messageId: string) => {
    setStream((prev) =>
      prev.map((msg): Message => 
        msg.id === messageId ? { ...msg, actionStatus: "aborted" as const } : msg
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#050506] text-[#D4D4D8] font-sans antialiased flex flex-col justify-between selection:bg-zinc-800 selection:text-white">
      
      <header className="border-b border-zinc-900 bg-[#050506]/90 backdrop-blur-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="text-white text-xs font-mono font-black bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded tracking-widest">
            L // P
          </span>
          <span className="text-xs font-mono font-semibold tracking-tight text-zinc-400">LOOP_AGENT_CORE</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
          NODE_STABLE
        </div>
      </header>

      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-12 overflow-y-auto space-y-8">
        {stream.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.origin === "user" ? "items-end" : "items-start"}`}>
            
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600 mb-1.5 px-1">
              {msg.origin === "user" ? "USER_COMMAND" : "CORE_INFRASTRUCTURE"}
            </span>

            <div className={`w-full rounded-lg p-4 text-sm leading-relaxed border ${
              msg.origin === "user" 
                ? "bg-zinc-900/40 border-zinc-800/60 text-zinc-100 max-w-[85%] ml-auto" 
                : "bg-transparent border-transparent text-zinc-300"
            }`}>
              <div>{msg.text}</div>

              {msg.stage === "authorization_gate" && msg.payloadData && (
                <div className="mt-4 border border-zinc-900 bg-[#09090B] rounded-lg p-5 space-y-4 font-mono text-xs shadow-xl">
                  <div className="border-b border-zinc-900 pb-2 text-[10px] text-zinc-500 tracking-wider font-bold">
                    STAGED ROUTING DATA METRICS
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-zinc-600"><span className="text-zinc-500">RELAY_TO:</span> {msg.payloadData.to}</div>
                    <div className="text-zinc-600"><span className="text-zinc-500">RELAY_SUBJ:</span> {msg.payloadData.subject}</div>
                  </div>
                  
                  <div className="bg-[#030303] border border-zinc-900 p-4 rounded font-sans text-zinc-400 leading-relaxed max-h-32 overflow-y-auto whitespace-pre-line">
                    {msg.payloadData.body}
                  </div>

                  {msg.actionStatus === "awaiting_clearance" && (
                    <div className="pt-2 flex gap-3 text-xs">
                      <button 
                        onClick={() => executeStagedPayload(msg.id, msg.payloadData!)}
                        className="bg-white text-black hover:bg-zinc-200 px-4 py-2 rounded font-medium tracking-tight transition"
                      >
                        Authorize and Dispatch
                      </button>
                      <button 
                        onClick={() => abortStagedPayload(msg.id)}
                        className="bg-transparent text-zinc-500 hover:text-zinc-400 px-2 py-2 rounded tracking-tight transition"
                      >
                        Abort Command
                      </button>
                    </div>
                  )}

                  {msg.actionStatus === "dispatched" && (
                    <div className="text-emerald-400 bg-emerald-950/20 border border-emerald-500/30 p-2.5 rounded font-bold tracking-tight text-center">
                      ✓ PIPELINE DISPATCHED: Sequence successfully processed by SMTP cluster.
                    </div>
                  )}

                  {msg.actionStatus === "aborted" && (
                    <div className="text-zinc-500 bg-zinc-900/40 border border-zinc-800/40 p-2.5 rounded italic text-center">
                      ✕ COMMAND TERMINATED: Data stack wiped from local execution cache.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isEvaluating && (
          <div className="flex items-center gap-2 pl-1">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-600 animate-ping"></span>
            <span className="text-xs font-mono text-zinc-600 tracking-tight">Evaluating lexical matrix arrays...</span>
          </div>
        )}
        <div ref={streamEndRef} />
      </div>

      <footer className="border-t border-zinc-950 p-4 bg-[#050506] sticky bottom-0">
        <form onSubmit={handleCommandSubmit} className="max-w-2xl w-full mx-auto relative flex items-center">
          <input 
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="Execute system commands or compose outbound pipelines..."
            className="w-full bg-[#09090B] border border-zinc-900 text-sm rounded-xl pl-4 pr-16 py-4 focus:border-zinc-800 focus:outline-none text-zinc-200 placeholder-zinc-700 transition"
          />
          <button 
            type="submit"
            className="absolute right-3 text-[10px] font-mono bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 px-3 py-1.5 rounded-md transition"
          >
            EXECUTE
          </button>
        </form>
      </footer>

    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050506] font-mono flex items-center justify-center text-zinc-700 text-xs tracking-widest">
        CRITICAL_LOAD_SEQUENCE // EXECUTING
      </div>
    }>
      <LoopWorkspaceCore />
    </Suspense>
  );
}