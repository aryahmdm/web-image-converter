
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateProjectDescription = async (projectName: string, clientName: string) => {
  const ai = getAI();
  const prompt = `Generate a professional and concise 2-sentence project description for a new project titled "${projectName}" for client "${clientName}". Focus on common goals for such a project.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No description generated.";
  } catch (error) {
    console.error("AI generation failed", error);
    return "Error generating description.";
  }
};

export const suggestInvoiceLineItems = async (projectName: string, projectDescription: string) => {
  const ai = getAI();
  const prompt = `Based on a project called "${projectName}" with this description: "${projectDescription}", suggest 3 potential invoice line items. Return them as a JSON array of objects with 'description' and 'estimatedRate' (number).`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              description: { type: Type.STRING },
              estimatedRate: { type: Type.NUMBER }
            },
            required: ["description", "estimatedRate"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("AI suggestion failed", error);
    return [];
  }
};
