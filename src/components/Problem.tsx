import React from 'react';
import { Clock, Search, AlertTriangle, CheckCircle, X } from 'lucide-react';

export function Problem() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The Challenge of Digital Clutter
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            In today's digital world, managing files effectively is crucial. Yet many organizations 
            struggle with disorganized documents, leading to wasted time and missed opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Problems */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Challenges</h3>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Time Waste</h4>
                <p className="text-gray-600">
                  Hours lost searching through poorly named files and navigating 
                  disorganized folders.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Search className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Lost Documents</h4>
                <p className="text-gray-600">
                  Critical files become difficult to locate due to cryptic names 
                  and inconsistent organization.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Workflow Disruption</h4>
                <p className="text-gray-600">
                  Inefficient file management leads to missed deadlines and 
                  frustrated team members.
                </p>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Solution</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Automated Organization
                  </h4>
                  <p className="text-gray-600">
                    AI-powered file analysis and renaming that works instantly.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Smart Search
                  </h4>
                  <p className="text-gray-600">
                    Find any file instantly with intelligent naming and categorization.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Team Efficiency
                  </h4>
                  <p className="text-gray-600">
                    Standardized naming conventions that everyone can follow.
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                The Impact
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-600">85%</div>
                  <div className="text-sm text-gray-600">Time Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">99%</div>
                  <div className="text-sm text-gray-600">File Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600">50%</div>
                  <div className="text-sm text-gray-600">Faster Workflows</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}