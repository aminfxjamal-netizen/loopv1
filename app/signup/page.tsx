'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          company_name: company,
        }
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = '/pricing';
    }
  };

  return (
    <main className="min-h-screen bg-[#08090A] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold mb-2">Loop</h1>
          <p className="text-gray-400">Start your free trial</p>
        </div>

        <div className="bg-[#111318] border border-[#1F232B] rounded-3xl p-10">
          <h2 className="text-2xl font-bold mb-8">Create your account</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="w-full bg-[#08090A] border border-[#1F232B] rounded-2xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4F46E5] transition"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="w-full bg-[#08090A] border border-[#1F232B] rounded-2xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4F46E5] transition"
                />
              </div>
            </div>

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

            <div>
              <label className="block text-sm text-gray-400 mb-2">Company Name</label>
              <input
                type="text"
                placeholder="Acme Inc."
                value={company}
                onChange={e => setCompany(e.target.value)}
                className="w-full bg-[#08090A] border border-[#1F232B] rounded-2xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4F46E5] transition"
              />
            </div>

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full py-4 bg-[#4F46E5] text-white font-semibold rounded-2xl hover:bg-[#6366F1] transition text-center block disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Get Started'}
            </button>

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