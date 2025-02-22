import React from 'react';
import { ArrowRight, Upload, Wand2, Download, Check } from 'lucide-react';

export function GetStarted() {
  const scrollToUpload = () => {
    const element = document.getElementById('upload');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Pricing & Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Free</h3>
            <p className="text-4xl font-bold text-purple-600 mb-6">$0</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Basic AI file renaming</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Up to 25 files/month</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Basic document analysis</span>
              </li>
            </ul>
            <button
              onClick={scrollToUpload}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200"
            >
              Get Started
            </button>
          </div>

          {/* Pro Plan (Coming Soon) */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
              Coming Soon
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro</h3>
            <p className="text-4xl font-bold text-purple-600 mb-6">$9.99</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Advanced AI models</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Unlimited files</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Priority support</span>
              </li>
            </ul>
            <button
              className="w-full px-6 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed"
              disabled
            >
              Coming Soon
            </button>
          </div>

          {/* Enterprise Plan (Coming Soon) */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
              Coming Soon
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
            <p className="text-4xl font-bold text-purple-600 mb-6">Custom</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Custom AI models</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>API access</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Dedicated support</span>
              </li>
            </ul>
            <button
              className="w-full px-6 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed"
              disabled
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}