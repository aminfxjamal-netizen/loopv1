"use client";

import { useState } from "react";
import { 
  MessageSquare, 
  Settings as SettingsIcon, 
  User, 
  Mail, 
  Lock, 
  Send, 
  Sparkles, 
  LogOut, 
  Check, 
  RefreshCw,
  Camera
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  isDraft?: boolean;
  recipient?: string;
  subject?: string;
}

export default function WorkspacePage() {
  // Navigation View State: 'chat' | 'settings'
  const [currentView, setCurrentView] = useState<'chat' | 'settings'>('chat');

  // Interactive Live Profile States
  const [profile, setProfile] = useState({
    name: "Alex Executive",
    email: "alex@loopagent.ai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
  });

  // Password Modification States
  const [passwordState, setPasswordState] = useState({ current: "", next: "", confirm: "" });
  const [passwordFeedback, setPasswordFeedback] = useState({ message: "", success: false });

  // Pre-compiled list of customizable mock avatars
  const mockAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=256&h=256&q=80"
  ];

  // Chat/Pipeline Management States
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to Loop Agent. Use '@gmail draft an email to john' to generate a high-fidelity draft via Gemini 3.5 Flash.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Profile Form Change Interceptors
  const handleProfileUpdate = (key: 'name' | 'email', value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleAvatarChange = (url: string) => {
    setProfile(prev => ({ ...prev, avatar: url }));
  };

  // Password Modification Validation Routing
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordState.current || !passwordState.next || !passwordState.confirm) {
      setPasswordFeedback({ message: "All password fields are required.", success: false });
      return;
    }
    if (passwordState.next !== passwordState.confirm) {
      setPasswordFeedback({ message: "New passwords do not match.", success: false });
      return;
    }
    if (passwordState.next.length < 6) {
      setPasswordFeedback({ message: "Password must be at least 6 characters.", success: false });
      return;
    }
    // Execution Simulated successfully
    setPasswordFeedback({ message: "Password successfully updated in live secure context!", success: true });
    setPasswordState({ current: "", next: "", confirm: "" });
  };

  // Communication Handlers mapping to backend Gemini 3.5 Flash API
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("API route offline or unreachable");
      const data = await response.json();
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Pipeline error executing request. Verify your API keys." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmail = (msg: Message) => {
    alert(`Email successfully dispatched via backend pipeline to: ${msg.recipient}`);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: `✅ Dispatched: Email message tracking token created for ${msg.recipient}.` }
    ]);
  };

  const handleRegenerate = async (msg: Message) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages,
            { role: "user", content: `@gmail draft an email to rewrite the previous message draft for ${msg.recipient}` }
          ]
        }),
      });
      if (!response.ok) throw new Error("Regeneration failed");
      const data = await response.json();
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden">
      
      {/* 1. LEFT SIDEBAR NAVIGATION NAVIGATION */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between z-30">
        <div>
          {/* Brand Unit */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.3)]">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white">Loop Agent</div>
              <div className="text-[10px] text-slate-500 font-medium">v1.0.0 Alpha</div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => setCurrentView('chat')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition duration-150 ${
                currentView === 'chat' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30' 
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              Agent Core Chat
            </button>
            <button
              onClick={() => setCurrentView('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition duration-150 ${
                currentView === 'settings' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30' 
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <SettingsIcon className="h-4 w-4" />
              Account Settings
            </button>
          </nav>
        </div>

        {/* User Footplate Identity Panel */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/20 flex items-center gap-3">
          <img 
            src={profile.avatar} 
            alt="Profile Avatar" 
            className="h-9 w-9 rounded-full object-cover ring-2 ring-slate-800"
          />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-200 truncate">{profile.name}</div>
            <div className="text-[10px] text-slate-500 truncate">{profile.email}</div>
          </div>
          <button className="text-slate-500 hover:text-slate-300 p-1.5 rounded-md hover:bg-slate-800">
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </aside>

      {/* 2. MAIN VIEW CONTROLLER */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950/50">
        
        {/* Global Mandatory Welcome Header */}
        <header className="px-6 py-4 border-b border-slate-800 bg-slate-900/40 backdrop-blur-md flex items-center justify-between z-10">
          <h2 className="text-md font-bold tracking-tight text-white flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Welcome, {profile.name}
          </h2>
          <div className="text-[10px] font-mono tracking-wider uppercase text-indigo-400 bg-indigo-950/40 px-2.5 py-1 rounded-md border border-indigo-900/50">
            Engine: Gemini 3.5 Flash
          </div>
        </header>

        {/* Content Splitting Area */}
        {currentView === 'chat' ? (
          
          /* ==================== A. CHAT INTERFACE ==================== */
          <>
            <main className="flex-1 overflow-y-auto p-6 space-y-4 max-w-4xl w-full mx-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.isDraft ? (
                    /* Interactive Automated Email Approval Framework */
                    <div className="p-5 border border-blue-500/20 rounded-xl bg-slate-900/90 shadow-xl my-2 w-full max-w-xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-1">
                      <div className="flex items-center gap-2 text-[11px] text-blue-400 font-bold tracking-widest uppercase mb-3">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                        Verify Output Draft Payload
                      </div>
                      <div className="text-xs text-slate-400 space-y-1 mb-4 border-b border-slate-800 pb-2.5">
                        <div><strong className="text-slate-300 font-medium">To:</strong> {msg.recipient}</div>
                        <div><strong className="text-slate-300 font-medium">Subject:</strong> {msg.subject}</div>
                      </div>
                      <p className="text-sm text-slate-200 bg-slate-950/70 p-4 rounded-lg border border-slate-900 whitespace-pre-wrap leading-relaxed shadow-inner">
                        {msg.content}
                      </p>
                      
                      <div className="flex gap-2 mt-4 justify-end">
                        <button 
                          onClick={() => handleRegenerate(msg)} 
                          disabled={isLoading}
                          className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 border border-slate-700/60 rounded-lg text-xs font-semibold tracking-wide transition duration-150"
                        >
                          Regenerate
                        </button>
                        <button 
                          onClick={() => handleSendEmail(msg)} 
                          disabled={isLoading}
                          className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 text-white rounded-lg text-xs font-semibold tracking-wide shadow-md shadow-blue-900/30 transition duration-150"
                        >
                          Approve & Send
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Standard Chat Layout Bubble */
                    <div
                      className={`max-w-xl p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "bg-indigo-600 text-white rounded-br-none"
                          : "bg-slate-900 text-slate-200 border border-slate-800/70 rounded-bl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl rounded-bl-none text-xs text-slate-400 flex items-center gap-2">
                    <RefreshCw className="h-3 w-3 animate-spin text-indigo-400" />
                    Querying routing nodes...
                  </div>
                </div>
              )}
            </main>

            {/* Message Action Form Bar */}
            <footer className="p-4 border-t border-slate-800/80 bg-slate-900/20 backdrop-blur-md">
              <form onSubmit={handleSendMessage} className="max-w-4xl w-full mx-auto flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message or use '@gmail draft an email to john'..."
                  disabled={isLoading}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-900 disabled:text-slate-600 text-white font-semibold px-5 rounded-xl text-sm transition duration-150 shadow-md flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  Send
                </button>
              </form>
            </footer>
          </>
        ) : (
          
          /* ==================== B. SETTINGS INTERFACE ==================== */
          <main className="flex-1 overflow-y-auto p-6 max-w-2xl w-full mx-auto space-y-6 animate-in fade-in duration-150">
            
            {/* Section Summary Header */}
            <div>
              <h3 className="text-xl font-bold tracking-tight text-white">Profile Management</h3>
              <p className="text-xs text-slate-400 mt-1">Configure user configurations, credentials, and deployment environments.</p>
            </div>

            {/* Block 1: Profile Picture Picker */}
            <div className="p-5 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Profile Picture Configuration</label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative group">
                  <img 
                    src={profile.avatar} 
                    alt="Active Avatar View" 
                    className="h-20 w-20 rounded-xl object-cover ring-4 ring-indigo-500/20"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-150 cursor-pointer">
                    <Camera className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-slate-400">Select a premium profile preset configuration:</div>
                  <div className="flex gap-2.5">
                    {mockAvatars.map((url, i) => (
                      <button 
                        key={i}
                        type="button"
                        onClick={() => handleAvatarChange(url)}
                        className={`h-11 w-11 rounded-lg overflow-hidden border-2 transition relative ${
                          profile.avatar === url ? 'border-indigo-500 scale-95 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={url} alt="Preset thumbnail" className="h-full w-full object-cover" />
                        {profile.avatar === url && (
                          <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center">
                            <Check className="h-3 w-3 text-white stroke-[3]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Block 2: Profile Metrics Data Form */}
            <div className="p-5 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Identity Parameters</label>
              
              <div className="space-y-3.5">
                {/* Full Name Parameter */}
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block font-medium">Account User Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                    <input 
                      type="text" 
                      value={profile.name}
                      onChange={(e) => handleProfileUpdate('name', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition font-medium"
                    />
                  </div>
                </div>

                {/* Email Address Parameter */}
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block font-medium">Communication Routing Address (Email)</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                    <input 
                      type="email" 
                      value={profile.email}
                      onChange={(e) => handleProfileUpdate('email', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Block 3: Change Password Authentication Protocol Block */}
            <form onSubmit={handlePasswordSubmit} className="p-5 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Security Authorization & Credentials</label>
              
              <div className="space-y-3.5">
                {/* Current Pass */}
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block font-medium">Current Secret Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={passwordState.current}
                      onChange={(e) => setPasswordState(prev => ({ ...prev, current: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                    />
                  </div>
                </div>

                {/* Split layouts for new password entries */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block font-medium">New Target Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        value={passwordState.next}
                        onChange={(e) => setPasswordState(prev => ({ ...prev, next: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block font-medium">Verify Target Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        value={passwordState.confirm}
                        onChange={(e) => setPasswordState(prev => ({ ...prev, confirm: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Functional Notification Verification Tray */}
              {passwordFeedback.message && (
                <div className={`p-3 rounded-lg text-xs font-medium border border-dashed transition duration-150 ${
                  passwordFeedback.success 
                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60' 
                    : 'bg-rose-950/40 text-rose-400 border-rose-800/60'
                }`}>
                  {passwordFeedback.message}
                </div>
              )}

              {/* Action trigger button */}
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-slate-750 text-slate-200 text-xs font-semibold tracking-wide rounded-lg transition duration-150 shadow-sm"
                >
                  Update Verification Password
                </button>
              </div>
            </form>
          </main>
        )}
      </div>
    </div>
  );
}