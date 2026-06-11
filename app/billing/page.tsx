'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function BillingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Dynamic parameters passed from the Pricing card selection
  const [planName, setPlanName] = useState('Starter');
  const [planPrice, setPlanPrice] = useState('$19');

  // Input states
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [zipCode, setZipCode] = useState('');

  // Processing states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const plan = searchParams.get('plan');
    const price = searchParams.get('price');
    if (plan) setPlanName(plan);
    if (price) setPlanPrice(price);
  }, [searchParams]);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Form parameter evaluation check
    if (cardNumber.replace(/\s/g, '').length < 16) {
      setError('Invalid card data. Please check your card number details.');
      setLoading(false);
      return;
    }

    // Simulate secure enterprise transaction settlement processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Match the absolute success flow: direct transition into the active workspace matrix
      setTimeout(() => {
        router.push('/workspace');
      }, 1000);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111827] font-sans antialiased flex flex-col justify-between p-4 sm:p-6 md:p-8 selection:bg-[#2563EB]/10 transition-colors duration-300">
      
      {/* NAVIGATION HEADER BAR */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between border-b border-gray-50 pb-4">
        <div 
          onClick={() => router.push('/')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-6 h-6 rounded-lg bg-[#2563EB] flex items-center justify-center transition-all duration-300 shadow-[0_4px_12px_rgba(37,99,235,0.2)] group-hover:bg-[#1D4ED8]">
            <div className="w-2.5 h-2.5 rounded-sm bg-white" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-[#111827]">Loop</span>
        </div>
        <span className="text-xs font-bold text-[#6B7280]">Secure Checkout Channel</span>
      </header>

      {/* CORE BILLING INTERFACE CONTAINER */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-md w-full mx-auto my-10 space-y-6 animate-fade-in">
        <div className="w-full space-y-6">
          
          {/* Card Headings */}
          <div className="space-y-1.5 text-center">
            <h1 className="text-2xl font-black tracking-tight text-[#111827]">Complete Purchase</h1>
            <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
              Activate your premium workspace node access configuration instantly.
            </p>
          </div>

          {/* DYNAMIC PLAN SUMMARY ELEMENT */}
          <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold tracking-widest text-[#6B7280] uppercase block">Selected Tier</span>
              <span className="text-sm font-bold text-[#111827]">Loop {planName} Workspace</span>
            </div>
            <div className="text-right">
              <span className="text-base font-black text-[#2563EB]">{planPrice}</span>
              <span className="text-[11px] font-medium text-[#6B7280] block">/ month</span>
            </div>
          </div>

          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            {/* Status Notification Alerts */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs font-semibold text-red-600 animate-fade-in">
                ⚠️ {error}
              </div>
            )}
            {success && (
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-semibold text-emerald-600 animate-fade-in">
                ✓ Secure parameter initialized. Loading your workspace environment...
              </div>
            )}

            {/* Cardholder Number Entry */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#4B5563] tracking-wide uppercase">Card Number</label>
              <input
                type="text"
                required
                maxLength={19}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                placeholder="4111 2222 3333 4444"
                className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/10 transition-all"
              />
            </div>

            {/* Expiry and CVV Secondary Parameters Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#4B5563] tracking-wide uppercase">Expiration Date</label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/10 transition-all text-center"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#4B5563] tracking-wide uppercase">Security Code (CVV)</label>
                <input
                  type="password"
                  required
                  maxLength={4}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="•••"
                  className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/10 transition-all text-center"
                />
              </div>
            </div>

            {/* Postal Verification Parameter */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#4B5563] tracking-wide uppercase">ZIP / Postal Code</label>
              <input
                type="text"
                required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="10001"
                className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/10 transition-all"
              />
            </div>

            {/* Primary Blue Action Submit CTA */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full h-[56px] rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-[#2563EB]/60 text-white text-xs font-semibold shadow-[0_10px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_10px_35px_rgba(37,99,235,0.35)] transition-all duration-200 flex items-center justify-center mt-6 hover:scale-[1.005] active:scale-[0.995]"
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                `Activate Loop ${planName}`
              )}
            </button>
          </form>
        </div>

        {/* SECURE COMPLIANCE ACCREDITATIONS FOOTPRINT */}
        <div className="w-full flex items-center justify-center gap-6 pt-4 border-t border-[#F3F4F6] text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider select-none">
          <span>🔒 SSL Encrypted</span>
          <span>💳 PCI-DSS Compliant</span>
          <span>✓ Instant Deployment</span>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl w-full mx-auto border-t border-[#F3F4F6] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-[#9CA3AF]">
        <span>© {new Date().getFullYear()} Loop Technologies Inc. Operational sandbox security protocols current.</span>
      </footer>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin h-6 w-6 border-2 border-[#2563EB] border-t-transparent rounded-full" />
      </div>
    }>
      <BillingForm />
    </Suspense>
  );
}