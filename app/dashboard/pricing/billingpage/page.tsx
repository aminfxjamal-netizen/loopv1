export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#09090B] text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold tracking-tight">
            Simple Pricing
          </h1>

          <p className="text-zinc-400 text-xl mt-6">
            Start free. Upgrade when you're ready.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Free Trial */}
          <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-8">

            <div className="text-sm text-zinc-400 mb-4">
              FREE TRIAL
            </div>

            <h2 className="text-3xl font-bold">
              Trial
            </h2>

            <div className="mt-6 text-5xl font-bold">
              $0
            </div>

            <p className="text-zinc-400 mt-2">
              14 Days Free
            </p>

            <ul className="mt-8 space-y-4 text-zinc-300">
              <li>✓ AI Chat</li>
              <li>✓ Chat History</li>
              <li>✓ Search</li>
              <li>✓ Basic Workspace</li>
              <li>✓ No Credit Card Required</li>
            </ul>

            <button className="w-full mt-10 bg-[#27272A] hover:bg-[#3F3F46] py-3 rounded-xl font-medium transition">
              Start Free Trial
            </button>

          </div>

          {/* Starter */}
          <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-8">

            <div className="text-sm text-zinc-400 mb-4">
              STARTER
            </div>

            <h2 className="text-3xl font-bold">
              Starter
            </h2>

            <div className="mt-6 text-5xl font-bold">
              $9
              <span className="text-lg text-zinc-400">
                /user/month
              </span>
            </div>

            <ul className="mt-8 space-y-4 text-zinc-300">
              <li>✓ Everything In Trial</li>
              <li>✓ Unlimited Chat History</li>
              <li>✓ Workspace Management</li>
              <li>✓ Standard Support</li>
              <li>✓ Future Updates</li>
            </ul>

            <button className="w-full mt-10 bg-[#27272A] hover:bg-[#3F3F46] py-3 rounded-xl font-medium transition">
              Choose Starter
            </button>

          </div>

          {/* Pro */}
          <div className="bg-[#7C3AED] rounded-3xl p-8 scale-105 shadow-2xl">

            <div className="inline-block bg-white text-black px-3 py-1 rounded-full text-sm font-semibold">
              MOST POPULAR
            </div>

            <h2 className="text-3xl font-bold mt-4">
              Pro
            </h2>

            <div className="mt-6 text-5xl font-bold">
              $29
              <span className="text-lg">
                /user/month
              </span>
            </div>

            <ul className="mt-8 space-y-4">
              <li>✓ Everything In Starter</li>
              <li>✓ Advanced AI Usage</li>
              <li>✓ Team Workspaces</li>
              <li>✓ Premium Integrations</li>
              <li>✓ Priority Support</li>
              <li>✓ Early Access Features</li>
            </ul>

            <button className="w-full mt-10 bg-black text-white py-3 rounded-xl font-medium hover:bg-[#111827] transition">
              Go Pro
            </button>

          </div>

        </div>

        {/* Bottom Text */}
        <div className="text-center mt-16">
          <p className="text-zinc-400">
            Trusted by founders, freelancers, agencies and growing businesses.
          </p>

          <p className="text-zinc-500 mt-2">
            No contracts. Cancel anytime.
          </p>
        </div>

      </div>
    </main>
  );
}