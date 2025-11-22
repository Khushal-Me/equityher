import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { PortfolioHolding } from "@/types/portfolio";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor() {
    this.genAI = new GoogleGenerativeAI(API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async sendMessage(text: string) {
    try {
      const chat = this.model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "System Prompt: You are EquityHer, a professional and warm investment mentor for women. Explain concepts simply and clearly, focusing on long-term wealth. Never give specific stock recommendations. Be encouraging but maintain a professional tone—avoid patronizing language (e.g., 'my dear') or overly childish metaphors. Keep responses VERY concise (under 80-100 words). Use Markdown for formatting (bold, lists, paragraphs) to ensure readability." }],
          },
          {
            role: "model",
            parts: [{ text: "Understood. I am EquityHer, your professional and supportive investment mentor. I will provide clear, concise, and encouraging guidance to help you grow your wealth." }],
          },
        ],
      });

      const result = await chat.sendMessage(text);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to get response from Gemini.");
    }
  }

  async analyzePortfolio(holdings: PortfolioHolding[], totalValue: number) {
    try {
      const prompt = `Analyze this portfolio: ${JSON.stringify(holdings)}. Total value: $${totalValue}. Provide: diversification assessment, risk level, 3 recommendations, strengths, improvement areas. Keep descriptions extremely short and concise (max 1 sentence per point). Return the response as a JSON object with keys: assessment, diversificationScore (0-100), riskLevel (Low/Medium/High), recommendations (array of strings), strengths (array of strings), improvements (array of strings).`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean up markdown code blocks if present and extract JSON
      let jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
      
      // Find the first '{' and last '}' to ensure we only parse the JSON object
      const firstBrace = jsonString.indexOf('{');
      const lastBrace = jsonString.lastIndexOf('}');
      
      if (firstBrace !== -1 && lastBrace !== -1) {
        jsonString = jsonString.substring(firstBrace, lastBrace + 1);
      }

      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return {
        assessment: "Unable to analyze portfolio at this time.",
        diversificationScore: 0,
        riskLevel: "Unknown",
        recommendations: [],
        strengths: [],
        improvements: []
      };
    }
  }

  async generateLessonContent(topic: string, knowledgeLevel: string) {
    try {
      const prompt = `Create a lesson on ${topic} for a ${knowledgeLevel} investor. Include: intro, 3 key concepts with examples, practical tips, and 3 quiz questions with answers. Return as JSON with keys: intro, concepts (array of {title, content}), tips (array of strings), quiz (array of {question, options (array), correctAnswer (index)}).`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Gemini Lesson Error:", error);
      throw new Error("Failed to generate lesson content.");
    }
  }
}

export const geminiService = new GeminiService();
