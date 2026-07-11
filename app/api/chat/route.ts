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

    // ========== EXPENSE & SAAS TRACKER ==========
    if (isExpenseScanIntent(cleanInput)) {
      const monthsMatch = cleanInput.match(/(\d+)\s*months?/i);
      const months = monthsMatch ? monthsMatch[1] : '3';

      return Response.json({
        role: "assistant",
        isExpenseScan: true,
        months: months,
        content: `I can help you find forgotten subscriptions 💸\n\nTo do this safely, I will not scan your inbox automatically. Instead, here is what we can do:\n\n1. Think about tools you signed up for recently\n\n2. List them here and I will help you track them\n\n3. For any you want to cancel, I will draft the cancellation email\n\nWhich subscriptions are you currently paying for?`
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
        content: `Here is your event 📅\n\n${title}\n${meetingDate}\n${meetingTime}\n\nClick below to add it to your calendar.`
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
        content: `Here is the meeting invite:\n\n${meetingSubject}\nWith: ${extractedEmail}\n${meetingDate}\n${meetingTime}\n\nReady to send the calendar invite.`
      });
    }

    // ========== EMAIL DRAFT WITH SMART QUESTIONS ==========
    if (isEmailDraftIntent(cleanInput)) {
      const extractedEmail = extractEmail(cleanInput);

      if (!extractedEmail && !cleanInput.includes('about')) {
        return Response.json({
          role: "assistant",
          content: "Sure, I can send an email for you.\n\nWho should I send it to?"
        });
      }

      if (extractedEmail && !cleanInput.includes('about') && cleanInput.split(' ').length < 8) {
        return Response.json({
          role: "assistant",
          content: `Got it — sending to ${extractedEmail}.\n\nWhat is the subject and what would you like the email to say?`
        });
      }

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

      return Response.json({
        role: "assistant",
        content: "I can draft that email.\n\nWho should I send it to, and what would you like the subject to be?"
      });
    }

    // ========== DEFAULT CHAT FLOW ==========
    const chatSystemPrompt = `You are Loop, a polished and professional AI assistant.

HOW YOU PROCESS BEFORE REPLYING:
1. Read the full message — not just the last sentence. Understand the tone, the energy, the actual need.
2. Identify what the person actually needs — sometimes what they ask and what they need are different.
3. Match your energy to theirs — casual in, casual out. Professional in, professional out.
4. Answer the specific thing asked — not a general version of it.
5. Keep it as short as it needs to be — and no longer.

YOUR VOICE:
- Warm, helpful, direct
- Professional but not robotic
- Confident but not arrogant
- Concise — respect the user's time

FORMATTING RULES — FOLLOW THESE EXACTLY:

NEVER DO THIS:
**Phase 1** do this **Phase 2** do that
### Section one
* item one * item two

ALWAYS DO THIS:

Here is the plan:

1. First, we do this

2. Then we do that

3. Finally, we do this

Which step should we start with?

Or for options:

Here are your options:

- Option one with a short description
- Option two with a short description
- Option three with a short description

Which one works best for you?

CRITICAL RULES:
- Never use **, ###, *, __, or any markdown symbols
- Use numbers (1. 2. 3.) for sequences and steps
- Use simple dashes (-) for bullet points and options
- Put a blank line between every section and every list item
- Use emojis naturally based on the mood — not forced, not excessive
- Always end with a clear next step, question, or call to action
- Be specific to the person in front of you — not a general template`;

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