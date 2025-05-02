'use client';
import React, { useState } from 'react';
import { Search, Copy, Check, Terminal, Code, Book, Zap, Shield, Database } from 'lucide-react';

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code, language }: { code: string; language: string }) => (
    <div className="relative">
      <div className="absolute top-3 right-3 flex items-center space-x-2">
        <span className="text-xs text-slate-500">{language}</span>
        <button onClick={() => copyToClipboard(code)} className="p-1 hover:bg-slate-100 rounded">
          {copiedCode === code ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-slate-500" />
          )}
        </button>
      </div>
      <pre className="bg-slate-50 p-4 rounded-lg overflow-x-auto">
        <code className="text-sm font-mono text-slate-800">{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <nav className="space-y-1">
                <a
                  href="#getting-started"
                  className="block px-3 py-2 text-blue-600 bg-blue-50 rounded-lg font-medium"
                >
                  Getting Started
                </a>
                <a
                  href="#authentication"
                  className="block px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Authentication
                </a>
                <a
                  href="#data-models"
                  className="block px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Data Models
                </a>
                <a
                  href="#api-reference"
                  className="block px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  API Reference
                </a>
                <a
                  href="#sdks"
                  className="block px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  SDKs & Libraries
                </a>
                <a
                  href="#security"
                  className="block px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Security
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            <div className="prose prose-slate max-w-none">
              <h1 className="text-3xl font-bold text-blue-900 mb-6">Documentation</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                  <Terminal className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Start Guide</h3>
                  <p className="text-slate-600 mb-4">
                    Get up and running with our platform in minutes.
                  </p>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Learn more →
                  </a>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                  <Code className="h-8 w-8 text-purple-600 mb-4" />
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">API Reference</h3>
                  <p className="text-slate-600 mb-4">
                    Comprehensive API documentation and examples.
                  </p>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    View APIs →
                  </a>
                </div>
              </div>

              <section id="getting-started" className="mb-12">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Getting Started</h2>
                <p className="text-slate-600 mb-6">
                  Our healthcare data platform provides secure, decentralized storage and management
                  of patient records. Follow this guide to integrate our platform into your
                  application.
                </p>

                <h3 className="text-xl font-semibold text-blue-900 mb-4">Installation</h3>
                <CodeBlock language="bash" code="npm install @dhdm/client @dhdm/encryption" />

                <h3 className="text-xl font-semibold text-blue-900 mt-8 mb-4">
                  Initialize the Client
                </h3>
                <CodeBlock
                  language="typescript"
                  code={`import { DHDMClient } from '@dhdm/client';

const client = new DHDMClient({
  apiKey: 'your_api_key',
  encryptionKey: 'your_encryption_key',
});`}
                />
              </section>

              <section id="authentication" className="mb-12">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Authentication</h2>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-6">
                  <div className="flex items-start space-x-4">
                    <Shield className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Secure Authentication</h4>
                      <p className="text-slate-600">
                        Our authentication system uses industry-standard JWT tokens with additional
                        encryption layers for enhanced security.
                      </p>
                    </div>
                  </div>
                </div>

                <CodeBlock
                  language="typescript"
                  code={`// Authenticate a user
const session = await client.auth.signIn({
  email: 'provider@hospital.com',
  password: 'secure_password'
});

// Use the session token for subsequent requests
client.setSession(session);`}
                />
              </section>

              <section id="data-models" className="mb-12">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Data Models</h2>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-6">
                  <div className="flex items-start space-x-4">
                    <Database className="h-6 w-6 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Encrypted Data Structure</h4>
                      <p className="text-slate-600">
                        All patient data is encrypted at rest and in transit. Our data models ensure
                        HIPAA compliance while maintaining flexibility.
                      </p>
                    </div>
                  </div>
                </div>

                <CodeBlock
                  language="typescript"
                  code={`interface PatientRecord {
  id: string;
  encryptedData: {
    personalInfo: EncryptedData;
    medicalHistory: EncryptedData;
    treatments: EncryptedData[];
  };
  metadata: {
    lastUpdated: string;
    accessLevel: 'full' | 'partial' | 'emergency';
  };
}`}
                />
              </section>

              <section id="api-reference" className="mb-12">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">API Reference</h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">
                      Patient Records API
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded mr-3">
                          GET
                        </span>
                        <code className="text-sm font-mono text-slate-800">
                          /api/v1/patients/:id
                        </code>
                      </div>
                      <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded mr-3">
                          POST
                        </span>
                        <code className="text-sm font-mono text-slate-800">/api/v1/patients</code>
                      </div>
                      <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded mr-3">
                          PUT
                        </span>
                        <code className="text-sm font-mono text-slate-800">
                          /api/v1/patients/:id
                        </code>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Access Control API</h3>
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded mr-3">
                          POST
                        </span>
                        <code className="text-sm font-mono text-slate-800">
                          /api/v1/access/grant
                        </code>
                      </div>
                      <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded mr-3">
                          DELETE
                        </span>
                        <code className="text-sm font-mono text-slate-800">
                          /api/v1/access/revoke
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="sdks" className="mb-12">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">SDKs & Libraries</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <Book className="h-6 w-6 text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      JavaScript/TypeScript SDK
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Official SDK for Node.js and browser environments.
                    </p>
                    <CodeBlock language="bash" code="npm install @dhdm/client" />
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <Zap className="h-6 w-6 text-yellow-600 mb-4" />
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      React Hooks Library
                    </h3>
                    <p className="text-slate-600 mb-4">
                      React hooks for easy integration with our platform.
                    </p>
                    <CodeBlock language="bash" code="npm install @dhdm/react" />
                  </div>
                </div>
              </section>

              <section id="security" className="mb-12">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Security</h2>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <Shield className="h-6 w-6 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">End-to-End Encryption</h4>
                        <p className="text-slate-600">
                          All data is encrypted using AES-256-GCM before being stored or
                          transmitted.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Database className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Decentralized Storage</h4>
                        <p className="text-slate-600">
                          Data is distributed across multiple secure nodes to prevent single points
                          of failure.
                        </p>
                      </div>
                    </div>

                    <CodeBlock
                      language="typescript"
                      code={`// Example of encrypting sensitive data
const encryptedData = await client.encryption.encrypt({
  patientData,
  accessPolicy: {
    allowedRoles: ['doctor', 'nurse'],
    timeLimit: '24h'
  }
});`}
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
