'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  MessageSquareCode, 
  Mail, 
  HardDrive, 
  Calendar, 
  Settings, 
  Send, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  Paperclip,
  User
} from 'lucide-react';

type UserPlan = 'Free Trial' | 'Basic' | 'Pro';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  integrationKey?: 'gmail' | 'drive' | 'calendar';
}

export default function LoopWorkspace() {
  const [currentPlan, setCurrentPlan] = useState<UserPlan>('Free Trial');
  const [daysRemaining, setDaysRemaining] = useState<number>(14);
  const [chatInput, setChatInput] = useState<string>('');
  
  // Clean individual tool state trackers
  const [isGmailConnected, setIsGmailConnected] = useState<boolean>(false);
  const [isDriveConnected, setIsDriveConnected] = useState<boolean>(false);
  const [isCalendarConnected, setIsCalendarConnected] = useState<boolean>(false);

  // Core Onboarding Conversation Flow array
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: 'init-onboarding',
      role: 'assistant',
      content: "Welcome to Loop! Your container is provisioned and ready for modern work.\n\nTo begin automating your background routines, let's connect your communication pathways. Are you ready to link your Gmail, Google Drive, and Google Calendar tools directly to this interface?",
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Dedicated, robust connection pipeline activations
  const handleConnectTool = (tool: 'gmail' | 'drive' | 'calendar') => {
    let toolName = '';
    
    if (tool === 'gmail') {
      if (isGmailConnected) return;
      setIsGmailConnected(true);
      toolName = 'Gmail Stream';
    } else if (tool === 'drive') {
      if (isDriveConnected) return;
      setIsDriveConnected(true);
      toolName = 'Google Drive Indexer';
    } else if (tool === 'calendar') {
      if (isCalendarConnected) return;
      setIsCalendarConnected(true);
      toolName = 'Google Calendar Core';
    }

    setChatMessages(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `⚡ **${toolName} Handshake Successful!** Your integration node is now fully authenticated and synchronized with the workspace. ready to listen for automation loops.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      role: 'user',
      content: userMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `🤖 Action logged: "${userMsg}". Parsing message vectors against your workspace parameters...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 700);
  };

  return (
    <div className="flex h-screen w-screen bg-[#FFFFFF] font-sans antialiased text-[#111827] overflow-hidden">
      
      {/* ================= SIDEBAR COMPONENT ================= */}
      <aside className="w-64 border-r border-[#E5E7EB] flex flex-col justify-between bg-[#FFFFFF] p-4 shrink-0 select-none">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-2.5 px-2">
            <div className="h-6 w-6 rounded-md bg-[#2563EB] flex items-center justify-center">
              <span className="text-[#FFFFFF] text-xs font-black">L</span>
            </div>
            <span className="text-md font-semibold tracking-tight">Loop</span>
          </div>

          <nav className="space-y-1">
            <button className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 text-sm rounded-md font-medium bg-[#F3F4F6] text-[#2563EB]">
              <MessageSquareCode className="h-4 w-4" />
              <span>AI Chat</span>
            </button>
            <button 
              onClick={() => handleConnectTool('gmail')}
              className="w-full flex items-center justify-between px-2.5 py-1.5 text-sm rounded-md font-medium text-[#4B5563] hover:bg-[#F9FAFB] transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </div>
              <span className={`h-2 w-2 rounded-full transition-all duration-300 ${isGmailConnected ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-gray-300'}`} />
            </button>
            <button 
              onClick={() => handleConnectTool('drive')}
              className="w-full flex items-center justify-between px-2.5 py-1.5 text-sm rounded-md font-medium text-[#4B5563] hover:bg-[#F9FAFB] transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <HardDrive className="h-4 w-4" />
                <span>Google Drive</span>
              </div>
              <span className={`h-2 w-2 rounded-full transition-all duration-300 ${isDriveConnected ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-gray-300'}`} />
            </button>
            <button 
              onClick={() => handleConnectTool('calendar')}
              className="w-full flex items-center justify-between px-2.5 py-1.5 text-sm rounded-md font-medium text-[#4B5563] hover:bg-[#F9FAFB] transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Calendar className="h-4 w-4" />
                <span>Calendar</span>
              </div>
              <span className={`h-2 w-2 rounded-full transition-all duration-300 ${isCalendarConnected ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-gray-300'}`} />
            </button>
            <button className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 text-sm rounded-md font-medium text-[#4B5563] hover:bg-[#F9FAFB]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
              <span>Billing</span>
            </button>
            <button className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 text-sm rounded-md font-medium text-[#4B5563] hover:bg-[#F9FAFB]">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Dynamic Billing Container */}
        <div className="mt-auto pt-4 border-t border-[#E5E7EB]">
          {currentPlan === 'Free Trial' && (
            <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50">
              <div className="flex items-center space-x-2 text-amber-800">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="text-xs font-semibold">Trial Plan</span>
              </div>
              <p className="mt-1.5 text-xs text-amber-700 font-medium">
                Your trial is about to end! You have <span className="font-bold text-amber-900">{daysRemaining} days remaining</span>.
              </p>
              <button className="mt-3 w-full inline-flex items-center justify-center space-x-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg shadow-sm transition-colors">
                <span>Upgrade Plan</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          )}
          {currentPlan === 'Basic' && (
            <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-[#FAFAFA]">
              <div className="flex items-center space-x-2 text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold">Basic Plan Active</span>
              </div>
              <button className="mt-3 w-full inline-flex items-center justify-center space-x-1 px-3 py-1.5 text-xs font-semibold text-[#2563EB] bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] rounded-lg transition-colors">
                <span>Upgrade to Pro</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          )}
          {currentPlan === 'Pro' && (
            <div className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/30">
              <div className="flex items-center space-x-2 text-indigo-900">
                <Sparkles className="h-4 w-4 text-indigo-600 shrink-0" />
                <span className="text-xs font-bold tracking-tight">Loop Pro Activated</span>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ================= WORKSPACE AI CHAT INTERFACE ================= */}
      <main className="flex-1 flex flex-col h-full bg-[#FFFFFF] overflow-hidden relative">
        
        {/* Chat Stream Window */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 pb-36">
          <div className="max-w-3xl mx-auto space-y-6">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex space-x-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                
                {msg.role === 'assistant' && (
                  <div className="h-8 w-8 rounded-lg bg-[#2563EB] flex items-center justify-center shrink-0 shadow-sm shadow-[#2563EB]/20">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                )}

                <div className={`max-w-xl rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-[#2563EB] text-white rounded-br-none shadow-sm' 
                    : 'bg-[#F3F4F6] text-[#111827] rounded-bl-none'
                }`}>
                  {msg.content}

                  {/* Inline interactive prompt buttons inside the initial onboarding greeting block */}
                  {msg.id === 'init-onboarding' && (!isGmailConnected || !isDriveConnected || !isCalendarConnected) && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      <button 
                        disabled={isGmailConnected}
                        onClick={() => handleConnectTool('gmail')}
                        className={`border font-semibold px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all shadow-sm ${
                          isGmailConnected 
                            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                            : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-800'
                        }`}
                      >
                        <span>{isGmailConnected ? 'Gmail Connected' : 'Connect Gmail'}</span>
                        <ArrowUpRight className="h-3 w-3 text-gray-400" />
                      </button>

                      <button 
                        disabled={isDriveConnected}
                        onClick={() => handleConnectTool('drive')}
                        className={`border font-semibold px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all shadow-sm ${
                          isDriveConnected 
                            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                            : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-800'
                        }`}
                      >
                        <span>{isDriveConnected ? 'Drive Connected' : 'Connect Drive'}</span>
                        <ArrowUpRight className="h-3 w-3 text-gray-400" />
                      </button>

                      <button 
                        disabled={isCalendarConnected}
                        onClick={() => handleConnectTool('calendar')}
                        className={`border font-semibold px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all shadow-sm ${
                          isCalendarConnected 
                            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                            : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-800'
                        }`}
                      >
                        <span>{isCalendarConnected ? 'Calendar Connected' : 'Connect Calendar'}</span>
                        <ArrowUpRight className="h-3 w-3 text-gray-400" />
                      </button>
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="h-8 w-8 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-[#4B5563]" />
                  </div>
                )}

              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Bar Structure */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-6 pb-6 px-8 border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSendMessage} className="relative bg-white rounded-2xl border border-gray-200 shadow-sm focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder="Ask Loop to manage tools or coordinate background events..."
                className="w-full resize-none bg-transparent py-4 pl-4 pr-16 text-sm text-[#111827] placeholder-gray-400 focus:outline-none h-[52px] overflow-hidden"
              />
              
              <div className="absolute right-3 bottom-2.5 flex items-center space-x-2">
                <button type="button" className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button 
                  type="submit" 
                  disabled={!chatInput.trim()} 
                  className={`p-1.5 rounded-lg transition-all ${chatInput.trim() ? 'bg-[#2563EB] text-white shadow-sm' : 'text-gray-300 bg-gray-50'}`}
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
            <p className="text-[11px] text-center text-gray-400 mt-2">
              Loop AI is synced to sandbox processing nodes. Action variables execute automatically.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}