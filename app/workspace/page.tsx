"use client";

import React, { useState, useRef, useEffect } from "react";

export default function LoopWorkspace() {
  const [activeView, setActiveView] = useState("chat");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: `System Error: ${data.error}` }]);
      }
    } catch (error) {
      setMessages([...newMessages, { role: "assistant", content: "Network error: Unable to reach the Brain." }]);
    }
    
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleActionPillClick = (action: string) => {
    setInput(`I would like to ${action.toLowerCase()}.`);
  };

  // --- ICONS ---
  const Icons = {
    Chat: () => <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
    Email: () => <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    File: () => <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    Calendar: () => <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    Billing: () => <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
    Settings: () => <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    Paperclip: () => <svg className="w-5 h-5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>,
    Send: () => <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" /></svg>,
    MenuToggle: () => <svg className="w-5 h-5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
  };

  const NavItem = ({ id, label, icon: Icon }: { id: string, label: string, icon: React.ElementType }) => (
    <button
      onClick={() => setActiveView(id)}
      className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
        activeView === id 
          ? "bg-[#2563EB]/10 text-[#2563EB] font-medium" 
          : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
      }`}
      title={!isSidebarOpen ? label : ""}
    >
      <div className={`${isSidebarOpen ? "mr-3" : "mx-auto"}`}>
        <Icon />
      </div>
      {isSidebarOpen && <span className="truncate">{label}</span>}
    </button>
  );

  return (
    <div className="flex h-screen bg-[#FFFFFF] text-[#0F172A] font-sans overflow-hidden selection:bg-[#2563EB]/20">
      
      {/* ================= SIDEBAR ================= */}
      <aside 
        className={`border-r border-[#E2E8F0] flex flex-col justify-between flex-shrink-0 bg-white z-20 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-[260px]" : "w-[80px]"
        }`}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Top Header & Toggle */}
          <div className={`flex items-center mb-10 mt-2 ${isSidebarOpen ? "justify-between px-2" : "justify-center"}`}>
            <div className={`flex items-center gap-3 overflow-hidden ${!isSidebarOpen && "hidden"}`}>
              <div className="w-7 h-7 rounded bg-[#2563EB] flex items-center justify-center flex-shrink-0 shadow-sm">
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              </div>
              <span className="text-xl font-medium tracking-tight">Loop</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0 text-[#64748B]"
            >
              <Icons.MenuToggle />
            </button>
          </div>

          {/* Primary Navigation */}
          <nav className="space-y-1.5 mb-6">
            <NavItem id="chat" label="AI Chat" icon={Icons.Chat} />
            <NavItem id="email" label="Email" icon={Icons.Email} />
            <NavItem id="files" label="Files" icon={Icons.File} />
            <NavItem id="calendar" label="Calendar" icon={Icons.Calendar} />
          </nav>

          <div className="pt-6 border-t border-[#E2E8F0] mt-auto">
            <nav className="space-y-1.5">
              <NavItem id="billing" label="Billing" icon={Icons.Billing} />
              <NavItem id="settings" label="Settings" icon={Icons.Settings} />
            </nav>
          </div>
        </div>

        {/* Bottom Profile / Plan */}
        <div className={`p-4 border-t border-[#E2E8F0] transition-all duration-300 ${isSidebarOpen ? "px-6" : "px-0 flex justify-center"}`}>
          {isSidebarOpen ? (
            <div>
              <div className="text-sm font-medium text-[#0F172A]">Trial Plan</div>
              <div className="text-xs text-[#64748B] mt-0.5">14 days remaining</div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium border border-[#E2E8F0] text-[#0F172A]">
              T
            </div>
          )}
        </div>
      </aside>

      {/* ================= MAIN WORKSPACE ================= */}
      <main className="flex-1 flex flex-col relative h-full bg-white">
        
        {/* VIEW: CHAT */}
        {activeView === "chat" && (
          <div className="flex-1 flex flex-col w-full h-full relative">
            
            <div className="flex-1 overflow-y-auto w-full px-6 md:px-12 pt-16 pb-48">
              <div className="max-w-3xl mx-auto w-full">
                
                {messages.length === 0 ? (
                  // EMPTY STATE (HERO)
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out mt-10">
                    <h1 className="text-[44px] font-medium tracking-tight mb-3 text-[#0F172A]">Welcome to Loop</h1>
                    <p className="text-[#64748B] text-[22px] mb-12 font-normal">What would you like Loop to do today?</p>

                    {/* Quick Actions (Pills) */}
                    <div className="flex flex-wrap gap-3 mb-16">
                      {["Draft an Email", "Analyze a File", "Schedule a Meeting", "Research a Topic"].map((action) => (
                        <button 
                          key={action}
                          onClick={() => handleActionPillClick(action)}
                          className="px-5 py-2.5 rounded-full border border-[#E2E8F0] text-[15px] font-medium text-[#0F172A] hover:border-[#2563EB] hover:text-[#2563EB] transition-all bg-white hover:bg-[#2563EB]/5"
                        >
                          {action}
                        </button>
                      ))}
                    </div>

                    {/* Loop Assistant Section */}
                    <div className="pl-2 border-l-2 border-[#E2E8F0]">
                      <p className="text-[#0F172A] font-medium mb-4 text-lg">Loop can help you:</p>
                      <ul className="space-y-3 text-[#64748B] text-[15px]">
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0]"></span> Draft and send emails</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0]"></span> Analyze documents and spreadsheets</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0]"></span> Schedule meetings</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0]"></span> Organize information</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0]"></span> Research topics</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0]"></span> Automate repetitive work</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  // CHAT STATE
                  <div className="space-y-8 flex flex-col">
                    {messages.map((msg, index) => (
                      <div key={index} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        
                        {/* Assistant Avatar */}
                        {msg.role === "assistant" && (
                          <div className="w-7 h-7 rounded bg-[#2563EB] flex-shrink-0 flex items-center justify-center mt-1 shadow-sm">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                        
                        {/* Bubble */}
                        <div className={`px-5 py-3.5 rounded-2xl max-w-[85%] text-[15px] leading-relaxed shadow-sm ${
                          msg.role === "user" 
                            ? "bg-[#0F172A] text-white rounded-br-sm" 
                            : "bg-white border border-[#E2E8F0] text-[#0F172A] rounded-bl-sm"
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}

                    {/* Typing State */}
                    {isLoading && (
                      <div className="flex gap-4 justify-start animate-in fade-in duration-300">
                        <div className="w-7 h-7 rounded bg-[#2563EB] flex-shrink-0 flex items-center justify-center mt-1 shadow-sm">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div className="px-5 py-3.5 rounded-2xl bg-white border border-[#E2E8F0] text-[#2563EB] font-medium text-[15px] rounded-bl-sm shadow-sm flex items-center">
                          <span className="animate-pulse">✦ Loop is working...</span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
            </div>

            {/* FLOATING COMMAND INPUT */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-10 pb-8 px-6 md:px-12 z-10">
              <div className="max-w-3xl mx-auto">
                <div className="relative flex items-end bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB]/20">
                  <button className="absolute left-3 bottom-3 p-2 hover:bg-slate-50 rounded-xl transition-colors">
                    <Icons.Paperclip />
                  </button>
                  
                  <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    disabled={isLoading}
                    rows={1}
                    className="w-full py-4 pl-14 pr-16 text-[15px] bg-transparent outline-none placeholder-[#64748B] disabled:opacity-50 resize-none max-h-32 overflow-y-auto"
                    placeholder="Ask Loop anything..."
                    style={{ minHeight: "56px" }}
                  />
                  
                  <button 
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-3 bottom-2.5 p-2 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-[#E2E8F0] disabled:text-[#64748B] rounded-[10px] transition-colors"
                  >
                    <Icons.Send />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: EMAIL */}
        {activeView === "email" && (
          <div className="flex-1 max-w-3xl mx-auto w-full p-12 mt-10 animate-in fade-in duration-500">
            <h1 className="text-3xl font-medium tracking-tight mb-3 text-[#0F172A]">Email</h1>
            <p className="text-[#64748B] text-lg mb-8">Draft, send and follow up on emails through Loop.</p>
            <button className="bg-white border border-[#E2E8F0] hover:border-[#2563EB] text-[#0F172A] px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm flex items-center gap-3">
              <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
              Connect Gmail
            </button>
            <div className="mt-12 py-12 border-t border-[#E2E8F0] text-[#64748B]">No email account connected.</div>
          </div>
        )}

        {/* VIEW: FILES */}
        {activeView === "files" && (
          <div className="flex-1 max-w-3xl mx-auto w-full p-12 mt-10 animate-in fade-in duration-500">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h1 className="text-3xl font-medium tracking-tight mb-3 text-[#0F172A]">Files</h1>
                <p className="text-[#64748B] text-lg">Upload files and let Loop analyze them.</p>
              </div>
              <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
                Upload File
              </button>
            </div>
            
            <div className="border border-dashed border-[#E2E8F0] rounded-2xl p-16 text-center bg-slate-50/50">
              <p className="text-[#0F172A] font-medium mb-1">No files uploaded yet.</p>
              <p className="text-sm text-[#64748B]">Supported: PDF, DOCX, XLSX, CSV, Images</p>
            </div>
          </div>
        )}

        {/* VIEW: CALENDAR */}
        {activeView === "calendar" && (
          <div className="flex-1 max-w-3xl mx-auto w-full p-12 mt-10 animate-in fade-in duration-500">
            <h1 className="text-3xl font-medium tracking-tight mb-3 text-[#0F172A]">Calendar</h1>
            <p className="text-[#64748B] text-lg mb-8">Schedule meetings and manage availability.</p>
            <button className="bg-white border border-[#E2E8F0] hover:border-[#2563EB] text-[#0F172A] px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm">
              Connect Calendar
            </button>
            <div className="mt-12 py-12 border-t border-[#E2E8F0] text-[#64748B]">No meetings scheduled.</div>
          </div>
        )}

        {/* VIEW: BILLING */}
        {activeView === "billing" && (
          <div className="flex-1 max-w-3xl mx-auto w-full p-12 mt-10 animate-in fade-in duration-500">
            <h1 className="text-3xl font-medium tracking-tight mb-10 text-[#0F172A]">Billing</h1>
            <div className="border border-[#E2E8F0] rounded-2xl p-8 max-w-md bg-white shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[#64748B]">Current Plan</span>
                <span className="font-medium text-[#0F172A]">Trial</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[#64748B]">Trial Status</span>
                <span className="text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full text-sm font-medium">Active</span>
              </div>
              <div className="flex justify-between items-center mb-8 pb-8 border-b border-[#E2E8F0]">
                <span className="text-[#64748B]">Renewal Date</span>
                <span className="font-medium text-[#0F172A]">June 28, 2026</span>
              </div>
              <button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
                Upgrade Plan
              </button>
            </div>
          </div>
        )}

        {/* VIEW: SETTINGS */}
        {activeView === "settings" && (
          <div className="flex-1 max-w-3xl mx-auto w-full p-12 mt-10 animate-in fade-in duration-500">
            <h1 className="text-3xl font-medium tracking-tight mb-10 text-[#0F172A]">Settings</h1>
            <div className="max-w-md space-y-2">
              {['Profile', 'Password', 'Notifications', 'Connected Accounts', 'Security'].map((item) => (
                <div key={item} className="flex justify-between items-center p-4 hover:bg-slate-50 rounded-xl cursor-pointer border border-transparent hover:border-[#E2E8F0] transition-all text-[#0F172A]">
                  <span className="font-medium">{item}</span>
                  <span className="text-[#64748B]">&rarr;</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}