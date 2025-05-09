'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  UserCircle,
  Shield,
  Database,
  Upload,
  Settings,
  Home,
  FileText,
  BarChart,
  Bell,
  Heart,
  Lock,
  CheckSquare,
  HelpCircle,
  ChevronRight,
  AlertCircle,
  Download,
  LucideProps,
} from 'lucide-react';

// Type definitions
interface UserData {
  name: string;
  birthdate: string;
  gender: string;
  height: string;
  weight: string;
}

interface PrivacyPreferences {
  localStorageOnly: boolean;
  anonymousAnalytics: boolean;
  encryptData: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly' | 'manual';
}

interface EnabledFeatures {
  medicationReminders: boolean;
  healthInsights: boolean;
  dataSharing: boolean;
  emergencyAccess: boolean;
}

interface FeatureItemProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
}

interface ToggleOptionProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
  isEnabled: boolean;
  onChange: () => void;
}

interface BackupOptionProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

interface ImportOptionProps {
  title: string;
  description: string;
  icon: React.ComponentType<LucideProps>;
  isSelected: boolean;
  onClick: () => void;
  isDisabled: boolean;
}

interface NextStepItemProps {
  title: string;
  description: string;
}

export default function OnboardingExperience() {
  // Current step in the onboarding process
  const [currentStep, setCurrentStep] = useState(1);
  // Total number of steps
  const totalSteps = 5;

  // Form data states
  const [userData, setUserData] = useState({
    name: '',
    birthdate: '',
    gender: '',
    height: '',
    weight: '',
  });

  // Privacy preference states
  const [privacyPreferences, setPrivacyPreferences] = useState({
    localStorageOnly: true,
    anonymousAnalytics: false,
    encryptData: true,
    backupFrequency: 'weekly',
  });

  // Data import states
  const [selectedImportOption, setSelectedImportOption] = useState<string | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);

  // Feature config states
  const [enabledFeatures, setEnabledFeatures] = useState({
    medicationReminders: true,
    healthInsights: true,
    dataSharing: false,
    emergencyAccess: false,
  });

  const router = useRouter();
  // Progress bar calculation
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Helper function to handle user data input changes
  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Helper function to handle privacy preference toggles
  const handlePrivacyToggle = (key: keyof PrivacyPreferences) => {
    setPrivacyPreferences({
      ...privacyPreferences,
      [key]: !privacyPreferences[key],
    });
  };

  // Helper function to handle feature toggles
  const handleFeatureToggle = (key: keyof EnabledFeatures) => {
    setEnabledFeatures({
      ...enabledFeatures,
      [key]: !enabledFeatures[key],
    });
  };

  // Simulate import process
  const startImport = (option: string) => {
    setSelectedImportOption(option);
    setIsImporting(true);
    setImportProgress(0);

    // Simulated import progress
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  // Navigation functions
  const nextStep = () => {
    if (currentStep < totalSteps) {
      window.scrollTo(0, 0);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      window.scrollTo(0, 0);
      setCurrentStep(currentStep - 1);
    }
  };

  // Skip onboarding (for returning users or testing)
  const skipOnboarding = () => {
    // In a real app, you would redirect to the dashboard
    alert('Skipping onboarding! In a real app, you would be redirected to the dashboard.');
  };

  // Complete onboarding
  const completeOnboarding = () => {
    // In a real app, you would save all data and redirect to the dashboard
    alert(
      'Onboarding completed! In a real app, you would be redirected to the dashboard with your preferences saved.'
    );
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Heart className="text-blue-600 h-8 w-8 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">HealthData Manager</h1>
          </div>
          <button onClick={skipOnboarding} className="text-sm text-gray-500 hover:text-gray-700">
            Skip setup
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white px-6 py-3 border-b border-gray-200">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{stepTitle(currentStep)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col">
        {/* Step 1: Welcome & Feature Introduction */}
        {currentStep === 1 && (
          <div className="max-w-3xl mx-auto w-full">
            <div className="text-center mb-8">
              <div className="bg-blue-100 p-6 inline-block rounded-full mb-4">
                <Heart className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Your Health Data Manager
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Your personal health data assistant that keeps your information secure, private, and
                always accessible.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
                <div className="space-y-6">
                  <FeatureItem
                    icon={Shield}
                    title="Privacy-First Architecture"
                    description="All your health data is stored locally on your device with strong encryption. No data is sent to any servers."
                  />
                  <FeatureItem
                    icon={BarChart}
                    title="Interactive Visualizations"
                    description="See your health trends and patterns with interactive charts and personalized insights."
                  />
                  <FeatureItem
                    icon={Bell}
                    title="Medication Management"
                    description="Set reminders for medications and track adherence over time."
                  />
                  <FeatureItem
                    icon={QrCodeIcon}
                    title="Secure Data Sharing"
                    description="Share specific health information with healthcare providers using secure QR codes."
                  />
                  <FeatureItem
                    icon={Download}
                    title="Import Health Records"
                    description="Import data from standard healthcare formats like FHIR, HL7, and PDF reports."
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
              <div className="flex">
                <AlertCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-900 mb-2">Privacy Notice</h3>
                  <p className="text-blue-800">
                    This app is designed with privacy at its core. Your health data never leaves
                    your device unless you explicitly choose to share it. We use local storage and
                    encryption to keep your information secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Basic Profile Setup */}
        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto w-full">
            <div className="text-center mb-8">
              <div className="bg-blue-100 p-4 inline-block rounded-full mb-4">
                <UserCircle className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Health Profile</h2>
              <p className="text-gray-600">
                Let's set up your basic health information to personalize your experience. All data
                remains private on your device.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <form>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleUserDataChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="birthdate"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Birth Date
                      </label>
                      <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        value={userData.birthdate}
                        onChange={handleUserDataChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="gender"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={userData.gender}
                        onChange={handleUserDataChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="height"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        id="height"
                        name="height"
                        value={userData.height}
                        onChange={handleUserDataChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="175"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="weight"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={userData.weight}
                        onChange={handleUserDataChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="70"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mt-6">
              <div className="flex">
                <Info className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                <p className="text-sm text-yellow-700">
                  This information helps tailor health insights and recommendations. You can update
                  or remove it anytime from your profile settings.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Privacy Settings Configuration */}
        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto w-full">
            <div className="text-center mb-8">
              <div className="bg-blue-100 p-4 inline-block rounded-full mb-4">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Configure Privacy Settings</h2>
              <p className="text-gray-600">
                Control how your data is stored, protected, and managed within the application.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="space-y-6">
                  <ToggleOption
                    icon={Database}
                    title="Local Storage Only"
                    description="Store all data exclusively on your device. No cloud sync available when enabled."
                    isEnabled={privacyPreferences.localStorageOnly}
                    onChange={() => handlePrivacyToggle('localStorageOnly')}
                  />

                  <ToggleOption
                    icon={BarChart}
                    title="Anonymous Analytics"
                    description="Share anonymous usage data to help improve the application (no personal or health data included)."
                    isEnabled={privacyPreferences.anonymousAnalytics}
                    onChange={() => handlePrivacyToggle('anonymousAnalytics')}
                  />

                  <ToggleOption
                    icon={Lock}
                    title="Data Encryption"
                    description="Encrypt all health data stored on your device with AES-256 encryption."
                    isEnabled={privacyPreferences.encryptData}
                    onChange={() => handlePrivacyToggle('encryptData')}
                  />

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-3">Backup Frequency</h3>
                    <div className="grid grid-cols-4 gap-3">
                      <BackupOption
                        label="Daily"
                        isSelected={privacyPreferences.backupFrequency === 'daily'}
                        onClick={() =>
                          setPrivacyPreferences({ ...privacyPreferences, backupFrequency: 'daily' })
                        }
                      />
                      <BackupOption
                        label="Weekly"
                        isSelected={privacyPreferences.backupFrequency === 'weekly'}
                        onClick={() =>
                          setPrivacyPreferences({
                            ...privacyPreferences,
                            backupFrequency: 'weekly',
                          })
                        }
                      />
                      <BackupOption
                        label="Monthly"
                        isSelected={privacyPreferences.backupFrequency === 'monthly'}
                        onClick={() =>
                          setPrivacyPreferences({
                            ...privacyPreferences,
                            backupFrequency: 'monthly',
                          })
                        }
                      />
                      <BackupOption
                        label="Manual"
                        isSelected={privacyPreferences.backupFrequency === 'manual'}
                        onClick={() =>
                          setPrivacyPreferences({
                            ...privacyPreferences,
                            backupFrequency: 'manual',
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mt-6">
              <div className="flex">
                <Shield className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                <p className="text-sm text-green-700">
                  Your privacy is our priority. All settings can be adjusted anytime from the
                  Privacy & Security section in your profile.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Data Import Assistant */}
        {currentStep === 4 && (
          <div className="max-w-3xl mx-auto w-full">
            <div className="text-center mb-8">
              <div className="bg-blue-100 p-4 inline-block rounded-full mb-4">
                <Upload className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Import Your Health Data</h2>
              <p className="text-gray-600">
                Get started with your existing health records or start fresh. All imports are
                processed locally on your device.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Import Options</h3>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <ImportOption
                    title="FHIR Health Records"
                    description="Standard format used by many healthcare providers"
                    icon={FileText}
                    isSelected={selectedImportOption === 'fhir'}
                    onClick={() => !isImporting && startImport('fhir')}
                    isDisabled={isImporting}
                  />

                  <ImportOption
                    title="HL7 Medical Data"
                    description="Clinical and administrative data"
                    icon={Database}
                    isSelected={selectedImportOption === 'hl7'}
                    onClick={() => !isImporting && startImport('hl7')}
                    isDisabled={isImporting}
                  />

                  <ImportOption
                    title="Apple Health"
                    description="Import from Apple Health Export"
                    icon={Heart}
                    isSelected={selectedImportOption === 'apple'}
                    onClick={() => !isImporting && startImport('apple')}
                    isDisabled={isImporting}
                  />

                  <ImportOption
                    title="Google Fit"
                    description="Activity and health data from Google Fit"
                    icon={BarChart}
                    isSelected={selectedImportOption === 'google'}
                    onClick={() => !isImporting && startImport('google')}
                    isDisabled={isImporting}
                  />
                </div>

                {isImporting && (
                  <div className="mb-6">
                    <p className="font-medium text-gray-700 mb-2">
                      Importing {getImportTypeName(selectedImportOption)}...
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${importProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>Processing files</span>
                      <span>{importProgress}%</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-md mr-4">
                    <Plus className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Start with a Clean Slate</h4>
                    <p className="text-sm text-gray-600">
                      You can also skip importing and start fresh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex">
                <HelpCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800 mb-1">Need help importing?</h4>
                  <p className="text-sm text-blue-700">
                    Check our{' '}
                    <a href="#" className="underline font-medium">
                      step-by-step guide
                    </a>{' '}
                    on how to export your health data from various providers and import it here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Feature Configuration & Completion */}
        {currentStep === 5 && (
          <div className="max-w-2xl mx-auto w-full">
            <div className="text-center mb-8">
              <div className="bg-blue-100 p-4 inline-block rounded-full mb-4">
                <Settings className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Configure Your Experience</h2>
              <p className="text-gray-600">
                Last step! Choose which features you'd like to enable for your health data
                management.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
              <div className="p-6">
                <div className="space-y-6">
                  <ToggleOption
                    icon={Bell}
                    title="Medication Reminders"
                    description="Get notifications for medication schedules and refills."
                    isEnabled={enabledFeatures.medicationReminders}
                    onChange={() => handleFeatureToggle('medicationReminders')}
                  />

                  <ToggleOption
                    icon={BarChart}
                    title="Health Insights"
                    description="Receive personalized insights based on your health data trends."
                    isEnabled={enabledFeatures.healthInsights}
                    onChange={() => handleFeatureToggle('healthInsights')}
                  />

                  <ToggleOption
                    icon={QrCodeIcon}
                    title="QR Code Data Sharing"
                    description="Generate QR codes to securely share specific health information with providers."
                    isEnabled={enabledFeatures.dataSharing}
                    onChange={() => handleFeatureToggle('dataSharing')}
                  />

                  <ToggleOption
                    icon={AlertCircle}
                    title="Emergency Access"
                    description="Set up emergency access for critical health information."
                    isEnabled={enabledFeatures.emergencyAccess}
                    onChange={() => handleFeatureToggle('emergencyAccess')}
                  />
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-800 mb-2">
                    Ready to Take Control of Your Health Data
                  </h4>
                  <p className="text-green-700">
                    You've successfully set up your Health Data Manager. Your selected preferences
                    have been saved, and you can change any of these settings later in the
                    application.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-4">Next Steps:</h3>
              <div className="space-y-3">
                <NextStepItem
                  title="Add your medications and set reminders"
                  description="Keep track of your medication schedule with automated reminders"
                />
                <NextStepItem
                  title="Import detailed health records"
                  description="Add specific health documents and test results to your profile"
                />
                <NextStepItem
                  title="Explore your health dashboard"
                  description="View interactive charts and analytics of your health data"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Navigation Buttons */}
      <div className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="container mx-auto flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-4 py-2 flex items-center ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={completeOnboarding}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center"
            >
              Complete Setup
              <CheckCircle className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper components
const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, description }) => (
  <div className="flex items-start">
    <div className="bg-blue-50 p-2 rounded-md mr-4">
      <Icon className="h-5 w-5 text-blue-600" />
    </div>
    <div>
      <h4 className="font-medium text-gray-800 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const QrCodeIcon = (props: any) => <QrCode {...props} />;

const ToggleOption = ({
  icon: Icon,
  title,
  description,
  isEnabled,
  onChange,
}: {
  icon: any;
  title: any;
  description: any;
  isEnabled: any;
  onChange: any;
}) => (
  <div className="flex items-start justify-between">
    <div className="flex items-start flex-1">
      <div className={`p-2 rounded-md mr-4 ${isEnabled ? 'bg-blue-50' : 'bg-gray-100'}`}>
        <Icon className={`h-5 w-5 ${isEnabled ? 'text-blue-600' : 'text-gray-500'}`} />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
    <div className="ml-4">
      <button
        type="button"
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isEnabled ? 'bg-blue-600' : 'bg-gray-200'
        }`}
        onClick={onChange}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isEnabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  </div>
);

const BackupOption = ({
  label,
  isSelected,
  onClick,
}: {
  label: any;
  isSelected: any;
  onClick: any;
}) => (
  <button
    className={`py-2 px-3 rounded-md text-sm font-medium transition ${
      isSelected
        ? 'bg-blue-100 text-blue-700 border border-blue-200'
        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

// / Continuing the implementation of additional components needed for OnboardingExperience.tsx

// Helper components for showing next steps in Step 5
const NextStepItem = ({ title, description }: { title: any; description: any }) => (
  <div className="flex items-center">
    <div className="bg-blue-100 p-1 rounded-full mr-3">
      <ChevronRight className="h-4 w-4 text-blue-600" />
    </div>
    <div>
      <h4 className="font-medium text-gray-800">{title}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

// Additional icons used in the onboarding experience
const QrCode = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <rect x="6" y="6" width="3" height="3" />
    <rect x="15" y="6" width="3" height="3" />
    <rect x="6" y="15" width="3" height="3" />
    <rect x="15" y="15" width="3" height="3" />
    <path d="M9 9h6" />
    <path d="M9 12h3" />
    <path d="M12 9v6" />
    <path d="M15 12h-3" />
  </svg>
);

const Info = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const Plus = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

// Helper function to get import type name for display
const getImportTypeName = (type: string | null) => {
  switch (type) {
    case 'fhir':
      return 'FHIR Health Records';
    case 'hl7':
      return 'HL7 Medical Data';
    case 'apple':
      return 'Apple Health Data';
    case 'google':
      return 'Google Fit Data';
    default:
      return 'Data';
  }
};

// Helper function to get step title based on current step
const stepTitle = (step: number) => {
  switch (step) {
    case 1:
      return 'Welcome & Introduction';
    case 2:
      return 'Personal Profile';
    case 3:
      return 'Privacy Settings';
    case 4:
      return 'Data Import';
    case 5:
      return 'Finalize Setup';
    default:
      return '';
  }
};

const ImportOption = ({
  title,
  description,
  icon: Icon,
  isSelected,
  onClick,
  isDisabled,
}: {
  title: any;
  description: any;
  icon: any;
  isSelected: any;
  onClick: any;
  isDisabled: any;
}) => (
  <button
    className={`flex items-start p-4 rounded-lg border transition ${
      isDisabled
        ? 'cursor-not-allowed opacity-60'
        : isSelected
          ? 'border-blue-500 bg-blue-50 shadow-sm'
          : 'border-gray-200 hover:bg-gray-50'
    }`}
    onClick={onClick}
    disabled={isDisabled}
  >
    <div className={`p-2 mr-3 rounded-md ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
      <Icon className={`h-5 w-5 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
    </div>
    <div className="text-left">
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </button>
);
