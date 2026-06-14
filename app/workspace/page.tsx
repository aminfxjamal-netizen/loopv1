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
  Plus
} from "lucide-react";

export default function WorkspacePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messageInput, setMessageInput] = useState("");

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#070b19] text-slate-200 font-sans antialiased">
      
      {/* 1. COLLAPSIBLE SIDEBAR */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between border-r border-blue-500/10 bg-[#0c1328]/95 backdrop-blur-xl transition-all duration-300 ease-in-out md:static
          ${isSidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:w-0 md:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        {isSidebarOpen && (
          <div className="flex flex-col px-4 pt-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-500/30">
                  <Layers size={15} className="text-white" />
                </div>
                <span className="text-lg font-bold tracking-wider text-white uppercase">Loop</span>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-blue-500/10 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Minimalist divider mapping to user requirement */}
            <div className="my-5 border-t border-blue-500/20 w-full" />
          </div>
        )}

        {/* Sidebar Main Navigation Links */}
        {isSidebarOpen && (
          <div className="flex-1 space-y-1.5 px-3 overflow-y-auto">
            <button className="flex w-full items-center gap-3 rounded-xl bg-blue-600/15 px-4 py-3 text-sm font-medium text-blue-400 border border-blue-500/20 hover:bg-blue-600/25 transition-all group">
              <MessageSquare size={18} className="text-blue-400 group-hover:scale-105 transition-transform" />
              <span>New Chat</span>
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-blue-500/5 hover:text-slate-200 transition-all">
              <Mail size={18} />
              <span>Email</span>
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-blue-500/5 hover:text-slate-200 transition-all">
              <Folder size={18} />
              <span>Files</span>
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-blue-500/5 hover:text-slate-200 transition-all">
              <Calendar size={18} />
              <span>Calendar</span>
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-blue-500/5 hover:text-slate-200 transition-all">
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </div>
        )}

        {/* Sidebar Footer Block */}
        {isSidebarOpen && (
          <div className="flex flex-col px-3 pb-6">
            {/* Divider */}
            <div className="mb-4 border-t border-blue-500/10 w-full" />

            {/* User Plan Badge */}
            <div className="mb-3 flex items-center gap-2 rounded-xl bg-blue-950/40 border border-blue-500/10 px-3 py-2.5">
              <Sparkles size={14} className="text-blue-400 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-blue-400 tracking-wide uppercase">Blue Tick Plan</span>
                <span className="text-[10px] text-slate-400">KYA Verified</span>
              </div>
            </div>

            {/* User Profile Container */}
            <div className="flex items-center gap-3 rounded-xl p-2 hover:bg-blue-500/5 transition-colors cursor-pointer">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-900/40 border border-blue-500/20">
                <User size={16} className="text-blue-400" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="truncate text-xs font-medium text-slate-200">User Workspace</span>
                <span className="truncate text-[10px] text-slate-500">active_session</span>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* 2. MAIN HUB INTERFACE CONTROLLER */}
      <main className="relative flex flex-1 flex-col items-center justify-between p-4 md:p-6 overflow-y-auto">
        
        {/* Toggle Button for Closed Sidebar State */}
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-6 left-6 z-40 rounded-xl border border-blue-500/10 bg-[#0c1328]/80 p-2.5 text-slate-400 hover:bg-blue-500/10 hover:text-white backdrop-blur-md transition-all shadow-xl shadow-black/20"
          >
            <Menu size={20} />
          </button>
        )}

        {/* Top Spacer / Universal Actions Header */}
        <div className="w-full max-w-3xl flex justify-end items-center gap-2 pt-2 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Globe size={12}/> loop_v4_nodes</span>
        </div>

        {/* CENTERPIECE HERO AREA (Mirrors Aether AI Layout exactly) */}
        <div className="flex flex-col items-center text-center my-auto max-w-xl px-4 select-none">
          {/* Futuristic Glowing Brand Core Icon */}
          <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 shadow-2xl shadow-blue-500/20 border border-blue-400/30">
            <Layers size={32} className="text-white" />
            <div className="absolute -inset-1 rounded-2xl bg-blue-500/20 blur-xl -z-10" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">
            Good to See You!
          </h1>
          <p className="text-slate-400 text-sm font-medium tracking-wide">
            How Can I be an Assistance?
          </p>
          <p className="text-slate-600 text-[11px] mt-1 tracking-wider uppercase">
            v4-flash running 24/7 for you
          </p>
        </div>

        {/* BOTTOM FLOATING CONTROL PANEL AND DISPATCHER */}
        <div className="w-full max-w-3xl flex flex-col items-center gap-4">
          <div className="relative w-full rounded-2xl bg-[#0c1328]/80 border border-blue-500/10 backdrop-blur-md shadow-2xl focus-within:border-blue-500/30 transition-all p-2">
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Ask anything..."
              rows={1}
              className="w-full resize-none bg-transparent py-3 pl-4 pr-12 text-sm text-slate-200 placeholder-slate-500 outline-none focus:ring-0 max-h-36 min-h-[44px] whitespace-pre-wrap"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  // Dispatch function link here
                  setMessageInput("");
                }
              }}
            />
            
            {/* Input Action Controls Container */}
            <div className="absolute right-4 bottom-4 flex items-center gap-2">
              <button className="rounded-lg p-1.5 text-slate-500 hover:bg-blue-500/10 hover:text-blue-400 transition-colors">
                <Search size={16} />
              </button>
              <button className="rounded-xl bg-blue-600 p-2 text-white hover:bg-blue-500 shadow-md shadow-blue-500/20 transition-all">
                <Send size={14} />
              </button>
            </div>
          </div>

          {/* Pill Tags / Micro-action triggers underneath input context */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl px-2">
            <button className="flex items-center gap-1.5 rounded-full border border-blue-500/5 bg-[#0c1328]/40 px-3 py-1.5 text-[11px] font-medium text-slate-400 hover:border-blue-500/20 hover:bg-blue-500/5 hover:text-slate-200 transition-all">
              <Plus size={10} className="text-blue-500" /> Who developed you?
            </button>
            <button className="flex items-center gap-1.5 rounded-full border border-blue-500/5 bg-[#0c1328]/40 px-3 py-1.5 text-[11px] font-medium text-slate-400 hover:border-blue-500/20 hover:bg-blue-500/5 hover:text-slate-200 transition-all">
              <Plus size={10} className="text-blue-500" /> Run automated tasks loop
            </button>
            <button className="flex items-center gap-1.5 rounded-full border border-blue-500/5 bg-[#0c1328]/40 px-3 py-1.5 text-[11px] font-medium text-slate-400 hover:border-blue-500/20 hover:bg-blue-500/5 hover:text-slate-200 transition-all">
              <Plus size={10} className="text-blue-500" /> Check systemic workspace nodes
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}