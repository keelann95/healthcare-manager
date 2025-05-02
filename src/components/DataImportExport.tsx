'use client';
import React, { useState } from 'react';
import {
  Upload,
  Download,
  FileText,
  Settings,
  RefreshCw,
  Brain,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  X,
} from 'lucide-react';
import Button from '../components/ui/Button';

interface FileFormat {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

const supportedFormats: FileFormat[] = [
  {
    id: 'hl7',
    name: 'HL7',
    description: 'Health Level Seven International standard format',
    icon: FileText,
  },
  {
    id: 'fhir',
    name: 'FHIR',
    description: 'Fast Healthcare Interoperability Resources',
    icon: FileText,
  },
  {
    id: 'csv',
    name: 'CSV',
    description: 'Comma-separated values file',
    icon: FileText,
  },
  {
    id: 'json',
    name: 'JSON',
    description: 'JavaScript Object Notation format',
    icon: FileText,
  },
];

const DataImportExport = () => {
  const [activeTab, setActiveTab] = useState('import');
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [importStep, setImportStep] = useState(1);
  const [mappingProgress, setMappingProgress] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic
    setImportStep(2);
    simulateMapping();
  };

  const simulateMapping = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setMappingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setImportStep(3);
      }
    }, 500);
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-900 mb-2">Data Import/Export Center</h1>
          <p className="text-slate-600">Manage your health data imports and exports securely</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Upload className="h-6 w-6 text-blue-600" />
              <span className="text-sm text-slate-500">Last Import</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">2 days ago</span>
              <span className="ml-2 text-sm text-blue-600">HL7 format</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Download className="h-6 w-6 text-green-600" />
              <span className="text-sm text-slate-500">Last Export</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">Yesterday</span>
              <span className="ml-2 text-sm text-green-600">FHIR format</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Settings className="h-6 w-6 text-purple-600" />
              <span className="text-sm text-slate-500">Sync Status</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">Active</span>
              <span className="ml-2 text-sm text-purple-600">All systems synced</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('import')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'import'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Import Data
              </button>
              <button
                onClick={() => setActiveTab('export')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'export'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Export Data
              </button>
              <button
                onClick={() => setActiveTab('sync')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'sync'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Sync Settings
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'import' && (
              <div className="text-center py-12">
                <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-blue-900 mb-2">
                  Import Your Health Data
                </h2>
                <p className="text-slate-600 mb-6">
                  Drag and drop your files here or click to browse
                </p>
                <Button variant="primary" onClick={() => setShowImportModal(true)}>
                  Start Import
                </Button>
              </div>
            )}

            {activeTab === 'export' && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <p className="text-sm text-blue-700">
                      All exports are encrypted and password-protected by default
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {supportedFormats.map((format) => (
                    <div
                      key={format.id}
                      className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <format.icon className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <h3 className="font-medium text-blue-900">{format.name}</h3>
                            <p className="text-sm text-slate-600">{format.description}</p>
                          </div>
                        </div>
                        <Button variant="secondary" size="sm">
                          Export
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'sync' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    <RefreshCw className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-blue-900">Auto-Sync</h3>
                      <p className="text-sm text-slate-600">
                        Automatically sync data with providers
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    <Brain className="h-5 w-5 text-purple-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-blue-900">AI-Assisted Mapping</h3>
                      <p className="text-sm text-slate-600">
                        Use AI to improve data mapping accuracy
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-blue-900">Import Health Data</h2>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full"
                >
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <div className="space-y-6">
                {importStep === 1 && (
                  <>
                    <div className="space-y-4">
                      <h3 className="font-medium text-blue-900">Select Format</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {supportedFormats.map((format) => (
                          <div
                            key={format.id}
                            onClick={() => setSelectedFormat(format.id)}
                            className={`p-4 rounded-lg border cursor-pointer ${
                              selectedFormat === format.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-200 hover:border-blue-300'
                            }`}
                          >
                            <div className="flex items-center">
                              <format.icon className="h-5 w-5 text-blue-600 mr-3" />
                              <div>
                                <h4 className="font-medium text-blue-900">{format.name}</h4>
                                <p className="text-sm text-slate-600">{format.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-slate-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                      />
                    </div>
                  </>
                )}

                {importStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="font-medium text-blue-900">AI-Assisted Mapping</h3>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                            Mapping Progress
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-blue-600">
                            {mappingProgress}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                        <div
                          style={{ width: `${mappingProgress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                        ></div>
                      </div>
                      <p className="text-sm text-slate-600">
                        AI is analyzing and mapping your data fields...
                      </p>
                    </div>
                  </div>
                )}

                {importStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">Import Complete!</h3>
                      <p className="text-slate-600">
                        Your data has been successfully imported and mapped
                      </p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Import Summary</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          248 records processed
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          15 new entries added
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />3 records updated
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
                  <Button variant="secondary" onClick={() => setShowImportModal(false)}>
                    {importStep === 3 ? 'Close' : 'Cancel'}
                  </Button>
                  {importStep < 3 && (
                    <Button variant="primary" onClick={() => setImportStep((prev) => prev + 1)}>
                      Continue
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataImportExport;
