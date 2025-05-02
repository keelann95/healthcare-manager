'use client';

import React, { useState } from 'react';
import {
  Save,
  Key,
  Cloud,
  Clock,
  AlertCircle,
  Download,
  Upload,
  Settings,
  RefreshCw,
  CheckCircle,
  Shield,
  HardDrive,
  Database,
} from 'lucide-react';
import Button from '../components/ui/Button';

const BackupRecovery = () => {
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const startBackup = () => {
    setIsBackingUp(true);
    setBackupProgress(0);
    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-900 mb-2">Backup & Recovery</h1>
          <p className="text-slate-600">Secure your health data with encrypted backups</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Save className="h-6 w-6 text-blue-600" />
              <span className="text-sm text-slate-500">Last Backup</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">2 days ago</span>
              <span className="ml-2 text-sm text-blue-600">successful</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Cloud className="h-6 w-6 text-purple-600" />
              <span className="text-sm text-slate-500">Cloud Storage</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">2.3 GB</span>
              <span className="ml-2 text-sm text-purple-600">used of 5 GB</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Key className="h-6 w-6 text-green-600" />
              <span className="text-sm text-slate-500">Recovery Keys</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">3</span>
              <span className="ml-2 text-sm text-green-600">active</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-6 w-6 text-red-600" />
              <span className="text-sm text-slate-500">Next Scheduled</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">Tomorrow</span>
              <span className="ml-2 text-sm text-red-600">3:00 AM</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Backup Section */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-semibold text-blue-900 mb-6">Create New Backup</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-blue-900">Encryption Status</h3>
                      <p className="text-sm text-slate-600">256-bit AES encryption ready</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Active
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-blue-900">Select Backup Type</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="relative flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:border-blue-300">
                      <input type="radio" name="backupType" className="sr-only" defaultChecked />
                      <div className="flex items-center">
                        <Cloud className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <span className="font-medium text-blue-900">Cloud Backup</span>
                          <p className="text-sm text-slate-600">Encrypted cloud storage</p>
                        </div>
                      </div>
                    </label>
                    <label className="relative flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:border-blue-300">
                      <input type="radio" name="backupType" className="sr-only" />
                      <div className="flex items-center">
                        <HardDrive className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <span className="font-medium text-blue-900">Local Backup</span>
                          <p className="text-sm text-slate-600">Save to your device</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {isBackingUp ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-blue-900">Backup Progress</span>
                      <span className="text-blue-600">{backupProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${backupProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-slate-600">Encrypting and uploading your data...</p>
                  </div>
                ) : (
                  <Button variant="primary" onClick={startBackup} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Start Backup
                  </Button>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-semibold text-blue-900 mb-6">Backup Schedule</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-blue-900">Automatic Backups</h3>
                      <p className="text-sm text-slate-600">Daily at 3:00 AM</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    <Database className="h-5 w-5 text-purple-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-blue-900">Retention Policy</h3>
                      <p className="text-sm text-slate-600">Keep last 30 days</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Modify
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Recovery Section */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-semibold text-blue-900 mb-6">Recovery Options</h2>

              <div className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <p className="text-sm text-blue-700">
                      Keep your recovery keys safe. They are required to restore your data in case
                      of emergency.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => setShowRecoveryModal(true)}
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Manage Recovery Keys
                  </Button>

                  <Button variant="secondary" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Backup
                  </Button>

                  <Button variant="secondary" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Restore from Backup
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-semibold text-blue-900 mb-6">Backup History</h2>
              <div className="space-y-4">
                {[
                  { date: '2024-03-15', time: '03:00 AM', status: 'success', size: '2.3 GB' },
                  { date: '2024-03-14', time: '03:00 AM', status: 'success', size: '2.2 GB' },
                  { date: '2024-03-13', time: '03:00 AM', status: 'success', size: '2.2 GB' },
                ].map((backup, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <CheckCircle
                        className={`h-5 w-5 ${
                          backup.status === 'success' ? 'text-green-500' : 'text-red-500'
                        } mr-3`}
                      />
                      <div>
                        <p className="font-medium text-blue-900">{backup.date}</p>
                        <p className="text-sm text-slate-600">{backup.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-blue-900">{backup.size}</p>
                      <p className="text-sm text-green-600">Completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recovery Keys Modal */}
        {showRecoveryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
              <h2 className="text-xl font-semibold text-blue-900 mb-6">Recovery Keys</h2>

              <div className="space-y-6">
                <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                    <p className="text-sm text-yellow-700">
                      Store these keys securely. They are required to decrypt your backup data.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { id: 'RK-001', created: '2024-03-15', status: 'active' },
                    { id: 'RK-002', created: '2024-02-15', status: 'active' },
                    { id: 'RK-003', created: '2024-01-15', status: 'active' },
                  ].map((key, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-blue-900">{key.id}</p>
                          <p className="text-sm text-slate-600">Created: {key.created}</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {key.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
                  <Button variant="secondary" onClick={() => setShowRecoveryModal(false)}>
                    Close
                  </Button>
                  <Button variant="primary">
                    <Key className="h-4 w-4 mr-2" />
                    Generate New Key
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackupRecovery;
