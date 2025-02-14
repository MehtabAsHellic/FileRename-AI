import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';

// Configure PDF.js worker - use the SAME version as pdfjs-dist
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

let model: use.UniversalSentenceEncoder | null = null;

export async function initializeModel() {
  try {
    await tf.ready();
    if (tf.findBackend('webgl')) {
      await tf.setBackend('webgl');
    } else {
      await tf.setBackend('cpu');
    }
    
    if (!model) {
      model = await use.load();
    }
    return model;
  } catch (error) {
    console.error('Failed to initialize TensorFlow.js:', error);
    return null;
  }
}

async function extractTextFromPDF(pdf: PDFDocumentProxy, maxPages: number = 5): Promise<string> {
  let text = '';
  const pagesToRead = Math.min(pdf.numPages, maxPages);
  
  for (let i = 1; i <= pagesToRead; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str)
      .join(' ');
    text += pageText + ' ';
  }
  
  return text.trim();
}

export async function analyzePDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    const text = await extractTextFromPDF(pdf);
    
    // Get document metadata
    const metadata = await pdf.getMetadata().catch(() => ({}));
    const title = metadata?.info?.Title || '';
    
    // Extract keywords and analyze content
    const keywords = await analyzeContent(text);
    const category = determineCategory(text);
    const documentType = determineDocumentType(text, title);
    
    // Use NLP techniques for better naming
    const importantPhrases = extractImportantPhrases(text);
    const topicModel = await performTopicModeling(text);
    
    return generateEnhancedName(keywords, category, documentType, importantPhrases, topicModel);
  } catch (error) {
    console.error('PDF analysis error:', error);
    return `document_${new Date().toISOString().split('T')[0]}`;
  }
}

async function analyzeContent(text: string): Promise<string[]> {
  if (!model) {
    return extractKeywords(text);
  }

  try {
    const embeddings = await model.embed([text]);
    const embeddingArray = await embeddings.array();
    
    // Use embeddings to find similar concepts
    const keywords = extractKeywords(text);
    const enhancedKeywords = await enhanceKeywordsWithEmbeddings(keywords, embeddingArray[0]);
    
    return enhancedKeywords;
  } catch (error) {
    console.error('Content analysis error:', error);
    return extractKeywords(text);
  }
}

async function enhanceKeywordsWithEmbeddings(keywords: string[], embedding: number[]): Promise<string[]> {
  // Implement semantic similarity using embeddings
  return keywords.slice(0, 5);
}

function extractKeywords(text: string): string[] {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3)
    .filter(word => !commonWords.includes(word));
  
  // Use TF-IDF scoring
  const wordFreq = words.reduce((acc: Record<string, number>, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});
  
  // Calculate IDF scores
  const documentCount = 1;
  const wordScores = Object.entries(wordFreq).map(([word, freq]) => ({
    word,
    score: freq * Math.log(documentCount / (wordFreq[word] || 1))
  }));
  
  return wordScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ word }) => word);
}

function extractImportantPhrases(text: string): string[] {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const phrases = sentences.flatMap(sentence => {
    const words = sentence.trim().split(/\s+/);
    return words.length <= 5 ? [sentence.trim()] : [];
  });
  
  return phrases
    .filter(phrase => !commonPhrases.includes(phrase.toLowerCase()))
    .slice(0, 3);
}

async function performTopicModeling(text: string): Promise<string[]> {
  // Simplified topic modeling using word co-occurrence
  const words = text.toLowerCase().split(/\s+/);
  const topics: Record<string, number> = {};
  
  for (let i = 0; i < words.length - 1; i++) {
    const pair = `${words[i]} ${words[i + 1]}`;
    topics[pair] = (topics[pair] || 0) + 1;
  }
  
  return Object.entries(topics)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([topic]) => topic);
}

function determineCategory(text: string): string {
  const categories = {
    technical: ['code', 'programming', 'software', 'data', 'algorithm', 'technical', 'documentation'],
    business: ['report', 'financial', 'marketing', 'strategy', 'business', 'proposal', 'budget'],
    academic: ['research', 'study', 'analysis', 'theory', 'methodology', 'experiment', 'hypothesis'],
    legal: ['contract', 'agreement', 'law', 'regulation', 'policy', 'compliance', 'terms'],
    medical: ['patient', 'clinical', 'medical', 'health', 'diagnosis', 'treatment', 'healthcare'],
    educational: ['course', 'lecture', 'lesson', 'student', 'education', 'learning', 'teaching'],
    creative: ['design', 'art', 'music', 'video', 'photo', 'creative', 'portfolio'],
    scientific: ['science', 'physics', 'chemistry', 'biology', 'mathematics', 'lab', 'experiment']
  };
  
  const textLower = text.toLowerCase();
  let maxScore = 0;
  let bestCategory = 'document';
  
  for (const [category, keywords] of Object.entries(categories)) {
    const score = keywords.reduce((acc, keyword) => {
      return acc + (textLower.includes(keyword) ? 1 : 0);
    }, 0);
    
    if (score > maxScore) {
      maxScore = score;
      bestCategory = category;
    }
  }
  
  return bestCategory;
}

function determineDocumentType(text: string, title: string): string {
  const documentTypes = {
    report: ['report', 'analysis', 'summary', 'review'],
    presentation: ['presentation', 'slides', 'deck'],
    manual: ['manual', 'guide', 'documentation', 'instructions'],
    proposal: ['proposal', 'pitch', 'plan'],
    form: ['form', 'application', 'questionnaire'],
    paper: ['paper', 'article', 'publication', 'journal'],
    thesis: ['thesis', 'dissertation', 'research'],
    contract: ['contract', 'agreement', 'terms'],
    invoice: ['invoice', 'bill', 'receipt'],
    resume: ['resume', 'cv', 'curriculum']
  };
  
  const content = (text + ' ' + title).toLowerCase();
  
  for (const [type, keywords] of Object.entries(documentTypes)) {
    if (keywords.some(keyword => content.includes(keyword))) {
      return type;
    }
  }
  
  return 'document';
}

function generateEnhancedName(
  keywords: string[],
  category: string,
  documentType: string,
  importantPhrases: string[],
  topics: string[]
): string {
  const date = new Date().toISOString().split('T')[0];
  const keywordPart = keywords.slice(0, 2).join('_');
  const topicPart = topics[0]?.replace(/\s+/g, '_') || '';
  
  let name = `${category}_${documentType}`;
  
  if (keywordPart) {
    name += `_${keywordPart}`;
  }
  
  if (topicPart) {
    name += `_${topicPart}`;
  }
  
  return `${name}_${date}`;
}

const commonWords = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what'
];

const commonPhrases = [
  'please find', 'attached document', 'best regards', 'thank you',
  'sincerely yours', 'to whom it may concern', 'dear sir', 'dear madam'
];