'use client';

import React, { useState } from 'react';
import {
  BarChart2,
  TrendingUp,
  Users,
  Activity,
  Calendar,
  Filter,
  Download,
  RefreshCw,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Button from '../components/ui/Button';

const mockUserData = [
  { month: 'Jan', active: 8500, new: 1200 },
  { month: 'Feb', active: 9200, new: 1400 },
  { month: 'Mar', active: 9800, new: 1100 },
  { month: 'Apr', active: 10500, new: 1600 },
  { month: 'May', active: 11200, new: 1300 },
  { month: 'Jun', active: 12000, new: 1500 },
];

const mockStorageData = [
  { name: 'Patient Records', value: 45 },
  { name: 'System Files', value: 25 },
  { name: 'Backups', value: 20 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6M');

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-900 mb-2">Analytics Dashboard</h1>
          <p className="text-slate-600">System performance and usage metrics</p>
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
              <Activity className="h-6 w-6 text-purple-600" />
              <span className="text-sm text-slate-500">System Load</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">67%</span>
              <span className="ml-2 text-sm text-purple-600">Normal</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <span className="text-sm text-slate-500">Response Time</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">245ms</span>
              <span className="ml-2 text-sm text-green-600">Excellent</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <BarChart2 className="h-6 w-6 text-red-600" />
              <span className="text-sm text-slate-500">Error Rate</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">0.12%</span>
              <span className="ml-2 text-sm text-red-600">Last 24h</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-slate-500" />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1M">Last Month</option>
                  <option value="3M">Last 3 Months</option>
                  <option value="6M">Last 6 Months</option>
                  <option value="1Y">Last Year</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="secondary" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="secondary" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="primary" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Growth */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-blue-900 mb-6">User Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockUserData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="active" stroke="#3b82f6" name="Active Users" />
                <Line type="monotone" dataKey="new" stroke="#10b981" name="New Users" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* System Performance */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-blue-900 mb-6">System Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={[
                  { time: '00:00', cpu: 45, memory: 60 },
                  { time: '04:00', cpu: 35, memory: 55 },
                  { time: '08:00', cpu: 55, memory: 65 },
                  { time: '12:00', cpu: 85, memory: 75 },
                  { time: '16:00', cpu: 75, memory: 70 },
                  { time: '20:00', cpu: 65, memory: 65 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="cpu"
                  stroke="#3b82f6"
                  fill="#93c5fd"
                  name="CPU Usage"
                />
                <Area
                  type="monotone"
                  dataKey="memory"
                  stroke="#8b5cf6"
                  fill="#c4b5fd"
                  name="Memory Usage"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Storage Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-blue-900 mb-6">Storage Distribution</h2>
            <div className="flex items-center">
              <div className="w-1/2">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={mockStorageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mockStorageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2">
                <div className="space-y-2">
                  {mockStorageData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-sm text-slate-600">{item.name}</span>
                      <span className="ml-auto text-sm font-medium text-slate-900">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Error Tracking */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-blue-900 mb-6">Error Tracking</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={[
                  { type: 'API Errors', count: 23 },
                  { type: 'Auth Failures', count: 15 },
                  { type: 'System Errors', count: 8 },
                  { type: 'Network Issues', count: 12 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Activity */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">User Activity</h2>
            <div className="space-y-4">
              {[
                { metric: 'Active Sessions', value: '1,284', change: '+12%' },
                { metric: 'Avg. Session Duration', value: '24m', change: '+5%' },
                { metric: 'Bounce Rate', value: '32%', change: '-3%' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-slate-600">{item.metric}</span>
                  <div className="text-right">
                    <span className="block font-medium text-slate-900">{item.value}</span>
                    <span
                      className={`text-sm ${
                        item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">Performance Metrics</h2>
            <div className="space-y-4">
              {[
                { metric: 'Avg. Response Time', value: '245ms', status: 'good' },
                { metric: 'Server CPU Usage', value: '67%', status: 'warning' },
                { metric: 'Memory Usage', value: '8.2GB', status: 'good' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-slate-600">{item.metric}</span>
                  <div className="flex items-center">
                    <span className="font-medium text-slate-900 mr-2">{item.value}</span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item.status === 'good'
                          ? 'bg-green-100 text-green-700'
                          : item.status === 'warning'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">System Health</h2>
            <div className="space-y-4">
              {[
                { service: 'API Gateway', status: 'operational', uptime: '99.9%' },
                { service: 'Database', status: 'operational', uptime: '99.99%' },
                { service: 'Storage', status: 'operational', uptime: '100%' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <span className="block font-medium text-slate-900">{item.service}</span>
                    <span className="text-sm text-slate-500">Uptime: {item.uptime}</span>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === 'operational'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
