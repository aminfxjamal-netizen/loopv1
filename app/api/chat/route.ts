// @ts-nocheck
export const dynamic = 'force-dynamic';

function extractEmail(text: string): string | null {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = text.match(emailRegex);
  return match ? match[0] : null;
}

function isEmailDraftIntent(text: string): boolean {
  const lowerText = text.toLowerCase();
  const draftKeywords = ['draft an email', 'draft email', 'email to', 'send an email', 'compose an email', 'write an email', 'mail to', 'send email', 'send a message'];
  return draftKeywords.some(keyword => lowerText.includes(keyword));
}

function isExpenseScanIntent(text: string): boolean {
  const lowerText = text.toLowerCase();
  const scanKeywords = ['scan my subscriptions', 'scan subscriptions', 'scan my expenses', 'find subscriptions', 'track my subscriptions', 'check my subscriptions'];
  return scanKeywords.some(keyword => lowerText.includes(keyword));
}

function isFileSearchIntent(text: string): boolean {
  const lowerText = text.toLowerCase();
  const searchKeywords = ['find file', 'find my', 'search for', 'look for', 'where is', 'find the'];
  return searchKeywords.some(keyword => lowerText.includes(keyword));
}

async function callGroq(messages: any[], maxTokens = 1024) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages, temperature: 0.7, max_tokens: maxTokens })
  });
  if (!response.ok) throw new Error(`Groq: ${response.status}`);
  const data = await response.json();
  return data.choices[0].message.content;
}

function cleanJSONResponse(text: string, fallbackEmail: string): string {
  try { const jsonMatch = text.match(/\{[\s\S]*\}/); if (jsonMatch) { const parsed = JSON.parse(jsonMatch[0]); if (parsed.subject || parsed.body) return `To: ${fallbackEmail}\nSubject: ${parsed.subject || 'Update'}\n\n${parsed.body || ''}`; } } catch {}
  return text;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;
    const cleanInput = lastMessage.trim();

    if (isExpenseScanIntent(cleanInput)) {
      const monthsMatch = cleanInput.match(/(\d+)\s*months?/i);
      return Response.json({ role: "assistant", isExpenseScan: true, months: monthsMatch ? monthsMatch[1] : '3', content: `I can help you find forgotten subscriptions.\n\nHere is what we can do:\n\n1. Think about tools you signed up for recently\n\n2. List them here and I will help you track them\n\n3. For any you want to cancel, I will draft the cancellation email\n\nWhich subscriptions are you currently paying for?` });
    }

    if (isFileSearchIntent(cleanInput)) {
      const searchQuery = cleanInput.replace(/find|search for|look for|where is|find my|find the/gi, '').trim();
      return Response.json({ role: "assistant", isDriveSearch: true, query: searchQuery, content: `Searching your Drive for "${searchQuery}"...\n\nMake sure your Drive is connected in the Connected Apps panel.` });
    }

    if (isEmailDraftIntent(cleanInput)) {
      const extractedEmail = extractEmail(cleanInput);
      if (!extractedEmail && !cleanInput.includes('about')) return Response.json({ role: "assistant", content: "Sure, I can send an email for you.\n\nWho should I send it to?" });
      if (extractedEmail && !cleanInput.includes('about') && cleanInput.split(' ').length < 8) return Response.json({ role: "assistant", content: `Got it - sending to ${extractedEmail}.\n\nWhat is the subject and what would you like the email to say?` });
      if (extractedEmail) {
        const responseText = await callGroq([{ role: "system", content: "Write a professional email. Use proper paragraphs. Bullet points when listing items. Warm but professional tone. Never use placeholders like [Your Name]." }, { role: "user", content: `Draft an email: "${cleanInput}". Recipient: ${extractedEmail}.` }]);
        const cleanedText = cleanJSONResponse(responseText, extractedEmail);
        let recipient = extractedEmail, subject = "Update", body = cleanedText;
        const toMatch = cleanedText.match(/^To:\s*(.+)$/m), subjectMatch = cleanedText.match(/^Subject:\s*(.+)$/m);
        if (toMatch) recipient = toMatch[1].trim();
        if (subjectMatch) subject = subjectMatch[1].trim();
        body = cleanedText.replace(/^To:.*\n?/, '').replace(/^Subject:.*\n?/, '').trim();
        return Response.json({ role: "assistant", isDraft: true, recipient, sender: "Your connected Gmail", subject, content: body });
      }
      return Response.json({ role: "assistant", content: "I can draft that email.\n\nWho should I send it to, and what would you like the subject to be?" });
    }

    const systemPrompt = `You are Loop, a smart and helpful AI assistant. Reply in clean, organized text. Use numbered lists (1. 2. 3.) for steps. Use dashes (-) for options. Put blank lines between sections. Keep paragraphs short. Never use markdown. Never write walls of text. Match the user's tone. Be warm and direct.`;
    const chatText = await callGroq([{ role: "system", content: systemPrompt }, { role: "user", content: cleanInput + "\n\n(Use numbered lists for steps, dashes for options, blank lines between sections. No markdown. No walls of text.)" }]);

    return Response.json({ role: "assistant", content: chatText });
  } catch (error: any) {
    return Response.json({ role: "assistant", content: "Something went wrong. Please try again." }, { status: 500 });
  }
}