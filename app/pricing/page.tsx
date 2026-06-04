'use client';

import { useState } from 'react';
import { ArrowRight, Menu, X, Sparkles, Activity, Cpu, Layers, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Luxury3DPricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [menuOpen, setMenuOpen] = useState(false);

  const plans = [
    {
      name: 'Evaluation Sandbox',
      price: 0,
      desc: 'Test internal agent parameters and configure basic workspace pipelines.',
      cta: 'Initialize Sandbox',
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
      cta: 'Deploy Basic Tier',
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
      cta: 'Deploy Professional Pro',
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
    <main className="min-h-screen bg-[#09090B] text-[#E4E4E7] font-mono antialiased relative selection:bg-violet-500/30 selection:text-white overflow-x-hidden flex flex-col">
      
      {/* 3D Grid Background Matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f15_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation Header aligned with Core System */}
      <header className="border-b border-[#18181B] bg-[#030303]/80 backdrop-blur-md sticky top-0 w-full h-14 z-50 flex-shrink-0">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" replace={true} className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2 no-underline cursor-pointer">
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
              Loop Engine
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-5">
            <Link 
              href="/login" 
              replace={true}
              className="text-[10px] uppercase tracking-wider font-bold text-[#A1A1AA] hover:text-white transition no-underline cursor-pointer"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              replace={true}
              className="h-8 px-4 bg-white hover:bg-[#E4E4E7] text-black font-black rounded-md transition text-[10px] uppercase tracking-wider flex items-center justify-center shadow-md no-underline cursor-pointer"
            >
              Get Started
            </Link>
          </div>

          <button className="md:hidden text-[#A1A1AA] hover:text-white transition" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown Protection */}
        {menuOpen && (
          <div className="absolute top-14 left-0 w-full bg-[#030303] border-b border-[#18181B] p-6 flex flex-col gap-4 z-50 md:hidden">
            <Link href="/login" replace={true} className="text-xs uppercase tracking-wider font-bold text-[#A1A1AA] no-underline">Login</Link>
            <Link href="/signup" replace={true} className="text-xs uppercase tracking-wider font-bold text-white no-underline">Get Started</Link>
          </div>
        )}
      </header>

      {/* Main Core Layout View */}
      <div className="flex-1 relative z-10 w-full overflow-y-auto max-w-5xl mx-auto px-6 [perspective:1200px]">
        
        <section className="pt-20 pb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] text-violet-400 border border-violet-500/20 px-2.5 py-1 rounded-full bg-[#030303] shadow-inner mx-auto">
            <Sparkles size={11} className="text-violet-500" /> 
            <span>CAPACITY-BASED CORE ALLOCATION</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase max-w-2xl mx-auto leading-tight">
            Tailored Workspace Infrastructure
          </h1>
          <p className="text-xs text-[#A1A1AA] max-w-sm mx-auto font-sans font-medium leading-relaxed pb-4">
            All tiers provision an isolated sandbox container designed explicitly for single-operator high-performance streams.
          </p>

          {/* Runtime Switcher Frame */}
          <div className="inline-flex items-center gap-1 p-1 bg-[#030303] border border-[#18181B] rounded-lg shadow-inner">
            <button
              type="button"
              onClick={() => setBillingPeriod('monthly')}
              className={`h-8 px-4 text-[10px] uppercase tracking-wider font-bold rounded transition-all ${billingPeriod === 'monthly' ? 'bg-white text-black font-black' : 'text-[#52525B] hover:text-[#A1A1AA]'}`}
            >
              Monthly runtime
            </button>
            <button
              type="button"
              onClick={() => setBillingPeriod('yearly')}
              className={`h-8 px-4 text-[10px] uppercase tracking-wider font-bold rounded transition-all flex items-center gap-1.5 ${billingPeriod === 'yearly' ? 'bg-white text-black font-black' : 'text-[#52525B] hover:text-[#A1A1AA]'}`}
            >
              Yearly runtime
              <span className={`px-1 rounded text-[8px] font-mono ${billingPeriod === 'yearly' ? 'bg-violet-600 text-white' : 'bg-violet-500/10 text-violet-400 border border-violet-500/20'}`}>-20%</span>
            </button>
          </div>
        </section>

        {/* Pricing Cards Grid with Custom Depth Elevation */}
        <section className="pb-24">
          <div className="grid md:grid-cols-3 gap-6 items-stretch [transform-style:preserve-3d]">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`p-6 rounded-xl border text-left flex flex-col justify-between bg-[#030303] relative transition-all duration-300 ${
                  plan.highlight 
                    ? 'border-violet-500 shadow-[0_0_40px_rgba(124,58,237,0.1)] md:scale-[1.03] z-10' 
                    : 'border-[#18181B] hover:border-[#27272A] shadow-md'
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-2.5 left-4 px-2 py-0.5 bg-violet-600 text-white font-mono text-[8px] uppercase tracking-wider rounded font-black border border-violet-400/30">Recommended Allocation</span>
                )}
                
                <div className="flex-1 flex flex-col">
                  <h3 className="font-black text-sm uppercase text-white tracking-tight mb-1">{plan.name}</h3>
                  <p className="text-[#A1A1AA] text-[11px] font-sans font-medium mb-5 leading-normal min-h-[32px]">{plan.desc}</p>
                  
                  <div className="mb-6 flex items-baseline gap-1.5">
                    <span className="text-3xl font-black tracking-tight text-white">${plan.price}</span>
                    <span className="text-[10px] text-[#52525B] font-mono uppercase tracking-tight">
                      {plan.price === 0 ? '/ 14-day token' : billingPeriod === 'monthly' ? '/ mo' : '/ mo (annual billing)'}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-3 mb-8 border-t border-[#18181B] pt-5 flex-1">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[11px] text-[#D4D4D8]">
                        <span className="text-violet-400 font-bold text-xs leading-none mt-0.5">✓</span>
                        <span className="tracking-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Get Started Action Redirect Block */}
                <Link 
                  href="/signup" 
                  replace={true}
                  className="block w-full mt-4 py-2.5 bg-white hover:bg-[#E4E4E7] text-black text-center text-[10px] font-black uppercase tracking-wider rounded-md transition no-underline shadow-md cursor-pointer"
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#18181B] bg-[#030303] py-8 text-center text-[10px] text-[#52525B] w-full">
          <p>© 2026 LOOP SYSTEM TECHNOLOGIES. ALL CAPACITY METRICS RESERVED.</p>
        </footer>

      </div>
    </main>
  );
}