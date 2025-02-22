import React from 'react';
import { Users, Camera, GraduationCap, Building2, ArrowRight } from 'lucide-react';

export function UseCases() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Who Benefits from FileRename-AI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our intelligent file management solution helps various professionals and teams 
            work more efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Professional Teams */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Professional Teams
            </h3>
            <p className="text-gray-600 mb-4">
              Streamline document management and improve collaboration with 
              consistent file naming.
            </p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-blue-500 mr-2" />
                Standardized naming conventions
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-blue-500 mr-2" />
                Easy file sharing
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-blue-500 mr-2" />
                Version control
              </li>
            </ul>
          </div>

          {/* Photographers & Creatives */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Photographers & Creatives
            </h3>
            <p className="text-gray-600 mb-4">
              Organize your portfolio and creative assets with intelligent 
              categorization.
            </p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-purple-500 mr-2" />
                Smart image organization
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-purple-500 mr-2" />
                Metadata preservation
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-purple-500 mr-2" />
                Batch processing
              </li>
            </ul>
          </div>

          {/* Researchers & Students */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Researchers & Students
            </h3>
            <p className="text-gray-600 mb-4">
              Keep your research papers and study materials organized and 
              easily accessible.
            </p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-green-500 mr-2" />
                Document summarization
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-green-500 mr-2" />
                Quick reference system
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-green-500 mr-2" />
                Citation management
              </li>
            </ul>
          </div>

          {/* Small Businesses */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Small Businesses
            </h3>
            <p className="text-gray-600 mb-4">
              Maintain a professional, searchable repository of business 
              documents and records.
            </p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-orange-500 mr-2" />
                Invoice organization
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-orange-500 mr-2" />
                Contract management
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-orange-500 mr-2" />
                Compliance tracking
              </li>
            </ul>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900">Success Stories</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  alt="Sarah Johnson"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-600">
                "FileRename-AI has transformed how we manage our marketing assets. 
                What used to take hours now happens automatically."
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5"
                  alt="Michael Chen"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Michael Chen</h4>
                  <p className="text-sm text-gray-600">Research Analyst</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The AI-powered analysis and organization has made managing research 
                papers incredibly efficient. A game-changer for academics."
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                  alt="Emily Rodriguez"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Emily Rodriguez</h4>
                  <p className="text-sm text-gray-600">Freelance Designer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Managing client projects is so much easier now. The automatic 
                organization saves me hours every week."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}