'use client';

import { useState } from 'react';
import { CheckCircle, HelpCircle, ArrowRight, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [menuOpen, setMenuOpen] = useState(false);

  // ... (keep your existing plans array exactly the same)

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#121212] font-sans antialiased selection:bg-violet-100 selection:text-violet-900 overflow-x-hidden relative flex flex-col">
      
      {/* Miro-Style Engineering Grid Sub-layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Notion-Style Clean Header - Added absolute solid background and crisp border layer */}
      <header className="border-b border-[#EEEEEE] fixed top-0 left-0 right-0 h-16 z-50 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-lg font-bold tracking-tight text-[#121212] flex items-center gap-2 no-underline">
              <span className="w-5 h-5 bg-violet-600 rounded-md flex items-center justify-center text-white text-xs font-black">L</span>
              Loop
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-[13px] text-gray-500 font-medium">
              <Link href="/#features" className="hover:text-black transition no-underline">Features</Link>
              <Link href="/#demo" className="hover:text-black transition no-underline">Product Demo</Link>
              <Link href="/pricing" className="text-violet-600 font-bold no-underline">Pricing</Link>
              <Link href="/#faq" className="hover:text-black transition no-underline">FAQ</Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-[13px] text-gray-500 hover:text-black font-medium transition no-underline">Log in</Link>
            <Link href="/signup" className="px-4 py-2 bg-violet-600 text-white text-[13px] font-semibold rounded-lg hover:bg-violet-700 transition shadow-sm shadow-violet-600/10 no-underline">
              Start free trial
            </Link>
          </div>
          <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="absolute top-16 left-0 right-0 border-b border-[#EEEEEE] px-6 py-5 flex flex-col gap-4 bg-white shadow-xl z-50">
            <Link href="/#features" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-black transition text-sm font-medium no-underline">Features</Link>
            <Link href="/#demo" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-black transition text-sm font-medium no-underline">Product Demo</Link>
            <Link href="/pricing" onClick={() => setMenuOpen(false)} className="text-violet-600 font-bold text-sm no-underline">Pricing</Link>
            <Link href="/#faq" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-black transition text-sm font-medium no-underline">FAQ</Link>
            <div className="h-px bg-gray-100 my-1" />
            <Link href="/login" className="text-gray-600 hover:text-black transition text-sm font-medium no-underline">Log in</Link>
            <Link href="/signup" className="px-4 py-2.5 bg-violet-600 text-white text-sm font-bold rounded-lg hover:bg-violet-700 transition text-center shadow-sm no-underline">Start free trial</Link>
          </div>
        )}
      </header>

      {/* Content Container - Pushed down by 16 units (pt-16) to completely clear the fixed header line */}
      <div className="flex-1 pt-16 relative z-10">
        
        {/* Hero Header Area */}
        <section className="pt-20 pb-12 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-200 bg-violet-50 text-xs text-violet-700 font-semibold mb-6 shadow-sm">
              Licensing Architecture
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Honest pricing. Real business value.
            </h1>
            <p className="text-sm md:text-base text-gray-500 max-w-lg mx-auto mb-10">
              Start completely free with an evaluation container. Upgrade or scale down whenever your resource parameters demand.
            </p>

            {/* Billing Toggle Control */}
            <div className="inline-flex items-center gap-2 p-1 bg-gray-100 rounded-xl border border-gray-200/80">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${billingPeriod === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Monthly billing
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${billingPeriod === 'yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Yearly billing
                <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-[9px] font-bold uppercase tracking-wide font-mono">Save ~20%</span>
              </button>
            </div>
          </div>
        </section>

        {/* ... (Keep the rest of your page sections, tables, and footers here) */}

      </div>
    </main>
  );
}