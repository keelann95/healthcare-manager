'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Lock,
  UserCircle,
  Mail,
  EyeOff,
  Eye,
  User,
  ClipboardList,
  Stethoscope,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const router = useRouter();
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    // In a real app, you would handle authentication here
    console.log('Form submitted:', { isLogin, email, password, role, name });

    if (!isLogin) {
      setTimeout(() => {
        router.push('/onboarding');
      }, 1000);
    } else {
      router.push('/dashboard');
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        {/* Left Side - Branding */}
        <div className="bg-gradient-to-br from-blue-600 to-teal-500 p-8 md:w-2/5 flex flex-col justify-between text-white">
          <div>
            <h1 className="text-3xl font-bold mb-2">Decentralized Healthcare Data Manager</h1>
            <p className="opacity-80 mb-8">
              Your health data, in your control, secure and private.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <ShieldCheck size={20} />
                </div>
                <p>End-to-end encryption</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <ClipboardList size={20} />
                </div>
                <p>Local-first storage</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <Stethoscope size={20} />
                </div>
                <p>AI-powered health insights</p>
              </div>
            </div>
          </div>

          <p className="text-sm opacity-70">
            ©2025 Healthcare Data Manager. All data stays on your device.
          </p>
        </div>

        {/* Right Side - Auth Form */}
        <div className="p-8 md:w-3/5">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? 'Sign in to access your health data'
                : 'Join us and take control of your health information'}
            </p>
          </div>

          <div className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <UserCircle size={20} />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('patient')}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      role === 'patient'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <User size={24} />
                    <span className="mt-1 text-sm">Patient</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('provider')}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      role === 'provider'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <Stethoscope size={24} />
                    <span className="mt-1 text-sm">Provider</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('staff')}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      role === 'staff'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <ClipboardList size={24} />
                    <span className="mt-1 text-sm">Staff</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      role === 'admin'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <ShieldCheck size={24} />
                    <span className="mt-1 text-sm">Admin</span>
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="button"
              href="#"
              onClick={handleSubmit}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="ml-1 font-medium text-blue-600 hover:text-blue-500"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {!isLogin && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-start space-x-3">
              <div className="text-blue-500 flex-shrink-0 mt-1">
                <HelpCircle size={20} />
              </div>
              <p className="text-sm text-gray-600">
                By creating an account, your health data will be stored securely on your device. We
                never store your health information on our servers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
