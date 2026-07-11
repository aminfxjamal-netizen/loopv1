export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(JSON.stringify({ success: false, error: "No file uploaded." }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Read file content
    const text = await file.text();
    
    // Truncate if too long (Groq has token limits)
    const maxLength = 8000;
    const truncated = text.length > maxLength ? text.substring(0, maxLength) + '...(truncated)' : text;

    // Send to Groq for summarization
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are Loop, a professional AI assistant. Summarize the following document clearly and concisely. Use numbered sections if there are multiple key points. Keep it organized with proper spacing. No markdown. No JSON."
          },
          {
            role: "user",
            content: `Please summarize this document: ${truncated}`
          }
        ],
        temperature: 0.3,
        max_tokens: 1024
      })
    });

    if (!groqResponse.ok) throw new Error(`Groq error: ${groqResponse.status}`);
    const data = await groqResponse.json();
    const summary = data.choices[0].message.content;

    return new Response(JSON.stringify({
      success: true,
      fileName: file.name,
      fileSize: file.size,
      summary: summary
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}