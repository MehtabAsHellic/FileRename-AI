import React, { useState } from 'react';
import { FileText, Loader2, X, Download, Copy } from 'lucide-react';
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

  const copyToClipboard = async () => {
    if (summary) {
      try {
        await navigator.clipboard.writeText(summary);
        toast.success('Summary copied to clipboard');
      } catch (err) {
        toast.error('Failed to copy summary');
      }
    }
  };

  React.useEffect(() => {
    analyzeDocument();
  }, [file]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Document Analysis</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Analyzing: <span className="font-medium text-gray-900">{file.name}</span>
            </p>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-4" />
              <p className="text-gray-600">Analyzing document content...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
              <p>{error}</p>
            </div>
          )}

          {summary && !loading && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Summary</h4>
                <p className="text-gray-600 whitespace-pre-wrap">{summary}</p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Summary
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}