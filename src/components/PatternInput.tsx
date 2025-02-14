import React, { useState } from 'react';
import { RenamePattern } from '../types';
import { Wand2, FileType2, RefreshCw, Calendar, Hash, Tag, FileText, Type, Save, Plus, Trash2, HelpCircle } from 'lucide-react';

interface PatternInputProps {
  pattern: RenamePattern;
  onChange: (pattern: RenamePattern) => void;
  onApply: () => void;
  disabled?: boolean;
}

interface SavedPattern {
  id: string;
  name: string;
  pattern: string;
}

export function PatternInput({ pattern, onChange, onApply, disabled }: PatternInputProps) {
  const [savedPatterns, setSavedPatterns] = useState<SavedPattern[]>(() => {
    const saved = localStorage.getItem('savedPatterns');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newPatternName, setNewPatternName] = useState('');
  const [showAIInfo, setShowAIInfo] = useState(false);
  const [showPatternInfo, setShowPatternInfo] = useState(false);

  const tokens = [
    { token: '{date}', icon: Calendar, description: 'Current date (YYYY-MM-DD)' },
    { token: '{type}', icon: FileType2, description: 'File type (e.g., pdf, doc)' },
    { token: '{original}', icon: FileText, description: 'Original filename' },
    { token: '{counter}', icon: Hash, description: 'Sequential number' },
    { token: '{category}', icon: Tag, description: 'Detected document category' },
    { token: '{title}', icon: Type, description: 'Document title if available' }
  ];

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

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-md">
      <div className="flex space-x-4">
        <div className="flex-1">
          <div
            onClick={() => onChange({ type: 'ai' })}
            className={`p-6 rounded-xl border-2 transition-all duration-200 relative cursor-pointer
              ${pattern.type === 'ai'
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center justify-center mb-3">
              <Wand2 className="w-6 h-6 mr-2" />
              <h3 className="font-semibold">AI Renaming</h3>
            </div>
            <p className="text-sm text-gray-600">
              Smart file naming based on content analysis using advanced AI models
            </p>
            <div 
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowAIInfo(!showAIInfo);
              }}
            >
              <HelpCircle className="w-5 h-5" />
            </div>
            {showAIInfo && (
              <div className="absolute top-full mt-2 right-0 w-64 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <h4 className="font-medium text-gray-900 mb-2">AI Renaming</h4>
                <p className="text-sm text-gray-600">
                  Our AI analyzes your files' content to generate meaningful names automatically.
                  Works best with documents, images, and PDFs.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <div
            onClick={() => onChange({ type: 'pattern', pattern: '' })}
            className={`p-6 rounded-xl border-2 transition-all duration-200 relative cursor-pointer
              ${pattern.type === 'pattern'
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center justify-center mb-3">
              <FileType2 className="w-6 h-6 mr-2" />
              <h3 className="font-semibold">Custom Pattern</h3>
            </div>
            <p className="text-sm text-gray-600">
              Create your own naming pattern using dynamic tokens and custom rules
            </p>
            <div 
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowPatternInfo(!showPatternInfo);
              }}
            >
              <HelpCircle className="w-5 h-5" />
            </div>
            {showPatternInfo && (
              <div className="absolute top-full mt-2 right-0 w-64 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <h4 className="font-medium text-gray-900 mb-2">Custom Pattern</h4>
                <p className="text-sm text-gray-600">
                  Define your own naming format using tokens like {'{date}'}, {'{type}'}, etc.
                  Perfect for consistent file organization.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {pattern.type === 'pattern' && (
        <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
          <div className="flex space-x-2">
            <input
              type="text"
              value={pattern.pattern || ''}
              onChange={(e) => onChange({ type: 'pattern', pattern: e.target.value })}
              placeholder="e.g., {date}-{category}-{original}"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={disabled}
            />
            <button
              onClick={() => setShowSaveDialog(true)}
              disabled={disabled || !pattern.pattern}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Pattern
            </button>
            <button
              onClick={onApply}
              disabled={disabled || !pattern.pattern}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Apply Pattern
            </button>
          </div>

          {showSaveDialog && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Save Pattern</h4>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newPatternName}
                  onChange={(e) => setNewPatternName(e.target.value)}
                  placeholder="Pattern name"
                  className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                />
                <button
                  onClick={handleSavePattern}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowSaveDialog(false)}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          {savedPatterns.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Saved Patterns:</h4>
              <div className="grid grid-cols-2 gap-2">
                {savedPatterns.map((savedPattern) => (
                  <div
                    key={savedPattern.id}
                    className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200"
                  >
                    <div
                      onClick={() => onChange({ type: 'pattern', pattern: savedPattern.pattern })}
                      className="flex-1 cursor-pointer hover:text-blue-600"
                    >
                      <p className="text-sm font-medium">{savedPattern.name}</p>
                      <p className="text-xs text-gray-500">{savedPattern.pattern}</p>
                    </div>
                    <button
                      onClick={() => handleDeletePattern(savedPattern.id)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Available Tokens:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {tokens.map(({ token, icon: Icon, description }) => (
                <div
                  key={token}
                  onClick={() => onChange({ 
                    type: 'pattern', 
                    pattern: (pattern.pattern || '') + token 
                  })}
                  className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-blue-600 mr-2" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{token}</p>
                    <p className="text-xs text-gray-500">{description}</p>
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