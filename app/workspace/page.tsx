'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageSquareCode, 
  Mail, 
  HardDrive, 
  Calendar, 
  Settings, 
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

// Define our strict plan types
type UserPlan = 'Free Trial' | 'Basic' | 'Pro';

export default function LoopWorkspace() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Change this state to test: 'Free Trial', 'Basic', or 'Pro'
  const [currentPlan, setCurrentPlan] = useState<UserPlan>('Free Trial');
  const [daysRemaining, setDaysRemaining] = useState<number>(14);

  return (
    <div className="flex h-screen w-screen bg-[#FFFFFF] font-sans antialiased text-[#111827]">
      
      {/* ================= SIDEBAR COMPONENT ================= */}
      <aside className="w-64 border-r border-[#E5E7EB] flex flex-col justify-between bg-[#FFFFFF] p-4 shrink-0 select-none">
        <div className="flex flex-col space-y-6">
          
          {/* Logo */}
          <div className="flex items-center space-x-2.5 px-2">
            <div className="h-6 w-6 rounded-md bg-[#2563EB] flex items-center justify-center">
              <span className="text-[#FFFFFF] text-xs font-black">L</span>
            </div>
            <span className="text-md font-semibold tracking-tight">Loop</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 text-sm rounded-md font-medium bg-[#F3F4F6] text-[#2563EB]">
              <MessageSquareCode className="h-4 w-4" />
              <span>AI Chat</span>
            </button>
            <button className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 text-sm rounded-md font-medium text-[#4B5563] hover:bg-[#F9FAFB]">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </button>
            <button className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 text-sm rounded-md font-medium text-[#4B5563] hover:bg-[#F9FAFB]">
              <HardDrive className="h-4 w-4" />
              <span>Google Drive</span>
            </button>
            <button className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 text-sm rounded-md font-medium text-[#4B5563] hover:bg-[#F9FAFB]">
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </button>
            <button className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 text-sm rounded-md font-medium text-[#4B5563] hover:bg-[#F9FAFB]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
              <span>Billing</span>
            </button>
            <button className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 text-sm rounded-md font-medium text-[#4B5563] hover:bg-[#F9FAFB]">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* ================= DYNAMIC SUBSCRIPTION CARD NODE ================= */}
        <div className="mt-auto pt-4 border-t border-[#E5E7EB]">
          {currentPlan === 'Free Trial' && (
            <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50">
              <div className="flex items-center space-x-2 text-amber-800">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="text-xs font-semibold">Trial Plan</span>
              </div>
              <p className="mt-1.5 text-xs text-amber-700 font-medium">
                Your trial is about to end! You have <span className="font-bold text-amber-900">{daysRemaining} days remaining</span>.
              </p>
              <button className="mt-3 w-full inline-flex items-center justify-center space-x-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg shadow-sm transition-colors">
                <span>Upgrade Plan</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          )}

          {currentPlan === 'Basic' && (
            <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-[#FAFAFA]">
              <div className="flex items-center space-x-2 text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold">Basic Plan Active</span>
              </div>
              <p className="mt-1 text-[11px] text-[#6B7280]">
                Running on core single-operator nodes. Scale your computing infrastructure anytime.
              </p>
              <button className="mt-3 w-full inline-flex items-center justify-center space-x-1 px-3 py-1.5 text-xs font-semibold text-[#2563EB] bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] rounded-lg transition-colors">
                <span>Upgrade to Pro</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          )}

          {currentPlan === 'Pro' && (
            <div className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/30">
              <div className="flex items-center space-x-2 text-indigo-900">
                <Sparkles className="h-4 w-4 text-indigo-600 shrink-0" />
                <span className="text-xs font-bold tracking-tight">Loop Pro Activated</span>
              </div>
              <p className="mt-1 text-[11px] text-indigo-700/90">
                Unrestricted enterprise pipeline container. All autonomous loops active.
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* ================= MAIN CONTENT WORKSPACE ================= */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 bg-[#FAFAFA]">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#111827]">Welcome to Loop</h1>
            <p className="text-sm text-[#6B7280]">Your AI Workspace for modern work.</p>
            <p className="text-xs text-[#9CA3AF]">Connect your tools, start conversations, and manage everything from one place.</p>
          </div>

          {/* Action Integration Flow Grid */}
          <div className="grid grid-cols-1 gap-2.5 pt-2">
            <button className="flex items-center justify-between px-4 py-2.5 text-sm font-medium border border-[#E5E7EB] rounded-xl hover:bg-[#F9FAFB] transition-colors">
              <span>Connect Gmail</span>
              <span className="text-xs text-[#2563EB]">Setup node</span>
            </button>
            <button className="flex items-center justify-between px-4 py-2.5 text-sm font-medium border border-[#E5E7EB] rounded-xl hover:bg-[#F9FAFB] transition-colors">
              <span>Connect Outlook</span>
              <span className="text-xs text-[#2563EB]">Setup node</span>
            </button>
            <button className="flex items-center justify-between px-4 py-2.5 text-sm font-medium border border-[#E5E7EB] rounded-xl hover:bg-[#F9FAFB] transition-colors">
              <span>Connect Google Drive</span>
              <span className="text-xs text-[#2563EB]">Setup node</span>
            </button>
            <button className="flex items-center justify-between px-4 py-2.5 text-sm font-medium border border-[#E5E7EB] rounded-xl hover:bg-[#F9FAFB] transition-colors">
              <span>Connect Calendar</span>
              <span className="text-xs text-[#2563EB]">Setup node</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}