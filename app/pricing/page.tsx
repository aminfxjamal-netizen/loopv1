'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Safe navigation helpers mapping exact user flows
  const handleSelectPaidPlan = (planName: string, price: string) => {
    // Route cleanly to the billing infrastructure passing choice details
    router.push(`/billing?plan=${encodeURIComponent(planName)}&price=${encodeURIComponent(price)}`);
  };

  const faqs = [
    {
      question: "What happens after my free trial ends?",
      answer: "Once your 14-day trial concludes, your account parameters drop into our standard sandbox view. Your chat histories remain securely saved, and you can choose to upgrade to an active operational plan whenever you are ready."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely. Loop is structured to be completely flexible. You can manage or disable your active recurring parameters at any time from your core workspace configuration dashboard with a single click."
    },
    {
      question: "Do I need a credit card?",
      answer: "No credit card or initial settlement parameters are required to run the 14-day free trial workspace layer. You only supply information if you decide to initialize a paid plan node."
    },
    {
      question: "Can I upgrade later?",
      answer: "Yes, you can swap between the Starter or Pro configuration tiers at any time directly inside your account parameters to scale your execution limits seamlessly."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111827] font-sans antialiased flex flex-col justify-between p-4 sm:p-6 md:p-8 selection:bg-[#2563EB]/10 transition-colors duration-300">
      
      {/* NAVIGATION HEADER BAR */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between border-b border-gray-50 pb-4">
        <div 
          onClick={() => router.push('/')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-6 h-6 rounded-lg bg-[#2563EB] flex items-center justify-center transition-all duration-300 shadow-[0_4px_12px_rgba(37,99,235,0.2)] group-hover:bg-[#1D4ED8]">
            <div className="w-2.5 h-2.5 rounded-sm bg-white" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-[#111827]">Loop</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/login')}
            className="text-xs font-bold text-[#4B5563] hover:text-[#111827] transition-colors"
          >
            Login
          </button>
          <button 
            onClick={() => router.push('/signup')}
            className="h-9 px-4 rounded-xl border border-[#E5E7EB] bg-white text-xs font-bold text-[#111827] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all shadow-sm"
          >
            Start Free Trial
          </button>
        </div>
      </header>

      {/* MAIN CONTENT PORTAL */}
      <main className="flex-1 max-w-5xl w-full mx-auto my-12 space-y-16 animate-fade-in">
        
        {/* HERO HEADER TITLE SECTION */}
        <div className="space-y-3 text-center">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#111827]">Simple Pricing</h1>
          <p className="text-sm text-[#6B7280] font-medium max-w-md mx-auto leading-relaxed">
            Start with a free trial and upgrade when you're ready.
          </p>
          <div className="flex items-center justify-center gap-4 pt-1 text-[11px] font-bold text-[#6B7280] uppercase tracking-wide">
            <span className="flex items-center gap-1.5"><span className="text-[#2563EB]">✓</span> No Credit Card Required</span>
            <span className="flex items-center gap-1.5"><span className="text-[#2563EB]">✓</span> Cancel Anytime</span>
          </div>
        </div>

        {/* PRICING GRID SYSTEM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* TIER 1: FREE TRIAL */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-sm transition-all duration-200 hover:border-[#D1D5DB]">
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#111827]">Free Trial</h3>
                <p className="text-xs text-[#6B7280] font-medium mt-1">Explore your personal AI execution workspace.</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black tracking-tight text-[#111827]">$0</span>
                <span className="text-xs font-semibold text-[#6B7280]">/ 14 Days</span>
              </div>
              <ul className="space-y-2.5 text-xs font-medium text-[#4B5563] pt-2 border-t border-gray-50">
                <li className="flex items-center gap-2">✓ <span className="text-[#111827]">AI Chat</span></li>
                <li className="flex items-center gap-2">✓ <span className="text-[#111827]">Chat History</span></li>
                <li className="flex items-center gap-2">✓ <span className="text-[#111827]">Search</span></li>
                <li className="flex items-center gap-2">✓ <span className="text-[#111827]">Workspace Access</span></li>
                <li className="flex items-center gap-2">✓ <span className="text-[#111827]">No Credit Card Required</span></li>
              </ul>
            </div>
            <button 
              onClick={() => router.push('/signup')}
              className="w-full h-11 rounded-xl border border-[#E5E7EB] bg-white text-xs font-bold text-[#111827] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all shadow-sm"
            >
              Start Free Trial
            </button>
          </div>

          {/* TIER 2: STARTER */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-sm transition-all duration-200 hover:border-[#D1D5DB]">
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#111827]">Starter</h3>
                <p className="text-xs text-[#6B7280] font-medium mt-1">Unlock consistent day-to-day productivity loops.</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black tracking-tight text-[#111827]">$19</span>
                <span className="text-xs font-semibold text-[#6B7280]">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs font-medium text-[#4B5563] pt-2 border-t border-gray-50">
                <li className="flex items-center gap-2 text-[#2563EB]">✓ <span className="text-[#111827] font-semibold">Everything in Free Trial</span></li>
                <li className="flex items-center gap-2">✓ <span className="text-[#111827]">Unlimited Usage</span></li>
                <li className="flex items-center gap-2">✓ <span className="text-[#111827]">Workspace Organization</span></li>
                <li className="flex items-center gap-2">✓ <span className="text-[#111827]">Standard Support</span></li>
                <li className="flex items-center gap-2">✓ <span className="text-[#111827]">Future Updates</span></li>
              </ul>
            </div>
            <button 
              onClick={() => handleSelectPaidPlan('Starter', '$19')}
              className="w-full h-11 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs font-bold transition-all shadow-sm"
            >
              Choose Starter
            </button>
          </div>

          {/* TIER 3: PRO */}
          <div className="bg-white border-2 border-[#2563EB] rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-md transition-all duration-200 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-sm">
              Most Popular
            </span>
            <div className="space-y-4 pt-1">
              <div>
                <h3 className="text-base font-bold text-[#111827]">Pro</h3>
                <p className="text-xs text-[#6B7280] font-medium mt-1">Maximize processing pipelines and early releases.</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black tracking-tight text-[#111827]">$39</span>
                <span className="text-xs font-semibold text-[#6B7280]">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs font-medium text-[#4B5563] pt-2 border-t border-gray-50">
                <li className="flex items-center gap-2 text-[#2563EB]">✓ <span className="text-[#111827] font-semibold">Everything in Starter</span></li>
                <li className="flex items-center gap-2">✓ <span className="text-[#111827]">Higher AI Limits</span></li>
                <li className="flex items-center gap-2">✓ <span className="text-[#111827]">Priority Support</span></li>
                <li className="flex items-center gap-2">✓ <span className="text-[#111827]">Premium Features</span></li>
                <li className="flex items-center gap-2">✓ <span className="text-[#111827]">Early Access Updates</span></li>
              </ul>
            </div>
            <button 
              onClick={() => handleSelectPaidPlan('Pro', '$39')}
              className="w-full h-11 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-sm shadow-[#2563EB]/10"
            >
              Go Pro
            </button>
          </div>

        </div>

        {/* ACCORDION FAQ SECTION */}
        <div className="max-w-2xl w-full mx-auto space-y-5 pt-4">
          <div className="text-center space-y-1.5">
            <h2 className="text-xl font-extrabold tracking-tight text-[#111827]">Frequently Asked Questions</h2>
            <p className="text-xs text-[#6B7280] font-medium">Clear answers regarding subscription mechanics.</p>
          </div>
          <div className="border-t border-[#F3F4F6] pt-2 space-y-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-[#F3F4F6] pb-3 pt-1">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left text-xs font-bold text-[#111827] hover:text-[#2563EB] transition-colors py-2 focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <span className="text-[#9CA3AF] font-normal">{activeFaq === idx ? '−' : '+'}</span>
                </button>
                {activeFaq === idx && (
                  <p className="text-xs text-[#6B7280] font-medium leading-relaxed pt-1 pr-6 animate-fade-in">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FINAL CLOSING BLOCK CALL TO ACTION */}
        <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 text-center space-y-5 max-w-3xl mx-auto">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-[#111827]">Ready to get started?</h2>
            <p className="text-xs text-[#6B7280] font-medium">Try Loop free for 14 days and see if it fits your workflow.</p>
          </div>
          <button
            onClick={() => router.push('/signup')}
            className="h-[56px] px-8 rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-[0_10px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_10px_35px_rgba(37,99,235,0.35)] transition-all duration-200 inline-flex items-center justify-center hover:scale-[1.01] active:scale-[0.99]"
          >
            Start Free Trial
          </button>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl w-full mx-auto border-t border-[#F3F4F6] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-[#9CA3AF]">
        <span>© {new Date().getFullYear()} Loop Technologies Inc. All configurations sandboxed.</span>
        <div className="flex items-center gap-5 text-[#6B7280] font-semibold">
          <span className="hover:text-[#111827] cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-[#111827] cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}