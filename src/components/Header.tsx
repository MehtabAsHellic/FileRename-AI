import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { Github, LogIn, LogOut, Loader2, Brain, Sparkles, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface AIModel {
  name: string;
  key: string;
  available: boolean;
  description: string;
}

const aiModels: AIModel[] = [
  {
    name: 'Gemini',
    key: 'AIzaSyBto8Eay1-aqUDSzsZ2yrttTTGbYZJsAQY',
    available: true,
    description: 'Google\'s latest AI model with advanced capabilities'
  },
  {
    name: 'GPT-4',
    key: 'gpt4',
    available: false,
    description: 'OpenAI\'s most advanced language model'
  },
  {
    name: 'Claude 2',
    key: 'claude2',
    available: false,
    description: 'Anthropic\'s constitutional AI model'
  },
  {
    name: 'Deepseek',
    key: 'deepseek',
    available: false,
    description: 'Specialized model for technical content'
  }
];

export function Header() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const [selectedModel, setSelectedModel] = useState<AIModel>(aiModels[0]);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowModelDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAuth = async () => {
    try {
      toast.info('Google Sign-in will be available in the next update!', {
        duration: 4000,
        icon: '🚧'
      });
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const handleModelSelect = (model: AIModel) => {
    if (!model.available) {
      toast.info(`${model.name} will be available soon. Stay tuned!`, {
        icon: '🚧'
      });
      return;
    }
    setSelectedModel(model);
    setShowModelDropdown(false);
    setShowMobileMenu(false); // Close mobile menu when selecting a model
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {showMobileMenu ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg hover:from-purple-100 hover:to-blue-100 transition-all duration-200"
              >
                <Brain className="w-4 h-4 text-purple-600" />
                <span className="text-gray-700">{selectedModel.name}</span>
                {selectedModel.available && (
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                )}
              </button>

              {showModelDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50">
                  {aiModels.map((model) => (
                    <button
                      key={model.key}
                      onClick={() => handleModelSelect(model)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200 ${
                        !model.available ? 'opacity-60 cursor-not-allowed' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900">{model.name}</span>
                            {!model.available && (
                              <span className="ml-2">
                                <Sparkles className="w-4 h-4 text-purple-400" />
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{model.description}</p>
                        </div>
                        {model.available && (
                          <span className="flex h-2 w-2">
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://github.com/MehtabAsHellic/FileRename-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </a>

            <button
              onClick={handleAuth}
              disabled={loading}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
                ${user 
                  ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : user ? (
                <>
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In with Google</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden fixed inset-x-0 top-16 bg-white border-t border-gray-200 shadow-lg transform transition-transform duration-200 ease-in-out ${
            showMobileMenu ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="px-4 py-3 space-y-3">
            <div className="relative">
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center justify-between w-full px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-700">{selectedModel.name}</span>
                </div>
                {selectedModel.available && (
                  <span className="flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                )}
              </button>

              {showModelDropdown && (
                <div className="mt-2 w-full bg-white rounded-lg shadow-lg">
                  {aiModels.map((model) => (
                    <button
                      key={model.key}
                      onClick={() => handleModelSelect(model)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900">{model.name}</span>
                            {!model.available && (
                              <span className="ml-2">
                                <Sparkles className="w-4 h-4 text-purple-400" />
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{model.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://github.com/MehtabAsHellic/FileRename-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}