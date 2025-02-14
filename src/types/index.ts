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
}

export interface RenamePattern {
  type: 'ai' | 'pattern';
  pattern?: string;
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