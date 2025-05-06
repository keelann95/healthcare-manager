'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield,
  User,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  Activity,
  FileText,
  Calendar,
  ClipboardList,
  Database,
  Lock,
  HelpCircle,
  UserPlus,
  AlertCircle,
  Heart,
  PieChart,
  Send,
  MessageSquare,
  Home,
  BarChart2,
  Download,
  Upload,
  Pill,
  Share2,
  Key,
  Cpu,
  AlarmClock,
  FileCode,
  LifeBuoy,
  Server,
  AlertTriangle,
  Zap,
  UserCheck,
  BookOpen,
  Cloud,
  Monitor,
  RefreshCw,
  LogIn,
} from 'lucide-react';
import Button from './ui/Button';

// Base Header component with common functionality
const BaseHeader = ({
  logo,
  title,
  navItems,
  actionButton,
  userRole,
  userAvatar,
  notificationCount = 0,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-3 border-b border-gray-100'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            {logo}
            <span className="text-xl font-bold text-blue-900">{title}</span>
            {userRole && (
              <span className="hidden md:inline-block ml-2 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                {userRole}
              </span>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 relative">
            {navItems.slice(0, 4).map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
              >
                {item.icon && <span className="mr-1.5">{item.icon}</span>}
                {item.label}
              </a>
            ))}

            {/* More dropdown */}
            {navItems.length > 4 && (
              <div className="relative group">
                <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
                  More
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute top-full mt-2 w-40 bg-white border rounded shadow-lg hidden group-hover:block z-50">
                  {navItems.slice(4).map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-zinc-300  items-center"
                    >
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* Desktop Action Area */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            {notificationCount > 0 && (
              <div className="relative">
                <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                </button>
              </div>
            )}

            {/* User Menu */}
            {userAvatar && (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                    {userAvatar}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {/* DOWN ARROW */}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <User className="h-4 w-4 mr-2" /> Profile
                    </a>
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Settings className="h-4 w-4 mr-2" /> Settings
                    </a>
                    <hr className="my-1 border-gray-200" />
                    <a
                      href="/logout"
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Sign out
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Action Button */}
            {actionButton && (
              <Button
                href={actionButton.href}
                variant={actionButton.variant || 'primary'}
                size="sm"
              >
                {actionButton.icon && <span className="mr-1">{actionButton.icon}</span>}
                {actionButton.label}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-900 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-3">
            {userRole && (
              <div className="px-2 py-1.5 bg-blue-50 text-blue-700 text-xs rounded-md mb-2 inline-block w-min">
                {userRole}
              </div>
            )}

            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </a>
            ))}

            <hr className="my-2 border-gray-200" />

            {userAvatar && (
              <>
                <a href="/profile" className="flex items-center text-gray-700 hover:text-blue-600">
                  <User className="h-4 w-4 mr-2" /> My Profile
                </a>
                <a href="/settings" className="flex items-center text-gray-700 hover:text-blue-600">
                  <Settings className="h-4 w-4 mr-2" /> Settings
                </a>
              </>
            )}

            {actionButton && (
              <Button
                href={actionButton.href}
                variant={actionButton.variant || 'primary'}
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center mt-2"
              >
                {actionButton.icon && <span className="mr-1.5">{actionButton.icon}</span>}
                {actionButton.label}
              </Button>
            )}

            {userAvatar && (
              <a
                href="/logout"
                className="flex items-center text-red-600 hover:text-red-700 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogOut className="h-4 w-4 mr-2" /> Sign out
              </a>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

// 1. Admin Header - Comprehensive system administration view
export const AdminHeader = ({ userName = 'Admin User', notificationCount = 0 }) => {
  const adminNavItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <PieChart className="h-4 w-4" /> },
    { label: 'User Management', href: '/admin/users', icon: <Users className="h-4 w-4" /> },
    { label: 'Data Management', href: '/admin/data', icon: <Database className="h-4 w-4" /> },
    { label: 'Security', href: '/admin/security', icon: <Lock className="h-4 w-4" /> },
    { label: 'Analytics', href: '/admin/analytics', icon: <BarChart2 className="h-4 w-4" /> },
    { label: 'Audit Logs', href: '/admin/audit-logs', icon: <FileText className="h-4 w-4" /> },
    { label: 'System Settings', href: '/admin/settings', icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <BaseHeader
      logo={<Shield className="h-8 w-8 text-blue-600" />}
      title="DHDM Admin"
      navItems={adminNavItems}
      actionButton={{
        label: 'Add User',
        href: '/admin/users/add',
        icon: <UserPlus className="h-4 w-4" />,
      }}
      userRole="System Administrator"
      userAvatar={<User className="h-5 w-5 text-blue-600" />}
      notificationCount={notificationCount}
    />
  );
};

// 2. Healthcare Provider Header - Focus on patient care
export const ProviderHeader = ({ providerName = 'Dr. Smith', notificationCount = 3 }) => {
  const providerNavItems = [
    { label: 'Dashboard', href: '/provider/dashboard', icon: <Activity className="h-4 w-4" /> },
    { label: 'Patients', href: '/provider/patients', icon: <Users className="h-4 w-4" /> },
    {
      label: 'Appointments',
      href: '/provider/appointments',
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      label: 'Health Records',
      href: '/provider/records',
      icon: <ClipboardList className="h-4 w-4" />,
    },
    { label: 'Medications', href: '/provider/medications', icon: <Pill className="h-4 w-4" /> },
    {
      label: 'Data Visualizations',
      href: '/provider/visualizations',
      icon: <BarChart2 className="h-4 w-4" />,
    },
    { label: 'Messages', href: '/provider/messages', icon: <MessageSquare className="h-4 w-4" /> },
  ];

  return (
    <BaseHeader
      logo={<Activity className="h-8 w-8 text-teal-600" />}
      title="Provider Portal"
      navItems={providerNavItems}
      actionButton={{
        label: 'New Patient',
        href: '/provider/patients/add',
        variant: 'secondary',
        icon: <UserPlus className="h-4 w-4" />,
      }}
      userRole="Healthcare Provider"
      userAvatar={<User className="h-5 w-5 text-teal-600" />}
      notificationCount={notificationCount}
    />
  );
};

// 3. Patient Header - Focus on personal health management
export const PatientHeader = ({ patientName = 'Jane Doe', notificationCount = 2 }) => {
  const patientNavItems = [
    { label: 'Dashboard', href: '/patient/dashboard', icon: <Heart className="h-4 w-4" /> },
    { label: 'Health Data', href: '/patient/data', icon: <BarChart2 className="h-4 w-4" /> },
    { label: 'Medical Records', href: '/patient/records', icon: <FileText className="h-4 w-4" /> },
    { label: 'Medications', href: '/patient/medications', icon: <Pill className="h-4 w-4" /> },
    {
      label: 'Appointments',
      href: '/patient/appointments',
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      label: 'Data Import/Export',
      href: '/patient/data-transfer',
      icon: <RefreshCw className="h-4 w-4" />,
    },
    { label: 'Secure Sharing', href: '/patient/share', icon: <Share2 className="h-4 w-4" /> },
    { label: 'AI Insights', href: '/patient/insights', icon: <Cpu className="h-4 w-4" /> },
    { label: 'Messages', href: '/patient/messages', icon: <MessageSquare className="h-4 w-4" /> },
  ];

  return (
    <BaseHeader
      logo={<Heart className="h-8 w-8 text-red-500" />}
      title="My HealthData"
      navItems={patientNavItems}
      actionButton={{
        label: 'Share Data',
        href: '/patient/share',
        variant: 'outline',
        icon: <Send className="h-4 w-4" />,
      }}
      userRole="Patient"
      userAvatar={<User className="h-5 w-5 text-red-500" />}
      notificationCount={notificationCount}
    />
  );
};

// Export a component that allows selecting the appropriate header based on user role
export const defaultHeader = ({ userRole, userData }) => {
  switch (userRole) {
    case 'admin':
      return <AdminHeader userName={userData?.name} notificationCount={userData?.notifications} />;
    case 'provider':
      return (
        <ProviderHeader providerName={userData?.name} notificationCount={userData?.notifications} />
      );
    case 'patient':
      return (
        <PatientHeader patientName={userData?.name} notificationCount={userData?.notifications} />
      );

    default:
      // Default public header
      return (
        <BaseHeader
          logo={<Shield className="h-8 w-8 text-blue-600" />}
          title="DHDM"
          navItems={[
            { label: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
            { label: 'Features', href: '#features', icon: <Zap className="h-4 w-4" /> },
            {
              label: 'How It Works',
              href: '#how-it-works',
              icon: <Activity className="h-4 w-4" />,
            },
            {
              label: 'Testimonials',
              href: '#testimonials',
              icon: <UserCheck className="h-4 w-4" />,
            },
            { label: 'Support', href: '/support', icon: <LifeBuoy className="h-4 w-4" /> },
          ]}
          actionButton={{
            label: 'Get Started',
            href: '/Authenticator',
            icon: <LogIn className="h-4 w-4" />,
          }}
        />
      );
  }
};

export default defaultHeader;
