'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#08090A] text-white overflow-x-hidden">

      {/* Navbar */}
      <header className="border-b border-white/5 fixed w-full z-50 bg-[#08090A]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Loop" width={36} height={36} className="rounded-xl" />
            <span className="text-xl font-bold tracking-tight">Loop</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#integrations" className="hover:text-white transition">Integrations</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="/login" className="px-5 py-2 text-sm text-gray-400 hover:text-white transition">Login</a>
            <a href="/signup" className="px-5 py-2 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-500 transition shadow-lg shadow-violet-500/25">
              Start Free Trial
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 text-sm text-violet-300 mb-10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
            Now in Beta — Gmail, Google Drive & Schedule
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[1.0] tracking-tight mb-8">
            Your business.<br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              On autopilot.
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Loop is an AI workspace that connects your Gmail, Google Drive and Calendar — then handles your follow-ups, files and schedule automatically. You stay in control. Always.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/signup" className="px-8 py-4 bg-violet-600 text-white font-bold rounded-2xl text-base hover:bg-violet-500 transition shadow-2xl shadow-violet-500/20">
              Start Free Trial →
            </a>
            <a href="#features" className="px-8 py-4 border border-white/10 rounded-2xl text-base hover:bg-white/5 transition text-gray-300">
              See How It Works
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-6">No credit card required · Free 14-day trial · Cancel anytime</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-violet-400 text-sm font-medium uppercase tracking-widest mb-4">Features</p>
            <h2 className="text-5xl font-black tracking-tight mb-4">Built different.<br />Works better.</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Loop brings your tools together and adds AI intelligence on top — so you move faster without the chaos.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: '🧠',
                title: 'AI Chat Workspace',
                desc: 'Chat with an AI that understands your business. Ask it to send emails, find files or manage your schedule — all from one place.',
                tag: 'Core'
              },
              {
                icon: '📧',
                title: 'Smart Follow-ups',
                desc: 'Set a follow-up deadline on any email. If they don\'t reply in time, Loop drafts the follow-up and asks for your approval before sending.',
                tag: 'Gmail'
              },
              {
                icon: '📁',
                title: 'Drive Intelligence',
                desc: 'Ask Loop to find, summarize or organize any file from your Google Drive. No more endless folder searching.',
                tag: 'Google Drive'
              },
              {
                icon: '📅',
                title: 'Schedule Management',
                desc: 'Loop reads your calendar and helps you plan your day, schedule meetings and never miss an important event.',
                tag: 'Schedule'
              },
              {
                icon: '✅',
                title: 'You Stay In Control',
                desc: 'Loop never acts without your permission. Every AI action waits for your one-click approval before anything happens.',
                tag: 'Control'
              },
              {
                icon: '⚡',
                title: 'Full Context Memory',
                desc: 'Loop remembers your past emails, files and meetings. Every conversation picks up exactly where you left off.',
                tag: 'Memory'
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-3xl hover:bg-violet-500/5 hover:border-violet-500/20 transition group cursor-default">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <div className="inline-block px-3 py-1 bg-violet-500/10 border border-violet-500/15 rounded-full text-xs text-violet-400 mb-4">{feature.tag}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 bg-white/[0.015]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-violet-400 text-sm font-medium uppercase tracking-widest mb-4">How It Works</p>
            <h2 className="text-5xl font-black tracking-tight mb-4">Simple by design.</h2>
            <p className="text-gray-400 text-lg">Three steps to an AI workspace that works for you</p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              {
                step: '01',
                title: 'Connect your tools',
                desc: 'Link your Gmail, Google Drive and Google Calendar in seconds. Loop reads your context and gets up to speed instantly — no setup needed.'
              },
              {
                step: '02',
                title: 'Chat with your AI',
                desc: 'Tell Loop what you need in plain English. Send an email to John, find last month\'s proposal, schedule a meeting on Friday — it handles it.'
              },
              {
                step: '03',
                title: 'Approve and go',
                desc: 'Every action Loop prepares lands in your approval queue first. One click to confirm, one click to dismiss. You are always in charge.'
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-8 items-start p-8 bg-white/[0.02] border border-white/[0.05] rounded-3xl hover:border-violet-500/20 transition">
                <span className="text-6xl font-black text-violet-500/20 flex-shrink-0 leading-none">{item.step}</span>
                <div className="pt-2">
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-violet-400 text-sm font-medium uppercase tracking-widest mb-4">Integrations</p>
          <h2 className="text-5xl font-black tracking-tight mb-4">Your tools.<br />Supercharged.</h2>
          <p className="text-gray-400 text-lg mb-16 max-w-xl mx-auto">Loop connects directly to the tools you already use every day.</p>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                logo: '/gmail.png',
                name: 'Gmail',
                desc: 'Send emails, track replies and handle follow-ups automatically'
              },
              {
                logo: '/gdrive.png',
                name: 'Google Drive',
                desc: 'Find, summarize and organize your files with AI assistance'
              },
              {
                logo: '/gcalendar.png',
                name: 'Google Calendar',
                desc: 'Manage your schedule and meetings intelligently'
              },
            ].map((integration, i) => (
              <div key={i} className="p-8 bg-white/[0.02] border border-white/[0.05] rounded-3xl hover:border-violet-500/20 transition text-center group">
                <div className="w-16 h-16 mx-auto mb-4 relative">
                  <Image src={integration.logo} alt={integration.name} width={64} height={64} className="object-contain" />
                </div>
                <h3 className="font-bold text-lg mb-2">{integration.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{integration.desc}</p>
                <div className="mt-4 inline-block px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400">Connected</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-violet-400 text-sm font-medium uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="text-5xl font-black tracking-tight mb-4">Honest pricing.<br />Real value.</h2>
          <p className="text-gray-400 text-lg mb-16">Start free. Upgrade when Loop proves its worth.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Free Trial',
                price: '$0',
                period: '14 days free',
                desc: 'Try everything Loop has to offer — no card needed.',
                features: [
                  'Full access for 14 days',
                  'Gmail integration',
                  'Google Drive integration',
                  'Google Calendar integration',
                  'AI chat workspace',
                  'Smart follow-ups',
                ],
                cta: 'Start Free Trial',
                href: '/signup',
                highlight: false
              },
              {
                name: 'Basic',
                price: '$9',
                period: 'per user / month',
                desc: 'For individuals who want AI working for them every day.',
                features: [
                  'Everything in Free Trial',
                  'Unlimited AI messages',
                  'Unlimited follow-ups',
                  'Gmail + Drive + Calendar',
                  'Approval workflows',
                  'Email support',
                ],
                cta: 'Get Basic',
                href: '/signup',
                highlight: false
              },
              {
                name: 'Pro',
                price: '$29',
                period: 'per user / month',
                desc: 'For professionals and teams who run on Loop.',
                features: [
                  'Everything in Basic',
                  'Priority AI processing',
                  'Advanced memory context',
                  'Team workspace sharing',
                  'Analytics dashboard',
                  'Priority support',
                ],
                cta: 'Get Pro',
                href: '/signup',
                highlight: true
              },
            ].map((plan, i) => (
              <div key={i} className={`p-8 rounded-3xl border text-left relative flex flex-col ${plan.highlight ? 'bg-violet-600 border-violet-500' : 'bg-white/[0.02] border-white/[0.06]'}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-violet-600 text-xs font-black rounded-full whitespace-nowrap">Most Popular</div>
                )}
                <div>
                  <h3 className={`font-bold text-xl mb-1 ${plan.highlight ? 'text-white' : ''}`}>{plan.name}</h3>
                  <p className={`text-sm mb-6 ${plan.highlight ? 'text-violet-200' : 'text-gray-500'}`}>{plan.desc}</p>
                  <div className="mb-6">
                    <span className={`text-5xl font-black ${plan.highlight ? 'text-white' : ''}`}>{plan.price}</span>
                    <span className={`text-sm ml-2 ${plan.highlight ? 'text-violet-200' : 'text-gray-500'}`}>{plan.period}</span>
                  </div>
                  <ul className="flex flex-col gap-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-violet-100' : 'text-gray-400'}`}>
                        <span className={plan.highlight ? 'text-white' : 'text-violet-400'}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href={plan.href} className={`block w-full py-3 rounded-2xl text-center text-sm font-bold transition mt-auto ${plan.highlight ? 'bg-white text-violet-600 hover:bg-violet-50' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-violet-400 text-sm font-medium uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="text-5xl font-black tracking-tight mb-4">Questions?<br />Answered.</h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              {
                q: 'Is my data safe with Loop?',
                a: 'Yes. Loop uses industry-standard encryption for all data in transit and at rest. We never store the content of your emails on our servers — your data stays in your Google account.'
              },
              {
                q: 'Can Loop send emails without my approval?',
                a: 'Never. Every email or action Loop prepares sits in your approval queue first. Nothing is sent or executed without your explicit one-click confirmation.'
              },
              {
                q: 'What integrations are available right now?',
                a: 'Loop currently connects with Gmail, Google Drive and Google Calendar. We are actively building more integrations — join the waitlist to be first to know.'
              },
              {
                q: 'How does the free trial work?',
                a: 'You get 14 days of full access to everything Loop offers — no credit card required. After 14 days you can choose the Basic or Pro plan to continue.'
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, absolutely. Cancel anytime from your account settings — no questions, no hidden fees, no lock-in contracts.'
              },
              {
                q: 'Does Loop work for teams?',
                a: 'The Pro plan includes team workspace sharing so multiple people can collaborate inside one Loop workspace. Team-specific plans are coming soon.'
              },
            ].map((faq, i) => (
              <div key={i} className="border border-white/[0.06] rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/[0.03] transition"
                >
                  <span className="font-medium text-sm">{faq.q}</span>
                  <span className={`text-gray-400 text-xl transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/[0.06] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-violet-600/10 rounded-3xl blur-3xl pointer-events-none" />
          <div className="relative bg-white/[0.02] border border-violet-500/20 rounded-3xl p-16">
            <h2 className="text-5xl font-black tracking-tight mb-4">Ready to loop in?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">Join the teams already saving hours every week with Loop. Start free today.</p>
            <a href="/signup" className="inline-block px-10 py-4 bg-violet-600 text-white font-bold rounded-2xl text-base hover:bg-violet-500 transition shadow-2xl shadow-violet-500/20">
              Start Free Trial →
            </a>
            <p className="text-gray-600 text-sm mt-4">No credit card · 14-day free trial · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Loop" width={28} height={28} className="rounded-lg" />
            <span className="font-bold">Loop</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-600">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
          </div>
          <p className="text-gray-600 text-sm">© 2026 Loop. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}