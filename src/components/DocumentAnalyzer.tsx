import React, { useState, useEffect } from 'react';
import { FileText, Loader2, X, Copy, Download, ChevronDown, ChevronUp, Brain, FileSearch } from 'lucide-react';
import { extractTextFromPDF, extractTextFromDocx, summarizeText } from '../utils/documentAnalyzer';
import toast from 'react-hot-toast';

interface DocumentAnalyzerProps {
  file: File;
  onClose: () => void;
}

export function DocumentAnalyzer({ file, onClose }: DocumentAnalyzerProps) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFullText, setShowFullText] = useState(false);
  const [fullText, setFullText] = useState<string | null>(null);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const analyzeDocument = async () => {
    setLoading(true);
    setError(null);

    try {
      let text = '';
      
      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        text = await extractTextFromDocx(file);
      } else {
        throw new Error('Unsupported file type');
      }

      if (!text) {
        throw new Error('No text could be extracted from the document');
      }

      setFullText(text);
      const generatedSummary = await summarizeText(text);
      setSummary(generatedSummary);
    } catch (err) {
      console.error('Document analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze document');
      toast.error('Failed to analyze document');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  useEffect(() => {
    analyzeDocument();
  }, [file]);

  // Format text into paragraphs
  const formatText = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4 last:mb-0">
        {paragraph.trim()}
      </p>
    ));
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center md:p-6">
      <div 
        className="relative flex flex-col w-full h-full md:h-auto md:max-h-[90vh] md:max-w-3xl bg-white md:rounded-2xl shadow-xl animate-fade-in overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                Document Analysis
              </h2>
              <p className="text-sm text-gray-500 mt-0.5 truncate max-w-[200px] sm:max-w-md">
                Analyzing: {file.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <p className="text-gray-600 animate-pulse">Analyzing document content...</p>
            </div>
          ) : error ? (
            <div className="p-4 sm:p-6">
              <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start space-x-3">
                <FileText className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Analysis Error</p>
                  <p className="mt-1 text-sm">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-6 space-y-6">
              {/* Summary Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <FileSearch className="w-5 h-5 mr-2 text-blue-600" />
                    Summary
                  </h3>
                  <button
                    onClick={() => summary && copyToClipboard(summary)}
                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center transition-colors duration-200"
                  >
                    <Copy className="w-4 h-4 mr-1.5" />
                    Copy Summary
                  </button>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 leading-relaxed text-gray-700">
                  {summary && formatText(summary)}
                </div>
              </div>

              {/* Full Text Section */}
              {fullText && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-600" />
                      Full Text
                    </h3>
                    <button
                      onClick={() => setShowFullText(!showFullText)}
                      className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center transition-colors duration-200"
                    >
                      {showFullText ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1.5" />
                          Hide Full Text
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1.5" />
                          Show Full Text
                        </>
                      )}
                    </button>
                  </div>
                  {showFullText && (
                    <div className="bg-gray-50 rounded-xl p-4 leading-relaxed text-gray-700 max-h-[40vh] overflow-y-auto overscroll-contain">
                      {formatText(fullText)}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer - Fixed */}
        <div className="border-t border-gray-100 p-4 sm:p-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500 order-2 sm:order-1">
              {!loading && !error && summary && 'Analysis completed successfully'}
            </div>
            <div className="flex w-full sm:w-auto justify-end space-x-3 order-1 sm:order-2">
              {fullText && (
                <button
                  onClick={() => fullText && copyToClipboard(fullText)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-all duration-200"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Full Text
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}