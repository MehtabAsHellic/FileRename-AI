import React from 'react';
import { FileText } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-200">
          <FileText className="w-7 h-7 text-white" />
        </div>
        <div className="absolute -inset-1 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-xl blur opacity-30"></div>
      </div>
      <div className="relative">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
          FileRename AI
        </h1>
        <p className="text-xs text-gray-500 font-medium">AI-Powered File Organization</p>
      </div>
    </div>
  );
}