import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content;

  // 1. ELITE PERSONA SYSTEM PROMPT
  const systemInstruction = `You are a high-level AI collaborator. 
  Your tone is professional, concise, and action-oriented. 
  If the user mentions an action with '@', such as '@Gmail', 
  trigger the relevant function call logic. Otherwise, provide 
  sharp, insightful analysis.`;

  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: systemInstruction 
  });

  // 2. CHECK FOR @ TRIGGER
  if (lastMessage.startsWith("@Gmail")) {
    // This is where we will bridge to your /api/gmail/dispatch later
    return Response.json({ role: "assistant", content: "Acknowledged. Preparing to dispatch via Gmail pipeline..." });
  }

  // 3. NORMAL AI RESPONSE
  const result = await model.generateContent(lastMessage);
  const response = await result.response;
  
  return Response.json({ role: "assistant", content: response.text() });
}