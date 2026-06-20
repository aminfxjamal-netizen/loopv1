// app/workspace/page.tsx
"use client";

import { useState, useEffect } from "react";
// Import directly from the official package to prevent import path errors
import { createBrowserClient } from "@supabase/ssr"; 

interface StagedAction {
  to: string;
  subject: string;
  emailBody: string;
}

interface ConnectedApp {
  name: string;
  color: string;
  bg: string;
  icon: string;
}

const APP_UI_MAP: Record<string, Omit<ConnectedApp, "name">> = {
  gmail: { color: "text-red-500", bg: "bg-red-50", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  drive: { color: "text-emerald-500", bg: "bg-emerald-50", icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" },
  calendar: { color: "text-blue-500", bg: "bg-blue-50", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }
};

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasAppsConnected: boolean;
}

const SettingsModal = ({ isOpen, onClose, hasAppsConnected }: SettingsModalProps) => {
  if (!isOpen) return null;
  
  const handleInitiateOAuth = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 border border-slate-100 text-[#0F172A]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold tracking-tight">System Settings</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="space-y-2">
          {!hasAppsConnected ? (
            <button 
              onClick={handleInitiateOAuth}
              className="w-full text-center p-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white transition text-sm font-semibold flex items-center justify-center"
            >
              Connect Google Workspace
            </button>
          ) : (
            <button className="w-full text-left p-3.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition text-sm font-semibold">
              Disconnect Connected Workspace
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function WorkspacePage() {
  // Directly initialize the browser client using your public env variables
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const [connectedApps, setConnectedApps] = useState<ConnectedApp[]>([]);
  const [recentHistory, setRecentHistory] = useState<string[]>([]);
  const [stagedAction, setStagedAction] = useState<StagedAction | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    let channel: any;

    const setupAuthAndSync = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const uid = session.user.id;
        setUserId(uid);

        // Fetch user integrations from your custom table mapping
        const { data } = await supabase
          .from("user_integrations")
          .select("active_services")
          .eq("user_id", uid)
          .single();

        if (data?.active_services) {
          mapAndSetApps(data.active_services);
        }

        // Realtime subscription setup
        channel = supabase
          .channel(`user_integrations_${uid}`)
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "user_integrations", filter: `user_id=eq.${uid}` },
            (payload: any) => {
              const services = payload.new?.active_services || [];
              mapAndSetApps(services);
            }
          )
          .subscribe();
      }
    };

    const mapAndSetApps = (services: string[]) => {
      const UIApps = services
        .filter(service => APP_UI_MAP[service.toLowerCase()])
        .map(service => ({
          name: service.charAt(0).toUpperCase() + service.slice(1).toLowerCase(),
          ...APP_UI_MAP[service.toLowerCase()]
        }));
      setConnectedApps(UIApps);
    };

    setupAuthAndSync();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUserId(null);
        setConnectedApps([]);
      } else {
        setUserId(session.user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  const triggerToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 4000);
  };

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !userId) return;

    setIsProcessing(true);

    try {
      const response = await fetch("/api/agent/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: inputValue, uid: userId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed sequence processing layout map.");

      if (data.actionStaged && data.type === "GMAIL") {
        setStagedAction({
          to: data.payload.to,
          subject: data.payload.subject,
          emailBody: data.payload.body,
        });
        triggerToast("Operational action staged into validation card.", "success");
      } else {
        triggerToast(data.message || "Command successfully filed.", "success");
      }

      setRecentHistory(prev => [inputValue, ...prev]);
      setInputValue("");
    } catch (error: any) {
      triggerToast(error.message, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAuthorizeAndDispatch = async () => {
    if (!stagedAction || !userId) return;
    setIsSending(true);

    try {
      const response = await fetch("/api/gmail/dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...stagedAction, uid: userId }),
      });

      if (!response.ok) throw new Error("Operational dispatch logic rejected authorization configuration.");

      triggerToast("Message securely dispatched via synced token context.", "success");
      setStagedAction(null);
    } catch (error: any) {
      triggerToast(error.message, "error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans antialiased flex">
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} hasAppsConnected={connectedApps.length > 0} />

      {toast.show && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3.5 rounded-xl border text-xs font-medium shadow-sm ${
          toast.type === "success" ? "bg-slate-900 text-white border-slate-800" : "bg-red-50 text-red-600 border-red-200"
        }`}>
          {toast.type === "success" && <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />}
          {toast.message}
        </div>
      )}

      <aside className="w-64 border-r border-[#F1F5F9] bg-[#FAFAFA] flex flex-col justify-between shrink-0 h-screen">
        <div className="p-5 space-y-6">
          <div>
            <div className="text-xl font-bold tracking-tight text-[#0F172A] mb-6">LOOP</div>
            <button className="w-full bg-[#2563EB] text-white py-2.5 rounded-xl font-medium text-sm shadow-sm">New Chat</button>
          </div>
          <hr className="border-[#E2E8F0]" />
          <div className="space-y-2.5">
            <div className="text-[11px] font-medium text-[#64748B]">Connected Apps</div>
            {connectedApps.length === 0 ? (
              <div className="text-xs text-[#94A3B8] italic px-3">No active system connections.</div>
            ) : (
              connectedApps.map((app, i) => (
                <div key={i} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#334155]">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center ${app.bg} ${app.color}`}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={app.icon}></path></svg>
                  </div>
                  <span>{app.name}</span>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="p-5 border-t border-[#E2E8F0]"><button onClick={() => setIsSettingsOpen(true)} className="w-full text-left px-3 py-2 text-sm font-medium">Settings</button></div>
      </aside>

      <main className="flex-1 flex flex-col justify-between relative h-screen">
        <div className="flex-1 overflow-y-auto px-6 pb-32 pt-24 flex flex-col items-center">
          {!stagedAction && !isProcessing && (
            <div className="my-auto text-center space-y-4 max-w-2xl">
              <h1 className="text-3xl font-semibold tracking-tight">Loop Agent Console</h1>
              <p className="text-sm text-[#94A3B8]">Issue system instructions directly to your linked operational application pipelines.</p>
            </div>
          )}

          {isProcessing && <div className="my-auto text-sm text-[#475569] animate-pulse">Running semantic parsing pipeline parameters...</div>}

          {stagedAction && (
            <div className="border rounded-3xl bg-white shadow-xl overflow-hidden w-full max-w-2xl my-auto text-sm">
              <div className="bg-[#F8FAFC] border-b px-6 py-4 flex justify-between items-center font-semibold">
                <span>Staged Clearance Execution Pipeline</span>
                <span className="text-[10px] bg-slate-200/50 px-2.5 py-1 rounded-md font-mono">SUPABASE_GMAIL_DISPATCH</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex border-b pb-2"><span className="text-[#64748B] w-20">To:</span><strong>{stagedAction.to}</strong></div>
                <div className="flex border-b pb-2"><span className="text-[#64748B] w-20">Subject:</span><span>{stagedAction.subject}</span></div>
                <div className="bg-[#F8FAFC] border p-5 rounded-2xl whitespace-pre-wrap">{stagedAction.emailBody}</div>
              </div>
              <div className="px-6 py-5 border-t bg-white flex justify-end gap-3">
                <button onClick={() => setStagedAction(null)} className="px-5 py-2.5 text-sm font-medium">Abort</button>
                <button onClick={handleAuthorizeAndDispatch} className="px-6 py-2.5 bg-[#0F172A] text-white text-sm font-medium rounded-xl">
                  {isSending ? "Executing Pipeline..." : "Authorize Transmission"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 w-full bg-gradient-to-t from-white via-white to-transparent pt-10 pb-8 px-6 flex flex-col items-center">
          <form onSubmit={handleCommandSubmit} className="w-full max-w-3xl bg-[#F8FAFC] border rounded-2xl px-4 py-3.5 flex items-center gap-3 focus-within:bg-white focus-within:shadow-md transition-all duration-300">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isProcessing || isSending || !!stagedAction}
              placeholder="Draft real execution sequences here ..."
              className="flex-1 bg-transparent border-none text-sm focus:outline-none placeholder-[#94A3B8]"
            />
            <button type="submit" disabled={!inputValue.trim() || isProcessing} className="bg-[#0F172A] text-white p-2 rounded-xl transition">
               <svg className="w-4 h-4 transform rotate-90" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 19V5m0 0l-7 7m7-7l7 7"/></svg>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}