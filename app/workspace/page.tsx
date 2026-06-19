// app/workspace/page.tsx
"use client";

import { useState, useEffect } from "react";

interface StagedAction {
  to: string;
  subject: string;
  emailBody: string;
}

export default function WorkspacePage() {
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
    show: false,
    message: "",
    type: "success",
  });
  
  // Staged action representing a "Human-in-the-Loop" approval state
  const [stagedAction, setStagedAction] = useState<StagedAction | null>(null);

  // Clean the URL on landing and show the connection toast
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("google") === "connected") {
        // Clear the URL parameter cleanly
        window.history.replaceState({}, document.title, window.location.pathname);
        // Fire secure connection notice
        triggerToast("Gmail, Calendar, and Drive linked successfully.", "success");
      }
    }
  }, []);

  const triggerToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 4000);
  };

  // Simulates the AI interpreting raw input and generating an approval card
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsProcessing(true);

    // Simulate an AI intent parser extracting structured data after 800ms
    setTimeout(() => {
      setStagedAction({
        to: "partner@enterprise.com",
        subject: "Loop Agent Framework Deployment",
        emailBody: "Hi Team,\n\nI have securely deployed our core communication nodes. The human-in-the-loop security protocols are fully online.\n\nBest,\nOperator",
      });
      setIsProcessing(false);
      setInputValue("");
    }, 800);
  };

  // The actual live API connector firing to your /api/gmail backend route
  const handleAuthorizeAndDispatch = async () => {
    if (!stagedAction) return;
    setIsSending(true);

    try {
      const response = await fetch("/api/gmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stagedAction),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Operational failure during dispatch sequence.");
      }

      triggerToast("Action approved. Message securely dispatched through Google servers.", "success");
      setStagedAction(null); // Clear the card on success

    } catch (error: any) {
      console.error("Dispatch Error:", error);
      triggerToast(error.message || "Failed to clear security gate.", "error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans antialiased flex selection:bg-blue-50 selection:text-[#2563EB]">
      
      {/* Dynamic Security Notification Toast */}
      {toast.show && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3.5 rounded-xl border text-xs font-medium shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
          toast.type === "success" 
            ? "bg-slate-900 border-slate-800 text-white" 
            : "bg-red-50 border-red-200 text-red-600"
        }`}>
          {toast.type === "success" && <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />}
          {toast.message}
        </div>
      )}

      {/* Clean Premium Sidebar */}
      <aside className="w-64 border-r border-[#E2E8F0] flex flex-col justify-between p-6 shrink-0 hidden md:flex">
        <div className="space-y-8">
          {/* Branding - Cleaned (No blue tick) */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-bold text-xs tracking-tighter">
              L
            </div>
            <span className="font-semibold text-xs tracking-tight uppercase">Loop Workspace</span>
          </div>

          {/* Infrastructure Connections */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider px-2">Connected Nodes</div>
            <div className="space-y-0.5">
              {["Gmail API", "Google Calendar", "Google Drive"].map((node, idx) => (
                <div key={idx} className="flex items-center justify-between px-2 py-2 rounded-lg text-xs font-medium text-[#0F172A] hover:bg-slate-50">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    {node}
                  </div>
                  <span className="text-[9px] font-mono text-[#64748B]">Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Info Area - Cleaned (No fake profile) */}
        <div className="bg-slate-50 border border-[#E2E8F0] p-3 rounded-xl flex items-center justify-between">
          <span className="text-[10px] font-mono font-semibold text-[#64748B]">SECURE ENVIRONMENT</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
      </aside>

      {/* Main Clean Chat Interface */}
      <main className="flex-1 flex flex-col justify-between max-w-3xl mx-auto px-6 py-8 h-screen relative">
        
        {/* Core Workspace Output Stream */}
        <div className="flex-1 overflow-y-auto space-y-6 pb-24 pt-4 scrollbar-none">
          {!stagedAction && !isProcessing && (
            <div className="h-full flex flex-col justify-center items-center text-center space-y-2 animate-in fade-in duration-300 my-auto">
              <div className="text-xs font-semibold text-[#0F172A]">Workspace Clear & Ready</div>
              <p className="text-xs text-[#64748B] max-w-xs leading-relaxed">
                Type an action below to draft automated output. Actions will pause for explicit verification.
              </p>
            </div>
          )}

          {/* AI Processing Prompt State */}
          {isProcessing && (
            <div className="flex items-center gap-3 bg-slate-50 border border-[#E2E8F0] px-4 py-3.5 rounded-xl text-xs text-[#64748B] w-fit animate-pulse">
              <svg className="animate-spin h-3.5 w-3.5 text-[#2563EB]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Parsing request fields and staging workflow parameters...
            </div>
          )}

          {/* THE HUMAN-IN-THE-LOOP APPROVAL CARD */}
          {stagedAction && (
            <div className="border border-[#E2E8F0] rounded-2xl bg-white shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* Card Authorization Header */}
              <div className="bg-slate-50 border-b border-[#E2E8F0] px-5 py-3.5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs font-semibold text-[#0F172A]">Awaiting Manual Clearance</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#64748B]">ACTION: GMAIL_DISPATCH</span>
              </div>

              {/* Staged Data Context */}
              <div className="p-5 space-y-4 text-xs">
                <div className="grid grid-cols-[60px_1fr] border-b border-slate-100 pb-2.5">
                  <span className="text-[#64748B] font-medium">To:</span>
                  <span className="text-[#0F172A] font-semibold font-mono">{stagedAction.to}</span>
                </div>
                <div className="grid grid-cols-[60px_1fr] border-b border-slate-100 pb-2.5">
                  <span className="text-[#64748B] font-medium">Subject:</span>
                  <span className="text-[#0F172A] font-medium">{stagedAction.subject}</span>
                </div>
                <div className="pt-1">
                  <span className="text-[#64748B] font-medium block mb-1.5">Draft Body:</span>
                  <div className="bg-slate-50 border border-[#E2E8F0] p-4 rounded-xl text-[#0F172A] font-sans whitespace-pre-wrap leading-relaxed">
                    {stagedAction.emailBody}
                  </div>
                </div>
              </div>

              {/* Execution Gates */}
              <div className="px-5 py-4 border-t border-[#E2E8F0] bg-slate-50/50 flex flex-col sm:flex-row justify-end gap-2.5">
                <button
                  onClick={() => setStagedAction(null)}
                  disabled={isSending}
                  className="px-4 py-2.5 border border-[#E2E8F0] hover:bg-slate-50 text-[#64748B] font-medium text-xs rounded-xl transition disabled:opacity-50"
                >
                  Abort Command
                </button>
                <button
                  onClick={handleAuthorizeAndDispatch}
                  disabled={isSending}
                  className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-medium text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Executing...
                    </>
                  ) : (
                    "Authorize & Dispatch"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Floating Omnibox Form Input Container */}
        <form 
          onSubmit={handleCommandSubmit}
          className="absolute bottom-6 left-6 right-6 bg-white border border-[#E2E8F0] shadow-md rounded-2xl p-2.5 flex items-center gap-3 focus-within:border-[#2563EB] transition-all"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isProcessing || isSending || !!stagedAction}
            placeholder={stagedAction ? "Clear the active card to execute another command..." : "Instruct Loop (e.g., 'Email partner@enterprise.com about deployment')..."}
            className="flex-1 bg-transparent border-none text-xs p-2 focus:outline-none placeholder-[#64748B] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isProcessing || isSending || !!stagedAction || !inputValue.trim()}
            className="bg-[#0F172A] hover:bg-slate-800 text-white p-2.5 rounded-xl transition disabled:opacity-30 disabled:hover:bg-[#0F172A]"
          >
            <svg className="w-3.5 h-3.5 transform rotate-90" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
            </svg>
          </button>
        </form>

      </main>
    </div>
  );
}