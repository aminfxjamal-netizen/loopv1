"use client";

import { useEffect, useState } from 'react';
import { ArrowRight, Check, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BillingPage() {
  const router = useRouter();
  const [planData, setPlanData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('loop_selected_plan');
    if (!stored) { router.push('/pricing'); return; }
    setPlanData(JSON.parse(stored));
  }, []);

  const handlePayment = () => {
    if (!planData) return;
    const trialData = { ...planData, plan: planData.plan, trialStart: new Date().toISOString(), trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() };
    localStorage.setItem('loop_user', JSON.stringify(trialData));
    localStorage.removeItem('loop_selected_plan');
    router.push('/workspace');
  };

  if (!planData) return null;

  const plan = planData.plan;
  const isStarter = plan === 'starter';
  const isPro = plan === 'pro';
  const isBusiness = plan === 'business';
  const price = isStarter ? '$5' : isPro ? '$12' : '$19';
  const planName = isStarter ? 'Starter' : isPro ? 'Pro' : 'Business';
  const trialEndDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans">
      <nav className="flex items-center justify-between px-4 md:px-6 py-5 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center"><img src="/logo.png?v=1" alt="Loop" className="h-7 w-auto" /></Link>
        <Link href="/pricing" className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"><ArrowLeft size={14} /> Back to plans</Link>
      </nav>
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <div className="h-14 w-14 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield size={24} className="text-blue-400" /></div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Complete Your Order</h1>
          <p className="text-gray-400">14-day free trial. Cancel anytime. No credit card required.</p>
        </div>
        <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-8 mb-6">
          <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/5"><span className="text-gray-300">{planName} Plan</span><span className="font-medium">{price}/mo</span></div>
            <div className="flex justify-between items-center py-3 border-b border-white/5"><span className="text-gray-300">14-Day Free Trial</span><span className="text-green-400 font-medium">$0</span></div>
            <div className="flex justify-between items-center py-3"><span className="text-gray-300">Due Today</span><span className="text-2xl font-bold">$0</span></div>
          </div>
          <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3"><p className="text-xs text-blue-400">You will not be charged until your trial ends on {trialEndDate}. Cancel anytime before then and you will not pay anything.</p></div>
        </div>
        <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-8 mb-8">
          <h3 className="font-semibold mb-4">What is included in {planName}:</h3>
          <ul className="space-y-3">
            {isStarter && (
              <>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> 10 emails per day</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> 25 messages per day</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> AI chat assistant</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Email drafting</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Follow-up tracking</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Resets every 24 hours</li>
              </>
            )}
            {isPro && (
              <>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> 20 emails per 3 hours</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> 40 messages per 3 hours</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Everything in Starter</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Priority AI responses</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Advanced follow-up rules</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Calendar integration</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Resets every 3 hours</li>
              </>
            )}
            {isBusiness && (
              <>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> 50 emails per 2 hours</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> 70 messages per 2 hours</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Everything in Pro</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Team workspace</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Drive integration</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Admin dashboard</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Resets every 2 hours</li>
              </>
            )}
          </ul>
        </div>
        <div className="space-y-3">
          <button onClick={handlePayment} className="w-full bg-blue-500 text-white font-medium py-4 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-lg">Start 14-Day Free Trial<ArrowRight size={18} /></button>
          <p className="text-xs text-gray-500 text-center">You will not be charged today. Cancel anytime during your trial.</p>
        </div>
      </div>
      <div className="border-t border-white/5 py-6"><div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-6 text-sm text-gray-500"><Link href="/terms" className="hover:text-white transition-colors">Terms</Link><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link><span>© 2026 Loop</span></div></div>
    </div>
  );
}