'use client';

import { useState } from 'react';
import { CheckCircle, HelpCircle, ArrowRight, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [menuOpen, setMenuOpen] = useState(false);

  // Price calculations based on period selection
  const plans = [
    {
      name: 'Evaluation Run',
      price: 0,
      desc: 'Evaluate full systemic features parameters completely risk-free.',
      cta: 'Start evaluation run',
      highlight: false,
      features: ['Full access for 14 days', 'Gmail integration', 'Google Drive integration', 'AI chat workspace', 'Smart follow-ups']
    },
    {
      name: 'Basic Tier',
      price: billingPeriod === 'monthly' ? 9 : 7,
      desc: 'Designed for independent builders managing automated timelines.',
      cta: 'Initialize basic tier',
      highlight: false,
      features: ['Everything in Free Trial', 'Unlimited AI messages', 'Unlimited follow-ups', 'Gmail + Drive integration', 'Approval workflows', 'Standard email support']
    },
    {
      name: 'Professional Pro',
      price: billingPeriod === 'monthly' ? 29 : 23,
      desc: 'Built for enterprise operators scaling multi-admin workloads.',
      cta: 'Deploy professional pro',
      highlight: true,
      features: ['Everything in Basic', 'Priority AI processing engine', 'Advanced memory context layers', 'Team workspace sharing', 'Analytics dashboard', '24/7 Priority support']
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#121212] font-sans antialiased selection:bg-violet-100 selection:text-violet-900 overflow-x-hidden relative">
      
      {/* Miro-Style Engineering Grid Sub-layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Notion-Style Clean Header */}
      <header className="border-b border-[#EEEEEE] fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
          <div className="md:hidden border-t border-[#EEEEEE] px-6 py-5 flex flex-col gap-4 bg-white shadow-xl">
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

      {/* Hero Header Area */}
      <section className="pt-36 pb-12 px-6 text-center">
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

      {/* Plan Card Grid */}
      <section className="pb-24 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`p-6 rounded-xl border text-left flex flex-col justify-between bg-white relative transition duration-300 ${
                plan.highlight 
                  ? 'border-violet-600 shadow-md ring-1 ring-violet-600/20 md:scale-[1.02]' 
                  : 'border-gray-200/80 shadow-sm hover:border-gray-300'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-2.5 left-4 px-2 py-0.5 bg-violet-600 text-white font-mono text-[9px] uppercase tracking-wider rounded font-bold">Standard Recommendation</span>
              )}
              <div>
                <h3 className="font-bold text-base text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-xs mb-5 font-normal leading-normal min-h-[32px]">{plan.desc}</p>
                
                <div className="mb-6 flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">${plan.price}</span>
                  <span className="text-xs text-gray-500 font-medium">
                    {plan.price === 0 ? '/ 14 days free' : billingPeriod === 'monthly' ? '/ user / month' : '/ user / month, billed annually'}
                  </span>
                </div>

                <ul className="flex flex-col gap-2.5 mb-8 border-t border-gray-100 pt-5">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-gray-600 font-normal">
                      <span className="text-violet-600 font-bold text-xs leading-none">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                href="/signup" 
                className={`block w-full py-2.5 rounded-lg text-center text-xs font-semibold transition no-underline ${
                  plan.highlight 
                    ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-violet-600/15' 
                    : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Matrix Table */}
      <section className="py-16 px-6 max-w-4xl mx-auto border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight text-left mb-8">Compare deep capabilities</h2>
        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse min-w-[600px] text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-400 font-mono text-[10px] uppercase tracking-wider">
                <th className="p-4 font-bold w-2/5">Platform Feature</th>
                <th className="p-4 font-bold">Evaluation</th>
                <th className="p-4 font-bold">Basic</th>
                <th className="p-4 font-bold">Professional Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-sans text-gray-700">
              <tr>
                <td className="p-4 font-semibold text-gray-900">Gmail Integration Sync</td>
                <td className="p-4 text-gray-400">1 Account</td>
                <td className="p-4 text-gray-600">3 Accounts</td>
                <td className="p-4 text-violet-600 font-bold">Unlimited</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-gray-900">Google Drive Summary Indexes</td>
                <td className="p-4 text-gray-400">Up to 50MB</td>
                <td className="p-4 text-gray-600">Up to 10GB</td>
                <td className="p-4 text-violet-600 font-bold">Uncapped Vectors</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-gray-900">Automated Follow-up Approvals</td>
                <td className="p-4 text-gray-400">Standard holds</td>
                <td className="p-4 text-gray-600">Unlimited queues</td>
                <td className="p-4 text-violet-600 font-bold">Instant multi-branch</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-gray-900">Context Memory Window</td>
                <td className="p-4 text-gray-400">48-hour range</td>
                <td className="p-4 text-gray-600">30-day scope</td>
                <td className="p-4 text-violet-600 font-bold">Infinite lifecycle</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-gray-900">Support Framework SLA</td>
                <td className="p-4 text-gray-400">Community only</td>
                <td className="p-4 text-gray-600">&lt; 24h email response</td>
                <td className="p-4 text-violet-600 font-bold">1h Priority Hook</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Notion Minimal Block CTA */}
      <section className="py-24 px-6 border-t border-gray-200 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">Ready to loop in your tools?</h2>
          <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">Deploy a pristine AI operational framework over your business workspace tasks today.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg text-sm hover:bg-violet-700 transition shadow-md shadow-violet-600/10 no-underline">
            Start Free Trial Initialization <ArrowRight size={14} />
          </Link>
          <p className="text-gray-400 text-[11px] mt-4 font-medium tracking-tight">No credit card authorization required &bull; 14 days evaluation</p>
        </div>
      </section>

      {/* Corporate Minimal Footer */}
      <footer className="border-t border-gray-200 py-12 px-6 bg-white text-xs text-gray-500 font-medium">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
            <span className="w-4 h-4 bg-violet-600 rounded flex items-center justify-center text-white text-[9px] font-black">L</span>
            Loop
          </span>
          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-black transition">Privacy</a>
            <a href="#" className="hover:text-black transition">Terms</a>
            <a href="#" className="hover:text-black transition">Contact</a>
            <Link href="/#features" className="hover:text-black transition no-underline">Features</Link>
            <Link href="/pricing" className="hover:text-black transition no-underline">Pricing</Link>
          </div>
          <p className="text-gray-400 font-mono text-[11px]">&copy; 2026 Loop Engine Studio. All tracking fields certified.</p>
        </div>
      </footer>

    </main>
  );
}