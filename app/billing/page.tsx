'use client';

import { useState } from 'react';
import { ShieldCheck, CreditCard, Lock, ArrowRight, Check, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function BillingPaymentPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Available plans to make it dynamic
  const planOptions = {
    basic: { name: 'Basic Tier', price: 9, description: 'Billed monthly' },
    pro: { name: 'Professional Pro Package', price: 29, description: 'Billed monthly' }
  };

  // State for user selection (defaults to basic so it doesn't scare them)
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'pro'>('basic');
  
  // Form States
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const currentPlan = planOptions[selectedPlan];

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 1500);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#121212] font-sans antialiased overflow-x-hidden flex flex-col relative">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none z-0" />

      <header className="border-b border-[#EEEEEE] bg-white sticky top-0 w-full h-16 z-50 flex-shrink-0">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-[#121212] flex items-center gap-2 no-underline">
            <span className="w-5 h-5 bg-violet-600 rounded-md flex items-center justify-center text-white text-xs font-black">L</span>
            Loop
          </Link>
        </div>
      </header>

      <div className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 grid md:grid-cols-12 gap-8 relative z-10 items-start">
        
        {/* Left Side: Secure Checkout Payment Form */}
        <div className="md:col-span-7 bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm text-left">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h1 className="text-lg font-bold text-gray-950 tracking-tight">Checkout</h1>
            <p className="text-xs text-gray-400">Choose your tier and input your payment details below.</p>
          </div>

          {/* Interactive Tier Selection Box */}
          <div className="mb-6 space-y-2">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Select Your Plan Container</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedPlan('basic')}
                className={`p-3 border text-left rounded-xl transition visual-fix ${selectedPlan === 'basic' ? 'border-violet-600 bg-violet-50/40 ring-1 ring-violet-600' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
              >
                <div className="font-bold text-xs">Basic Tier</div>
                <div className="text-sm font-extrabold mt-1">$9<span className="text-[10px] font-normal text-gray-400">/mo</span></div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlan('pro')}
                className={`p-3 border text-left rounded-xl transition visual-fix ${selectedPlan === 'pro' ? 'border-violet-600 bg-violet-50/40 ring-1 ring-violet-600' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
              >
                <div className="font-bold text-xs">Professional Pro</div>
                <div className="text-sm font-extrabold mt-1">$29<span className="text-[10px] font-normal text-gray-400">/mo</span></div>
              </button>
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 font-mono">Name on Card</label>
              <input
                type="text"
                required
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                placeholder="Amin Fx Jamal"
                className="w-full px-3 py-2 bg-[#FAFAFA] border border-gray-200 rounded-lg text-xs placeholder:text-gray-300 focus:outline-none focus:border-violet-600 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 font-mono">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4242  4242  4242  4242"
                  className="w-full pl-10 pr-3 py-2 bg-[#FAFAFA] border border-gray-200 rounded-lg text-xs placeholder:text-gray-300 focus:outline-none focus:border-violet-600 focus:bg-white transition"
                />
                <CreditCard size={14} className="absolute left-3.5 top-3 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 font-mono">Expiration Date</label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM / YY"
                  className="w-full px-3 py-2 bg-[#FAFAFA] border border-gray-200 rounded-lg text-xs placeholder:text-gray-300 focus:outline-none focus:border-violet-600 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 font-mono">CVC</label>
                <input
                  type="password"
                  required
                  maxLength={4}
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  placeholder="•••"
                  className="w-full px-3 py-2 bg-[#FAFAFA] border border-gray-200 rounded-lg text-xs placeholder:text-gray-300 focus:outline-none focus:border-violet-600 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-50 shadow-sm shadow-violet-600/10"
              >
                {isProcessing ? 'Processing Payment...' : `Pay $${currentPlan.price}.00`}
                {!isProcessing && <ArrowRight size={13} />}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Dynamic Summary Panel */}
        <div className="md:col-span-5 bg-white border border-gray-200 rounded-xl p-6 text-left shadow-sm">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-mono border-b border-gray-100 pb-3 mb-4">Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xs font-bold text-gray-900">{currentPlan.name}</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">{currentPlan.description}</p>
              </div>
              <span className="text-sm font-extrabold text-gray-950">${currentPlan.price}.00</span>
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Setup Allocation Fee</span>
                <span className="text-green-600 font-mono text-[10px] font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-gray-950 font-bold border-t border-dashed border-gray-200 pt-2 text-sm">
                <span>Total Due</span>
                <span>${currentPlan.price}.00</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}