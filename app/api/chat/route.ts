import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Temporary local contacts mock - replace with Firebase/Database lookup later
const contacts: Record<string, string> = {
  john: "john@example.com",
  alice: "alice@example.com"
};

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content.toLowerCase();

  // Check if the user is asking to draft an email via the @Gmail interceptor
  if (lastMessage.startsWith("@gmail draft")) {
    // Basic extraction logic: find who we are emailing
    const words = lastMessage.split(" ");
    const toIndex = words.indexOf("to");
    const name = toIndex !== -1 ? words[toIndex + 1] : "";
    const email = contacts[name] || "unknown@example.com";

    // Ask Gemini to write a high-quality draft based on the user's prompt
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Write a professional email draft based on this request: "${lastMessage}". 
    Return ONLY the raw email body text. Do not include subject lines or greetings like 'Dear' in your output.`;
    
    const result = await model.generateContent(prompt);
    const draftText = (await result.response).text();

    // Return structured data so the frontend can build "Approve" buttons
    return Response.json({
      role: "assistant",
      isDraft: true,
      recipient: email,
      subject: `Update regarding Loop Agent`,
      content: draftText
    });
  }

  // Fallback to normal AI conversation if no @Gmail draft trigger is found
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(lastMessage);
  return Response.json({ role: "assistant", content: (await result.response).text() });
}