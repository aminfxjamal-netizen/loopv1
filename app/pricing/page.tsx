"use client";

import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PricingPage() {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('loop_user_data');
    if (!userData) {
      router.push('/signup');
    }
  }, []);

  const handleFreeTrial = () => {
    const userData = localStorage.getItem('loop_user_data');
    if (userData) {
      const parsed = JSON.parse(userData);
      const trialData = {
        ...parsed,
        plan: 'trial',
        trialStart: new Date().toISOString(),
        trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
      };
      localStorage.setItem('loop_user', JSON.stringify(trialData));
    }
    router.push('/workspace');
  };

  const handlePaidPlan = (plan: string) => {
    const userData = localStorage.getItem('loop_user_data');
    if (userData) {
      const parsed = JSON.parse(userData);
      localStorage.setItem('loop_selected_plan', JSON.stringify({ ...parsed, plan }));
    }
    router.push('/billing');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-4 md:px-6 py-5 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="Loop" className="h-7 w-auto" />
        </Link>
        <Link href="/signup" className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={14} />
          Back
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">Choose your plan</h1>
        <p className="text-gray-400 mb-4">14-day free trial on all plans. No credit card required.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
          {/* FREE TRIAL */}
          <div className="border border-white/5 rounded-2xl p-8 flex flex-col bg-[#0d0d0d]">
            <h3 className="text-lg font-semibold mb-1">Free Trial</h3>
            <p className="text-gray-400 text-sm mb-4">14 days, no commitment</p>
            <div className="text-4xl font-bold mb-6">
              $0<span className="text-lg text-gray-500 font-normal">/14 days</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1 text-left">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={16} className="text-green-500 shrink-0" /> 10 emails per day
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={16} className="text-green-500 shrink-0" /> AI chat assistant
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={16} className="text-green-500 shrink-0" /> Email drafting
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={16} className="text-green-500 shrink-0" /> Follow-up tracking
              </li>
            </ul>
            <button 
              onClick={handleFreeTrial}
              className="bg-white/10 text-white text-sm font-medium text-center py-3 rounded-xl hover:bg-white/20 transition-colors w-full"
            >
              Start Free Trial
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">No credit card required</p>
          </div>

          {/* PRO */}
          <div className="border-2 border-blue-500 rounded-2xl p-8 flex flex-col bg-[#0d0d0d] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Most Popular
            </div>
            <h3 className="text-lg font-semibold mb-1">Pro</h3>
            <p className="text-gray-400 text-sm mb-4">For professionals</p>
            <div className="text-4xl font-bold mb-6">
              $15<span className="text-lg text-gray-500 font-normal">/mo</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1 text-left">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={16} className="text-green-500 shrink-0" /> 50 emails per day
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={16} className="text-green-500 shrink-0" /> Everything in Free Trial
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={16} className="text-green-500 shrink-0" /> Priority AI responses
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={16} className="text-green-500 shrink-0" /> Advanced follow-up rules
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={16} className="text-green-500 shrink-0" /> Calendar integration
              </li>
            </ul>
            <button 
              onClick={() => handlePaidPlan('pro')}
              className="bg-blue-500 text-white text-sm font-medium text-center py-3 rounded-xl hover:bg-blue-600 transition-colors w-full flex items-center justify-center gap-2"
            >
              Choose Pro <ArrowRight size={14} />
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">14-day trial, then $15/mo</p>
          </div>

          {/* BUSINESS */}
          <div className="border border-white/5 rounded-2xl p-8 flex flex-col bg-[#0d0d0d]">
            <h3 className="text-lg font-semibold mb-1">Business</h3>
            <p className="text-gray-400 text-sm mb-4">For teams</p>
            <div className="text-4xl font-bold mb-6">
              $30<span className="text-lg text-gray-500 font-normal">/mo</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1 text-left">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={16} className="text-green-500 shrink-0" /> Unlimited emails
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={16} className="text-green-500 shrink-0" /> Everything in Pro
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={16} className="text-green-500 shrink-0" /> Team workspace
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={16} className="text-green-500 shrink-0" /> Drive integration
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Check size={16} className="text-green-500 shrink-0" /> Admin dashboard
              </li>
            </ul>
            <button 
              onClick={() => handlePaidPlan('business')}
              className="bg-white/10 text-white text-sm font-medium text-center py-3 rounded-xl hover:bg-white/20 transition-colors w-full flex items-center justify-center gap-2"
            >
              Choose Business <ArrowRight size={14} />
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">14-day trial, then $30/mo</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-6 text-sm text-gray-500">
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <span>© 2026 Loop</span>
        </div>
      </div>
    </div>
  );
}