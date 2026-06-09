'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LoopCleanSaaSPage() {
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePane, setActivePane] = useState<'chat' | 'projects' | 'search'>('chat');

  useEffect(() => {
    setMounted(true);
  }, []);

  const faqData = [
    {
      q: "What is Loop?",
      a: "Loop is a unified software application that combines an AI assistant interface, project management task lists, and notes into a single digital workspace container."
    },
    {
      q: "How does the free trial work?",
      a: "You receive full operational access to all core application interfaces for 14 days without restriction. This allows you to completely test the system workflow."
    },
    {
      q: "Do I need a credit card?",
      a: "No. Loop does not ask for or store credit card data during the initial 14-day free trial registration process."
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. You can pause, adjust, or delete your account workspace immediately from your workspace settings tab at any point."
    }
  ];

  return (
    <div className={`min-h-screen bg-[#FFFFFF] text-[#111827] font-sans antialiased transition-opacity duration-500 select-none ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* NAVIGATION */}
      <header className="h-16 border-b border-[#E5E7EB] bg-[#FFFFFF] flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#2563EB] flex items-center justify-center">
              <div className="w-2 h-2 rounded-sm bg-[#FFFFFF]" />
            </div>
            <span className="text-sm font-bold tracking-tight text-[#111827]">Loop</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#6B7280]">
            <Link href="#features" className="hover:text-[#2563EB] transition">Features</Link>
            <Link href="#pricing" className="hover:text-[#2563EB] transition">Pricing</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-xs font-bold text-[#6B7280] hover:text-[#111827] transition">
            Login
          </Link>
          <Link href="/signup" className="h-9 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] text-xs font-semibold rounded-lg transition flex items-center justify-center shadow-sm">
            Start Free Trial
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center space-y-6">
        <div className="inline-flex bg-[#2563EB]/5 border border-[#2563EB]/10 text-[#2563EB] px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wide">
          AI Workspace For Modern Businesses
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#111827] leading-tight">
          Run Your Work From <br />One Intelligent Workspace
        </h1>
        <p className="text-base text-[#6B7280] max-w-xl mx-auto leading-relaxed font-medium">
          Chat with AI, organize projects, manage tasks, and keep everything in one place.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/signup" className="w-full sm:w-auto h-11 px-6 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] text-xs font-bold rounded-xl transition flex items-center justify-center shadow-md">
            Start Free Trial
          </Link>
          <Link href="#pricing" className="w-full sm:w-auto h-11 px-6 border border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#6B7280] text-[#111827] text-xs font-bold rounded-xl transition flex items-center justify-center">
            View Pricing
          </Link>
        </div>
        <div className="text-[11px] font-semibold text-[#9CA3AF] tracking-wide uppercase pt-1">
          14-Day Free Trial • No Credit Card Required
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl shadow-xl overflow-hidden min-h-[360px] flex grid grid-cols-12">
          {/* Showcase Sidebar */}
          <div className="col-span-3 bg-[#F9FAFB] border-r border-[#E5E7EB] p-4 space-y-4 text-left">
            <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Loop Console</div>
            <div className="space-y-1">
              <button onClick={() => setActivePane('chat')} className={`w-full text-left p-2 rounded text-xs font-bold transition ${activePane === 'chat' ? 'bg-[#2563EB]/5 text-[#2563EB]' : 'text-[#6B7280]'}`}>Chat Interface</button>
              <button onClick={() => setActivePane('projects')} className={`w-full text-left p-2 rounded text-xs font-bold transition ${activePane === 'projects' ? 'bg-[#2563EB]/5 text-[#2563EB]' : 'text-[#6B7280]'}`}>Projects</button>
              <button onClick={() => setActivePane('search')} className={`w-full text-left p-2 rounded text-xs font-bold transition ${activePane === 'search' ? 'bg-[#2563EB]/5 text-[#2563EB]' : 'text-[#6B7280]'}`}>Search</button>
              <div className="text-left p-2 text-xs font-bold text-gray-400 cursor-not-allowed">Settings</div>
            </div>
          </div>
          {/* Showcase Display Area */}
          <div className="col-span-9 p-6 text-left bg-[#FFFFFF]">
            {activePane === 'chat' && (
              <div className="space-y-3 font-medium">
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-600 max-w-md">"Outline the goals for our upcoming team milestone."</div>
                <div className="p-3 bg-[#2563EB]/5 border border-[#2563EB]/10 rounded-lg text-xs text-[#111827] max-w-md ml-auto"><strong>Loop AI:</strong> Milestone mapped. I have updated your tracking cards under the projects view configuration tab.</div>
              </div>
            )}
            {activePane === 'projects' && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                {['Draft content roadmap', 'Review database index mechanics', 'Set up customer support routes'].map((task, i) => (
                  <div key={i} className="p-3 border border-gray-100 rounded-lg text-xs font-bold flex items-center gap-2">
                    <div className="w-3.5 h-3.5 border border-gray-200 rounded" />
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            )}
            {activePane === 'search' && (
              <div className="space-y-2 pt-2">
                <div className="h-9 bg-gray-50 border border-gray-200 rounded-lg px-3 flex items-center text-xs text-gray-400 font-medium">Type to search workspace data files instantly...</div>
                <div className="text-[11px] font-semibold text-gray-400 px-1">Recent: workspace_notes_june.txt</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="border-t border-[#E5E7EB] bg-[#F9FAFB] py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight">Product Architecture</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "AI Chat", d: "Get help with ideas, writing, planning, and everyday work." },
              { t: "Projects", d: "Organize work and keep tasks structured." },
              { t: "Search", d: "Find information quickly across your workspace." },
              { t: "Workspace", d: "Keep conversations and work in one place." },
              { t: "Simple Workflow", d: "Reduce clutter and stay focused." },
              { t: "Built For Teams", d: "Designed for individuals and growing teams." }
            ].map((feat, i) => (
              <div key={i} className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-6 space-y-2 shadow-sm">
                <h3 className="text-sm font-bold text-[#111827]">{feat.t}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed font-medium">{feat.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-20 space-y-12 border-b border-[#E5E7EB]">
        <h2 className="text-2xl font-extrabold text-[#111827] text-center tracking-tight">Platform Instructions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-3xl mx-auto">
          {[
            { s: "Step 1", t: "Create your account" },
            { s: "Step 2", t: "Set up your workspace" },
            { s: "Step 3", t: "Start chatting and organizing work" }
          ].map((step, idx) => (
            <div key={idx} className="space-y-2">
              <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">{step.s}</span>
              <h3 className="text-sm font-bold text-[#111827]">{step.t}</h3>
              <p className="text-xs text-[#6B7280] font-medium leading-relaxed">Initialize parameters directly to layout configuration pathways instantly.</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY LOOP SECTION */}
      <section className="bg-[#F9FAFB] py-20">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { t: "One Place For Work", d: "Keep everything organized." },
            { t: "Work Faster", d: "Use AI to help with everyday tasks." },
            { t: "Stay Focused", d: "Reduce the need to switch between tools." }
          ].map((item, idx) => (
            <div key={idx} className="text-center space-y-2">
              <h3 className="text-sm font-bold text-[#111827]">{item.t}</h3>
              <p className="text-xs text-[#6B7280] font-medium">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section id="pricing" className="max-w-4xl mx-auto px-6 py-20 space-y-12">
        <h2 className="text-2xl font-extrabold text-[#111827] text-center tracking-tight">Workspace Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="border border-[#E5E7EB] rounded-xl p-6 bg-[#FFFFFF] shadow-sm space-y-1">
            <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Free Trial</h3>
            <div className="text-3xl font-black text-[#111827]">$0</div>
            <p className="text-[11px] text-[#9CA3AF] font-medium">14 Days</p>
          </div>
          <div className="border border-[#E5E7EB] rounded-xl p-6 bg-[#FFFFFF] shadow-sm space-y-1">
            <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Starter</h3>
            <div className="text-3xl font-black text-[#111827]">$9</div>
            <p className="text-[11px] text-[#9CA3AF] font-medium">/user/month</p>
          </div>
          <div className="border border-[#E5E7EB] rounded-xl p-6 bg-[#FFFFFF] shadow-sm space-y-1">
            <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Pro</h3>
            <div className="text-3xl font-black text-[#111827]">$29</div>
            <p className="text-[11px] text-[#9CA3AF] font-medium">/user/month</p>
          </div>
        </div>
        <div className="text-center">
          <Link href="/pricing" className="h-10 px-5 border border-[#E5E7EB] hover:border-[#6B7280] text-xs font-bold rounded-lg transition inline-flex items-center justify-center">
            View Pricing
          </Link>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="border-t border-[#E5E7EB] bg-[#F9FAFB] py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-xl font-bold text-[#111827] text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqData.map((faq, idx) => (
              <div key={idx} className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex justify-between items-center text-left font-bold text-xs text-[#111827] focus:outline-none">
                  <span>{faq.q}</span>
                  <span className="text-[#6B7280] font-mono">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && <p className="text-xs text-[#6B7280] leading-relaxed pt-2.5 transition-all font-medium">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-4">
        <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight">Ready To Try Loop?</h2>
        <p className="text-xs text-[#6B7280] font-medium max-w-sm mx-auto">Start your free trial today and explore the workspace.</p>
        <div className="pt-2">
          <Link href="/signup" className="inline-flex h-11 px-6 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] text-xs font-bold rounded-xl transition items-center justify-center shadow-md">
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E5E7EB] bg-[#FFFFFF] py-12 px-6 md:px-12 text-xs">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-[#6B7280] font-medium">
          <div className="space-y-2">
            <p className="font-bold text-[#111827]">Product</p>
            <div className="flex flex-col gap-1.5">
              <span className="hover:text-[#2563EB] cursor-pointer transition">Features</span>
              <span className="hover:text-[#2563EB] cursor-pointer transition">Pricing</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-[#111827]">Company</p>
            <div className="flex flex-col gap-1.5">
              <span className="hover:text-[#2563EB] cursor-pointer transition">Contact</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-[#111827]">Legal</p>
            <div className="flex flex-col gap-1.5">
              <span className="hover:text-[#2563EB] cursor-pointer transition">Privacy Policy</span>
              <span className="hover:text-[#2563EB] cursor-pointer transition">Terms of Service</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-[#111827]">Loop Technology</p>
            <p className="text-[10px] text-[#9CA3AF] font-mono mt-0.5">© 2026 Loop Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}