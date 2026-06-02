'use client';

import { useState } from 'react';
import { Mail, FolderOpen, Calendar, Brain, CheckCircle, Zap, ArrowRight, Menu, X, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'gmail' | 'drive' | 'calendar'>('gmail');

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#121212] font-sans antialiased selection:bg-violet-100 selection:text-violet-900 overflow-x-hidden">

      {/* Miro-Style Engineering Grid Sub-layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Notion-Style Clean Header */}
      <header className="border-b border-[#EEEEEE] fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <span className="text-lg font-bold tracking-tight text-[#121212] flex items-center gap-2">
              <span className="w-5 h-5 bg-violet-600 rounded-md flex items-center justify-center text-white text-xs font-black">L</span>
              Loop
            </span>
            <nav className="hidden md:flex items-center gap-6 text-[13px] text-gray-500 font-medium">
              <a href="#features" className="hover:text-black transition">Features</a>
              <a href="#demo" className="hover:text-black transition">Product Demo</a>
              <a href="#pricing" className="hover:text-black transition">Pricing</a>
              <a href="#faq" className="hover:text-black transition">FAQ</a>
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="/login" className="text-[13px] text-gray-500 hover:text-black font-medium transition">Log in</a>
            <a href="/signup" className="px-4 py-2 bg-violet-600 text-white text-[13px] font-semibold rounded-lg hover:bg-violet-700 transition shadow-sm shadow-violet-600/10">
              Start free trial
            </a>
          </div>
          <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-[#EEEEEE] px-6 py-5 flex flex-col gap-4 bg-white shadow-xl">
            <a href="#features" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-black transition text-sm font-medium">Features</a>
            <a href="#demo" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-black transition text-sm font-medium">Product Demo</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-black transition text-sm font-medium">Pricing</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-black transition text-sm font-medium">FAQ</a>
            <div className="h-px bg-gray-100 my-1" />
            <a href="/login" className="text-gray-600 hover:text-black transition text-sm font-medium">Log in</a>
            <a href="/signup" className="px-4 py-2.5 bg-violet-600 text-white text-sm font-bold rounded-lg hover:bg-violet-700 transition text-center shadow-sm">Start free trial</a>
          </div>
        )}
      </header>

      {/* Balanced Minimalist Hero Section */}
      <section className="pt-40 pb-24 px-6 relative">
        <div className="max-w-4xl mx-auto text-center relative">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-200 bg-violet-50 text-xs text-violet-700 font-semibold mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
            Loop Workspace v1.0
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.03em] text-[#121212] leading-[1.08] mb-8">
            Your business operations. <br />
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Executed on clean autopilot.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            Loop beautifully bridges your Gmail, Google Drive, and Calendar into one intelligent, structured workspace. Your AI assistant maps context, schedules flows, and drafts follow-ups automatically.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3.5 max-w-md mx-auto">
            <a href="/signup" className="px-6 py-3.5 bg-violet-600 text-white font-semibold rounded-lg text-sm hover:bg-violet-700 transition shadow-md shadow-violet-600/10 flex items-center justify-center gap-2 group">
              Start Free Trial <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="#demo" className="px-6 py-3.5 border border-gray-200 bg-white shadow-sm rounded-lg text-sm hover:bg-gray-50 text-gray-700 font-medium transition">
              See How It Works
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-8 text-xs text-gray-400 font-medium tracking-tight">
            <div className="flex items-center gap-1"><CheckCircle size={12} className="text-gray-400" /> No credit card required</div>
            <div>&bull;</div>
            <div>Free 14-day trial</div>
            <div>&bull;</div>
            <div>Cancel anytime</div>
          </div>
        </div>
      </section>

      {/* Notion/Miro Blueprint Interactive Tabbed Showcase */}
      <section id="demo" className="pb-32 px-6 max-w-6xl mx-auto">
        <div className="border border-gray-200/80 rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.03)] overflow-hidden">
          
          {/* Tab Selection Row */}
          <div className="bg-gray-50 border-b border-gray-200/80 px-4 pt-3 flex gap-2 overflow-x-auto scrollbar-none">
            {[
              { id: 'gmail', label: 'Gmail Stream', icon: <Mail size={14} /> },
              { id: 'drive', label: 'Drive Summarizer', icon: <FolderOpen size={14} /> },
              { id: 'calendar', label: 'Calendar Planner', icon: <Calendar size={14} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-t-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border-t-2 transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-violet-600 border-violet-600 shadow-sm font-bold' 
                    : 'bg-transparent text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Screen Display */}
          <div className="p-6 md:p-10 bg-white grid md:grid-cols-12 gap-8 items-center min-h-[400px]">
            <div className="md:col-span-5 space-y-4 text-left">
              <span className="text-[11px] font-bold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Live System View</span>
              
              {activeTab === 'gmail' && (
                <>
                  <h3 className="text-2xl font-bold text-gray-900">Smart Follow-ups</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">Set custom deadlines on outgoing conversations. If client strings stay silent, Loop writes a context-aware followup draft and places it safely into your confirmation holds.</p>
                </>
              )}
              {activeTab === 'drive' && (
                <>
                  <h3 className="text-2xl font-bold text-gray-900">Drive Knowledge Layer</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">Instantly retrieve summaries, compile index parameters, or search technical strings across vast team folders without expanding nested files manual pipelines.</p>
                </>
              )}
              {activeTab === 'calendar' && (
                <>
                  <h3 className="text-2xl font-bold text-gray-900">Adaptive Day Sync</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">Loop syncs directly to your daily agenda patterns to block off high-focus recovery margins, coordinate multi-party hooks, and optimize calendar events instantly.</p>
                </>
              )}

              <a href="/signup" className="inline-flex items-center gap-1 text-xs font-bold text-violet-600 hover:text-violet-700 transition pt-2">
                Deploy this engine integration <ChevronRight size={14} />
              </a>
            </div>

            {/* Faux Render Frame Canvas */}
            <div className="md:col-span-7 bg-[#FBFBFB] border border-gray-200 rounded-xl p-5 font-mono text-[11.5px] text-gray-600 space-y-4 shadow-inner text-left">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400/60" />
                  <span className="w-2 h-2 rounded-full bg-amber-400/60" />
                  <span className="w-2 h-2 rounded-full bg-green-400/60" />
                </div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-sans">approval_queue_node // active</span>
              </div>
              
              {activeTab === 'gmail' && (
                <div className="space-y-3 font-sans">
                  <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-gray-800 flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-red-50 text-red-600 rounded text-[9px] font-mono">DEADLINE EXPIRED</span>
                        Contract Review Thread
                      </div>
                      <div className="text-xs text-gray-400">Drafted automated followup response parameters...</div>
                    </div>
                    <button className="px-2.5 py-1 bg-violet-600 text-white font-bold text-[10px] rounded hover:bg-violet-700 transition">APPROVE</button>
                  </div>
                </div>
              )}
              {activeTab === 'drive' && (
                <div className="space-y-2 font-mono text-[11px] text-gray-500">
                  <p className="text-violet-600 font-bold">&gt; loop vector-index --target /Company_Policies_2026</p>
                  <p className="text-gray-400">✓ Ingested 14 legacy document structures securely.</p>
                  <p className="text-gray-400">✓ Context synthesized into local memory database layers.</p>
                </div>
              )}
              {activeTab === 'calendar' && (
                <div className="space-y-3 font-sans">
                  <div className="p-3 bg-violet-50/60 border border-violet-100 rounded-lg flex items-center gap-3">
                    <Clock size={16} className="text-violet-500" />
                    <div>
                      <div className="text-xs font-bold text-violet-900">Deep Work Protection Active</div>
                      <div className="text-[11px] text-violet-600">Created 45m recovery buffer after consecutive high-intensity syncs.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Structured Minimal Feature Cards Grid */}
      <section id="features" className="py-24 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto">
          
          <div className="max-w-3xl mb-16 text-left">
            <p className="text-violet-600 text-xs font-bold uppercase tracking-widest mb-3">Core Parameters</p>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">Built clean. Formed to scale.</h2>
            <p className="text-gray-500 text-md mt-2">Loop synchronizes your modern organizational layers with robust AI safety logic models.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Brain size={20} className="text-violet-600" />, title: 'AI Chat Workspace', tag: 'Core', desc: 'Chat with an AI that understands your business. Ask it to send emails, find files or manage your schedule — all from one place.' },
              { icon: <Mail size={20} className="text-violet-600" />, tag: 'Gmail', desc: "Set a follow-up deadline on any email. If they don't reply in time, Loop drafts the follow-up and asks for your approval before sending.", title: 'Smart Follow-ups' },
              { icon: <FolderOpen size={20} className="text-violet-600" />, tag: 'Google Drive', desc: 'Ask Loop to find, summarize or organize any file from your Google Drive. No more endless folder searching.', title: 'Drive Intelligence' },
              { icon: <Calendar size={20} className="text-violet-600" />, tag: 'Schedule', desc: 'Loop reads your calendar and helps you plan your day, schedule meetings and never miss an important event.', title: 'Schedule Management' },
              { icon: <CheckCircle size={20} className="text-violet-600" />, tag: 'Control', desc: 'Loop never acts without your permission. Every AI action waits for your one-click approval before anything happens.', title: 'You Stay In Control' },
              { icon: <Zap size={20} className="text-violet-600" />, tag: 'Memory', desc: 'Loop remembers your past emails, files and meetings. Every conversation picks up exactly where you left off.', title: 'Full Context Memory' },
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50/50 border border-gray-200/80 p-6 rounded-xl hover:bg-white hover:shadow-md hover:border-gray-300 transition duration-300 text-left flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm text-gray-700">{feature.icon}</div>
                    <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 font-mono">{feature.tag}</span>
                  </div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed font-normal">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Miro-Style Clean Workflow Diagram Area */}
      <section className="py-24 px-6 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-violet-600 text-xs font-bold uppercase tracking-widest mb-3">System Blueprint</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Simple by design.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {[
              { step: '01', title: 'Connect Tools', desc: 'Link your Gmail and Google Drive in seconds. Loop reads your context and gets up to speed instantly.' },
              { step: '02', title: 'Instruct AI', desc: 'Tell Loop what you need in plain English. Send an email, find a file, schedule a meeting — it handles everything.' },
              { step: '03', title: 'Approve and Go', desc: 'Every action Loop prepares lands in your approval queue first. One click to confirm. You are always in charge.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm text-left relative z-10">
                <div className="text-xs font-mono font-bold text-violet-600 mb-3 bg-violet-50 px-2 py-0.5 inline-block rounded-md">{item.step} / INTERFACE</div>
                <h3 className="font-bold text-base text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Contrast Integrated Grid Cards Area */}
      <section id="integrations" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-violet-600 text-xs font-bold uppercase tracking-widest mb-3">Orchestration Framework</p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Your core tools, supercharged.</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto mb-16">Loop connects safely to your structural infrastructure lines via hardened secure protocols.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { logo: '/gmail.png', name: 'Gmail Workspace', desc: 'Send emails, track incoming response loops, and parse threads with strict local clearance.' },
              { logo: '/gdrive.png', name: 'Google Drive Context', desc: 'Ingest raw documentation blocks, compile summaries, and pull context arrays directly.' },
              { logo: '/gcalendar.png', name: 'Google Calendar API', desc: 'Evaluate scheduled timelines, align buffer margins, and coordinate client meetings.' },
            ].map((integration, i) => (
              <div key={i} className="p-6 border border-gray-200/80 rounded-xl bg-gray-50/30 text-left flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-10 h-10 mb-4 relative flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-inner">
                    <Image src={integration.logo} alt={integration.name} width={24} height={24} className="object-contain" />
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1">{integration.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{integration.desc}</p>
                </div>
                {/* Fixed line: changed button label from 'Connected' to 'Connect' */}
                <button className="w-full py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg transition shadow-sm">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notion-Style Clean Flat Grid Pricing System */}
      <section id="pricing" className="py-24 px-6 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-violet-600 text-xs font-bold uppercase tracking-widest mb-3">Licensing Architecture</p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Honest pricing. Real business value.</h2>
          <p className="text-gray-500 text-xs mb-16">Start running for free. Scale your options as metrics prove their absolute worth.</p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto items-stretch">
            {[
              { name: 'Evaluation Run', price: '$0', period: '/ 14 days free', desc: 'Evaluate full systemic features parameters completely risk-free.', features: ['Full access for 14 days', 'Gmail integration', 'Google Drive integration', 'AI chat workspace', 'Smart follow-ups'], cta: 'Start evaluation run', href: '/signup', highlight: false },
              { name: 'Basic Tier', price: '$9', period: '/ user / month', desc: 'Designed for independent builders managing automated timelines.', features: ['Everything in Free Trial', 'Unlimited AI messages', 'Unlimited follow-ups', 'Gmail + Drive', 'Approval workflows', 'Email support'], cta: 'Initialize basic tier', href: '/signup', highlight: false },
              { name: 'Professional Pro', price: '$29', period: '/ user / month', desc: 'Built for enterprise operators scaling multi-admin workloads.', features: ['Everything in Basic', 'Priority AI processing', 'Advanced memory context', 'Team workspace sharing', 'Analytics dashboard', 'Priority support'], cta: 'Deploy professional pro', href: '/signup', highlight: true }
            ].map((plan, i) => (
              <div key={i} className={`p-6 rounded-xl border text-left flex flex-col justify-between bg-white relative ${plan.highlight ? 'border-violet-600 shadow-md ring-1 ring-violet-600/20' : 'border-gray-200 shadow-sm'}`}>
                {plan.highlight && (
                  <span className="absolute -top-2.5 left-4 px-2 py-0.5 bg-violet-600 text-white font-mono text-[9px] uppercase tracking-wider rounded font-bold">Standard Recommendation</span>
                )}
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-gray-400 text-xs mb-5 font-normal leading-normal min-h-[32px]">{plan.desc}</p>
                  <div className="mb-6 flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">{plan.price}</span>
                    <span className="text-xs text-gray-500 font-medium">{plan.period}</span>
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
                <a href={plan.href} className={`block w-full py-2 rounded-lg text-center text-xs font-semibold transition ${plan.highlight ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm' : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion Minimalist FAQ System */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-violet-600 text-xs font-bold uppercase tracking-widest mb-3">Information Directory</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Questions? Resolved.</h2>
          </div>
          
          <div className="flex flex-col gap-2.5">
            {[
              { q: 'Is my operational workspace data safe with Loop?', a: 'Yes. Loop relies on end-to-end encrypted transport channels both during transmission cycles and holding parameters. We never isolate or retain raw message files inside outhouses; data stays permanently mapped to your authenticated Google security layer.' },
              { q: 'Can Loop execute outreach actions without manual validation?', a: 'Never. The platform operates inside a strict operational queue pattern. Every single draft response or timeline change remains waiting in a localized sandbox for your explicit confirmation click before execution commands transmit.' },
              { q: 'What software integrations are live today?', a: 'Loop links natively right out of the box with your designated Gmail and Google Drive context pipelines.' },
              { q: 'How does the 14-day initialization run function?', a: 'You gain comprehensive access to all core automation structures for 14 continuous days without submitting payment authorization arrays. You can safely map your profiles and evaluate functional metrics risk-free.' },
              { q: 'Can I terminate my licensing sync layout instantly?', a: 'Yes. You retain complete account management rights. Subscriptions can be modified, downgraded, or terminated directly inside your settings panel whenever you require.' },
            ].map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50/20">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-xs text-gray-800 uppercase tracking-wider">{faq.q}</span>
                  <span className={`text-gray-400 text-base font-mono transition-transform duration-200 ${openFaq === i ? 'rotate-45 text-violet-600' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-500 text-xs leading-relaxed border-t border-gray-100 pt-3 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notion Minimal Block CTA */}
      <section className="py-24 px-6 border-t border-gray-200 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">Ready to loop in your tools?</h2>
          <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">Deploy a pristine AI operational framework over your business workspace tasks today.</p>
          <a href="/signup" className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg text-sm hover:bg-violet-700 transition shadow-md shadow-violet-600/10">
            Start Free Trial Initialization <ArrowRight size={14} />
          </a>
          <p className="text-gray-400 text-[11px] mt-4 font-medium tracking-tight">No credit card authorization required &bull; 14 days evaluation</p>
        </div>
      </section>

      {/* Elite Corporate Minimal Footer */}
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
            <a href="#features" className="hover:text-black transition">Features</a>
            <a href="#pricing" className="hover:text-black transition">Pricing</a>
          </div>
          <p className="text-gray-400 font-mono text-[11px]">&copy; 2026 Loop Engine Studio. All tracking fields certified.</p>
        </div>
      </footer>

    </main>
  );
}

function Clock(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}