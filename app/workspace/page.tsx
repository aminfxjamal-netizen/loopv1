"use client";

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Paperclip, 
  Send, 
  Settings, 
  Plus, 
  Lock 
} from 'lucide-react';

export interface User {
  name: string;
  email?: string;
  role?: string;
  avatarUrl?: string;
}

const DEFAULT_USER: User = {
  name: "User",
  role: "",
  avatarUrl: undefined
};

interface Conversation {
  id: string;
  title: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface WorkspaceProps {
  user?: User | null;
}

export default function Workspace({ user = DEFAULT_USER }: WorkspaceProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activePage, setActivePage] = useState<string>('chat');
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showConnectedApps, setShowConnectedApps] = useState<boolean>(false);

  const handleCreateConversation = () => {
    const newId = Math.random().toString(36).substring(7);
    const newConv: Conversation = {
      id: newId,
      title: `Conversation ${conversations.length + 1}`
    };
    setConversations([...conversations, newConv]);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      role: 'user',
      content: inputValue.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
  };

  const getInitials = (nameStr: string): string => {
    if (!nameStr) return "US";
    const parts = nameStr.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    if (parts[0].length >= 2) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const currentUser = user || DEFAULT_USER;

  return (
    <div className="flex h-screen w-full bg-[#0d0d0d] text-white overflow-hidden font-sans select-none">
      {/* SIDEBAR */}
      <aside className="w-[240px] bg-[#0a0a0a] border-r border-gray-800 flex flex-col h-full p-4 shrink-0">
        <div className="text-2xl font-bold tracking-tight text-white mb-4">
          Loop
        </div>

        <button 
          onClick={handleCreateConversation}
          className="flex items-center justify-center gap-2 border border-white bg-transparent rounded-lg py-2 px-4 text-sm font-medium hover:bg-gray-800 transition-colors w-full"
        >
          <Plus size={16} />
          New Conversation
        </button>

        <div className="text-gray-500 uppercase text-xs tracking-wide font-semibold mt-6 mb-2">
          MAIN
        </div>
        <nav className="space-y-1">
          <button className="flex items-center w-full text-left py-2 px-3 bg-gray-800 rounded-lg text-sm font-medium text-white">
            AI Chat
          </button>
          
          <div className="flex items-center justify-between py-2 px-3 text-sm font-medium text-gray-600">
            <span>Email</span>
            <span className="bg-gray-800 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-normal">Soon</span>
          </div>

          <div className="flex items-center justify-between py-2 px-3 text-sm font-medium text-gray-600">
            <span>Calendar</span>
            <span className="bg-gray-800 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-normal">Soon</span>
          </div>

          <div className="flex items-center justify-between py-2 px-3 text-sm font-medium text-gray-600">
            <span>Files</span>
            <span className="bg-gray-800 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-normal">Soon</span>
          </div>
        </nav>

        <div className="text-gray-500 uppercase text-xs tracking-wide font-semibold mt-6 mb-2">
          RECENT
        </div>
        <div className="flex-1 overflow-y-auto space-y-1 max-h-[calc(100vh-340px)]">
          {conversations.length === 0 ? (
            <div className="text-gray-600 text-sm italic px-3 py-1">
              No conversations yet
            </div>
          ) : (
            conversations.map((conv) => (
              <div 
                key={conv.id} 
                className="flex items-center gap-2 py-2 px-3 text-sm text-gray-300 hover:bg-gray-900 rounded-lg cursor-pointer truncate"
              >
                <MessageSquare size={14} className="shrink-0 text-gray-500" />
                <span className="truncate">{conv.title}</span>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-gray-800 pt-4 mt-auto space-y-4">
          <button className="flex items-center gap-2 text-gray-500 text-sm hover:text-white transition-colors w-full text-left px-3">
            <Settings size={16} />
            Settings
          </button>

          {user !== null && (
            <div className="flex items-center gap-3 px-3">
              {currentUser.avatarUrl ? (
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.name} 
                  className="h-8 w-8 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-700 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  {getInitials(currentUser.name)}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-white truncate">{currentUser.name}</span>
                {currentUser.role && (
                  <span className="text-xs text-gray-500 truncate">{currentUser.role}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full relative">
        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          {messages.length === 0 ? (
            /* EMPTY STATE */
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto my-auto">
              <h1 className="text-3xl font-semibold text-white tracking-tight">
                What do you want to get done?
              </h1>
              <p className="text-gray-400 text-sm mt-2">
                Tell Loop what you need in plain language. It will handle the rest.
              </p>

              <div className="flex flex-wrap gap-3 mt-6 justify-center">
                <button 
                  onClick={() => setInputValue("Draft a client update email")}
                  className="bg-gray-800 text-gray-300 text-sm px-4 py-2 rounded-full cursor-pointer hover:bg-gray-700 transition-colors"
                >
                  Draft a client update email
                </button>
                <button 
                  onClick={() => setInputValue("Schedule a meeting")}
                  className="bg-gray-800 text-gray-300 text-sm px-4 py-2 rounded-full cursor-pointer hover:bg-gray-700 transition-colors"
                >
                  Schedule a meeting
                </button>
                <button 
                  onClick={() => setInputValue("Summarize my files")}
                  className="bg-gray-800 text-gray-300 text-sm px-4 py-2 rounded-full cursor-pointer hover:bg-gray-700 transition-colors"
                >
                  Summarize my files
                </button>
              </div>

              <div className="text-gray-600 text-xs mt-8 flex items-center gap-1.5">
                <Lock size={12} />
                Loop will always ask for your approval before taking any action.
              </div>
            </div>
          ) : (
            /* CHAT MESSAGES */
            <div className="space-y-4 max-w-3xl w-full mx-auto pb-24">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-white text-black font-normal' 
                        : 'bg-gray-800 text-gray-100'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* INPUT BAR */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0d0d0d] border-t border-gray-800 p-4">
          <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex items-center gap-3">
            <button 
              type="button"
              className="text-gray-500 hover:text-gray-400 p-1 shrink-0"
            >
              <Paperclip size={20} />
            </button>
            
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tell Loop what you need..."
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2.5 placeholder-gray-500 outline-none text-sm border border-transparent focus:border-gray-700 transition-colors"
            />

            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-white text-black px-4 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 disabled:opacity-50 transition-opacity shrink-0"
            >
              <Send size={14} />
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}