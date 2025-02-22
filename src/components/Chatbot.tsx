import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, User, ArrowRight } from 'lucide-react';
import { getChatResponse } from '../utils/gemini';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const suggestedPrompts = [
  {
    text: "How do I use AI renaming?",
    description: "Learn about the AI-powered file renaming feature"
  },
  {
    text: "What file types are supported?",
    description: "See which file formats work with our platform"
  },
  {
    text: "How do custom patterns work?",
    description: "Understand pattern-based file renaming"
  },
  {
    text: "Can I batch rename files?",
    description: "Learn about processing multiple files at once"
  }
];

const welcomeMessage: Message = {
  id: 'welcome',
  text: "👋 Hi there! I'm your FileRename AI assistant. I can help you with:\n\n" +
        "→ Understanding how to use the platform\n" +
        "→ File renaming features and best practices\n" +
        "→ Custom patterns and AI capabilities\n" +
        "→ Technical support and troubleshooting\n\n" +
        "How can I assist you today?",
  sender: 'bot',
  timestamp: new Date()
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatResponse = (text: string): string => {
    let formattedText = text.replace(/\n\n/g, '\n');
    formattedText = formattedText.replace(/•/g, '→');
    formattedText = formattedText.replace(/\./g, '.\n');
    return formattedText.trim();
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const response = await getChatResponse(text);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: formatResponse(response),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputMessage);
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-2xl transition-all duration-300 
        ${isMinimized ? 'w-72 h-14' : 'w-[calc(100vw-2rem)] md:w-[400px] h-[80vh] md:h-[600px]'}
        fixed bottom-8 right-4 md:right-8 z-50`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Bot className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></span>
          </div>
          <h3 className="font-semibold">FileRename AI Assistant</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4" />
            ) : (
              <Minimize2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto h-[calc(100%-8rem)] bg-gradient-to-b from-gray-50 to-white"
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  } animate-fade-in`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                        : 'bg-white shadow-md border border-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="p-1.5 bg-white/10 rounded-full">
                        {message.sender === 'user' ? (
                          <User className="w-3 h-3" />
                        ) : (
                          <Bot className="w-3 h-3" />
                        )}
                      </div>
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              
              {showSuggestions && (
                <div className="grid grid-cols-1 gap-2 mt-6 animate-fade-in">
                  {suggestedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(prompt.text)}
                      className="group text-left p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm text-gray-900 group-hover:text-indigo-700">
                            {prompt.text}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 group-hover:text-indigo-500">
                            {prompt.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t p-4 bg-white rounded-b-lg">
            <div className="flex items-center space-x-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none max-h-32 text-sm"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={isLoading || !inputMessage.trim()}
                className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}