'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'Hey! I am your Loop AI assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'ai',
        text: 'Got it! I am working on that for you right now 🔥'
      }]);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#08090A] text-white flex">
      <aside className="w-64 bg-[#0F1117] border-r border-[#1F232B] flex flex-col p-4 fixed h-full">
        <h1 className="text-xl font-bold mb-8 flex items-center gap-2">
          <span className="text-[#4F46E5]">🦋</span> Loop
        </h1>
        <button className="w-full py-3 bg-[#4F46E5] text-black font-semibold rounded-2xl mb-6 hover:bg-[#6366F1] transition">
          + New Chat
        </button>
        <div className="mb-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#111318] rounded-xl border border-[#1F232B]">
            <span className="text-gray-400">🔍</span>
            <input type="text" placeholder="Search chats..." className="bg-transparent text-sm text-white placeholder-gray-600 outline-none w-full" />
          </div>
        </div>
        <div className="mb-6">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 px-1">Apps</p>
          <div className="flex flex-col gap-1">
            {[
              { icon: '📧', name: 'Gmail' },
              { icon: '📋', name: 'Asana' },
              { icon: '🐙', name: 'GitHub' },
              { icon: '💬', name: 'Slack' },
            ].map((app, i) => (
              <button key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:bg-[#111318] hover:text-white transition text-sm">
                <span>{app.icon}</span> {app.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 px-1">Recent Chats</p>
          <div className="flex flex-col gap-1">
            {[
              'Follow up with John',
              'Project roadmap',
              'Draft proposal',
            ].map((chat, i) => (
              <button key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-400 hover:bg-[#111318] hover:text-white transition text-sm text-left truncate">
                💬 {chat}
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-[#1F232B] pt-4 mt-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-[#4F46E5] flex items-center justify-center text-sm font-bold text-black">A</div>
            <div>
              <p className="text-sm font-medium">Amin</p>
              <p className="text-xs text-gray-500">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col ml-64">
        <header className="border-b border-[#1F232B] px-6 py-4 flex items-center justify-between bg-[#08090A]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#4F46E5]"></div>
            <span className="text-sm text-gray-400">Loop AI</span>
            <span className="text-xs bg-[#111318] border border-[#1F232B] px-3 py-1 rounded-full text-gray-400">Pro</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Online
          </div>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${msg.role === 'ai' ? 'bg-[#4F46E5] text-black' : 'bg-[#1F232B] text-white'}`}>
                {msg.role === 'ai' ? '🦋' : 'A'}
              </div>
              <div className={`max-w-xl px-5 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'ai' ? 'bg-[#111318] border border-[#1F232B] text-white' : 'bg-[#4F46E5] text-black font-medium'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-[#1F232B]">
          <div className="flex items-center gap-3 bg-[#111318] border border-[#1F232B] rounded-2xl px-4 py-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Message Loop AI..."
              className="flex-1 bg-transparent text-white placeholder-gray-600 outline-none text-sm"
            />
            <button onClick={handleSend} className="px-5 py-2 bg-[#4F46E5] text-black font-semibold rounded-xl hover:bg-[#6366F1] transition text-sm">
              Send
            </button>
          </div>
          <p className="text-xs text-gray-600 text-center mt-2">Loop AI can make mistakes. Always verify important information.</p>
        </div>
      </div>
    </main>
  );
}