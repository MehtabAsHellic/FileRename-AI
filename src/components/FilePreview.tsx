import React, { useState, useEffect, memo } from 'react';
import { FileItem } from '../types';
import { X, FileText, Download, ExternalLink } from 'lucide-react';

interface FilePreviewProps {
  file: FileItem;
  onClose: () => void;
}

export const FilePreview = memo(function FilePreview({ file, onClose }: FilePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

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
  const isDocument = file.type.includes('document') || isPDF;

  const handleDownload = () => {
    if (previewUrl) {
      const a = document.createElement('a');
      a.href = previewUrl;
      a.download = file.originalName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const openInNewTab = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  };

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
          ) : isDocument && previewUrl ? (
            isMobile ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <FileText className="w-16 h-16 text-gray-400" />
                <p className="text-gray-600 text-center">
                  Document preview is not available on mobile devices.
                  <br />
                  Please use one of the options below:
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={openInNewTab}
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in Browser
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            ) : (
              <iframe
                src={previewUrl}
                className="w-full h-[60vh]"
                title={file.originalName}
              />
            )
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
            {!isMobile && isDocument && (
              <div className="flex gap-2">
                <button
                  onClick={openInNewTab}
                  className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in New Tab
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});