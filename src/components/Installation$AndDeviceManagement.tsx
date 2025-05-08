'use client';

import React, { useState, useEffect } from 'react';
import {
  Download,
  Smartphone,
  Database,
  Gauge,
  Wifi,
  Info,
  Check,
  X,
  Settings,
  RefreshCw,
  HardDrive,
  Zap,
} from 'lucide-react';

export default function InstallationAndDeviceManagement() {
  // State for installation status
  const [isInstalled, setIsInstalled] = useState(false);
  const [storageUsed, setStorageUsed] = useState(0);
  const [storageAvailable, setStorageAvailable] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [syncedDevices, setSyncedDevices] = useState([
    { id: 1, name: 'iPhone 13', lastSync: '2 hours ago', status: 'active' },
    { id: 2, name: 'MacBook Pro', lastSync: '5 mins ago', status: 'active' },
    { id: 3, name: 'iPad Air', lastSync: '2 days ago', status: 'inactive' },
  ]);
  const [openSection, setOpenSection] = useState('installation');

  // Check if app is installed
  useEffect(() => {
    // In a real app, we would check if the PWA is installed
    const checkInstallation = () => {
      const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
      setIsInstalled(isInStandaloneMode);
    };
    checkInstallation();

    // Simulate calculating storage
    setStorageUsed(245); // in MB
    setStorageAvailable(512); // in MB

    // Check online status
    setIsOnline(navigator.onLine);
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    return () => {
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
    };
  }, []);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const formatSize = (size) => {
    if (size < 1024) return size + ' MB';
    return (size / 1024).toFixed(2) + ' GB';
  };

  const syncDevice = (id) => {
    setSyncedDevices(
      syncedDevices.map((device) =>
        device.id === id ? { ...device, lastSync: 'Just now', status: 'active' } : device
      )
    );
  };

  const removeDevice = (id) => {
    setSyncedDevices(syncedDevices.filter((device) => device.id !== id));
  };

  const clearCache = () => {
    // This would involve actual cache clearing in a real app
    alert('Cache cleared successfully!');
    setStorageUsed(storageUsed * 0.7); // Simulate cache reduction
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Settings className="mr-2" size={24} />
            Installation & Device Management
          </h1>
          <div className="flex items-center space-x-2">
            <span
              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
            >
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-700">Quick Actions</h2>
              </div>
              <div className="p-4 space-y-4">
                <button
                  className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition"
                  onClick={() => toggleSection('installation')}
                >
                  <div className="flex items-center">
                    <Download className="mr-3 text-blue-600" size={20} />
                    <span className="text-gray-700">Install Application</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${isInstalled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                  >
                    {isInstalled ? 'Installed' : 'Not Installed'}
                  </span>
                </button>
                <button
                  className="w-full flex items-center justify-between p-3 bg-teal-50 rounded-md hover:bg-teal-100 transition"
                  onClick={() => toggleSection('devices')}
                >
                  <div className="flex items-center">
                    <Smartphone className="mr-3 text-teal-600" size={20} />
                    <span className="text-gray-700">Manage Devices</span>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {syncedDevices.length} Devices
                  </span>
                </button>
                <button
                  className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-md hover:bg-purple-100 transition"
                  onClick={() => toggleSection('storage')}
                >
                  <div className="flex items-center">
                    <Database className="mr-3 text-purple-600" size={20} />
                    <span className="text-gray-700">Storage Management</span>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {formatSize(storageUsed)} Used
                  </span>
                </button>
                <button
                  className="w-full flex items-center justify-between p-3 bg-amber-50 rounded-md hover:bg-amber-100 transition"
                  onClick={() => toggleSection('performance')}
                >
                  <div className="flex items-center">
                    <Gauge className="mr-3 text-amber-600" size={20} />
                    <span className="text-gray-700">Performance</span>
                  </div>
                </button>
                <button
                  className="w-full flex items-center justify-between p-3 bg-indigo-50 rounded-md hover:bg-indigo-100 transition"
                  onClick={() => toggleSection('offline')}
                >
                  <div className="flex items-center">
                    <Wifi className="mr-3 text-indigo-600" size={20} />
                    <span className="text-gray-700">Offline Mode</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${isOnline ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'}`}
                  >
                    {isOnline ? 'Online' : 'Offline Mode Active'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Panel */}
          <div className="md:col-span-2">
            {/* Installation Guide */}
            {openSection === 'installation' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-700 flex items-center">
                    <Download className="mr-2 text-blue-600" size={20} />
                    PWA Installation Guide
                  </h2>
                  <span
                    className={`px-2 py-1 rounded text-xs ${isInstalled ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                  >
                    {isInstalled ? 'Currently Installed' : 'Not Yet Installed'}
                  </span>
                </div>
                <div className="p-6">
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      What is a Progressive Web App?
                    </h3>
                    <p className="text-gray-600">
                      A Progressive Web App (PWA) allows you to install our healthcare data manager
                      directly on your device. This provides a native app-like experience, faster
                      loading times, and the ability to work offline.
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Installation Steps</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">For Chrome/Edge (Desktop)</h4>
                          <p className="text-gray-600 mb-2">
                            Look for the install icon (⊕) in the address bar, then click "Install".
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">For Safari (iOS)</h4>
                          <p className="text-gray-600 mb-2">
                            Tap the share button, then "Add to Home Screen".
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">For Android Devices</h4>
                          <p className="text-gray-600 mb-2">
                            Tap the menu button, then "Add to Home screen".
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start">
                    <Info className="text-blue-500 mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-medium text-blue-800">Why Install the PWA?</h4>
                      <ul className="mt-2 space-y-2 text-blue-700">
                        <li className="flex items-center">
                          <Check className="mr-2 text-blue-500" size={16} />
                          Access your health data without an internet connection
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 text-blue-500" size={16} />
                          Faster loading and smoother performance
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 text-blue-500" size={16} />
                          Reduced data usage once installed
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 text-blue-500" size={16} />
                          Automatic updates when online
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center">
                      <Download className="mr-2" size={18} />
                      Install Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Device Synchronization */}
            {openSection === 'devices' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-700 flex items-center">
                    <Smartphone className="mr-2 text-teal-600" size={20} />
                    Device Synchronization
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    Your health data remains on your devices and is never stored on our servers.
                    When you sync devices, we facilitate secure device-to-device communication using
                    end-to-end encryption.
                  </p>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Connected Devices</h3>
                    <div className="space-y-3">
                      {syncedDevices.map((device) => (
                        <div
                          key={device.id}
                          className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                        >
                          <div className="flex items-center">
                            <Smartphone
                              className={`mr-3 ${device.status === 'active' ? 'text-teal-500' : 'text-gray-400'}`}
                              size={20}
                            />
                            <div>
                              <h4 className="font-medium text-gray-800">{device.name}</h4>
                              <p className="text-sm text-gray-500">
                                Last synced: {device.lastSync}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => syncDevice(device.id)}
                              className="p-2 bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100 transition"
                              title="Sync Now"
                            >
                              <RefreshCw size={16} />
                            </button>
                            <button
                              onClick={() => removeDevice(device.id)}
                              className="p-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition"
                              title="Remove Device"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-6">
                    <h4 className="font-medium text-yellow-800 flex items-center mb-2">
                      <Info className="mr-2" size={18} />
                      How Device Sync Works
                    </h4>
                    <p className="text-yellow-700">
                      When you connect a new device, you'll need to scan a QR code from your
                      existing device. This establishes a secure connection and transfers your
                      encrypted health data directly between devices, without passing through any
                      servers.
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition">
                      Add New Device
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
                      Sync All Devices
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Storage Management */}
            {openSection === 'storage' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-700 flex items-center">
                    <Database className="mr-2 text-purple-600" size={20} />
                    Storage Management
                  </h2>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Storage Usage</h3>
                    <div className="bg-gray-100 h-4 rounded-full overflow-hidden mb-2">
                      <div
                        className="bg-purple-500 h-full rounded-full"
                        style={{ width: `${(storageUsed / storageAvailable) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatSize(storageUsed)} used</span>
                      <span>{formatSize(storageAvailable)} available</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Data Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">Health Records</span>
                        </div>
                        <span className="text-gray-600">120 MB</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">Medication Data</span>
                        </div>
                        <span className="text-gray-600">45 MB</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">Cached Images</span>
                        </div>
                        <span className="text-gray-600">35 MB</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">Application Cache</span>
                        </div>
                        <span className="text-gray-600">45 MB</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Storage Options</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <HardDrive className="mr-3 text-gray-500" size={20} />
                          <div>
                            <h4 className="font-medium text-gray-800">Clear Application Cache</h4>
                            <p className="text-sm text-gray-500">
                              Free up space without affecting your data
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={clearCache}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Database className="mr-3 text-gray-500" size={20} />
                          <div>
                            <h4 className="font-medium text-gray-800">Export All Data</h4>
                            <p className="text-sm text-gray-500">
                              Create a backup of all your health data
                            </p>
                          </div>
                        </div>
                        <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition">
                          Export
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h4 className="font-medium text-red-800 flex items-center mb-2">
                      <Info className="mr-2" size={18} />
                      Data Deletion Warning
                    </h4>
                    <p className="text-red-700 mb-4">
                      Since all data is stored locally, deleting app data or uninstalling the
                      application without exporting will result in permanent data loss. Always
                      export your data before clearing storage.
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                      Clear All Data
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Optimization */}
            {openSection === 'performance' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-700 flex items-center">
                    <Gauge className="mr-2 text-amber-600" size={20} />
                    Performance Optimization
                  </h2>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Current Performance</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                        <h4 className="text-amber-800 font-medium mb-1">Data Processing Speed</h4>
                        <div className="flex items-center">
                          <Zap className="text-amber-500 mr-2" size={18} />
                          <div className="text-2xl font-bold text-amber-700">Fast</div>
                        </div>
                        <p className="text-sm text-amber-600 mt-1">
                          WebAssembly optimization active
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <h4 className="text-green-800 font-medium mb-1">App Responsiveness</h4>
                        <div className="flex items-center">
                          <Gauge className="text-green-500 mr-2" size={18} />
                          <div className="text-2xl font-bold text-green-700">98%</div>
                        </div>
                        <p className="text-sm text-green-600 mt-1">Excellent interactivity score</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Optimization Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">WebAssembly Processing</h4>
                          <p className="text-sm text-gray-500">
                            Process large datasets with optimal performance
                          </p>
                        </div>
                        <div className="relative inline-block w-12 h-6">
                          <input
                            type="checkbox"
                            className="opacity-0 w-0 h-0"
                            defaultChecked={true}
                          />
                          <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-green-500 rounded-full"></span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">Background Data Processing</h4>
                          <p className="text-sm text-gray-500">
                            Process data in background for smoother UI
                          </p>
                        </div>
                        <div className="relative inline-block w-12 h-6">
                          <input
                            type="checkbox"
                            className="opacity-0 w-0 h-0"
                            defaultChecked={true}
                          />
                          <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-green-500 rounded-full"></span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">Image Compression</h4>
                          <p className="text-sm text-gray-500">
                            Optimize images for faster loading
                          </p>
                        </div>
                        <div className="relative inline-block w-12 h-6">
                          <input
                            type="checkbox"
                            className="opacity-0 w-0 h-0"
                            defaultChecked={true}
                          />
                          <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-green-500 rounded-full"></span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">Animation Effects</h4>
                          <p className="text-sm text-gray-500">
                            Enable UI animations and transitions
                          </p>
                        </div>
                        <div className="relative inline-block w-12 h-6">
                          <input
                            type="checkbox"
                            className="opacity-0 w-0 h-0"
                            defaultChecked={true}
                          />
                          <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-green-500 rounded-full"></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-blue-800 flex items-center mb-2">
                      <Info className="mr-2" size={18} />
                      Performance Recommendations
                    </h4>
                    <p className="text-blue-700">
                      For optimal performance on your current device, we recommend enabling
                      WebAssembly processing for large datasets and background data processing for a
                      smoother experience.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Offline Mode Settings */}
            {openSection === 'offline' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-700 flex items-center">
                    <Wifi className="mr-2 text-indigo-600" size={20} />
                    Offline Mode Settings
                  </h2>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Offline Capabilities</h3>
                    <p className="text-gray-600 mb-4">
                      Your health data is always available offline. Configure which features and
                      data should be accessible when you don't have an active internet connection.
                    </p>

                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-indigo-800">Current Status</h4>
                        <span
                          className={`px-2 py-1 rounded text-xs ${isOnline ? 'bg-green-100 text-green-700' : 'bg-indigo-200 text-indigo-800'}`}
                        >
                          {isOnline ? 'Online' : 'Offline Mode Active'}
                        </span>
                      </div>
                      <p className="text-indigo-700">
                        {isOnline
                          ? 'Your app is currently online and syncing data as needed.'
                          : 'Your app is in offline mode. All your data is accessible, but syncing and AI features require an internet connection.'}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Offline Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">Data Pre-fetching</h4>
                          <p className="text-sm text-gray-500">
                            Download essential data for offline use
                          </p>
                        </div>
                        <div className="relative inline-block w-12 h-6">
                          <input
                            type="checkbox"
                            className="opacity-0 w-0 h-0"
                            defaultChecked={true}
                          />
                          <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-green-500 rounded-full"></span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">Download Health Articles</h4>
                          <p className="text-sm text-gray-500">
                            Save health resources for offline reading
                          </p>
                        </div>
                        <div className="relative inline-block w-12 h-6">
                          <input
                            type="checkbox"
                            className="opacity-0 w-0 h-0"
                            defaultChecked={false}
                          />
                          <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full"></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Data Synchronization</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Last Data Sync</h4>
                          <p className="text-sm text-gray-500">
                            Will sync automatically when back online
                          </p>
                        </div>
                        <span className="text-gray-600">Today at 2:45 PM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Changes Pending Sync</h4>
                          <p className="text-sm text-gray-500">
                            Updates waiting to be synchronized
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                          3 Items
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center">
                      <Download className="mr-2" size={18} />
                      Pre-cache Essential Data
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition flex items-center">
                      <RefreshCw className="mr-2" size={18} />
                      Force Sync Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Show a default panel when nothing is selected */}
            {!openSection && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 text-center">
                  <div className="mb-4">
                    <Settings className="mx-auto text-gray-400" size={48} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Installation & Device Management
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Select an option from the sidebar to manage your installation, devices, storage,
                    or performance settings.
                  </p>
                  <button
                    onClick={() => setOpenSection('installation')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              Version 1.2.3 • Last updated May 1, 2025
            </div>
            <div className="flex space-x-4">
              <button className="text-sm text-gray-600 hover:text-blue-600 transition">
                Help & Support
              </button>
              <button className="text-sm text-gray-600 hover:text-blue-600 transition">
                Privacy Policy
              </button>
              <button className="text-sm text-gray-600 hover:text-blue-600 transition">
                Terms of Use
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
