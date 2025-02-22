import React from 'react';
import { FileText, Brain, Wand2, RefreshCw, Settings, Users } from 'lucide-react';

export function Overview() {
  return (
    <section className="py-20 bg-white" id="overview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What is FileRename-AI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our mission is to simplify file management, enabling you to focus on what matters most. 
            Whether you're a professional, creative, or part of a dynamic team, our technology transforms 
            clutter into organized, actionable insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Core Features */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">AI-Powered Renaming</h3>
            <p className="text-gray-600">
              Advanced algorithms analyze your files' content to generate meaningful, 
              context-aware names automatically.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Document Preview</h3>
            <p className="text-gray-600">
              Instantly preview and summarize documents without opening them. 
              Get quick insights into your files' content.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Wand2 className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Custom Patterns</h3>
            <p className="text-gray-600">
              Create your own naming patterns using dynamic tokens. Perfect for 
              maintaining consistent file organization.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <RefreshCw className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Format Conversion</h3>
            <p className="text-gray-600">
              Seamlessly convert between different file formats while maintaining 
              quality and metadata.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Batch Processing</h3>
            <p className="text-gray-600">
              Process multiple files simultaneously with our efficient batch 
              processing system.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Team Collaboration</h3>
            <p className="text-gray-600">
              Share organized files and naming patterns with your team for 
              consistent file management.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-lg">
              We're building the future of intelligent file management, where AI and human creativity 
              work together to keep your digital workspace organized and efficient.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}