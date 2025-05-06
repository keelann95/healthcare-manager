'use client';

import React, { useState } from 'react';
import { Settings, Shield, Database, Bell, Mail, Globe, Server, Key, Save } from 'lucide-react';
import Button from '../components/ui/Button';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-900 mb-2">System Settings</h1>
          <p className="text-slate-600">Configure system-wide settings and preferences</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex border-b border-slate-100">
            <div className="w-64 border-r border-slate-100 p-6">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'general'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Settings className="h-5 w-5 mr-3" />
                  General
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'security'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Shield className="h-5 w-5 mr-3" />
                  Security
                </button>
                <button
                  onClick={() => setActiveTab('storage')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'storage'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Database className="h-5 w-5 mr-3" />
                  Storage
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'notifications'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Bell className="h-5 w-5 mr-3" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('email')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'email'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Mail className="h-5 w-5 mr-3" />
                  Email
                </button>
                <button
                  onClick={() => setActiveTab('integrations')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'integrations'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Globe className="h-5 w-5 mr-3" />
                  Integrations
                </button>
              </nav>
            </div>

            <div className="flex-1 p-6">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-blue-900 mb-4">General Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          System Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          defaultValue="Healthcare Data Manager"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Time Zone
                        </label>
                        <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>UTC</option>
                          <option>America/New_York</option>
                          <option>Europe/London</option>
                          <option>Asia/Tokyo</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Date Format
                        </label>
                        <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>MM/DD/YYYY</option>
                          <option>DD/MM/YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">System Maintenance</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-slate-900">Maintenance Mode</h4>
                          <p className="text-sm text-slate-600">
                            Enable maintenance mode to prevent user access during updates
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-slate-900">Debug Mode</h4>
                          <p className="text-sm text-slate-600">
                            Enable detailed error reporting and logging
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-blue-900 mb-4">Security Settings</h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-medium text-slate-900 mb-2">Password Policy</h3>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                              defaultChecked
                            />
                            <span className="ml-2 text-sm text-slate-600">
                              Require minimum 12 characters
                            </span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                              defaultChecked
                            />
                            <span className="ml-2 text-sm text-slate-600">
                              Require special characters
                            </span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                              defaultChecked
                            />
                            <span className="ml-2 text-sm text-slate-600">Require numbers</span>
                          </label>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-medium text-slate-900 mb-2">
                          Two-Factor Authentication
                        </h3>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                              defaultChecked
                            />
                            <span className="ml-2 text-sm text-slate-600">
                              Require 2FA for all admin users
                            </span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-slate-600">
                              Require 2FA for all users
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-medium text-slate-900 mb-2">Session Settings</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm text-slate-600 mb-1">
                              Session Timeout (minutes)
                            </label>
                            <input
                              type="number"
                              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              defaultValue="30"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-slate-600 mb-1">
                              Maximum Concurrent Sessions
                            </label>
                            <input
                              type="number"
                              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              defaultValue="3"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">API Security</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-slate-900">API Keys</h4>
                            <p className="text-sm text-slate-600">
                              Manage API access keys and permissions
                            </p>
                          </div>
                          <Button variant="secondary" size="sm">
                            <Key className="h-4 w-4 mr-2" />
                            Generate New Key
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {[
                            { name: 'Production API Key', status: 'active' },
                            { name: 'Development API Key', status: 'active' },
                            { name: 'Testing API Key', status: 'inactive' },
                          ].map((key, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200"
                            >
                              <div>
                                <p className="font-medium text-slate-900">{key.name}</p>
                                <p className="text-sm text-slate-500">Last used: 2 hours ago</p>
                              </div>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  key.status === 'active'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {key.status.toUpperCase()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'storage' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-blue-900 mb-4">Storage Settings</h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-medium text-slate-900 mb-4">Storage Usage</h3>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-slate-600 mb-1">
                            <span>4.2 TB used</span>
                            <span>10 TB total</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: '42%' }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 bg-white rounded-lg border border-slate-200">
                            <p className="text-sm font-medium text-slate-900">Patient Records</p>
                            <p className="text-xl font-bold text-blue-600">2.8 TB</p>
                          </div>
                          <div className="p-3 bg-white rounded-lg border border-slate-200">
                            <p className="text-sm font-medium text-slate-900">System Backups</p>
                            <p className="text-xl font-bold text-blue-600">1.4 TB</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-medium text-slate-900 mb-4">Storage Configuration</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Default Storage Location
                            </label>
                            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option>Local Storage</option>
                              <option>Cloud Storage</option>
                              <option>Hybrid Storage</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Backup Retention Period (days)
                            </label>
                            <input
                              type="number"
                              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              defaultValue="30"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-medium text-slate-900 mb-4">Storage Providers</h3>
                        <div className="space-y-2">
                          {[
                            { name: 'Local Storage', status: 'active' },
                            { name: 'AWS S3', status: 'active' },
                            { name: 'Google Cloud Storage', status: 'inactive' },
                          ].map((provider, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200"
                            >
                              <div className="flex items-center">
                                <Server className="h-5 w-5 text-slate-400 mr-3" />
                                <div>
                                  <p className="font-medium text-slate-900">{provider.name}</p>
                                  <p className="text-sm text-slate-500">Connected</p>
                                </div>
                              </div>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  provider.status === 'active'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {provider.status.toUpperCase()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-blue-900 mb-4">
                      Notification Settings
                    </h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-medium text-slate-900 mb-4">System Notifications</h3>
                        <div className="space-y-2">
                          {[
                            'System updates',
                            'Security alerts',
                            'User activity',
                            'Storage alerts',
                            'Performance issues',
                          ].map((notification, index) => (
                            <label
                              key={index}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200"
                            >
                              <span className="text-slate-900">{notification}</span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-medium text-slate-900 mb-4">Notification Channels</h3>
                        <div className="space-y-4">
                          {[
                            { channel: 'Email', icon: Mail },
                            { channel: 'SMS', icon: Bell },
                            { channel: 'Push Notifications', icon: Bell },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200"
                            >
                              <div className="flex items-center">
                                <item.icon className="h-5 w-5 text-slate-400 mr-3" />
                                <span className="text-slate-900">{item.channel}</span>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'email' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-blue-900 mb-4">Email Settings</h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-medium text-slate-900 mb-4">SMTP Configuration</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              SMTP Host
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="smtp.example.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              SMTP Port
                            </label>
                            <input
                              type="number"
                              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="587"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Username
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="username"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-medium text-slate-900 mb-4">Email Templates</h3>
                        <div className="space-y-2">
                          {[
                            'Welcome Email',
                            'Password Reset',
                            'Account Verification',
                            'System Notifications',
                          ].map((template, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200"
                            >
                              <span className="text-slate-900">{template}</span>
                              <Button variant="secondary" size="sm">
                                Edit
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'integrations' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-blue-900 mb-4">
                      Integration Settings
                    </h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-medium text-slate-900 mb-4">Connected Services</h3>
                        <div className="space-y-2">
                          {[
                            { name: 'Electronic Health Records', status: 'connected' },
                            { name: 'Laboratory System', status: 'connected' },
                            { name: 'Billing System', status: 'disconnected' },
                          ].map((service, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200"
                            >
                              <div>
                                <p className="font-medium text-slate-900">{service.name}</p>
                                <p className="text-sm text-slate-500">Last synced: 2 hours ago</p>
                              </div>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  service.status === 'connected'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {service.status.toUpperCase()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-medium text-slate-900 mb-4">Available Integrations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            'Payment Gateway',
                            'Appointment Scheduler',
                            'Medical Imaging',
                            'Pharmacy System',
                          ].map((integration, index) => (
                            <div
                              key={index}
                              className="p-3 bg-white rounded-lg border border-slate-200"
                            >
                              <p className="font-medium text-slate-900">{integration}</p>
                              <Button variant="secondary" size="sm" className="mt-2">
                                Connect
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-slate-100">
            <div className="flex justify-end">
              <Button variant="primary">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
