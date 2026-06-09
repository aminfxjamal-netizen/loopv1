'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LoopPricingPage() {
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      q: "What happens after my trial ends?",
      a: "Once your 14-day free trial finishes, you will be prompted to select either our Starter or Pro tier to continue using Loop's full feature set. Your workspace and chat history will be safely preserved."
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, you can cancel your plan directly from your billing workspace matrix with a single click. You will retain access to your plan features until the end of your current billing cycle."
    },
    {
      q: "Do I need a credit card?",
      a: "No credit card is required to sign up for our 14-day free trial. You only provide billing information when you decide to transition to a paid plan."
    },
    {
      q: "Can I upgrade later?",
      a: "Absolutely. You can scale your user seats or transition between tiers at any time instantly. Your billing changes will be dynamically prorated on your ledger."
    }
  ];

  return (
    <div 
      className={`min-h-screen bg-[#FFFFFF] text-[#111827] font-sans antialiased transition-opacity duration-700 ease-out select-none ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Navigation Bar */}
      <header className="h-16 border-b border-[#E5E7EB] bg-[#FFFFFF] flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          {/* Loop Logo */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#2563EB] flex items-center justify-center">
              <div className="w-2 h-2 rounded-sm bg-[#FFFFFF]" />
            </div>
            <span className="text-sm font-bold tracking-tight text-[#111827]">Loop</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[#6B7280]">
            <Link href="#features" className="hover:text-[#111827] transition">Features</Link>
            <Link href="#pricing" className="hover:text-[#111827] transition">Pricing</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-xs font-medium text-[#6B7280] hover:text-[#111827] transition">
            Login
          </Link>
          <Link href="/signup" className="h-9 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] text-xs font-semibold rounded-lg transition flex items-center justify-center shadow-sm">
            Start Free Trial
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] leading-tight">
          Simple Pricing For Every Business
        </h1>
        <p className="text-base text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
          Start with a 14-day free trial and upgrade when you're ready.
        </p>
        <div className="text-xs font-semibold text-[#6B7280] tracking-wide uppercase pt-2">
          No Credit Card Required • Cancel Anytime
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* PLAN 1: Free Trial */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-8 space-y-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between min-h-[480px]">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#111827]">Free Trial</h3>
                <div className="mt-4 flex items-baseline text-[#111827]">
                  <span className="text-4xl font-extrabold tracking-tight">$0</span>
                </div>
                <p className="text-xs font-medium text-[#6B7280] mt-1">14 Days Free</p>
              </div>
              <ul className="space-y-3 text-xs font-medium text-[#6B7280]">
                <li className="flex items-center gap-2.5"><span className="text-[#2563EB]">✓</span> AI Chat</li>
                <li className="flex items-center gap-2.5"><span className="text-[#2563EB]">✓</span> Chat History</li>
                <li className="flex items-center gap-2.5"><span className="text-[#2563EB]">✓</span> Search</li>
                <li className="flex items-center gap-2.5"><span className="text-[#2563EB]">✓</span> Workspace Access</li>
                <li className="flex items-center gap-2.5"><span className="text-[#2563EB]">✓</span> No Credit Card Required</li>
              </ul>
            </div>
            <Link href="/signup" className="w-full h-11 border border-[#E5E7EB] hover:border-[#6B7280] text-[#111827] text-xs font-semibold rounded-xl transition flex items-center justify-center mt-8">
              Start Free Trial
            </Link>
          </div>

          {/* PLAN 2: Starter */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-8 space-y-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between min-h-[480px]">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#111827]">Starter</h3>
                <div className="mt-4 flex items-baseline text-[#111827]">
                  <span className="text-4xl font-extrabold tracking-tight">$9</span>
                  <span className="text-xs font-medium text-[#6B7280] ml-1">/user/month</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs font-medium text-[#6B7280]">
                <li className="flex items-center gap-2.5"><span className="text-[#2563EB]">✓</span> Everything In Trial</li>
                <li className="flex items-center gap-2.5"><span className="text-[#2563EB]">✓</span> Unlimited Chat History</li>
                <li className="flex items-center gap-2.5"><span className="text-[#2563EB]">✓</span> Workspace Management</li>
                <li className="flex items-center gap-2.5"><span className="text-[#2563EB]">✓</span> Standard Support</li>
                <li className="flex items-center gap-2.5"><span className="text-[#2563EB]">✓</span> Future Product Updates</li>
              </ul>
            </div>
            <Link href="/signup" className="w-full h-11 border border-[#E5E7EB] hover:border-[#6B7280] text-[#111827] text-xs font-semibold rounded-xl transition flex items-center justify-center mt-8">
              Choose Starter
            </Link>
          </div>

          {/* PLAN 3: Pro (Highlighted) */}
          <div className="bg-[#FFFFFF] border-2 border-[#2563EB] rounded-2xl p-8 space-y-6 transition duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between min-h-[510px] relative shadow-[0_10px_30px_rgba(37,99,235,0.04)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-[#FFFFFF] px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Most Popular
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#111827]">Pro</h3>
                <div className="mt-4 flex items-baseline text-[#111827]">
                  <span className="text-4xl font-extrabold tracking-tight">$29</span>
                  <span className="text-xs font-medium text-[#6B7280] ml-1">/user/month</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs font-medium text-[#6B7280]">
                <li className="flex items-center gap-2.5"><span className="text-[#2563EB]">✓</span> Everything In Starter</li>
                <li className="flex items-center gap-2.5"><span className="text-[#2563EB]">✓</span> Advanced AI Usage</li>
                <li className="flex items-center gap-2.5"><span className="text-[#2563EB]">✓</span> Team Workspaces</li>
                <li className="flex items-center gap-2.5"><span className="text-[#2563EB]">✓</span> Premium Integrations</li>
                <li className="flex items-center gap-2.5"><span className="text-[#2563EB]">✓</span> Priority Support</li>
                <li className="flex items-center gap-2.5"><span className="text-[#2563EB]">✓</span> Early Access Features</li>
              </ul>
            </div>
            <Link href="/signup" className="w-full h-11 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] text-xs font-semibold rounded-xl transition flex items-center justify-center mt-8 shadow-sm">
              Go Pro
            </Link>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-[#E5E7EB]">
        <h2 className="text-xl font-bold text-[#111827] text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((faq, idx) => (
            <div key={idx} className="border-b border-[#E5E7EB] pb-4">
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full flex justify-between items-center text-left py-2 font-semibold text-sm text-[#111827] focus:outline-none"
              >
                <span>{faq.q}</span>
                <span className="text-[#6B7280] text-xs">{openFaq === idx ? '−' : '+'}</span>
              </button>
              {openFaq === idx && (
                <p className="text-xs text-[#6B7280] leading-relaxed pt-1 pr-6 transition-all">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="border-t border-[#E5E7EB] bg-[#F9FAFB] py-24 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight">
            Ready to build smarter with Loop?
          </h2>
          <p className="text-sm text-[#6B7280] max-w-xl mx-auto">
            Join businesses using AI to work faster and stay organized.
          </p>
          <div className="pt-2">
            <Link 
              href="/signup" 
              className="inline-flex items-center justify-center text-sm font-semibold text-[#FFFFFF] bg-[#2563EB] hover:bg-[#1D4ED8] transition duration-200 select-none cursor-pointer"
              style={{
                height: '52px',
                borderRadius: '14px',
                paddingLeft: '32px',
                paddingRight: '32px',
                boxShadow: '0 10px 30px rgba(37,99,235,0.25)'
              }}
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}