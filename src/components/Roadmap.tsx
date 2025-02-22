import React from 'react';
import { 
  Map, 
  Globe, 
  Share2, 
  Smartphone,
  Sparkles,
  BrainCircuit,
  Network,
  CloudCog
} from 'lucide-react';

export function Roadmap() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Looking Ahead</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our vision for the future of FileRename-AI includes powerful new features 
            and capabilities.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500"></div>

          <div className="space-y-24">
            {/* Q2 2025 */}
            <div className="relative">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full">
                  Q2 2025
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-purple-50 rounded-xl p-6 transform hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Map className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Advanced Document Visualization
                  </h3>
                  <p className="text-gray-600">
                    Interactive mind maps and flow charts for visual document organization 
                    and relationship mapping.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 transform hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <BrainCircuit className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Enhanced AI Models
                  </h3>
                  <p className="text-gray-600">
                    Next-generation AI models for even more accurate content analysis 
                    and smarter naming suggestions.
                  </p>
                </div>
              </div>
            </div>

            {/* Q3 2025 */}
            <div className="relative">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full">
                  Q3 2025
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-green-50 rounded-xl p-6 transform hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Network className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Team Collaboration 2.0
                  </h3>
                  <p className="text-gray-600">
                    Enhanced shared workspaces with real-time collaboration and 
                    version control features.
                  </p>
                </div>

                <div className="bg-indigo-50 rounded-xl p-6 transform hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Multi-Language Support
                  </h3>
                  <p className="text-gray-600">
                    Full support for document analysis and naming in multiple languages.
                  </p>
                </div>
              </div>
            </div>

            {/* Q4 2025 */}
            <div className="relative">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full">
                  Q4 2025
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-pink-50 rounded-xl p-6 transform hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Mobile App Launch
                  </h3>
                  <p className="text-gray-600">
                    Native mobile applications for iOS and Android with camera 
                    integration and offline capabilities.
                  </p>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 transform hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <CloudCog className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Enterprise Integration
                  </h3>
                  <p className="text-gray-600">
                    Seamless integration with popular cloud storage and enterprise 
                    management systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future Vision */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 shadow-xl">
            <Sparkles className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Our Future Vision</h3>
            <p className="text-lg max-w-2xl mx-auto">
              We're committed to pushing the boundaries of what's possible in file 
              management. Our goal is to create an intelligent ecosystem that makes 
              organizing digital assets effortless and intuitive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}