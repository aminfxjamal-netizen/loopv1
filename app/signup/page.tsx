export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#08090A] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl font-bold">
            Loop
          </h1>

          <p className="text-gray-400 mt-2">
            The AI Workspace for Modern Businesses
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-[#111318] border border-[#1F232B] rounded-3xl p-8">

          <h2 className="text-white text-3xl font-bold mb-2">
            Create your workspace
          </h2>

          <p className="text-gray-400 mb-8">
            Start your 7-day free trial and experience the future of business productivity.
          </p>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-[#08090A] border border-[#1F232B] rounded-xl px-4 py-3 text-white outline-none"
            />

            <input
              type="email"
              placeholder="Work Email"
              className="w-full bg-[#08090A] border border-[#1F232B] rounded-xl px-4 py-3 text-white outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full bg-[#08090A] border border-[#1F232B] rounded-xl px-4 py-3 text-white outline-none"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-[#08090A] border border-[#1F232B] rounded-xl px-4 py-3 text-white outline-none"
            />

            <label className="flex items-start gap-3 text-sm text-gray-400">
              <input
                type="checkbox"
                className="mt-1"
              />

              <span>
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>

            <button
              type="submit"
              className="w-full bg-[#4F46E5] hover:bg-[#4338CA] transition py-3 rounded-xl text-white font-semibold"
            >
              Create Workspace
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-8">
            <div className="flex-1 h-px bg-[#1F232B]" />
            <span className="text-gray-500 text-sm">
              or continue with
            </span>
            <div className="flex-1 h-px bg-[#1F232B]" />
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">

            <button className="w-full border border-[#1F232B] rounded-xl py-3 text-white hover:bg-[#161A20] transition">
              Continue with Google
            </button>

            <button className="w-full border border-[#1F232B] rounded-xl py-3 text-white hover:bg-[#161A20] transition">
              Continue with Microsoft
            </button>

          </div>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#4F46E5] hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>

        </div>

        {/* Trust Section */}
        <div className="mt-6 text-center text-sm text-gray-500 space-y-2">

          <p>✓ No credit card required</p>

          <p>✓ 7-day free trial</p>

          <p>✓ Cancel anytime</p>

        </div>

      </div>
    </main>
  );
}