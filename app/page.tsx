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
            <a href="/login" className="px-5 py-2 text-sm text-gray-400 hover:text-white transition">
              Login
            </a>
            <a href="/signup" className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-xl hover:bg-gray-100 transition">
              Start Free Trial
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-400 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Now in Beta — Gmail, Google Drive & Schedule
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[1.0] tracking-tight mb-8">
            The AI Workspace<br />
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Built for Teams
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Loop connects your Gmail, Google Drive and Schedule into one intelligent workspace. Your AI team handles the busywork — you focus on what matters.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/signup" className="px-8 py-4 bg-white text-black font-bold rounded-2xl text-base hover:bg-gray-100 transition shadow-2xl shadow-white/10">
              Start Free Trial →
            </a>
            <a href="#features" className="px-8 py-4 border border-white/10 rounded-2xl text-base hover:bg-white/5 transition text-gray-300">
              See How It Works
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-6">No credit card required · Free 14-day trial</p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-600 mb-8 uppercase tracking-widest">Trusted by modern teams</p>
          <div className="flex flex-wrap justify-center gap-12 text-gray-600 text-sm font-medium">
            {['Acme Corp', 'Vertex Labs', 'Nimbus HQ', 'Forge Studio', 'Atlas Works'].map((company, i) => (
              <span key={i} className="hover:text-gray-400 transition cursor-default">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black tracking-tight mb-4">Everything in one place</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Loop brings your tools together and adds AI on top — so your team moves faster without the chaos.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🧠',
                title: 'AI Chat Workspace',
                desc: 'Chat with an AI that knows your business context, reads your emails and helps you get things done without switching tabs.',
                tag: 'Core'
              },
              {
                icon: '📧',
                title: 'Smart Email Follow-ups',
                desc: 'Tell Loop to follow up with anyone. Set a deadline — if they don\'t reply, Loop drafts the follow-up and waits for your approval.',
                tag: 'Gmail'
              },
              {
                icon: '📁',
                title: 'Drive Intelligence',
                desc: 'Ask Loop to find, summarize or organize files from your Google Drive. No more digging through folders.',
                tag: 'Google Drive'
              },
              {
                icon: '📅',
                title: 'Schedule Management',
                desc: 'Loop reads your calendar, helps you plan your day and automatically schedules meetings without the back and forth.',
                tag: 'Schedule'
              },
              {
                icon: '✅',
                title: 'Human Approval Layer',
                desc: 'Loop never acts without your permission. Every AI action — emails, tasks, events — waits for your one-click approval.',
                tag: 'Control'
              },
              {
                icon: '⚡',
                title: 'Instant Context',
                desc: 'Loop remembers everything — past emails, files, meetings. Every conversation picks up exactly where you left off.',
                tag: 'Memory'
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] p-8 rounded-3xl hover:bg-white/[0.06] hover:border-purple-500/30 transition group">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-400 mb-4">{feature.tag}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black tracking-tight mb-4">How Loop works</h2>
            <p className="text-gray-400 text-lg">Three simple steps to an AI-powered workspace</p>
          </div>
          <div className="flex flex-col gap-6">
            {[
              { step: '01', title: 'Connect your tools', desc: 'Link your Gmail, Google Drive and Calendar in seconds. Loop reads your context and gets up to speed instantly.' },
              { step: '02', title: 'Chat with your AI', desc: 'Tell Loop what you need — send an email, find a file, schedule a meeting. It handles the execution.' },
              { step: '03', title: 'Approve and ship', desc: 'Every action Loop takes lands in your approval queue first. One click to confirm, one click to dismiss.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-8 items-start p-8 bg-white/[0.02] border border-white/[0.05] rounded-3xl hover:border-purple-500/20 transition">
                <span className="text-5xl font-black text-white/10 flex-shrink-0">{item.step}</span>
                <div>
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
          <h2 className="text-5xl font-black tracking-tight mb-4">Built for your stack</h2>
          <p className="text-gray-400 text-lg mb-16">V1 ships with three powerful integrations — more coming soon.</p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: '📧', name: 'Gmail', desc: 'Send, read and follow up on emails automatically' },
              { icon: '📁', name: 'Google Drive', desc: 'Find, summarize and organize your files with AI' },
              { icon: '📅', name: 'Schedule', desc: 'Manage your calendar and meetings intelligently' },
            ].map((integration, i) => (
              <div key={i} className="p-8 bg-white/[0.03] border border-white/[0.06] rounded-3xl hover:border-purple-500/30 transition text-center">
                <div className="text-4xl mb-4">{integration.icon}</div>
                <h3 className="font-bold text-lg mb-2">{integration.name}</h3>
                <p className="text-gray-500 text-sm">{integration.desc}</p>
                <div className="mt-4 inline-block px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400">Available in V1</div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm mt-8">Slack, Notion, Jira, Asana and more coming in V2 🚀</p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-black tracking-tight mb-4">Simple pricing</h2>
          <p className="text-gray-400 text-lg mb-16">Start free. Scale when you're ready.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter',
                price: '$0',
                period: 'Free forever',
                desc: 'Perfect for individuals getting started',
                features: ['1 workspace', 'Gmail integration', '50 AI messages/month', 'Basic follow-ups', 'Community support'],
                cta: 'Get Started Free',
                highlight: false
              },
              {
                name: 'Pro',
                price: '$29',
                period: 'per user / month',
                desc: 'For professionals who want full power',
                features: ['Unlimited workspaces', 'Gmail + Drive + Schedule', 'Unlimited AI messages', 'Smart follow-ups', 'Priority support', 'Approval workflows'],
                cta: 'Start Free Trial',
                highlight: true
              },
              {
                name: 'Team',
                price: '$79',
                period: 'per team / month',
                desc: 'For growing teams that move fast',
                features: ['Everything in Pro', 'Up to 10 members', 'Team AI context', 'Admin controls', 'Analytics dashboard', 'Dedicated support'],
                cta: 'Contact Sales',
                highlight: false
              },
            ].map((plan, i) => (
              <div key={i} className={`p-8 rounded-3xl border text-left relative ${plan.highlight ? 'bg-white text-black border-white' : 'bg-white/[0.03] border-white/[0.06]'}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">Most Popular</div>
                )}
                <h3 className={`font-bold text-xl mb-1 ${plan.highlight ? 'text-black' : ''}`}>{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-gray-500' : 'text-gray-500'}`}>{plan.desc}</p>
                <div className="mb-6">
                  <span className={`text-5xl font-black ${plan.highlight ? 'text-black' : ''}`}>{plan.price}</span>
                  <span className={`text-sm ml-2 ${plan.highlight ? 'text-gray-500' : 'text-gray-500'}`}>{plan.period}</span>
                </div>
                <ul className="flex flex-col gap-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-gray-700' : 'text-gray-400'}`}>
                      <span className={plan.highlight ? 'text-black' : 'text-purple-400'}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="/signup" className={`block w-full py-3 rounded-2xl text-center text-sm font-bold transition ${plan.highlight ? 'bg-black text-white hover:bg-gray-900' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black tracking-tight mb-4">Teams love Loop</h2>
            <p className="text-gray-400 text-lg">Don't take our word for it</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah K.', role: 'Founder @ Nimbus', text: 'Loop saved me 3 hours a day. The follow-up feature alone is worth every penny. I never miss a client response anymore.' },
              { name: 'James T.', role: 'Head of Sales @ Forge', text: 'We closed 40% more deals after switching to Loop. The AI drafts follow-ups so well our clients think I wrote them myself.' },
              { name: 'Amara O.', role: 'PM @ Atlas Works', text: 'Finally a workspace that actually thinks. Loop understands context better than any tool we have tried before.' },
            ].map((testimonial, i) => (
              <div key={i} className="p-8 bg-white/[0.03] border border-white/[0.06] rounded-3xl hover:border-purple-500/20 transition">
                <p className="text-gray-300 text-sm leading-relaxed mb-6">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-sm">{testimonial.name}</p>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black tracking-tight mb-4">Questions? Answered.</h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { q: 'Is my data safe with Loop?', a: 'Absolutely. Loop uses bank-level encryption and never stores your email content on our servers. Your data stays yours.' },
              { q: 'Can Loop send emails without my approval?', a: 'Never. Every email Loop drafts sits in your approval queue first. You always have the final say before anything is sent.' },
              { q: 'What integrations are available in V1?', a: 'V1 ships with Gmail, Google Drive and Schedule. We are actively building Slack, Notion, Jira and Asana for V2.' },
              { q: 'How does the free trial work?', a: 'You get 14 days of full Pro access — no credit card required. After that choose a plan or stay on the free tier.' },
              { q: 'Can I cancel anytime?', a: 'Yes, cancel anytime with no questions asked. We believe in earning your business every month.' },
            ].map((faq, i) => (
              <div key={i} className="border border-white/[0.06] rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/[0.03] transition"
                >
                  <span className="font-medium text-sm">{faq.q}</span>
                  <span className={`text-gray-400 transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
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

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-purple-600/10 rounded-3xl blur-3xl pointer-events-none" />
          <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-3xl p-16">
            <h2 className="text-5xl font-black tracking-tight mb-4">Ready to loop in?</h2>
            <p className="text-gray-400 text-lg mb-8">Join teams already saving hours every week with Loop.</p>
            <a href="/signup" className="inline-block px-10 py-4 bg-white text-black font-bold rounded-2xl text-base hover:bg-gray-100 transition shadow-2xl shadow-white/10">
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