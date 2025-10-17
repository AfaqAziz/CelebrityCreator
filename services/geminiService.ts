
import { GoogleGenAI, Modality } from "@google/genai";
import type { CelebrityProfile } from '../types';

const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)} million`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
    return num.toString();
}

const buildPrompt = (profile: CelebrityProfile): string => {
  return `Create a high-resolution, photorealistic headshot of a fictional social media influencer for a ${profile.brandType} brand campaign. The influencer is a ${profile.gender} of ${profile.origin} descent. They should look charismatic and have a strong online presence, consistent with someone who has approximately ${formatNumber(profile.followers.instagram)} Instagram followers, ${formatNumber(profile.followers.facebook)} Facebook followers, and ${formatNumber(profile.followers.tiktok)} TikTok followers. The image should be of professional quality, suitable for a high-end advertising campaign. Use studio lighting, a shallow depth of field, and ensure the focus is sharp on the eyes. 8k resolution, ultra-detailed.`;
};

export const generateCelebrityImage = async (profile: CelebrityProfile): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = buildPrompt(profile);
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
      }
    }
    
    throw new Error('No image data found in the API response.');

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while generating the image.");
  }
};
