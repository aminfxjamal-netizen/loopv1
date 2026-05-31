'use client';

import { useState } from 'react';

export default function Billing() {
  const [selected, setSelected] = useState<'starter' | 'pro'>('pro');
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const plans = {
    starter: {
      monthly: 9,
      yearly: 7,
    },
    pro: {
      monthly: 29,
      yearly: 23,
    },
  };

  return (
    <main className="min-h-screen bg-[#09090B] text-white">

      {/* Top Bar */}
      <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-sm font-bold">L</div>
          <span className="font-bold">Loop</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Secure Checkout
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

        {/* Left — Plan Selection */}
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Upgrade Loop</h1>
          <p className="text-gray-400 mb-8">Choose your plan and start working smarter today.</p>

          {/* Billing Toggle */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${billing === 'monthly' ? 'bg-violet-600 text-white' : 'bg-white/5 text-gray-400'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${billing === 'yearly' ? 'bg-violet-600 text-white' : 'bg-white/5 text-gray-400'}`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>

          {/* Plan Cards */}
          <div className="flex flex-col gap-4">

            {/* Starter */}
            <div
              onClick={() => setSelected('starter')}
              className={`p-6 rounded-2xl border cursor-pointer transition ${selected === 'starter' ? 'border-violet-500 bg-violet-500/10' : 'border-white/10 bg-white/[0.02] hover:border-white/20'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Starter</h3>
                  <p className="text-gray-400 text-sm">For individuals and freelancers</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black">${plans.starter[billing]}</div>
                  <div className="text-gray-400 text-xs">per user / month</div>
                </div>
              </div>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-gray-300">
                <li>✓ Unlimited AI messages</li>
                <li>✓ Gmail + Drive + Calendar</li>
                <li>✓ Smart follow-ups</li>
                <li>✓ Email support</li>
              </ul>
            </div>

            {/* Pro */}
            <div
              onClick={() => setSelected('pro')}
              className={`p-6 rounded-2xl border cursor-pointer transition relative ${selected === 'pro' ? 'border-violet-500 bg-violet-500/10' : 'border-white/10 bg-white/[0.02] hover:border-white/20'}`}
            >
              <div className="absolute -top-3 left-6 px-3 py-1 bg-violet-600 text-white text-xs font-bold rounded-full">Most Popular</div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Pro</h3>
                  <p className="text-gray-400 text-sm">For professionals and teams</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black">${plans.pro[billing]}</div>
                  <div className="text-gray-400 text-xs">per user / month</div>
                </div>
              </div>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-gray-300">
                <li>✓ Everything in Starter</li>
                <li>✓ Priority AI processing</li>
                <li>✓ Team workspace sharing</li>
                <li>✓ Analytics dashboard</li>
                <li>✓ Priority support</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Right — Payment Form */}
        <div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8">

            <h2 className="font-bold text-xl mb-6">Payment Details</h2>

            {/* Order Summary */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Plan</span>
                <span className="font-medium capitalize">{selected} — {billing}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Price</span>
                <span className="font-medium">${plans[selected][billing]}/user/mo</span>
              </div>
              <div className="border-t border-white/[0.06] mt-3 pt-3 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-black text-violet-400">${plans[selected][billing]}/mo</span>
              </div>
            </div>

            {/* Card Details */}
            <div className="flex flex-col gap-4">

              <div>
                <label className="block text-sm text-gray-400 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    maxLength={7}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={3}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition text-sm"
                />
              </div>

              <button className="w-full py-4 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-500 transition mt-2 flex items-center justify-center gap-2">
                🔒 Pay ${plans[selected][billing]} / month
              </button>

              <p className="text-center text-xs text-gray-600">
                Secured by 256-bit SSL encryption · Cancel anytime
              </p>

            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-600">
            <span>🔒 SSL Secured</span>
            <span>✓ No Hidden Fees</span>
            <span>✓ Cancel Anytime</span>
          </div>

        </div>
      </div>
    </main>
  );
}