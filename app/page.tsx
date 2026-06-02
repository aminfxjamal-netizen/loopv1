'use client';

import { useState } from 'react';
import { Mail, FolderOpen, Calendar, Brain, CheckCircle, Zap, ArrowRight, Menu, X } from 'lucide-react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#030303] text-zinc-100 overflow-x-hidden antialiased selection:bg-violet-500/30 selection:text-white">
      
      {/* Background Mesh Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.25] pointer-events-none" />

      {/* Navbar */}
      <header className="border-b border-zinc-800/40 fixed w-full top-0 z-50 bg-[#030303]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Loop</span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400 font-medium">
            <a href="#features" className="hover:text-zinc-200 transition-colors">Features</a>
            <a href="#integrations" className="hover:text-zinc-200 transition-colors">Integrations</a>
            <a href="#pricing" className="hover:text-zinc-200 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-zinc-200 transition-colors">FAQ</a>
          </nav>
          <div className="hidden md:flex items-center gap-5">
            <a href="/login" className="text-sm text-zinc-400 hover:text-zinc-200 font-medium transition-colors">Login</a>
            <a href="/signup" className="px-4 py-2 bg-zinc-100 text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition-all duration-200 shadow-sm">
              Start Free Trial
            </a>
          </div>
          <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-zinc-800 px-6 py-6 flex flex-col gap-4 bg-[#030303]">
            <a href="#features" onClick={() => setMenuOpen(false)} className="text-zinc-400 hover:text-white transition text-sm">Features</a>
            <a href="#integrations" onClick={() => setMenuOpen(false)} className="text-zinc-400 hover:text-white transition text-sm">Integrations</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-zinc-400 hover:text-white transition text-sm">Pricing</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="text-zinc-400 hover:text-white transition text-sm">FAQ</a>
            <div className="h-px bg-zinc-800 my-2" />
            <a href="/login" className="text-zinc-400 hover:text-white transition text-sm">Login</a>
            <a href="/signup" className="px-5 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-500 transition text-center">Start Free Trial</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-44 pb-32 px-6 relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 text-xs font-medium text-violet-300 mb-8 transition-all hover:border-violet-500/50">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Now in Beta
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Your business.
            <span className="block mt-2 bg-gradient-to-r from-zinc-100 via-violet-200 to-violet-400 bg-clip-text text-transparent pb-1">
              On autopilot.
            </span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            Loop connects your Gmail, Google Drive and Calendar into one intelligent workspace. Your AI handles follow-ups, files and scheduling automatically — you stay in control. Always.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="/signup" className="w-full sm:w-auto px-6 py-3.5 bg-violet-600 text-white font-medium rounded-xl text-sm hover:bg-violet-500 transition-all shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2 group">
              Start Free Trial <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="#features" className="w-full sm:w-auto px-6 py-3.5 border border-zinc-800 rounded-xl text-sm font-medium hover:bg-zinc-900 hover:text-white transition text-zinc-300 bg-zinc-900/40">
              See How It Works
            </a>
          </div>
          <p className="text-xs text-zinc-600 mt-6 tracking-wide">No credit card required · Free 14-day trial · Cancel anytime</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 relative border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Built different. Works better.</h2>
            <p className="text-zinc-400 text-base max-w-md mx-auto">Loop brings your tools together and adds native AI intelligence seamlessly.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain size={22} className="text-violet-400" />,
                title: 'AI Chat Workspace',
                desc: 'Chat with an AI that understands your business data context. Ask it to draft emails, dig through documents or coordinate calendar blocks easily.',
                tag: 'Core'
              },
              {
                icon: <Mail size={22} className="text-violet-400" />,
                title: 'Smart Follow-ups',
                desc: 'Assign deadlines dynamically. If an external client misses a deadline, Loop drafts smart touchpoint alternatives waiting inside your pipeline dashboard.',
                tag: 'Gmail'
              },
              {
                icon: <FolderOpen size={22} className="text-violet-400" />,
                title: 'Drive Intelligence',
                desc: 'Query unstructured text from legacy drives effortlessly. Generate executive sheets and operational insights without manual sorting maps.',
                tag: 'Google Drive'
              },
              {
                icon: <Calendar size={22} className="text-violet-400" />,
                title: 'Schedule Management',
                desc: 'Cross-reference upcoming events automatically. Flag overlapping meeting items, suggest structural optimizations, and block deep-work buffers.',
                tag: 'Schedule'
              },
              {
                icon: <CheckCircle size={22} className="text-violet-400" />,
                title: 'You Stay In Control',
                desc: 'Loop stays bound within configured permission limits. Outgoing interactions populate a localized queue needing a physical validation click.',
                tag: 'Control'
              },
              {
                icon: <Zap size={22} className="text-violet-400" />,
                title: 'Full Context Memory',
                desc: 'Maintains long-tail operational context history. Retain complex parameters between long interval sequences without refreshing explicit chat histories.',
                tag: 'Memory'
              },
            ].map((feature, i) => (
              <div key={i} className="group bg-zinc-950/40 border border-zinc-900 p-6 rounded-2xl hover:border-zinc-800 transition-all duration-300 relative flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center mb-4 border border-zinc-800/60 group-hover:border-violet-500/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-zinc-200 text-base mb-1.5">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-normal">{feature.desc}</p>
                </div>
                <div className="inline-flex self-start px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-md text-[11px] font-medium text-zinc-400">
                  {feature.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-zinc-950/20 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">Simple by design.</h2>
            <p className="text-zinc-400 text-base">Setup takes minutes. Streamline your workflow immediately.</p>
          </div>
          
          <div className="flex flex-col gap-4">
            {[
              {
                step: '01',
                title: 'Connect your tools',
                desc: 'Link your Gmail and Google Drive securely. Loop structures your workflow parameters behind the scenes without rewriting files.'
              },
              {
                step: '02',
                title: 'Chat with your AI',
                desc: 'Instruct your pipeline using natural phrasing. Prompt cross-app combinations like "Draft a performance report from my latest drive document and email it over."'
              },
              {
                step: '03',
                title: 'Approve and deploy',
                desc: 'Actions land safely inside your local dashboard queue. Click once to edit or send instantly. Your boundaries are respected entirely.'
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start p-6 bg-zinc-950/30 border border-zinc-900 rounded-2xl hover:border-zinc-800/80 transition-colors">
                <span className="text-3xl font-bold bg-gradient-to-b from-zinc-700 to-transparent bg-clip-text text-transparent flex-shrink-0 leading-none">{item.step}</span>
                <div>
                  <h3 className="font-semibold text-zinc-200 text-base mb-1">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="py-24 px-6 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">Integrations</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Your infrastructure, supercharged.</h2>
          <p className="text-zinc-400 text-base mb-14 max-w-md mx-auto">Loop works within ecosystem tools you rely on daily.</p>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { name: 'Gmail', icon: <Mail size={20} className="text-violet-400" />, desc: 'Draft touchpoints, analyze email history threads, and flag missing follow-ups.' },
              { name: 'Google Drive', icon: <FolderOpen size={20} className="text-violet-400" />, desc: 'Scan PDFs, index documents, and extract explicit business context securely.' },
              { name: 'Google Calendar', icon: <Calendar size={20} className="text-violet-400" />, desc: 'Manage meeting booking workflows, optimize times, and guard focus windows.' },
            ].map((integration, i) => (
              <div key={i} className="p-6 bg-zinc-950/40 border border-zinc-900 rounded-2xl flex flex-col justify-between items-center text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                    {integration.icon}
                  </div>
                  <h3 className="font-semibold text-zinc-200 text-base mb-1.5">{integration.name}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed px-2">{integration.desc}</p>
                </div>
                <button className="mt-6 w-full py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium rounded-lg transition-colors">
                  Configure
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-zinc-950/20 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">Transparent tiers for growing businesses.</h2>
          <p className="text-zinc-400 text-base mb-14">Get started for free. Lock in values that fit your workspace growth.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Free Trial',
                price: '$0',
                period: '14 days trial',
                desc: 'Explore baseline workspace interactions without risk parameters.',
                features: ['Full platform evaluation windows', 'Standard Gmail processing modules', 'Basic Document parsing pipelines', 'Single workspace instance profile'],
                cta: 'Start Free Trial',
                highlight: false
              },
              {
                name: 'Basic',
                price: '$9',
                period: '/ month',
                desc: 'For independent builders requiring active day-to-day context.',
                features: ['Uncapped processing allowances', 'Continuous automated response loops', 'Expanded cloud document sync lines', 'Priority operational query speeds'],
                cta: 'Choose Basic',
                highlight: false
              },
              {
                name: 'Pro',
                price: '$29',
                period: '/ month',
                desc: 'For teams integrating data nodes across multi-person systems.',
                features: ['Advanced collective context engines', 'Deeper operational vector parameters', 'Shared administrative permissions', 'Premium 24/7 routing support lines'],
                cta: 'Upgrade to Pro',
                highlight: true
              },
            ].map((plan, i) => (
              <div key={i} className={`p-6 rounded-2xl border text-left flex flex-col justify-between relative ${plan.highlight ? 'bg-zinc-900/60 border-violet-500/40 shadow-xl' : 'bg-zinc-950/40 border-zinc-900'}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-4 px-2.5 py-0.5 bg-violet-600 border border-violet-500 text-[10px] font-bold uppercase tracking-wider text-white rounded-md">Most Popular</div>
                )}
                <div>
                  <h3 className="font-semibold text-zinc-100 text-lg mb-1">{plan.name}</h3>
                  <p className="text-xs text-zinc-500 mb-6 min-h-[32px]">{plan.desc}</p>
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                    <span className="text-xs text-zinc-500 font-normal">{plan.period}</span>
                  </div>
                  <ul className="flex flex-col gap-3 mb-8 border-t border-zinc-900/60 pt-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-xs text-zinc-400 leading-normal">
                        <span className="text-violet-400 text-xs mt-0.5">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="/signup" className={`block w-full py-2.5 rounded-xl text-center text-xs font-medium transition-all ${plan.highlight ? 'bg-violet-600 text-white hover:bg-violet-500 shadow-md shadow-violet-600/10' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800/80'}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">FAQ</p>
            <h2 className="text-3xl font-bold tracking-tight text-white">Common Queries</h2>
          </div>
          
          <div className="flex flex-col gap-2">
            {[
              { q: 'Is my data safe with Loop?', a: 'Yes. Loop relies on end-to-end industry security protocols for transport paths. Core body elements of external emails stay completely contained within secure authentication systems inside Google ecosystem spaces.' },
              { q: 'Can Loop execute tasks without approval?', a: 'Absolutely not. Outbound interactions sit securely inside structured local verification pipelines needing an active user choice to submit or dismiss.' },
              { q: 'What integrations are currently active?', a: 'Loop interfaces natively with Google Workspace core systems, handling operations inside Gmail, Drive pipelines, and Calendar layouts.' },
              { q: 'How does the trial function?', a: 'Enjoy complete uncapped capabilities across 14 operational days without requiring card information files on initial setup workflows.' },
            ].map((faq, i) => (
              <div key={i} className="border border-zinc-900 rounded-xl bg-zinc-950/20 overflow-hidden transition-colors hover:border-zinc-800/60">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between transition-colors"
                >
                  <span className="font-medium text-sm text-zinc-200">{faq.q}</span>
                  <span className={`text-zinc-500 text-lg transition-transform duration-200 ${openFaq === i ? 'rotate-45 text-violet-400' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-zinc-400 text-xs leading-relaxed border-t border-zinc-900/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern High-Impact CTA Block */}
      <section className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center relative rounded-3xl border border-zinc-800/40 bg-zinc-950/40 px-8 py-16 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-violet-600/10 rounded-full blur-[80px] pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">Ready to loop in?</h2>
          <p className="text-zinc-400 text-sm mb-8 max-w-sm mx-auto font-normal">Connect your workspace tools and scale your administrative workflows automatically today.</p>
          <a href="/signup" className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-black text-sm font-medium rounded-xl transition-all shadow-md">
            Start Free Trial <ArrowRight size={14} />
          </a>
          <p className="text-[11px] text-zinc-600 mt-4 tracking-wider">No card information · 14-day validation run · Unrestricted cancellation</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-10 px-6 text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-zinc-300 text-sm tracking-tight">Loop</span>
          <div className="flex gap-6 font-medium">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Contact</a>
          </div>
          <p>© 2026 Loop. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}