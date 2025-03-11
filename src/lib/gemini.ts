import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMessage } from "../types";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateTravelPlan(prompt: string) {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    if (!result || !result.response) {
      throw new Error('Invalid response from Gemini API');
    }
    
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('Empty response from Gemini API');
    }
    
    return text;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error generating travel plan:', error.message);
      throw new Error(`Failed to generate travel plan: ${error.message}`);
    } else {
      console.error('Unknown error generating travel plan:', error);
      throw new Error('An unexpected error occurred while generating the travel plan');
    }
  }
}

export async function generateChatResponse(messages: ChatMessage[], currentPlan: string) {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const context = `You are a travel assistant helping with the following travel plan:\n\n${currentPlan}\n\nPlease answer questions about this plan and provide relevant travel advice. Keep responses concise and helpful.`;
    
    const prompt = [
      context,
      ...messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`),
    ].join('\n');

    const result = await model.generateContent(prompt);
    if (!result || !result.response) {
      throw new Error('Invalid response from Gemini API');
    }
    
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('Empty response from Gemini API');
    }
    
    return text;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate chat response: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
}

export function createTravelPrompt(travelDetails: {
  source: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelers: number;
  interests: string[];
}) {
  const formattedInterests = travelDetails.interests.length > 0 
    ? travelDetails.interests.join(', ')
    : 'general sightseeing';

  return `Create a detailed travel itinerary for a trip with the following details:
    - Traveling from: ${travelDetails.source}
    - Destination: ${travelDetails.destination}
    - Dates: ${travelDetails.startDate} to ${travelDetails.endDate}
    - Budget: ₹${travelDetails.budget}
    - Number of travelers: ${travelDetails.travelers}
    - Interests: ${formattedInterests}

    Please provide a detailed travel plan in markdown format with the following sections:

    # Trip Overview
    Brief summary of the trip and key highlights

    # Day-by-Day Itinerary
    ## Day 1 - Arrival
    - Activities
    - Meals
    - Transportation

    [Continue with subsequent days...]

    # Accommodations
    - Recommended hotels/stays within budget
    - Estimated costs per night
    - Location highlights

    # Must-Visit Attractions
    - Key attractions based on interests
    - Recommended timing
    - Entrance fees

    # Local Food Guide
    - Must-try dishes
    - Recommended restaurants
    - Estimated meal costs

    # Transportation
    - Getting around the city
    - Transport options and costs
    - Tips for local transport

    # Budget Breakdown
    - Accommodation: ₹X
    - Activities: ₹X
    - Food: ₹X
    - Transportation: ₹X
    - Miscellaneous: ₹X

    # Travel Tips
    - Cultural considerations
    - Local customs
    - Safety tips
    - Best times for activities`;
}