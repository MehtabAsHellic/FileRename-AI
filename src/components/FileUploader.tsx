import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileType, AlertCircle, FileUp, Sparkles } from 'lucide-react';

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
    base: `relative w-full p-8 border-2 border-dashed rounded-xl text-center transition-all duration-300 ${
      disabled ? 'bg-gray-50 border-gray-300 cursor-not-allowed' : 'border-blue-300 hover:border-blue-400 hover:bg-blue-50/30 bg-white'
    }`,
    active: 'border-green-400 bg-green-50/30',
    reject: 'border-red-400 bg-red-50/30'
  }), [disabled]);

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`group ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} 
          ${isDragActive ? style.active : ''} 
          ${isDragReject ? style.reject : ''} 
          ${style.base}`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Upload Icon with Animation */}
          <div className="relative transform transition-transform duration-300 group-hover:scale-110">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center
              ${isDragActive ? 'bg-green-100' : 'bg-blue-100'}
              ${isDragReject ? 'bg-red-100' : ''}
              ${disabled ? 'bg-gray-100' : ''}`}
            >
              <Upload className={`w-10 h-10 
                ${isDragActive ? 'text-green-500' : 'text-blue-500'}
                ${isDragReject ? 'text-red-500' : ''}
                ${disabled ? 'text-gray-400' : ''}`}
              />
            </div>
            <div className="absolute -right-2 -bottom-2">
              <div className={`p-2 rounded-lg 
                ${isDragActive ? 'bg-green-200' : 'bg-blue-200'}
                ${isDragReject ? 'bg-red-200' : ''}
                ${disabled ? 'bg-gray-200' : ''}`}
              >
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Upload Text */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
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
          
          {/* File Type Badges */}
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

        {/* Upload Progress Overlay */}
        {disabled && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-lg">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-600 font-medium">Processing files...</span>
            </div>
          </div>
        )}
      </div>

      {/* Error Messages */}
      {fileRejections.length > 0 && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">Some files were rejected</p>
            <ul className="text-sm mt-1 list-disc list-inside">
              {fileRejections.map(({ file, errors }) => (
                <li key={file.name}>
                  {file.name}: {errors[0].message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Upload Tips */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <div className="flex items-start space-x-3">
          <FileUp className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-gray-900">Pro Tips</h4>
            <ul className="mt-1 text-sm text-gray-500 space-y-1">
              <li>• Drag multiple files at once for batch processing</li>
              <li>• Files are processed locally for security</li>
              <li>• Maximum file size: 100MB per file</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}