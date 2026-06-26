"use client";

import { useState } from 'react';
import { ArrowRight, Mail, Lock, User, Globe } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && name && email && password) {
      setStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans flex flex-col">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-4 md:px-6 py-5 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-2xl font-bold tracking-tight">Loop</Link>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Already have an account?</span>
          <Link href="/login" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">Log in</Link>
        </div>
      </nav>

      {/* SIGNUP CONTENT */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className={`h-2 w-12 rounded-full ${step >= 1 ? 'bg-blue-500' : 'bg-white/10'}`}></div>
            <div className={`h-2 w-12 rounded-full ${step >= 2 ? 'bg-blue-500' : 'bg-white/10'}`}></div>
            <div className={`h-2 w-12 rounded-full ${step >= 3 ? 'bg-blue-500' : 'bg-white/10'}`}></div>
          </div>

          {step === 1 && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Create your account</h1>
                <p className="text-gray-400">Start your 14-day free trial. No credit card required.</p>
              </div>

              <form onSubmit={handleNext} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      required
                      minLength={8}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white font-medium py-3 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                  Continue
                  <ArrowRight size={16} />
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                By continuing, you agree to Loop's <Link href="/terms" className="text-blue-400 hover:underline">Terms</Link> and <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>.
              </p>
            </>
          )}

          {step === 2 && (
            <div className="text-center">
              <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe size={28} className="text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Choose your plan</h2>
              <p className="text-gray-400 mb-8">14-day free trial on all plans. Cancel anytime.</p>

              <div className="space-y-4 text-left">
                {/* Pro Plan */}
                <div className="bg-white/5 border border-blue-500 rounded-xl p-5 relative">
                  <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">Recommended</div>
                  <h3 className="font-semibold text-lg">Pro</h3>
                  <p className="text-gray-400 text-sm">For professionals</p>
                  <div className="text-3xl font-bold mt-2">$15<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                  <ul className="mt-4 space-y-2 text-sm text-gray-300">
                    <li>• 50 emails per day</li>
                    <li>• AI chat assistant</li>
                    <li>• Follow-up tracking</li>
                    <li>• Calendar integration</li>
                  </ul>
                  <Link href="/workspace" className="block text-center bg-blue-500 text-white font-medium py-3 rounded-xl mt-4 hover:bg-blue-600 transition-colors">
                    Start 14-Day Free Trial
                  </Link>
                </div>

                {/* Business Plan */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h3 className="font-semibold text-lg">Business</h3>
                  <p className="text-gray-400 text-sm">For teams</p>
                  <div className="text-3xl font-bold mt-2">$30<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                  <ul className="mt-4 space-y-2 text-sm text-gray-300">
                    <li>• Unlimited emails</li>
                    <li>• Everything in Pro</li>
                    <li>• Team workspace</li>
                    <li>• Drive integration</li>
                  </ul>
                  <Link href="/workspace" className="block text-center bg-white/10 text-white font-medium py-3 rounded-xl mt-4 hover:bg-white/20 transition-colors">
                    Start 14-Day Free Trial
                  </Link>
                </div>
              </div>

              <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-white mt-6 transition-colors">
                ← Back to account details
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-6 text-sm text-gray-500">
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <span>© 2026 Loop</span>
        </div>
      </footer>
    </div>
  );
}