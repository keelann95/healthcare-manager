'use client';
import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Download,
  AlertTriangle,
  Shield,
  User,
  Database,
  Settings,
} from 'lucide-react';
import Button from '../components/ui/Button';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  status: 'success' | 'warning' | 'error';
  details: string;
}

const mockAuditLogs: AuditLog[] = [
  {
    id: 'LOG001',
    timestamp: '2024-03-15 14:30:00',
    user: 'admin@system.com',
    action: 'User Login',
    resource: 'Authentication',
    status: 'success',
    details: 'Successful login from IP 192.168.1.100',
  },
  {
    id: 'LOG002',
    timestamp: '2024-03-15 14:25:00',
    user: 'doctor@hospital.com',
    action: 'Access Patient Record',
    resource: 'Patient Data',
    status: 'warning',
    details: 'Accessed sensitive patient information',
  },
  {
    id: 'LOG003',
    timestamp: '2024-03-15 14:20:00',
    user: 'system',
    action: 'Backup Created',
    resource: 'System',
    status: 'success',
    details: 'Automated system backup completed',
  },
];

const AuditLogs = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [logType, setLogType] = useState('all');

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-900 mb-2">Audit Logs</h1>
          <p className="text-slate-600">Track and monitor system activity</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
              <span className="text-sm text-slate-500">Total Logs</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">45,827</span>
              <span className="ml-2 text-sm text-blue-600">entries</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <span className="text-sm text-slate-500">Security Events</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">12</span>
              <span className="ml-2 text-sm text-red-600">alerts today</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <User className="h-6 w-6 text-green-600" />
              <span className="text-sm text-slate-500">User Activity</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">2,847</span>
              <span className="ml-2 text-sm text-green-600">actions today</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Database className="h-6 w-6 text-purple-600" />
              <span className="text-sm text-slate-500">Data Access</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">1,284</span>
              <span className="ml-2 text-sm text-purple-600">records accessed</span>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <select
                value={logType}
                onChange={(e) => setLogType(e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Logs</option>
                <option value="security">Security</option>
                <option value="user">User Activity</option>
                <option value="system">System</option>
              </select>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="secondary" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="primary" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </div>
          </div>
        </div>

        {/* Log Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-lg font-semibold text-blue-900">Security Events</h2>
            </div>
            <div className="space-y-4">
              {[
                { event: 'Failed Login Attempts', count: 5 },
                { event: 'Permission Changes', count: 12 },
                { event: 'Access Violations', count: 3 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-slate-600">{item.event}</span>
                  <span className="font-medium text-red-600">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center mb-4">
              <User className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-lg font-semibold text-blue-900">User Activity</h2>
            </div>
            <div className="space-y-4">
              {[
                { event: 'Record Access', count: 245 },
                { event: 'Data Updates', count: 67 },
                { event: 'User Sessions', count: 89 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-slate-600">{item.event}</span>
                  <span className="font-medium text-green-600">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center mb-4">
              <Settings className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-lg font-semibold text-blue-900">System Events</h2>
            </div>
            <div className="space-y-4">
              {[
                { event: 'System Updates', count: 8 },
                { event: 'Backups', count: 24 },
                { event: 'Maintenance', count: 2 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-slate-600">{item.event}</span>
                  <span className="font-medium text-purple-600">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockAuditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {log.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {log.resource}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          log.status === 'success'
                            ? 'bg-green-100 text-green-700'
                            : log.status === 'warning'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {log.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Showing 1 to 10 of 45,827 entries</div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
                  Previous
                </button>
                <button className="px-3 py-1 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
