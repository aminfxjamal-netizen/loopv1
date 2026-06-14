"use client";

import React, { useState } from "react";
import { 
  MessageSquare, 
  Mail, 
  Folder, 
  Calendar, 
  Settings, 
  Menu, 
  X, 
  Send, 
  Layers, 
  User, 
  Sparkles,
  Search,
  Globe,
  Plus,
  Lock
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function WorkspacePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Form states for the requested interactive settings design
  const [username, setUsername] = useState("admin_loop");
  const [password, setPassword] = useState("••••••••••••");

  // Mock data for recent chat nodes
  const [recentChats, setRecentChats] = useState([
    "RouteX Africa Marketing Plan",
    "Automated Email Blast setup",
    "Workspace Node V4 Config"
  ]);

  const handleSendMessage = async () => {
    if (!messageInput.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: messageInput };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setMessageInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages([...updatedMessages, { role: "assistant", content: data.reply }]);
      } else if (data.error) {
        setMessages([...updatedMessages, { role: "assistant", content: `System Error: ${data.error}` }]);
      }
    } catch (error) {
      console.error("Failed to fetch choice:", error);
      setMessages([...updatedMessages, { role: "assistant", content: "Failed to connect to backend service." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 text-gray-800 font-sans antialiased relative">
      
      {/* 1. COMPACT COLLAPSIBLE SIDEBAR */}
      <aside 
        className={`shrink-0 flex flex-col justify-between border-r border-gray-200 bg-white transition-all duration-300 ease-in-out z-20 h-full
          ${isSidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full absolute md:relative md:w-0 md:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className={`flex flex-col px-4 pt-5 ${!isSidebarOpen && "hidden"}`}>
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 shadow-sm shadow-blue-600/20">
                <Layers size={13} className="text-white" />
              </div>
              <span className="text-base font-bold tracking-wider text-gray-900 uppercase">Loop</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="my-4 border-t border-gray-100 w-full" />
        </div>

        {/* Shrunk / Miniature Navigation Links */}
        <div className={`flex-1 space-y-1 px-3 overflow-y-auto ${!isSidebarOpen && "hidden"}`}>
          <button 
            onClick={() => setMessages([])} 
            className="flex w-full items-center gap-2.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 border border-blue-100/50 hover:bg-blue-100/70 transition-all group"
          >
            <MessageSquare size={14} className="text-blue-600 group-hover:scale-105 transition-transform" />
            <span>New Chat</span>
          </button>

          <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
            <Mail size={14} />
            <span>Email</span>
          </button>

          <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
            <Folder size={14} />
            <span>Files</span>
          </button>

          <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
            <Calendar size={14} />
            <span>Calendar</span>
          </button>

          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all"
          >
            <Settings size={14} />
            <span>Settings</span>
          </button>

          {/* RECENT CHATS SUBSECTION */}
          <div className="pt-4 mt-2 border-t border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-2 mb-1.5">
              Recent Chats
            </span>
            <div className="space-y-0.5">
              {recentChats.map((chat, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    setMessageInput(`Reviewing nodes for: ${chat}`);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-gray-600 hover:bg-gray-50 truncate transition-colors group"
                >
                  <MessageSquare size={12} className="text-gray-400 group-hover:text-blue-500 shrink-0" />
                  <span className="truncate group-hover:text-gray-900">{chat}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Footer Controls */}
        <div className={`flex flex-col px-3 pb-4 ${!isSidebarOpen && "hidden"}`}>
          <div className="mb-3 border-t border-gray-100 w-full" />

          <div className="mb-2 flex items-center gap-2 rounded-lg bg-blue-50/60 border border-blue-100/50 px-2.5 py-2">
            <Sparkles size={12} className="text-blue-600 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-blue-700 tracking-wide uppercase">Blue Tick Plan</span>
              <span className="text-[9px] text-gray-400">KYA Verified</span>
            </div>
          </div>

          <div 
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2.5 rounded-lg p-1.5 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 border border-gray-200 shrink-0">
              <User size={13} className="text-gray-600" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="truncate text-xs font-semibold text-gray-900">{username}</span>
              <span className="truncate text-[9px] text-gray-400">active_session</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. CHAT FEED & MAIN WORKSPACE */}
      <main className="relative flex flex-1 flex-col items-center justify-between p-4 md:p-6 overflow-hidden z-10 h-full">
        
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-6 left-6 z-40 rounded-xl border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 shadow-sm transition-all"
          >
            <Menu size={18} />
          </button>
        )}

        <div className="w-full max-w-3xl flex justify-end items-center gap-2 pt-1 text-xs text-gray-400">
          <span className="flex items-center gap-1"><Globe size={11}/> gemini_3.5_flash</span>
        </div>

        {/* Dynamic Inner Container */}
        {messages.length === 0 ? (
          <div className="flex flex-col items-center text-center my-auto max-w-xl px-4 select-none">
            <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/20 border border-blue-400/20">
              <Layers size={28} className="text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-1.5">
              Good to See You!
            </h1>
            <p className="text-gray-400 text-xs font-medium tracking-wide">
              How Can I assist your workflows today?
            </p>
          </div>
        ) : (
          <div className="flex-1 w-full max-w-3xl overflow-y-auto my-4 pr-1 space-y-5 scrollbar-thin scrollbar-thumb-gray-200">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 text-sm ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role !== "user" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 border border-blue-200 text-blue-600 font-bold text-xs">
                    L
                  </div>
                )}
                <div 
                  className={`rounded-2xl px-4 py-2.5 max-w-[85%] whitespace-pre-wrap leading-relaxed shadow-sm text-xs md:text-sm
                    ${msg.role === "user" 
                      ? "bg-blue-600 text-white rounded-tr-none" 
                      : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                    }
                  `}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 text-sm justify-start items-center">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 border border-blue-200 text-blue-600 font-bold text-xs animate-pulse">
                  L
                </div>
                <div className="text-[11px] text-blue-500 tracking-wider uppercase animate-pulse font-medium">
                  Loop processing...
                </div>
              </div>
            )}
          </div>
        )}

        {/* INPUT INTERACTION CONTROL BLOCK */}
        <div className="w-full max-w-3xl flex flex-col items-center gap-3">
          <div className="relative w-full rounded-2xl bg-white border border-gray-200 shadow-md focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition-all p-1.5 z-10">
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Ask anything..."
              rows={1}
              className="w-full resize-none bg-transparent py-2.5 pl-3 pr-12 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-0 max-h-32 min-h-[40px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            
            <div className="absolute right-3 bottom-3 flex items-center gap-1.5">
              <button className="rounded-lg p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                <Search size={15} />
              </button>
              <button 
                onClick={handleSendMessage}
                disabled={isLoading}
                className="rounded-xl bg-blue-600 p-1.5 text-white hover:bg-blue-700 shadow-sm transition-all disabled:opacity-50"
              >
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* 3. INTERACTIVE SETTINGS MODAL INTERFACE */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-200">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-gray-700">
                <Settings size={14} className="text-gray-400" />
                <span>Account Profile Settings</span>
              </div>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg p-1 hover:bg-gray-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Fully Interactive Design Form */}
            <div className="p-5 space-y-4">
              
              {/* Username Control Input */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  Account Username
                </label>
                <div className="relative rounded-xl border border-gray-200 bg-gray-50/30 focus-within:border-blue-500 focus-within:bg-white transition-all">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <User size={14} />
                  </div>
                  <input 
                    type="text" 
                    className="w-full text-xs bg-transparent pl-9 pr-3 py-2.5 text-gray-800 outline-none font-medium"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter unique username"
                  />
                </div>
              </div>

              {/* Password Control Input */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  Account Password
                </label>
                <div className="relative rounded-xl border border-gray-200 bg-gray-50/30 focus-within:border-blue-500 focus-within:bg-white transition-all">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Lock size={14} />
                  </div>
                  <input 
                    type="password" 
                    className="w-full text-xs bg-transparent pl-9 pr-3 py-2.5 text-gray-800 outline-none font-mono tracking-wider"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter security passcode"
                  />
                </div>
                <p className="text-[10px] text-gray-400 pt-0.5">
                  Credentials are dynamically saved to local nodes.
                </p>
              </div>

              {/* System Actions Inside Panel */}
              <div className="pt-2 flex justify-end gap-2">
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-600/10 transition-colors"
                >
                  Save Changes
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}