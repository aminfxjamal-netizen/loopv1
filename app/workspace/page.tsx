'use client';

import React, { useState } from 'react';
import { MessageSquare, Mail, FileText, Calendar as CalendarIcon, CreditCard, Settings as SettingsIcon, Paperclip, Send, Sparkles, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoopWorkspace() {
  const [activeTab, setActiveTab] = useState('AI Chat');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([]);

  const navItems = [
    { name: 'AI Chat', icon: MessageSquare },
    { name: 'Email', icon: Mail },
    { name: 'Files', icon: FileText },
    { name: 'Calendar', icon: CalendarIcon },
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    // Future: Connect to your /api/chat route here
  };

  return (
    <div className="flex h-screen bg-[#FFFFFF] text-[#0F172A] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#E2E8F0] flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <div className="bg-[#2563EB] p-1.5 rounded-lg"><Sparkles className="text-white w-5 h-5" /></div>
            <span className="font-bold text-xl tracking-tight">Loop</span>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${activeTab === item.name ? 'bg-[#F1F5F9] font-medium' : 'text-[#64748B] hover:bg-[#F8FAFC]'}`}
              >
                <item.icon className="w-5 h-5" /> {item.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="space-y-1 border-t border-[#E2E8F0] pt-6">
          <button className="flex items-center gap-3 w-full p-3 text-[#64748B] hover:text-[#0F172A]"><CreditCard className="w-5 h-5" /> Billing</button>
          <button className="flex items-center gap-3 w-full p-3 text-[#64748B] hover:text-[#0F172A]"><SettingsIcon className="w-5 h-5" /> Settings</button>
          <div className="flex items-center gap-3 mt-4 p-2">
            <div className="w-8 h-8 rounded-full bg-[#E2E8F0]" />
            <div className="text-sm">
              <p className="font-medium">User Name</p>
              <p className="text-[#64748B] text-xs">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        <div className="flex-1 overflow-y-auto p-12">
          {messages.length === 0 ? (
            <div className="max-w-2xl mt-20">
              <h1 className="text-5xl font-semibold mb-2">Good Morning.</h1>
              <p className="text-[#64748B] text-xl mb-12">What would you like Loop to do today?</p>
              
              <div className="grid grid-cols-2 gap-4 mb-16">
                {['Draft an Email', 'Create a Meeting', 'Analyze a File', 'Research a Topic'].map((action) => (
                  <div key={action} className="p-6 border border-[#E2E8F0] rounded-2xl hover:border-[#2563EB] transition-colors cursor-pointer">
                    <p className="font-medium">{action}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8 pb-20">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : ''}`}>
                  {m.role === 'ai' && <Bot className="w-8 h-8 p-1.5 bg-[#F1F5F9] rounded-full text-[#2563EB]" />}
                  <div className={`p-4 rounded-2xl max-w-xl ${m.role === 'user' ? 'bg-[#2563EB] text-white' : 'bg-[#F8FAFC]'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white">
          <div className="max-w-3xl mx-auto relative flex items-center bg-white border border-[#E2E8F0] rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-[#2563EB]/20">
            <button className="p-4 text-[#64748B]"><Paperclip className="w-5 h-5" /></button>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Loop anything..."
              className="flex-1 p-4 bg-transparent outline-none"
            />
            <button onClick={handleSend} className="p-2 mr-2 bg-[#0F172A] text-white rounded-xl"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      </main>
    </div>
  );
}