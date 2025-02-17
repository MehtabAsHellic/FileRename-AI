import { Pipeline, pipeline } from '@xenova/transformers';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { analyzeContent } from './gemini';

// Configure PDF.js worker
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

let classifier: Pipeline | null = null;
let modelLoading = false;

export async function initializeModel() {
  try {
    if (modelLoading) {
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
      return classifier;
    }

    if (!classifier) {
      modelLoading = true;
      try {
        classifier = await pipeline('text-classification', 'Xenova/distilbart-cnn-6-6', {
          quantized: true,
          progress_callback: (progress) => {
            console.log('Loading model:', Math.round(progress * 100), '%');
          },
          cache: true,
          retry: true,
          retries: 3,
          timeout: 60000,
          fallbackToCache: true
        });
        console.log('Text classification model loaded successfully');
      } catch (error) {
        console.error('Failed to load text classification model:', error);
        classifier = null;
      } finally {
        modelLoading = false;
      }
    }
    return classifier;
  } catch (error) {
    console.error('Model initialization error:', error);
    modelLoading = false;
    return null;
  }
}

export async function analyzePDF(file: File): Promise<string> {
  try {
    const text = await extractTextFromPDF(file);
    if (!text) {
      console.warn('No text extracted from PDF, falling back to basic naming');
      return generateBasicName(file);
    }
    
    // Use Gemini API for content analysis
    try {
      const suggestedName = await analyzeContent(text);
      if (suggestedName) {
        return `${suggestedName}${getExtension(file.name)}`;
      }
    } catch (error) {
      console.error('Gemini analysis error:', error);
    }
    
    // Fallback to local analysis if Gemini fails
    const category = await determineCategory(text);
    const documentType = determineDocumentType(text);
    const keywords = extractKeywords(text);
    const date = new Date().toISOString().split('T')[0];
    
    return `${category}_${documentType}_${keywords}_${date}${getExtension(file.name)}`;
  } catch (error) {
    console.error('PDF analysis error:', error);
    return generateBasicName(file);
  }
}

async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const { getDocument } = await import('pdfjs-dist');
    const data = await file.arrayBuffer();
    const pdf = await getDocument({ data }).promise;
    let text = '';

    for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) {
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

    return text.trim() || '';
  } catch (error) {
    console.error('Text extraction error:', error);
    return '';
  }
}

async function determineCategory(text: string): Promise<string> {
  if (!classifier) {
    return 'document';
  }

  try {
    const result = await classifier(text.slice(0, 1000));
    const score = parseInt(result[0].label.split(' ')[0]);
    
    const categoryMap: Record<number, string> = {
      1: 'low_priority',
      2: 'review_needed',
      3: 'normal',
      4: 'important',
      5: 'critical'
    };
    
    return categoryMap[score] || 'document';
  } catch (error) {
    console.error('Category determination error:', error);
    return 'document';
  }
}

function determineDocumentType(text: string): string {
  try {
    const types = [
      'report', 'letter', 'invoice', 'contract', 'memo', 'proposal',
      'agreement', 'presentation', 'analysis', 'review', 'summary',
      'specification', 'manual', 'policy', 'plan', 'schedule'
    ];
    
    const lowercaseText = text.toLowerCase();
    const foundTypes = types.filter(type => lowercaseText.includes(type));
    
    return foundTypes[0] || 'document';
  } catch (error) {
    console.error('Document type determination error:', error);
    return 'document';
  }
}

function extractKeywords(text: string): string {
  try {
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    const wordFreq: Record<string, number> = {};
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    const keywords = Object.entries(wordFreq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([word]) => word)
      .join('_');
    
    return keywords || 'no_keywords';
  } catch (error) {
    console.error('Keyword extraction error:', error);
    return 'keywords_error';
  }
}

function generateBasicName(file: File): string {
  try {
    const date = new Date().toISOString().split('T')[0];
    const type = file.type.split('/')[0] || 'document';
    const randomId = Math.random().toString(36).substring(7);
    return `${type}_${date}_${randomId}${getExtension(file.name)}`;
  } catch (error) {
    console.error('Basic name generation error:', error);
    return `document_${Date.now()}${getExtension(file.name)}`;
  }
}

function getExtension(filename: string): string {
  try {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 1);
  } catch (error) {
    console.error('Extension extraction error:', error);
    return '.txt';
  }
}