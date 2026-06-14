"use client";

import React, { useState } from "react";

export default function LoopWorkspace() {
  const [activeView, setActiveView] = useState("chat");

  // Icons as simple SVG components to keep this file self-contained
  const Icons = {
    Chat: () => <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
    Email: () => <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    File: () => <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    Calendar: () => <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    Billing: () => <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
    Settings: () => <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    Paperclip: () => <svg className="w-6 h-6 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>,
    Send: () => <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V6m0 0l-8 8m8-8l8 8" /></svg>,
  };

  const NavItem = ({ id, label, icon: Icon }: { id: string, label: string, icon: React.ElementType }) => (
    <button
      onClick={() => setActiveView(id)}
      className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
        activeView === id 
          ? "bg-[#2563EB]/10 text-[#2563EB] font-medium" 
          : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
      }`}
    >
      <Icon />
      {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-[#FFFFFF] text-[#0F172A] font-sans overflow-hidden">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="w-[280px] border-r border-[#E2E8F0] flex flex-col justify-between flex-shrink-0 bg-white">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 pl-2">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-xl font-semibold tracking-tight">Loop</span>
          </div>

          {/* Primary Navigation */}
          <nav className="space-y-1 mb-8">
            <NavItem id="chat" label="AI Chat" icon={Icons.Chat} />
            <NavItem id="email" label="Email" icon={Icons.Email} />
            <NavItem id="files" label="Files" icon={Icons.File} />
            <NavItem id="calendar" label="Calendar" icon={Icons.Calendar} />
          </nav>

          {/* Account Navigation */}
          <div className="pt-6 border-t border-[#E2E8F0]">
            <nav className="space-y-1">
              <NavItem id="billing" label="Billing" icon={Icons.Billing} />
              <NavItem id="settings" label="Settings" icon={Icons.Settings} />
            </nav>
          </div>
        </div>

        {/* Bottom Profile */}
        <div className="p-6 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-medium border border-[#E2E8F0]">
              AM
            </div>
            <div>
              <div className="text-sm font-medium">Amin Jamal</div>
              <div className="text-xs text-[#64748B]">Pro Plan</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= MAIN WORKSPACE ================= */}
      <main className="flex-1 flex flex-col relative h-full bg-white">
        
        {/* VIEW: CHAT (The Core Interface) */}
        {activeView === "chat" && (
          <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-12 overflow-y-auto pb-40">
            <h1 className="text-[40px] font-medium tracking-tight mb-2">Good Morning.</h1>
            <p className="text-[#64748B] text-xl mb-12 font-normal">What would you like Loop to do today?</p>

            {/* Action Grid */}
            <div className="grid grid-cols-2 gap-4 mb-16">
              {[
                { title: "Draft an Email", desc: "Write a professional update to the team" },
                { title: "Create a Meeting", desc: "Schedule a sync for next week" },
                { title: "Analyze a File", desc: "Extract insights from a PDF or CSV" },
                { title: "Research a Topic", desc: "Gather data on a specific subject" }
              ].map((action, i) => (
                <div 
                  key={i} 
                  className="group border border-[#E2E8F0] rounded-[16px] p-6 hover:border-[#2563EB] cursor-pointer transition-all hover:shadow-sm"
                >
                  <div className="text-lg font-medium mb-1 group-hover:text-[#2563EB] transition-colors">{action.title}</div>
                  <div className="text-sm text-[#64748B]">{action.desc}</div>
                </div>
              ))}
            </div>

            {/* AI Assistant Panel */}
            <div className="bg-slate-50 border border-[#E2E8F0] rounded-[16px] p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded bg-[#2563EB] flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="font-medium text-lg">Loop</span>
              </div>
              <p className="text-[#64748B] text-base mb-4">I can help you:</p>
              <ul className="text-[#0F172A] space-y-2 mb-6 ml-1">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span> Draft and send emails</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span> Analyze documents</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span> Schedule meetings</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span> Organize information</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span> Answer questions</li>
              </ul>
              <p className="font-medium text-lg">What would you like to do?</p>
            </div>
          </div>
        )}

        {/* VIEW: EMAIL */}
        {activeView === "email" && (
          <div className="flex-1 max-w-4xl mx-auto w-full p-12">
            <h1 className="text-3xl font-medium mb-4">Email</h1>
            <p className="text-[#64748B] text-lg mb-8 max-w-lg">Connect your Gmail account and allow Loop to draft, send and follow up on emails.</p>
            <button className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
              Connect Gmail
            </button>
          </div>
        )}

        {/* VIEW: FILES */}
        {activeView === "files" && (
          <div className="flex-1 max-w-4xl mx-auto w-full p-12">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h1 className="text-3xl font-medium mb-4">Files</h1>
                <p className="text-[#64748B] text-lg max-w-lg">Upload documents, spreadsheets, PDFs and reports. Loop can analyze and compare them.</p>
              </div>
              <button className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                Upload File
              </button>
            </div>
            
            <div className="border border-dashed border-[#E2E8F0] rounded-[16px] p-16 text-center bg-slate-50">
              <p className="text-[#64748B] mb-2">No files uploaded yet.</p>
              <p className="text-sm text-slate-400">Supported: PDF, Excel, Word, CSV, Images</p>
            </div>
          </div>
        )}

        {/* VIEW: CALENDAR */}
        {activeView === "calendar" && (
          <div className="flex-1 max-w-4xl mx-auto w-full p-12">
            <h1 className="text-3xl font-medium mb-4">Calendar</h1>
            <p className="text-[#64748B] text-lg mb-8 max-w-lg">Connect your calendar and allow Loop to schedule and manage meetings.</p>
            <button className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors mb-12">
              Connect Calendar
            </button>
            <div className="text-[#64748B]">No upcoming meetings.</div>
          </div>
        )}

        {/* VIEW: BILLING */}
        {activeView === "billing" && (
          <div className="flex-1 max-w-4xl mx-auto w-full p-12">
            <h1 className="text-3xl font-medium mb-12">Billing</h1>
            <div className="border border-[#E2E8F0] rounded-[16px] p-8 max-w-xl">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[#64748B]">Current Plan</span>
                <span className="font-medium">Pro</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[#64748B]">Status</span>
                <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-sm font-medium">Active</span>
              </div>
              <div className="flex justify-between items-center mb-8 pb-8 border-b border-[#E2E8F0]">
                <span className="text-[#64748B]">Renewal Date</span>
                <span className="font-medium">Oct 14, 2026</span>
              </div>
              <button className="w-full border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-6 py-3 rounded-xl font-medium transition-colors">
                Upgrade Plan
              </button>
            </div>
          </div>
        )}

        {/* VIEW: SETTINGS */}
        {activeView === "settings" && (
          <div className="flex-1 max-w-4xl mx-auto w-full p-12">
            <h1 className="text-3xl font-medium mb-12">Settings</h1>
            <div className="max-w-xl space-y-4">
              {['Profile', 'Password', 'Notifications', 'Connected Accounts', 'Security'].map((item) => (
                <div key={item} className="flex justify-between items-center p-4 hover:bg-slate-50 rounded-xl cursor-pointer border border-transparent hover:border-[#E2E8F0] transition-all">
                  <span className="font-medium">{item}</span>
                  <span className="text-[#64748B]">&rarr;</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= FLOATING COMMAND INPUT (Always visible in Chat) ================= */}
        {activeView === "chat" && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-12 pb-8 px-12">
            <div className="max-w-4xl mx-auto">
              <div className="relative flex items-center bg-white border border-[#E2E8F0] rounded-[16px] shadow-sm hover:shadow-md transition-shadow focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB]">
                <button className="absolute left-4 p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Icons.Paperclip />
                </button>
                <input 
                  type="text"
                  className="w-full py-5 pl-16 pr-16 text-lg bg-transparent outline-none placeholder-[#64748B]"
                  placeholder="Ask Loop anything..."
                />
                <button className="absolute right-3 p-2.5 bg-[#2563EB] hover:bg-blue-700 rounded-xl transition-colors">
                  <Icons.Send />
                </button>
              </div>
              <div className="text-center mt-3 text-xs text-[#64748B]">
                Loop can make mistakes. Consider verifying important information.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}