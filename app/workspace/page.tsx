'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, User, Bot } from 'lucide-react';

export default function WorkspacePage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-6 flex flex-col justify-between">
        <div className="flex items-center gap-2 font-bold text-lg"><Sparkles className="text-blue-600" /> Loop</div>
        <div className="text-xs text-gray-500">© 2026 Loop Inc.</div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : ''}`}>
              {m.role === 'assistant' && <Bot className="w-8 h-8 p-1.5 bg-blue-100 rounded-full text-blue-600" />}
              <div className={`p-4 rounded-2xl max-w-lg text-sm ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
                {m.content}
              </div>
              {m.role === 'user' && <User className="w-8 h-8 p-1.5 bg-gray-200 rounded-full" />}
            </div>
          ))}
          {loading && <div className="text-xs text-gray-400">Loop is thinking...</div>}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t">
          <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Loop anything..."
              className="flex-1 bg-transparent p-2 text-sm outline-none"
            />
            <button onClick={handleSendMessage} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}