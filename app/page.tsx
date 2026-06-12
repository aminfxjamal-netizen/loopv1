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
          AI Workspace For Modern Individuals
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
          <div className="col-span-3 bg-[#F9FAFB] border-r border-[#E5E7EB] p-4 space-y-4 text-left">
            <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Loop Console</div>
            <div className="space-y-1">
              <button onClick={() => setActivePane('chat')} className={`w-full text-left p-2 rounded text-xs font-bold transition ${activePane === 'chat' ? 'bg-[#2563EB]/5 text-[#2563EB]' : 'text-[#6B7280]'}`}>Chat Interface</button>
              <button onClick={() => setActivePane('projects')} className={`w-full text-left p-2 rounded text-xs font-bold transition ${activePane === 'projects' ? 'bg-[#2563EB]/5 text-[#2563EB]' : 'text-[#6B7280]'}`}>Projects</button>
              <button onClick={() => setActivePane('search')} className={`w-full text-left p-2 rounded text-xs font-bold transition ${activePane === 'search' ? 'bg-[#2563EB]/5 text-[#2563EB]' : 'text-[#6B7280]'}`}>Search</button>
            </div>
          </div>
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

      {/* PRICING SECTION (UPDATED STYLE & PRICES) */}
      <section id="pricing" className="bg-[#FFFFFF] py-24 border-t border-[#F3F4F6]">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black text-[#111827] tracking-tight">Flexible Plans</h2>
            <p className="text-sm text-[#6B7280] font-medium">Choose the workspace power that fits your workflow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* FREE TRIAL */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 space-y-6 flex flex-col shadow-sm">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest">Free Trial</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#111827]">$0</span>
                  <span className="text-xs font-bold text-[#9CA3AF]">/ 14 days</span>
                </div>
              </div>
              <ul className="space-y-3 flex-1 text-xs font-bold text-[#4B5563]">
                <li className="flex items-center gap-2">✓ AI Chat Access</li>
                <li className="flex items-center gap-2">✓ Workspace Search</li>
                <li className="flex items-center gap-2">✓ Basic Project Cards</li>
              </ul>
              <Link href="/signup" className="h-11 w-full border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#111827] text-xs font-bold rounded-xl transition flex items-center justify-center">
                Get Started
              </Link>
            </div>

            {/* STARTER (UPDATED PRICE) */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 space-y-6 flex flex-col shadow-sm">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest">Starter</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#111827]">$19</span>
                  <span className="text-xs font-bold text-[#9CA3AF]">/ month</span>
                </div>
              </div>
              <ul className="space-y-3 flex-1 text-xs font-bold text-[#4B5563]">
                <li className="flex items-center gap-2">✓ Unlimited AI Messages</li>
                <li className="flex items-center gap-2">✓ Advanced Search</li>
                <li className="flex items-center gap-2">✓ Project File Uploads</li>
                <li className="flex items-center gap-2">✓ Standard Support</li>
              </ul>
              <Link href="/pricing" className="h-11 w-full bg-[#111827] hover:bg-[#1F2937] text-[#FFFFFF] text-xs font-bold rounded-xl transition flex items-center justify-center shadow-md">
                Choose Starter
              </Link>
            </div>

            {/* PRO (UPDATED PRICE & PREMIUM STYLE) */}
            <div className="bg-white border-2 border-[#2563EB] rounded-2xl p-8 space-y-6 flex flex-col shadow-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#2563EB] uppercase tracking-widest">Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#111827]">$39</span>
                  <span className="text-xs font-bold text-[#9CA3AF]">/ month</span>
                </div>
              </div>
              <ul className="space-y-3 flex-1 text-xs font-bold text-[#4B5563]">
                <li className="flex items-center gap-2">✓ Everything in Starter</li>
                <li className="flex items-center gap-2">✓ Priority AI Processing</li>
                <li className="flex items-center gap-2">✓ Early Access to Tools</li>
                <li className="flex items-center gap-2">✓ Dedicated Support</li>
              </ul>
              <Link href="/pricing" className="h-11 w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] text-xs font-bold rounded-xl transition flex items-center justify-center shadow-lg shadow-[#2563EB]/20">
                Go Pro
              </Link>
            </div>

          </div>
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
