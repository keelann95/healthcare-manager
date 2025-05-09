'use client';
import { useState } from 'react';
import {
  User,
  Lock,
  Key,
  Palette,
  Bell,
  Database,
  ChevronRight,
  Save,
  Shield,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Smartphone,
} from 'lucide-react';

// Mock user data
const initialUserData = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '+1 (555) 123-4567',
  birthdate: '1985-04-15',
  address: '123 Health Street, Medical City, MC 12345',
  emergencyContact: 'John Doe (+1-555-987-6543)',
  theme: 'light',
  notificationsEnabled: true,
  medicationReminders: true,
  appointmentAlerts: true,
  dataRetentionPeriod: '1year',
  privacyLevel: 'high',
};

export default function UserProfileSettings() {
  const [activeTab, setActiveTab] = useState('personal');
  const [userData, setUserData] = useState(initialUserData);
  const [showEncryptionKey, setShowEncryptionKey] = useState(false);
  const [saveIndicator, setSaveIndicator] = useState(false);

  // Mock encryption key
  const encryptionKey = 'e8b5f2a7-c391-4d3a-b94c-5f8a7d901234';

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const saveChanges = () => {
    // In a real app, this would save to IndexedDB
    console.log('Saving user data:', userData);
    setSaveIndicator(true);
    setTimeout(() => setSaveIndicator(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">User Profile & Settings</h1>
        <button
          onClick={saveChanges}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save size={18} />
          {saveIndicator ? 'Saved!' : 'Save Changes'}
        </button>
      </header>

      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <nav className="w-full md:w-64 bg-white border-r border-gray-200">
          <ul>
            <li>
              <button
                onClick={() => setActiveTab('personal')}
                className={`flex items-center w-full p-4 hover:bg-gray-100 ${activeTab === 'personal' ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600' : ''}`}
              >
                <User size={18} className="mr-3" />
                <span>Personal Information</span>
                <ChevronRight size={16} className="ml-auto" />
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`flex items-center w-full p-4 hover:bg-gray-100 ${activeTab === 'privacy' ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600' : ''}`}
              >
                <Lock size={18} className="mr-3" />
                <span>Privacy Preferences</span>
                <ChevronRight size={16} className="ml-auto" />
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('encryption')}
                className={`flex items-center w-full p-4 hover:bg-gray-100 ${activeTab === 'encryption' ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600' : ''}`}
              >
                <Key size={18} className="mr-3" />
                <span>Encryption Keys</span>
                <ChevronRight size={16} className="ml-auto" />
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`flex items-center w-full p-4 hover:bg-gray-100 ${activeTab === 'appearance' ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600' : ''}`}
              >
                <Palette size={18} className="mr-3" />
                <span>Appearance</span>
                <ChevronRight size={16} className="ml-auto" />
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center w-full p-4 hover:bg-gray-100 ${activeTab === 'notifications' ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600' : ''}`}
              >
                <Bell size={18} className="mr-3" />
                <span>Notifications</span>
                <ChevronRight size={16} className="ml-auto" />
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('data')}
                className={`flex items-center w-full p-4 hover:bg-gray-100 ${activeTab === 'data' ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600' : ''}`}
              >
                <Database size={18} className="mr-3" />
                <span>Data Retention</span>
                <ChevronRight size={16} className="ml-auto" />
              </button>
            </li>
          </ul>
        </nav>

        {/* Content */}
        <main className="flex-1 p-6">
          {/* Personal Information */}
          {activeTab === 'personal' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="birthdate"
                      value={userData.birthdate}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={userData.address}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={userData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Preferences */}
          {activeTab === 'privacy' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Privacy Preferences</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <Shield size={18} className="mr-2 text-teal-600" />
                      Privacy Level
                    </label>
                    <p className="text-sm text-gray-500 mb-3">
                      Choose how strict your privacy settings should be
                    </p>
                    <select
                      name="privacyLevel"
                      value={userData.privacyLevel}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="standard">Standard - Basic protection for your data</option>
                      <option value="high">
                        High - Enhanced encryption and stricter sharing controls
                      </option>
                      <option value="maximum">
                        Maximum - Strongest protection with additional security checks
                      </option>
                    </select>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Data Sharing Controls</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="anonymizeSharingData"
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Anonymize data when sharing with healthcare providers
                        </span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="requireConsentForSharing"
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Require explicit consent for each sharing instance
                        </span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="limitSharingScope"
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Limit shared data to essential information only
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Access Logs</h3>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="trackDataAccess"
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Keep detailed logs of all data access
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Encryption Key Management */}
          {activeTab === 'encryption' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Encryption Key Management</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Your Encryption Key
                      </label>
                      <button
                        onClick={() => setShowEncryptionKey(!showEncryptionKey)}
                        className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                      >
                        {showEncryptionKey ? (
                          <EyeOff size={16} className="mr-1" />
                        ) : (
                          <Eye size={16} className="mr-1" />
                        )}
                        {showEncryptionKey ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className="flex">
                      <input
                        type={showEncryptionKey ? 'text' : 'password'}
                        value={encryptionKey}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-l-md bg-gray-50"
                      />
                      <button
                        className="bg-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-300"
                        onClick={() => {
                          navigator.clipboard.writeText(encryptionKey);
                          alert('Encryption key copied to clipboard!');
                        }}
                      >
                        Copy
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Keep this key safe. If lost, you won't be able to recover your data.
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3">Key Management Options</h3>
                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-center gap-2 bg-blue-100 text-blue-700 p-3 rounded-md hover:bg-blue-200">
                        <Key size={18} />
                        Generate New Encryption Key
                      </button>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-green-100 text-green-700 p-3 rounded-md hover:bg-green-200">
                          <Save size={18} />
                          Export Encryption Key
                        </button>

                        <button className="flex-1 flex items-center justify-center gap-2 bg-purple-100 text-purple-700 p-3 rounded-md hover:bg-purple-200">
                          <Database size={18} />
                          Import Encryption Key
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <div className="flex">
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700">
                            <strong>Remember:</strong> Your encryption key is never stored on our
                            servers. If you lose your encryption key, we cannot recover your data.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeTab === 'appearance' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Appearance Customization</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <label
                        className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer ${userData.theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                      >
                        <input
                          type="radio"
                          name="theme"
                          value="light"
                          checked={userData.theme === 'light'}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <Sun size={36} className="text-gray-700 mb-2" />
                        <span className="font-medium">Light Mode</span>
                      </label>

                      <label
                        className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer ${userData.theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                      >
                        <input
                          type="radio"
                          name="theme"
                          value="dark"
                          checked={userData.theme === 'dark'}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <Moon size={36} className="text-gray-700 mb-2" />
                        <span className="font-medium">Dark Mode</span>
                      </label>

                      <label
                        className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer ${userData.theme === 'system' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                      >
                        <input
                          type="radio"
                          name="theme"
                          value="system"
                          checked={userData.theme === 'system'}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <Smartphone size={36} className="text-gray-700 mb-2" />
                        <span className="font-medium">System Default</span>
                      </label>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Color Accent
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                      {['#3B82F6', '#0D9488', '#8B5CF6', '#EF4444', '#F59E0B', '#10B981'].map(
                        (color) => (
                          <button
                            key={color}
                            className={`h-10 rounded-full ${color === '#3B82F6' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                            style={{ backgroundColor: color }}
                            onClick={() => console.log(`Selected color: ${color}`)}
                          />
                        )
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Text Size
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {['Small', 'Medium', 'Large', 'Extra Large'].map((size) => (
                        <label
                          key={size}
                          className={`px-4 py-2 border rounded-md cursor-pointer ${size === 'Medium' ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
                        >
                          <input type="radio" name="textSize" className="sr-only" />
                          {size}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Layout Density
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {['Compact', 'Standard', 'Comfortable'].map((density) => (
                        <label
                          key={density}
                          className={`px-4 py-2 border rounded-md cursor-pointer ${density === 'Standard' ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
                        >
                          <input type="radio" name="layoutDensity" className="sr-only" />
                          {density}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Enable Notifications</h3>
                      <p className="text-sm text-gray-500">Master control for all notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="notificationsEnabled"
                        checked={userData.notificationsEnabled}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-4">Notification Types</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell size={18} className="text-blue-600 mr-2" />
                          <span>Medication Reminders</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="medicationReminders"
                            checked={userData.medicationReminders}
                            onChange={handleInputChange}
                            disabled={!userData.notificationsEnabled}
                            className="sr-only peer"
                          />
                          <div
                            className={`w-11 h-6 ${!userData.notificationsEnabled ? 'bg-gray-100' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                          ></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell size={18} className="text-purple-600 mr-2" />
                          <span>Appointment Alerts</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="appointmentAlerts"
                            checked={userData.appointmentAlerts}
                            onChange={handleInputChange}
                            disabled={!userData.notificationsEnabled}
                            className="sr-only peer"
                          />
                          <div
                            className={`w-11 h-6 ${!userData.notificationsEnabled ? 'bg-gray-100' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                          ></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell size={18} className="text-teal-600 mr-2" />
                          <span>Health Metric Alerts</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="healthMetricAlerts"
                            onChange={handleInputChange}
                            disabled={!userData.notificationsEnabled}
                            className="sr-only peer"
                          />
                          <div
                            className={`w-11 h-6 ${!userData.notificationsEnabled ? 'bg-gray-100' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                          ></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell size={18} className="text-red-600 mr-2" />
                          <span>Security Alerts</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="securityAlerts"
                            onChange={handleInputChange}
                            disabled={!userData.notificationsEnabled}
                            className="sr-only peer"
                          />
                          <div
                            className={`w-11 h-6 ${!userData.notificationsEnabled ? 'bg-gray-100' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                          ></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-4">Delivery Methods</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="inAppNotifications"
                          onChange={handleInputChange}
                          disabled={!userData.notificationsEnabled}
                          className={`h-4 w-4 rounded border-gray-300 ${userData.notificationsEnabled ? 'text-blue-600 focus:ring-blue-500' : 'text-gray-400'}`}
                        />
                        <span
                          className={`ml-2 text-sm ${!userData.notificationsEnabled ? 'text-gray-400' : 'text-gray-700'}`}
                        >
                          In-app notifications
                        </span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          onChange={handleInputChange}
                          disabled={!userData.notificationsEnabled}
                          className={`h-4 w-4 rounded border-gray-300 ${userData.notificationsEnabled ? 'text-blue-600 focus:ring-blue-500' : 'text-gray-400'}`}
                        />
                        <span
                          className={`ml-2 text-sm ${!userData.notificationsEnabled ? 'text-gray-400' : 'text-gray-700'}`}
                        >
                          Email notifications
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="pushNotifications"
                          onChange={handleInputChange}
                          disabled={!userData.notificationsEnabled}
                          className={`h-4 w-4 rounded border-gray-300 ${userData.notificationsEnabled ? 'text-blue-600 focus:ring-blue-500' : 'text-gray-400'}`}
                        />
                        <span
                          className={`ml-2 text-sm ${!userData.notificationsEnabled ? 'text-gray-400' : 'text-gray-700'}`}
                        >
                          Push notifications (mobile)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Retention */}
          {activeTab === 'data' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Data Retention Policies</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Data Storage Period</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Choose how long your data should be stored locally before archiving or
                      deletion
                    </p>
                    <select
                      name="dataRetentionPeriod"
                      value={userData.dataRetentionPeriod}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="3months">3 months</option>
                      <option value="6months">6 months</option>
                      <option value="1year">1 year</option>
                      <option value="2years">2 years</option>
                      <option value="indefinite">Indefinitely (until manually deleted)</option>
                    </select>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-4">Automated Data Management</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="autoArchiveOldData"
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Automatically archive data older than selected period
                        </span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="compressArchivedData"
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Compress archived data to save space
                        </span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="autoDeleteOldData"
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Automatically delete data older than selected period
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-4">Data Export & Backup</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-700 p-3 rounded-md hover:bg-blue-200">
                        <Database size={18} />
                        Export All Health Data
                      </button>

                      <button className="flex-1 flex items-center justify-center gap-2 bg-green-100 text-green-700 p-3 rounded-md hover:bg-green-200">
                        <Save size={18} />
                        Create Local Backup
                      </button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-4 text-red-600">Danger Zone</h3>
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                      <h4 className="text-red-700 font-medium mb-2">Delete All Health Data</h4>
                      <p className="text-sm text-red-600 mb-3">
                        This action cannot be undone. All your health records, measurements, and
                        reports will be permanently deleted.
                      </p>
                      <button className="bg-white border border-red-500 text-red-600 px-4 py-2 rounded-md hover:bg-red-50">
                        Delete All My Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
