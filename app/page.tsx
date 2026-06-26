"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Zap, Shield, Mail, Globe, Check, Play, Pause, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  const commands = [
    "Draft an email to Sarah about the Q3 report...",
    "Follow up with the design team...",
    "Schedule a meeting for tomorrow 2 PM...",
    "Summarize the contract from last week...",
  ];

  useEffect(() => {
    const currentCommand = commands[loopNum % commands.length];
    
    if (!isDeleting && typedText === currentCommand) {
      setTimeout(() => setIsDeleting(true), 2000);
      setTypingSpeed(50);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(100);
    } else {
      const timeout = setTimeout(() => {
        setTypedText(
          isDeleting 
            ? currentCommand.substring(0, typedText.length - 1)
            : currentCommand.substring(0, typedText.length + 1)
        );
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [typedText, isDeleting]);

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tight">Loop</div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Log in</Link>
          <Link href="/signup" className="bg-white text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">Sign up</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center relative">
        {/* Gradient orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] -z-10"></div>
        
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 text-sm font-medium px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
          Now in Beta — 10 emails/day free
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] max-w-5xl mx-auto">
          Your inbox is a to-do list
          <br />
          <span className="text-blue-400">other people wrote.</span>
          <br />
          Take it back.
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mt-8 max-w-2xl mx-auto leading-relaxed">
          Loop turns natural language into real actions across Gmail. Draft emails. Schedule follow-ups. Never lose a thread again. All from one command line.
        </p>

        {/* Live typing demo */}
        <div className="mt-12 max-w-2xl mx-auto bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 text-left font-mono">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
            <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
            <span className="text-xs text-gray-500 ml-2">Loop Workspace</span>
          </div>
          <div className="text-blue-400 text-lg">
            <span className="text-gray-500">&gt; </span>
            {typedText}
            <span className="inline-block w-2 h-5 bg-blue-400 ml-0.5 animate-pulse align-middle"></span>
          </div>
          <div className="mt-6 bg-white/5 rounded-lg p-4 border border-white/5">
            <div className="text-xs text-gray-500 mb-2">Loop Response</div>
            <div className="text-sm text-gray-300">
              <span className="text-green-400">✓</span> Draft ready. Subject: "Q3 Report Update"<br />
              To: sarah@company.com<br />
              <span className="text-gray-600">Waiting for your approval...</span>
            </div>
            <div className="flex gap-2 mt-3">
              <span className="bg-white text-black text-xs font-medium px-3 py-1.5 rounded-md">Approve & Send</span>
              <span className="bg-white/10 text-white text-xs px-3 py-1.5 rounded-md">Edit</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <Link href="/signup" className="bg-white text-black text-base font-medium px-8 py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-2xl shadow-white/10">
            Get Started Free
            <ArrowRight size={16} />
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-4">No credit card. 10 emails/day. No catch.</p>
      </section>

      {/* THE SHIFT */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm text-blue-400 font-medium mb-4 uppercase tracking-widest">The Problem</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              You live in your inbox.
              <br />
              <span className="text-gray-400">It wasn't designed for that.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Gmail is a list of other people's priorities. Every unread email is a task you didn't choose. Every follow-up you forgot is a deal you lost. You're not lazy. Your tools are broken.
            </p>
          </div>
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-gray-700 shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-700 rounded w-1/3 mb-2"></div>
                    <div className="h-2 bg-gray-800 rounded w-2/3"></div>
                  </div>
                  <span className="text-xs text-red-400 font-medium">Unread</span>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808] flex items-center justify-center">
              <span className="text-gray-600 text-sm">This is chaos.</span>
            </div>
          </div>
        </div>
      </section>

      {/* THE SOLUTION */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 bg-[#0d0d0d] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
              <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
              <span className="text-xs text-gray-500 ml-2">Loop</span>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-sm text-blue-300">What do you want to get done?</p>
              </div>
              <div className="flex justify-end">
                <div className="bg-white text-black rounded-lg px-4 py-2 text-sm max-w-[80%]">
                  Follow up with Sarah about the contract
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                <div className="text-xs text-green-400 mb-2">✓ Draft ready</div>
                <p className="text-sm text-gray-300">Sarah hasn't replied in 3 days. Here's a polite follow-up.</p>
                <div className="flex gap-2 mt-3">
                  <span className="bg-white text-black text-xs font-medium px-3 py-1.5 rounded-md">Approve & Send</span>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="text-sm text-blue-400 font-medium mb-4 uppercase tracking-widest">The Solution</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              One command.
              <br />
              <span className="text-gray-400">Done.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Stop switching tabs. Stop setting reminders. Stop writing "just checking in" for the hundredth time. Tell Loop what you need in plain English. It drafts. You approve. It sends. It follows up.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
        <div className="text-center mb-16">
          <p className="text-sm text-blue-400 font-medium mb-4 uppercase tracking-widest">Features</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Built to finish your work</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors">
            <div className="h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
              <Mail size={20} className="text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Natural Language Email</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Type what you want. Loop handles the formatting, tone, and sending.</p>
          </div>
          <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors">
            <div className="h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
              <RotateCcw size={20} className="text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Automatic Follow-Ups</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Loop tracks who replied and who didn't. It prompts follow-ups before you forget.</p>
          </div>
          <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors">
            <div className="h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
              <Shield size={20} className="text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Approval First</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Nothing goes out without your okay. Every draft is reviewed. Every send is confirmed.</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
        <div className="text-center mb-16">
          <p className="text-sm text-blue-400 font-medium mb-4 uppercase tracking-widest">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Start free. Upgrade when ready.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="border border-white/10 rounded-2xl p-8 flex flex-col bg-[#0d0d0d]">
            <h3 className="text-lg font-semibold mb-1">Free</h3>
            <p className="text-gray-400 text-sm mb-4">For getting started</p>
            <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> 10 emails per day</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> AI chat assistant</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Email drafting</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Follow-up tracking</li>
            </ul>
            <Link href="/signup" className="bg-white/10 text-white text-sm font-medium text-center py-2.5 rounded-lg hover:bg-white/20 transition-colors w-full">Get Started</Link>
          </div>
          <div className="border-2 border-blue-500 rounded-2xl p-8 flex flex-col bg-[#0d0d0d] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Most Popular</div>
            <h3 className="text-lg font-semibold mb-1">Pro</h3>
            <p className="text-gray-400 text-sm mb-4">For professionals</p>
            <div className="text-4xl font-bold mb-6">$15<span className="text-lg text-gray-500 font-normal">/mo</span></div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> 50 emails per day</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Everything in Free</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Priority AI responses</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Advanced follow-up rules</li>
            </ul>
            <Link href="/signup" className="bg-blue-500 text-white text-sm font-medium text-center py-2.5 rounded-lg hover:bg-blue-600 transition-colors w-full">Start Free Trial</Link>
          </div>
          <div className="border border-white/10 rounded-2xl p-8 flex flex-col bg-[#0d0d0d]">
            <h3 className="text-lg font-semibold mb-1">Business</h3>
            <p className="text-gray-400 text-sm mb-4">For teams</p>
            <div className="text-4xl font-bold mb-6">$30<span className="text-lg text-gray-500 font-normal">/mo</span></div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Unlimited emails</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Everything in Pro</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Team workspace</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-green-500 shrink-0" /> Calendar + Drive integration</li>
            </ul>
            <Link href="/signup" className="bg-white/10 text-white text-sm font-medium text-center py-2.5 rounded-lg hover:bg-white/20 transition-colors w-full">Contact Sales</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Stop managing your inbox.</h2>
        <p className="text-xl text-gray-400 mb-8">Start telling Loop what to do.</p>
        <Link href="/signup" className="bg-white text-black text-base font-medium px-10 py-4 rounded-xl hover:bg-gray-200 transition-colors inline-flex items-center gap-2 shadow-2xl shadow-white/10">
          Get Started Free
          <ArrowRight size={16} />
        </Link>
        <p className="text-sm text-gray-500 mt-4">10 emails/day. No credit card. No catch.</p>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-white font-bold text-lg">
            <Globe size={16} className="text-blue-400" />
            Loop
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>© 2026 Loop</span>
          </div>
        </div>
      </footer>
    </div>
  );
}