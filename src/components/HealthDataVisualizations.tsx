'use client';
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Download, Share2, Calendar, Filter, RefreshCw } from 'lucide-react';
import Button from '../components/ui/Button';

const mockHealthData = [
  { date: '2024-01', glucose: 95, cholesterol: 180, weight: 70, bloodPressure: 120 },
  { date: '2024-02', glucose: 98, cholesterol: 175, weight: 69, bloodPressure: 118 },
  { date: '2024-03', glucose: 92, cholesterol: 172, weight: 68, bloodPressure: 115 },
  { date: '2024-04', glucose: 96, cholesterol: 170, weight: 68, bloodPressure: 117 },
  { date: '2024-05', glucose: 94, cholesterol: 168, weight: 67, bloodPressure: 116 },
  { date: '2024-06', glucose: 93, cholesterol: 165, weight: 67, bloodPressure: 114 },
];

const HealthDataVisualizations = () => {
  const [timeRange, setTimeRange] = useState('6M');
  const [metricView, setMetricView] = useState('all');

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-900 mb-2">Health Data Analytics</h1>
          <p className="text-slate-600">Track and analyze your health metrics over time</p>
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
                  <option value="ALL">All Time</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-slate-500" />
                <select
                  value={metricView}
                  onChange={(e) => setMetricView(e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Metrics</option>
                  <option value="glucose">Glucose</option>
                  <option value="cholesterol">Cholesterol</option>
                  <option value="weight">Weight</option>
                  <option value="bloodPressure">Blood Pressure</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="secondary" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="secondary" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="primary" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Trends Over Time */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-blue-900 mb-6">Health Metrics Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockHealthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="glucose" stroke="#3b82f6" name="Glucose" />
                <Line type="monotone" dataKey="cholesterol" stroke="#8b5cf6" name="Cholesterol" />
                <Line type="monotone" dataKey="weight" stroke="#10b981" name="Weight" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Comparisons */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-blue-900 mb-6">Monthly Comparisons</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockHealthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bloodPressure" fill="#3b82f6" name="Blood Pressure" />
                <Bar dataKey="glucose" fill="#8b5cf6" name="Glucose" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Progress Area Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-blue-900 mb-6">Progress Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockHealthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="weight"
                  fill="#10b981"
                  stroke="#059669"
                  name="Weight"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Key Metrics Summary */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-blue-900 mb-6">Key Metrics Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Average Glucose', value: '94 mg/dL', change: '-2.1%', good: true },
                { label: 'Average Cholesterol', value: '172 mg/dL', change: '-8.3%', good: true },
                { label: 'Average Weight', value: '68 kg', change: '-4.2%', good: true },
                { label: 'Average Blood Pressure', value: '116/75', change: '-5.0%', good: true },
              ].map((metric, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">{metric.label}</p>
                  <p className="text-xl font-semibold text-blue-900">{metric.value}</p>
                  <p className={`text-sm ${metric.good ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-blue-900 mb-6">Health Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Glucose Trend',
                description: 'Your glucose levels have remained stable within the healthy range.',
                status: 'positive',
              },
              {
                title: 'Weight Management',
                description: 'Consistent weight reduction trend observed over the past 6 months.',
                status: 'positive',
              },
              {
                title: 'Blood Pressure',
                description: 'Blood pressure readings show improvement but monitor regularly.',
                status: 'neutral',
              },
            ].map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  insight.status === 'positive'
                    ? 'border-green-200 bg-green-50'
                    : insight.status === 'negative'
                      ? 'border-red-200 bg-red-50'
                      : 'border-yellow-200 bg-yellow-50'
                }`}
              >
                <h3 className="font-medium text-blue-900 mb-2">{insight.title}</h3>
                <p className="text-sm text-slate-600">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDataVisualizations;
