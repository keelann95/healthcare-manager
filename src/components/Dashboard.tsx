'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Activity,
  Calendar,
  Clock,
  FileText,
  Heart,
  Pill,
  PieChart,
  Share,
  TrendingUp,
  TrendingDown,
  User,
  Shield,
  AlertTriangle,
  Bell,
  Download,
  Zap,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import * as d3 from 'd3';
import _ from 'lodash';

// Custom hook for local data persistence - mimics IndexedDB interaction
const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = useState(() => {
    // In a real app, this would be encrypted with Web Crypto API
    try {
      const storedValue = localStorage.getItem(storageKey);
      return storedValue ? JSON.parse(storedValue) : fallbackState;
    } catch (error) {
      console.error('Error retrieving encrypted data:', error);
      return fallbackState;
    }
  });

  useEffect(() => {
    // In a real app, we'd encrypt before storing
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
      console.error('Error storing encrypted data:', error);
    }
  }, [value, storageKey]);

  return [value, setValue];
};

// Synthetic Health Data Generator (simulates FHIR import)
const generateMockHealthData = () => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Generate 30 days worth of data
  const timeScale = d3.scaleTime().domain([thirtyDaysAgo, now]).range([0, 29]);

  const systolicScale = d3.scaleLinear().domain([0, 29]).range([115, 125]);

  const diastolicScale = d3.scaleLinear().domain([0, 29]).range([75, 82]);

  const heartRateScale = d3.scaleLinear().domain([0, 29]).range([68, 76]);

  const bloodSugarScale = d3.scaleLinear().domain([0, 29]).range([90, 100]);

  // Add some randomness to data
  const jitter = (scale, i) => {
    const baseValue = scale(i);
    return baseValue + (Math.random() * 6 - 3);
  };

  const healthRecords = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(thirtyDaysAgo);
    date.setDate(date.getDate() + i);

    return {
      date: date.toISOString().split('T')[0],
      systolic: Math.round(jitter(systolicScale, i)),
      diastolic: Math.round(jitter(diastolicScale, i)),
      heartRate: Math.round(jitter(heartRateScale, i)),
      bloodSugar: Math.round(jitter(bloodSugarScale, i)),
      weight: i % 3 === 0 ? Math.round(160 + (Math.random() * 2 - 1)) : null,
      steps: Math.round(6000 + Math.random() * 4000),
      sleep: i % 2 === 0 ? Math.round(6 + Math.random() * 2) : null,
    };
  });

  // Calculate trends using regression
  const calculateTrend = (data, key) => {
    // Filter out null values
    const filteredData = data.filter((d) => d[key] !== null);
    const n = filteredData.length;

    if (n < 3) return 'stable';

    // Simple linear regression
    const xMean = (n - 1) / 2;
    const yMean = d3.mean(filteredData, (d) => d[key]);

    let numerator = 0;
    let denominator = 0;

    filteredData.forEach((d, i) => {
      numerator += (i - xMean) * (d[key] - yMean);
      denominator += Math.pow(i - xMean, 2);
    });

    const slope = numerator / denominator;

    // Determine trend
    if (Math.abs(slope) < 0.1) return 'stable';
    return slope > 0 ? 'increasing' : 'decreasing';
  };

  // Calculate trends for each metric
  const systolicTrend = calculateTrend(healthRecords, 'systolic');
  const diastolicTrend = calculateTrend(healthRecords, 'diastolic');
  const heartRateTrend = calculateTrend(healthRecords, 'heartRate');
  const bloodSugarTrend = calculateTrend(healthRecords, 'bloodSugar');
  const weightTrend = calculateTrend(healthRecords, 'weight');
  const stepsTrend = calculateTrend(healthRecords, 'steps');

  // Get most recent values
  const recent = healthRecords[healthRecords.length - 1];

  return {
    records: healthRecords,
    summary: {
      bloodPressure: {
        systolic: recent.systolic,
        diastolic: recent.diastolic,
        trend: `${systolicTrend}/${diastolicTrend}`,
        history: healthRecords.map((record) => ({
          date: record.date,
          systolic: record.systolic,
          diastolic: record.diastolic,
        })),
      },
      heartRate: {
        current: recent.heartRate,
        average: Math.round(d3.mean(healthRecords, (d) => d.heartRate)),
        trend: heartRateTrend,
        history: healthRecords.map((record) => ({ date: record.date, value: record.heartRate })),
      },
      bloodSugar: {
        current: recent.bloodSugar,
        average: Math.round(d3.mean(healthRecords, (d) => d.bloodSugar)),
        trend: bloodSugarTrend,
        history: healthRecords.map((record) => ({ date: record.date, value: record.bloodSugar })),
      },
      weight: {
        current:
          recent.weight || healthRecords.filter((r) => r.weight !== null).pop()?.weight || 160,
        average: Math.round(
          d3.mean(
            healthRecords.filter((d) => d.weight !== null),
            (d) => d.weight
          )
        ),
        trend: weightTrend,
        history: healthRecords
          .filter((record) => record.weight !== null)
          .map((record) => ({ date: record.date, value: record.weight })),
      },
      steps: {
        today: recent.steps,
        average: Math.round(d3.mean(healthRecords, (d) => d.steps)),
        trend: stepsTrend,
        history: healthRecords.map((record) => ({ date: record.date, value: record.steps })),
      },
    },
  };
};

// AI-powered insight generator (simulates API call to OpenAI)
const generateHealthInsights = (healthData) => {
  // In a real app, this would call an AI API with the user's health data
  // For now, we'll use rule-based insights
  const insights = [];

  // Blood pressure insights
  const bpData = healthData.summary.bloodPressure;
  if (bpData.systolic > 120) {
    insights.push({
      title: 'Blood pressure slightly elevated',
      description: `Your systolic pressure (${bpData.systolic}) is above the optimal range. Consider reducing sodium intake.`,
      importance: 'warning',
      actionable: true,
      category: 'bloodPressure',
    });
  } else if (bpData.trend.includes('decreasing')) {
    insights.push({
      title: 'Blood pressure improving',
      description: 'Your blood pressure readings show improvement over the past two weeks.',
      importance: 'positive',
      actionable: false,
      category: 'bloodPressure',
    });
  }

  // Heart rate insights
  const hrData = healthData.summary.heartRate;
  if (hrData.trend === 'decreasing' && hrData.current < 68) {
    insights.push({
      title: 'Heart rate trending lower',
      description:
        'Your resting heart rate is decreasing and is now below 68 bpm. This could indicate improved cardiovascular fitness.',
      importance: 'positive',
      actionable: false,
      category: 'heartRate',
    });
  }

  // Medication insights
  const medAdherence = Math.round(_.meanBy(healthData.medications, (med) => med.adherence));

  if (medAdherence > 90) {
    insights.push({
      title: 'Excellent medication adherence',
      description: `You've taken your medications on schedule ${medAdherence}% of the time. Keep up the good work!`,
      importance: 'positive',
      actionable: false,
      category: 'medication',
    });
  } else if (medAdherence < 80) {
    insights.push({
      title: 'Medication schedule adherence',
      description: `You've taken your medications on schedule ${medAdherence}% of the time. Setting reminders may help.`,
      importance: 'warning',
      actionable: true,
      category: 'medication',
    });
  }

  // Exercise insights
  const stepsData = healthData.summary.steps;
  if (stepsData.trend === 'increasing') {
    insights.push({
      title: 'Increased physical activity',
      description:
        'Your step count is trending upward. Consistent physical activity helps manage blood pressure and overall health.',
      importance: 'positive',
      actionable: false,
      category: 'activity',
    });
  }

  // Sugar level insights
  const bsData = healthData.summary.bloodSugar;
  if (bsData.current > 95) {
    insights.push({
      title: 'Monitor blood sugar levels',
      description:
        'Your recent readings are within normal range but trending higher. Consider reviewing your carbohydrate intake.',
      importance: 'neutral',
      actionable: true,
      category: 'bloodSugar',
    });
  }

  return insights;
};

// Mock medication data with adherence calculations
const generateMedicationData = () => {
  const baseData = [
    {
      id: 1,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'daily',
      times: ['08:00'],
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      category: 'bloodPressure',
    },
    {
      id: 2,
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'twice-daily',
      times: ['08:00', '20:00'],
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      category: 'bloodSugar',
    },
    {
      id: 3,
      name: 'Vitamin D',
      dosage: '1000 IU',
      frequency: 'daily',
      times: ['08:00'],
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      category: 'supplement',
    },
  ];

  // Generate adherence data
  const now = new Date();
  const generateAdherenceData = (med) => {
    // Number of doses required in the last 30 days
    const dosesPerDay = med.times.length;
    const totalDoses = dosesPerDay * 30;

    // Simulate user taking or missing doses
    const takenDoses = Math.round(totalDoses * (0.75 + Math.random() * 0.2));
    const adherence = Math.round((takenDoses / totalDoses) * 100);

    return {
      ...med,
      adherence,
      lastTaken: med.id === 1 ? new Date(now - 6 * 60 * 60 * 1000).toISOString() : null,
      nextDose: med.times[0],
    };
  };

  return baseData.map(generateAdherenceData);
};

// Activity log generator
const generateActivityLog = () => {
  return [
    {
      type: 'measurement',
      description: 'Blood pressure recorded: 120/80',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      category: 'bloodPressure',
    },
    {
      type: 'medication',
      description: 'Lisinopril (10mg) taken',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      category: 'medication',
    },
    {
      type: 'doctor',
      description: 'Appointment notes imported from Dr. Sarah Chen',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'medical',
    },
    {
      type: 'exercise',
      description: 'Walking session: 35 minutes, 3500 steps',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 4 * 60 * 60 * 1000).toISOString(),
      category: 'activity',
    },
    {
      type: 'import',
      description: 'Lab results imported from Memorial Hospital',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'medical',
    },
    {
      type: 'share',
      description: 'Health summary shared with Dr. Patel',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'sharing',
    },
  ];
};

// Chart configuration settings
const chartConfig = {
  bloodPressure: {
    yAxisDomain: [60, 160],
    colors: { systolic: '#3B82F6', diastolic: '#8B5CF6' },
  },
  heartRate: {
    yAxisDomain: [50, 100],
    colors: { value: '#0D9488' },
  },
  bloodSugar: {
    yAxisDomain: [70, 140],
    colors: { value: '#F59E0B' },
  },
};

// Main Dashboard component
export default function Dashboard() {
  // Local state with mock data initialization and persistence
  const [healthData, setHealthData] = useLocalStorage('healthData', {
    summary: {
      bloodPressure: { systolic: 120, diastolic: 80, trend: 'stable/stable', history: [] },
      heartRate: { current: 72, average: 74, trend: 'decreasing', history: [] },
      bloodSugar: { current: 95, average: 98, trend: 'stable', history: [] },
      weight: { current: 160, average: 162, trend: 'decreasing', history: [] },
      steps: { today: 8500, average: 7800, trend: 'increasing', history: [] },
    },
    records: [],
  });

  const [medications, setMedications] = useLocalStorage('medications', []);
  const [activities, setActivities] = useLocalStorage('activities', []);
  const [insights, setInsights] = useState([]);
  const [activeMetric, setActiveMetric] = useState('bloodPressure');
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [isNotifying, setIsNotifying] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Generate data on first load
  useEffect(() => {
    if (healthData.records.length === 0) {
      const generatedData = generateMockHealthData();
      setHealthData(generatedData);
    }

    if (medications.length === 0) {
      setMedications(generateMedicationData());
    }

    if (activities.length === 0) {
      setActivities(generateActivityLog());
    }
  }, []);

  // Generate AI insights based on health data and medications
  useEffect(() => {
    if (healthData.records.length > 0 && medications.length > 0) {
      const generatedInsights = generateHealthInsights({
        ...healthData,
        medications,
      });
      setInsights(generatedInsights);

      // Create notifications for actionable insights
      const actionableInsights = generatedInsights.filter((insight) => insight.actionable);
      if (actionableInsights.length > 0) {
        setNotifications(
          actionableInsights.map((insight) => ({
            id: Math.random().toString(36).substr(2, 9),
            title: insight.title,
            message: insight.description,
            type: insight.importance,
            read: false,
          }))
        );

        if (actionableInsights.length > 0) {
          setIsNotifying(true);
        }
      }
    }
  }, [healthData, medications]);

  // Format greeting and time
  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Format current time
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
    setCurrentTime(timeFormatter.format(new Date()));

    // Update time every minute
    const intervalId = setInterval(() => {
      setCurrentTime(timeFormatter.format(new Date()));
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // Derived data with memoization for performance
  const prioritizedInsights = useMemo(() => {
    return _.orderBy(
      insights,
      [
        (insight) =>
          insight.importance === 'warning' ? 1 : insight.importance === 'positive' ? 2 : 3,
      ],
      ['asc']
    );
  }, [insights]);

  const upcomingMedications = useMemo(() => {
    // Sort medications by next dose time
    return _.orderBy(
      medications,
      [
        (med) => {
          const [hours, minutes] = med.nextDose.split(':').map(Number);
          return hours * 60 + minutes;
        },
      ],
      ['asc']
    );
  }, [medications]);

  const recentActivities = useMemo(() => {
    // Sort activities by timestamp (newest first)
    return _.orderBy(
      activities,
      [(activity) => new Date(activity.timestamp).getTime()],
      ['desc']
    ).slice(0, 5); // Show only 5 most recent
  }, [activities]);

  // Format relative time for activity timestamps
  const formatRelativeTime = useCallback((timestamp) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    const elapsed = Date.now() - new Date(timestamp).getTime();

    if (elapsed < msPerMinute) {
      return 'Just now';
    } else if (elapsed < msPerHour) {
      const minutes = Math.round(elapsed / msPerMinute);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (elapsed < msPerDay) {
      const hours = Math.round(elapsed / msPerHour);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.round(elapsed / msPerDay);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  }, []);

  // Handle notification click
  const handleNotificationClick = useCallback(() => {
    setIsNotifying(false);
    // In a real app, we would show a notification panel
  }, []);

  // Helper functions for UI display
  const getTrendIcon = useCallback((trend) => {
    if (trend.includes('/')) {
      // Handle blood pressure which has systolic/diastolic trends
      const [systolic, diastolic] = trend.split('/');
      // If both are the same, show one icon, otherwise show mixed
      if (systolic === diastolic) {
        if (systolic === 'increasing') return <TrendingUp className="h-4 w-4 mr-1" />;
        if (systolic === 'decreasing') return <TrendingDown className="h-4 w-4 mr-1" />;
        return <Activity className="h-4 w-4 mr-1" />;
      }
      // Mixed
      return <Activity className="h-4 w-4 mr-1" />;
    }

    // Handle single metric trends
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 mr-1" />;
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 mr-1" />;
      default:
        return <Activity className="h-4 w-4 mr-1" />;
    }
  }, []);

  const getTrendColor = useCallback((trend, metric) => {
    // Determine if increasing/decreasing is good or bad for this metric
    const isPositive = {
      bloodPressure: (trend) => trend.includes('decreasing'),
      heartRate: (trend) => trend === 'decreasing',
      bloodSugar: (trend) => trend === 'decreasing',
      weight: (trend) => trend === 'decreasing',
      steps: (trend) => trend === 'increasing',
    };

    if (trend.includes('/')) {
      // Handle blood pressure which has systolic/diastolic trends
      const [systolic] = trend.split('/');
      return isPositive.bloodPressure(systolic)
        ? 'text-teal-500'
        : systolic === 'increasing'
          ? 'text-red-500'
          : 'text-blue-500';
    }

    // For single metric trends
    return isPositive[metric]?.(trend)
      ? 'text-teal-500'
      : trend === 'stable'
        ? 'text-blue-500'
        : metric === 'steps' && trend === 'decreasing'
          ? 'text-red-500'
          : metric !== 'steps' && trend === 'increasing'
            ? 'text-red-500'
            : 'text-blue-500';
  }, []);

  const getTrendLabel = useCallback((trend) => {
    if (trend.includes('/')) {
      // Handle blood pressure trends
      const [systolic, diastolic] = trend.split('/');
      if (systolic === diastolic) return systolic;
      return 'mixed';
    }
    return trend;
  }, []);

  const getActivityIcon = useCallback((type) => {
    switch (type) {
      case 'measurement':
        return <Heart size={18} className="text-purple-500" />;
      case 'medication':
        return <Pill size={18} className="text-teal-500" />;
      case 'doctor':
        return <User size={18} className="text-blue-500" />;
      case 'exercise':
        return <Activity size={18} className="text-green-500" />;
      case 'import':
        return <FileText size={18} className="text-orange-500" />;
      case 'share':
        return <Share size={18} className="text-blue-500" />;
      default:
        return <Clock size={18} className="text-gray-500" />;
    }
  }, []);

  const getInsightColor = useCallback((importance) => {
    switch (importance) {
      case 'positive':
        return 'bg-teal-50 border-teal-200 text-teal-700';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'negative':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  }, []);

  // Prepare chart data for selected metric
  const chartData = useMemo(() => {
    if (!healthData?.summary) return [];

    switch (activeMetric) {
      case 'bloodPressure':
        return healthData.summary.bloodPressure.history.slice(-14); // Last 14 days
      case 'heartRate':
        return healthData.summary.heartRate.history.slice(-14);
      case 'bloodSugar':
        return healthData.summary.bloodSugar.history.slice(-14);
      default:
        return [];
    }
  }, [healthData, activeMetric]);

  // Chart rendering based on active metric
  const renderChart = () => {
    if (chartData.length === 0) return null;

    switch (activeMetric) {
      case 'bloodPressure':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEE" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                tickFormatter={(val) => val.split('-').slice(1).join('/')}
              />
              <YAxis domain={chartConfig.bloodPressure.yAxisDomain} tick={{ fontSize: 10 }} />
              <Tooltip
                formatter={(value) => [`${value}`, '']}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Line
                type="monotone"
                dataKey="systolic"
                stroke={chartConfig.bloodPressure.colors.systolic}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke={chartConfig.bloodPressure.colors.diastolic}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'heartRate':
      case 'bloodSugar':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEE" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                tickFormatter={(val) => val.split('-').slice(1).join('/')}
              />
              <YAxis domain={chartConfig[activeMetric].yAxisDomain} tick={{ fontSize: 10 }} />
              <Tooltip
                formatter={(value) => [`${value}`, activeMetric === 'heartRate' ? 'bpm' : 'mg/dL']}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={chartConfig[activeMetric].colors.value}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-7 w-7 text-blue-500" />
              <h1 className="ml-2 text-xl font-semibold text-gray-800">HealthGuard</h1>
              <span className="ml-2 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Decentralized
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-full hover:bg-gray-100 relative"
                onClick={handleNotificationClick}
              >
                <Bell className="h-5 w-5 text-gray-500" />
                {isNotifying && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Shield className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Share className="h-5 w-5 text-gray-500" />
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-medium">JS</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section with data sync status */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{greeting}, John</h2>
            <p className="text-gray-500">{currentTime}</p>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <div className="flex items-center mr-4">
              <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
              Data synced locally
            </div>
            <button className="flex items-center text-blue-600 hover:text-blue-800">
              <Download className="h-4 w-4 mr-1" />
              Export Data
            </button>
          </div>
        </div>

        {/* Health Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Blood Pressure Card */}
          <div
            className={`bg-white rounded-lg shadow-sm border p-4 cursor-pointer transition-all duration-200 ${activeMetric === 'bloodPressure' ? 'ring-2 ring-blue-500 border-blue-200' : 'hover:bg-gray-50'}`}
            onClick={() => setActiveMetric('bloodPressure')}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <Heart className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="font-medium text-gray-800">Blood Pressure</h3>
              </div>
              <div
                className={`text-xs font-medium flex items-center ${getTrendColor(healthData.summary.bloodPressure.trend, 'bloodPressure')}`}
              >
                {getTrendIcon(healthData.summary.bloodPressure.trend)}
                {getTrendLabel(healthData.summary.bloodPressure.trend)}
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">
                {healthData.summary.bloodPressure.systolic}/
                {healthData.summary.bloodPressure.diastolic}
              </span>
              <span className="ml-2 text-sm text-gray-500">mmHg</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Last updated today at 10:35 AM</div>
          </div>

          {/* Heart Rate Card */}
          <div
            className={`bg-white rounded-lg shadow-sm border p-4 cursor-pointer transition-all duration-200 ${activeMetric === 'heartRate' ? 'ring-2 ring-blue-500 border-blue-200' : 'hover:bg-gray-50'}`}
            onClick={() => setActiveMetric('heartRate')}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <Activity className="h-5 w-5 text-purple-500 mr-2" />
                <h3 className="font-medium text-gray-800">Heart Rate</h3>
              </div>
              <div
                className={`text-xs font-medium flex items-center ${getTrendColor(healthData.summary.heartRate.trend, 'heartRate')}`}
              >
                {getTrendIcon(healthData.summary.heartRate.trend)}
                {getTrendLabel(healthData.summary.heartRate.trend)}
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">
                {healthData.summary.heartRate.current}
              </span>
              <span className="ml-2 text-sm text-gray-500">bpm</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Avg: {healthData.summary.heartRate.average} bpm
            </div>
          </div>

          {/* Blood Sugar Card */}
          <div
            className={`bg-white rounded-lg shadow-sm border p-4 cursor-pointer transition-all duration-200 ${activeMetric === 'bloodSugar' ? 'ring-2 ring-blue-500 border-blue-200' : 'hover:bg-gray-50'}`}
            onClick={() => setActiveMetric('bloodSugar')}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <PieChart className="h-5 w-5 text-orange-500 mr-2" />
                <h3 className="font-medium text-gray-800">Blood Sugar</h3>
              </div>
              <div
                className={`text-xs font-medium flex items-center ${getTrendColor(healthData.summary.bloodSugar.trend, 'bloodSugar')}`}
              >
                {getTrendIcon(healthData.summary.bloodSugar.trend)}
                {getTrendLabel(healthData.summary.bloodSugar.trend)}
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">
                {healthData.summary.bloodSugar.current}
              </span>
              <span className="ml-2 text-sm text-gray-500">mg/dL</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Avg: {healthData.summary.bloodSugar.average} mg/dL
            </div>
          </div>

          {/* Steps Card */}
          <div className="bg-white rounded-lg shadow-sm border p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-medium text-gray-800">Daily Steps</h3>
              </div>
              <div
                className={`text-xs font-medium flex items-center ${getTrendColor(healthData.summary.steps.trend, 'steps')}`}
              >
                {getTrendIcon(healthData.summary.steps.trend)}
                {getTrendLabel(healthData.summary.steps.trend)}
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">
                {healthData.summary.steps.today.toLocaleString()}
              </span>
              <span className="ml-2 text-sm text-gray-500">steps</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Avg: {healthData.summary.steps.average.toLocaleString()} steps
            </div>
          </div>
        </div>

        {/* Two Column Layout for Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Health Chart Section */}
            <div className="bg-white rounded-lg shadow-sm border p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">
                  {activeMetric === 'bloodPressure' && 'Blood Pressure History'}
                  {activeMetric === 'heartRate' && 'Heart Rate Trend'}
                  {activeMetric === 'bloodSugar' && 'Blood Sugar Levels'}
                </h3>
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1 text-xs rounded-full ${activeMetric === 'bloodPressure' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    onClick={() => setActiveMetric('bloodPressure')}
                  >
                    Blood Pressure
                  </button>
                  <button
                    className={`px-3 py-1 text-xs rounded-full ${activeMetric === 'heartRate' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    onClick={() => setActiveMetric('heartRate')}
                  >
                    Heart Rate
                  </button>
                  <button
                    className={`px-3 py-1 text-xs rounded-full ${activeMetric === 'bloodSugar' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    onClick={() => setActiveMetric('bloodSugar')}
                  >
                    Blood Sugar
                  </button>
                </div>
              </div>
              {/* Chart Component */}
              <div className="mt-4">{renderChart()}</div>
              <div className="mt-3 text-xs text-gray-500 text-center">
                Showing data from the past 14 days. All data is stored locally and encrypted.
              </div>
            </div>

            {/* Health Insights */}
            <div className="bg-white rounded-lg shadow-sm border p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Health Insights</h3>
                <div className="text-xs text-gray-500">AI-powered analysis</div>
              </div>
              {prioritizedInsights.length > 0 ? (
                <div className="space-y-3">
                  {prioritizedInsights.map((insight, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg text-sm ${getInsightColor(insight.importance)}`}
                    >
                      <div className="font-medium mb-1">{insight.title}</div>
                      <p>{insight.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <p>
                    No health insights available yet. Continue tracking your health metrics to
                    receive personalized insights.
                  </p>
                </div>
              )}
            </div>

            {/* Recent Activity Timeline */}
            <div className="bg-white rounded-lg shadow-sm border p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Recent Activity</h3>
                <button className="text-xs text-blue-600 hover:text-blue-800">View All</button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">{activity.description}</p>
                      <p className="text-xs text-gray-500">
                        {formatRelativeTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Medication Schedule */}
            <div className="bg-white rounded-lg shadow-sm border p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Medication Schedule</h3>
                <button className="text-xs text-blue-600 hover:text-blue-800">Manage</button>
              </div>
              <div className="space-y-3">
                {upcomingMedications.map((med) => (
                  <div
                    key={med.id}
                    className="flex items-center p-2 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="mr-3">
                      <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                        <Pill className="h-5 w-5 text-teal-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{med.name}</div>
                      <div className="text-xs text-gray-500">
                        {med.dosage} • {med.frequency}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{med.nextDose}</div>
                      <div className="text-xs text-gray-500">
                        {med.lastTaken
                          ? 'Last taken: ' +
                            new Date(med.lastTaken).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Not taken today'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  + Add Medication
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-5">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 text-sm text-left border rounded-lg hover:bg-gray-50 flex items-center">
                  <Heart className="h-5 w-5 text-red-500 mr-2" />
                  <span>Record Vitals</span>
                </button>
                <button className="p-3 text-sm text-left border rounded-lg hover:bg-gray-50 flex items-center">
                  <Pill className="h-5 w-5 text-teal-500 mr-2" />
                  <span>Log Medication</span>
                </button>
                <button className="p-3 text-sm text-left border rounded-lg hover:bg-gray-50 flex items-center">
                  <FileText className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Import Data</span>
                </button>
                <button className="p-3 text-sm text-left border rounded-lg hover:bg-gray-50 flex items-center">
                  <Share className="h-5 w-5 text-purple-500 mr-2" />
                  <span>Share Summary</span>
                </button>
                <button className="p-3 text-sm text-left border rounded-lg hover:bg-gray-50 flex items-center col-span-2">
                  <Calendar className="h-5 w-5 text-green-500 mr-2" />
                  <span>Schedule Doctor Appointment</span>
                </button>
              </div>
            </div>

            {/* Encryption Status */}
            <div className="bg-white rounded-lg shadow-sm border p-5">
              <div className="flex items-center mb-3">
                <Shield className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-semibold text-gray-800">Privacy & Security</h3>
              </div>
              <div className="text-sm text-gray-600">
                <p className="mb-2">Your health data is:</p>
                <ul className="space-y-1 pl-5 list-disc text-sm">
                  <li>Stored only on your device</li>
                  <li>End-to-end encrypted</li>
                  <li>Never uploaded to any server</li>
                  <li>Only shared when you explicitly choose to</li>
                </ul>
              </div>
              <div className="mt-3">
                <button className="text-xs text-blue-600 hover:text-blue-800">
                  Learn more about our privacy approach
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center space-x-6 md:order-2">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Help
              </a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-sm text-gray-400">
                &copy; 2025 HealthGuard. All rights reserved. v1.0.0-beta
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
