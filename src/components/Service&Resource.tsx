'use client';
import { useState } from 'react';
import {
  BookOpen,
  Code,
  MessageCircle,
  FileQuestion,
  FileText,
  Youtube,
  Github,
  ChevronRight,
  ExternalLink,
  Search,
  HelpCircle,
  Database,
  Shield,
  ServerOff,
  Lock,
  PieChart,
  FileDigit,
  RefreshCw,
} from 'lucide-react';

export default function SupportResources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('documentation');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index: any) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // FAQs data
  const faqs = [
    {
      question: 'How is my health data kept private?',
      answer:
        'The Decentralized Healthcare Data Manager uses a local-first architecture that keeps all your health data stored exclusively on your device using IndexedDB. We implement the Web Crypto API for end-to-end encryption, ensuring that only you can access or decrypt your sensitive information. No data is ever sent to or stored on remote servers without your explicit consent.',
    },
    {
      question: 'Can I access my data across multiple devices?',
      answer:
        'Yes! While your data is stored locally for privacy, you can generate encrypted synchronization links or QR codes to securely transfer your data between your devices. Additionally, you can export your encrypted data to your personal cloud storage (Google Drive, Dropbox, etc.) and import it on other devices.',
    },
    {
      question: 'What health data formats are supported for import?',
      answer:
        'Our application supports standard healthcare formats including FHIR (Fast Healthcare Interoperability Resources), HL7 (Health Level 7), CCD (Continuity of Care Document), and CSV files from common health trackers. Our AI-assisted import tool helps users unfamiliar with these formats to map their data correctly.',
    },
    {
      question: 'How can I share my health data with my doctor?',
      answer:
        'You can securely share your health data with healthcare providers in multiple ways: generate a temporary access QR code containing selected information, create a password-protected PDF summary, or use our secure share link feature that grants limited-time access to specific portions of your data that you choose to share.',
    },
    {
      question: 'Does the app work offline?',
      answer:
        'Absolutely! As a Progressive Web App (PWA), the Decentralized Healthcare Data Manager functions fully offline. All core features including data visualization, analysis, and medication tracking work without an internet connection. The app uses Service Workers to cache necessary resources and synchronizes any pending operations when connectivity is restored.',
    },
    {
      question: 'How accurate are the AI-powered health insights?',
      answer:
        'Our AI analysis tools provide general insights based on patterns in your health data and medical knowledge. They can identify trends and potential correlations that might be worth discussing with healthcare professionals. However, all AI insights are clearly labeled as suggestions and should never replace professional medical advice or diagnosis.',
    },
  ];

  // Resources data
  const resources = {
    documentation: [
      {
        title: 'Getting Started Guide',
        description: 'Learn the basics of using the Decentralized Healthcare Data Manager',
        icon: <BookOpen size={20} />,
        link: '#getting-started',
      },
      {
        title: 'Data Import Tutorial',
        description: 'Step-by-step guide for importing your health records',
        icon: <Database size={20} />,
        link: '#data-import',
      },
      {
        title: 'Privacy & Security Features',
        description: 'Detailed explanation of our privacy-first architecture',
        icon: <Shield size={20} />,
        link: '#privacy',
      },
      {
        title: 'Health Visualization Guide',
        description: 'How to create and interpret health data visualizations',
        icon: <PieChart size={20} />,
        link: '#visualizations',
      },
      {
        title: 'Data Sharing Features',
        description: 'Instructions for securely sharing health information',
        icon: <Lock size={20} />,
        link: '#data-sharing',
      },
      {
        title: 'Offline Functionality',
        description: 'Using the app without internet connection',
        icon: <ServerOff size={20} />,
        link: '#offline',
      },
    ],
    developerResources: [
      {
        title: 'Technical Architecture',
        description: "Overview of the application's frontend architecture",
        icon: <Code size={20} />,
        link: '#architecture',
      },
      {
        title: 'IndexedDB Implementation',
        description: 'How we implement client-side storage with IndexedDB',
        icon: <Database size={20} />,
        link: '#indexeddb',
      },
      {
        title: 'Web Crypto API Usage',
        description: 'Our approach to client-side encryption',
        icon: <Lock size={20} />,
        link: '#encryption',
      },
      {
        title: 'FHIR & HL7 Parsing',
        description: 'How we handle healthcare data standards',
        icon: <FileDigit size={20} />,
        link: '#health-standards',
      },
      {
        title: 'WebAssembly Optimizations',
        description: 'Performance enhancements with Wasm',
        icon: <RefreshCw size={20} />,
        link: '#wasm',
      },
      {
        title: 'GitHub Repository',
        description: 'Access the open source code and documentation',
        icon: <Github size={20} />,
        link: '#github',
      },
    ],
    communitySupport: [
      {
        title: 'Community Forum',
        description: 'Ask questions and share insights with other users',
        icon: <MessageCircle size={20} />,
        link: '#forum',
      },
      {
        title: 'Video Tutorials',
        description: 'Watch guided walkthroughs of key features',
        icon: <Youtube size={20} />,
        link: '#videos',
      },
      {
        title: 'User Guides',
        description: 'Comprehensive documentation for all features',
        icon: <FileText size={20} />,
        link: '#guides',
      },
      {
        title: 'Weekly Webinars',
        description: 'Join live Q&A sessions with the development team',
        icon: <ExternalLink size={20} />,
        link: '#webinars',
      },
    ],
  };

  // Filter resources based on search query
  const filteredResources = Object.keys(resources).reduce(
    (acc, category) => {
      acc[category as keyof typeof resources] = resources[
        category as keyof typeof resources
      ].filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return acc;
    },
    {} as typeof resources
  );

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Support & Resources
          </h1>
          <p className="text-white text-center mt-4 max-w-2xl mx-auto">
            Everything you need to get the most out of your Decentralized Healthcare Data Manager
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto mt-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-lg bg-white bg-opacity-90 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              placeholder="Search for resources, guides, or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-200">
          <button
            className={`mr-4 py-2 px-1 font-medium text-sm md:text-base border-b-2 transition duration-150 ease-in-out ${
              activeTab === 'documentation'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('documentation')}
          >
            Documentation
          </button>
          <button
            className={`mr-4 py-2 px-1 font-medium text-sm md:text-base border-b-2 transition duration-150 ease-in-out ${
              activeTab === 'developerResources'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('developerResources')}
          >
            Developer Resources
          </button>
          <button
            className={`mr-4 py-2 px-1 font-medium text-sm md:text-base border-b-2 transition duration-150 ease-in-out ${
              activeTab === 'communitySupport'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('communitySupport')}
          >
            Community Support
          </button>
          <button
            className={`py-2 px-1 font-medium text-sm md:text-base border-b-2 transition duration-150 ease-in-out ${
              activeTab === 'faq'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('faq')}
          >
            FAQs
          </button>
        </div>

        {/* Tab content */}
        <div className="mt-8">
          {/* Documentation */}
          {activeTab === 'documentation' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.documentation.length > 0 ? (
                filteredResources.documentation.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex items-start"
                  >
                    <div className="flex-shrink-0 mr-4 bg-blue-100 p-3 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                    </div>
                    <div className="ml-auto">
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </a>
                ))
              ) : (
                <div className="col-span-3 text-center py-16">
                  <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          )}

          {/* Developer Resources */}
          {activeTab === 'developerResources' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.developerResources.length > 0 ? (
                filteredResources.developerResources.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex items-start"
                  >
                    <div className="flex-shrink-0 mr-4 bg-purple-100 p-3 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-purple-600">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                    </div>
                    <div className="ml-auto">
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </a>
                ))
              ) : (
                <div className="col-span-3 text-center py-16">
                  <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          )}

          {/* Community Support */}
          {activeTab === 'communitySupport' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.communitySupport.length > 0 ? (
                filteredResources.communitySupport.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex items-start"
                  >
                    <div className="flex-shrink-0 mr-4 bg-teal-100 p-3 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-teal-600">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                    </div>
                    <div className="ml-auto">
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </a>
                ))
              ) : (
                <div className="col-span-3 text-center py-16">
                  <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          )}

          {/* FAQs */}
          {activeTab === 'faq' && (
            <div className="max-w-3xl mx-auto">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <div key={index} className="mb-4">
                    <button
                      className="flex justify-between items-center w-full p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-left"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <ChevronRight
                        className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                          expandedFaq === index ? 'transform rotate-90' : ''
                        }`}
                      />
                    </button>
                    {expandedFaq === index && (
                      <div className="mt-2 p-5 bg-gray-50 rounded-lg">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-16">
                  <FileQuestion className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No FAQs found</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Contact support section */}
        <div className="mt-16 bg-gradient-to-r from-teal-500 to-purple-600 rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="p-8 md:w-2/3">
              <h2 className="text-2xl font-bold text-white">Need additional support?</h2>
              <p className="mt-2 text-white text-opacity-90">
                Our support team is available to help with any technical issues or questions about
                the Decentralized Healthcare Data Manager.
              </p>
              <div className="mt-6">
                <a
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-purple-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-500 focus:ring-white"
                >
                  Contact Support
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="md:w-1/3 bg-purple-900 bg-opacity-20 p-8 flex items-center justify-center">
              <MessageCircle className="h-24 w-24 text-white text-opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Feature highlight */}
      <div className="bg-gray-100 py-12 mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Key Technical Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="p-3 bg-blue-100 inline-flex rounded-lg">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Local-First Architecture</h3>
              <p className="mt-2 text-gray-600">
                Advanced IndexedDB implementation with schema versioning, indices optimization, and
                custom encryption wrapper for secure client-side storage.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="p-3 bg-teal-100 inline-flex rounded-lg">
                <Lock className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">End-to-End Encryption</h3>
              <p className="mt-2 text-gray-600">
                Web Crypto API implementation with AES-GCM for data encryption, PBKDF2 for key
                derivation, and secure key management techniques.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="p-3 bg-purple-100 inline-flex rounded-lg">
                <RefreshCw className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">WebAssembly Optimization</h3>
              <p className="mt-2 text-gray-600">
                High-performance data processing with Rust compiled to WebAssembly for complex
                calculations and real-time health data analysis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold">Decentralized Healthcare Data Manager</h2>
              <p className="text-gray-400 mt-1">Your health data, under your control</p>
            </div>
            <div className="flex space-x-6">
              <a href="#github" className="text-gray-400 hover:text-white">
                <Github className="h-6 w-6" />
              </a>
              <a href="#youtube" className="text-gray-400 hover:text-white">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#docs" className="text-gray-400 hover:text-white">
                <BookOpen className="h-6 w-6" />
              </a>
              <a href="#forum" className="text-gray-400 hover:text-white">
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
            <p>© 2025 Decentralized Healthcare Data Manager. Privacy-first by design.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
