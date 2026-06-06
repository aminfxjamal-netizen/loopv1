'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoopLandingPage() {
  const [activeFeature, setActiveFeature] = useState('AI Chat');

  return (
    <div className="min-h-screen bg-[#000000] text-[#F4F4F5] font-sans antialiased">
      {/* Navbar */}
      <header className="h-16 border-b border-[#18181B] bg-[#000000] flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          {/* Loop logo */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-white flex items-center justify-center">
              <div className="w-2 h-2 rounded-sm bg-black" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white">Loop</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs text-[#A1A1AA]">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-xs text-[#A1A1AA] hover:text-white transition">
            Login
          </Link>
          <Link href="/signup" className="h-9 px-4 bg-white hover:bg-[#E4E4E7] text-black text-xs font-medium rounded transition flex items-center justify-center">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          The AI Workspace for Modern Businesses
        </h1>

        <p className="text-base text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
          Chat with AI, connect your apps, manage work, and run your business from one intelligent workspace.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link href="/signup" className="w-full sm:w-auto h-11 px-6 bg-white hover:bg-[#E4E4E7] text-black text-sm font-medium rounded transition flex items-center justify-center">
            Get Started
          </Link>
          <Link href="/login" className="w-full sm:w-auto h-11 px-6 border border-[#18181B] bg-[#000000] text-[#A1A1AA] hover:text-white hover:border-[#27272A] text-sm font-medium rounded transition flex items-center justify-center">
            Login
          </Link>
        </div>

        {/* Trust Badge */}
        <div className="text-xs text-[#71717A] pt-2">
          14-Day Free Trial • No Credit Card Required
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-16 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* AI Chat */}
          <div 
            onClick={() => setActiveFeature('AI Chat')}
            className={`border rounded-xl p-6 transition cursor-pointer ${activeFeature === 'AI Chat' ? 'bg-[#09090B] border-[#27272A]' : 'border-[#18181B] bg-[#000000] hover:border-[#27272A]'}`}
          >
            <h3 className="text-sm font-bold text-white mb-2">AI Chat</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">Work faster with a business-focused AI assistant.</p>
          </div>

          {/* Connected Apps */}
          <div 
            onClick={() => setActiveFeature('Connected Apps')}
            className={`border rounded-xl p-6 transition cursor-pointer ${activeFeature === 'Connected Apps' ? 'bg-[#09090B] border-[#27272A]' : 'border-[#18181B] bg-[#000000] hover:border-[#27272A]'}`}
          >
            <h3 className="text-sm font-bold text-white mb-2">Connected Apps</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">Connect Gmail, Calendar, Drive, GitHub and more.</p>
          </div>

          {/* Search Everything */}
          <div 
            onClick={() => setActiveFeature('Search Everything')}
            className={`border rounded-xl p-6 transition cursor-pointer ${activeFeature === 'Search Everything' ? 'bg-[#09090B] border-[#27272A]' : 'border-[#18181B] bg-[#000000] hover:border-[#27272A]'}`}
          >
            <h3 className="text-sm font-bold text-white mb-2">Search Everything</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">Find conversations, files and information instantly.</p>
          </div>

          {/* Team Workspace */}
          <div 
            onClick={() => setActiveFeature('Team Workspace')}
            className={`border rounded-xl p-6 transition cursor-pointer ${activeFeature === 'Team Workspace' ? 'bg-[#09090B] border-[#27272A]' : 'border-[#18181B] bg-[#000000] hover:border-[#27272A]'}`}
          >
            <h3 className="text-sm font-bold text-white mb-2">Team Workspace</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">Collaborate across projects and departments.</p>
          </div>

          {/* Automations */}
          <div 
            onClick={() => setActiveFeature('Automations')}
            className={`border rounded-xl p-6 transition cursor-pointer ${activeFeature === 'Automations' ? 'bg-[#09090B] border-[#27272A]' : 'border-[#18181B] bg-[#000000] hover:border-[#27272A]'}`}
          >
            <h3 className="text-sm font-bold text-white mb-2">Automations</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">Save time with AI-powered workflows.</p>
          </div>

          {/* Analytics (Coming Soon) */}
          <div 
            onClick={() => setActiveFeature('Analytics')}
            className={`border rounded-xl p-6 border-[#18181B] bg-[#000000] opacity-60`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-white">Analytics</h3>
              <span className="text-[10px] bg-[#18181B] text-[#A1A1AA] px-1.5 py-0.5 rounded">Coming Soon</span>
            </div>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">Measure productivity and business performance.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-t border-[#18181B] bg-[#030303] py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white tracking-tight">Pricing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Trial */}
            <div className="bg-[#000000] border border-[#18181B] rounded-xl p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white">Free Trial</h3>
                  <div className="text-2xl font-bold text-white mt-1">$0</div>
                </div>
                <div className="text-xs text-[#A1A1AA] space-y-1">
                  <p>14 Days Free</p>
                  <p>No Credit Card Required</p>
                </div>
              </div>
              <Link href="/signup" className="w-full h-9 border border-[#18181B] hover:border-[#27272A] text-white text-xs font-medium rounded transition flex items-center justify-center mt-8">
                Get Started
              </Link>
            </div>

            {/* Starter */}
            <div className="bg-[#000000] border border-[#18181B] rounded-xl p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white">Starter</h3>
                  <div className="text-2xl font-bold text-white mt-1">$19<span className="text-xs font-normal text-[#71717A]">/user/month</span></div>
                </div>
              </div>
              <Link href="/signup" className="w-full h-9 bg-white text-black text-xs font-medium rounded hover:bg-[#E4E4E7] transition flex items-center justify-center mt-8">
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-[#000000] border border-[#18181B] rounded-xl p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white">Pro</h3>
                  <div className="text-2xl font-bold text-white mt-1">$49<span className="text-xs font-normal text-[#71717A]">/user/month</span></div>
                </div>
              </div>
              <Link href="/signup" className="w-full h-9 border border-[#18181B] hover:border-[#27272A] text-white text-xs font-medium rounded transition flex items-center justify-center mt-8">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6 border-t border-[#18181B]">
        <h2 className="text-2xl font-bold text-white tracking-tight">Ready to transform your business?</h2>
        <Link href="/signup" className="inline-flex h-11 px-6 bg-white hover:bg-[#E4E4E7] text-black text-sm font-medium rounded transition items-center justify-center mx-auto">
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#18181B] bg-[#000000] py-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          <div className="space-y-3">
            <p className="font-bold text-white">Product</p>
            <div className="flex flex-col gap-2 text-[#A1A1AA]">
              <a href="#features" className="hover:text-white transition">Features</a>
              <a href="#pricing" className="hover:text-white transition">Pricing</a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-bold text-white">Company</p>
            <div className="flex flex-col gap-2 text-[#A1A1AA]">
              <span className="cursor-not-allowed opacity-50">About</span>
              <span className="cursor-not-allowed opacity-50">Contact</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-bold text-white">Legal</p>
            <div className="flex flex-col gap-2 text-[#A1A1AA]">
              <span className="cursor-not-allowed opacity-50">Privacy Policy</span>
              <span className="cursor-not-allowed opacity-50">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}