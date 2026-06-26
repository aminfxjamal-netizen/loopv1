export const dynamic = 'force-dynamic';

function extractEmail(text: string): string | null {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = text.match(emailRegex);
  return match ? match[0] : null;
}

function isEmailDraftIntent(text: string): boolean {
  const lowerText = text.toLowerCase();
  const draftKeywords = ['draft', 'email', 'send', 'compose', 'write to', 'message to', 'mail'];
  return draftKeywords.some(keyword => lowerText.includes(keyword));
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return Response.json(
        { role: "assistant", content: "Configuration error: GROQ_API_KEY is missing." },
        { status: 500 }
      );
    }

    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;
    const cleanInput = lastMessage.trim();

    if (isEmailDraftIntent(cleanInput)) {
      const extractedEmail = extractEmail(cleanInput);

      if (!extractedEmail) {
        return Response.json({
          role: "assistant",
          content: "I'd be happy to draft that email. What email address should I send it to?"
        });
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `You are Loop, an elite executive assistant. Your writing style is your identity. Follow these rules strictly:\n\nFORMATTING:\n- Use proper spacing between paragraphs (blank line between each paragraph)\n- Use bullet points or numbered lists with proper line breaks when listing items\n- Never write "1. Item 2. Item 3. Item" in one line. Each item on its own line.\n- Keep sentences short and clear. No walls of text.\n- Use professional but warm tone. Not robotic. Not overly casual.\n\nTONE:\n- Confident, direct, helpful\n- Never sound like a generic AI\n- Never use phrases like "I hope this email finds you well" or "I am writing to inform you"\n- Write like a skilled human assistant who respects the recipient's time\n\nSTRUCTURE:\n- Subject line: Clear, specific, 3-7 words\n- Body: Greeting, purpose, details (with proper spacing), call to action or next step, closing\n- Always include a clear next step or question\n\nWHEN USER PROVIDES THE BODY:\n- Use their exact body text. Do not rewrite or add to it. Only format it with proper spacing if needed.\n\nWHEN USER ONLY GIVES A TOPIC:\n- Write the full email yourself using your best judgment. Be concise. Be human.\n\nOUTPUT: Valid JSON only. No markdown. No code blocks. Format: {"subject": "Subject line", "body": "Email body with proper spacing and formatting"}`
            },
            {
              role: "user",
              content: `Draft an email based on this request: "${cleanInput}". The recipient email is ${extractedEmail}.`
            }
          ],
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (!response.ok) throw new Error(`Groq API error: ${response.status}`);

      const data = await response.json();
      const responseText = data.choices[0].message.content.trim();

      let subject = "Update from Loop";
      let body = responseText;

      try {
        let cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);
        if (parsed.subject) subject = parsed.subject;
        if (parsed.body) body = parsed.body;
      } catch {
        console.warn("Failed to parse JSON, using raw text");
      }

      return Response.json({
        role: "assistant",
        isDraft: true,
        recipient: extractedEmail,
        sender: "Your connected Gmail",
        subject: subject,
        content: body
      });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are Loop, an elite AI collaborator inside a unified workspace. Your tone is professional, direct, and concise.\n\nFormatting rules:\n- Use proper line breaks and spacing\n- Lists should have each item on its own line\n- Keep responses scannable and organized\n- No walls of text\n- Be helpful without being verbose"
          },
          {
            role: "user",
            content: cleanInput
          }
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) throw new Error(`Groq API error: ${response.status}`);

    const data = await response.json();
    const chatText = data.choices[0].message.content;

    return Response.json({ role: "assistant", content: chatText });

  } catch (error: any) {
    console.error("Pipeline error:", error);
    return Response.json(
      { role: "assistant", content: `Server error: ${error.message || 'Something went wrong.'}` },
      { status: 500 }
    );
  }
}