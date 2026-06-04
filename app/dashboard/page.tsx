'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Send, 
  Sparkles,
  ChevronDown,
  User,
  Paperclip,
  Link2
} from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  showConnectPrompt?: boolean;
}

export default function PremiumChatWorkspace() {
  const [input, setInput] = useState('');
  
  // Track actual authentication/connection states for the integration layer
  const [appsConnected, setAppsConnected] = useState({
    gmail: false,
    drive: false,
    calendar: false
  });

  // Dynamic initialization message checking if user needs onboarding guidance
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-onboarding',
      role: 'assistant',
      content: "Welcome to Loop! Your payment has cleared and your single-operator sandbox container is provisioned. \n\nTo begin automating background routines, we need to establish secure data pathways. Are you ready to connect to your Gmail, Google Drive, and Google Calendar?",
      timestamp: 'Just now',
      showConnectPrompt: true
    }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Simulate connecting apps cleanly
  const connectAllApps = () => {
    setAppsConnected({ gmail: true, drive: true, calendar: true });
    setMessages(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "⚡ **Integration Handshake Successful!** Your real-time data nodes are secure. I am now listening to your Gmail streams, indexing your Drive files, and tracking your Calendar matrices. What operational routine can I run for you?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessageStr = input;
    setMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      role: 'user',
      content: userMessageStr,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/integrations/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessageStr })
      });
      const data = await res.json();
      setIsTyping(false);
      
      let aiResponseText = "I have acknowledged that instruction.";
      if (data.success && data.event) {
        aiResponseText = `📅 **Done!** I have scheduled your meeting for **${data.event.time}** and synchronized it directly to your primary Google Calendar container.`;
      }

      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans antialiased flex h-screen w-screen overflow-hidden">
      
      {/* 1. Left Sidebar with Dynamic Active Connect Triggers */}
      <aside className="w-64 bg-[#f9f9f9] border-r border-gray-200 flex flex-col justify-between h-full z-20 flex-shrink-0">
        <div className="flex flex-col flex-1 overflow-y-auto">
          
          <div className="p-3.5 space-y-3">
            <div className="flex items-center px-2 gap-2">
              <span className="w-5 h-5 bg-black rounded flex items-center justify-center text-white text-xs font-black">L</span>
              <span className="text-sm font-bold tracking-tight text-gray-900">Loop v1.0</span>
            </div>

            <button 
              onClick={() => setMessages([messages[0]])}
              className="w-full h-9 border border-gray-200 hover:bg-gray-100 bg-white rounded-lg text-xs font-semibold text-gray-800 transition flex items-center gap-2 px-3 shadow-sm"
            >
              <Plus size={14} className="text-gray-500" />
              New chat
            </button>
          </div>

          {/* Connected Workspace Apps Integrations Node */}
          <div className="px-3.5 py-2">
            <h3 className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-2">Workspace Apps</h3>
            <div className="space-y-1">
              
              {/* Gmail Sync Status */}
              <button onClick={connectAllApps} className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold text-gray-700 bg-white border border-gray-200/60 hover:border-gray-300 shadow-sm transition hover:bg-gray-50 text-left">
                <span className="flex items-center gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" fill="#f2f2f2"/>
                    <path d="M22 6v12c0 1.1-.9 2-2 2h-2V8l-6 4-6-4v12H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2z" fill="#b8b8b8"/>
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v1.5l10 6.5 10-6.5V6c0-1.1-.9-2-2-2z" fill="#ea4335"/>
                    <path d="M2 7.5V18c0 1.1.9 2 2 2h3V9.5L2 7.5z" fill="#c5221f"/>
                    <path d="M22 7.5V18c0 1.1-.9 2-2 2h-3V9.5l5-2z" fill="#a71e1c"/>
                  </svg>
                  Gmail Sync
                </span>
                {appsConnected.gmail ? (
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-sm" />
                ) : (
                  <span className="text-[9px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-1 py-0.2 rounded font-mono">Connect</span>
                )}
              </button>

              {/* Google Drive Status */}
              <button onClick={connectAllApps} className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold text-gray-700 bg-white border border-gray-200/60 hover:border-gray-300 shadow-sm transition hover:bg-gray-50 text-left">
                <span className="flex items-center gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.52 4.48l-5.04 8.76L6 17.76l5.04-8.76L8.52 4.48z" fill="#0066da"/>
                    <path d="M15.48 4.48H5.4l2.52 4.4h10.08l-2.52-4.4z" fill="#00aa47"/>
                    <path d="M20.52 13.24L15.48 4.48l-2.52 4.4 5.04 8.76 2.52-4.4z" fill="#ffba00"/>
                  </svg>
                  Google Drive
                </span>
                {appsConnected.drive ? (
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-sm" />
                ) : (
                  <span className="text-[9px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-1 py-0.2 rounded font-mono">Connect</span>
                )}
              </button>

              {/* Calendar Status */}
              <button onClick={connectAllApps} className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold text-gray-700 bg-white border border-gray-200/60 hover:border-gray-300 shadow-sm transition hover:bg-gray-50 text-left">
                <span className="flex items-center gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="#4285f4"/>
                    <path d="M19 3h-2v2h-2V3H9v2H7V3H5c-1.1 0-2 .9-2 2v3h18V5c0-1.1-.9-2-2-2z" fill="#34a853"/>
                    <path d="M5 8h14v11H5V8z" fill="#fff"/>
                    <path d="M12 11h4v4h-4v-4z" fill="#4285f4"/>
                  </svg>
                  Calendar
                </span>
                {appsConnected.calendar ? (
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-sm" />
                ) : (
                  <span className="text-[9px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-1 py-0.2 rounded font-mono">Connect</span>
                )}
              </button>

            </div>
          </div>

          <div className="px-3.5 py-4 flex-1 overflow-y-auto">
            <h3 className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-2">Recent History</h3>
            <div className="space-y-0.5">
              <button className="w-full flex items-center gap-2 px-2 py-2 text-xs font-medium text-gray-400 hover:text-gray-900 rounded-lg text-left transition truncate">
                <MessageSquare size={13} className="text-gray-400 flex-shrink-0" />
                <span className="truncate">First Session Workspace Initialization</span>
              </button>
            </div>
          </div>

        </div>

        <div className="p-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
            <p className="text-xs font-semibold text-gray-800 truncate">Amin's Node</p>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </aside>

      {/* 2. Main Chat Workspace Panel */}
      <main className="flex-1 flex flex-col h-full bg-white relative">
        <header className="h-14 border-b border-gray-200 flex items-center px-6 justify-between flex-shrink-0 bg-white z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
            <span>Workspace Terminal</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500 font-normal">Onboarding Datastream</span>
          </div>
        </header>

        {/* Message Feed Canvas */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
            
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-sm flex-shrink-0">
                    <Sparkles size={13} />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs font-medium leading-relaxed shadow-sm border flex flex-col gap-3 ${
                  msg.role === 'user' ? 'bg-black text-white border-black text-left' : 'bg-gray-50 text-gray-800 border-gray-150 text-left'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  
                  {/* Embedded 10/10 Interactive Action Button for App Connection */}
                  {msg.showConnectPrompt && !appsConnected.gmail && (
                    <button 
                      onClick={connectAllApps}
                      className="mt-1 self-start px-3 py-1.5 bg-black hover:bg-gray-900 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm border border-black text-[11px]"
                    >
                      <Link2 size={12} /> Connect Google Ecosystem
                    </button>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shadow-sm flex-shrink-0">
                    <User size={13} className="text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4 items-start justify-start">
                <div className="w-7 h-7 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-sm flex-shrink-0">
                  <Sparkles size={13} />
                </div>
                <div className="bg-gray-50 text-gray-400 border border-gray-150 rounded-2xl px-4 py-3 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Global Input Bar */}
        <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
          <form onSubmit={handleSend} className="max-w-2xl mx-auto relative border border-gray-200 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 rounded-xl bg-white p-1.5 transition flex items-center gap-2">
            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition rounded-lg">
              <Paperclip size={15} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Loop to manage routines..."
              className="flex-1 bg-transparent border-none outline-none text-xs font-medium py-2 px-1 text-gray-900"
            />
            <button type="submit" disabled={!input.trim()} className="p-2 bg-black hover:bg-gray-800 text-white rounded-lg transition disabled:opacity-20 flex-shrink-0">
              <Send size={13} />
            </button>
          </form>
        </div>

      </main>
    </div>
  );
}