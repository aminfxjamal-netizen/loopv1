import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans selection:bg-blue-100">
      
      {/* Navigation Bar (Optional/Minimal) */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB] shadow-sm shadow-blue-500/20">
            <span className="text-white text-sm">L</span>
          </div>
          Loop
        </div>
        <Link href="/workspace" className="text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors">
          Go to Workspace
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section className="text-center pt-20 pb-16 px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Simple pricing for growing businesses.
        </h1>
        <p className="text-lg md:text-xl text-[#64748B]">
          Start with a free trial. Upgrade when you're ready.
        </p>
      </section>

      {/* PRICING CARDS SECTION */}
      <section className="px-4 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1 — Free Trial */}
          <div className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Free Trial</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold">$0</span>
            </div>
            <p className="text-sm text-[#64748B] mb-8 min-h-[40px]">
              Explore Loop before committing.
            </p>
            <Link 
              href="/billing" 
              className="w-full py-3 px-4 rounded-xl border-2 border-[#2563EB] text-[#2563EB] font-semibold text-center hover:bg-blue-50 transition-colors mb-8"
            >
              Start Free Trial
            </Link>
            <div className="space-y-4 flex-1">
              {[
                "Full workspace access",
                "AI Chat",
                "Email drafting",
                "File analysis",
                "Calendar scheduling",
                "14-day trial",
                "No credit card required"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-[#64748B]">
                  <Check size={18} className="text-[#2563EB] shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 — Starter */}
          <div className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Starter</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold">$9</span>
              <span className="text-sm text-[#64748B]">per user / month</span>
            </div>
            <p className="text-sm text-[#64748B] mb-8 min-h-[40px]">
              For individuals who want everyday AI assistance.
            </p>
            <Link 
              href="/billing" 
              className="w-full py-3 px-4 rounded-xl bg-[#2563EB] text-white font-semibold text-center hover:bg-[#1D4ED8] shadow-sm shadow-blue-500/20 transition-all mb-8"
            >
              Choose Starter
            </Link>
            <div className="space-y-4 flex-1">
              {[
                "Everything in Free Trial",
                "Unlimited conversations",
                "Email assistance",
                "File analysis",
                "Calendar support",
                "Priority performance"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-[#64748B]">
                  <Check size={18} className="text-[#2563EB] shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3 — Pro (Most Popular) */}
          <div className="relative flex flex-col rounded-2xl border-2 border-[#2563EB] bg-white p-8 shadow-lg transition-shadow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                Most Popular
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Pro</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold">$29</span>
              <span className="text-sm text-[#64748B]">per user / month</span>
            </div>
            <p className="text-sm text-[#64748B] mb-8 min-h-[40px]">
              For professionals who rely on Loop every day.
            </p>
            <Link 
              href="/billing" 
              className="w-full py-3 px-4 rounded-xl bg-[#2563EB] text-white font-semibold text-center hover:bg-[#1D4ED8] shadow-sm shadow-blue-500/20 transition-all mb-8"
            >
              Choose Pro
            </Link>
            <div className="space-y-4 flex-1">
              {[
                "Everything in Starter",
                "Faster responses",
                "Advanced memory",
                "Priority support",
                "Future premium features"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-[#64748B]">
                  <Check size={18} className="text-[#2563EB] shrink-0" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-gray-50 py-24 px-4 border-t border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-6">
            
            <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
              <h4 className="font-semibold text-lg mb-2">What happens after the 14-day trial?</h4>
              <p className="text-[#64748B] leading-relaxed">At the end of your 14-day trial, you will be prompted to choose either the Starter or Pro plan to continue using Loop's premium features. If you decide not to upgrade, your account will be paused until a plan is selected.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
              <h4 className="font-semibold text-lg mb-2">Can I cancel anytime?</h4>
              <p className="text-[#64748B] leading-relaxed">Yes. You can cancel your subscription at any time from your billing settings. Your access will remain active until the end of your current billing cycle.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
              <h4 className="font-semibold text-lg mb-2">Do I need a credit card to start?</h4>
              <p className="text-[#64748B] leading-relaxed">No credit card is required to start your 14-day free trial. We only require payment details when you are ready to formally upgrade to a paid tier.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
              <h4 className="font-semibold text-lg mb-2">Can I upgrade later?</h4>
              <p className="text-[#64748B] leading-relaxed">Absolutely. You can start with the Free Trial or Starter plan and upgrade to Pro at any point. Our billing system will automatically prorate the cost difference.</p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-24 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Ready to get started?</h2>
        <Link 
          href="/billing" 
          className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[#2563EB] rounded-xl hover:bg-[#1D4ED8] shadow-lg shadow-blue-500/30 transition-all"
        >
          Start Free Trial
        </Link>
      </section>
      
    </div>
  );
}