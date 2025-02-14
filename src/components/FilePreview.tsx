import React, { useState, useEffect, memo } from 'react';
import { FileItem } from '../types';
import { X, FileText, Image as ImageIcon } from 'lucide-react';

interface FilePreviewProps {
  file: FileItem;
  onClose: () => void;
}

export const FilePreview = memo(function FilePreview({ file, onClose }: FilePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const generatePreview = async () => {
      if (!file.file) return;

      try {
        setIsLoading(true);
        const url = URL.createObjectURL(file.file);
        
        if (isMounted) {
          setPreviewUrl(url);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Preview generation error:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    generatePreview();

    return () => {
      isMounted = false;
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [file.file]);

  const isImage = file.type.startsWith('image/');
  const isPDF = file.type === 'application/pdf';

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-sm text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

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
          {isImage && previewUrl ? (
            <img
              src={previewUrl}
              alt={file.originalName}
              className="max-w-full max-h-[60vh] object-contain mx-auto"
              loading="lazy"
            />
          ) : isPDF && previewUrl ? (
            <iframe
              src={previewUrl}
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
});