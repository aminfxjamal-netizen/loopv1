"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Send, Settings, Plus, Lock,
  X, Mail, Calendar, HardDrive, Layers, Sparkles,
  Image, FolderOpen, Globe
} from 'lucide-react';
import Link from 'next/link';
import { useGmailCredentials } from '@/hooks/useGmailCredentials';

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

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      role: 'user',
      content: inputValue.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: userMessage.content }] })
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

      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: 'Sorry, something went wrong.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveDraft = async (message: Message) => {
    if (!message.recipient || !message.subject) return;
    setIsLoading(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: message.recipient,
          subject: message.subject,
          body: message.content,
          userId: 'current-user',
          gmailUser: credentials?.email || '',
          gmailAppPassword: credentials?.appPassword || ''
        })
      });

      const data = await response.json();

      setMessages(prev => [...prev, {
        id: Math.random().toString(36).substring(7),
        role: 'assistant',
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

  return (
    <div className="flex h-screen w-full bg-[#080808] text-white font-sans">
      {/* SIDEBAR */}
      <aside className="w-[240px] bg-[#0d0d0d] border-r border-white/5 flex flex-col h-full p-4 shrink-0">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white mb-6">Loop</Link>

        <button 
          onClick={() => { setMessages([]); }}
          className="flex items-center justify-center gap-2 border border-white/10 text-gray-300 bg-transparent rounded-xl py-2.5 px-4 text-sm font-medium hover:bg-white/5 transition-colors w-full"
        >
          <Plus size={16} />
          New Conversation
        </button>

        <div className="text-gray-500 uppercase text-xs tracking-wide font-semibold mt-6 mb-2">Main</div>
        <nav className="space-y-1">
          <div className="flex items-center w-full text-left py-2 px-3 bg-white/5 rounded-lg text-sm font-medium text-white">AI Chat</div>
          <div className="flex items-center justify-between py-2 px-3 text-sm font-medium text-gray-500"><span>Email</span><span className="bg-white/5 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">Soon</span></div>
          <div className="flex items-center justify-between py-2 px-3 text-sm font-medium text-gray-500"><span>Calendar</span><span className="bg-white/5 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">Soon</span></div>
          <div className="flex items-center justify-between py-2 px-3 text-sm font-medium text-gray-500"><span>Files</span><span className="bg-white/5 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">Soon</span></div>
        </nav>

        <div className="text-gray-500 uppercase text-xs tracking-wide font-semibold mt-6 mb-2">Recent</div>
        <div className="flex-1 overflow-y-auto">
          <div className="text-gray-600 text-sm italic px-3 py-1">No conversations yet</div>
        </div>

        <div className="border-t border-white/5 pt-4 mt-auto space-y-4">
          <button className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-300 transition-colors w-full text-left px-3">
            <Settings size={16} /> Settings
          </button>
          <div className="flex items-center gap-3 px-3">
            <div className="h-8 w-8 rounded-full bg-blue-500 text-white text-xs font-semibold flex items-center justify-center shrink-0">U</div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-white truncate">User</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col h-full relative">
        {/* TOP BAR */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button 
            onClick={() => setShowConnectedApps(true)}
            className="flex items-center gap-2 border border-white/10 text-gray-400 text-sm px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
          >
            <Layers size={14} /> Connected Apps
          </button>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto my-auto">
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                <Sparkles size={24} className="text-blue-400" />
              </div>
              <h1 className="text-3xl font-semibold text-white tracking-tight">What do you want to get done?</h1>
              <p className="text-gray-400 text-sm mt-2">Tell Loop what you need in plain language. It will handle the rest.</p>

              <div className="flex flex-wrap gap-3 mt-8 justify-center">
                <button onClick={() => setInputValue("Draft a client update email")} className="bg-white/5 text-gray-300 text-sm px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors border border-white/5">Draft a client update email</button>
                <button onClick={() => setInputValue("Schedule a meeting")} className="bg-white/5 text-gray-300 text-sm px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors border border-white/5">Schedule a meeting</button>
                <button onClick={() => setInputValue("Summarize my files")} className="bg-white/5 text-gray-300 text-sm px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors border border-white/5">Summarize my files</button>
              </div>

              <div className="text-gray-600 text-xs mt-8 flex items-center gap-1.5">
                <Lock size={12} /> Loop will always ask for your approval before taking any action.
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-3xl w-full mx-auto pb-32">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.isDraft ? (
                    <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-5 max-w-[85%] w-full">
                      <div className="flex items-center gap-2 mb-3">
                        <Mail size={16} className="text-blue-400" />
                        <span className="text-xs font-medium text-blue-400 uppercase tracking-wide">Draft Email</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-1">From: {msg.sender || "Not connected"}</div>
                      <div className="text-xs text-gray-500 mb-1">To: {msg.recipient}</div>
                      <div className="text-sm font-semibold text-white mb-3">{msg.subject}</div>
                      <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed border-l-2 border-white/10 pl-4">{msg.content}</div>
                      <div className="flex gap-2 mt-5">
                        <button onClick={() => handleApproveDraft(msg)} disabled={isLoading} className="bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-blue-600 transition disabled:opacity-50">
                          {isLoading ? 'Sending...' : 'Approve & Send'}
                        </button>
                        <button className="bg-white/5 text-gray-300 text-sm px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Edit</button>
                        <button className="text-gray-500 text-sm px-4 py-2.5 hover:text-gray-300 transition ml-auto">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-[#0d0d0d] border border-white/5 text-gray-200'}`}>
                      {msg.content}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex w-full justify-start">
                  <div className="bg-[#0d0d0d] border border-white/5 text-gray-500 rounded-2xl px-5 py-3 text-sm flex items-center gap-2">
                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse"></span> Thinking...
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* INPUT BAR */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#080808] border-t border-white/5 p-4 pb-6">
          <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
            <div className="flex items-start gap-3 bg-[#0d0d0d] border border-white/10 rounded-2xl p-3 focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
              {/* PLUS BUTTON WITH MENU */}
              <div className="relative" ref={plusMenuRef}>
                <button 
                  type="button" 
                  onClick={() => setShowPlusMenu(!showPlusMenu)}
                  className="text-gray-500 hover:text-gray-300 p-2 shrink-0 mt-0.5 transition-colors"
                >
                  <Plus size={20} />
                </button>
                {showPlusMenu && (
                  <div className="absolute bottom-full left-0 mb-2 w-64 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                    <button 
                      onClick={() => { setShowPlusMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 transition-colors text-left"
                    >
                      <Image size={16} className="text-blue-400" />
                      <div>
                        <div className="font-medium">Upload Image</div>
                        <div className="text-xs text-gray-500">Attach an image from your device</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => { setShowPlusMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 transition-colors text-left border-t border-white/5"
                    >
                      <FolderOpen size={16} className="text-yellow-400" />
                      <div>
                        <div className="font-medium">Link Drive</div>
                        <div className="text-xs text-gray-500">Give Loop access to Google Drive & files</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
              
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                placeholder="Tell Loop what you need..."
                disabled={isLoading}
                rows={2}
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm resize-none disabled:opacity-50 min-h-[48px]"
              />
              <button type="submit" disabled={!inputValue.trim() || isLoading} className="bg-white text-black p-2.5 rounded-xl font-medium text-sm flex items-center gap-1.5 disabled:opacity-30 transition-opacity shrink-0 hover:bg-gray-200 self-end">
                <Send size={14} />
              </button>
            </div>
            <p className="text-center text-xs text-gray-600 mt-3">Press Enter to send • Shift + Enter for new line</p>
          </form>
        </div>

        {/* CONNECTED APPS PANEL */}
        {showConnectedApps && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowConnectedApps(false)} />}
        <div className={`fixed right-0 top-0 h-full w-[320px] bg-[#0d0d0d] border-l border-white/5 z-50 p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out ${showConnectedApps ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-semibold text-white">Connected Apps</h2>
            <button onClick={() => setShowConnectedApps(false)} className="text-gray-500 hover:text-white transition-colors"><X size={20} /></button>
          </div>
          <p className="text-sm text-gray-500 mb-6">Manage your integrations</p>

          <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-4">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-red-400" />
              <span className="text-white font-medium text-sm">Gmail</span>
              <span className={`h-2 w-2 rounded-full ml-auto ${isConfigured ? 'bg-green-500' : 'bg-gray-600'}`}></span>
            </div>
            <p className="text-xs text-gray-500 mt-2">{isConfigured ? `Connected as ${credentials?.email}` : 'Send emails and track follow-ups.'}</p>
            {isConfigured ? (
              <div className="flex gap-2 mt-3">
                <button onClick={() => setShowGmailForm(!showGmailForm)} className="bg-white/10 text-gray-300 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/20 transition">Change</button>
                <button onClick={removeCredentials} className="text-red-400 text-sm px-3 py-1.5 hover:text-red-300 transition">Disconnect</button>
              </div>
            ) : (
              <button onClick={() => setShowGmailForm(!showGmailForm)} className="bg-blue-500 text-white text-sm font-medium px-4 py-1.5 rounded-lg mt-3 hover:bg-blue-600 transition">Connect</button>
            )}
            {showGmailForm && (
              <div className="mt-3 space-y-2">
                <input type="email" value={gmailEmail} onChange={(e) => setGmailEmail(e.target.value)} placeholder="Your Gmail address" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-blue-500" />
                <input type="password" value={gmailPassword} onChange={(e) => setGmailPassword(e.target.value)} placeholder="App Password" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-blue-500" />
                <button onClick={handleConnectGmail} disabled={!gmailEmail || !gmailPassword} className="w-full bg-blue-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50">Save & Connect</button>
              </div>
            )}
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-4 opacity-50">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-blue-400" />
              <span className="text-gray-500 font-medium text-sm">Calendar</span>
              <span className="bg-white/5 text-gray-600 text-[10px] px-2 py-0.5 rounded-full ml-auto">Soon</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">Schedule meetings and manage your calendar.</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-4 opacity-50">
            <div className="flex items-center gap-2">
              <HardDrive size={18} className="text-yellow-400" />
              <span className="text-gray-500 font-medium text-sm">Drive</span>
              <span className="bg-white/5 text-gray-600 text-[10px] px-2 py-0.5 rounded-full ml-auto">Soon</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">Access and summarize your files.</p>
          </div>
        </div>
      </main>
    </div>
  );
}