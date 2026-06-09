'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LoopUltimateLandingPage() {
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'apps' | 'search' | 'projects'>('chat');

  useEffect(() => {
    setMounted(true);
  }, []);

  const faqData = [
    { q: "What is Loop?", a: "Loop is an integrated AI workspace designed to blend artificial intelligence chat, universal application data connectivity, project boards, and automation pipelines into a single high-speed dashboard container." },
    { q: "How does the free trial work?", a: "You receive full, unrestricted access to all core platform mechanics for 14 days. You can invite your team members and configure your integrations completely unhindered." },
    { q: "Do I need a credit card?", a: "No. Loop does not require credit card processing details to initialize your 14-day evaluation sandbox environment." },
    { q: "Can I cancel anytime?", a: "Yes. Toggling your workspace parameters allows immediate account suspension cycles directly from the billing infrastructure panel without administrative barriers." },
    { q: "Is my data secure?", a: "Absolute isolation protocols are enforced. Loop uses advanced row-level enterprise database tracking parameters alongside AES-256 standard encryption structures to prevent exposure vectors." }
  ];

  return (
    <div className={`min-h-screen bg-[#FFFFFF] text-[#111827] font-sans antialiased selection:bg-[#2563EB]/10 transition-opacity duration-700 select-none ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* NAVIGATION BAR */}
      <header className="h-20 border-b border-[#E5E7EB] bg-[#FFFFFF]/80 backdrop-blur-md flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-10">
          {/* Loop Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#2563EB] flex items-center justify-center shadow-[0_2px_8px_rgba(37,99,235,0.25)]">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#FFFFFF]" />
            </div>
            <span className="text-base font-extrabold tracking-tight text-[#111827]">Loop</span>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-[#6B7280]">
            <Link href="#features" className="hover:text-[#2563EB] transition">Features</Link>
            <Link href="#solutions" className="hover:text-[#2563EB] transition">Solutions</Link>
            <Link href="#pricing" className="hover:text-[#2563EB] transition">Pricing</Link>
            <Link href="#enterprise" className="hover:text-[#2563EB] transition">Enterprise</Link>
            <Link href="#resources" className="hover:text-[#2563EB] transition">Resources</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-5">
          <Link href="/login" className="text-xs font-bold text-[#6B7280] hover:text-[#111827] transition">
            Login
          </Link>
          <Link 
            href="/signup" 
            className="h-11 px-5 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] text-xs font-bold rounded-xl transition flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.15)]"
          >
            Start Free Trial
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center space-y-8 relative">
        <div className="inline-flex items-center bg-[#2563EB]/5 border border-[#2563EB]/10 text-[#2563EB] px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
          Trusted by modern businesses worldwide
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#111827] leading-[1.05] max-w-5xl mx-auto uppercase">
          The AI Workspace <br />For Modern Businesses
        </h1>

        <p className="text-base md:text-lg text-[#6B7280] max-w-3xl mx-auto leading-relaxed font-medium">
          Chat with AI, connect your apps, manage projects, automate workflows, and run your business from one intelligent workspace.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            href="/signup" 
            className="w-full sm:w-auto text-sm font-semibold text-[#FFFFFF] bg-[#2563EB] hover:bg-[#1D4ED8] transition-all duration-200 shadow-[0_10px_30px_rgba(37,99,235,0.25)] flex items-center justify-center"
            style={{ height: '56px', borderRadius: '16px', paddingLeft: '36px', paddingRight: '36px' }}
          >
            Start Free Trial
          </Link>
          <Link 
            href="#demo" 
            className="w-full sm:w-auto h-14 px-8 border-2 border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#2563EB] text-[#111827] hover:text-[#2563EB] text-sm font-semibold rounded-2xl transition flex items-center justify-center"
          >
            Watch Demo
          </Link>
        </div>

        <div className="text-xs font-bold text-[#9CA3AF] tracking-widest uppercase space-x-2 pt-2">
          <span>14-Day Free Trial</span> • <span>No Credit Card Required</span> • <span>Cancel Anytime</span>
        </div>

        {/* HERO VISUAL CONTAINER */}
        <div id="demo" className="pt-12 max-w-5xl mx-auto">
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl shadow-[0_32px_64px_rgba(0,0,0,0.06)] overflow-hidden grid grid-cols-12 h-[560px] text-left">
            {/* Simulation Dashboard Sidebar */}
            <div className="col-span-3 border-r border-[#E5E7EB] bg-[#F9FAFB] p-4 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-2 px-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider px-2 mb-2">Workspace</div>
                  <div className={`p-2 rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer ${activeTab === 'chat' ? 'bg-[#2563EB]/5 text-[#2563EB]' : 'text-[#6B7280]'}`} onClick={() => setActiveTab('chat')}>AI Chat</div>
                  <div className={`p-2 rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer ${activeTab === 'apps' ? 'bg-[#2563EB]/5 text-[#2563EB]' : 'text-[#6B7280]'}`} onClick={() => setActiveTab('apps')}>Apps Hub</div>
                  <div className={`p-2 rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer ${activeTab === 'search' ? 'bg-[#2563EB]/5 text-[#2563EB]' : 'text-[#6B7280]'}`} onClick={() => setActiveTab('search')}>Universal Search</div>
                  <div className={`p-2 rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer ${activeTab === 'projects' ? 'bg-[#2563EB]/5 text-[#2563EB]' : 'text-[#6B7280]'}`} onClick={() => setActiveTab('projects')}>Projects Matrix</div>
                </div>
              </div>
              <div className="p-2 border-t border-[#E5E7EB] text-[11px] font-medium text-[#6B7280]">
                Analytics Container:: Active
              </div>
            </div>

            {/* Simulation Dashboard Dynamic Interactive Pane */}
            <div className="col-span-9 bg-[#FFFFFF] p-8 flex flex-col justify-between relative">
              <div className="space-y-4">
                <div className="h-8 border-b border-[#E5E7EB] flex items-center justify-between text-xs text-[#9CA3AF] font-mono pb-2">
                  <span>SYSTEM_NODE_ACTIVE // index_root</span>
                  <span className="text-[#2563EB]">● Connected</span>
                </div>
                
                {activeTab === 'chat' && (
                  <div className="space-y-4 font-sans pt-2">
                    <div className="p-4 bg-[#F9FAFB] rounded-xl text-xs text-[#6B7280] font-medium max-w-xl">
                      Summarize the primary deliverables across the GitHub repositories and draft active tasks for the engineering sprint.
                    </div>
                    <div className="p-4 bg-[#2563EB]/5 rounded-xl text-xs text-[#2563EB] font-semibold max-w-xl ml-auto border border-[#2563EB]/10">
                      Parsing Connected Apps: GitHub API pipeline resolved. Found 3 critical pull requests. Tasks appended to Projects Board cleanly.
                    </div>
                  </div>
                )}
                {activeTab === 'apps' && (
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {['Gmail Integration', 'Google Calendar', 'Google Drive', 'GitHub Pipeline'].map((app, i) => (
                      <div key={i} className="p-4 border border-[#E5E7EB] rounded-xl flex items-center justify-between text-xs font-bold">
                        <span>{app}</span>
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Sync Complete</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'search' && (
                  <div className="space-y-3 pt-2">
                    <div className="h-10 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl flex items-center px-4 text-xs font-medium text-[#9CA3AF]">
                      Search conversations, documents and tasks instantly...
                    </div>
                    <div className="p-3 border-b border-[#E5E7EB] text-xs font-semibold flex justify-between">
                      <span>partnership_contract_terms_2026.pdf</span>
                      <span className="text-[#6B7280] font-normal font-mono text-[11px]">Found in Google Drive</span>
                    </div>
                  </div>
                )}
                {activeTab === 'projects' && (
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {['Todo', 'In Progress', 'Completed'].map((col, i) => (
                      <div key={i} className="p-3 bg-[#F9FAFB] rounded-xl min-h-[160px] space-y-2">
                        <div className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">{col}</div>
                        <div className="p-2.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-[11px] font-semibold shadow-sm">Sprint Task #{i+1}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-[11px] font-mono text-[#9CA3AF]">
                Platform Metrics // 99.9% Uptime Verified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION */}
      <section className="border-t border-b border-[#E5E7EB] bg-[#F9FAFB] py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-12 text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">
            Trusted by startups, agencies, founders and growing teams.
          </div>
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
            {[
              { val: "10,000+", lbl: "Tasks Managed" },
              { val: "500+", lbl: "Businesses" },
              { val: "99.9%", lbl: "Platform Uptime" },
              { val: "1M+", lbl: "AI Messages Processed" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl md:text-4xl font-black text-[#2563EB] tracking-tight">{stat.val}</div>
                <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">{stat.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-28 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#2563EB]">Core Architecture</h2>
          <p className="text-3xl font-extrabold tracking-tight text-[#111827]">Engineered to replace disjointed tool stacks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { t: "AI Chat", d: "Business-focused AI assistant." },
            { t: "Connected Apps", d: "Connect Gmail, Calendar, Drive, GitHub and more." },
            { t: "Universal Search", d: "Search conversations, documents and tasks instantly." },
            { t: "Projects", d: "Manage work and collaborate with teams." },
            { t: "Automations", d: "Automate repetitive business tasks." },
            { t: "Analytics", d: "Track productivity and growth." }
          ].map((card, i) => (
            <div key={i} className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-8 space-y-3 transition duration-200 hover:-translate-y-1 hover:shadow-md">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB]/5 flex items-center justify-center text-[#2563EB] font-bold text-sm mb-2">
                0{i+1}
              </div>
              <h3 className="text-base font-bold text-[#111827]">{card.t}</h3>
              <p className="text-xs font-medium text-[#6B7280] leading-relaxed">{card.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="solutions" className="border-t border-[#E5E7EB] bg-[#F9FAFB] py-24">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#2563EB]">Execution Protocol</h2>
            <p className="text-3xl font-extrabold tracking-tight text-[#111827]">Four steps to absolute operations leverage.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { s: "Step 1", t: "Create your workspace" },
              { s: "Step 2", t: "Connect your apps" },
              { s: "Step 3", t: "Start working with AI" },
              { s: "Step 4", t: "Scale your business" }
            ].map((step, idx) => (
              <div key={idx} className="space-y-3 relative">
                <div className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">{step.s}</div>
                <h3 className="text-base font-bold text-[#111827]">{step.t}</h3>
                <p className="text-xs font-medium text-[#6B7280] leading-relaxed">Initialize container processes securely with instant framework configuration mappings.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="max-w-6xl mx-auto px-6 py-28 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#2563EB]">Product Showcase</h2>
          <p className="text-3xl font-extrabold tracking-tight text-[#111827]">Visualizing the operational command console.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {['Workspace', 'AI Chat', 'Apps Hub', 'Search', 'Projects', 'Settings'].map((sc, i) => (
            <div key={i} className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-6 min-h-[140px] flex flex-col justify-between shadow-sm hover:shadow-md transition">
              <span className="text-xs font-bold text-[#111827]">{sc}</span>
              <div className="h-1.5 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                <div className="bg-[#2563EB] h-full w-1/3 rounded-full" />
              </div>
              <span className="text-[10px] font-mono text-[#9CA3AF]">V_2026.06_CONTAINER_NODE</span>
            </div>
          ))}
        </div>
      </section>

      {/* WHY LOOP SECTION */}
      <section className="border-t border-[#E5E7EB] bg-[#F9FAFB] py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { t: "Save Time", d: "Automate repetitive work." },
            { t: "Stay Organized", d: "Keep everything in one place." },
            { t: "Grow Faster", d: "Focus on important work." }
          ].map((why, idx) => (
            <div key={idx} className="space-y-3 text-center md:text-left">
              <h3 className="text-base font-bold text-[#111827]">{why.t}</h3>
              <p className="text-xs font-medium text-[#6B7280] leading-relaxed">{why.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-28 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#2563EB]">User Logs</h2>
          <p className="text-3xl font-extrabold tracking-tight text-[#111827]">Validated performance feedback.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { r: "Founder", text: "Loop consolidated our multi-app workspace tech into a high-speed unified AI container flow. Exceptional." },
            { r: "Agency Owner", text: "Automating background operations tasks cleanly without complex syntax rules has saved us countless hours." },
            { r: "Startup CEO", text: "The universal context retention parameters give our growing enterprise team an immediate tactical edge." }
          ].map((tst, i) => (
            <div key={i} className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-8 space-y-4 shadow-sm flex flex-col justify-between">
              <p className="text-xs font-medium text-[#6B7280] leading-relaxed">"{tst.text}"</p>
              <div className="pt-2 border-t border-[#E5E7EB] text-xs font-bold text-[#111827]">
                {tst.r}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING PREVIEW SECTION */}
      <section id="pricing" className="border-t border-[#E5E7EB] bg-[#F9FAFB] py-24">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#2563EB]">System Pricing</h2>
            <p className="text-3xl font-extrabold tracking-tight text-[#111827]">Predictable access paradigms.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {['Free Trial / $0 / 14 Days', 'Starter / $9 / user/month', 'Pro / $29 / user/month'].map((p, idx) => {
              const [name, cost, dur] = p.split(' / ');
              return (
                <div key={idx} className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-6 flex flex-col justify-between shadow-sm">
                  <div>
                    <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">{name}</h3>
                    <div className="text-2xl font-black text-[#111827] mt-2">{cost}</div>
                    <p className="text-[11px] font-medium text-[#9CA3AF] mt-1">{dur}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <Link href="/pricing" className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] underline tracking-wide transition">
              View Full Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-2xl font-black text-[#111827] text-center tracking-tight mb-12 uppercase">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((faq, idx) => (
            <div key={idx} className="border-b border-[#E5E7EB] pb-4">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center text-left py-2 font-bold text-sm text-[#111827] focus:outline-none"
              >
                <span>{faq.q}</span>
                <span className="text-[#6B7280] font-mono text-xs">{openFaq === idx ? '−' : '+'}</span>
              </button>
              {openFaq === idx && (
                <p className="text-xs text-[#6B7280] leading-relaxed pt-2 pr-4 transition-all">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="bg-[#2563EB] text-[#FFFFFF] py-24 text-center relative overflow-hidden select-none">
        <div className="max-w-4xl mx-auto px-6 space-y-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-tight">
            Ready To Transform The Way You Work?
          </h2>
          <p className="text-sm text-[#FFFFFF]/80 max-w-xl mx-auto font-medium leading-relaxed">
            Join businesses using Loop to save time, stay organized, and work smarter.
          </p>
          <div className="pt-4">
            <Link 
              href="/signup" 
              className="inline-flex items-center justify-center text-sm font-semibold text-[#2563EB] bg-[#FFFFFF] hover:bg-[#F3F4F6] transition duration-200 cursor-pointer"
              style={{
                height: '56px',
                borderRadius: '16px',
                paddingLeft: '36px',
                paddingRight: '36px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E5E7EB] bg-[#FFFFFF] py-16 px-6 md:px-12 text-xs">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-[#6B7280]">
          <div className="space-y-3">
            <p className="font-bold text-[#111827]">Product</p>
            <div className="flex flex-col gap-2.5">
              <span className="hover:text-[#2563EB] cursor-pointer">Features</span>
              <span className="hover:text-[#2563EB] cursor-pointer">Pricing</span>
              <span className="hover:text-[#2563EB] cursor-pointer">Updates</span>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-bold text-[#111827]">Company</p>
            <div className="flex flex-col gap-2.5">
              <span className="hover:text-[#2563EB] cursor-pointer">About</span>
              <span className="hover:text-[#2563EB] cursor-pointer">Careers</span>
              <span className="hover:text-[#2563EB] cursor-pointer">Contact</span>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-bold text-[#111827]">Resources</p>
            <div className="flex flex-col gap-2.5">
              <span className="hover:text-[#2563EB] cursor-pointer">Documentation</span>
              <span className="hover:text-[#2563EB] cursor-pointer">Help Center</span>
              <span className="hover:text-[#2563EB] cursor-pointer">Blog</span>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-bold text-[#111827]">Legal</p>
            <div className="flex flex-col gap-2.5">
              <span className="hover:text-[#2563EB] cursor-pointer">Privacy Policy</span>
              <span className="hover:text-[#2563EB] cursor-pointer">Terms of Service</span>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 space-y-3">
            <p className="font-bold text-[#111827]">System</p>
            <p className="font-mono text-[10px] text-[#9CA3AF]">© 2026 Loop Technology Inc. Stack Isolated.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}