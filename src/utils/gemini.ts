import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBto8Eay1-aqUDSzsZ2yrttTTGbYZJsAQY');

export async function analyzeContent(text: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Analyze the following text and provide a concise, descriptive name for the document. 
    The name should reflect the content, type, and importance of the document.
    Text: ${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
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
    User message: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini chat error:', error);
    throw error;
  }
}