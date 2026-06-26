"use client";

import { useEffect, useState } from 'react';
import { ArrowRight, Check, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BillingPage() {
  const router = useRouter();
  const [planData, setPlanData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('loop_selected_plan');
    if (!stored) {
      router.push('/pricing');
      return;
    }
    setPlanData(JSON.parse(stored));
  }, []);

  const handlePayment = () => {
    // When Lemon Squeezy is set up, replace this URL
    const lemonSqueezyUrl = planData?.plan === 'pro' 
      ? 'https://YOUR_STORE.lemonsqueezy.com/checkout/pro-plan'
      : 'https://YOUR_STORE.lemonsqueezy.com/checkout/business-plan';
    
    // For now, simulate payment and go to workspace
    if (planData) {
      const trialData = {
        ...planData,
        plan: planData.plan,
        trialStart: new Date().toISOString(),
        trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
      };
      localStorage.setItem('loop_user', JSON.stringify(trialData));
      localStorage.removeItem('loop_selected_plan');
    }
    router.push('/workspace');
    // When Lemon Squeezy is live: window.location.href = lemonSqueezyUrl;
  };

  if (!planData) return null;

  const isPro = planData.plan === 'pro';
  const price = isPro ? '$15' : '$30';
  const planName = isPro ? 'Pro' : 'Business';

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans">
      <nav className="flex items-center justify-between px-4 md:px-6 py-5 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold tracking-tight">Loop</Link>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <div className="h-14 w-14 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield size={24} className="text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Complete Your Order</h1>
          <p className="text-gray-400">14-day free trial. Cancel anytime.</p>
        </div>

        {/* Order Summary */}
        <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          
          <div className="flex justify-between items-center py-3 border-b border-white/5">
            <span className="text-gray-300">{planName} Plan</span>
            <span className="font-medium">{price}/mo</span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-white/5">
            <span className="text-gray-300">14-Day Free Trial</span>
            <span className="text-green-400 font-medium">$0</span>
          </div>

          <div className="flex justify-between items-center py-3 mt-2">
            <span className="text-gray-300">Due Today</span>
            <span className="text-2xl font-bold">$0</span>
          </div>

          <p className="text-xs text-gray-500 mt-2">You won't be charged until your trial ends on {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.</p>
        </div>

        {/* What's Included */}
        <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 mb-8">
          <h3 className="font-semibold mb-4">What's included in {planName}:</h3>
          <ul className="space-y-2">
            {isPro ? (
              <>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500" /> 50 emails per day</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500" /> Priority AI responses</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500" /> Advanced follow-up rules</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500" /> Calendar integration</li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500" /> Unlimited emails</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500" /> Everything in Pro</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500" /> Team workspace</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500" /> Drive integration</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500" /> Admin dashboard</li>
              </>
            )}
          </ul>
        </div>

        {/* Pay Button */}
        <button onClick={handlePayment} className="w-full bg-blue-500 text-white font-medium py-4 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-lg">
          Start 14-Day Free Trial
          <ArrowRight size={18} />
        </button>
        <p className="text-xs text-gray-500 text-center mt-3">You will not be charged today. Cancel anytime during your trial.</p>

        <button onClick={() => router.push('/pricing')} className="block mx-auto text-sm text-gray-500 hover:text-white mt-6 transition-colors">
          ← Back to plans
        </button>
      </div>
    </div>
  );
}