'use client';

import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();

  const plans = [
    {
      name: 'Starter Sandbox',
      price: '$0',
      period: 'Forever free',
      desc: 'Test autonomous workflows with basic API loops.',
      features: ['2 Active AI Agents', '100 Automated Emails / mo', 'Standard Processing Speed', 'Community Support'],
      buttonText: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Pro Workspace',
      price: '$79',
      period: 'per month',
      desc: 'Scale automation across your entire digital business infrastructure.',
      features: ['Unlimited Active Agents', '10,000 Automated Actions / mo', 'Instantaneous Execution Priority', '24/7 Priority Support', 'Custom API Marketplace Access'],
      buttonText: 'Upgrade to Pro',
      popular: true,
    },
    {
      name: 'Enterprise Loop',
      price: '$299',
      period: 'per month',
      desc: 'Custom parameters and high-volume limits for corporate teams.',
      features: ['Dedicated Virtual Node Infrastructure', 'Unlimited Everything', 'Custom KYA Verification Setup', 'Dedicated Account Engineer', 'SLA Contract Guarantees'],
      buttonText: 'Contact Enterprise',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111827] font-sans antialiased flex flex-col justify-between p-6 md:p-8">
      {/* HEADER SECTION */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <div 
          onClick={() => router.push('/')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-6 h-6 rounded-lg bg-[#2563EB] flex items-center justify-center transition shadow-sm group-hover:bg-[#1D4ED8]">
            <div className="w-2.5 h-2.5 rounded-sm bg-white" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-[#111827]">Loop</span>
        </div>
      </header>

      {/* PRICING CONTENT SECTIONS */}
      <main className="flex-1 max-w-5xl w-full mx-auto my-12 flex flex-col justify-center space-y-10">
        <div className="space-y-2 text-center max-w-md mx-auto">
          <h1 className="text-2xl font-black tracking-tight text-[#111827]">Select Operating Parameters</h1>
          <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
            Choose the capacity your workspace needs. All plans include automated calendar scheduling and meeting summaries.
          </p>
        </div>

        {/* PRICING CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`bg-white border rounded-2xl p-6 flex flex-col justify-between relative shadow-sm ${
                plan.popular ? 'border-[#2563EB] ring-1 ring-[#2563EB]/10' : 'border-[#E5E7EB]'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 left-6 bg-[#2563EB] text-white text-[9px] font-black uppercase tracking-wider px-2.5 h-5 rounded-full flex items-center justify-center">
                  Most Popular
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-[#4B5563] uppercase tracking-wider">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-black tracking-tight text-[#111827]">{plan.price}</span>
                    <span className="text-xs font-semibold text-[#6B7280]">{plan.period}</span>
                  </div>
                  <p className="text-[11px] text-[#6B7280] font-medium mt-2 leading-relaxed">{plan.desc}</p>
                </div>

                <div className="w-full h-px bg-[#F3F4F6]" />

                <ul className="space-y-2.5">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[11px] font-medium text-[#4B5563]">
                      <span className="text-[#2563EB] text-xs font-bold leading-none mt-0.5">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => router.push('/billing')}
                className={`w-full h-10 rounded-xl text-xs font-bold mt-8 shadow-sm transition flex items-center justify-center ${
                  plan.popular 
                    ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white' 
                    : 'bg-white hover:bg-[#F9FAFB] text-[#111827] border border-[#E5E7EB]'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER SECTION */}
      <footer className="max-w-7xl w-full mx-auto border-t border-[#F3F4F6] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[11px] font-medium text-[#9CA3AF]">
          © {new Date().getFullYear()} Loop Technologies Inc. All parameters reserved.
        </span>
      </footer>
    </div>
  );
}