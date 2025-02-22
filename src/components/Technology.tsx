import React from 'react';
import { Brain, FileText, Wand2, ArrowRight } from 'lucide-react';

export function Technology() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How Does It Work?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our advanced AI technology powers intelligent file analysis and organization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* AI Technology Overview */}
          <div className="space-y-8">
            <div className="bg-purple-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Content Extraction
              </h3>
              <p className="text-gray-600">
                Our platform uses advanced libraries to extract text and metadata from 
                various document formats, including PDFs, Word documents, and images.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Intelligent Analysis
              </h3>
              <p className="text-gray-600">
                State-of-the-art AI models analyze content for key information, 
                context, and meaning to generate smart file names.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Wand2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Automatic Renaming
              </h3>
              <p className="text-gray-600">
                Based on the analysis, our system generates descriptive, meaningful 
                names that make sense for your files.
              </p>
            </div>
          </div>

          {/* Pattern System */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              Custom Pattern System
            </h3>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <ArrowRight className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-gray-900">Available Tokens</h4>
                </div>
                <div className="space-y-4">
                  <div className="text-sm">
                    <code className="bg-gray-100 px-2 py-1 rounded text-purple-600">
                      {'{date}'}
                    </code>
                    <p className="mt-1 text-gray-600">Current date (YYYY-MM-DD)</p>
                  </div>
                  <div className="text-sm">
                    <code className="bg-gray-100 px-2 py-1 rounded text-purple-600">
                      {'{type}'}
                    </code>
                    <p className="mt-1 text-gray-600">File type (e.g., pdf, doc)</p>
                  </div>
                  <div className="text-sm">
                    <code className="bg-gray-100 px-2 py-1 rounded text-purple-600">
                      {'{category}'}
                    </code>
                    <p className="mt-1 text-gray-600">Detected document category</p>
                  </div>
                  <div className="text-sm">
                    <code className="bg-gray-100 px-2 py-1 rounded text-purple-600">
                      {'{title}'}
                    </code>
                    <p className="mt-1 text-gray-600">Document title if available</p>
                  </div>
                  <div className="text-sm">
                    <code className="bg-gray-100 px-2 py-1 rounded text-purple-600">
                      {'{original}'}
                    </code>
                    <p className="mt-1 text-gray-600">Original filename</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <ArrowRight className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-gray-900">Example Patterns</h4>
                </div>
                <div className="space-y-3">
                  <div className="text-sm">
                    <code className="bg-gray-100 px-2 py-1 rounded text-purple-600">
                      {'{date}'}_{'{category}'}_{'{title}'}
                    </code>
                    <p className="mt-1 text-gray-600">2025-03-15_invoice_march_payment</p>
                  </div>
                  <div className="text-sm">
                    <code className="bg-gray-100 px-2 py-1 rounded text-purple-600">
                      {'{type}'}_{'{counter}'}_{'{original}'}
                    </code>
                    <p className="mt-1 text-gray-600">pdf_001_document</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-600 text-white rounded-lg p-6">
                <h4 className="font-semibold mb-2">Pro Tip</h4>
                <p className="text-sm">
                  Combine multiple tokens to create powerful naming conventions that work 
                  perfectly for your specific needs. Patterns can be saved and reused 
                  across your team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}