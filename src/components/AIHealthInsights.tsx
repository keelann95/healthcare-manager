'use client';

import React, { useState } from 'react';
import {
  Brain,
  TrendingUp,
  Activity,
  Pill,
  Settings,
  Search,
  Filter,
  RefreshCw,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Button from '../components/ui/Button';

const mockHealthData = [
  { date: '2024-01', sleep: 7.5, stress: 45, activity: 8500, mood: 85 },
  { date: '2024-02', sleep: 7.2, stress: 52, activity: 7800, mood: 78 },
  { date: '2024-03', sleep: 7.8, stress: 38, activity: 9200, mood: 92 },
  { date: '2024-04', sleep: 6.9, stress: 58, activity: 7200, mood: 72 },
  { date: '2024-05', sleep: 7.6, stress: 42, activity: 8800, mood: 88 },
  { date: '2024-06', sleep: 7.4, stress: 48, activity: 8300, mood: 82 },
];

const AIHealthInsights = () => {
  const [timeRange, setTimeRange] = useState('6M');
  const [insightType, setInsightType] = useState('all');

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-900 mb-2">AI Health Insights</h1>
          <p className="text-slate-600">
            Advanced analytics and personalized health recommendations
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Brain className="h-6 w-6 text-blue-600" />
              <span className="text-sm text-slate-500">Health Score</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">87</span>
              <span className="ml-2 text-sm text-green-600">+5 points</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
              <span className="text-sm text-slate-500">Trends Analyzed</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">12</span>
              <span className="ml-2 text-sm text-purple-600">patterns found</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Activity className="h-6 w-6 text-green-600" />
              <span className="text-sm text-slate-500">Active Goals</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">5</span>
              <span className="ml-2 text-sm text-green-600">on track</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Pill className="h-6 w-6 text-red-600" />
              <span className="text-sm text-slate-500">Medication Efficacy</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">92%</span>
              <span className="ml-2 text-sm text-red-600">effective</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search insights..."
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
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
              <select
                value={insightType}
                onChange={(e) => setInsightType(e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Insights</option>
                <option value="sleep">Sleep Patterns</option>
                <option value="activity">Physical Activity</option>
                <option value="nutrition">Nutrition</option>
                <option value="stress">Stress Levels</option>
              </select>
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
                <Settings className="h-4 w-4 mr-2" />
                Configure AI
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Trend Analysis */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-blue-900 mb-6">Health Trends Analysis</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockHealthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sleep" stroke="#3b82f6" name="Sleep Quality" />
                <Line type="monotone" dataKey="stress" stroke="#ef4444" name="Stress Level" />
                <Line type="monotone" dataKey="mood" stroke="#10b981" name="Mood Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pattern Recognition */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-blue-900 mb-6">Pattern Recognition</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockHealthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="activity"
                  fill="#3b82f6"
                  stroke="#2563eb"
                  name="Activity Level"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-6">AI-Generated Recommendations</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Sleep Pattern Optimization',
                description:
                  'Your sleep schedule shows irregularity. Consider maintaining a consistent bedtime around 10:30 PM to improve sleep quality.',
                impact: 'high',
                category: 'sleep',
              },
              {
                title: 'Stress Management',
                description:
                  'Stress levels peak during mid-week. Implementing short meditation sessions could help reduce stress by 23%.',
                impact: 'medium',
                category: 'stress',
              },
              {
                title: 'Activity Adjustment',
                description:
                  'Increasing your daily step count by 1000 steps could significantly improve your cardiovascular health metrics.',
                impact: 'high',
                category: 'activity',
              },
            ].map((recommendation, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-slate-100 hover:border-blue-100 transition-colors"
              >
                <div className="flex items-start">
                  <div
                    className={`p-2 rounded-lg ${
                      recommendation.impact === 'high'
                        ? 'bg-red-50'
                        : recommendation.impact === 'medium'
                          ? 'bg-yellow-50'
                          : 'bg-green-50'
                    } mr-4`}
                  >
                    <Brain
                      className={`h-6 w-6 ${
                        recommendation.impact === 'high'
                          ? 'text-red-600'
                          : recommendation.impact === 'medium'
                            ? 'text-yellow-600'
                            : 'text-green-600'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-blue-900 mb-1">{recommendation.title}</h3>
                    <p className="text-slate-600 text-sm">{recommendation.description}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      recommendation.impact === 'high'
                        ? 'bg-red-100 text-red-700'
                        : recommendation.impact === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {recommendation.impact.toUpperCase()} IMPACT
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Correlation Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-blue-900 mb-6">Symptom Correlations</h2>
            <div className="space-y-4">
              {[
                { factor1: 'Sleep Quality', factor2: 'Stress Level', correlation: -0.82 },
                { factor1: 'Physical Activity', factor2: 'Mood', correlation: 0.75 },
                { factor1: 'Medication Adherence', factor2: 'Symptoms', correlation: -0.68 },
              ].map((correlation, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      {correlation.factor1} → {correlation.factor2}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        correlation.correlation > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {Math.abs(correlation.correlation * 100).toFixed(0)}%{' '}
                      {correlation.correlation > 0 ? 'positive' : 'negative'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        correlation.correlation > 0 ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.abs(correlation.correlation * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-blue-900 mb-6">Medication Effectiveness</h2>
            <div className="space-y-4">
              {[
                { medication: 'Lisinopril', effectiveness: 92, sideEffects: 'minimal' },
                { medication: 'Metformin', effectiveness: 88, sideEffects: 'moderate' },
                { medication: 'Atorvastatin', effectiveness: 95, sideEffects: 'minimal' },
              ].map((med, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-blue-900">{med.medication}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        med.sideEffects === 'minimal'
                          ? 'bg-green-100 text-green-700'
                          : med.sideEffects === 'moderate'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {med.sideEffects} side effects
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${med.effectiveness}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Effectiveness</span>
                    <span className="font-medium text-blue-900">{med.effectiveness}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-blue-900 mb-6">Health Goals Progress</h2>
            <div className="space-y-6">
              {[
                { goal: 'Reduce Stress', progress: 65, status: 'on track' },
                { goal: 'Improve Sleep', progress: 80, status: 'exceeding' },
                { goal: 'Increase Activity', progress: 45, status: 'needs attention' },
              ].map((goal, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-blue-900">{goal.goal}</span>
                    <span
                      className={`text-sm ${
                        goal.status === 'exceeding'
                          ? 'text-green-600'
                          : goal.status === 'on track'
                            ? 'text-blue-600'
                            : 'text-red-600'
                      }`}
                    >
                      {goal.status}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-1">
                    <div
                      className={`h-2 rounded-full ${
                        goal.progress >= 80
                          ? 'bg-green-500'
                          : goal.progress >= 60
                            ? 'bg-blue-500'
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIHealthInsights;
