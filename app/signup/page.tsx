'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <main className="min-h-screen bg-[#08090A] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold mb-2">Loop</h1>
          <p className="text-gray-400">Welcome back</p>
        </div>

        <div className="bg-[#111318] border border-[#1F232B] rounded-3xl p-10">
          <h2 className="text-2xl font-bold mb-8">Sign in to Loop</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#08090A] border border-[#1F232B] rounded-2xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4F46E5] transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
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

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-4 bg-[#4F46E5] text-white font-semibold rounded-2xl hover:bg-[#6366F1] transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
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