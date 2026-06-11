'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BillingPage() {
  const router = useRouter();
  
  // Interface state configurations
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Mock form element inputs
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate standard payment processor verification delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Route user to final workspace panel per blueprint schema
      setTimeout(() => {
        router.push('/workspace');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111827] font-sans antialiased flex flex-col justify-between p-6 md:p-8">
      {/* HEADER SECTION */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <div 
          onClick={() => router.push('/')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-6 h-6 rounded-lg bg-[#2563EB] flex items-center justify-center transition shadow-sm group-hover:bg-[#1D4ED8]">
            <div className="w-2.5 h-2.5 rounded-sm bg-white" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-[#111827]">Loop</span>
        </div>
      </header>

      {/* BILLING MODULE WORKSPACE */}
      <main className="flex-1 max-w-4xl w-full mx-auto my-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-center">
        
        {/* LEFT COLUMN: SECURE PAYMENT FORM */}
        <div className="md:col-span-7 bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h1 className="text-xl font-black tracking-tight text-[#111827]">Secure Checkout Portal</h1>
            <p className="text-xs text-[#6B7280] font-medium">Configure commercial billing architecture details below.</p>
          </div>

          {success ? (
            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-xl text-center space-y-2 animate-fade-in">
              <div className="text-2xl">✓</div>
              <h3 className="text-xs font-bold text-emerald-800">Payment Authentication Confirmed</h3>
              <p className="text-[11px] text-emerald-600 font-medium">Provisioning compute infrastructure resources. Accessing workspace...</p>
            </div>
          ) : (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#4B5563] tracking-wide uppercase">Cardholder Identity</label>
                <input
                  type="text"
                  required
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  placeholder="Alex Netizen"
                  className="w-full h-10 px-3 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] focus:outline-none focus:border-[#2563EB] focus:bg-white transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#4B5563] tracking-wide uppercase">Credit Card Credentials</label>
                <input
                  type="text"
                  required
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4111 2222 3333 4444"
                  className="w-full h-10 px-3 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] focus:outline-none focus:border-[#2563EB] focus:bg-white transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#4B5563] tracking-wide uppercase">Expiration Parameters</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full h-10 px-3 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] focus:outline-none focus:border-[#2563EB] focus:bg-white transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#4B5563] tracking-wide uppercase">Security CVC</label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="•••"
                    className="w-full h-10 px-3 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] focus:outline-none focus:border-[#2563EB] focus:bg-white transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-[#111827] hover:bg-black disabled:bg-[#9CA3AF] text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center justify-center mt-2"
              >
                {loading ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  'Authorize Secure Connection'
                )}
              </button>
            </form>
          )}
        </div>

        {/* RIGHT COLUMN: TRANSACTION STATEMENT BREAKDOWN */}
        <div className="md:col-span-5 border border-[#E5E7EB] rounded-2xl p-6 bg-white space-y-4 self-start">
          <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Transaction Summary</h3>
          <div className="w-full h-px bg-[#F3F4F6]" />
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-[#4B5563]">
              <span>Selected Operating Node:</span>
              <span className="font-bold text-[#111827]">Pro Workspace Tier</span>
            </div>
            <div className="flex justify-between text-xs font-medium text-[#4B5563]">
              <span>Compute Cycle Duration:</span>
              <span>Monthly Allocation</span>
            </div>
          </div>

          <div className="w-full h-px bg-[#F3F4F6]" />
          
          <div className="flex justify-between items-baseline pt-2">
            <span className="text-xs font-bold text-[#111827]">Immediate Due:</span>
            <span className="text-2xl font-black text-[#2563EB]">$79.00</span>
          </div>

          <p className="text-[10px] text-[#9CA3AF] font-medium leading-relaxed pt-2">
            Transactions are shielded via deep asymmetric cryptographic pipelines. Cancel subscription parameters instantly anytime within dashboard settings.
          </p>
        </div>
      </main>

      {/* FOOTER SECTION */}
      <footer className="max-w-7xl w-full mx-auto border-t border-[#F3F4F6] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[11px] font-medium text-[#9CA3AF]">
          © {new Date().getFullYear()} Loop Technologies Inc. All parameters reserved.
        </span>
      </footer>
    </div>
  );
}