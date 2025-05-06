'use client';
import React from 'react';
import Link from 'next/link';
import {
  Users,
  Settings,
  FileText,
  BarChart2,
  Shield,
  Activity,
  Bell,
  Server,
  Database,
  AlertTriangle,
} from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">System overview and management</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-6 w-6 text-blue-600" />
              <span className="text-sm text-slate-500">Total Users</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">12,847</span>
              <span className="ml-2 text-sm text-green-600">+15% this month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Server className="h-6 w-6 text-purple-600" />
              <span className="text-sm text-slate-500">System Health</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">99.9%</span>
              <span className="ml-2 text-sm text-purple-600">Uptime</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Database className="h-6 w-6 text-green-600" />
              <span className="text-sm text-slate-500">Storage Used</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">4.2 TB</span>
              <span className="ml-2 text-sm text-green-600">of 10 TB</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <span className="text-sm text-slate-500">Active Alerts</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">3</span>
              <span className="ml-2 text-sm text-red-600">Critical</span>
            </div>
          </div>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            href="/admin/users"
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-50 rounded-lg mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-blue-900">User Management</h2>
            </div>
            <p className="text-slate-600 mb-4">
              Manage user accounts, roles, and permissions. Handle access control and user
              authentication.
            </p>
            <div className="flex items-center text-blue-600">
              <span className="text-sm font-medium">Manage Users</span>
              <Activity className="h-4 w-4 ml-2" />
            </div>
          </Link>

          <Link
            href="/admin/settings"
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-50 rounded-lg mr-4">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold text-blue-900">System Settings</h2>
            </div>
            <p className="text-slate-600 mb-4">
              Configure system-wide settings, security policies, and integration parameters.
            </p>
            <div className="flex items-center text-purple-600">
              <span className="text-sm font-medium">Configure Settings</span>
              <Activity className="h-4 w-4 ml-2" />
            </div>
          </Link>

          <Link
            href="/admin/audit"
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-50 rounded-lg mr-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-blue-900">Audit Logs</h2>
            </div>
            <p className="text-slate-600 mb-4">
              Review system activity, security events, and user actions for compliance.
            </p>
            <div className="flex items-center text-green-600">
              <span className="text-sm font-medium">View Logs</span>
              <Activity className="h-4 w-4 ml-2" />
            </div>
          </Link>

          <Link
            href="/admin/analytics"
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-yellow-50 rounded-lg mr-4">
                <BarChart2 className="h-6 w-6 text-yellow-600" />
              </div>
              <h2 className="text-lg font-semibold text-blue-900">Analytics</h2>
            </div>
            <p className="text-slate-600 mb-4">
              Monitor system performance, user engagement, and health data metrics.
            </p>
            <div className="flex items-center text-yellow-600">
              <span className="text-sm font-medium">View Analytics</span>
              <Activity className="h-4 w-4 ml-2" />
            </div>
          </Link>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-red-50 rounded-lg mr-4">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold text-blue-900">Security Center</h2>
            </div>
            <p className="text-slate-600 mb-4">
              Monitor security alerts, manage encryption keys, and review access patterns.
            </p>
            <div className="flex items-center text-red-600">
              <span className="text-sm font-medium">View Security</span>
              <Activity className="h-4 w-4 ml-2" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-50 rounded-lg mr-4">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-blue-900">Notifications</h2>
            </div>
            <p className="text-slate-600 mb-4">
              Manage system notifications, alerts, and communication settings.
            </p>
            <div className="flex items-center text-blue-600">
              <span className="text-sm font-medium">Configure Notifications</span>
              <Activity className="h-4 w-4 ml-2" />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-6">Recent System Activity</h2>
          <div className="space-y-4">
            {[
              {
                type: 'security',
                message: 'Failed login attempts detected from IP 192.168.1.100',
                time: '5 minutes ago',
                severity: 'high',
              },
              {
                type: 'system',
                message: 'Database backup completed successfully',
                time: '1 hour ago',
                severity: 'info',
              },
              {
                type: 'user',
                message: 'New provider account created and verified',
                time: '2 hours ago',
                severity: 'success',
              },
              {
                type: 'performance',
                message: 'High CPU usage detected on primary server',
                time: '3 hours ago',
                severity: 'warning',
              },
            ].map((activity, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  activity.severity === 'high'
                    ? 'bg-red-50 border-red-100'
                    : activity.severity === 'warning'
                      ? 'bg-yellow-50 border-yellow-100'
                      : activity.severity === 'success'
                        ? 'bg-green-50 border-green-100'
                        : 'bg-blue-50 border-blue-100'
                } border`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.severity === 'high'
                          ? 'bg-red-100 text-red-700'
                          : activity.severity === 'warning'
                            ? 'bg-yellow-100 text-yellow-700'
                            : activity.severity === 'success'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                      } mr-3`}
                    >
                      {activity.type.toUpperCase()}
                    </span>
                    <span className="text-slate-700">{activity.message}</span>
                  </div>
                  <span className="text-sm text-slate-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
