import React from 'react';
import { Logo } from './Logo';
import { Github, Twitter, Linkedin, Mail, Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-400 text-sm">
              Intelligent file organization powered by AI. Transform your workflow with smart, automated file renaming.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/MehtabAsHellic/FileRename-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 group"
                title="View on GitHub"
              >
                <Github className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-200" />
              </a>
              <a 
                href="mailto:contact@filerename.ai"
                className="text-gray-400 hover:text-white transition-colors duration-200 group"
                title="Contact us"
              >
                <Mail className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-200" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('overview')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                >
                  About
                  <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('upload')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                >
                  Try Now
                  <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                >
                  FAQ
                  <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                </button>
              </li>
              <li>
                <a 
                  href="https://github.com/MehtabAsHellic/FileRename-AI#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                >
                  Documentation
                  <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('overview')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                >
                  Features
                  <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('technology')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                >
                  Technology
                  <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('roadmap')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                >
                  Roadmap
                  <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                </button>
              </li>
              <li>
                <a 
                  href="https://github.com/MehtabAsHellic/FileRename-AI/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                >
                  Support
                  <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/MehtabAsHellic/FileRename-AI/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                >
                  License
                  <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/MehtabAsHellic/FileRename-AI/blob/main/PRIVACY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                >
                  Privacy Policy
                  <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/MehtabAsHellic/FileRename-AI/blob/main/TERMS.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                >
                  Terms of Service
                  <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} FileRename AI. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0 space-x-2">
              <span className="text-gray-400 text-sm">Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-gray-400 text-sm">by</span>
              <a
                href="https://github.com/MehtabAsHellic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
              >
                Mehtab
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}