import React from 'react';
import { FileItem } from '../types';
import { X, FileText, Image as ImageIcon } from 'lucide-react';

interface FilePreviewProps {
  file: FileItem;
  onClose: () => void;
}

export function FilePreview({ file, onClose }: FilePreviewProps) {
  const isImage = file.type.startsWith('image/');
  const isPDF = file.type === 'application/pdf';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">File Preview</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6">
          {isImage ? (
            <img
              src={URL.createObjectURL(file.file!)}
              alt={file.originalName}
              className="max-w-full max-h-[60vh] object-contain mx-auto"
            />
          ) : isPDF ? (
            <iframe
              src={URL.createObjectURL(file.file!)}
              className="w-full h-[60vh]"
              title={file.originalName}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-600">Preview not available for this file type</p>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{file.originalName}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}