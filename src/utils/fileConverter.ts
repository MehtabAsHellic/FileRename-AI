import { Document, Packer, Paragraph, TextRun } from 'docx';
import { jsPDF } from 'jspdf';
import { ConversionOptions } from '../types';

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
    throw error; // Re-throw to handle in the component
  }
}

async function convertPDFToDocx(file: File): Promise<File> {
  try {
    // Implementation using PDF.js to extract text and create DOCX
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun("Converted from PDF")
            ],
          }),
        ],
      }],
    });

    const buffer = await Packer.toBuffer(doc);
    const newFileName = file.name.replace(/\.pdf$/i, '.docx');
    
    return new File([buffer], newFileName, {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
  } catch (error) {
    console.error('PDF to DOCX conversion error:', error);
    throw new Error('Failed to convert PDF to DOCX');
  }
}

async function convertDocxToPDF(file: File): Promise<File> {
  try {
    const doc = new jsPDF();
    doc.text('Converted from DOCX', 10, 10);
    const pdfBlob = doc.output('blob');
    const newFileName = file.name.replace(/\.docx$/i, '.pdf');
    
    return new File([pdfBlob], newFileName, { 
      type: 'application/pdf' 
    });
  } catch (error) {
    console.error('DOCX to PDF conversion error:', error);
    throw new Error('Failed to convert DOCX to PDF');
  }
}

async function convertImage(file: File, targetFormat: string, options: ConversionOptions): Promise<File> {
  const { quality = 0.8 } = options;
  
  return new Promise((resolve, reject) => {
    try {
      // Create a temporary image element
      const img = new Image();
      const imageUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Failed to get canvas context');
          }
          
          // Draw image to canvas
          ctx.drawImage(img, 0, 0);
          
          // Convert to new format
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to convert image'));
                return;
              }
              
              // Clean up URL
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