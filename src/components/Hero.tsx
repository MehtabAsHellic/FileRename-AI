import React from 'react';
import { FileText, Wand2, Lock, Users, Zap, Brain, FileSearch, Download, ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-50 via-blue-50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="text-center space-y-8">
          {/* Beta Version Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-lg">
              Beta Version 1.4
            </span>
          </div>

          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 mb-4">
            <Wand2 className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">AI-Powered File Organization</span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Discover the Power of
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Intelligent File Management</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform chaos into clarity. With our AI-driven file renaming, document analysis, and custom organization, 
            managing your digital assets has never been easier.
          </p>

          <div className="flex justify-center space-x-4 pt-6">
            <button 
              onClick={() => scrollToSection('upload')}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started
            </button>
            <button 
              onClick={() => scrollToSection('overview')}
              className="px-8 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">AI-Powered Analysis</h3>
            <p className="text-gray-600">Smart content analysis for meaningful, context-aware file names</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <FileSearch className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Smart Organization</h3>
            <p className="text-gray-600">Automatically categorize and structure your files</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Lightning Fast</h3>
            <p className="text-gray-600">Process multiple files simultaneously with speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}