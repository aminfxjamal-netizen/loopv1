'use client';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090A] text-white">
      {/* Navbar */}
      <header className="border-b border-[#1F232B] fixed w-full z-50 bg-[#08090A]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-[#4F46E5]">🦋</span> Loop
          </h1>
          <nav className="hidden md:flex gap-8 text-gray-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#" className="hover:text-white transition">For Teams</a>
          </nav>
          <div className="flex gap-3">
            <a href="/login" className="px-6 py-2.5 border border-[#1F232B] rounded-2xl hover:bg-white/5 transition">
              Login
            </a>
            <a href="/signup" className="px-6 py-2.5 bg-[#4F46E5] text-black font-semibold rounded-2xl hover:bg-[#6366F1] transition">
              Start Free Trial
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-5 py-2 rounded-full border border-[#1F232B] bg-[#111318] text-sm mb-8">
            AI Operating System for Modern Businesses
          </div>
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8">
            The AI Operating System<br />
            <span className="text-[#4F46E5]">for Modern Businesses</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Connect your apps, manage projects, organize workflows and run your company from one intelligent workspace.
          </p>
          <div className="flex justify-center gap-4 mt-10">
            <a href="/signup" className="px-10 py-4 bg-[#4F46E5] text-black font-semibold rounded-2xl text-lg hover:bg-[#6366F1]">
              Start Free Trial
            </a>
            <button className="px-10 py-4 border border-[#1F232B] rounded-2xl text-lg hover:bg-white/5">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-[#0F1117]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          {[
            { title: "AI Workspace", desc: "Chat with intelligent AI that understands your business" },
            { title: "Connected Apps", desc: "Gmail, GitHub, Slack and more — all in one place" },
            { title: "Smart Projects", desc: "Organize tasks and workflows with AI assistance" },
            { title: "Team Intelligence", desc: "AI joins your team and helps get work done faster" }
          ].map((feature, i) => (
            <div key={i} className="bg-[#111318] border border-[#1F232B] p-8 rounded-3xl hover:border-[#4F46E5] transition">
              <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4">Simple, Fair Pricing</h2>
          <p className="text-gray-400 mb-12">Start free. Grow with us.</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-[#111318] border border-[#1F232B] p-10 rounded-3xl">
              <h3 className="text-2xl font-bold">Starter</h3>
              <div className="text-6xl font-bold my-6">$29<span className="text-lg font-normal text-gray-400">/user/mo</span></div>
              <button className="w-full py-4 border border-[#1F232B] rounded-2xl">Get Started</button>
            </div>

            <div className="bg-[#4F46E5] p-10 rounded-3xl text-black">
              <h3 className="text-2xl font-bold">Pro</h3>
              <div className="text-6xl font-bold my-6">$49<span className="text-lg font-normal">/user/mo</span></div>
              <button className="w-full py-4 bg-black text-white rounded-2xl">Start Free Trial</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 