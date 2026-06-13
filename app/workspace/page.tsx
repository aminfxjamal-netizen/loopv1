'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Mail, 
  FileText, 
  Calendar as CalendarIcon, 
  CreditCard, 
  Settings as SettingsIcon, 
  Paperclip, 
  Send, 
  Sparkles, 
  User, 
  Upload, 
  Lock, 
  Bell, 
  Share2 
} from 'lucide-react';

type activeTabType = 'chat' | 'email' | 'files' | 'calendar' | 'billing' | 'settings';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface EmailConversation {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  date: string;
}

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: string;
}

interface Meeting {
  id: string;
  title: string;
  time: string;
  duration: string;
}

export default function LoopWorkspaceV1() {
  const [activeTab, setActiveTab] = useState<activeTabType>('chat');
  const [chatInput, setChatInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Connection / Data States
  const [isGmailConnected, setIsGmailConnected] = useState<boolean>(false);
  const [isCalendarConnected, setIsCalendarConnected] = useState<boolean>(false);
  const [filesList, setFilesList] = useState<UploadedFile[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  // Handle Simulated Chat Actions
  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsLoading(true);

    setTimeout(() => {
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `I am processing your objective: "${userMsg.content}". What would you like me to coordinate next within your workspace?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 1000);
  };

  // Mock Data Generators for Connected States
  const mockEmails: EmailConversation[] = [
    { id: '1', sender: 'Sarah Jenkins', subject: 'Q3 Partnership Strategy', snippet: 'The updated terms are ready for your review. Let me know if Loop can lock this in.', date: '10:42 AM' },
    { id: '2', sender: 'David Miller', subject: 'Product Architecture Guidelines', snippet: 'Attached the structural maps for your context alignment parameters.', date: 'Yesterday' }
  ];

  const mockMeetings: Meeting[] = [
    { id: '1', title: 'Executive Operations Sync', time: '2:00 PM - 2:45 PM', duration: '45m' },
    { id: '2', title: 'Strategic Growth Review', time: '4:30 PM - 5:00 PM', duration: '30m' }
  ];

  const simulateFileUpload = () => {
    const newFile: UploadedFile = {
      id: crypto.randomUUID(),
      name: `Document_${Math.floor(Math.random() * 1000)}.pdf`,
      type: 'PDF',
      size: '2.4 MB'
    };
    setFilesList(prev => [...prev, newFile]);
  };

  return (
    <div className="flex h-screen w-screen bg-[#FFFFFF] font-sans antialiased text-[#0F172A] overflow-hidden select-none">
      
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-[#E2E8F0] flex flex-col justify-between bg-[#FFFFFF] shrink-0 h-full">
        <div className="flex flex-col pt-6">
          {/* Loop Logo Group */}
          <div className="flex items-center space-x-3 px-6 pb-6 border-b border-[#E2E8F0]">
            <div className="h-6 w-6 rounded-md bg-[#2563EB] flex items-center justify-center shadow-sm">
              <span className="text-[#FFFFFF] text-xs font-black tracking-tighter">L</span>
            </div>
            <span className="text-md font-semibold tracking-tight text-[#0F172A]">Loop</span>
          </div>

          {/* Primary Navigation */}
          <nav className="p-4 space-y-1">
            <button 
              onClick={() => setActiveTab('chat')} 
              className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium transition-colors rounded-2xl ${activeTab === 'chat' ? 'bg-[#2563EB]/5 text-[#2563EB]' : 'text-[#64748B] hover:bg-[#0F172A]/5'}`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>AI Chat</span>
            </button>
            <button 
              onClick={() => setActiveTab('email')} 
              className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium transition-colors rounded-2xl ${activeTab === 'email' ? 'bg-[#2563EB]/5 text-[#2563EB]' : 'text-[#64748B] hover:bg-[#0F172A]/5'}`}
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </button>
            <button 
              onClick={() => setActiveTab('files')} 
              className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium transition-colors rounded-2xl ${activeTab === 'files' ? 'bg-[#2563EB]/5 text-[#2563EB]' : 'text-[#64748B] hover:bg-[#0F172A]/5'}`}
            >
              <FileText className="h-4 w-4" />
              <span>Files</span>
            </button>
            <button 
              onClick={() => setActiveTab('calendar')} 
              className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium transition-colors rounded-2xl ${activeTab === 'calendar' ? 'bg-[#2563EB]/5 text-[#2563EB]' : 'text-[#64748B] hover:bg-[#0F172A]/5'}`}
            >
              <CalendarIcon className="h-4 w-4" />
              <span>Calendar</span>
            </button>
          </nav>

          <div className="px-4 py-2">
            <div className="h-[1px] bg-[#E2E8F0] w-full" />
          </div>

          {/* Account Sub-navigation */}
          <nav className="p-4 space-y-1">
            <button 
              onClick={() => setActiveTab('billing')} 
              className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium transition-colors rounded-2xl ${activeTab === 'billing' ? 'bg-[#2563EB]/5 text-[#2563EB]' : 'text-[#64748B] hover:bg-[#0F172A]/5'}`}
            >
              <CreditCard className="h-4 w-4" />
              <span>Billing</span>
            </button>
            <button 
              onClick={() => setActiveTab('settings')} 
              className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium transition-colors rounded-2xl ${activeTab === 'settings' ? 'bg-[#2563EB]/5 text-[#2563EB]' : 'text-[#64748B] hover:bg-[#0F172A]/5'}`}
            >
              <SettingsIcon className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* User Account Context Frame */}
        <div className="p-4 border-t border-[#E2E8F0] bg-[#FFFFFF]">
          <div className="flex items-center space-x-3 px-2 py-1">
            <div className="h-9 w-9 rounded-full bg-[#0F172A]/5 border border-[#E2E8F0] flex items-center justify-center overflow-hidden shrink-0">
              <User className="h-4 w-4 text-[#64748B]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-[#0F172A] truncate">Amin Jamal</span>
              <span className="text-xs text-[#64748B] font-medium truncate">Free Trial</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN WORKSPACE CANVAS */}
      <main className="flex-1 flex flex-col h-full bg-[#FFFFFF] overflow-hidden relative">
        
        {/* VIEW CONTAINER */}
        <div className="flex-1 overflow-y-auto p-12 space-y-12 pb-40">
          <div className="max-w-3xl mx-auto w-full">
            
            {/* ================== TAB: AI CHAT ================== */}
            {activeTab === 'chat' && (
              <>
                {chatMessages.length === 0 ? (
                  <div className="space-y-12 animate-in fade-in duration-300">
                    {/* Welcome Header */}
                    <div className="space-y-2">
                      <h1 className="text-4xl font-semibold tracking-tight text-[#0F172A]">Good Morning</h1>
                      <p className="text-xl text-[#64748B] font-normal">What would you like Loop to do today?</p>
                    </div>

                    {/* Action Card Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => handleSendMessage("Draft an Email")}
                        className="flex flex-col items-start justify-between p-6 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl hover:border-[#2563EB] hover:shadow-sm text-left transition-all group"
                      >
                        <span className="text-md font-medium text-[#0F172A] mb-1">Draft an Email</span>
                        <span className="text-xs text-[#64748B]">Compose communication pipelines</span>
                      </button>

                      <button 
                        onClick={() => handleSendMessage("Create a Meeting")}
                        className="flex flex-col items-start justify-between p-6 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl hover:border-[#2563EB] hover:shadow-sm text-left transition-all group"
                      >
                        <span className="text-md font-medium text-[#0F172A] mb-1">Create a Meeting</span>
                        <span className="text-xs text-[#64748B]">Coordinate scheduling pathways</span>
                      </button>

                      <button 
                        onClick={() => handleSendMessage("Analyze a File")}
                        className="flex flex-col items-start justify-between p-6 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl hover:border-[#2563EB] hover:shadow-sm text-left transition-all group"
                      >
                        <span className="text-md font-medium text-[#0F172A] mb-1">Analyze a File</span>
                        <span className="text-xs text-[#64748B]">Extract strategic insights</span>
                      </button>

                      <button 
                        onClick={() => handleSendMessage("Research a Topic")}
                        className="flex flex-col items-start justify-between p-6 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl hover:border-[#2563EB] hover:shadow-sm text-left transition-all group"
                      >
                        <span className="text-md font-medium text-[#0F172A] mb-1">Research a Topic</span>
                        <span className="text-xs text-[#64748B]">Gather and synthesize data</span>
                      </button>
                    </div>

                    {/* Capabilities Framework Panel */}
                    <div className="p-8 bg-[#0F172A]/[0.02] border border-[#E2E8F0] rounded-2xl space-y-4">
                      <div className="flex items-center space-x-2.5">
                        <div className="h-5 w-5 rounded bg-[#2563EB]/10 flex items-center justify-center">
                          <Sparkles className="h-3 w-3 text-[#2563EB]" />
                        </div>
                        <span className="text-sm font-semibold tracking-tight text-[#0F172A]">Loop</span>
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm text-[#64748B] font-medium">I can help you:</p>
                        <ul className="space-y-2 text-sm text-[#0F172A] font-medium pl-1">
                          <li className="flex items-center space-x-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
                            <span>Draft and send emails</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
                            <span>Analyze documents</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
                            <span>Schedule meetings</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
                            <span>Organize information</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
                            <span>Answer questions</span>
                          </li>
                        </ul>
                        <p className="text-sm text-[#64748B] pt-2 font-medium">What would you like to do?</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex space-x-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'assistant' && (
                          <div className="h-8 w-8 rounded-xl bg-[#2563EB] flex items-center justify-center shrink-0 border border-[#2563EB]/10 shadow-sm">
                            <Sparkles className="h-3.5 w-3.5 text-white" />
                          </div>
                        )}
                        <div className={`max-w-xl rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-wrap ${
                          msg.role === 'user' 
                            ? 'bg-[#2563EB] text-white font-medium shadow-sm' 
                            : 'bg-[#0F172A]/[0.03] text-[#0F172A] border border-[#E2E8F0]'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex space-x-4 justify-start">
                        <div className="h-8 w-8 rounded-xl bg-[#2563EB] flex items-center justify-center shrink-0 border border-[#2563EB]/10 shadow-sm">
                          <Sparkles className="h-3.5 w-3.5 text-white animate-pulse" />
                        </div>
                        <div className="bg-[#0F172A]/[0.03] border border-[#E2E8F0] rounded-2xl px-5 py-3.5 text-sm text-[#64748B] font-medium">
                          Loop is coordinating...
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </>
            )}

            {/* ================== TAB: EMAIL ================== */}
            {activeTab === 'email' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="border-b border-[#E2E8F0] pb-6">
                  <h1 className="text-2xl font-semibold tracking-tight text-[#0F172A]">Email</h1>
                  <p className="text-sm text-[#64748B] mt-1">
                    Connect your Gmail account and allow Loop to draft, send and follow up on emails.
                  </p>
                </div>

                {!isGmailConnected ? (
                  <div className="py-12 flex flex-col items-center justify-center border border-dashed border-[#E2E8F0] rounded-2xl bg-[#FFFFFF] p-8 text-center">
                    <Mail className="h-8 w-8 text-[#64748B] mb-4" />
                    <button 
                      onClick={() => setIsGmailConnected(true)}
                      className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-2xl shadow-sm transition-colors"
                    >
                      Connect Gmail
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockEmails.map((email) => (
                      <div key={email.id} className="p-5 border border-[#E2E8F0] rounded-2xl bg-[#FFFFFF] hover:border-[#2563EB]/40 transition-all cursor-pointer flex justify-between items-start">
                        <div className="space-y-1 min-w-0">
                          <p className="text-sm font-semibold text-[#0F172A]">{email.sender}</p>
                          <p className="text-sm font-medium text-[#2563EB] truncate">{email.subject}</p>
                          <p className="text-xs text-[#64748B] truncate max-w-lg">{email.snippet}</p>
                        </div>
                        <span className="text-xs text-[#64748B] font-medium whitespace-nowrap ml-4">{email.date}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ================== TAB: FILES ================== */}
            {activeTab === 'files' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="border-b border-[#E2E8F0] pb-6 flex justify-between items-end">
                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-[#0F172A]">Files</h1>
                    <p className="text-sm text-[#64748B] mt-1">
                      Upload documents, spreadsheets, PDFs and reports. Loop can analyze and compare them.
                    </p>
                  </div>
                  <button 
                    onClick={simulateFileUpload}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-2xl shadow-sm transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload File</span>
                  </button>
                </div>

                <div className="text-xs text-[#64748B] font-medium flex items-center space-x-4 bg-[#0F172A]/[0.02] border border-[#E2E8F0] p-3 rounded-2xl">
                  <span>Supported extensions:</span>
                  <span className="px-2 py-0.5 bg-white border border-[#E2E8F0] rounded-md font-semibold text-[#0F172A]">PDF</span>
                  <span className="px-2 py-0.5 bg-white border border-[#E2E8F0] rounded-md font-semibold text-[#0F172A]">Excel</span>
                  <span className="px-2 py-0.5 bg-white border border-[#E2E8F0] rounded-md font-semibold text-[#0F172A]">Word</span>
                  <span className="px-2 py-0.5 bg-white border border-[#E2E8F0] rounded-md font-semibold text-[#0F172A]">CSV</span>
                  <span className="px-2 py-0.5 bg-white border border-[#E2E8F0] rounded-md font-semibold text-[#0F172A]">Images</span>
                </div>

                {filesList.length === 0 ? (
                  <div className="py-20 flex flex-col items-center justify-center border border-dashed border-[#E2E8F0] rounded-2xl bg-[#FFFFFF] p-8 text-center text-[#64748B]">
                    <FileText className="h-8 w-8 text-[#64748B]/60 mb-2" />
                    <span className="text-sm font-medium">No files uploaded yet.</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {filesList.map((file) => (
                      <div key={file.id} className="p-4 border border-[#E2E8F0] rounded-2xl bg-[#FFFFFF] flex items-center space-x-4 hover:border-[#2563EB]/40 transition-all">
                        <div className="h-10 w-10 bg-[#2563EB]/5 rounded-xl flex items-center justify-center text-xs font-bold text-[#2563EB]">
                          {file.type}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-[#0F172A] truncate">{file.name}</p>
                          <p className="text-xs text-[#64748B] mt-0.5">{file.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ================== TAB: CALENDAR ================== */}
            {activeTab === 'calendar' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="border-b border-[#E2E8F0] pb-6">
                  <h1 className="text-2xl font-semibold tracking-tight text-[#0F172A]">Calendar</h1>
                  <p className="text-sm text-[#64748B] mt-1">
                    Connect your calendar and allow Loop to schedule and manage meetings.
                  </p>
                </div>

                {!isCalendarConnected ? (
                  <div className="py-12 flex flex-col items-center justify-center border border-dashed border-[#E2E8F0] rounded-2xl bg-[#FFFFFF] p-8 text-center">
                    <CalendarIcon className="h-8 w-8 text-[#64748B] mb-4" />
                    <button 
                      onClick={() => setIsCalendarConnected(true)}
                      className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-2xl shadow-sm transition-colors"
                    >
                      Connect Calendar
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockMeetings.length === 0 ? (
                      <div className="py-12 flex flex-col items-center justify-center border border-[#E2E8F0] rounded-2xl bg-[#FFFFFF] text-[#64748B]">
                        <span className="text-sm font-medium">No upcoming meetings.</span>
                      </div>
                    ) : (
                      mockMeetings.map((meeting) => (
                        <div key={meeting.id} className="p-5 border border-[#E2E8F0] rounded-2xl bg-[#FFFFFF] flex justify-between items-center hover:border-[#2563EB]/40 transition-all">
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-[#0F172A]">{meeting.title}</p>
                            <p className="text-xs text-[#64748B] font-medium">{meeting.time}</p>
                          </div>
                          <span className="px-3 py-1 bg-[#0F172A]/[0.03] border border-[#E2E8F0] text-xs font-semibold rounded-lg text-[#0F172A]">
                            {meeting.duration}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ================== TAB: BILLING ================== */}
            {activeTab === 'billing' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="border-b border-[#E2E8F0] pb-6">
                  <h1 className="text-2xl font-semibold tracking-tight text-[#0F172A]">Billing</h1>
                </div>

                <div className="border border-[#E2E8F0] rounded-2xl bg-[#FFFFFF] divide-y divide-[#E2E8F0]">
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-[#64748B] uppercase">Current Plan</p>
                      <p className="text-lg font-semibold text-[#0F172A] mt-1">Loop Individual Premium Framework</p>
                    </div>
                    <span className="px-3 py-1 bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-bold rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="p-6 grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-[#64748B]">Trial Status</p>
                      <p className="text-sm font-medium text-[#0F172A] mt-1">14 Days Remaining</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#64748B]">Renewal Date</p>
                      <p className="text-sm font-medium text-[#0F172A] mt-1">June 27, 2026</p>
                    </div>
                  </div>

                  <div className="p-6 bg-[#0F172A]/[0.01] flex justify-end">
                    <button className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-2xl shadow-sm transition-colors">
                      Upgrade Plan
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================== TAB: SETTINGS ================== */}
            {activeTab === 'settings' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="border-b border-[#E2E8F0] pb-6">
                  <h1 className="text-2xl font-semibold tracking-tight text-[#0F172A]">Settings</h1>
                </div>

                <div className="space-y-4">
                  {/* Profile Layout Segment */}
                  <div className="p-6 border border-[#E2E8F0] rounded-2xl bg-[#FFFFFF] flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-xl bg-[#0F172A]/5 flex items-center justify-center border border-[#E2E8F0]">
                        <User className="h-5 w-5 text-[#64748B]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">Profile</p>
                        <p className="text-xs text-[#64748B]">Manage your identity alignment parameters</p>
                      </div>
                    </div>
                  </div>

                  {/* Password Layout Segment */}
                  <div className="p-6 border border-[#E2E8F0] rounded-2xl bg-[#FFFFFF] flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-xl bg-[#0F172A]/5 flex items-center justify-center border border-[#E2E8F0]">
                        <Lock className="h-5 w-5 text-[#64748B]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">Password</p>
                        <p className="text-xs text-[#64748B]">Update verification keys and security variables</p>
                      </div>
                    </div>
                  </div>

                  {/* Notifications Layout Segment */}
                  <div className="p-6 border border-[#E2E8F0] rounded-2xl bg-[#FFFFFF] flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-xl bg-[#0F172A]/5 flex items-center justify-center border border-[#E2E8F0]">
                        <Bell className="h-5 w-5 text-[#64748B]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">Notifications</p>
                        <p className="text-xs text-[#64748B]">Configure event reporting preferences</p>
                      </div>
                    </div>
                  </div>

                  {/* Connected Accounts Layout Segment */}
                  <div className="p-6 border border-[#E2E8F0] rounded-2xl bg-[#FFFFFF] flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-xl bg-[#0F172A]/5 flex items-center justify-center border border-[#E2E8F0]">
                        <Share2 className="h-5 w-5 text-[#64748B]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">Connected Accounts</p>
                        <p className="text-xs text-[#64748B]">Manage linked workspace application pathways</p>
                      </div>
                    </div>
                  </div>

                  {/* Security Layout Segment */}
                  <div className="p-6 border border-[#E2E8F0] rounded-2xl bg-[#FFFFFF] flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-xl bg-[#0F172A]/5 flex items-center justify-center border border-[#E2E8F0]">
                        <CreditCard className="h-5 w-5 text-[#64748B]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">Security</p>
                        <p className="text-xs text-[#64748B]">Audit cryptographic controls and session data</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* PERSISTENT FLOATING COMMAND INTERFACE INPUT */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF] to-transparent pt-8 pb-8 px-12 border-t border-[#E2E8F0]/40">
          <div className="max-w-3xl mx-auto">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(chatInput); }} 
              className="relative bg-[#FFFFFF] rounded-2xl border border-[#E2E8F0] shadow-sm focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all"
            >
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage(chatInput))}
                placeholder="Ask Loop anything..."
                className="w-full resize-none bg-transparent py-4 pl-5 pr-20 text-sm text-[#0F172A] placeholder-[#64748B]/60 focus:outline-none h-[54px] leading-relaxed font-medium"
              />
              <div className="absolute right-4 bottom-3 flex items-center space-x-2.5">
                <button type="button" className="p-1 text-[#64748B] hover:text-[#0F172A] rounded transition-colors">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button 
                  type="submit" 
                  disabled={!chatInput.trim() || isLoading}
                  className={`p-1.5 rounded-xl transition-all ${chatInput.trim() ? 'bg-[#2563EB] text-white shadow-sm' : 'text-[#64748B]/40 bg-[#0F172A]/[0.02]'}`}
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

      </main>
    </div>
  );
}