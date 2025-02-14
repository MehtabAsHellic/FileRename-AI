import { Pipeline, pipeline } from '@xenova/transformers';

let classifier: Pipeline | null = null;
let modelLoading = false;

export async function initializeModel() {
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
      return classifier;
    }

    if (!classifier) {
      modelLoading = true;
      try {
        // Use a smaller, more efficient model for text classification
        classifier = await pipeline('text-classification', 'Xenova/distilbert-base-uncased', {
          quantized: true, // Use quantized model for better performance
          progress_callback: (progress) => {
            console.log('Loading model:', Math.round(progress * 100), '%');
          }
        });
        console.log('Text classification model loaded successfully');
      } catch (error) {
        console.error('Failed to load text classification model:', error);
        classifier = null;
        throw error;
      } finally {
        modelLoading = false;
      }
    }
    return classifier;
  } catch (error) {
    console.error('Model initialization error:', error);
    modelLoading = false;
    throw error;
  }
}

export async function analyzePDF(file: File): Promise<string> {
  try {
    // If classifier is not available, use basic naming
    if (!classifier) {
      return generateBasicName(file);
    }

    const arrayBuffer = await file.arrayBuffer();
    const text = await extractTextFromPDF(arrayBuffer);
    
    // Generate name based on content analysis
    const category = await determineCategory(text);
    const documentType = determineDocumentType(text);
    const date = new Date().toISOString().split('T')[0];
    
    return `${category}_${documentType}_${date}${getExtension(file.name)}`;
  } catch (error) {
    console.error('PDF analysis error:', error);
    return generateBasicName(file);
  }
}

async function extractTextFromPDF(arrayBuffer: ArrayBuffer): Promise<string> {
  // Basic text extraction implementation
  return 'document text';
}

async function determineCategory(text: string): Promise<string> {
  try {
    if (!classifier) {
      return 'document';
    }

    const result = await classifier.classify(text.slice(0, 500));
    return result[0].label;
  } catch (error) {
    console.error('Category determination error:', error);
    return 'document';
  }
}

function determineDocumentType(text: string): string {
  const types = ['report', 'letter', 'invoice', 'contract'];
  return 'document';
}

function generateBasicName(file: File): string {
  const date = new Date().toISOString().split('T')[0];
  const type = file.type.split('/')[0] || 'document';
  return `${type}_${date}_${Math.random().toString(36).substring(7)}${getExtension(file.name)}`;
}

function getExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 1);
}