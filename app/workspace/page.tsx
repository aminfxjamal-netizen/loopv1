"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Send, Settings, Plus, Lock,
  X, Mail, Calendar, HardDrive, Layers, Sparkles,
  Image, FolderOpen, Menu, Paperclip
} from 'lucide-react';
import Link from 'next/link';
import { useGmailCredentials } from '@/hooks/useGmailCredentials';
import { getConversations, getMessages, createConversation, saveMessage } from '@/lib/chat-service';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isDraft?: boolean;
  recipient?: string;
  sender?: string;
  subject?: string;
}

export default function Workspace() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showConnectedApps, setShowConnectedApps] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showGmailForm, setShowGmailForm] = useState(false);
  const [gmailEmail, setGmailEmail] = useState('');
  const [gmailPassword, setGmailPassword] = useState('');
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const plusMenuRef = useRef<HTMLDivElement>(null);

  const { credentials, isConfigured, saveCredentials, removeCredentials } = useGmailCredentials();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setShowConnectedApps(false); setShowPlusMenu(false); }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (plusMenuRef.current && !plusMenuRef.current.contains(e.target as Node)) {
        setShowPlusMenu(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const initUser = async () => {
      const userData = localStorage.getItem('loop_user_data');
      if (!userData) return;
      const parsed = JSON.parse(userData);
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', parsed.email)
        .single();
      if (existingUser) {
        setUserId(existingUser.id);
        const convs = await getConversations(existingUser.id);
        setConversations(convs || []);
      }
    };
    initUser();
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [inputValue]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading || !userId) return;

    const userContent = inputValue.trim();
    const userMessage: Message = { id: Math.random().toString(36).substring(7), role: 'user', content: userContent };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      let convId: string | null = activeConversationId;
      if (!convId) {
        const conv = await createConversation(userId, userContent.substring(0, 60));
        convId = conv.id;
        setActiveConversationId(convId);
        const convs = await getConversations(userId);
        setConversations(convs || []);
      }

    if (!convId) throw new Error("No conversation ID");
await saveMessage(convId, 'user', userContent);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: userContent }] })
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();

      const assistantMessage: Message = {
        id: Math.random().toString(36).substring(7),
        role: 'assistant',
        content: data.content || 'I received your message.',
        isDraft: data.isDraft || false,
        recipient: data.recipient || '',
        sender: data.sender || (credentials?.email || 'Not connected'),
        subject: data.subject || ''
      };

      await saveMessage(convId, 'assistant', assistantMessage.content, assistantMessage.isDraft || false, assistantMessage.recipient || '', assistantMessage.subject || '');

      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: 'Sorry, something went wrong.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadConversation = async (convId: string) => {
    setActiveConversationId(convId);
    setSidebarOpen(false);
    const msgs = await getMessages(convId);
    setMessages((msgs || []).map((m: any) => ({
      id: m.id, role: m.role, content: m.content,
      isDraft: m.is_draft, recipient: m.recipient || '', subject: m.subject || ''
    })));
  };

  const handleApproveDraft = async (message: Message) => {
    if (!message.recipient || !message.subject) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: message.recipient, subject: message.subject, body: message.content,
          userId: userId || 'current-user',
          gmailUser: credentials?.email || '',
          gmailAppPassword: credentials?.appPassword || ''
        })
      });
      const data = await response.json();
      setMessages(prev => [...prev, {
        id: Math.random().toString(36).substring(7), role: 'assistant',
        content: data.success
          ? `✅ Email sent from ${data.from} to ${message.recipient}. ${data.remaining} messages remaining today.`
          : `❌ Failed to send: ${data.error || 'Unknown error'}`
      }]);
    } catch {
      setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: '❌ Failed to send email.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectGmail = () => {
    if (gmailEmail && gmailPassword) {
      saveCredentials(gmailEmail, gmailPassword);
      setGmailEmail('');
      setGmailPassword('');
      setShowGmailForm(false);
    }
  };

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  return (
    <div className="flex h-screen w-full bg-[#F1F5F9] text-[#1E293B] font-sans">
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* SIDEBAR */}
      <aside className={`fixed md:relative z-50 w-[240px] bg-[#E2E8F0] border-r border-[#CBD5E1] flex flex-col h-full p-4 shrink-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <Link href="/" className="flex items-center gap-2 mb-6">
          <img src="/logo.png?v=1" alt="Loop" className="h-7 w-auto" />
          <span className="text-lg font-bold text-[#1E293B]">Loop</span>
        </Link>

        <button 
          onClick={() => { setMessages([]); setActiveConversationId(null); setSidebarOpen(false); }}
          className="flex items-center justify-center gap-2 border border-[#CBD5E1] text-[#1E293B] bg-white rounded-xl py-2.5 px-4 text-sm font-medium hover:bg-gray-50 transition-colors w-full"
        >
          <Plus size={16} /> New Chat
        </button>

        <div className="text-[#64748B] uppercase text-xs tracking-wide font-semibold mt-6 mb-2">Recent</div>
        <div className="flex-1 overflow-y-auto space-y-1">
          {conversations.length === 0 ? (
            <div className="text-[#94A3B8] text-sm italic px-3 py-1">No conversations yet</div>
          ) : (
            conversations.map((conv: any) => (
              <button
                key={conv.id}
                onClick={() => loadConversation(conv.id)}
                className={`w-full text-left py-2 px-3 text-sm rounded-lg transition-colors truncate ${
                  activeConversationId === conv.id ? 'bg-white shadow-sm text-[#1E293B] font-medium' : 'text-[#475569] hover:bg-white/50'
                }`}
              >
                <MessageSquare size={14} className="inline mr-2 text-[#94A3B8]" />
                {conv.title}
              </button>
            ))
          )}
        </div>

        <div className="border-t border-[#CBD5E1] pt-4 mt-auto">
          <button onClick={() => setShowConnectedApps(true)} className="flex items-center gap-2 text-[#475569] text-sm hover:text-[#1E293B] transition-colors w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/50">
            <Layers size={16} /> Connected Apps
          </button>
          <div className="flex items-center gap-3 px-3 mt-3">
            <div className="h-8 w-8 rounded-full bg-[#2563EB] text-white text-xs font-semibold flex items-center justify-center shrink-0">U</div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-[#1E293B] truncate">User</span>
              <span className="text-xs text-[#64748B]">Free Trial</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col h-full relative min-w-0">
        <header className="flex items-center justify-between px-4 py-3 border-b border-[#CBD5E1] bg-white shrink-0">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-[#475569] hover:text-[#1E293B]" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <h1 className="text-sm font-medium text-[#1E293B] truncate">
              {activeConversation ? activeConversation.title : 'New Conversation'}
            </h1>
          </div>
          <button className="text-[#94A3B8] hover:text-[#1E293B] transition-colors">
            <Settings size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto h-full px-4 py-16">
              <div className="h-12 w-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center mb-6">
                <Sparkles size={24} className="text-[#2563EB]" />
              </div>
              <h1 className="text-2xl font-semibold text-[#1E293B] tracking-tight">What do you want to get done?</h1>
              <p className="text-[#64748B] text-sm mt-2">Tell Loop what you need in plain language. It will handle the rest.</p>
              <div className="flex flex-wrap gap-3 mt-8 justify-center">
                <button onClick={() => setInputValue("Draft a client update email")} className="bg-white border border-[#CBD5E1] text-[#1E293B] text-sm px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">Draft a client update email</button>
                <button onClick={() => setInputValue("Schedule a meeting")} className="bg-white border border-[#CBD5E1] text-[#1E293B] text-sm px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">Schedule a meeting</button>
                <button onClick={() => setInputValue("Summarize my files")} className="bg-white border border-[#CBD5E1] text-[#1E293B] text-sm px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">Summarize my files</button>
              </div>
              <div className="text-[#94A3B8] text-xs mt-8 flex items-center gap-1.5">
                <Lock size={12} /> Loop will always ask for your approval before taking any action.
              </div>
            </div>
          ) : (
            <div className="max-w-[680px] mx-auto px-4 py-8 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start gap-3'}`}>
                  {msg.role === 'assistant' && !msg.isDraft && (
                    <div className="h-7 w-7 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0 mt-1">
                      <Sparkles size={14} className="text-white" />
                    </div>
                  )}
                  {msg.isDraft ? (
                    <div className="bg-white border border-[#CBD5E1] rounded-2xl p-5 shadow-sm max-w-[85%] w-full">
                      <div className="flex items-center gap-2 mb-3">
                        <Mail size={16} className="text-[#2563EB]" />
                        <span className="text-xs font-medium text-[#2563EB] uppercase tracking-wide">Draft Email</span>
                      </div>
                      <div className="text-xs text-[#64748B] mb-1">From: {msg.sender || "Not connected"}</div>
                      <div className="text-xs text-[#64748B] mb-1">To: {msg.recipient}</div>
                      <div className="text-sm font-semibold text-[#1E293B] mb-3">{msg.subject}</div>
                      <div className="text-sm text-[#475569] whitespace-pre-wrap leading-relaxed border-l-2 border-[#CBD5E1] pl-4">{msg.content}</div>
                      <div className="flex gap-2 mt-5">
                        <button onClick={() => handleApproveDraft(msg)} disabled={isLoading} className="bg-[#2563EB] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-blue-700 transition disabled:opacity-50">Approve & Send</button>
                        <button className="bg-[#F1F5F9] text-[#475569] text-sm px-4 py-2.5 rounded-xl hover:bg-[#E2E8F0] transition">Edit</button>
                        <button className="text-[#94A3B8] text-sm px-4 py-2.5 hover:text-[#475569] transition ml-auto">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#2563EB] text-white' : 'bg-white text-[#1E293B] shadow-sm border border-[#CBD5E1]'}`}>
                      {msg.content}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex w-full justify-start gap-3">
                  <div className="h-7 w-7 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0">
                    <Sparkles size={14} className="text-white" />
                  </div>
                  <div className="bg-white border border-[#CBD5E1] text-[#94A3B8] rounded-2xl px-5 py-3 text-sm shadow-sm">Thinking...</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* INPUT BAR */}
        <div className="bg-[#F1F5F9] border-t border-[#CBD5E1] p-4">
          <form onSubmit={handleSendMessage} className="max-w-[680px] mx-auto">
            <div className="flex items-end gap-3 bg-white border border-[#CBD5E1] rounded-2xl p-3 shadow-sm focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/20 transition-all">
              <div className="relative" ref={plusMenuRef}>
                <button type="button" onClick={() => setShowPlusMenu(!showPlusMenu)} className="text-[#94A3B8] hover:text-[#475569] p-2 shrink-0 transition-colors">
                  <Paperclip size={18} />
                </button>
                {showPlusMenu && (
                  <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-[#CBD5E1] rounded-xl shadow-lg overflow-hidden z-50">
                    <button onClick={() => setShowPlusMenu(false)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#1E293B] hover:bg-[#F1F5F9] transition-colors text-left">
                      <Image size={16} className="text-[#2563EB]" />
                      <div><div className="font-medium">Upload Image</div><div className="text-xs text-[#64748B]">Attach an image from your device</div></div>
                    </button>
                    <button onClick={() => setShowPlusMenu(false)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#1E293B] hover:bg-[#F1F5F9] transition-colors text-left border-t border-[#CBD5E1]">
                      <FolderOpen size={16} className="text-[#2563EB]" />
                      <div><div className="font-medium">Link Drive</div><div className="text-xs text-[#64748B]">Give Loop access to Google Drive & files</div></div>
                    </button>
                  </div>
                )}
              </div>
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                placeholder="Tell Loop what you need..."
                disabled={isLoading}
                rows={1}
                className="flex-1 bg-transparent text-[#1E293B] placeholder-[#94A3B8] outline-none text-sm resize-none disabled:opacity-50 py-2"
              />
              <button type="submit" disabled={!inputValue.trim() || isLoading} className="bg-[#2563EB] text-white p-2.5 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 shrink-0">
                <Send size={16} />
              </button>
            </div>
            <p className="text-center text-xs text-[#94A3B8] mt-3">Press Enter to send • Shift + Enter for new line</p>
          </form>
        </div>

        {/* CONNECTED APPS PANEL */}
        {showConnectedApps && <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setShowConnectedApps(false)} />}
        <div className={`fixed right-0 top-0 h-full w-[320px] bg-white border-l border-[#CBD5E1] z-50 p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out shadow-xl ${showConnectedApps ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-semibold text-[#1E293B]">Connected Apps</h2>
            <button onClick={() => setShowConnectedApps(false)} className="text-[#94A3B8] hover:text-[#1E293B]"><X size={20} /></button>
          </div>
          <p className="text-sm text-[#64748B] mb-6">Manage your integrations</p>
          <div className="bg-[#F1F5F9] rounded-xl p-4 border border-[#CBD5E1] mb-4">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-red-500" />
              <span className="text-[#1E293B] font-medium text-sm">Gmail</span>
              <span className={`h-2 w-2 rounded-full ml-auto ${isConfigured ? 'bg-green-500' : 'bg-[#CBD5E1]'}`}></span>
            </div>
            <p className="text-xs text-[#64748B] mt-2">{isConfigured ? `Connected as ${credentials?.email}` : 'Send emails and track follow-ups.'}</p>
            {isConfigured ? (
              <div className="flex gap-2 mt-3">
                <button onClick={() => setShowGmailForm(!showGmailForm)} className="bg-white border border-[#CBD5E1] text-[#475569] text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50">Change</button>
                <button onClick={removeCredentials} className="text-red-500 text-sm px-3 py-1.5 hover:text-red-600">Disconnect</button>
              </div>
            ) : (
              <button onClick={() => setShowGmailForm(!showGmailForm)} className="bg-[#2563EB] text-white text-sm font-medium px-4 py-1.5 rounded-lg mt-3 hover:bg-blue-700">Connect</button>
            )}
            {showGmailForm && (
              <div className="mt-3 space-y-2">
                <input type="email" value={gmailEmail} onChange={(e) => setGmailEmail(e.target.value)} placeholder="Your Gmail address" className="w-full bg-white border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2563EB]" />
                <input type="password" value={gmailPassword} onChange={(e) => setGmailPassword(e.target.value)} placeholder="App Password" className="w-full bg-white border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2563EB]" />
                <button onClick={handleConnectGmail} disabled={!gmailEmail || !gmailPassword} className="w-full bg-[#2563EB] text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">Save & Connect</button>
              </div>
            )}
          </div>
          <div className="bg-[#F1F5F9] rounded-xl p-4 border border-[#CBD5E1] mb-4 opacity-50">
            <div className="flex items-center gap-2"><Calendar size={18} className="text-[#2563EB]" /><span className="text-[#64748B] font-medium text-sm">Calendar</span><span className="bg-[#E2E8F0] text-[#64748B] text-[10px] px-2 py-0.5 rounded-full ml-auto">Soon</span></div>
            <p className="text-xs text-[#94A3B8] mt-2">Schedule meetings and manage your calendar.</p>
          </div>
          <div className="bg-[#F1F5F9] rounded-xl p-4 border border-[#CBD5E1] mb-4 opacity-50">
            <div className="flex items-center gap-2"><HardDrive size={18} className="text-yellow-500" /><span className="text-[#64748B] font-medium text-sm">Drive</span><span className="bg-[#E2E8F0] text-[#64748B] text-[10px] px-2 py-0.5 rounded-full ml-auto">Soon</span></div>
            <p className="text-xs text-[#94A3B8] mt-2">Access and summarize your files.</p>
          </div>
        </div>
      </main>
    </div>
  );
}