// app/auth/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter(); // 1. This initializes the router inside the browser

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6 text-center space-y-6">
      <div className="max-w-md space-y-2">
        <h2 className="text-2xl font-semibold text-[#0F172A]">Connect Workspace Infrastructure</h2>
        <p className="text-sm text-[#64748B]">Loop requires secure OAuth access tokens to view inputs and stage actions.</p>
      </div>
      
      {/* 2. Clicking this button triggers the JavaScript redirect safely in the browser */}
      <button 
        onClick={() => router.push("/workspace?google=connected")} 
        className="bg-[#2563EB] text-white px-6 py-4 rounded-2xl text-sm font-medium hover:bg-blue-700 transition flex items-center gap-3 mx-auto"
      >
        Link Google Credentials
      </button>
    </div>
  );
}
