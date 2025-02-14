import { Pipeline, pipeline } from '@xenova/transformers';

let summarizer: Pipeline | null = null;
let modelLoading = false;

export async function initializeSummarizer() {
  try {
    if (modelLoading) {
      // Wait for existing loading to complete
      await new Promise(resolve => {
        const checkLoading = () => {
          if (!modelLoading) {
            resolve(true);
          } else {
            setTimeout(checkLoading, 100);
          }
        };
        checkLoading();
      });
      return summarizer;
    }

    if (!summarizer) {
      modelLoading = true;
      try {
        // Use a smaller, more efficient model
        summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6', {
          quantized: true,
          progress_callback: (progress) => {
            console.log('Loading model:', Math.round(progress * 100), '%');
          }
        });
        console.log('Summarizer model loaded successfully');
      } catch (error) {
        console.error('Failed to initialize summarizer:', error);
        summarizer = null;
      } finally {
        modelLoading = false;
      }
    }
    return summarizer;
  } catch (error) {
    console.error('Failed to initialize summarizer:', error);
    modelLoading = false;
    return null;
  }
}

export async function summarizeText(text: string): Promise<string> {
  // If summarizer is not available, return a basic summary
  if (!summarizer) {
    return getFallbackSummary(text);
  }

  try {
    const result = await summarizer.summarize(text, {
      max_length: 130,
      min_length: 30,
    });
    return result[0].summary_text;
  } catch (error) {
    console.error('Summarization error:', error);
    return getFallbackSummary(text);
  }
}

function getFallbackSummary(text: string): string {
  // Extract first few sentences as a basic summary
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  return sentences.slice(0, 3).join(' ').trim() || text.slice(0, 200) + '...';
}

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const { getDocument } = await import('pdfjs-dist');
    const data = await file.arrayBuffer();
    const pdf = await getDocument({ data }).promise;
    let text = '';

    for (let i = 1; i <= Math.min(pdf.numPages, 5); i++) {
      try {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item: any) => item.str)
          .join(' ');
        text += pageText + ' ';
      } catch (pageError) {
        console.error(`Error extracting text from page ${i}:`, pageError);
        continue;
      }
    }

    return text.trim() || 'No text content extracted';
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

export async function extractTextFromDocx(file: File): Promise<string> {
  try {
    const { read, extractRawText } = await import('mammoth');
    const arrayBuffer = await file.arrayBuffer();
    const result = await read(arrayBuffer);
    return extractRawText(result).value || 'No text content extracted';
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    throw new Error('Failed to extract text from DOCX');
  }
}