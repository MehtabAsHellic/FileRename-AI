import { Document, Packer, Paragraph, TextRun } from 'docx';
import { jsPDF } from 'jspdf';
import { ConversionOptions } from '../types';
import { PDFDocument } from 'pdf-lib';
import { getDocument } from 'pdfjs-dist';

export async function convertFile(file: File, options: ConversionOptions): Promise<File | null> {
  try {
    const { targetFormat } = options;
    
    if (!file || !targetFormat) {
      throw new Error('Invalid file or target format');
    }

    // PDF to DOCX conversion
    if (file.type === 'application/pdf' && targetFormat === 'docx') {
      return await convertPDFToDocx(file);
    }
    
    // DOCX to PDF conversion
    if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && targetFormat === 'pdf') {
      return await convertDocxToPDF(file);
    }
    
    // Image conversions
    if (file.type.startsWith('image/')) {
      return await convertImage(file, targetFormat, options);
    }
    
    throw new Error(`Unsupported conversion from ${file.type} to ${targetFormat}`);
  } catch (error) {
    console.error('Conversion error:', error);
    throw error;
  }
}

async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw error;
  }
}

async function convertPDFToDocx(file: File): Promise<File> {
  try {
    // Extract text from PDF
    const text = await extractTextFromPDF(file);

    // Create a new Word document
    const doc = new Document({
      sections: [{
        properties: {},
        children: text.split('\n\n').map(paragraph => 
          new Paragraph({
            children: [
              new TextRun({
                text: paragraph.trim(),
                size: 24 // 12pt font
              })
            ],
            spacing: {
              after: 200 // Add space after each paragraph
            }
          })
        )
      }]
    });

    // Generate buffer
    const buffer = await Packer.toBuffer(doc);
    
    // Create new file
    const newFileName = file.name.replace(/\.pdf$/i, '.docx');
    return new File([buffer], newFileName, {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
  } catch (error) {
    console.error('PDF to DOCX conversion error:', error);
    throw new Error('Failed to convert PDF to DOCX. Please try again.');
  }
}

async function convertDocxToPDF(file: File): Promise<File> {
  try {
    // Create a new PDF document
    const doc = new jsPDF();
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    
    // Get text content from DOCX (simplified)
    const text = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsText(file);
    });

    // Add text to PDF
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(text, 180);
    doc.text(splitText, 15, 15);

    // Generate PDF blob
    const pdfBlob = doc.output('blob');
    const newFileName = file.name.replace(/\.docx$/i, '.pdf');
    
    return new File([pdfBlob], newFileName, { 
      type: 'application/pdf' 
    });
  } catch (error) {
    console.error('DOCX to PDF conversion error:', error);
    throw new Error('Failed to convert DOCX to PDF. Please try again.');
  }
}

async function convertImage(file: File, targetFormat: string, options: ConversionOptions): Promise<File> {
  const { quality = 0.8 } = options;
  
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      const imageUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            throw new Error('Failed to get canvas context');
          }

          // Set canvas dimensions
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Draw image with white background for PNG/WEBP
          if (targetFormat === 'png' || targetFormat === 'webp') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          
          // Draw image
          ctx.drawImage(img, 0, 0);
          
          // Convert to new format
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to convert image'));
                return;
              }
              
              // Clean up
              URL.revokeObjectURL(imageUrl);
              
              const newFileName = file.name.replace(/\.[^/.]+$/, `.${targetFormat}`);
              const convertedFile = new File([blob], newFileName, { 
                type: `image/${targetFormat}` 
              });
              
              resolve(convertedFile);
            },
            `image/${targetFormat}`,
            quality
          );
        } catch (error) {
          URL.revokeObjectURL(imageUrl);
          reject(error);
        }
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(imageUrl);
        reject(new Error('Failed to load image'));
      };
      
      img.src = imageUrl;
    } catch (error) {
      reject(error);
    }
  });
}

export function getSupportedConversions(fileType: string): string[] {
  const conversions: Record<string, string[]> = {
    'application/pdf': ['docx'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['pdf'],
    'image/jpeg': ['png', 'webp'],
    'image/png': ['jpeg', 'webp'],
    'image/webp': ['jpeg', 'png']
  };
  
  return conversions[fileType] || [];
}

export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

export function getMimeType(extension: string): string {
  const mimeTypes: Record<string, string> = {
    'pdf': 'application/pdf',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp'
  };
  
  return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
}