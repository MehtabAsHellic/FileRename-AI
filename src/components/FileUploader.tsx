import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileType, AlertCircle } from 'lucide-react';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

export function FileUploader({ onFilesSelected, disabled }: FileUploaderProps) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    acceptedFiles,
    fileRejections
  } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    disabled,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.length) {
        onFilesSelected(acceptedFiles);
      }
    }
  });

  const style = useMemo(() => ({
    base: `w-full p-8 border-2 border-dashed rounded-xl text-center transition-all duration-200 ${
      disabled ? 'bg-gray-50 border-gray-300' : 'border-blue-300 hover:border-blue-400 hover:bg-blue-50 bg-white'
    }`,
    active: 'border-green-400 bg-green-50',
    reject: 'border-red-400 bg-red-50'
  }), [disabled]);

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`relative group ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} 
          ${isDragActive ? style.active : ''} 
          ${isDragReject ? style.reject : ''} 
          ${style.base}`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center
              ${isDragActive ? 'bg-green-100' : 'bg-blue-100'}
              ${isDragReject ? 'bg-red-100' : ''}`}
            >
              <Upload className={`w-8 h-8 
                ${isDragActive ? 'text-green-500' : 'text-blue-500'}
                ${isDragReject ? 'text-red-500' : ''}
                ${disabled ? 'text-gray-400' : ''}`}
              />
            </div>
            <FileType className="w-6 h-6 text-blue-500 absolute -right-1 -bottom-1" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-1">
              {disabled ? 'Processing files...' : (
                isDragActive ? (
                  isDragReject ? 
                    'Unsupported file type' :
                    'Drop files here...'
                ) : (
                  <>
                    <span className="text-blue-600">Click to upload</span> or drag and drop
                  </>
                )
              )}
            </h3>
            <p className="text-sm text-gray-500">
              Support for PDFs, images, documents, and videos
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {['PDF', 'DOC', 'DOCX', 'JPG', 'PNG', 'MP4'].map((format) => (
              <span
                key={format}
                className={`px-3 py-1.5 rounded-full text-xs font-medium
                  ${isDragActive ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}
                  ${isDragReject ? 'bg-red-100 text-red-700' : ''}
                  ${disabled ? 'bg-gray-100 text-gray-700' : ''}`}
              >
                {format}
              </span>
            ))}
          </div>
        </div>
      </div>

      {fileRejections.length > 0 && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">
            Some files were rejected. Please ensure they match the supported formats.
          </span>
        </div>
      )}
    </div>
  );
}