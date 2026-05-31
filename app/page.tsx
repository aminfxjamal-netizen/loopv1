export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090B] text-white">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-[#27272A] bg-[#09090B]/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <h1 className="text-2xl font-bold">
            Loop
          </h1>

          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#features" className="hover:text-white">
              Features
            </a>

            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>

            <a href="/login" className="hover:text-white">
              Login
            </a>
          </nav>

          <a
            href="/signup"
            className="bg-[#7C3AED] hover:bg-[#8B5CF6] px-5 py-2 rounded-xl font-medium transition"
          >
            Start Free Trial
          </a>

        </div>
      </header>

      {/* Hero */}
      <section className="relative py-32 px-6">

        <div className="absolute inset-0 flex justify-center">
          <div className="w-[700px] h-[700px] bg-[#7C3AED]/20 blur-[180px] rounded-full" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">

          <div className="inline-flex items-center border border-[#27272A] bg-[#18181B] px-4 py-2 rounded-full text-sm text-zinc-400 mb-8">
            AI Workspace For Modern Businesses
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none">
            The AI Workspace
            <br />
            <span className="text-[#7C3AED]">
              for Modern Businesses
            </span>
          </h1>

          <p className="max-w-3xl mx-auto mt-8 text-xl text-zinc-400 leading-relaxed">
            Chat with AI, organize work, connect your tools,
            and manage your business from one intelligent workspace.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

            <a
              href="/signup"
              className="bg-[#7C3AED] hover:bg-[#8B5CF6] px-8 py-4 rounded-2xl font-semibold transition"
            >
              Start Free Trial
            </a>

            <a
              href="/login"
              className="border border-[#27272A] bg-[#18181B] hover:bg-[#222225] px-8 py-4 rounded-2xl font-semibold transition"
            >
              Login
            </a>

          </div>

        </div>

      </section>

      {/* Features */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-24"
      >

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">
            Everything in one workspace
          </h2>

          <p className="text-zinc-400 mt-4 text-lg">
            Built for founders, teams, agencies and businesses.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-8">
            <h3 className="text-2xl font-semibold mb-4">
              AI Chat
            </h3>

            <p className="text-zinc-400">
              Work faster with an AI assistant built directly into your workspace.
            </p>
          </div>

          <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Connected Apps
            </h3>

            <p className="text-zinc-400">
              Connect email, calendars, files and business tools.
            </p>
          </div>

          <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Search Everything
            </h3>

            <p className="text-zinc-400">
              Find conversations, documents and information instantly.
            </p>
          </div>

        </div>

      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="max-w-6xl mx-auto px-6 py-24"
      >

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">
            Simple Pricing
          </h2>

          <p className="text-zinc-400 mt-4">
            Start free and upgrade when you're ready.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-10">

            <h3 className="text-3xl font-bold">
              Starter
            </h3>

            <div className="text-5xl font-bold mt-6">
              $9
              <span className="text-lg text-zinc-400">
                /user
              </span>
            </div>

            <ul className="mt-8 space-y-4 text-zinc-300">
              <li>✓ AI Chat</li>
              <li>✓ Chat History</li>
              <li>✓ Basic Workspace</li>
              <li>✓ 7-Day Free Trial</li>
            </ul>

          </div>

          <div className="bg-[#7C3AED] rounded-3xl p-10">

            <h3 className="text-3xl font-bold">
              Pro
            </h3>

            <div className="text-5xl font-bold mt-6">
              $19
              <span className="text-lg">
                /user
              </span>
            </div>

            <ul className="mt-8 space-y-4">
              <li>✓ Everything in Starter</li>
              <li>✓ More AI Usage</li>
              <li>✓ Priority Support</li>
              <li>✓ Future Premium Features</li>
            </ul>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="bg-[#18181B] border border-[#27272A] rounded-[40px] p-16 text-center">

          <h2 className="text-5xl font-bold">
            Build smarter with Loop
          </h2>

          <p className="text-zinc-400 text-lg mt-6 max-w-2xl mx-auto">
            One intelligent workspace for conversations,
            apps, projects and business operations.
          </p>

          <a
            href="/signup"
            className="inline-block mt-10 bg-[#7C3AED] hover:bg-[#8B5CF6] px-8 py-4 rounded-2xl font-semibold transition"
          >
            Start Free Trial
          </a>

        </div>

      </section>

    </main>
  );
}