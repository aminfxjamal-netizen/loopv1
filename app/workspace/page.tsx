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
  CheckCircle2,
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

// ================== SUPABASE CONFIG ==================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoopWorkspace() {
  const [currentPlan] = useState<UserPlan>('Free Trial');
  const [daysRemaining] = useState<number>(14);
  const [chatInput, setChatInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isGmailConnected, setIsGmailConnected] = useState<boolean>(false);
  const [isDriveConnected, setIsDriveConnected] = useState<boolean>(false);
  const [isCalendarConnected, setIsCalendarConnected] = useState<boolean>(false);

  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages + Real-time
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Supabase Error:', error);
        setInitialWelcome();
        return;
      }

      if (data?.length > 0) {
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

    const channel = supabase
      .channel('chats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chats' }, fetchMessages)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
    try {
      await supabase.from('chats').insert({
        role: message.role,
        content: message.content,
      });
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  };

  const handleConnectTool = (tool: 'gmail' | 'drive' | 'calendar') => {
    let toolName = '';
    if (tool === 'gmail' && !isGmailConnected) {
      setIsGmailConnected(true);
      toolName = 'Gmail Stream';
    } else if (tool === 'drive' && !isDriveConnected) {
      setIsDriveConnected(true);
      toolName = 'Google Drive Indexer';
    } else if (tool === 'calendar' && !isCalendarConnected) {
      setIsCalendarConnected(true);
      toolName = 'Google Calendar Core';
    } else return;

    const assistantMsg: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `⚡ **${toolName} Handshake Successful!** Your integration node is now fully authenticated and synchronized with the workspace. Ready to listen for automation loops.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, assistantMsg]);
    saveMessage(assistantMsg);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    await saveMessage(userMsg);

    setChatInput('');
    setIsLoading(true);

    setTimeout(async () => {
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `🤖 I've processed your request: "${userMsg.content}".\n\nAnalyzing workspace context... What would you like me to execute next?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, assistantMsg]);
      await saveMessage(assistantMsg);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="flex h-screen w-screen bg-[#FFFFFF] font-sans antialiased text-[#111827] overflow-hidden">
      {/* Sidebar - unchanged */}
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
            <button onClick={() => handleConnectTool('gmail')} className="w-full flex items-center justify-between px-2.5 py-1.5 text-sm rounded-md font-medium text-[#4B5563] hover:bg-[#F9FAFB] transition-colors">
              <div className="flex items-center space-x-2.5"><Mail className="h-4 w-4" /><span>Email</span></div>
              <span className={`h-2 w-2 rounded-full ${isGmailConnected ? 'bg-emerald-500' : 'bg-gray-300'}`} />
            </button>
            <button onClick={() => handleConnectTool('drive')} className="w-full flex items-center justify-between px-2.5 py-1.5 text-sm rounded-md font-medium text-[#4B5563] hover:bg-[#F9FAFB] transition-colors">
              <div className="flex items-center space-x-2.5"><HardDrive className="h-4 w-4" /><span>Google Drive</span></div>
              <span className={`h-2 w-2 rounded-full ${isDriveConnected ? 'bg-emerald-500' : 'bg-gray-300'}`} />
            </button>
            <button onClick={() => handleConnectTool('calendar')} className="w-full flex items-center justify-between px-2.5 py-1.5 text-sm rounded-md font-medium text-[#4B5563] hover:bg-[#F9FAFB] transition-colors">
              <div className="flex items-center space-x-2.5"><Calendar className="h-4 w-4" /><span>Calendar</span></div>
              <span className={`h-2 w-2 rounded-full ${isCalendarConnected ? 'bg-emerald-500' : 'bg-gray-300'}`} />
            </button>
          </nav>
        </div>

        {/* Billing */}
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
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full bg-[#FFFFFF] overflow-hidden relative">
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
                </div>

                {msg.role === 'user' && (
                  <div className="h-8 w-8 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-[#4B5563]" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex space-x-4">
                <div className="h-8 w-8 rounded-lg bg-[#2563EB] flex items-center justify-center shrink-0 shadow-sm shadow-[#2563EB]/20">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="bg-[#F3F4F6] rounded-2xl px-4 py-3 text-sm">Loop is thinking...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-6 pb-6 px-8 border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSendMessage} className="relative bg-white rounded-2xl border border-gray-200 shadow-sm focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage(e))}
                placeholder="Ask Loop to manage tools or coordinate background events..."
                className="w-full resize-none bg-transparent py-4 pl-4 pr-16 text-sm text-[#111827] placeholder-gray-400 focus:outline-none h-[52px]"
              />
              <div className="absolute right-3 bottom-2.5 flex items-center space-x-2">
                <button type="button" className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button 
                  type="submit" 
                  disabled={!chatInput.trim() || isLoading}
                  className={`p-1.5 rounded-lg transition-all ${chatInput.trim() ? 'bg-[#2563EB] text-white shadow-sm' : 'text-gray-300 bg-gray-50'}`}
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
            <p className="text-[11px] text-center text-gray-400 mt-2">
              Loop AI • Powered by Supabase
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}