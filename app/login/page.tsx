'use client';

export default function Login() {
  return (
    <main className="min-h-screen bg-[#08090A] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold mb-2">
            <span className="text-[#4F46E5]">🦋</span> Loop
          </h1>
          <p className="text-gray-400">Welcome back</p>
        </div>

        <div className="bg-[#111318] border border-[#1F232B] rounded-3xl p-10">
          <h2 className="text-2xl font-bold mb-8">Sign in to Loop</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full bg-[#08090A] border border-[#1F232B] rounded-2xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4F46E5] transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#08090A] border border-[#1F232B] rounded-2xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4F46E5] transition"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" className="accent-[#4F46E5]" />
                Remember me
              </label>
              <a href="#" className="text-[#4F46E5] hover:underline">Forgot password?</a>
            </div>

            <button className="w-full py-4 bg-[#4F46E5] text-black font-semibold rounded-2xl hover:bg-[#6366F1] transition">
              Sign In
            </button>

            <p className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <a href="/signup" className="text-[#4F46E5] hover:underline">Sign up free</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}