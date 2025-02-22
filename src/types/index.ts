export interface FileItem {
  id: string;
  originalName: string;
  newName: string | null;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  type: string;
  size: number;
  error?: string;
  file?: File;
  convertedFile?: File;
  convertedType?: string;
  preview?: string;
  history?: string[]; // Track name history for undo
  aiGenerated?: boolean; // Flag for AI-generated names
}

export interface RenamePattern {
  type: 'ai' | 'pattern';
  pattern?: string;
  previousType?: 'ai' | 'pattern'; // Track previous pattern type for undo
  previousPattern?: string; // Track previous pattern for undo
}

export interface ConversionOptions {
  targetFormat: string;
  quality?: number;
  preserveMetadata?: boolean;
}

export interface UserFiles {
  userId: string;
  files: FileItem[];
  createdAt: Date;
  updatedAt: Date;
}