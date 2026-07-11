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

function isCalendarIntent(text: string): boolean {
  const lowerText = text.toLowerCase();
  const calendarKeywords = ['schedule a meeting', 'book a meeting', 'set up a call', 'set up a meeting', 'send a calendar invite'];
  return calendarKeywords.some(keyword => lowerText.includes(keyword));
}

function isPersonalCalendarIntent(text: string): boolean {
  const lowerText = text.toLowerCase();
  const personalKeywords = ['add to my calendar', 'add to calendar', 'put in my calendar', 'schedule in my calendar', 'remind me', 'schedule for me', 'schedule something'];
  return personalKeywords.some(keyword => lowerText.includes(keyword));
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

    // ========== EMAIL DRAFT WITH SMART QUESTIONS ==========
    if (isEmailDraftIntent(cleanInput)) {
      const extractedEmail = extractEmail(cleanInput);

      // No email and no subject/body details
      if (!extractedEmail && !cleanInput.includes('about')) {
        return Response.json({
          role: "assistant",
          content: "Sure, I can send an email for you.\n\nWho should I send it to?"
        });
      }

      // Has email but no subject/body
      if (extractedEmail && !cleanInput.includes('about') && cleanInput.split(' ').length < 8) {
        return Response.json({
          role: "assistant",
          content: `Got it — sending to ${extractedEmail}.\n\nWhat is the subject and what would you like the email to say?`
        });
      }

      // Has email and has details — draft it
      if (extractedEmail) {
        const systemPrompt = `You are Loop, a professional AI assistant. Write clean, structured emails.

Format:
- Use clear subject lines
- Use proper paragraphs with line breaks
- Use bullet points when listing items
- Keep a warm but professional tone
- Never use [Your Name] placeholders
- Never use JSON or curly braces
- Write like a skilled human assistant`;

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
        
        body = cleanedText.replace(/^To:.*\n?/, '').replace(/^Subject:.*\n?/, '').trim();

        return Response.json({
          role: "assistant",
          isDraft: true,
          recipient: recipient,
          sender: "Your connected Gmail",
          subject: subject,
          content: body
        });
      }

      // Has no email but has some details
      return Response.json({
        role: "assistant",
        content: "I can draft that email.\n\nWho should I send it to, and what would you like the subject to be?"
      });
    }

    // ========== PERSONAL CALENDAR ==========
    if (isPersonalCalendarIntent(cleanInput)) {
      const today = new Date();
      let meetingDate = today.toISOString().split('T')[0];
      if (cleanInput.includes('tomorrow')) {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        meetingDate = tomorrow.toISOString().split('T')[0];
      }

      const timeMatch = cleanInput.match(/(\d{1,2})\s*(AM|PM|am|pm)/i);
      let meetingTime = '09:00';
      if (timeMatch) {
        let hour = parseInt(timeMatch[1]);
        const ampm = timeMatch[2].toUpperCase();
        if (ampm === 'PM' && hour < 12) hour += 12;
        if (ampm === 'AM' && hour === 12) hour = 0;
        meetingTime = `${hour.toString().padStart(2, '0')}:00`;
      }

      let title = 'Event';
      const titleMatch = cleanInput.match(/called\s+(.+)/i) || cleanInput.match(/titled\s+(.+)/i) || cleanInput.match(/named\s+(.+)/i);
      if (titleMatch) title = titleMatch[1].trim().substring(0, 50);

      return Response.json({
        role: "assistant",
        isPersonalCalendar: true,
        title: title,
        date: meetingDate,
        time: meetingTime,
        content: `Here is your event:\n\n📅 ${title}\n📆 ${meetingDate}\n⏰ ${meetingTime}\n\nClick below to add it to your calendar.`
      });
    }

    // ========== CALENDAR INVITE ==========
    if (isCalendarIntent(cleanInput)) {
      const extractedEmail = extractEmail(cleanInput);
      
      if (!extractedEmail) {
        return Response.json({
          role: "assistant",
          content: "I can schedule that meeting.\n\nWhat email address should I send the invite to?"
        });
      }

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

      return Response.json({
        role: "assistant",
        isCalendar: true,
        recipient: extractedEmail,
        subject: meetingSubject,
        date: meetingDate,
        time: meetingTime,
        content: `Here is the meeting invite:\n\n📅 ${meetingSubject}\n👤 ${extractedEmail}\n📆 ${meetingDate}\n⏰ ${meetingTime}\n\nReady to send the calendar invite.`
      });
    }

    // ========== DEFAULT CHAT FLOW ==========
    const chatSystemPrompt = `You are Loop, a polished and professional AI assistant. Your responses should be:

CLEAN AND STRUCTURED:
- Use clear sections with line breaks between them
- Use numbered lists for multiple items
- Use bullet points for options or features
- Keep paragraphs short and readable

TONE:
- Warm, helpful, and direct
- Professional but not robotic
- Confident but not arrogant
- Concise — respect the user's time

FORMATTING:
- Never use JSON, curly braces, or code blocks in responses
- Never use markdown unless the user asks for code
- Use emojis sparingly — only for emphasis, not decoration
- Always put line breaks between different topics

SMART QUESTIONING:
- If the user's request is missing key details, ask for them politely
- Ask one question at a time unless the missing details are related
- Confirm understanding before taking action`;

    const chatText = await callGroq([
      { role: "system", content: chatSystemPrompt },
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