"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Send, Settings, Plus,
  X, Mail, HardDrive, Layers,
  FolderOpen, Upload, Menu, Clock, FileText
} from 'lucide-react';
import Link from 'next/link';
import { useGmailCredentials } from '@/hooks/useGmailCredentials';
import { getConversations, getMessages, createConversation, saveMessage } from '@/lib/chat-service';
import { supabase } from '@/lib/supabase';
import { addFollowUp, getDueFollowUps, markFollowUpComplete } from '@/lib/followup-service';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isDraft?: boolean;
  recipient?: string;
  sender?: string;
  subject?: string;
  isExpenseScan?: boolean;
  months?: string;
  isFileSummary?: boolean;
  fileName?: string;
  isFollowUpPrompt?: boolean;
  followUpId?: string;
  followUpRecipient?: string;
  followUpSubject?: string;
}

function getUserPlan(): string {
  const user = localStorage.getItem('loop_user');
  if (user) { try { return JSON.parse(user).plan || 'trial'; } catch {} }
  return 'trial';
}

function getLimitResetHours(): number {
  const plan = getUserPlan();
  if (plan === 'business') return 2;
  if (plan === 'pro') return 3;
  return 24;
}

function getHourKey(): string {
  const now = new Date();
  const hours = getLimitResetHours();
  const block = Math.floor(now.getHours() / hours);
  return `${now.toISOString().split('T')[0]}-block${block}`;
}

function getMessageCount(): number {
  return parseInt(localStorage.getItem(`loop_msg_count_${getHourKey()}`) || '0', 10);
}

function incrementMessageCount(): number {
  const key = `loop_msg_count_${getHourKey()}`;
  const next = getMessageCount() + 1;
  localStorage.setItem(key, next.toString());
  return next;
}

function getMessageLimit(): number {
  const plan = getUserPlan();
  if (plan === 'business') return 70;
  if (plan === 'pro') return 40;
  return 25;
}

function isOverLimit(): boolean { return getMessageCount() >= getMessageLimit(); }

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
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('');
  const [showFollowUpOptions, setShowFollowUpOptions] = useState(false);
  const [pendingFollowUp, setPendingFollowUp] = useState<{recipient: string; subject: string} | null>(null);
  const [customDate, setCustomDate] = useState('');
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [lastUploadedFile, setLastUploadedFile] = useState<{name: string, content: string} | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const plusMenuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { credentials, isConfigured, saveCredentials, removeCredentials } = useGmailCredentials();

  useEffect(() => {
    const stored = localStorage.getItem('loop_user_data');
    if (stored) { try { const p = JSON.parse(stored); if (p.name) setUserName(p.name); if (p.email) setUserEmail(p.email); } catch {} }
  }, []);

  useEffect(() => {
    const initUser = async () => {
      if (!userEmail) return;
      try {
        let { data: existingUser } = await supabase.from('users').select('id').eq('email', userEmail).single();
        if (!existingUser) {
          const stored = localStorage.getItem('loop_user_data'); if (!stored) return;
          const parsed = JSON.parse(stored);
          const { data: newUser } = await supabase.from('users').insert([{ name: parsed.name || 'User', email: userEmail, password: parsed.password || '', plan: 'trial', trial_start: new Date().toISOString(), trial_end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() }]).select('id').single();
          if (newUser) { setUserId(newUser.id); const convs = await getConversations(newUser.id); setConversations(convs || []); }
        } else { setUserId(existingUser.id); const convs = await getConversations(existingUser.id); setConversations(convs || []); }
      } catch {}
    };
    initUser();
  }, [userEmail]);

  useEffect(() => {
    const dueFollowUps = getDueFollowUps();
    if (dueFollowUps.length > 0 && userId) {
      setMessages(prev => [...dueFollowUps.map(f => ({ id: Math.random().toString(36).substring(7), role: 'assistant' as const, content: `${f.recipientEmail} has not replied to your email about "${f.subject}". Would you like me to send a follow-up?`, isFollowUpPrompt: true, followUpId: f.id, followUpRecipient: f.recipientEmail, followUpSubject: f.subject })), ...prev]);
    }
  }, [userId]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setShowConnectedApps(false); setShowPlusMenu(false); } };
    const handleClickOutside = (e: MouseEvent) => { if (plusMenuRef.current && !plusMenuRef.current.contains(e.target as Node)) setShowPlusMenu(false); };
    window.addEventListener('keydown', handleEsc); document.addEventListener('mousedown', handleClickOutside);
    return () => { window.removeEventListener('keydown', handleEsc); document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  useEffect(() => { if (textareaRef.current) { textareaRef.current.style.height = 'auto'; textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px'; } }, [inputValue]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setShowPlusMenu(false);
    setIsLoading(true);
    setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'user', content: `Uploaded: ${file.name}` }]);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/summarize', { method: 'POST', body: formData });
      const data = await response.json();

      if (data.success) {
        setLastUploadedFile({ name: file.name, content: data.summary });
        setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: data.summary, isFileSummary: true, fileName: file.name }]);
      } else {
        setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: `Could not summarize the file: ${data.error}` }]);
      }
    } catch {
      setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: 'Failed to process the file.' }]);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    if (isOverLimit()) { setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: `Limit reached. Resets in ${getLimitResetHours()} hours.` }]); setInputValue(''); return; }
    const userContent = inputValue.trim();
    setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'user', content: userContent }]);
    setInputValue(''); setIsLoading(true); incrementMessageCount();

    // If user is asking about the last uploaded file
    if (lastUploadedFile && (userContent.toLowerCase().includes('file') || userContent.toLowerCase().includes('document') || userContent.toLowerCase().includes('summary'))) {
      try {
        const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: { "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: "You are Loop. Answer questions about the uploaded file based on its content. Be concise and helpful. No markdown." },
              { role: "user", content: `File name: ${lastUploadedFile.name}\nFile content: ${lastUploadedFile.content}\n\nUser question: ${userContent}` }
            ],
            temperature: 0.7, max_tokens: 1024
          })
        });
        const data = await groqResponse.json();
        setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: data.choices[0].message.content }]);
      } catch {
        setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: 'Could not answer that question.' }]);
      } finally { setIsLoading(false); }
      return;
    }

    try {
      let convId = activeConversationId;
      if (userId && !convId) { try { const conv = await createConversation(userId, userContent.substring(0, 60)); convId = conv.id; setActiveConversationId(convId); setConversations(await getConversations(userId) || []); } catch {} }
      if (convId && userId) { try { await saveMessage(convId, 'user', userContent); } catch {} }
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: userContent }] }) });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      const am: Message = { id: Math.random().toString(36).substring(7), role: 'assistant', content: data.content || '', isDraft: data.isDraft || false, isExpenseScan: data.isExpenseScan || false, months: data.months || '', recipient: data.recipient || '', sender: credentials?.email || 'Not connected', subject: data.subject || '' };
      if (convId && userId) { try { await saveMessage(convId, 'assistant', am.content, am.isDraft || false, am.recipient || '', am.subject || ''); } catch {} }
      setMessages(prev => [...prev, am]);
    } catch { setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: 'Something went wrong. Please try again.' }]); }
    finally { setIsLoading(false); }
  };

  const loadConversation = async (convId: string) => { setActiveConversationId(convId); setSidebarOpen(false); try { const msgs = await getMessages(convId); setMessages((msgs || []).map((m: any) => ({ id: m.id, role: m.role, content: m.content, isDraft: m.is_draft, recipient: m.recipient || '', subject: m.subject || '' }))); } catch {} };

  const handleApproveDraft = async (message: Message) => {
    if (!message.recipient || !message.subject) return;
    if (isOverLimit()) { setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: `Limit reached. Resets in ${getLimitResetHours()} hours.` }]); return; }
    setIsLoading(true); incrementMessageCount();
    try {
      const response = await fetch('/api/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to: message.recipient, subject: message.subject, body: message.content, userId: userId || 'test-user', gmailUser: credentials?.email || '', gmailAppPassword: credentials?.appPassword || '' }) });
      const data = await response.json();
      if (data.success) { setPendingFollowUp({ recipient: message.recipient, subject: message.subject }); setShowFollowUpOptions(true); setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: `Email sent to ${message.recipient}. When should I follow up if there is no reply?` }]); }
      else { setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: `Failed to send: ${data.error || 'Unknown error'}` }]); }
    } catch { setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: 'Failed to send email.' }]); }
    finally { setIsLoading(false); }
  };

  const scheduleFollowUp = (minutes: number) => {
    if (!pendingFollowUp) return;
    const uid = userId || 'local-user';
    const fud = new Date(Date.now() + minutes * 60 * 1000);
    addFollowUp({ userId: uid, recipientEmail: pendingFollowUp.recipient, subject: pendingFollowUp.subject, sentDate: new Date().toISOString(), followUpDate: fud.toISOString(), status: 'pending' });
    const label = minutes <= 30 ? `${minutes} minutes` : minutes < 1440 ? 'later today' : minutes < 2880 ? 'tomorrow' : `in ${Math.round(minutes/1440)} days`;
    setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: `Got it. I will follow up ${label} if there is no reply.` }]);
    setShowFollowUpOptions(false); setPendingFollowUp(null); setShowCustomDate(false);
  };

  const scheduleCustomFollowUp = () => {
    if (!pendingFollowUp || !customDate) return;
    const fud = new Date(customDate);
    const minutes = Math.round((fud.getTime() - Date.now()) / (60 * 1000));
    if (minutes <= 0) { setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: 'Please select a future date and time.' }]); return; }
    scheduleFollowUp(minutes);
  };

  const handleSendFollowUp = async (recipient: string, subject: string, followUpId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: `Draft a follow-up email to ${recipient} about "${subject}". No reply received. Keep it polite and brief.` }] }) });
      const data = await response.json();
      markFollowUpComplete(followUpId);
      let body = data.content || '', ds = `Re: ${subject}`;
      const sm = body.match(/^Subject:\s*(.+)$/m); if (sm) ds = sm[1].trim();
      body = body.replace(/^To:.*\n?/, '').replace(/^Subject:.*\n?/, '').trim();
      setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: body, isDraft: true, recipient, sender: credentials?.email || 'Not connected', subject: ds }]);
    } catch { setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role: 'assistant', content: 'Failed to draft follow-up.' }]); }
    finally { setIsLoading(false); }
  };

  const skipFollowUp = (followUpId: string) => { markFollowUpComplete(followUpId); setMessages(prev => prev.filter(m => m.followUpId !== followUpId)); };
  const handleConnectGmail = () => { if (gmailEmail && gmailPassword) { saveCredentials(gmailEmail, gmailPassword); setGmailEmail(''); setGmailPassword(''); setShowGmailForm(false); } };
  const activeConversation = conversations.find(c => c.id === activeConversationId);

  return (
    <div className="flex h-screen w-full bg-[#080808] text-white font-sans">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed md:relative z-50 w-[240px] bg-[#0d0d0d] border-r border-white/5 flex flex-col h-full p-4 shrink-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <Link href="/" className="flex items-center gap-2 mb-6"><img src="/logo.png?v=3" alt="Loop" className="h-7 w-auto" /></Link>
        <button onClick={() => { setMessages([]); setActiveConversationId(null); setLastUploadedFile(null); setSidebarOpen(false); }} className="flex items-center justify-center gap-2 border border-white/10 text-gray-300 bg-transparent rounded-xl py-2.5 px-4 text-sm font-medium hover:bg-white/5 transition-colors w-full"><Plus size={16} /> New Chat</button>
        <div className="text-gray-500 uppercase text-xs tracking-wide font-semibold mt-6 mb-2">Recent</div>
        <div className="flex-1 overflow-y-auto space-y-1">
          {conversations.length === 0 ? <div className="text-gray-600 text-sm italic px-3 py-1">No conversations yet</div> : conversations.map((conv: any) => (
            <button key={conv.id} onClick={() => loadConversation(conv.id)} className={`w-full text-left py-2 px-3 text-sm rounded-lg transition-colors truncate ${activeConversationId === conv.id ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-gray-300'}`}><MessageSquare size={14} className="inline mr-2 text-gray-500" />{conv.title}</button>
          ))}
        </div>
        <div className="border-t border-white/5 pt-4 mt-auto space-y-1">
          <button onClick={() => setShowConnectedApps(true)} className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-300 transition-colors w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/5"><Layers size={16} /> Connected Apps</button>
          <button className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-300 transition-colors w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/5"><Settings size={16} /> Settings</button>
          <div className="flex items-center gap-3 px-3 pt-3"><div className="h-8 w-8 rounded-full bg-blue-500 text-white text-xs font-semibold flex items-center justify-center shrink-0">{userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}</div><div className="flex flex-col min-w-0"><span className="text-sm font-medium text-white truncate">{userName}</span><span className="text-xs text-gray-500 truncate">{userEmail || 'Free Trial'}</span></div></div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col h-full relative min-w-0">
        <header className="flex items-center justify-between px-4 py-3 border-b border-white/5 shrink-0"><div className="flex items-center gap-3"><button className="md:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button><h1 className="text-sm font-medium text-gray-300 truncate">{activeConversation ? activeConversation.title : 'New Conversation'}</h1></div></header>
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto h-full px-4 py-16"><h1 className="text-2xl font-semibold text-white tracking-tight">What do you want to get done?</h1><p className="text-gray-400 text-sm mt-2">Tell Loop what you need in plain language. It will handle the rest.</p><div className="flex flex-wrap gap-3 mt-8 justify-center"><button onClick={() => setInputValue("Draft a client update email")} className="bg-white/5 border border-white/5 text-gray-300 text-sm px-4 py-2 rounded-full hover:bg-white/10 transition-colors">Draft a client update email</button><button onClick={() => setInputValue("Scan my subscriptions")} className="bg-white/5 border border-white/5 text-gray-300 text-sm px-4 py-2 rounded-full hover:bg-white/10 transition-colors">Scan my subscriptions</button><button onClick={() => setInputValue("Summarize my files")} className="bg-white/5 border border-white/5 text-gray-300 text-sm px-4 py-2 rounded-full hover:bg-white/10 transition-colors">Summarize my files</button></div></div>
          ) : (
            <div className="max-w-[680px] mx-auto px-4 py-8 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.isDraft ? (
                    <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-5 max-w-[85%] w-full">
                      <div className="flex items-center gap-2 mb-3"><Mail size={16} className="text-blue-400" /><span className="text-xs font-medium text-blue-400 uppercase tracking-wide">Draft Email</span></div>
                      <div className="text-xs text-gray-500 mb-1">From: {msg.sender || "Not connected"}</div>
                      <div className="text-xs text-gray-500 mb-1">To: {msg.recipient}</div>
                      <div className="text-sm font-semibold text-white mb-3">{msg.subject}</div>
                      <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed border-l-2 border-white/10 pl-4">{msg.content}</div>
                      <div className="flex gap-2 mt-5">
                        <button onClick={() => handleApproveDraft(msg)} disabled={isLoading} className="bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-blue-600 transition disabled:opacity-50">Approve & Send</button>
                        <button className="bg-white/5 text-gray-300 text-sm px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Edit</button>
                        <button className="text-gray-500 text-sm px-4 py-2.5 hover:text-gray-300 transition ml-auto">Cancel</button>
                      </div>
                    </div>
                  ) : msg.isFileSummary ? (
                    <div className="bg-[#0d0d0d] border border-blue-500/30 rounded-2xl p-5 max-w-[85%] w-full">
                      <div className="flex items-center gap-2 mb-3"><FileText size={16} className="text-blue-400" /><span className="text-xs font-medium text-blue-400 uppercase tracking-wide">File Summary: {msg.fileName}</span></div>
                      <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                      <p className="text-xs text-gray-500 mt-3">You can ask me questions about this file.</p>
                    </div>
                  ) : msg.isExpenseScan ? (
                    <div className="bg-[#0d0d0d] border border-blue-500/30 rounded-2xl p-5 max-w-[85%] w-full">
                      <div className="flex items-center gap-2 mb-3"><Clock size={16} className="text-blue-400" /><span className="text-xs font-medium text-blue-400 uppercase tracking-wide">Expense Tracker</span></div>
                      <p className="text-sm text-gray-300 mb-3">{msg.content}</p>
                    </div>
                  ) : msg.isFollowUpPrompt ? (
                    <div className="bg-[#0d0d0d] border border-yellow-500/30 rounded-2xl p-4 max-w-[85%] w-full">
                      <div className="flex items-center gap-2 mb-2"><Clock size={16} className="text-yellow-400" /><span className="text-xs font-medium text-yellow-400 uppercase tracking-wide">Follow-up Reminder</span></div>
                      <p className="text-sm text-gray-300 mb-3">{msg.content}</p>
                      <div className="flex gap-2">
                        <button onClick={() => handleSendFollowUp(msg.followUpRecipient!, msg.followUpSubject!, msg.followUpId!)} className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-600 transition">Yes, send follow-up</button>
                        <button onClick={() => skipFollowUp(msg.followUpId!)} className="bg-white/5 text-gray-400 text-sm px-4 py-2 rounded-lg hover:bg-white/10 transition">Skip</button>
                      </div>
                    </div>
                  ) : (
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-[#0d0d0d] border border-white/5 text-gray-200'}`}>{msg.content}</div>
                  )}
                </div>
              ))}
              {showFollowUpOptions && (
                <div className="flex w-full justify-start">
                  <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-4 max-w-[85%]">
                    <p className="text-sm text-gray-300 mb-3">When should I follow up?</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <button onClick={() => scheduleFollowUp(20)} className="bg-white/5 text-gray-300 text-xs px-3 py-1.5 rounded-lg hover:bg-white/10 transition">In 20 mins</button>
                      <button onClick={() => scheduleFollowUp(120)} className="bg-white/5 text-gray-300 text-xs px-3 py-1.5 rounded-lg hover:bg-white/10 transition">Later today</button>
                      <button onClick={() => scheduleFollowUp(1440)} className="bg-white/5 text-gray-300 text-xs px-3 py-1.5 rounded-lg hover:bg-white/10 transition">Tomorrow</button>
                      <button onClick={() => scheduleFollowUp(4320)} className="bg-white/5 text-gray-300 text-xs px-3 py-1.5 rounded-lg hover:bg-white/10 transition">In 3 days</button>
                      <button onClick={() => setShowCustomDate(!showCustomDate)} className="bg-white/5 text-gray-300 text-xs px-3 py-1.5 rounded-lg hover:bg-white/10 transition">Custom</button>
                    </div>
                    {showCustomDate && (
                      <div className="flex gap-2">
                        <input type="datetime-local" value={customDate} onChange={(e) => setCustomDate(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-blue-500" />
                        <button onClick={scheduleCustomFollowUp} disabled={!customDate} className="bg-blue-500 text-white text-xs px-3 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50">Set</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {isLoading && <div className="flex w-full justify-start"><div className="bg-[#0d0d0d] border border-white/5 text-gray-500 rounded-2xl px-5 py-3 text-sm">Writing...</div></div>}
            </div>
          )}
        </div>
        <div className="border-t border-white/5 p-4">
          <form onSubmit={handleSendMessage} className="max-w-[680px] mx-auto">
            <div className="flex items-end gap-3 bg-[#0d0d0d] border border-white/10 rounded-2xl p-3 focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
              <div className="relative" ref={plusMenuRef}>
                <button type="button" onClick={() => setShowPlusMenu(!showPlusMenu)} className="text-gray-500 hover:text-gray-300 p-2 shrink-0 transition-colors"><Plus size={20} /></button>
                {showPlusMenu && (
                  <div className="absolute bottom-full left-0 mb-2 w-60 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                    <button onClick={() => { setShowPlusMenu(false); fileInputRef.current?.click(); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 transition-colors text-left"><Upload size={16} className="text-blue-400" /><div><div className="font-medium">Upload File</div><div className="text-xs text-gray-500">Upload and summarize any document</div></div></button>
                    <button onClick={() => setShowPlusMenu(false)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 transition-colors text-left border-t border-white/5"><FolderOpen size={16} className="text-blue-400" /><div><div className="font-medium">Access Files</div><div className="text-xs text-gray-500">Give Loop access to your Drive</div></div></button>
                  </div>
                )}
              </div>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
              <textarea ref={textareaRef} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }} placeholder="Tell Loop what you need..." disabled={isLoading} rows={1} className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm resize-none disabled:opacity-50 py-2" />
              <button type="submit" disabled={!inputValue.trim() || isLoading} className="bg-white text-black p-2.5 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-30 shrink-0"><Send size={16} /></button>
            </div>
          </form>
        </div>
        {showConnectedApps && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowConnectedApps(false)} />}
        <div className={`fixed right-0 top-0 h-full w-[320px] bg-[#0d0d0d] border-l border-white/5 z-50 p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out ${showConnectedApps ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between mb-1"><h2 className="text-lg font-semibold text-white">Connected Apps</h2><button onClick={() => setShowConnectedApps(false)} className="text-gray-500 hover:text-white"><X size={20} /></button></div>
          <p className="text-sm text-gray-500 mb-6">Manage your integrations</p>
          <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-4"><div className="flex items-center gap-2"><Mail size={18} className="text-red-400" /><span className="text-white font-medium text-sm">Gmail</span><span className={`h-2 w-2 rounded-full ml-auto ${isConfigured ? 'bg-green-500' : 'bg-gray-600'}`}></span></div><p className="text-xs text-gray-500 mt-2">{isConfigured ? `Connected as ${credentials?.email}` : 'Send emails and track follow-ups.'}</p>{isConfigured ? (<div className="flex gap-2 mt-3"><button onClick={() => setShowGmailForm(!showGmailForm)} className="bg-white/10 text-gray-300 text-sm px-3 py-1.5 rounded-lg hover:bg-white/20 transition">Change</button><button onClick={removeCredentials} className="text-red-400 text-sm px-3 py-1.5 hover:text-red-300 transition">Disconnect</button></div>) : (<button onClick={() => setShowGmailForm(!showGmailForm)} className="bg-blue-500 text-white text-sm font-medium px-4 py-1.5 rounded-lg mt-3 hover:bg-blue-600 transition">Connect</button>)}{showGmailForm && (<div className="mt-3 space-y-2"><input type="email" value={gmailEmail} onChange={(e) => setGmailEmail(e.target.value)} placeholder="Your Gmail address" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-blue-500" /><input type="password" value={gmailPassword} onChange={(e) => setGmailPassword(e.target.value)} placeholder="App Password" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-blue-500" /><button onClick={handleConnectGmail} disabled={!gmailEmail || !gmailPassword} className="w-full bg-blue-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50">Save & Connect</button></div>)}</div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-4 opacity-50"><div className="flex items-center gap-2"><HardDrive size={18} className="text-yellow-400" /><span className="text-gray-500 font-medium text-sm">Drive</span><span className="bg-white/5 text-gray-600 text-[10px] px-2 py-0.5 rounded-full ml-auto">Soon</span></div><p className="text-xs text-gray-600 mt-2">Access and summarize your files.</p></div>
        </div>
      </main>
    </div>
  );
}