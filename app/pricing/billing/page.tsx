'use client';

import { useState } from 'react';
import { ArrowUpRight, ShieldCheck, Download, FileText, ExternalLink, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function BillingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Hardcoded mockup ledger database rows representing a real system log
  const transactions = [
    { id: 'TXN-2026-0094', date: '2026-06-01', description: 'PRO_TIER_RUN // INSTANCE_ID: L-884A', amount: '$29.00', status: 'SETTLED', method: 'VISA_4242' },
    { id: 'TXN-2026-0041', date: '2026-05-01', description: 'PRO_TIER_RUN // INSTANCE_ID: L-884A', amount: '$29.00', status: 'SETTLED', method: 'VISA_4242' },
    { id: 'TXN-2026-0012', date: '2026-04-17', description: 'VECTOR_INDEX_EXPANSION_PACK // AMENDMENT', amount: '$15.00', status: 'SETTLED', method: 'VISA_4242' },
    { id: 'TXN-2026-0002', date: '2026-04-01', description: 'BASIC_TIER_RUN // INITIAL_DEPLOY', amount: '$9.00', status: 'SETTLED', method: 'VISA_4242' },
    { id: 'TXN-2026-0001', date: '2026-03-18', description: 'EVAL_RUN_INITIALIZATION // CONTEXT_HOLD', amount: '$0.00', status: 'RELEASED', method: 'CREDIT_AUTH' },
  ];

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#121212] font-mono antialiased selection:bg-gray-200 selection:text-black overflow-x-hidden flex flex-col relative">
      
      {/* Miro-Style Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none z-0" />

      {/* Structured Minimal Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 w-full h-16 z-50 flex-shrink-0">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between font-sans">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-lg font-bold tracking-tight text-[#121212] flex items-center gap-2 no-underline">
              <span className="w-5 h-5 bg-violet-600 rounded-md flex items-center justify-center text-white text-xs font-black font-sans">L</span>
              Loop
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-[13px] text-gray-500 font-medium">
              <Link href="/#features" className="hover:text-black transition no-underline">Features</Link>
              <Link href="/pricing" className="hover:text-black transition no-underline">Pricing</Link>
              <Link href="/billing" className="text-violet-600 font-bold no-underline">Billing Ledger</Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/signup" className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-[13px] font-semibold rounded-md text-gray-700 transition no-underline">
              Workspace Panel
            </Link>
          </div>
          <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="absolute top-16 left-0 right-0 border-b border-gray-200 px-6 py-5 flex flex-col gap-4 bg-white shadow-xl z-50 font-sans">
            <Link href="/#features" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-black text-sm no-underline">Features</Link>
            <Link href="/pricing" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-black text-sm no-underline">Pricing</Link>
            <Link href="/billing" onClick={() => setMenuOpen(false)} className="text-violet-600 font-bold text-sm no-underline">Billing Ledger</Link>
          </div>
        )}
      </header>

      {/* Main Statement Canvas Container */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 relative z-10">
        
        {/* Statement Metadata Block Box */}
        <div className="bg-white border-2 border-gray-900 rounded-none p-6 sm:p-8 shadow-[4px_4px_0px_#121212] mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-gray-200 pb-6 mb-6">
            <div className="space-y-1.5">
              <span className="text-[10px] bg-gray-900 text-white font-bold px-1.5 py-0.5 tracking-wider uppercase">Official Document</span>
              <h1 className="text-2xl font-black uppercase tracking-tight text-gray-950">LOOP OPERATIONAL LEDGER</h1>
              <p className="text-xs text-gray-400 font-medium">DOCUMENTARY STATEMENT RANGE: MAR 18, 2026 — JUN 02, 2026</p>
            </div>
            <div className="sm:text-right space-y-1 text-xs">
              <div className="flex items-center sm:justify-end gap-1.5 text-green-700 font-bold">
                <ShieldCheck size={14} /> STATUS: RUNTIME_CERTIFIED
              </div>
              <div className="text-gray-400 text-[11px]">ACCOUNT_REF: ACC-99412-XF</div>
              <div className="text-gray-400 text-[11px]">GENERATED: {new Date().toISOString().split('T')[0]} // 21:44:00</div>
            </div>
          </div>

          {/* Account Profile Summary Subgrid */}
          <div className="grid sm:grid-cols-2 gap-8 text-xs font-sans">
            <div className="space-y-1">
              <h4 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1 mb-2">ACCOUNT IDENTIFIER</h4>
              <p className="font-mono font-bold text-gray-900">AMIN FX JAMAL / NETIZEN STUDIO</p>
              <p className="text-gray-500 font-mono">ID: usr_mem_7841alpha</p>
              <p className="text-gray-500 font-mono">PRIMARY_ROUTING: aminfxjamal-netizen@github</p>
            </div>
            <div className="space-y-1 sm:border-l sm:border-gray-100 sm:pl-8">
              <h4 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1 mb-2">COMPUTED SUMMARY STATEMENT</h4>
              <div className="flex justify-between font-mono text-[11px] text-gray-600">
                <span>ACTIVE ALLOCATION RUNTIME:</span>
                <span className="font-bold text-gray-900">PROFESSIONAL_PRO</span>
              </div>
              <div className="flex justify-between font-mono text-[11px] text-gray-600">
                <span>METRIC VALUE PERIOD RECURRING:</span>
                <span className="font-bold text-gray-900">$29.00 / MONTH</span>
              </div>
              <div className="flex justify-between font-mono text-[11px] text-gray-600">
                <span>NEXT SYSTEM RE-UP AUTO-CHARGE:</span>
                <span className="font-bold text-violet-600">2026-07-01</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls Toolbar Panel */}
        <div className="flex justify-between items-center bg-gray-100 border border-gray-200 p-3 mb-6">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <FileText size={13} className="text-gray-400" /> TRANSACTION_HISTORY_LOG
          </div>
          <button 
            type="button" 
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 shadow-sm text-[11px] font-bold hover:bg-gray-50 text-gray-700 transition"
          >
            <Download size={12} /> EXPORT_LEDGER.PDF
          </button>
        </div>

        {/* Financial Statement Table Grid Frame */}
        <div className="w-full overflow-x-auto border-2 border-gray-900 bg-white">
          <table className="w-full text-left border-collapse min-w-[700px] text-xs">
            <thead>
              <tr className="bg-gray-900 text-white font-bold tracking-wider text-[10px] uppercase">
                <th className="p-3.5 border-r border-gray-800">POST_DATE</th>
                <th className="p-3.5 border-r border-gray-800">TRANSACTION_ID</th>
                <th className="p-3.5 border-r border-gray-800 w-2/5">LOG_DESCRIPTION_PARAMETERS</th>
                <th className="p-3.5 border-r border-gray-800">PAY_METHOD</th>
                <th className="p-3.5 border-r border-gray-800 text-center">STATE</th>
                <th className="p-3.5 text-right">AMOUNT_VALUE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-[11.5px] font-medium text-gray-800">
              {transactions.map((txn, i) => (
                <tr key={i} className="hover:bg-gray-50/80 transition">
                  <td className="p-3.5 border-r border-gray-100 text-gray-500 font-mono">{txn.date}</td>
                  <td className="p-3.5 border-r border-gray-100 font-mono font-bold tracking-tight text-gray-900">{txn.id}</td>
                  <td className="p-3.5 border-r border-gray-100 font-mono text-gray-600 text-xs">{txn.description}</td>
                  <td className="p-3.5 border-r border-gray-100 text-gray-400 font-mono">{txn.method}</td>
                  <td className="p-3.5 border-r border-gray-100 text-center">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wide ${
                      txn.status === 'SETTLED' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-bold text-gray-900 font-mono">{txn.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Terms Fineprint Verification Section */}
        <div className="mt-8 border border-gray-200 p-4 bg-white space-y-2 text-[10px] text-gray-400 leading-relaxed">
          <p className="font-bold uppercase text-gray-500 font-mono tracking-wider">Documentary Audit Declarations:</p>
          <p>All recorded values are parsed, processed, and locked in continuous correlation with our stripe-hardened transport protocols. Should any localized string mismatches surface within your internal operational balance verification flows, submit an error index patch packet to our central telemetry hook within 14 business cycles.</p>
        </div>

      </div>

      {/* Basic Clean Monospace Footer */}
      <footer className="border-t border-gray-200 py-8 px-6 bg-white text-xs text-gray-400 font-mono mt-auto flex-shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-sm text-gray-900 flex items-center gap-1.5 font-sans">
            <span className="w-4 h-4 bg-violet-600 rounded flex items-center justify-center text-white text-[9px] font-black font-sans">L</span>
            Loop
          </span>
          <p className="text-[10px]">&copy; 2026 Loop Engine Studio // SYSTEM_CLEARANCE_SECURE_VERIFIED</p>
        </div>
      </footer>

    </main>
  );
}