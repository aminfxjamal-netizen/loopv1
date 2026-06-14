"use client";

import {
  MessageSquare,
  Mail,
  FolderOpen,
  Calendar,
  CreditCard,
  Settings,
  Send,
  Paperclip,
  PanelLeftClose,
} from "lucide-react";

export default function WorkspacePage() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
              L
            </div>
            <span className="font-semibold text-lg text-slate-900">
              Loop
            </span>
          </div>

          <button>
            <PanelLeftClose size={18} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-medium"
          >
            <MessageSquare size={18} />
            AI Chat
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
          >
            <Mail size={18} />
            Email
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
          >
            <FolderOpen size={18} />
            Files
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
          >
            <Calendar size={18} />
            Calendar
          </a>

          <div className="border-t my-4"></div>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
          >
            <CreditCard size={18} />
            Billing
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
          >
            <Settings size={18} />
            Settings
          </a>
        </nav>

        <div className="p-4 border-t">
          <div className="rounded-2xl border p-4">
            <p className="font-medium text-slate-900">Trial Plan</p>
            <p className="text-sm text-slate-500 mt-1">
              14 days remaining
            </p>

            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 font-medium">
              Upgrade
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            L
          </div>

          <h1 className="mt-8 text-5xl font-bold text-slate-900 text-center">
            Welcome to Loop
          </h1>

          <p className="mt-4 text-xl text-slate-500 text-center">
            What would you like Loop to do today?
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <button className="px-5 py-3 rounded-full border hover:border-blue-600 hover:text-blue-600 transition">
              Draft an Email
            </button>

            <button className="px-5 py-3 rounded-full border hover:border-blue-600 hover:text-blue-600 transition">
              Analyze a File
            </button>

            <button className="px-5 py-3 rounded-full border hover:border-blue-600 hover:text-blue-600 transition">
              Schedule a Meeting
            </button>

            <button className="px-5 py-3 rounded-full border hover:border-blue-600 hover:text-blue-600 transition">
              Research a Topic
            </button>
          </div>
        </div>

        {/* Composer */}
        <div className="p-8">
          <div className="max-w-4xl mx-auto border rounded-3xl shadow-sm">
            <div className="flex items-center gap-4 px-5 py-4">
              <Paperclip
                className="text-slate-400 cursor-pointer"
                size={20}
              />

              <input
                type="text"
                placeholder="Ask Loop anything..."
                className="flex-1 outline-none text-slate-900"
              />

              <button className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}