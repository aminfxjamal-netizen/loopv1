'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LoopHonestLandingPage() {
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [previewTab, setPreviewTab] = useState<'chat' | 'tasks'>('chat');

  useEffect(() => {
    setMounted(true);
  }, []);

  const faqData = [
    {
      q: "What is Loop?",
      a: "Loop is a software application that provides a single interface for interacting with artificial intelligence models, saving notes, and keeping track of your daily tasks."
    },
    {
      q: "How does the free trial work?",
      a: "You get full access to the features of Loop for 14 days. This gives you time to evaluate if the tool provides value to your work or business routines before choosing a paid tier."
    },
    {
      q: "Do I need a credit card?",
      a: "No, you do not need to provide any billing information or credit card numbers to activate your 14-day evaluation trial."
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. You can manage or delete your workspace account directly from your settings panel whenever you choose."
    }
  ];

  return (
    <div className={`min-h-screen bg-[#FFFFFF] text-[#111827] font-sans antialiased transition-opacity duration-500 select-none ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* NAVIGATION */}
      <header className="h-16 border-b border-[#E5E7EB] bg-[#FFFFFF] flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          {/* Logo */}
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
          <Link 
            href="/signup" 
            className="h-9 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] text-xs font-semibold rounded-lg transition flex items-center justify-center shadow-sm"
          >
            Start Free Trial
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#111827] leading-tight">
          Your AI Workspace
        </h1>
        <p className="text-base text-[#6B7280] max-w-2xl mx-auto leading-relaxed font-medium">
          A simple workspace for chatting with AI, organizing ideas, and managing work in one place.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link 
            href="/signup" 
            className="w-full sm:w-auto h-11 px-6 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] text-xs font-bold rounded-xl transition flex items-center justify-center shadow-md"
          >
            Start Free Trial
          </Link>
          <Link 
            href="#pricing" 
            className="w-full sm:w-auto h-11 px-6 border border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#6B7280] text-[#111827] text-xs font-bold rounded-xl transition flex items-center justify-center"
          >
            View Pricing
          </Link>
        </div>

        <div className="text-xs font-semibold text-[#9CA3AF] tracking-wide uppercase pt-1">
          14-Day Free Trial • No Credit Card Required
        </div>
      </section>

      {/* REALISTIC PRODUCT PREVIEW */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl shadow-xl overflow-hidden min-h-[380px] flex flex-col">
          <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] h-11 flex items-center px-4 justify-between text-xs font-medium text-[#6B7280]">
            <div className="flex items-center gap-4">
              <span 
                className={`cursor-pointer pb-3 pt-3 border-b-2 transition ${previewTab === 'chat' ? 'border-[#2563EB] text-[#111827]' : 'border-transparent'}`}
                onClick={() => setPreviewTab('chat')}
              >
                AI Assistant Interface
              </span>
              <span 
                className={`cursor-pointer pb-3 pt-3 border-b-2 transition ${previewTab === 'tasks' ? 'border-[#2563EB] text-[#111827]' : 'border-transparent'}`}
                onClick={() => setPreviewTab('tasks')}
              >
                Task Management Layout
              </span>
            </div>
            <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-mono">v1.0-build</span>
          </div>
          
          <div className="p-6 flex-1 bg-[#FFFFFF] text-left">
            {previewTab === 'chat' ? (
              <div className="space-y-4">
                <div className="p-3.5 bg-gray-50 rounded-lg text-xs max-w-xl text-gray-600 font-medium">
                  "Help me break down our launch preparations into a clear list of objectives."
                </div>
                <div className="p-3.5 bg-[#2563EB]/5 border border-[#2563EB]/10 rounded-lg text-xs max-w-xl ml-auto text-[#111827] font-medium">
                  <strong>Loop AI:</strong> I can help arrange that. Let's list your design components, environment variables, and deployment schedules into distinct task cards.
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                {[
                  { title: "Review product copy updates", tag: "Marketing" },
                  { title: "Verify Supabase configuration strings", tag: "Engineering" },
                  { title: "Schedule staging deployment window", tag: "Operations" }
                ].map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg text-xs font-semibold">
                    <div className="flex items-center gap-3">
                      <div className="w-3.5 h-3.5 border border-gray-300 rounded" />
                      <span>{task.title}</span>
                    </div>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-medium">{task.tag}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="border-t border-[#E5E7EB] bg-[#F9FAFB] py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight">Core App Capabilities</h2>
            <p className="text-xs text-[#6B7280] font-medium">An honest overview of what you can accomplish inside the software.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "AI Chat", d: "Ask questions, brainstorm ideas, and get help from AI." },
              { t: "Workspace", d: "Keep conversations and work organized." },
              { t: "Search", d: "Find information quickly." },
              { t: "Projects", d: "Manage tasks and plans in one place." },
              { t: "Simple Workflow", d: "Everything stays in one workspace." },
              { t: "Built For Growth", d: "Start simple and expand as your needs grow." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-6 space-y-2 shadow-sm">
                <h3 className="text-sm font-bold text-[#111827]">{feature.t}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed font-medium">{feature.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight">Clear Pricing Options</h2>
          <p className="text-xs text-[#6B7280] font-medium">Choose a plan that fits your current requirements.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Trial */}
          <div className="border border-[#E5E7EB] rounded-xl p-6 flex flex-col justify-between bg-[#FFFFFF] shadow-sm">
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Free Trial</h3>
              <div className="text-3xl font-black text-[#111827]">$0</div>
              <p className="text-[11px] font-medium text-[#9CA3AF]">Available for 14 Days</p>
            </div>
          </div>
          {/* Starter */}
          <div className="border border-[#E5E7EB] rounded-xl p-6 flex flex-col justify-between bg-[#FFFFFF] shadow-sm">
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Starter</h3>
              <div className="text-3xl font-black text-[#111827]">$9</div>
              <p className="text-[11px] font-medium text-[#9CA3AF]">per user / month</p>
            </div>
          </div>
          {/* Pro */}
          <div className="border border-[#E5E7EB] rounded-xl p-6 flex flex-col justify-between bg-[#FFFFFF] shadow-sm">
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Pro</h3>
              <div className="text-3xl font-black text-[#111827]">$29</div>
              <p className="text-[11px] font-medium text-[#9CA3AF]">per user / month</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link href="/pricing" className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition underline">
            View Full Pricing
          </Link>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="border-t border-[#E5E7EB] bg-[#F9FAFB] py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-xl font-bold text-[#111827] text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div key={idx} className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-4 shadow-sm">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center text-left font-bold text-xs text-[#111827] focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#6B7280] font-mono">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <p className="text-xs text-[#6B7280] leading-relaxed pt-2.5 transition-all">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-4">
        <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight">Ready to try Loop?</h2>
        <p className="text-xs text-[#6B7280] font-medium max-w-sm mx-auto">
          Start your free trial and see if Loop fits your workflow.
        </p>
        <div className="pt-2">
          <Link 
            href="/signup" 
            className="inline-flex h-11 px-6 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] text-xs font-bold rounded-xl transition items-center justify-center shadow-md"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E5E7EB] bg-[#FFFFFF] py-12 px-6 md:px-12 text-xs">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-[#6B7280] font-medium">
          <div className="space-y-2.5">
            <p className="font-bold text-[#111827]">Product</p>
            <div className="flex flex-col gap-2">
              <span className="hover:text-[#2563EB] cursor-pointer transition">Features</span>
              <span className="hover:text-[#2563EB] cursor-pointer transition">Pricing</span>
            </div>
          </div>
          <div className="space-y-2.5">
            <p className="font-bold text-[#111827]">Company</p>
            <div className="flex flex-col gap-2">
              <span className="hover:text-[#2563EB] cursor-pointer transition">Contact</span>
            </div>
          </div>
          <div className="space-y-2.5">
            <p className="font-bold text-[#111827]">Legal</p>
            <div className="flex flex-col gap-2">
              <span className="hover:text-[#2563EB] cursor-pointer transition">Privacy Policy</span>
              <span className="hover:text-[#2563EB] cursor-pointer transition">Terms of Service</span>
            </div>
          </div>
          <div className="space-y-2.5 flex flex-col justify-between">
            <div>
              <p className="font-bold text-[#111827]">Loop Workspace</p>
              <p className="text-[11px] text-[#9CA3AF] mt-1 font-mono">Simple & straightforward tools.</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}