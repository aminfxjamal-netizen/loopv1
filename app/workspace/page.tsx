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
  
  const [stagedAction, setStagedAction] = useState<StagedAction | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("google") === "connected") {
        window.history.replaceState({}, document.title, window.location.pathname);
        triggerToast("Workspace nodes linked successfully.", "success");
      }
    }
  }, []);

  const triggerToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 4000);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsProcessing(true);

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

      if (!response.ok) throw new Error(data.error || "Operational failure during dispatch sequence.");

      triggerToast("Action approved. Message securely dispatched.", "success");
      setStagedAction(null);

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
          toast.type === "success" ? "bg-slate-900 border-slate-800 text-white" : "bg-red-50 border-red-200 text-red-600"
        }`}>
          {toast.type === "success" && <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />}
          {toast.message}
        </div>
      )}

      {/* Advanced Light-Themed Sidebar */}
      <aside className="w-64 border-r border-[#F1F5F9] bg-[#FAFAFA] flex flex-col justify-between shrink-0 hidden md:flex h-screen overflow-y-auto scrollbar-none">
        <div className="p-5 space-y-6">
          
          {/* Brand & Core Actions */}
          <div className="space-y-4">
            <div className="text-xl font-bold tracking-tight text-[#0F172A] mb-6">
              LOOP
            </div>
            
            <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium text-sm transition flex items-center justify-center gap-2 shadow-sm shadow-blue-500/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              New Chat
            </button>

            <button className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-200/50 rounded-xl text-sm font-medium text-[#0F172A] hover:bg-slate-200 transition">
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                AI Chat
              </div>
              <div className="flex items-center gap-1.5">
                 <svg className="w-3.5 h-3.5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                 <svg className="w-3.5 h-3.5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
            </button>
          </div>

          <hr className="border-[#E2E8F0]" />

          {/* Connected Apps Section */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-medium text-[#64748B] mb-3">Connected Apps</div>
            {[
              { name: "Gmail", color: "text-red-500", bg: "bg-red-50", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
              { name: "Google Drive", color: "text-emerald-500", bg: "bg-emerald-50", icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" },
              { name: "Calendar", color: "text-blue-500", bg: "bg-blue-50", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }
            ].map((app, i) => (
              <button key={i} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#334155] hover:bg-slate-200/50 transition">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center ${app.bg} ${app.color}`}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={app.icon}></path></svg>
                </div>
                {app.name}
              </button>
            ))}
          </div>

          <hr className="border-[#E2E8F0]" />

          {/* Recent Conversations */}
          <div className="space-y-1">
            <div className="text-[11px] font-medium text-[#64748B] mb-2">Recent Conversations</div>
            {["Revenue Analysis", "Client Follow-Up", "Board Meeting", "Marketing Report"].map((conv, i) => (
              <button key={i} className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs text-[#475569] hover:bg-slate-200/50 hover:text-[#0F172A] transition text-left truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1] shrink-0" />
                {conv}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Settings & Billing */}
        <div className="p-5 border-t border-[#E2E8F0] space-y-1">
          <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-200/50 transition group">
             <div className="flex items-center gap-3 text-sm text-[#334155] font-medium group-hover:text-[#0F172A]">
                <svg className="w-4 h-4 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                Billing
             </div>
             <span className="text-[10px] text-[#64748B] font-medium bg-white border border-[#E2E8F0] px-2 py-0.5 rounded-md">11 days left</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-200/50 transition group text-sm text-[#334155] font-medium group-hover:text-[#0F172A]">
             <svg className="w-4 h-4 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
             Settings
          </button>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="flex-1 flex flex-col justify-between relative h-screen">
        
        {/* Optional Top Bar (Upgrade Button) */}
        <header className="flex justify-end p-6 absolute top-0 w-full z-10">
          <button className="bg-white border border-[#E2E8F0] shadow-sm text-[#0F172A] hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition">
            <svg className="w-3.5 h-3.5 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
            Upgrade
          </button>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto px-6 pb-40 pt-24 scrollbar-none flex flex-col items-center">
          
          {/* Default State: Welcome Screen */}
          {!stagedAction && !isProcessing && (
            <div className="h-full flex flex-col justify-center items-center text-center space-y-4 animate-in fade-in duration-700 my-auto w-full max-w-2xl">
              <div className="w-16 h-16 bg-[#0F172A] rounded-2xl flex items-center justify-center shadow-lg mb-4">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-[#0F172A]">Good to See You!</h1>
              <h2 className="text-3xl font-normal text-[#64748B] tracking-tight mb-2">How Can I be an Assistance?</h2>
              <p className="text-sm text-[#94A3B8]">I'm available 24/7 for you, ask me anything.</p>
            </div>
          )}

          {/* AI Processing Prompt State */}
          {isProcessing && (
            <div className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] px-5 py-4 rounded-2xl text-sm text-[#475569] w-fit animate-pulse my-auto shadow-sm">
              <svg className="animate-spin h-4 w-4 text-[#2563EB]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Analyzing intent and staging operational sequence...
            </div>
          )}

          {/* THE HUMAN-IN-THE-LOOP APPROVAL CARD (Matches New Light Theme) */}
          {stagedAction && (
            <div className="border border-[#E2E8F0] rounded-3xl bg-white shadow-xl shadow-slate-200/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 w-full max-w-2xl my-auto">
              <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shadow-sm shadow-amber-500/30" />
                  <span className="text-sm font-semibold text-[#0F172A]">Awaiting Manual Clearance</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#64748B] bg-slate-200/50 px-2.5 py-1 rounded-md">GMAIL_DISPATCH</span>
              </div>
              <div className="p-6 space-y-5 text-sm">
                <div className="flex border-b border-slate-100 pb-3">
                  <span className="text-[#64748B] w-20 shrink-0">To:</span>
                  <span className="text-[#0F172A] font-semibold">{stagedAction.to}</span>
                </div>
                <div className="flex border-b border-slate-100 pb-3">
                  <span className="text-[#64748B] w-20 shrink-0">Subject:</span>
                  <span className="text-[#0F172A] font-medium">{stagedAction.subject}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block mb-2">Draft Body:</span>
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-2xl text-[#334155] whitespace-pre-wrap leading-relaxed shadow-inner">
                    {stagedAction.emailBody}
                  </div>
                </div>
              </div>
              <div className="px-6 py-5 border-t border-[#E2E8F0] bg-white flex justify-end gap-3">
                <button
                  onClick={() => setStagedAction(null)}
                  disabled={isSending}
                  className="px-5 py-2.5 hover:bg-slate-50 text-[#64748B] font-medium text-sm rounded-xl transition disabled:opacity-50"
                >
                  Abort
                </button>
                <button
                  onClick={handleAuthorizeAndDispatch}
                  disabled={isSending}
                  className="px-6 py-2.5 bg-[#0F172A] hover:bg-black text-white font-medium text-sm rounded-xl shadow-md transition flex items-center gap-2 disabled:opacity-50"
                >
                  {isSending ? "Executing..." : "Authorize Action"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Advanced Floating Omnibox Input at Bottom */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-white via-white to-transparent pt-10 pb-8 px-6 flex flex-col items-center gap-4">
          
          {/* Status indicators */}
          <div className="w-full max-w-3xl flex items-center justify-between px-2 text-[11px] font-medium text-[#94A3B8]">
            <span className="flex items-center gap-1.5 hover:text-[#0F172A] cursor-pointer transition">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Unlock more features with the Pro plan.
            </span>
            <span className="flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active extensions
            </span>
          </div>

          <form 
            onSubmit={handleCommandSubmit}
            className="w-full max-w-3xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm rounded-2xl px-4 py-3.5 flex items-center gap-3 focus-within:border-[#CBD5E1] focus-within:bg-white focus-within:shadow-md transition-all duration-300"
          >
            <button type="button" className="text-[#94A3B8] hover:text-[#0F172A] transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isProcessing || isSending || !!stagedAction}
              placeholder="Ask anything ..."
              className="flex-1 bg-transparent border-none text-sm focus:outline-none placeholder-[#94A3B8] disabled:opacity-50"
            />
            <div className="flex items-center gap-2">
              <button type="button" className="text-[#94A3B8] hover:text-[#0F172A] p-1 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
              </button>
            </div>
          </form>

          {/* Quick Action Pills */}
          <div className="w-full max-w-3xl flex items-center justify-center gap-3 text-xs">
            {["Any advice for me?", "Some youtube video idea", "Life lessons from Kratos"].map((pill, i) => (
               <button key={i} className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 rounded-lg transition">
                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                 {pill}
               </button>
            ))}
            <button className="px-2 py-1.5 border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 rounded-lg transition">
               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}