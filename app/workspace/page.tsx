'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquareCode, 
  Mail, 
  HardDrive, 
  Calendar, 
  Settings, 
  Send, 
  Sparkles, 
  AlertCircle,
  ArrowUpRight,
  Paperclip,
  User
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

type UserPlan = 'Free Trial' | 'Basic' | 'Pro';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Groq
const groqApiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

export default function LoopWorkspace() {
  const [currentPlan] = useState<UserPlan>('Free Trial');
  const [daysRemaining] = useState(14);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isGmailConnected, setIsGmailConnected] = useState(false);
  const [isDriveConnected, setIsDriveConnected] = useState(false);
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);

  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('chats')
        .select('*')
        .order('created_at', { ascending: true });

      if (data && data.length > 0) {
        const loaded = data.map((m: any) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          timestamp: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));
        setChatMessages(loaded);
      } else {
        setInitialWelcome();
      }
    };

    fetchMessages();
  }, []);

  const setInitialWelcome = () => {
    setChatMessages([{
      id: 'init-onboarding',
      role: 'assistant',
      content: "Welcome to Loop! Your container is provisioned and ready for modern work.\n\nTo begin automating your background routines, let's connect your communication pathways. Are you ready to link your Gmail, Google Drive, and Google Calendar tools directly to this interface?",
      timestamp: 'Just now'
    }]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const saveMessage = async (message: Message) => {
    await supabase.from('chats').insert({
      role: message.role,
      content: message.content,
    });
  };

  const handleConnectTool = (tool: 'gmail' | 'drive' | 'calendar') => {
    let toolName = '';
    if (tool === 'gmail' && !isGmailConnected) { setIsGmailConnected(true); toolName = 'Gmail Stream'; }
    else if (tool === 'drive' && !isDriveConnected) { setIsDriveConnected(true); toolName = 'Google Drive Indexer'; }
    else if (tool === 'calendar' && !isCalendarConnected) { setIsCalendarConnected(true); toolName = 'Google Calendar Core'; }
    else return;

    const assistantMsg: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `⚡ **${toolName} Handshake Successful!** Your integration node is now fully authenticated and synchronized with the workspace.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, assistantMsg]);
    saveMessage(assistantMsg);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const userMessage = chatInput.trim();
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    await saveMessage(userMsg);

    setChatInput('');
    setIsLoading(true);

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: "You are Loop, a powerful AI workspace assistant. Be helpful, proactive and professional." },
            { role: "user", content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      const data = await res.json();
      const aiReply = data.choices?.[0]?.message?.content || "I couldn't process that request.";

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, assistantMsg]);
      await saveMessage(assistantMsg);

    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "⚠️ Groq API connection failed. Please check your API key and try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, errorMsg]);
      await saveMessage(errorMsg);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex h-screen w-screen bg-[#FFFFFF] font-sans antialiased text-[#111827] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#E5E7EB] flex flex-col justify-between bg-[#FFFFFF] p-4 shrink-0 select-none">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-2.5 px-2">
            <div className="h-6 w-6 rounded-md bg-[#2563EB] flex items-center justify-center">
              <span className="text-white text-xs font-black">L</span>
            </div>
            <span className="text-md font-semibold tracking-tight">Loop</span>
          </div>

          <nav className="space-y-1">
            <button className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 text-sm rounded-md font-medium bg-[#F3F4F6] text-[#2563EB]">
              <MessageSquareCode className="h-4 w-4" />
              <span>AI Chat</span>
            </button>
            <button onClick={() => handleConnectTool('gmail')} className="w-full flex items-center justify-between px-2.5 py-1.5 text-sm rounded-md font-medium text-[#4B5563] hover:bg-[#F9FAFB]">
              <div className="flex items-center space-x-2.5"><Mail className="h-4 w-4" /><span>Email</span></div>
              <span className={`h-2 w-2 rounded-full ${isGmailConnected ? 'bg-emerald-500' : 'bg-gray-300'}`} />
            </button>
            <button onClick={() => handleConnectTool('drive')} className="w-full flex items-center justify-between px-2.5 py-1.5 text-sm rounded-md font-medium text-[#4B5563] hover:bg-[#F9FAFB]">
              <div className="flex items-center space-x-2.5"><HardDrive className="h-4 w-4" /><span>Google Drive</span></div>
              <span className={`h-2 w-2 rounded-full ${isDriveConnected ? 'bg-emerald-500' : 'bg-gray-300'}`} />
            </button>
            <button onClick={() => handleConnectTool('calendar')} className="w-full flex items-center justify-between px-2.5 py-1.5 text-sm rounded-md font-medium text-[#4B5563] hover:bg-[#F9FAFB]">
              <div className="flex items-center space-x-2.5"><Calendar className="h-4 w-4" /><span>Calendar</span></div>
              <span className={`h-2 w-2 rounded-full ${isCalendarConnected ? 'bg-emerald-500' : 'bg-gray-300'}`} />
            </button>
          </nav>
        </div>

        <div className="mt-auto pt-4 border-t border-[#E5E7EB]">
          <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50">
            <div className="flex items-center space-x-2 text-amber-800">
              <AlertCircle className="h-4 w-4" />
              <span className="text-xs font-semibold">Trial Plan</span>
            </div>
            <p className="mt-1.5 text-xs text-amber-700">You have <span className="font-bold">{daysRemaining} days</span> remaining.</p>
          </div>
        </div>
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-8 space-y-6 pb-36">
          <div className="max-w-3xl mx-auto space-y-6">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="h-8 w-8 rounded-lg bg-[#2563EB] flex items-center justify-center mr-3">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className={`max-w-xl px-4 py-3 rounded-2xl text-sm ${
                  msg.role === 'user' ? 'bg-[#2563EB] text-white rounded-br-none' : 'bg-[#F3F4F6] rounded-bl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && <div className="flex items-center gap-3"><Sparkles className="h-4 w-4" /> Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent pt-8 pb-6 px-8 border-t">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSendMessage}>
              <div className="relative">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage(e))}
                  placeholder="Ask Loop anything..."
                  className="w-full resize-none bg-white border border-gray-200 rounded-2xl py-4 pl-5 pr-16 text-sm focus:outline-none focus:border-[#2563EB]"
                  rows={1}
                />
                <button 
                  type="submit" 
                  disabled={!chatInput.trim() || isLoading}
                  className="absolute right-3 bottom-3 p-2 bg-[#2563EB] text-white rounded-xl disabled:bg-gray-300"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}