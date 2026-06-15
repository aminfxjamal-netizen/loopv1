// app/dashboard/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";

// Structural System Typing
interface ActionPayload {
  type: "email" | "calendar" | "file";
  to?: string;
  recipient?: string;
  subject?: string;
  date?: string;
  time?: string;
  details?: string;
  body?: string;
}

interface Message {
  id: string;
  sender: "user" | "loop";
  text: string;
  timestamp: string;
  hasApprovalGate?: boolean;
  payload?: ActionPayload;
  approvalStatus?: "pending" | "authorized" | "editing" | "aborted";
}

function WorkspaceCore() {
  const searchParams = useSearchParams();
  
  // Interface Configuration States
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [commandInput, setCommandInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 1. OAuth Landing Zone Token Sanitization & Notification Sync
  useEffect(() => {
    if (searchParams.get("google") === "connected") {
      // Instantly wipe all authorization parameters from browser visibility
      window.history.replaceState({}, document.title, window.location.pathname);
      
      setToastMessage("Gmail, Calendar, and Drive linked successfully.");
      setTimeout(() => setToastMessage(null), 5000);

      // Seed initial connection confirmation context
      setMessages([
        {
          id: "sys-welcome",
          sender: "loop",
          text: "Secure integration tokens synchronized. I have established read/write pipelines to your workspace layers safely. Human-in-the-loop validation gates are now active across all connected nodes.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }
  }, [searchParams]);

  // Keep chat container perfectly aligned to bottom layout boundaries
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Command Interpretation Subroutine
  const handleCommandExecution = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const trackingId = Math.random().toString(36).substring(2, 9);

    const userMsg: Message = {
      id: `user-${trackingId}`,
      sender: "user",
      text: textToSend,
      timestamp: currentTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);

    // Mimic enterprise pipeline evaluation
    setTimeout(() => {
      setIsProcessing(false);
      const normalized = textToSend.toLowerCase();

      if (normalized.includes("email") || normalized.includes("draft")) {
        setMessages((prev) => [
          ...prev,
          {
            id: `loop-action-${trackingId}`,
            sender: "loop",
            text: "I have prepared the update communication payload based on your request constraints. Please review the transmission details below before authorization.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            hasApprovalGate: true,
            approvalStatus: "pending",
            payload: {
              type: "email",
              to: "premium-partners@enterprise.com",
              subject: "Q3 Strategic Growth & Integration Infrastructure Manifest",
              body: "Dear Partners,\n\nThis transmission confirms the successful configuration of our automated loop enterprise nodes. All subsequent synchronization matrices are currently operating under verified parameters.",
            },
          },
        ]);
      } else if (normalized.includes("schedule") || normalized.includes("meeting") || normalized.includes("zoom")) {
        setMessages((prev) => [
          ...prev,
          {
            id: `loop-action-${trackingId}`,
            sender: "loop",
            text: "I have identified an open calendar window matching your request parameters. A confirmation gate is required to write to the cluster.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            hasApprovalGate: true,
            approvalStatus: "pending",
            payload: {
              type: "calendar",
              recipient: "Sarah (Product Strategy Lead)",
              date: "Next Thursday",
              time: "3:00 PM (EST)",
              details: "Automated sync calendar invite with secure Zoom link provisioning initialized.",
            },
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `loop-fallback-${trackingId}`,
            sender: "loop",
            text: "Direct directive compiled. No high-impact system modifications or external database operations were requested, so no approval gate was triggered. Let me know if you would like me to draft an email or allocate a calendar window.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    }, 1500);
  };

  const handleGateAction = (messageId: string, action: "authorized" | "editing" | "aborted") => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, approvalStatus: action } : msg))
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans antialiased flex relative overflow-hidden">
      
      {/* 1. Global Toast Alerts for Background Real-Time Integrations */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#0F172A] text-white text-xs font-medium px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 border border-slate-800 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          <svg className="w-4 h-4 text-[#2563EB]" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {toastMessage}
        </div>
      )}

      {/* 2. Premium Collapsible Sidebar Navigation */}
      <aside className={`bg-slate-50 border-r border-[#E2E8F0] h-screen transition-all duration-300 flex flex-col justify-between flex-shrink-0 z-40 ${sidebarOpen ? "w-64" : "w-0 -translate-x-full md:w-20 md:translate-x-0"}`}>
        <div className="p-4 space-y-6 overflow-x-hidden">
          
          {/* Workspace Branding Header Block */}
          <div className="flex items-center justify-between min-w-[200px]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-bold tracking-tighter text-sm">
                L
              </div>
              {sidebarOpen && <span className="font-semibold text-sm tracking-tight text-[#0F172A]">Loop Workspace</span>}
            </div>
            
            {sidebarOpen && (
              <button onClick={() => setSidebarOpen(false)} className="text-[#64748B] hover:text-[#0F172A] p-1.5 rounded-lg hover:bg-slate-200/60 transition">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              </button>
            )}
          </div>

          {/* New Chat Deployment Controller */}
          <button 
            onClick={() => setMessages([])}
            className="w-full bg-white border border-[#E2E8F0] text-[#0F172A] text-xs font-medium py-2.5 px-3 rounded-xl shadow-sm hover:bg-slate-100 flex items-center justify-center gap-2 transition duration-200"
          >
            <svg className="w-3.5 h-3.5 text-[#64748B]" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            {sidebarOpen && "New Chat"}
          </button>

          {/* Service Links Layer */}
          <nav className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-xl bg-slate-200/80 text-[#2563EB] cursor-pointer transition">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501c1.153-.086 2.294-.213 3.423-.379 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
              {sidebarOpen && <span>AI Chat Engine</span>}
            </div>

            {/* Google Verified Ecosystem Relays */}
            {[
              { label: "Gmail Link", color: "#EA4335", path: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" },
              { label: "Google Drive Node", color: "#34A853", path: "M12 21a9 9 0 110-18 9 9 0 010 18zm0-3a6 6 0 100-12 6 6 0 000 12z" },
              { label: "Google Calendar Core", color: "#4285F4", path: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" }
            ].map((node, idx) => (
              <div key={idx} className="flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/40 cursor-pointer transition">
                <svg className="w-4 h-4 shrink-0" style={{ color: node.color }} fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d={node.path} /></svg>
                {sidebarOpen && <span className="truncate">{node.label}</span>}
              </div>
            ))}
          </nav>

          <hr className="border-[#E2E8F0]" />

          {/* Management Vector links */}
          <nav className="space-y-1">
            {["Billing Metrics", "System Configuration"].map((label, idx) => (
              <div key={idx} className="flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/40 cursor-pointer transition">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.767c-.31.236-.454.63-.377.12a21.414 21.414 0 010 .32c-.077.49-.31.884-.377.12l-1.003.767a1.125 1.125 0 01-.26 1.43l1.297 2.247a1.125 1.125 0 01-1.37.491l-1.216-.456c-.356-.133-.751-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.003-.767c.311-.236.455-.63.377-.12a21.47 21.47 0 010-.32c.078-.49.31-.884.378-.12l1.003-.767a1.125 1.125 0 01.26-1.43l-1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.073 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" /></svg>
                {sidebarOpen && <span>{label}</span>}
              </div>
            ))}
          </nav>
        </div>

        {/* Enterprise Identity Guard & Dynamic Billing Meter */}
        <div className="p-4 bg-slate-100/70 border-t border-[#E2E8F0] min-w-[200px]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase">Active Trial</span>
            <span className="bg-[#2563EB]/10 text-[#2563EB] text-[11px] font-bold px-2 py-0.5 rounded-full">
              11 days remaining
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-300 flex-shrink-0 flex items-center justify-center font-bold text-xs text-slate-700">
              U
            </div>
            {sidebarOpen && (
              <div className="truncate">
                <p className="text-xs font-semibold text-[#0F172A] truncate">Enterprise Account</p>
                <p className="text-[10px] text-[#64748B] truncate">core@node.internal</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 3. Main Workspace Area */}
      <main className="flex-1 flex flex-col justify-between h-screen relative bg-white">
        
        {/* Toggle Button for Sidebar Visibility */}
        {!sidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(true)}
            className="absolute top-4 left-4 z-50 bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] p-2 rounded-xl shadow-sm transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        )}

        {/* Chat Stream Window */}
        <div className="flex-1 overflow-y-auto px-4 py-16 max-w-3xl w-full mx-auto space-y-8">
          {messages.length === 0 ? (
            
            // 4. Clean Empty State Layout Architecture
            <div className="h-full flex flex-col justify-center items-center text-center pt-20 animate-in fade-in duration-500">
              <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] mb-2">Welcome to Loop</h2>
              <p className="text-sm text-[#64748B] mb-10 max-w-md">What would you like Loop to do today?</p>
              
              {/* Quick Prompt Suggestion Injection Matrices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
                {[
                  { title: "Draft an Email", subtitle: "Compose a strategic update to core partners", action: "Draft an update email to premium clients." },
                  { title: "Schedule a Meeting", subtitle: "Sync with calendars and assign resources", action: "Schedule a Zoom meeting with Sarah next Thursday at 3 PM." },
                  { title: "Analyze a File", subtitle: "Deconstruct spreadsheets and extract insights", action: "Analyze my revenue spreadsheet and summarize changes." },
                  { title: "Research a Topic", subtitle: "Query system arrays for localized profiles", action: "Research local market trends for software automation integrations." }
                ].map((card, index) => (
                  <div 
                    key={index}
                    onClick={() => handleCommandExecution(card.action)}
                    className="bg-white border border-[#E2E8F0] p-4 rounded-2xl text-left cursor-pointer hover:border-[#2563EB] hover:shadow-sm transition duration-200"
                  >
                    <div className="text-xs font-semibold text-[#0F172A] mb-0.5">{card.title}</div>
                    <div className="text-[11px] text-[#64748B]">{card.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>

          ) : (
            
            // Render Populated Conversational Arrays
            messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end animate-in slide-in-from-bottom-2 duration-200" : "items-start"}`}>
                <div className={`max-w-[90%] rounded-2xl p-4 text-sm ${msg.sender === "user" ? "bg-slate-100 text-[#0F172A] border border-[#E2E8F0]" : "bg-white text-[#0F172A]"}`}>
                  
                  {/* Message Prose Display */}
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                  <span className="block text-[10px] text-[#64748B] mt-1.5 font-mono">{msg.timestamp}</span>

                  {/* 5. Mandatory Human-in-the-Loop Safe Authorization Gate Card */}
                  {msg.hasApprovalGate && msg.payload && (
                    <div className="mt-5 border border-[#E2E8F0] bg-slate-50/80 rounded-2xl p-5 space-y-4 shadow-sm text-xs text-[#0F172A]">
                      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                        <span className="font-mono font-bold tracking-wider text-[10px] text-[#64748B] uppercase">Staged Action Approval Guard</span>
                        <span className="bg-[#2563EB]/10 text-[#2563EB] px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold">Awaiting Human Review</span>
                      </div>

                      {/* Content Summarization Matrix based on Event Classification */}
                      {msg.payload.type === "email" ? (
                        <div className="space-y-2">
                          <div><span className="text-[#64748B] font-medium">Recipient Address:</span> <span className="underline">{msg.payload.to}</span></div>
                          <div><span className="text-[#64748B] font-medium">Header Title:</span> <span className="font-semibold">{msg.payload.subject}</span></div>
                          <div className="bg-white border border-[#E2E8F0] p-3.5 rounded-xl text-[#0F172A] leading-relaxed font-sans mt-2 whitespace-pre-line max-h-40 overflow-y-auto">
                            {msg.payload.body}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div><span className="text-[#64748B] font-medium">Participant Coordinates:</span> <span className="font-semibold">{msg.payload.recipient}</span></div>
                          <div><span className="text-[#64748B] font-medium">Target Boundary:</span> <span className="font-mono bg-slate-200 text-[#0F172A] px-1.5 py-0.5 rounded text-[11px]">{msg.payload.date} @ {msg.payload.time}</span></div>
                          <div className="text-[#64748B] italic mt-1 font-sans">{msg.payload.details}</div>
                        </div>
                      )}

                      {/* Primary Functional Control Elements */}
                      {msg.approvalStatus === "pending" && (
                        <div className="pt-2 flex flex-wrap gap-2.5">
                          <button 
                            onClick={() => handleGateAction(msg.id, "authorized")}
                            className="bg-[#2563EB] text-white hover:bg-blue-700 px-4 py-2 rounded-xl font-medium shadow-sm transition duration-150"
                          >
                            Authorize & Dispatch
                          </button>
                          <button 
                            onClick={() => handleGateAction(msg.id, "editing")}
                            className="bg-white border border-[#E2E8F0] text-[#0F172A] hover:bg-slate-100 px-4 py-2 rounded-xl font-medium transition duration-150"
                          >
                            Edit Draft
                          </button>
                          <button 
                            onClick={() => handleGateAction(msg.id, "aborted")}
                            className="text-[#64748B] hover:text-rose-600 px-3 py-2 rounded-xl font-medium transition duration-150"
                          >
                            Abort Command
                          </button>
                        </div>
                      )}

                      {/* Terminal Operational Feedbacks */}
                      {msg.approvalStatus === "authorized" && (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl flex items-center gap-2 font-medium">
                          <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                          Execution sequence successful. Transmission completely dispatched down upstream network protocols.
                        </div>
                      )}
                      
                      {msg.approvalStatus === "editing" && (
                        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl flex items-center gap-2 font-medium">
                          <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                          Staged packet diverted to manual iteration console. Local buffers frozen.
                        </div>
                      )}

                      {msg.approvalStatus === "aborted" && (
                        <div className="bg-slate-200 border border-slate-300 text-slate-700 p-3 rounded-xl flex items-center gap-2 font-medium italic">
                          ✕ Direct command completely aborted. Temporary memory staging matrices fully erased.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {/* 6. Dynamic Streaming Loading Indicator */}
          {isProcessing && (
            <div className="flex items-center gap-2 pl-4 animate-pulse">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-xs text-[#64748B] font-medium">Loop is working...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* 7. Floating Command Composer Anchor */}
        <footer className="p-4 bg-gradient-to-t from-white via-white to-transparent sticky bottom-0 border-t border-slate-100">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleCommandExecution(commandInput); setCommandInput(""); }}
            className="max-w-2xl w-full mx-auto relative bg-white border border-[#E2E8F0] rounded-2xl shadow-md p-2 flex flex-col justify-between focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all duration-200"
          >
            <textarea 
              rows={2}
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleCommandExecution(commandInput);
                  setCommandInput("");
                }
              }}
              placeholder="Ask Loop to draft an email, map a calendar window, or parse file data..."
              className="w-full text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none resize-none p-2 font-sans bg-transparent min-h-[48px]"
            />
            
            <div className="flex justify-between items-center pt-2 px-2 border-t border-slate-100 mt-1">
              
              {/* Decorative Document / File Attachment Trigger Component */}
              <button type="button" className="text-[#64748B] hover:text-[#0F172A] p-1.5 rounded-lg hover:bg-slate-100 transition flex items-center gap-1 text-xs font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32a1.5 1.5 0 01-2.12-2.121L16.204 8.56" /></svg>
                <span className="hidden sm:inline">Attach</span>
              </button>

              <button 
                type="submit"
                disabled={!commandInput.trim()}
                className="bg-[#2563EB] text-white px-4 py-1.5 rounded-xl text-xs font-medium hover:bg-blue-700 disabled:opacity-20 disabled:hover:bg-[#2563EB] shadow-sm transition duration-150"
              >
                Send Command
              </button>
            </div>
          </form>
        </footer>

      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white text-[#64748B] font-sans text-xs flex items-center justify-center tracking-widest uppercase">
        Initializing Premium Workspace Architecture...
      </div>
    }>
      <WorkspaceCore />
    </Suspense>
  );
}