"use client";

import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  isDraft?: boolean;
  recipient?: string;
  subject?: string;
}

export default function WorkspacePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to the Loop Agent workspace. Use '@gmail draft an email to john' to prepare a message.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Send message handler
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("Failed to communicate with API");

      const data = await response.json();
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please check your setup and try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Triggered when clicking 'Approve & Send'
  const handleSendEmail = async (msg: Message) => {
    alert(`Dispatched email successfully to ${msg.recipient}!`);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: `✅ Email successfully sent to ${msg.recipient}.` }
    ]);
  };

  // Triggered when clicking 'Regenerate'
  const handleRegenerate = async (msg: Message) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages,
            { role: "user", content: `@gmail draft an email to rewrite the previous draft for ${msg.recipient}` }
          ]
        }),
      });

      if (!response.ok) throw new Error("Regeneration failed");
      const data = await response.json();
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error("Regeneration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center justify-between">
        <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-500"></span>
          Loop Agent Workspace
        </h1>
        <div className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700/50">
          Gemini Powered
        </div>
      </header>

      {/* Chat Display Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-4 max-w-4xl w-full mx-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.isDraft ? (
              /* High-Fidelity Interactive Email Draft Card */
              <div className="p-5 border border-blue-500/30 rounded-xl bg-slate-900/90 shadow-lg my-2 w-full max-w-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs text-blue-400 font-bold tracking-wider uppercase mb-3">
                  <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                  📧 Email Draft Prepared
                </div>
                <div className="text-xs text-slate-400 space-y-1 mb-3 border-b border-slate-800 pb-2">
                  <div><strong className="text-slate-300">To:</strong> {msg.recipient}</div>
                  <div><strong className="text-slate-300">Subject:</strong> {msg.subject}</div>
                </div>
                <p className="text-sm text-slate-200 bg-slate-950/60 p-4 rounded-lg border border-slate-800/80 whitespace-pre-wrap leading-relaxed shadow-inner">
                  {msg.content}
                </p>
                
                <div className="flex gap-2 mt-4 justify-end">
                  <button 
                    onClick={() => handleRegenerate(msg)} 
                    disabled={isLoading}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 border border-slate-700/60 rounded-lg text-xs font-semibold tracking-wide transition shadow-sm"
                  >
                    Regenerate
                  </button>
                  <button 
                    onClick={() => handleSendEmail(msg)} 
                    disabled={isLoading}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold tracking-wide shadow-md shadow-blue-900/20 transition duration-200"
                  >
                    Approve & Send
                  </button>
                </div>
              </div>
            ) : (
              /* Standard Chat Bubble */
              <div
                className={`max-w-xl p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-slate-900 text-slate-200 border border-slate-800/80 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl rounded-bl-none text-xs text-slate-400 flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-slate-500 animate-ping"></span>
              Loop Agent is processing...
            </div>
          </div>
        )}
      </main>

      {/* Input Form Bar */}
      <footer className="p-4 border-t border-slate-800 bg-slate-900/30 backdrop-blur">
        <form onSubmit={handleSendMessage} className="max-w-4xl w-full mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message or use '@gmail draft an email to john'..."
            disabled={isLoading}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-medium px-5 rounded-xl text-sm transition"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}