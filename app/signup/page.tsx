'use client';

export default function Signup() {
  return (
    <main className="min-h-screen bg-[#08090A] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold mb-2">Loop</h1>
          <p className="text-gray-400">Start your free trial</p>
        </div>

        <div className="bg-[#111318] border border-[#1F232B] rounded-3xl p-10">
          <h2 className="text-2xl font-bold mb-8">Create your account</h2>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">First Name</label>
                <input type="text" placeholder="John" className="w-full bg-[#08090A] border border-[#1F232B] rounded-2xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4F46E5] transition" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                <input type="text" placeholder="Doe" className="w-full bg-[#08090A] border border-[#1F232B] rounded-2xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4F46E5] transition" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <input type="email" placeholder="you@company.com" className="w-full bg-[#08090A] border border-[#1F232B] rounded-2xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4F46E5] transition" />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-[#08090A] border border-[#1F232B] rounded-2xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4F46E5] transition" />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Company Name</label>
              <input type="text" placeholder="Acme Inc." className="w-full bg-[#08090A] border border-[#1F232B] rounded-2xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4F46E5] transition" />
            </div>

            <a href="/pricing" className="w-full py-4 bg-[#4F46E5] text-white font-semibold rounded-2xl hover:bg-[#6366F1] transition text-center block">
              Get Started
            </a>

            <p className="text-center text-sm text-gray-400">
              Already have an account?{' '}
              <a href="/login" className="text-[#4F46E5] hover:underline">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}