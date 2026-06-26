"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Zap, Shield, Mail, Globe, Check, Calendar, HardDrive, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const launchDate = new Date('2026-09-01T00:00:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;
      setDaysLeft(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHoursLeft(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutesLeft(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSecondsLeft(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-4 md:px-6 py-5 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tight">Loop</div>
        <div className="flex items-center gap-3 md:gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Log in</Link>
          <Link href="/signup" className="bg-white text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">Sign up</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-16 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] -z-10"></div>
        
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 text-xs md:text-sm font-medium px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
          Launching September 1st — 14-day free trial
        </div>

        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] max-w-5xl mx-auto">
          The AI workspace that
          <br />
          <span className="text-blue-400">finishes your work.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mt-6 md:mt-8 max-w-2xl mx-auto leading-relaxed px-2">
          Tell Loop what you need in plain language. It drafts emails, schedules meetings, tracks follow-ups, and manages your files — across Gmail, Calendar, and Drive. All from one place.
        </p>

        <div className="flex items-center justify-center gap-6 mt-8 opacity-60">
          <div className="flex items-center gap-2 text-sm text-gray-400"><Mail size={18} /> Gmail</div>
          <div className="flex items-center gap-2 text-sm text-gray-400"><Calendar size={18} /> Calendar</div>
          <div className="flex items-center gap-2 text-sm text-gray-400"><HardDrive size={18} /> Drive</div>
        </div>

        {!submitted ? (
          <form onSubmit={handleWaitlist} className="mt-10 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for early access"
              required
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors text-sm"
            />
            <button type="submit" className="bg-white text-black font-medium px-6 py-3.5 rounded-xl hover:bg-gray-200 transition-colors text-sm flex items-center gap-2 justify-center shrink-0">
              Join Waitlist
              <ArrowRight size={14} />
            </button>
          </form>
        ) : (
          <div className="mt-10 max-w-md mx-auto bg-green-500/10 border border-green-500/20 rounded-xl px-6 py-4 text-green-400 text-sm">
            You're on the list. Early access coming September 1st.
          </div>
        )}
        <p className="text-xs text-gray-500 mt-3">No spam. One update when we launch.</p>

        <div className="mt-12 grid grid-cols-4 gap-3 max-w-md mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4">
            <div className="text-2xl md:text-3xl font-bold text-white">{daysLeft}</div>
            <div className="text-[10px] md:text-xs text-gray-500 mt-1">Days</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4">
            <div className="text-2xl md:text-3xl font-bold text-white">{hoursLeft}</div>
            <div className="text-[10px] md:text-xs text-gray-500 mt-1">Hours</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4">
            <div className="text-2xl md:text-3xl font-bold text-white">{minutesLeft}</div>
            <div className="text-[10px] md:text-xs text-gray-500 mt-1">Minutes</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4">
            <div className="text-2xl md:text-3xl font-bold text-white">{secondsLeft}</div>
            <div className="text-[10px] md:text-xs text-gray-500 mt-1">Seconds</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32 border-t border-white/5">
        <div className="text-center mb-16">
          <p className="text-sm text-blue-400 font-medium mb-4 uppercase tracking-widest">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Three steps. One workspace.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="h-14 w-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
            <h3 className="font-semibold text-lg mb-2">Connect Your Apps</h3>
            <p className="text-gray-400 text-sm">Link your Gmail, Calendar, and Drive. Loop works with the tools you already use. One click. Done.</p>
          </div>
          <div className="text-center">
            <div className="h-14 w-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
            <h3 className="font-semibold text-lg mb-2">Tell Loop What to Do</h3>
            <p className="text-gray-400 text-sm">Type naturally. "Draft an email to Sarah." "Schedule a meeting for Friday." "Find the contract from last month."</p>
          </div>
          <div className="text-center">
            <div className="h-14 w-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
            <h3 className="font-semibold text-lg mb-2">Approve and Done</h3>
            <p className="text-gray-400 text-sm">Loop drafts, you approve, it executes. Nothing goes out without your okay. Your work gets finished.</p>
          </div>
        </div>
      </section>

      {/* FULL VISION */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32 border-t border-white/5">
        <div className="text-center mb-16">
          <p className="text-sm text-blue-400 font-medium mb-4 uppercase tracking-widest">The Vision</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">More than email. The OS for work.</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Loop connects your entire work stack. Start with email. Calendar and Drive are next.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-8">
            <div className="h-10 w-10 bg-red-500/10 rounded-xl flex items-center justify-center mb-4"><Mail size={20} className="text-red-400" /></div>
            <h3 className="font-semibold mb-2">Gmail</h3>
            <p className="text-gray-400 text-sm">Draft, send, and track emails. Follow-ups on autopilot. Available now.</p>
            <span className="inline-block mt-3 text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Live</span>
          </div>
          <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-8 opacity-60">
            <div className="h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4"><Calendar size={20} className="text-blue-400" /></div>
            <h3 className="font-semibold mb-2">Calendar</h3>
            <p className="text-gray-400 text-sm">Schedule, reschedule, and find open slots with one command. Coming soon.</p>
            <span className="inline-block mt-3 text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">V1.1</span>
          </div>
          <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-8 opacity-60">
            <div className="h-10 w-10 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-4"><HardDrive size={20} className="text-yellow-400" /></div>
            <h3 className="font-semibold mb-2">Drive</h3>
            <p className="text-gray-400 text-sm">Find, summarize, and reference your files without opening a tab. Coming soon.</p>
            <span className="inline-block mt-3 text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">V1.2</span>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm text-blue-400 font-medium mb-4 uppercase tracking-widest">Trust</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Nothing happens without you.</h2>
            <p className="text-gray-400 leading-relaxed mb-6">Loop never sends an email, schedules a meeting, or touches your files without your explicit approval. Every action goes through you first. Always.</p>
            <div className="flex items-center gap-3 text-sm text-gray-300"><Shield size={18} className="text-green-400" />Approval-first architecture</div>
            <div className="flex items-center gap-3 text-sm text-gray-300 mt-2"><Shield size={18} className="text-green-400" />Your Gmail credentials stay on your device</div>
            <div className="flex items-center gap-3 text-sm text-gray-300 mt-2"><Shield size={18} className="text-green-400" />No data sold. No emails read for training.</div>
          </div>
          <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-8 text-center">
            <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield size={28} className="text-green-400" /></div>
            <h3 className="font-semibold text-lg mb-2">Your Data Stays Yours</h3>
            <p className="text-gray-400 text-sm">Loop connects directly to your Gmail. We don't store your emails on our servers. Your credentials are saved locally on your device.</p>
          </div>
        </div>
      </section>

      {/* FOUNDER NOTE */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-blue-400 font-medium mb-4 uppercase tracking-widest">From the Founder</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Why I built Loop</h2>
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 text-left">
            <p className="text-gray-300 leading-relaxed">I got tired of living in my inbox. Every morning — dozens of emails, half of them needing replies, follow-ups, or actions. I'd flag things, set reminders, write drafts at midnight so I wouldn't forget. And still, things slipped through.</p>
            <p className="text-gray-300 leading-relaxed mt-4">I wondered: why can't I just say "follow up with Sarah" and have it handled? Why do I need six apps open just to get through a workday?</p>
            <p className="text-gray-300 leading-relaxed mt-4">Loop is my answer. One workspace that understands natural language and takes real action — across email, calendar, and files. Not an assistant you manage. An assistant that manages your work.</p>
            <p className="text-gray-300 leading-relaxed mt-4">We launch September 1st. I'm building this for anyone who wants to spend less time managing tools and more time doing the work that matters.</p>
            <p className="text-gray-500 text-sm mt-6">— The Loop Team</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32 border-t border-white/5">
        <div className="text-center mb-16">
          <p className="text-sm text-blue-400 font-medium mb-4 uppercase tracking-widest">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">14 days free. Then choose your plan.</h2>
          <p className="text-gray-400 mt-4">No credit card required to start your trial.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="border border-white/10 rounded-2xl p-8 flex flex-col bg-[#0d0d0d]">
            <h3 className="text-lg font-semibold mb-1">Free Trial</h3>
            <p className="text-gray-400 text-sm mb-4">14 days, full access</p>
            <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-500 font-normal">/14 days</span></div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> 50 emails per day</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> AI chat assistant</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Email drafting</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Follow-up tracking</li>
            </ul>
            <Link href="/signup" className="bg-white/10 text-white text-sm font-medium text-center py-2.5 rounded-lg hover:bg-white/20 transition-colors w-full">Start Free Trial</Link>
            <p className="text-xs text-gray-500 text-center mt-2">No credit card required</p>
          </div>
          <div className="border-2 border-blue-500 rounded-2xl p-8 flex flex-col bg-[#0d0d0d] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Most Popular</div>
            <h3 className="text-lg font-semibold mb-1">Pro</h3>
            <p className="text-gray-400 text-sm mb-4">After your trial</p>
            <div className="text-4xl font-bold mb-6">$15<span className="text-lg text-gray-500 font-normal">/mo</span></div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> 50 emails per day</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Everything in trial</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Priority AI responses</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Advanced follow-up rules</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Calendar integration</li>
            </ul>
            <Link href="/signup" className="bg-blue-500 text-white text-sm font-medium text-center py-2.5 rounded-lg hover:bg-blue-600 transition-colors w-full">Start Free Trial</Link>
            <p className="text-xs text-gray-500 text-center mt-2">$15/mo after 14 days</p>
          </div>
          <div className="border border-white/10 rounded-2xl p-8 flex flex-col bg-[#0d0d0d]">
            <h3 className="text-lg font-semibold mb-1">Business</h3>
            <p className="text-gray-400 text-sm mb-4">After your trial</p>
            <div className="text-4xl font-bold mb-6">$30<span className="text-lg text-gray-500 font-normal">/mo</span></div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Unlimited emails</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Everything in Pro</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Team workspace</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Drive integration</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Admin dashboard</li>
            </ul>
            <Link href="/signup" className="bg-white/10 text-white text-sm font-medium text-center py-2.5 rounded-lg hover:bg-white/20 transition-colors w-full">Start Free Trial</Link>
            <p className="text-xs text-gray-500 text-center mt-2">$30/mo after 14 days</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32 border-t border-white/5 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Your work deserves an OS.</h2>
        <p className="text-xl text-gray-400 mb-8">14-day free trial. No credit card. No catch.</p>
        <Link href="/signup" className="bg-white text-black text-base font-medium px-10 py-4 rounded-xl hover:bg-gray-200 transition-colors inline-flex items-center gap-2 shadow-2xl shadow-white/10">
          Get Started Free
          <ArrowRight size={16} />
        </Link>
      </section>

      {/* ABOUT */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm text-blue-400 font-medium mb-4 uppercase tracking-widest">About Loop</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              We believe work should <span className="text-blue-400">bend to you.</span> Not the other way around.
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              The modern workplace is broken. We switch between a dozen tools, flag emails we never revisit, and spend hours on tasks that should take seconds. Loop was built for a different reality — one where you say what you need and it gets done.
            </p>
            <p className="text-gray-500 leading-relaxed mt-4">
              We're not building another email client. We're building the operating system for how work should feel. Fast. Frictionless. Under your control.
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-blue-400 mb-2">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To replace fragmented work tools with a single interface that understands natural language and takes real action — so every professional can focus on what actually matters.
              </p>
            </div>
            <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-blue-400 mb-2">Our Promise</h3>
              <p className="text-gray-300 leading-relaxed">
                Loop never acts without your approval. Your data stays yours. No emails are stored on our servers. No training on your conversations. Just a workspace that works for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32 border-t border-white/5">
        <div className="text-center mb-16">
          <p className="text-sm text-blue-400 font-medium mb-4 uppercase tracking-widest">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Questions answered.</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-2">What is Loop?</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Loop is an AI workspace that connects your Gmail, Calendar, and Drive. You tell it what to do in plain language — draft emails, schedule meetings, find files — and it handles the rest. Every action requires your approval before execution.</p>
          </div>
          <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-2">How does the free trial work?</h3>
            <p className="text-gray-400 text-sm leading-relaxed">You get 14 days of full access. No credit card required. During your trial, you can send up to 10 emails per day with all AI features included. After 14 days, choose a Pro or Business plan to continue.</p>
          </div>
          <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-2">Is my data safe?</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Yes. Your Gmail credentials are stored locally on your device — not on our servers. We don't store your emails. We don't train AI on your data. Loop connects directly to Gmail via an App Password that only you control.</p>
          </div>
          <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-2">Can I cancel anytime?</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Absolutely. Cancel during your trial and you won't be charged. Cancel a paid plan and you'll have access until the end of your billing period. No contracts. No cancellation fees.</p>
          </div>
          <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-2">When does Loop launch?</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Loop launches on September 1st, 2026. Join the waitlist above for early access and updates.</p>
          </div>
          <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-2">What integrations are coming?</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Gmail is live now. Google Calendar integration is coming in V1.1. Google Drive integration is planned for V1.2. More integrations will follow based on user feedback.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-white font-bold text-lg">
            <Globe size={16} className="text-blue-400" />
            Loop
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>© 2026 Loop</span>
          </div>
        </div>
      </footer>
    </div>
  );
}