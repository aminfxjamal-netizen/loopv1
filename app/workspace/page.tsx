'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';

/**
 * Loop V1: Unified Workspace Architecture
 * A premium, AI-first operating system interface.
 */

type Message = { role: 'user' | 'assistant'; content: string };

export default function Workspace() {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Maintain scroll position for premium feel
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Connection failed');

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error: any) {
      console.error('Execution Error:', error);
      alert('System Error: Unable to reach the Brain.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="flex h-screen bg-[#FFFFFF] text-[#0F172A] font-sans selection:bg-[#2563EB] selection:text-white">
      {/* Sidebar Navigation - Distraction Free */}
      <aside className="w-64 border-r border-[#E2E8F0] p-8 flex flex-col justify-between">
        <div className="space-y-12">
          <div className="font-bold text-2xl tracking-tight">Loop</div>
          <nav className="space-y-4">
            <div className="text-[#0F172A] font-medium py-2">Workspace</div>
          </nav>
        </div>
        <div className="pt-8 border-t border-[#E2E8F0] space-y-2">
          <div className="text-[#0F172A] font-medium">User Profile</div>
          <div className="text-[#64748B] text-sm">Pro Plan</div>
        </div>
      </aside>

      {/* Main Workspace - Focused Interaction */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#FFFFFF]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-12 scroll-smooth">
          {messages.length === 0 ? (
            <div className="max-w-3xl mx-auto pt-24">
              <h1 className="text-5xl font-semibold mb-4 tracking-tight">Good Morning.</h1>
              <p className="text-[#64748B] text-xl mb-16">What would you like Loop to do today?</p>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Draft an Email' },
                  { label: 'Create a Meeting' },
                  { label: 'Analyze a File' },
                  { label: 'Research a Topic' }
                ].map((item) => (
                  <button 
                    key={item.label}
                    onClick={() => setInput(item.label)}
                    className="p-8 border border-[#E2E8F0] rounded-[16px] text-left hover:border-[#2563EB] transition-all duration-300 group"
                  >
                    <span className="font-medium text-[#0F172A] group-hover:text-[#2563EB]">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-20 text-[#64748B]">
                <h2 className="font-semibold text-[#0F172A] mb-4">Capabilities</h2>
                <ul className="space-y-3">
                  <li>• Manage communication across email and messaging.</li>
                  <li>• Analyze complex documents and data.</li>
                  <li>• Schedule and optimize your calendar.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-12 pb-24">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-6 rounded-[20px] ${m.role === 'user' ? 'bg-[#F1F5F9] text-[#0F172A]' : 'bg-transparent text-[#0F172A] border border-[#E2E8F0]'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-[#64748B] p-6">Loop is processing...</div>}
            </div>
          )}
        </div>

        {/* Fixed Command Input - The Core Component */}
        <div className="p-8 border-t border-[#E2E8F0] bg-[#FFFFFF]">
          <div className="max-w-3xl mx-auto relative">
            <input 
              type="text"
              className="w-full p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[16px] text-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all duration-300 shadow-sm"
              placeholder="Ask Loop anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              onClick={handleSendMessage}
              className="absolute right-4 top-1/2 -translate-y-1/2 px-6 py-3 bg-[#0F172A] text-white rounded-[10px] hover:bg-[#2563EB] transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}