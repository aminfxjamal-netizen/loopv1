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

async function callGroq(messages: any[], maxTokens = 1024) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.7,
      max_tokens: maxTokens
    })
  });

  if (!response.ok) throw new Error(`Groq: ${response.status}`);
  const data = await response.json();
  return data.choices[0].message.content;
}

function cleanJSONResponse(text: string, fallbackEmail: string): string {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.subject || parsed.body) {
        return `To: ${fallbackEmail}\nSubject: ${parsed.subject || 'Update'}\n\n${parsed.body || ''}`;
      }
    }
  } catch {}
  return text;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;
    const cleanInput = lastMessage.trim();

    if (isExpenseScanIntent(cleanInput)) {
      const monthsMatch = cleanInput.match(/(\d+)\s*months?/i);
      const months = monthsMatch ? monthsMatch[1] : '3';
      return Response.json({
        role: "assistant",
        isExpenseScan: true,
        months: months,
        content: `I can help you find forgotten subscriptions.\n\nHere is what we can do:\n\n1. Think about tools you signed up for recently\n\n2. List them here and I will help you track them\n\n3. For any you want to cancel, I will draft the cancellation email\n\nWhich subscriptions are you currently paying for?`
      });
    }

    if (isEmailDraftIntent(cleanInput)) {
      const extractedEmail = extractEmail(cleanInput);

      if (!extractedEmail && !cleanInput.includes('about')) {
        return Response.json({ role: "assistant", content: "Sure, I can send an email for you.\n\nWho should I send it to?" });
      }

      if (extractedEmail && !cleanInput.includes('about') && cleanInput.split(' ').length < 8) {
        return Response.json({ role: "assistant", content: `Got it - sending to ${extractedEmail}.\n\nWhat is the subject and what would you like the email to say?` });
      }

      if (extractedEmail) {
        const responseText = await callGroq([
          { role: "system", content: "Write a professional email. Use proper paragraphs. Bullet points when listing items. Warm but professional tone. Never use placeholders like [Your Name]. Write like a skilled human assistant." },
          { role: "user", content: `Draft an email based on this request: "${cleanInput}". Recipient: ${extractedEmail}.` }
        ]);
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

    const systemPrompt = `You are Loop, a smart and helpful AI assistant.

HOW YOU FORMAT YOUR REPLIES - THIS IS MANDATORY:

Use this structure for every reply:

[Short opening line - 1 sentence max]

[Body - use one of these formats:]

For steps or sequences:
1. First point here
2. Second point here
3. Third point here

For options or lists:
- Option one here
- Option two here
- Option three here

For general information:
Short paragraph. 2-3 sentences max.

Another short paragraph if needed. 2-3 sentences max.

[Closing - question or next step]

RULES YOU CANNOT BREAK:
- Always put a blank line between every section
- Always put a blank line between every list item
- Never write more than 3 sentences without a line break
- Never use **, ###, *, or any markdown
- Never write a wall of text
- Keep your total reply under 200 words unless the user asks for detail

YOUR TONE:
- Warm, direct, human
- Match the user's energy
- Be helpful without being verbose`;

    const chatText = await callGroq([
      { role: "system", content: systemPrompt },
      { role: "user", content: cleanInput }
    ]);

    return Response.json({ role: "assistant", content: chatText });

  } catch (error: any) {
    return Response.json({ role: "assistant", content: "Something went wrong. Please try again." }, { status: 500 });
  }
}