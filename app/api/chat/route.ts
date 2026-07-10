// @ts-nocheck
export const dynamic = 'force-dynamic';

function extractEmail(text: string): string | null {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = text.match(emailRegex);
  return match ? match[0] : null;
}

function isEmailDraftIntent(text: string): boolean {
  const lowerText = text.toLowerCase();
  const draftKeywords = ['draft an email', 'draft email', 'email to', 'send an email', 'compose an email', 'write an email', 'mail to'];
  return draftKeywords.some(keyword => lowerText.includes(keyword));
}

function isCalendarIntent(text: string): boolean {
  const lowerText = text.toLowerCase();
  const calendarKeywords = ['schedule', 'meeting', 'appointment', 'calendar', 'book a meeting', 'set up a call', 'set up a meeting'];
  return calendarKeywords.some(keyword => lowerText.includes(keyword));
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

    // ========== CALENDAR INTENT ==========
    if (isCalendarIntent(cleanInput)) {
      const extractedEmail = extractEmail(cleanInput);
      
      const today = new Date();
      let meetingDate = today.toISOString().split('T')[0];
      if (cleanInput.includes('tomorrow')) {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        meetingDate = tomorrow.toISOString().split('T')[0];
      }

      const timeMatch = cleanInput.match(/(\d{1,2})\s*(AM|PM|am|pm)/i);
      let meetingTime = '10:00';
      if (timeMatch) {
        let hour = parseInt(timeMatch[1]);
        const ampm = timeMatch[2].toUpperCase();
        if (ampm === 'PM' && hour < 12) hour += 12;
        if (ampm === 'AM' && hour === 12) hour = 0;
        meetingTime = `${hour.toString().padStart(2, '0')}:00`;
      }

      let meetingSubject = 'Meeting';
      const aboutMatch = cleanInput.match(/about\s+(.+)/i);
      if (aboutMatch) meetingSubject = aboutMatch[1].trim().substring(0, 50);

      if (!extractedEmail) {
        return Response.json({
          role: "assistant",
          content: "I can schedule that meeting. What email address should I send the invite to?"
        });
      }

      return Response.json({
        role: "assistant",
        isCalendar: true,
        recipient: extractedEmail,
        subject: meetingSubject,
        date: meetingDate,
        time: meetingTime,
        content: `Meeting: ${meetingSubject}\nWith: ${extractedEmail}\nDate: ${meetingDate}\nTime: ${meetingTime}\n\nWould you like me to schedule this and send a calendar invite?`
      });
    }

    // ========== EMAIL DRAFT FLOW ==========
    if (isEmailDraftIntent(cleanInput)) {
      const extractedEmail = extractEmail(cleanInput);

      if (!extractedEmail) {
        return Response.json({
          role: "assistant",
          content: "I would be happy to draft that email. What email address should I send it to?"
        });
      }

      const systemPrompt = `Write a professional email in clean plain text. Use this exact format with no extra characters:

To: [email]
Subject: [subject]

[Your email body here with proper spacing]

IMPORTANT: Do not use JSON. Do not use curly braces. Do not use quotation marks around fields. Output only the email text. Nothing else.`;

      const responseText = await callGroq([
        { role: "system", content: systemPrompt },
        { role: "user", content: `Draft an email based on this request: "${cleanInput}". Recipient email: ${extractedEmail}.` }
      ]);

      const cleanedText = cleanJSONResponse(responseText, extractedEmail);

      let recipient = extractedEmail;
      let subject = "Update";
      let body = cleanedText;

      const toMatch = cleanedText.match(/^To:\s*(.+)$/m);
      const subjectMatch = cleanedText.match(/^Subject:\s*(.+)$/m);
      
      if (toMatch) recipient = toMatch[1].trim();
      if (subjectMatch) subject = subjectMatch[1].trim();
      
      body = cleanedText
        .replace(/^To:.*\n?/, '')
        .replace(/^Subject:.*\n?/, '')
        .trim();

      return Response.json({
        role: "assistant",
        isDraft: true,
        recipient: recipient,
        sender: "Your connected Gmail",
        subject: subject,
        content: body
      });
    }

    // ========== DEFAULT CHAT FLOW ==========
    const chatText = await callGroq([
      { 
        role: "system", 
        content: "You are Loop, a helpful AI assistant. Keep responses natural, concise, and human. No JSON. No code blocks. No special formatting." 
      },
      { role: "user", content: cleanInput }
    ]);

    return Response.json({ role: "assistant", content: chatText });

  } catch (error: any) {
    console.error("Pipeline error:", error);
    return Response.json(
      { role: "assistant", content: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}