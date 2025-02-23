import React, { useState } from 'react';
import { RenamePattern } from '../types';
import { 
  Wand2, FileType2, RefreshCw, Calendar, Hash, Tag, FileText, 
  Type, Save, Plus, Trash2, HelpCircle, Undo2, Brain, Settings,
  Info, CheckCircle
} from 'lucide-react';

interface PatternInputProps {
  pattern: RenamePattern;
  onChange: (pattern: RenamePattern) => void;
  onApply: () => void;
  onUndo: () => void;
  disabled?: boolean;
}

interface SavedPattern {
  id: string;
  name: string;
  pattern: string;
}

const tokens = [
  { token: '{date}', icon: Calendar, description: 'Current date (YYYY-MM-DD)' },
  { token: '{type}', icon: FileType2, description: 'File type (e.g., pdf, doc)' },
  { token: '{original}', icon: FileText, description: 'Original filename' },
  { token: '{counter}', icon: Hash, description: 'Sequential number' },
  { token: '{category}', icon: Tag, description: 'Detected document category' },
  { token: '{title}', icon: Type, description: 'Document title if available' }
];

export function PatternInput({ 
  pattern, 
  onChange, 
  onApply, 
  onUndo,
  disabled 
}: PatternInputProps) {
  const [savedPatterns, setSavedPatterns] = useState<SavedPattern[]>(() => {
    const saved = localStorage.getItem('savedPatterns');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newPatternName, setNewPatternName] = useState('');
  const [showAIInfo, setShowAIInfo] = useState(false);
  const [showPatternInfo, setShowPatternInfo] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'pattern'>(pattern.type);

  const handleSavePattern = () => {
    if (!newPatternName || !pattern.pattern) return;

    const newPattern: SavedPattern = {
      id: Date.now().toString(),
      name: newPatternName,
      pattern: pattern.pattern
    };

    const updatedPatterns = [...savedPatterns, newPattern];
    setSavedPatterns(updatedPatterns);
    localStorage.setItem('savedPatterns', JSON.stringify(updatedPatterns));
    setShowSaveDialog(false);
    setNewPatternName('');
  };

  const handleDeletePattern = (id: string) => {
    const updatedPatterns = savedPatterns.filter(p => p.id !== id);
    setSavedPatterns(updatedPatterns);
    localStorage.setItem('savedPatterns', JSON.stringify(updatedPatterns));
  };

  const handleTabChange = (tab: 'ai' | 'pattern') => {
    setActiveTab(tab);
    onChange({ type: tab, pattern: tab === 'pattern' ? '' : undefined });
  };

  return (
    <div className="space-y-6">
      {/* Mode Selection Tabs */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-xl inline-flex">
          <button
            onClick={() => handleTabChange('ai')}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === 'ai'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Brain className="w-5 h-5 mr-2" />
            AI Renaming
          </button>
          <button
            onClick={() => handleTabChange('pattern')}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === 'pattern'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Settings className="w-5 h-5 mr-2" />
            Custom Pattern
          </button>
        </div>
      </div>

      {/* Mode Description */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">
              {activeTab === 'ai' ? 'AI-Powered Renaming' : 'Custom Pattern Renaming'}
            </h4>
            <p className="text-sm text-blue-700 mt-1">
              {activeTab === 'ai'
                ? 'Our AI analyzes your files to generate meaningful, context-aware names automatically.'
                : 'Create your own naming pattern using tokens to maintain consistent file organization.'}
            </p>
          </div>
        </div>
      </div>

      {activeTab === 'pattern' && (
        <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pattern
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={pattern.pattern || ''}
                  onChange={(e) => onChange({ type: 'pattern', pattern: e.target.value })}
                  placeholder="e.g., {date}-{category}-{original}"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  disabled={disabled}
                />
                {pattern.pattern && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:self-end">
              <button
                onClick={() => setShowSaveDialog(true)}
                disabled={disabled || !pattern.pattern}
                className="px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:shadow-md"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Pattern
              </button>
              <button
                onClick={onApply}
                disabled={disabled || !pattern.pattern}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:shadow-md"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Apply Pattern
              </button>
              {pattern.previousType && (
                <button
                  onClick={onUndo}
                  className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:shadow-md"
                >
                  <Undo2 className="w-4 h-4 mr-2" />
                  Undo Changes
                </button>
              )}
            </div>
          </div>

          {/* Save Pattern Dialog */}
          {showSaveDialog && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Save Pattern</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newPatternName}
                  onChange={(e) => setNewPatternName(e.target.value)}
                  placeholder="Pattern name"
                  className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSavePattern}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-all duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowSaveDialog(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Saved Patterns */}
          {savedPatterns.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Saved Patterns</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedPatterns.map((savedPattern) => (
                  <div
                    key={savedPattern.id}
                    className="group bg-white rounded-lg border border-gray-200 p-3 hover:border-blue-300 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div
                        onClick={() => onChange({ type: 'pattern', pattern: savedPattern.pattern })}
                        className="flex-1 cursor-pointer"
                      >
                        <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                          {savedPattern.name}
                        </p>
                        <p className="text-sm text-gray-500 break-all mt-1">
                          {savedPattern.pattern}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeletePattern(savedPattern.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Available Tokens */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Available Tokens</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {tokens.map(({ token, icon: Icon, description }) => (
                <div
                  key={token}
                  onClick={() => onChange({ 
                    type: 'pattern', 
                    pattern: (pattern.pattern || '') + token 
                  })}
                  className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer group"
                >
                  <Icon className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                      {token}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}