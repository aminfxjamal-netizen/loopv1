'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageSquareCode, 
  Repeat, 
  Mail, 
  HardDrive, 
  Calendar, 
  CreditCard, 
  Settings, 
  Plus, 
  Search, 
  Send, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';

// --- TYPE DEFINITIONS FOR HONEST DATA ---
type PlanType = 'Trial' | 'Starter' | 'Pro';

interface UserProfile {
  name: string;
  avatarUrl: string | null;
  currentPlan: PlanType;
  trialDaysRemaining: number;
}

export default function LoopWorkspace() {
  // 1. Core State Management
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [chatInput, setChatInput] = useState<string>('');
  
  // Real App Data Structures (Empty states triggered natively when empty arrays/nulls are evaluated)
  const [userProfile] = useState<UserProfile>({
    name: "Amin Jamal",
    avatarUrl: null, // Triggers clean text fallback badge
    currentPlan: "Trial",
    trialDaysRemaining: 11,
  });

  const [activeLoops] = useState<any[]>([]);
  const [tokenUsage] = useState<null | { used: number; total: number }>(null);
  const [automationHistory] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  // Channel Connection States
  const [isGmailConnected, setIsGmailConnected] = useState<boolean>(false);
  const [isOutlookConnected, setIsOutlookConnected] = useState<boolean>(false);
  const [isDriveConnected, setIsDriveConnected] = useState<boolean>(false);
  const [isCalendarConnected, setIsCalendarConnected] = useState<boolean>(false);

  // Suggested starter actions for the AI Chat interface
  const suggestedActions = [
    "Summarize documents",
    "Analyze emails",
    "Create automation",
    "Plan a project"
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FFFFFF] font-sans antialiased text-[#111827]">
      
      {/* ================= SIDEBAR COMPONENT ================= */}
      <aside className="w-64 border-r border-[#E5E7EB] flex flex-col justify-between bg-[#FFFFFF] shrink-0 select-none">
        
        <div className="flex flex-col overflow-y-auto pt-5 px-4 space-y-6">
          {/* Loop Corporate Brand Identifier */}
          <div className="flex items-center space-x-2.5 px-2">
            <div className="h-6 w-6 rounded-md bg-[#2563EB] flex items-center justify-center shadow-sm shadow-[#2563EB]/40">
              <span className="text-[#FFFFFF] text-xs font-black tracking-tighter">L</span>
            </div>
            <span className="text-md font-semibold tracking-tight text-[#111827]">Loop Agent</span>
          </div>

          {/* Navigation Links Render block */}
          <nav className="space-y-6">
            {/* Group: Core Infrastructure */}
            <div>
              <p className="px-2 text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">Core App Navigation</p>
              <div className="mt-2 space-y-0.5">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 text-sm rounded-md font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-[#F3F4F6] text-[#2563EB]' : 'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]'}`}
                >
                  <LayoutDashboard className="h-4 w-4 shrink-0" />
                  <span>Dashboard Overview</span>
                </button>
                <button 
                  onClick={() => setActiveTab('chat')}
                  className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 text-sm rounded-md font-medium transition-colors ${activeTab === 'chat' ? 'bg-[#F3F4F6] text-[#2563EB]' : 'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]'}`}
                >
                  <MessageSquareCode className="h-4 w-4 shrink-0" />
                  <span>AI Chat</span>
                </button>
                <button 
                  onClick={() => setActiveTab('loops')}
                  className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 text-sm rounded-md font-medium transition-colors ${activeTab === 'loops' ? 'bg-[#F3F4F6] text-[#2563EB]' : 'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]'}`}
                >
                  <Repeat className="h-4 w-4 shrink-0" />
                  <span>Automated Loops</span>
                </button>
              </div>
            </div>

            {/* Group: Integrations Matrix */}
            <div>
              <p className="px-2 text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">Connected Channels</p>
              <div className="mt-2 space-y-0.5">
                <button 
                  onClick={() => setActiveTab('email')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-sm rounded-md font-medium transition-colors ${activeTab === 'email' ? 'bg-[#F3F4F6] text-[#2563EB]' : 'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]'}`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span>Email Inbox</span>
                  </div>
                  <span className={`h-1.5 w-1.5 rounded-full ${isGmailConnected || isOutlookConnected ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                </button>
                <button 
                  onClick={() => setActiveTab('drive')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-sm rounded-md font-medium transition-colors ${activeTab === 'drive' ? 'bg-[#F3F4F6] text-[#2563EB]' : 'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]'}`}
                >
                  <div className="flex items-center space-x-2.5">
                    <HardDrive className="h-4 w-4 shrink-0" />
                    <span>Google Drive</span>
                  </div>
                  <span className={`h-1.5 w-1.5 rounded-full ${isDriveConnected ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                </button>
                <button 
                  onClick={() => setActiveTab('calendar')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-sm rounded-md font-medium transition-colors ${activeTab === 'calendar' ? 'bg-[#F3F4F6] text-[#2563EB]' : 'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]'}`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>Calendar Scheduling</span>
                  </div>
                  <span className={`h-1.5 w-1.5 rounded-full ${isCalendarConnected ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                </button>
              </div>
            </div>

            {/* Group: Account Matrix & Trial Info Engine */}
            <div>
              <p className="px-2 text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">Account & Subscription</p>
              <div className="mt-2 space-y-1.5">
                <button 
                  onClick={() => setActiveTab('billing')}
                  className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 text-sm rounded-md font-medium transition-colors ${activeTab === 'billing' ? 'bg-[#F3F4F6] text-[#2563EB]' : 'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]'}`}
                >
                  <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect width='20' height='14' x='2' y='5' rx='2'/><line x1='2' x2='22' y1='10' y2='10'/></svg>" className="h-4 w-4 shrink-0 opacity-70" alt="" />
                  <span>Billing / Status</span>
                </button>

                {/* Highly visible dynamic native runtime system billing status container */}
                <div className="mx-0.5 p-3 rounded-lg border border-[#E5E7EB] bg-[#FAFAFA]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#6B7280]">Current Framework</span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-[#2563EB] border border-blue-100">
                      {userProfile.currentPlan} Plan
                    </span>
                  </div>
                  {userProfile.currentPlan === 'Trial' && (
                    <div className="mt-2">
                      <div className="text-xs font-bold text-[#111827]">{userProfile.trialDaysRemaining} Days Remaining</div>
                      <div className="w-full bg-[#E5E7EB] h-1 rounded-full mt-1.5 overflow-hidden">
                        <div className="bg-[#2563EB] h-full rounded-full" style={{ width: `${(userProfile.trialDaysRemaining / 14) * 100}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Group: Administrative Control Configuration */}
            <div>
              <p className="px-2 text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">Settings</p>
              <div className="mt-2">
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 text-sm rounded-md font-medium transition-colors ${activeTab === 'settings' ? 'bg-[#F3F4F6] text-[#2563EB]' : 'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]'}`}
                >
                  <Settings className="h-4 w-4 shrink-0" />
                  <span>Workspace Settings</span>
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* ================= SIDEBAR FOOTER CARD ================= */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#FAFAFA] flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            {userProfile.avatarUrl ? (
              <img src={userProfile.avatarUrl} alt={userProfile.name} className="h-9 w-9 rounded-full object-cover border border-[#E5E7EB]" />
            ) : (
              <div className="h-9 w-9 rounded-full bg-[#2563EB] flex items-center justify-center font-bold text-sm text-[#FFFFFF] shrink-0 shadow-sm">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-[#111827] truncate">{userProfile.name}</span>
              <span className="text-[11px] font-medium text-[#6B7280] truncate">{userProfile.currentPlan} Tier</span>
            </div>
          </div>
          <button title="Sign out" className="p-1.5 text-[#6B7280] hover:text-[#EF4444] rounded-md transition-colors hover:bg-red-50">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* ================= MAIN OPERATING TERMINAL COMPONENT ================= */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-[#FFFFFF]">
        
        {/* ================= INTERNET INFRASTRUCTURE REGULAR HEADER ================= */}
        <header className="h-14 border-b border-[#E5E7EB] px-8 flex items-center justify-between bg-[#FFFFFF] shrink-0 select-none">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-[#6B7280]">Welcome back,</span>
            <span className="text-sm font-semibold text-[#111827]">loop-v1 workspace</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#9CA3AF]" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-48 pl-8 pr-3 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-xs font-medium focus:outline-none focus:border-[#2563EB] focus:bg-[#FFFFFF] transition-all"
              />
            </div>
            <button 
              onClick={() => setActiveTab('chat')}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#9CA3AF] text-xs font-semibold rounded-md transition-colors"
            >
              <Plus className="h-3.5 w-3.5 text-[#4B5563]" />
              <span>New Chat</span>
            </button>
            <button 
              onClick={() => setActiveTab('loops')}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] text-xs font-semibold rounded-md shadow-sm transition-colors"
            >
              <Repeat className="h-3.5 w-3.5" />
              <span>Create Loop</span>
            </button>
          </div>
        </header>

        {/* ================= APP PANELS BODY ================= */}
        <div className="flex-1 overflow-y-auto bg-[#FFFFFF] p-8">
          
          {/* CONTROL PANEL INDEX: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="max-w-5xl mx-auto space-y-8">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[#111827]">Dashboard Overview</h1>
                <p className="text-sm text-[#6B7280] mt-0.5">Control center for your active automation pipelines.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Active Automated Infrastructure Pipeline Loops Card */}
                <div className="md:col-span-2 border border-[#E5E7EB] rounded-xl p-5 flex flex-col justify-between bg-[#FFFFFF]">
                  <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
                    <h3 className="text-sm font-semibold text-[#111827]">Active Loops</h3>
                    <span className="text-xs font-mono px-2 py-0.5 bg-[#F3F4F6] text-[#4B5563] rounded-full">{activeLoops.length}</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
                    <AlertCircle className="h-7 w-7 text-[#9CA3AF] mb-2.5 stroke-[1.5]" />
                    <p className="text-sm font-medium text-[#4B5563]">No active loops yet.</p>
                    <p className="text-xs text-[#9CA3AF] mt-1 max-w-xs">Deploy background tasks or connect workflow channels to spin up automated workers.</p>
                  </div>
                </div>

                {/* Real Operational Engine Token Usage Card */}
                <div className="border border-[#E5E7EB] rounded-xl p-5 flex flex-col justify-between bg-[#FFFFFF]">
                  <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
                    <h3 className="text-sm font-semibold text-[#111827]">Token Usage</h3>
                  </div>
                  {tokenUsage ? (
                    <div className="pt-4 space-y-3">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-[#6B7280]">Consumption</span>
                        <span className="text-[#111827] font-semibold">{tokenUsage.used} / {tokenUsage.total}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
                      <p className="text-sm font-medium text-[#4B5563]">No usage data available.</p>
                      <p className="text-xs text-[#9CA3AF] mt-1">Metrics update immediately dynamically when an operational loop fires.</p>
                    </div>
                  )}
                </div>

              </div>

              {/* Complete System Runtime Activity Log History Database Card */}
              <div className="border border-[#E5E7EB] rounded-xl p-5 bg-[#FFFFFF]">
                <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
                  <h3 className="text-sm font-semibold text-[#111827]">Automation History</h3>
                </div>
                {automationHistory.length > 0 ? (
                  <div className="divide-y divide-[#E5E7EB]"></div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="h-8 w-8 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg flex items-center justify-center text-[#9CA3AF] mb-3">
                      <Repeat className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-medium text-[#4B5563]">No automation history yet.</p>
                    <p className="text-xs text-[#9CA3AF] mt-1">A transparent transactional record of your background workers will print here.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CONTROL PANEL INDEX: AI CHAT TERMINAL INTERFACE */}
          {activeTab === 'chat' && (
            <div className="max-w-4xl mx-auto h-[calc(100vh-10rem)] flex flex-col border border-[#E5E7EB] bg-[#FFFFFF] rounded-xl overflow-hidden shadow-sm">
              
              {/* Dynamic Dialogue Stream Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FFFFFF]">
                {chatMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-4">
                    <div className="h-10 w-10 bg-blue-50 text-[#2563EB] rounded-xl flex items-center justify-center mb-4 border border-blue-100 shadow-sm">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h2 className="text-md font-semibold text-[#111827]">Start your first conversation with Loop.</h2>
                    <p className="text-xs text-[#6B7280] mt-1 max-w-sm">Directly interface with Loop LLM to perform deep file parsing, write complex rules, or manage data models.</p>
                    
                    {/* Action shortcuts block wrapper list view */}
                    <div className="grid grid-cols-2 gap-3 mt-8 w-full max-w-md">
                      {suggestedActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => setChatInput(action)}
                          className="p-3 bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#9CA3AF] text-left rounded-lg text-xs font-semibold text-[#4B5563] transition-colors flex items-center justify-between group"
                        >
                          <span>{action}</span>
                          <ChevronRight className="h-3 w-3 text-[#9CA3AF] group-hover:text-[#111827] transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Real-time system log dialogue list elements render cleanly here */}
                  </div>
                )}
              </div>

              {/* Dynamic Command Input Stream Module Box */}
              <div className="p-4 border-t border-[#E5E7EB] bg-[#FAFAFA]">
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center space-x-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-1.5 focus-within:border-[#2563EB] transition-colors shadow-sm">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask Loop Agent to build an automation or analyze data..." 
                    className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none placeholder-[#9CA3AF]"
                  />
                  <button 
                    type="submit"
                    className="p-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] rounded-md transition-colors shadow-sm"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* CONTROL PANEL INDEX: BACKGROUND AUTOMATED PIPELINES LOG */}
          {activeTab === 'loops' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-[#111827]">Automated Loops</h1>
                  <p className="text-sm text-[#6B7280] mt-0.5">Deploy, maintain, and inspect persistent background AI agents.</p>
                </div>
              </div>

              <div className="border border-[#E5E7EB] rounded-xl bg-[#FFFFFF] overflow-hidden">
                {activeLoops.length > 0 ? (
                  <table className="w-full text-left border-collapse">
                    {/* Structured dynamic engine properties column definition data schema headings */}
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="h-10 w-10 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl flex items-center justify-center text-[#9CA3AF] mb-3">
                      <Repeat className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium text-[#4B5563]">No automated loops created yet.</p>
                    <p className="text-xs text-[#9CA3AF] mt-1 max-w-sm">When you configure background triggers, they will display here with tracking metrics, run statuses, and action logs.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CONTROL PANEL INDEX: ELECTRONIC MAIL COMMUNICATIONS INBOX SYSTEM */}
          {activeTab === 'email' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[#111827]">Email Inbox Channel</h1>
                <p className="text-sm text-[#6B7280] mt-0.5">Let Loop Agent read, triage, draft, and respond to incoming inquiries dynamically.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Provider Block: Google Suite Suite Platform Integration System */}
                <div className="border border-[#E5E7EB] rounded-xl p-6 bg-[#FFFFFF] flex flex-col justify-between h-48 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-[#111827]">Google Gmail Engine</h3>
                      <div className="flex items-center space-x-1.5 text-xs text-[#6B7280]">
                        <span className={`h-2 w-2 rounded-full ${isGmailConnected ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                        <span>{isGmailConnected ? 'Connected & Synced' : 'Not Connected'}</span>
                      </div>
                    </div>
                    <div className="h-8 w-8 rounded-lg bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-center font-bold text-[#4B5563] text-xs select-none">G</div>
                  </div>
                  
                  <button 
                    onClick={() => setIsGmailConnected(!isGmailConnected)}
                    className={`w-full py-2 text-center text-xs font-semibold rounded-md transition-colors border ${isGmailConnected ? 'bg-[#FFFFFF] border-red-200 text-red-600 hover:bg-red-50' : 'bg-[#FFFFFF] border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#111827]'}`}
                  >
                    {isGmailConnected ? 'Disconnect Account' : 'Connect Gmail'}
                  </button>
                </div>

                {/* Provider Block: Microsoft Corporate Exchange Suite Integration System */}
                <div className="border border-[#E5E7EB] rounded-xl p-6 bg-[#FFFFFF] flex flex-col justify-between h-48 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-[#111827]">Microsoft Outlook Cloud</h3>
                      <div className="flex items-center space-x-1.5 text-xs text-[#6B7280]">
                        <span className={`h-2 w-2 rounded-full ${isOutlookConnected ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                        <span>{isOutlookConnected ? 'Connected & Synced' : 'Not Connected'}</span>
                      </div>
                    </div>
                    <div className="h-8 w-8 rounded-lg bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-center font-bold text-[#4B5563] text-xs select-none">O</div>
                  </div>
                  
                  <button 
                    onClick={() => setIsOutlookConnected(!isOutlookConnected)}
                    className={`w-full py-2 text-center text-xs font-semibold rounded-md transition-colors border ${isOutlookConnected ? 'bg-[#FFFFFF] border-red-200 text-red-600 hover:bg-red-50' : 'bg-[#FFFFFF] border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#111827]'}`}
                  >
                    {isOutlookConnected ? 'Disconnect Account' : 'Connect Outlook'}
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* CONTROL PANEL INDEX: GOOGLE STORAGE DRIVE INTERFACES NETWORK */}
          {activeTab === 'drive' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[#111827]">Google Drive Cloud Storage</h1>
                <p className="text-sm text-[#6B7280] mt-0.5">Authorise secure root level access paths for automatic documentation parsing pipelines.</p>
              </div>

              <div className="border border-[#E5E7EB] rounded-xl bg-[#FFFFFF] p-8 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-100 mb-4 shadow-sm">
                  <HardDrive className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-semibold text-[#111827]">Manage cloud storage access</h3>
                <p className="text-xs text-[#6B7280] mt-1 max-w-sm mb-6">Connect your workspace system to index structured folders, evaluate documents, and drop outputs straight into Drive.</p>
                
                <button 
                  onClick={() => setIsDriveConnected(!isDriveConnected)}
                  className={`px-5 py-2 text-xs font-semibold rounded-md shadow-sm transition-colors ${isDriveConnected ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' : 'bg-[#2563EB] text-[#FFFFFF] hover:bg-[#1D4ED8]'}`}
                >
                  {isDriveConnected ? 'Disconnect Google Drive Access' : 'Connect Google Drive'}
                </button>

                {isDriveConnected && (
                  <div className="mt-8 pt-6 border-t border-[#F3F4F6] w-full max-w-md text-left space-y-2">
                    <div className="flex items-center justify-between p-2.5 bg-[#FAFAFA] border border-[#E5E7EB] rounded-lg text-xs">
                      <span className="font-mono text-[#4B5563]">Connected folders</span>
                      <span className="font-semibold text-emerald-600">All Sync Roots Active</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-[#FAFAFA] border border-[#E5E7EB] rounded-lg text-xs">
                      <span className="font-mono text-[#4B5563]">Permission status</span>
                      <span className="font-semibold text-[#111827]">Read / Write Explicit</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CONTROL PANEL INDEX: CRON SCHEDULING CALENDAR OPERATIONS ENGINE */}
          {activeTab === 'calendar' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[#111827]">Calendar Scheduling</h1>
                <p className="text-sm text-[#6B7280] mt-0.5">Let Loop Agent program calendar routes, set appointments, and prevent overlaps.</p>
              </div>

              <div className="border border-[#E5E7EB] rounded-xl bg-[#FFFFFF] p-8 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-gray-50 text-[#4B5563] flex items-center justify-center border border-[#E5E7EB] mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-semibold text-[#111827]">No calendar connected.</h3>
                <p className="text-xs text-[#6B7280] mt-1 max-w-sm mb-6">Link your Cal.com, Google Calendar, or Outlook schedule network to instantiate automated tracking workflows.</p>
                
                <button 
                  onClick={() => setIsCalendarConnected(!isCalendarConnected)}
                  className="px-4 py-2 bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#9CA3AF] text-xs font-semibold rounded-md transition-colors shadow-sm"
                >
                  Connect Calendar Network
                </button>
              </div>
            </div>
          )}

          {/* CONTROL PANEL INDEX: SYSTEM BILLING & PRICING INFRASTRUCTURE GATE */}
          {activeTab === 'billing' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[#111827]">Billing / Framework Status</h1>
                <p className="text-sm text-[#6B7280] mt-0.5">Maintain, adjust, upgrade, or change payment frameworks.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 border border-[#E5E7EB] rounded-xl p-6 bg-[#FFFFFF] space-y-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-[#111827]">Account Diagnostics Summary</h3>
                  <div className="divide-y divide-[#F3F4F6] text-xs">
                    <div className="flex justify-between py-3">
                      <span className="text-[#6B7280]">Current Plan</span>
                      <span className="font-bold text-[#2563EB]">{userProfile.currentPlan} Framework</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-[#6B7280]">Trial Status</span>
                      <span className="font-medium text-[#111827]">{userProfile.trialDaysRemaining} Days Active Left</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-[#6B7280]">Renewal Date</span>
                      <span className="font-medium text-[#111827]">June 24, 2026</span>
                    </div>
                  </div>
                </div>

                <div className="border border-blue-100 rounded-xl p-6 bg-blue-50/50 flex flex-col justify-between shadow-sm">
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-[#111827]">Unlock Pro Engine</h4>
                    <p className="text-xs text-[#4B5563] leading-relaxed">Remove the 14-day pipeline constraints, enable persistent webhook workers, and unlock unrestricted scaling nodes.</p>
                  </div>
                  <button className="w-full mt-6 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] text-xs font-semibold rounded-md shadow-sm transition-colors">
                    Upgrade Production Infrastructure
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CONTROL PANEL INDEX: SECURE ENTERPRISE WORKSPACE PREFERENCES CONFIG */}
          {activeTab === 'settings' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[#111827]">Workspace Settings</h1>
                <p className="text-sm text-[#6B7280] mt-0.5">Manage keys, user identity details, encryption nodes, and preferences.</p>
              </div>

              <div className="border border-[#E5E7EB] rounded-xl bg-[#FFFFFF] divide-y divide-[#E5E7EB] shadow-sm">
                
                {/* Nested preference row: Account Settings */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Profile Settings</h3>
                    <p className="text-xs text-[#6B7280] mt-0.5">Identity mapping data variables.</p>
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#4B5563] uppercase">Full Name</label>
                      <input type="text" defaultValue={userProfile.name} className="mt-1 block w-full max-w-md px-3 py-1.5 bg-[#FAFAFA] border border-[#E5E7EB] rounded-md text-sm text-[#111827] focus:outline-none focus:border-[#2563EB] focus:bg-[#FFFFFF]" />
                    </div>
                  </div>
                </div>

                {/* Nested preference row: API Infrastructure Credentials Manager */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">API Cryptographic Keys</h3>
                    <p className="text-xs text-[#6B7280] mt-0.5">Endpoints for communication nodes.</p>
                  </div>
                  <div className="md:col-span-2">
                    <div className="p-3 bg-[#FAFAFA] border border-[#E5E7EB] rounded-lg flex items-center justify-between text-xs max-w-md">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="font-mono font-medium text-[#4B5563]">Loop Secret Framework Node</span>
                      </div>
                      <span className="text-[#9CA3AF] font-mono select-none">••••••••••••••••</span>
                    </div>
                  </div>
                </div>

                {/* Nested preference row: Global System Security */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Security Settings</h3>
                    <p className="text-xs text-[#6B7280] mt-0.5">System access management logs.</p>
                  </div>
                  <div className="md:col-span-2 flex items-center text-xs text-[#4B5563] font-medium space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Data at rest and transit is completely encrypted with AES-256 standard constraints.</span>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}