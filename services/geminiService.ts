
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AI_CONFIG } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export class GeminiService {
  /**
   * General purpose chat with sentiment analysis
   */
  static async getCompanionResponse(message: string, history: any[] = []) {
    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: `${AI_CONFIG.SYSTEM_PROMPT}\n\nUser: ${message}` }] }
        ],
        config: {
          temperature: 0.7,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: { type: Type.STRING },
              sentiment: { type: Type.STRING, enum: ['positive', 'neutral', 'negative', 'crisis'] },
              isCrisis: { type: Type.BOOLEAN },
              suggestedAction: { type: Type.STRING }
            },
            required: ['reply', 'sentiment', 'isCrisis']
          }
        }
      });
      
      return JSON.parse(response.text);
    } catch (error) {
      console.error("Gemini Error:", error);
      return { reply: "I'm sorry, I'm having trouble connecting right now. Please try again or call a crisis helpline if this is urgent.", isCrisis: false };
    }
  }

  /**
   * For psychologist use: summarizing raw session notes
   */
  static async summarizeSession(notes: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [{ parts: [{ text: `${AI_CONFIG.SUMMARY_PROMPT}\n\nNotes: ${notes}` }] }]
    });
    return response.text;
  }

  /**
   * Match user to therapist based on profile and recent mood
   */
  static async matchTherapist(userContext: string, therapists: any[]) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ 
        parts: [{ text: `Based on this user context: "${userContext}", select the best 2 matches from this therapist list: ${JSON.stringify(therapists)}. Return only IDs.` }] 
      }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text);
  }
}
