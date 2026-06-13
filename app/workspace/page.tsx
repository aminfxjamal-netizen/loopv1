'use client';
import { useState, useRef, useEffect } from 'react';

// Types for our messaging system
type Message = { role: 'user' | 'assistant'; content: string };

export default function Workspace() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to produce');

      setMessages([...updatedMessages, { role: 'assistant', content: data.reply }]);
    } catch (error: any) {
      alert(`Loop Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header Area */}
      <header className="p-12 pb-0">
        <h1 className="text-4xl font-semibold text-[#0F172A] mb-3">Good Morning.</h1>
        <p className="text-[#64748B] text-lg mb-16">What would you like Loop to do today?</p>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-12 pt-0 space-y-12" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {['Draft an Email', 'Create a Meeting', 'Analyze a File', 'Research a Topic'].map((action) => (
              <div 
                key={action} 
                className="p-8 border border-[#E2E8F0] rounded-[16px] hover:border-[#2563EB] transition-all cursor-pointer"
                onClick={() => setInput(action)}
              >
                <p className="font-medium text-[#0F172A]">{action}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-2xl ${m.role === 'user' ? 'ml-auto' : ''}`}>
                <p className={`p-4 rounded-[16px] ${m.role === 'user' ? 'bg-[#F1F5F9]' : 'text-[#64748B]'}`}>
                  {m.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Command Input */}
      <div className="p-12 border-t border-[#E2E8F0] bg-white">
        <div className="max-w-3xl mx-auto relative">
          <input 
            className="w-full p-6 border border-[#E2E8F0] rounded-[16px] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
            placeholder="Ask Loop anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-4 top-1/2 -translate-y-1/2 px-6 py-2 bg-[#0F172A] text-white rounded-[8px] hover:bg-[#2563EB] transition"
          >
            {isLoading ? 'Thinking...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}