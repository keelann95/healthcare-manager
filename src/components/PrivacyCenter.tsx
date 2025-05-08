'use client';
import React, { useState } from 'react';
import { Shield, Lock, Eye, Settings, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const PrivacyCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Privacy Center</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your health data privacy is our top priority. Learn about our comprehensive approach to
            protecting your information.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'overview', label: 'Overview', icon: Eye },
            { id: 'security', label: 'Security', icon: Lock },
            { id: 'compliance', label: 'Compliance', icon: CheckCircle },
            { id: 'controls', label: 'Privacy Controls', icon: Settings },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center px-6 py-3 rounded-full transition-colors ${
                activeTab === id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto">
          {/* Overview Section */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">
                  Your Data Privacy Rights
                </h2>
                <div className="grid gap-4">
                  {[
                    { title: 'Access', desc: 'View all your stored health data' },
                    { title: 'Control', desc: 'Manage who can access your information' },
                    { title: 'Delete', desc: 'Request deletion of your data' },
                    { title: 'Export', desc: 'Download your data in standard formats' },
                  ].map((right, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                      <div>
                        <h3 className="font-medium text-blue-900">{right.title}</h3>
                        <p className="text-slate-600">{right.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-blue-600 mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Your Privacy Matters</h3>
                    <p className="text-slate-600">
                      We never sell your data or share it with third parties without your explicit
                      consent. Your health information is encrypted and stored in a decentralized
                      manner.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeTab === 'security' && (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-semibold text-blue-900 mb-6">Security Measures</h2>
                <div className="grid gap-6">
                  {[
                    {
                      icon: Lock,
                      title: 'End-to-End Encryption',
                      desc: 'Your data is encrypted at rest and in transit using military-grade encryption.',
                    },
                    {
                      icon: Shield,
                      title: 'Zero-Knowledge Architecture',
                      desc: 'We cannot access your unencrypted data - only you control the keys.',
                    },
                    {
                      icon: Eye,
                      title: 'Access Monitoring',
                      desc: 'Track every access to your health records in real-time.',
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start p-4 bg-slate-50 rounded-lg">
                      <div className="p-2 bg-white rounded-lg mr-4">
                        <item.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-900 mb-1">{item.title}</h3>
                        <p className="text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">
                  Security Certifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['HIPAA Compliant', 'SOC 2 Type II', 'ISO 27001', 'GDPR Compliant'].map(
                    (cert, index) => (
                      <div key={index} className="flex items-center p-3 bg-slate-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="font-medium text-slate-700">{cert}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Compliance Section */}
          {activeTab === 'compliance' && (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-semibold text-blue-900 mb-6">Regulatory Compliance</h2>
                <div className="space-y-6">
                  {[
                    {
                      title: 'HIPAA Compliance',
                      desc: 'We maintain strict compliance with the Health Insurance Portability and Accountability Act.',
                      items: [
                        'Privacy Rule Compliance',
                        'Security Rule Implementation',
                        'Regular Audits',
                        'Staff Training',
                      ],
                    },
                    {
                      title: 'GDPR Requirements',
                      desc: 'Full compliance with EU General Data Protection Regulation.',
                      items: [
                        'Data Minimization',
                        'Purpose Limitation',
                        'Data Subject Rights',
                        'Privacy by Design',
                      ],
                    },
                  ].map((section, index) => (
                    <div key={index} className="p-6 bg-slate-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">{section.title}</h3>
                      <p className="text-slate-600 mb-4">{section.desc}</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Privacy Controls Section */}
          {activeTab === 'controls' && (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-semibold text-blue-900 mb-6">Privacy Settings</h2>
                <div className="space-y-6">
                  {[
                    {
                      title: 'Access Control',
                      desc: 'Manage who can view your health records',
                      action: 'Manage Access',
                    },
                    {
                      title: 'Data Sharing',
                      desc: 'Control how your data is shared with healthcare providers',
                      action: 'Configure Sharing',
                    },
                    {
                      title: 'Communication Preferences',
                      desc: 'Set your communication and notification preferences',
                      action: 'Update Preferences',
                    },
                  ].map((control, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-blue-900 mb-1">{control.title}</h3>
                        <p className="text-slate-600">{control.desc}</p>
                      </div>
                      <Button variant="secondary" size="sm">
                        {control.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-start">
                  <HelpCircle className="h-6 w-6 text-blue-600 mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
                    <p className="text-slate-600 mb-4">
                      Our privacy team is here to help you understand and configure your privacy
                      settings.
                    </p>
                    <Button variant="primary" size="sm">
                      Contact Privacy Team
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivacyCenter;
