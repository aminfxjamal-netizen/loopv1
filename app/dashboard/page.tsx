'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Send, 
  Sparkles,
  ChevronDown,
  User,
  Paperclip
} from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function PremiumChatWorkspace() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: "Hello! I'm your Loop Engine workspace assistant. I am connected to your Gmail, Google Drive, and Calendar. How can I help you optimize your operations today?",
      timestamp: '10:30 PM'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessageStr = input;
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userMessageStr,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate standard AI response streaming / generation
    try {
      const res = await fetch('/api/integrations/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessageStr })
      });
      const data = await res.json();

      setIsTyping(false);
      
      let aiResponseText = "I've processed that request for you.";
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
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "I processed your request, but I encountered an optimization error while talking to the integration layer.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans antialiased flex h-screen w-screen overflow-hidden">
      
      {/* 1. Standard Left Sidebar */}
      <aside className="w-64 bg-[#f9f9f9] border-r border-gray-200 flex flex-col justify-between h-full z-20 flex-shrink-0">
        <div className="flex flex-col flex-1 overflow-y-auto">
          
          {/* New Chat Top Block */}
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

          {/* Connected Workspace Apps Integrations */}
          <div className="px-3.5 py-2">
            <h3 className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-2">Connected Apps</h3>
            <div className="space-y-0.5">
              
              <div className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium text-gray-600 bg-white border border-gray-100 shadow-sm">
                <span className="flex items-center gap-2.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#ea4335" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
                    <path fill="#4285f4" d="M22 6v12c0 1.1-.9 2-2 2h-2V8l-6 4-6-4v12H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2z"/>
                  </svg>
                  Gmail Sync
                </span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              </div>

              <div className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium text-gray-600 bg-white border border-gray-100 shadow-sm mt-1">
                <span className="flex items-center gap-2.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#00aa47" d="M19.4 17.5H4.6L2 13 4.6 8.5h14.8l2.6 4.5-2.6 4.5z"/>
                  </svg>
                  Google Drive
                </span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              </div>

              <div className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium text-gray-600 bg-white border border-gray-100 shadow-sm mt-1">
                <span className="flex items-center gap-2.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285f4" d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                  </svg>
                  Calendar
                </span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              </div>

            </div>
          </div>

          {/* Chat History List */}
          <div className="px-3.5 py-4 flex-1 overflow-y-auto">
            <h3 className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-2">Recent History</h3>
            <div className="space-y-0.5">
              <button className="w-full flex items-center gap-2 px-2 py-2 text-xs font-medium text-gray-900 bg-gray-200/60 rounded-lg text-left transition truncate">
                <MessageSquare size={13} className="text-gray-500 flex-shrink-0" />
                <span className="truncate">Schedule Tuesday Meeting</span>
              </button>
              <button className="w-full flex items-center gap-2 px-2 py-2 text-xs font-medium text-gray-500 hover:text-gray-900 rounded-lg text-left transition truncate">
                <MessageSquare size={13} className="text-gray-400 flex-shrink-0" />
                <span className="truncate">Analyze Drive Files</span>
              </button>
            </div>
          </div>

        </div>

        {/* User Identity Info at Bottom */}
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

      {/* 2. Main Chat Thread Panel */}
      <main className="flex-1 flex flex-col h-full bg-white relative">
        
        {/* Dynamic Navigation Topbar */}
        <header className="h-14 border-b border-gray-200 flex items-center px-6 justify-between flex-shrink-0 bg-white z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
            <span>Workspace Terminal</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500 font-normal">Active Sync Thread</span>
          </div>
        </header>

        {/* Core Message Dynamic Feed Container */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
            
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-4 items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Assistant Icon Frame */}
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-sm flex-shrink-0">
                    <Sparkles size={13} />
                  </div>
                )}

                {/* Bubble Markup Wrapper */}
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs font-medium leading-relaxed shadow-sm border ${
                  msg.role === 'user' 
                    ? 'bg-black text-white border-black text-left' 
                    : 'bg-gray-50 text-gray-800 border-gray-150 text-left'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>

                {/* User Profile Avatar Node */}
                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shadow-sm flex-shrink-0">
                    <User size={13} className="text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {/* Standard AI Typing Spinner Indicator */}
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

        {/* 3. Global Bottom Chat Input Bar */}
        <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
          <form onSubmit={handleSend} className="max-w-2xl mx-auto relative border border-gray-200 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 rounded-xl bg-white p-1.5 transition flex items-center gap-2">
            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition rounded-lg">
              <Paperclip size={15} />
            </button>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message Loop..."
              className="flex-1 bg-transparent border-none outline-none text-xs font-medium py-2 px-1 text-gray-900 placeholder:text-gray-400"
            />
            
            <button 
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-black hover:bg-gray-800 text-white rounded-lg transition disabled:opacity-20 flex items-center justify-center flex-shrink-0"
            >
              <Send size={13} />
            </button>
          </form>
          <p className="text-[10px] text-center text-gray-400 mt-2 font-medium">
            Loop can orchestrate external application scopes. Verify calendar intervals.
          </p>
        </div>

      </main>
    </div>
  );
}