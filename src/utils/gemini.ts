import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBto8Eay1-aqUDSzsZ2yrttTTGbYZJsAQY');

export async function analyzeContent(text: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Analyze the following text and provide a concise, descriptive name for the document (max 50 characters). 
    The name should reflect the content, type, and importance of the document.
    Do not include special characters or spaces, use underscores instead.
    Text: ${text.slice(0, 1000)}`; // Limit text length to avoid token limits

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestedName = response.text().trim();
    
    // Clean up the name
    return suggestedName
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .slice(0, 50); // Limit length
  } catch (error) {
    console.error('Gemini analysis error:', error);
    throw error;
  }
}

export async function getChatResponse(message: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `You are a helpful assistant for a file renaming application. 
    Help users understand how to use the application, explain features, and provide guidance.
    Keep responses concise and friendly.
    User message: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Gemini chat error:', error);
    throw new Error('Failed to get response. Please try again.');
  }
}