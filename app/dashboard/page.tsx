'use client';

import { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Send, 
  Search, 
  Menu,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

export default function ChatWorkspaceDashboard() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: '1', title: 'Analyze pitch deck structure' },
    { id: '2', title: 'Draft follow-up to partner' },
    { id: '3', title: 'Summarize Q3 Drive receipts' },
  ]);

  return (
    <div className="min-h-screen bg-white text-[#121212] font-sans antialiased flex overflow-hidden h-screen w-screen">
      
      {/* 1. Left Navigation Sidebar */}
      <aside className="w-64 bg-[#FAFAFA] border-r border-gray-200/80 flex flex-col justify-between h-full z-20 flex-shrink-0 font-medium">
        <div className="flex flex-col flex-1 overflow-y-auto">
          
          {/* Top Control Block: Brand & New Chat Node */}
          <div className="p-4 space-y-4">
            <div className="flex items-center px-2 gap-2">
              <span className="w-5 h-5 bg-violet-600 rounded-md flex items-center justify-center text-white text-xs font-black">L</span>
              <span className="text-sm font-bold tracking-tight text-gray-950">Loop Engine</span>
            </div>

            <button className="w-full h-10 border border-gray-200 hover:border-gray-300 bg-white rounded-lg text-xs font-bold text-gray-800 transition flex items-center justify-between px-3 shadow-sm group">
              <span className="flex items-center gap-2">
                <Plus size={14} className="text-violet-600" />
                New chat
              </span>
              <span className="text-[10px] bg-gray-100 text-gray-400 group-hover:bg-gray-200 font-mono px-1.5 py-0.5 rounded transition">⌘N</span>
            </button>
          </div>

          {/* Section: Connected Data Apps */}
          <div className="px-4 py-2">
            <h3 className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-2">Apps</h3>
            <div className="space-y-0.5">
              
              {/* Gmail Sync Node */}
              <button className="w-full flex items-center justify-between px-2 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:text-gray-950 hover:bg-gray-200/50 transition">
                <span className="flex items-center gap-2.5">
                  {/* Google Gmail SVG Logo */}
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#4285F4" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
                    <path fill="#EA4335" d="M22 6v12c0 1.1-.9 2-2 2h-2V8l-6 4-6-4v12H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2z"/>
                    <path fill="#FBBC05" d="M20 4H4c-1.1 0-2 .9-2 2v1l10 6.5L22 7V6c0-1.1-.9-2-2-2z"/>
                    <path fill="#34A853" d="M2 7v11c0 1.1.9 2 2 2h3V9.5L2 7z"/>
                  </svg>
                  Gmail
                </span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              </button>

              {/* Google Drive Sync Node */}
              <button className="w-full flex items-center justify-between px-2 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:text-gray-950 hover:bg-gray-200/50 transition">
                <span className="flex items-center gap-2.5">
                  {/* Google Drive SVG Logo */}
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#0066DA" d="M19.4 17.5H4.6L2 13 4.6 8.5h14.8l2.6 4.5-2.6 4.5z"/>
                    <path fill="#00AA47" d="M15.2 8.5H2L4.6 4h13.2L15.2 8.5z"/>
                    <path fill="#FFBA00" d="M9.4 17.5L2 4.5h5.3l7.4 13h-5.3z"/>
                  </svg>
                  Google Drive
                </span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              </button>

              {/* Calendar Sync Node */}
              <button className="w-full flex items-center justify-between px-2 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:text-gray-950 hover:bg-gray-200/50 transition">
                <span className="flex items-center gap-2.5">
                  {/* Google Calendar SVG Logo */}
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#FFF" d="M0 0h24v24H0z"/>
                    <path fill="#4285F4" d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    <path fill="#FFF" d="M19 19H5V8h14v11zM19 5h-2v1h-2V5H9v1H7V5H5v1h14V5z"/>
                    <path fill="#4285F4" d="M8 11h3v3H8zm4 0h4v3h-4zm-4 4h3v3H8zm4 0h4v3h-4z"/>
                  </svg>
                  Calendar
                </span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              </button>

            </div>
          </div>

          {/* Section: Recent Chat Streams */}
          <div className="px-4 py-4 flex-1 overflow-y-auto">
            <h3 className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-2">Recent Chats</h3>
            <div className="space-y-0.5">
              {chatHistory.map((chat) => (
                <button 
                  key={chat.id} 
                  className="w-full flex items-center gap-2 px-2 py-2 text-xs font-semibold text-gray-500 hover:text-gray-950 rounded-lg hover:bg-gray-200/40 text-left transition truncate whitespace-nowrap"
                >
                  <MessageSquare size={13} className="text-gray-400 flex-shrink-0" />
                  <span className="truncate">{chat.title}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* User Identity Frame */}
        <div className="p-4 border-t border-gray-200/60 bg-gray-50/50 flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-black shadow-sm">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-900 truncate">Workspace Node</p>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </aside>

      {/* 2. Main Chat Workspace Interface */}
      <main className="flex-1 flex flex-col h-full bg-white relative">
        
        {/* Dynamic Header */}
        <header className="h-14 border-b border-gray-100 flex items-center justify-between px-6 z-10 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
            <span>Workspace Sandbox</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-400 font-medium">Untitled Thread</span>
          </div>
        </header>

        {/* Pure Clean Message Space (No default text walls) */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 max-w-2xl mx-auto w-full flex flex-col justify-center items-center">
          {/* Intentional Empty Workspace Canvas: Ready for Input */}
          <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center border border-violet-100/50 shadow-sm animate-pulse">
            <span className="w-2 h-2 bg-violet-600 rounded-full" />
          </div>
        </div>

        {/* Global Chat Input Dock */}
        <div className="p-6 bg-gradient-to-t from-white via-white to-transparent flex-shrink-0 z-10">
          <div className="max-w-2xl mx-auto relative border border-gray-200 focus-within:border-gray-300 rounded-xl bg-white p-2 transition shadow-sm">
            <textarea
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder=""
              className="w-full bg-transparent resize-none outline-none py-2 px-3 text-xs font-medium text-gray-900 placeholder-transparent min-h-[40px] max-h-[160px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  setMessage('');
                }
              }}
            />
            
            {/* Input Utilities Strip */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-50 px-2">
              <div className="flex items-center gap-1.5 text-gray-400">
                <span className="text-[10px] font-mono bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded">Context Engine Active</span>
              </div>
              <button 
                type="submit"
                disabled={!message.trim()}
                className="p-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition shadow-sm disabled:opacity-30 flex items-center justify-center"
              >
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}