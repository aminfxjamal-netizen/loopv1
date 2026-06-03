'use client';

import { useState } from 'react';
import { ArrowRight, Menu, X, Sparkles, Check } from 'lucide-react';
import Link from 'next/link';

export default function RebuiltPricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [menuOpen, setMenuOpen] = useState(false);

  // High-converting single-user capacity metrics
  const plans = [
    {
      name: 'Evaluation Sandbox',
      price: 0,
      desc: 'Test internal agent parameters and configure basic workspace pipelines.',
      cta: 'Start evaluation run',
      highlight: false,
      features: [
        'Single user workspace license',
        '1 Connected Gmail Account',
        '1 Connected Google Drive',
        '250 Automated tasks / mo',
        'Standard execution queue'
      ]
    },
    {
      name: 'Basic Container',
      price: billingPeriod === 'monthly' ? 19 : 15,
      desc: 'Ideal for independent builders scaling personal workspace tasks.',
      cta: 'Initialize basic tier',
      highlight: false,
      features: [
        'Single user workspace license',
        '3 Connected Gmail Accounts',
        '3 Connected Google Drive sources',
        '5,000 Automated tasks / mo',
        'Dedicated variable memory storage'
      ]
    },
    {
      name: 'Professional Routine',
      price: billingPeriod === 'monthly' ? 49 : 39,
      desc: 'Uncapped processing throughput for high-frequency power operators.',
      cta: 'Deploy professional pro',
      highlight: true,
      features: [
        'Single user workspace license',
        'Unlimited connected Google accounts',
        'Unlimited vector index folders',
        '25,000 Automated tasks / mo',
        'Priority execution speed queue',
        '24/7 dedicated support'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#121212] font-sans antialiased selection:bg-violet-100 selection:text-violet-900 overflow-x-hidden relative flex flex-col">
      
      {/* Premium Engineered Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-30 pointer-events-none z-0" />

      {/* Sticky Navigation Header */}
      <header className="border-b border-[#EEEEEE] sticky top-0 w-full h-16 z-50 bg-white/80 backdrop-blur-md flex-shrink-0">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-lg font-bold tracking-tight text-[#121212] flex items-center gap-2 no-underline">
              <span className="w-5 h-5 bg-violet-600 rounded-md flex items-center justify-center text-white text-xs font-black">L</span>
              Loop
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-[13px] text-gray-500 font-medium">
              <Link href="/#features" className="hover:text-black transition no-underline">Features</Link>
              <Link href="/pricing" className="text-violet-600 font-bold no-underline">Pricing</Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-[13px] text-gray-500 hover:text-black font-semibold transition no-underline">Access Old Account</Link>
            <Link href="/signup" className="px-4 py-2 bg-violet-600 text-white text-[13px] font-bold rounded-lg hover:bg-violet-700 transition shadow-sm shadow-violet-600/10 no-underline">
              Start free trial
            </Link>
          </div>
          <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Main Core Layout View */}
      <div className="flex-1 relative z-10 w-full overflow-y-auto">
        
        <section className="pt-16 pb-12 px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-200 bg-violet-50 text-[10px] text-violet-700 font-bold uppercase tracking-wider font-mono shadow-sm mx-auto">
              <Sparkles size={11} /> Capacity-based scaling
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-950 max-w-2xl mx-auto leading-[1.1]">
              Uncapped routines.<br />Tailored workspace infrastructure.
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto font-normal leading-relaxed pb-4">
              All plans provision an isolated sandbox container designed explicitly for single-operator high productivity workflows.
            </p>

            {/* Interactive Run Period Switcher */}
            <div className="inline-flex items-center gap-2 p-1 bg-white border border-gray-200 rounded-xl shadow-sm">
              <button
                type="button"
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${billingPeriod === 'monthly' ? 'bg-violet-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Monthly runtime
              </button>
              <button
                type="button"
                onClick={() => setBillingPeriod('yearly')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${billingPeriod === 'yearly' ? 'bg-violet-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Yearly runtime
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-wide font-mono ${billingPeriod === 'yearly' ? 'bg-violet-500 text-white' : 'bg-green-100 text-green-700'}`}>-20%</span>
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Cards Grid */}
        <section className="pb-24 px-6 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto items-stretch">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`p-6 rounded-2xl border text-left flex flex-col justify-between bg-white relative transition duration-300 ${
                  plan.highlight 
                    ? 'border-violet-600 shadow-[0_12px_40px_rgba(124,58,237,0.04)] md:scale-[1.02]' 
                    : 'border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-2.5 left-4 px-2 py-0.5 bg-violet-600 text-white font-mono text-[9px] uppercase tracking-wider rounded font-black">Recommended Allocation</span>
                )}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-bold text-base text-gray-950 mb-1">{plan.name}</h3>
                  <p className="text-gray-400 text-[11px] mb-5 font-normal leading-normal min-h-[32px]">{plan.desc}</p>
                  
                  <div className="mb-6 flex items-baseline gap-1.5">
                    <span className="text-4xl font-black tracking-tight text-gray-950">${plan.price}</span>
                    <span className="text-[11px] text-gray-400 font-mono font-medium">
                      {plan.price === 0 ? '/ 14-day token' : billingPeriod === 'monthly' ? '/ mo' : '/ mo (billed annually)'}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-3 mb-8 border-t border-gray-100 pt-5 flex-1">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-gray-600 font-normal">
                        <span className="text-violet-600 font-bold text-xs leading-none mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 10/10 Premium Uniform Solid Violet Buttons */}
                <Link 
                  href="/billing" 
                  className="block w-full mt-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-center text-xs font-bold rounded-lg transition no-underline shadow-sm shadow-violet-600/10"
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-12 px-6 bg-white text-xs text-gray-400 font-medium">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
              <span className="w-4 h-4 bg-violet-600 rounded flex items-center justify-center text-white text-[9px] font-black">L</span>
              Loop Engine
            </span>
            <p className="font-mono text-[10px]">&copy; 2026 Loop Engine Studio. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </main>
  );
}