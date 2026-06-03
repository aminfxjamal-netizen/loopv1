'use client';

import { useState } from 'react';
import { ShieldCheck, CreditCard, Lock, ArrowRight, Check, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function BillingPaymentPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form States
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Stripe or payment provider logic will attach directly here later
    setTimeout(() => setIsProcessing(false), 1500);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#121212] font-sans antialiased selection:bg-violet-100 selection:text-violet-900 overflow-x-hidden flex flex-col relative">
      
      {/* Miro-Style Grid Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-30 pointer-events-none z-0" />

      {/* Header */}
      <header className="border-b border-[#EEEEEE] sticky top-0 w-full h-16 z-50 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex-shrink-0">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-lg font-bold tracking-tight text-[#121212] flex items-center gap-2 no-underline">
              <span className="w-5 h-5 bg-violet-600 rounded-md flex items-center justify-center text-white text-xs font-black">L</span>
              Loop
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-[13px] text-gray-500 font-medium">
              <Link href="/#features" className="hover:text-black transition no-underline">Features</Link>
              <Link href="/pricing" className="hover:text-black transition no-underline">Pricing</Link>
              <Link href="/billing" className="text-violet-600 font-bold no-underline">Billing</Link>
            </nav>
          </div>
          <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Main Payment Container Split */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 grid md:grid-cols-12 gap-8 relative z-10 items-start">
        
        {/* Left Side: Secure Checkout Payment Form (7 Cols) */}
        <div className="md:col-span-7 bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)] text-left">
          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h1 className="text-lg font-bold text-gray-950 tracking-tight">Payment Method</h1>
              <p className="text-xs text-gray-400">Secure encrypted transaction tunnel.</p>
            </div>
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider font-mono border border-green-200">
              <Lock size={11} /> SSL Secured
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
                className="w-full px-3 py-2 bg-[#FAFAFA] border border-gray-200 rounded-lg text-xs font-sans placeholder:text-gray-300 focus:outline-none focus:border-violet-600 focus:bg-white transition"
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
                  className="w-full pl-10 pr-3 py-2 bg-[#FAFAFA] border border-gray-200 rounded-lg text-xs font-sans placeholder:text-gray-300 focus:outline-none focus:border-violet-600 focus:bg-white transition"
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
                  className="w-full px-3 py-2 bg-[#FAFAFA] border border-gray-200 rounded-lg text-xs font-sans placeholder:text-gray-300 focus:outline-none focus:border-violet-600 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 font-mono">CVC Security Code</label>
                <input
                  type="password"
                  required
                  maxLength={4}
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  placeholder="•••"
                  className="w-full px-3 py-2 bg-[#FAFAFA] border border-gray-200 rounded-lg text-xs font-sans placeholder:text-gray-300 focus:outline-none focus:border-violet-600 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-50 shadow-sm"
              >
                {isProcessing ? 'Processing Framework Upgrade...' : 'Complete Safe Payment'}
                {!isProcessing && <ArrowRight size={13} />}
              </button>
            </div>
          </form>

          <p className="text-[10px] text-center text-gray-400 font-sans mt-4 flex items-center justify-center gap-1">
            <ShieldCheck size={12} className="text-gray-400" /> Your connection parameters are completely tokenized and private.
          </p>
        </div>

        {/* Right Side: Order Summary Frame (5 Cols) */}
        <div className="md:col-span-5 bg-white border border-gray-200 rounded-xl p-6 text-left shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
          <h2 className="text-sm font-bold text-gray-950 uppercase tracking-wider font-mono border-b border-gray-100 pb-3 mb-4">Configuration Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xs font-bold text-gray-900">Professional Pro Package</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Annual Runtime Parameter</p>
              </div>
              <span className="text-sm font-extrabold text-gray-950">$23<span className="text-[10px] font-normal text-gray-400">/mo</span></span>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-[11px] text-gray-600 border border-gray-100">
              <div className="flex items-center gap-1.5"><Check size={12} className="text-violet-600" /> Unlimited engine loops</div>
              <div className="flex items-center gap-1.5"><Check size={12} className="text-violet-600" /> Priority context parsing</div>
              <div className="flex items-center gap-1.5"><Check size={12} className="text-violet-600" /> 24/7 core systems SLA</div>
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>$276.00</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Database Allocation Setup</span>
                <span className="text-green-600 font-mono text-[10px] font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-gray-950 font-bold border-t border-dashed border-gray-200 pt-2 text-sm">
                <span>Total Due Today</span>
                <span>$276.00</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 px-6 bg-white text-xs text-gray-400 font-mono mt-auto flex-shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-sm text-gray-900 flex items-center gap-1.5 font-sans">
            <span className="w-4 h-4 bg-violet-600 rounded flex items-center justify-center text-white text-[9px] font-black">L</span>
            Loop
          </span>
          <p className="text-[10px]">&copy; 2026 Loop Engine Studio.</p>
        </div>
      </footer>

    </main>
  );
}