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

    // ========== EMAIL DRAFT FLOW ==========
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
              content: `You are an executive assistant writing professional emails. Output valid JSON only. No markdown. Format: {"subject": "The subject line here", "body": "The email body here"}. Rules: Subject concise and relevant. Body professional and ready to send. No placeholder text. No made up facts.`
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

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
      }

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

    // ========== DEFAULT CHAT FLOW ==========
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
            content: "You are an elite AI collaborator. Professional and direct. You help users manage emails, schedule meetings, and get work done. Keep responses concise."
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

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

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