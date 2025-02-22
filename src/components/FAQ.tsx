import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Is FileRename-AI free to use?',
    answer: 'Yes, we offer a robust free tier with essential features including AI-powered renaming, basic document analysis, and custom patterns. Premium features are available for power users and teams.'
  },
  {
    question: 'How secure is my data?',
    answer: 'We take security seriously. Files are processed locally in your browser when possible, and any cloud processing is done through encrypted connections. We don\'t store your files longer than necessary for processing.'
  },
  {
    question: 'What file types are supported?',
    answer: 'We support a wide range of file types including PDF, DOCX, JPG, PNG, and more. Our AI can analyze text documents, images, and even some video formats for intelligent naming.'
  },
  {
    question: 'Can I customize naming patterns?',
    answer: 'Absolutely! Create custom patterns using tokens like {date}, {type}, {category}, and more. Save your patterns for reuse and share them with your team.'
  },
  {
    question: 'How does the AI naming work?',
    answer: 'Our AI analyzes file content using advanced machine learning models to understand context, extract key information, and generate meaningful names. It considers factors like document type, content, and metadata.'
  },
  {
    question: 'Can I use it for batch processing?',
    answer: 'Yes! Process multiple files simultaneously with our efficient batch processing system. Apply the same naming pattern or let AI analyze each file individually.'
  },
  {
    question: 'Is there a limit to file size?',
    answer: 'Free tier supports files up to 25MB. Premium users can process larger files up to 100MB. For special cases, contact our support team.'
  },
  {
    question: 'Do you offer team features?',
    answer: 'Yes, our team features include shared workspaces, pattern libraries, and collaboration tools. Perfect for maintaining consistent naming conventions across your organization.'
  }
];

export function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="py-20 bg-gray-50" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about FileRename-AI
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left px-6 py-4 focus:outline-none"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  {openItems.has(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>
              
              <div
                className={`px-6 overflow-hidden transition-all duration-200 ease-in-out ${
                  openItems.has(index) ? 'max-h-48 pb-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Still have questions?{' '}
            <a
              href="#contact"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}