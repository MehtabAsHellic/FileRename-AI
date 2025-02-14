import { Pipeline, pipeline } from '@xenova/transformers';

let summarizer: Pipeline | null = null;

export async function initializeSummarizer() {
  if (!summarizer) {
    summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-12-6');
  }
  return summarizer;
}

export async function summarizeText(text: string): Promise<string> {
  try {
    if (!summarizer) {
      await initializeSummarizer();
    }

    // Split text into chunks if it's too long (model typically has a max length)
    const maxChunkLength = 1000;
    const chunks = splitTextIntoChunks(text, maxChunkLength);
    
    const summaries = await Promise.all(
      chunks.map(async (chunk) => {
        const result = await summarizer!.generate(chunk);
        return result[0].summary_text;
      })
    );

    return summaries.join(' ');
  } catch (error) {
    console.error('Summarization error:', error);
    throw new Error('Failed to generate summary');
  }
}

function splitTextIntoChunks(text: string, maxLength: number): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length <= maxLength) {
      currentChunk += sentence;
    } else {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence;
    }
  }

  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
}

export async function extractTextFromPDF(file: File): Promise<string> {
  const { getDocument } = await import('pdfjs-dist');
  const data = await file.arrayBuffer();
  const pdf = await getDocument({ data }).promise;
  let text = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str)
      .join(' ');
    text += pageText + ' ';
  }

  return text.trim();
}

export async function extractTextFromDocx(file: File): Promise<string> {
  const { read, extractRawText } = await import('mammoth');
  const arrayBuffer = await file.arrayBuffer();
  const result = await read(arrayBuffer);
  return extractRawText(result).value;
}