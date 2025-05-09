import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Activity as ActivityIcon,
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

// Define types for health data structure
interface BloodPressureHistory {
  date: string;
  systolic: number;
  diastolic: number;
}

interface ValueHistory {
  date: string;
  value: number | null;
}

interface BloodPressureData {
  systolic: number;
  diastolic: number;
  trend: string;
  history: BloodPressureHistory[];
}

interface MetricData {
  current: number;
  average: number;
  trend: string;
  history: ValueHistory[];
}

interface WeightData {
  current: number | null;
  average: number;
  trend: string;
  history: ValueHistory[];
}

interface StepData {
  today: number;
  average: number;
  trend: string;
  history: ValueHistory[];
}

interface HealthSummary {
  bloodPressure: BloodPressureData;
  heartRate: MetricData;
  bloodSugar: MetricData;
  weight: WeightData;
  steps: StepData;
}

interface HealthRecord {
  date: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  bloodSugar: number;
  weight: number | null;
  steps: number;
  sleep: number | null;
}

interface HealthData {
  records: HealthRecord[];
  summary: HealthSummary;
}

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  daysOfWeek: number[];
  category: string;
  Adherence: number;
}

interface MedicationWithAdherence extends Medication {
  adherence: number;
  lastTaken: string | null;
  nextDose: string;
}

type ActivityType = 'measurement' | 'medication' | 'doctor' | 'exercise' | 'import' | 'share';

interface ActivityItem {
  type: ActivityType;
  description: string;
  timestamp: string;
  category: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'positive' | 'neutral' | 'warning';
  read: boolean;
}

interface Insight {
  title: string;
  description: string;
  importance: 'positive' | 'neutral' | 'warning';
  actionable: boolean;
  category: 'bloodPressure' | 'heartRate' | 'medication' | 'activity' | 'bloodSugar';
}

type MetricType = 'bloodPressure' | 'heartRate' | 'bloodSugar' | 'weight' | 'steps';
type TrendType = 'increasing' | 'decreasing' | 'stable';

// Custom hook for local data persistence
function useLocalStorage<T>(
  storageKey: string,
  fallbackState: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(storageKey);
      return storedValue ? JSON.parse(storedValue) : fallbackState;
    } catch (error) {
      console.error('Error retrieving encrypted data:', error);
      return fallbackState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
      console.error('Error storing encrypted data:', error);
    }
  }, [value, storageKey]);

  return [value, setValue];
}

// Synthetic Health Data Generator
const generateMockHealthData = (): HealthData => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Generate scales for various metrics
  const systolicScale = (i: number): number => 115 + (i * 10) / 29;
  const diastolicScale = (i: number): number => 75 + (i * 7) / 29;
  const heartRateScale = (i: number): number => 68 + (i * 8) / 29;
  const bloodSugarScale = (i: number): number => 90 + (i * 10) / 29;

  // Add randomness to data
  const jitter = (scale: (i: number) => number, i: number): number => {
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

  // Calculate trends using basic logic
  const calculateTrend = (data: { [key: string]: any }[], key: string): TrendType => {
    const filteredData = data.filter((d) => d[key] !== null);
    const n = filteredData.length;

    if (n < 3) return 'stable';

    const xMean = (n - 1) / 2;
    const yValues = filteredData.map((d) => Number(d[key]));
    const yMean = yValues.reduce((sum, val) => sum + val, 0) / n;

    let numerator = 0;
    let denominator = 0;

    filteredData.forEach((d, i) => {
      numerator += (i - xMean) * (Number(d[key]) - yMean);
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

  // Calculate averages
  const calculateAverage = (data: any[], key: string): number => {
    const validData = data.filter((d) => d[key] !== null);
    return Math.round(validData.reduce((sum, d) => sum + Number(d[key]), 0) / validData.length);
  };

  const heartRateAvg = calculateAverage(healthRecords, 'heartRate');
  const bloodSugarAvg = calculateAverage(healthRecords, 'bloodSugar');
  const weightAvg = calculateAverage(
    healthRecords.filter((d) => d.weight !== null),
    'weight'
  );
  const stepsAvg = calculateAverage(healthRecords, 'steps');

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
        average: heartRateAvg,
        trend: heartRateTrend,
        history: healthRecords.map((record) => ({
          date: record.date,
          value: record.heartRate,
        })),
      },
      bloodSugar: {
        current: recent.bloodSugar,
        average: bloodSugarAvg,
        trend: bloodSugarTrend,
        history: healthRecords.map((record) => ({
          date: record.date,
          value: record.bloodSugar,
        })),
      },
      weight: {
        current:
          recent.weight || healthRecords.filter((r) => r.weight !== null).pop()?.weight || 160,
        average: weightAvg,
        trend: weightTrend,
        history: healthRecords
          .filter((record) => record.weight !== null)
          .map((record) => ({
            date: record.date,
            value: record.weight,
          })),
      },
      steps: {
        today: recent.steps,
        average: stepsAvg,
        trend: stepsTrend,
        history: healthRecords.map((record) => ({
          date: record.date,
          value: record.steps,
        })),
      },
    },
  };
};

// Generate health insights
const generateHealthInsights = (healthData: HealthData): Insight[] => {
  const insights: Insight[] = [];
  const { summary } = healthData;

  // Blood pressure insights
  const bpData = summary.bloodPressure;
  if (bpData && bpData.systolic > 120) {
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
  const hrData = summary.heartRate;
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

  // Exercise insights
  const stepsData = summary.steps;
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
  if (summary.bloodSugar.current > 95) {
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
const generateMedicationData = (): MedicationWithAdherence[] => {
  const baseData: Medication[] = [
    {
      id: 1,
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'daily',
      times: ['08:00'],
      daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
      category: 'diabetes',
      Adherence: 0, // default value; will be recalculated
    },
    {
      id: 2,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'daily',
      times: ['08:00'],
      daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
      category: 'blood pressure',
      Adherence: 0,
    },
  ];

  // Generate adherence data
  const generateAdherenceData = (med: Medication): MedicationWithAdherence => {
    const dosesPerDay = med.times.length;
    const totalDoses = dosesPerDay * 30;
    const takenDoses = Math.round(totalDoses * (0.75 + Math.random() * 0.2));
    const adherence = Math.round((takenDoses / totalDoses) * 100);
    const now = Date.now();

    return {
      ...med,
      Adherence: adherence,
      adherence: adherence, // Adding this property for consistency
      lastTaken: med.id === 1 ? new Date(now - 6 * 60 * 60 * 1000).toISOString() : null,
      nextDose: med.times[0],
    };
  };

  return baseData.map(generateAdherenceData);
};

// Activity log generator
const generateActivityLog = (): ActivityItem[] => {
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
    yAxisDomain: [60, 160] as [number, number],
    colors: { systolic: '#3B82F6', diastolic: '#8B5CF6' },
  },
  heartRate: {
    yAxisDomain: [50, 100] as [number, number],
    colors: { value: '#0D9488' },
  },
  bloodSugar: {
    yAxisDomain: [70, 140] as [number, number],
    colors: { value: '#F59E0B' },
  },
};

// Main Dashboard component
function Dashboard() {
  // State initialization with proper types
  const [healthData, setHealthData] = useState<HealthData>(() => generateMockHealthData());
  const [medications, setMedications] = useState<MedicationWithAdherence[]>(() =>
    generateMedicationData()
  );
  const [activities, setActivities] = useState<ActivityItem[]>(() => generateActivityLog());
  const [insights, setInsights] = useState<Insight[]>(() =>
    generateHealthInsights(generateMockHealthData())
  );
  const [activeMetric, setActiveMetric] = useState<MetricType>('bloodPressure');
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [isNotifying, setIsNotifying] = useState(false);
  const [notifications] = useState<Notification[]>([]);

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
    return insights.sort((a, b) => {
      const priorityOrder = { warning: 1, positive: 2, neutral: 3 };
      return priorityOrder[a.importance] - priorityOrder[b.importance];
    });
  }, [insights]);

  const upcomingMedications = useMemo(() => {
    // Sort medications by next dose time
    return [...medications].sort((a, b) => {
      const [aHours, aMinutes] = a.nextDose.split(':').map(Number);
      const [bHours, bMinutes] = b.nextDose.split(':').map(Number);
      return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
    });
  }, [medications]);

  const recentActivities = useMemo(() => {
    // Sort activities by timestamp (newest first)
    return [...activities]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5); // Show only 5 most recent
  }, [activities]);

  // Format relative time for activity timestamps
  const formatRelativeTime = useCallback((timestamp: string) => {
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
  const getTrendIcon = useCallback((trend: string) => {
    if (trend.includes('/')) {
      // Handle blood pressure which has systolic/diastolic trends
      const [systolic, diastolic] = trend.split('/');
      // If both are the same, show one icon, otherwise show mixed
      if (systolic === diastolic) {
        if (systolic === 'increasing') return <TrendingUp className="h-4 w-4 mr-1" />;
        if (systolic === 'decreasing') return <TrendingDown className="h-4 w-4 mr-1" />;
        return <ActivityIcon className="h-4 w-4 mr-1" />;
      }
      // Mixed
      return <ActivityIcon className="h-4 w-4 mr-1" />;
    }

    // Handle single metric trends
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 mr-1" />;
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 mr-1" />;
      default:
        return <ActivityIcon className="h-4 w-4 mr-1" />;
    }
  }, []);

  // Determine if increasing/decreasing is good or bad for this metric
  const isPositiveTrend = (metric: MetricType, trend: TrendType): boolean => {
    switch (metric) {
      case 'bloodPressure':
      case 'heartRate':
      case 'bloodSugar':
      case 'weight':
        return trend === 'decreasing';
      case 'steps':
        return trend === 'increasing';
      default:
        return false;
    }
  };

  const getTrendColor = useCallback((trend: string, metric: MetricType) => {
    // For complex blood pressure trend
    if (trend.includes('/')) {
      // This is a simplification - in reality would need more logic
      return 'text-blue-500';
    }

    // For single metric trends
    if (['increasing', 'decreasing', 'stable'].includes(trend)) {
      const trendType = trend as TrendType;
      return isPositiveTrend(metric, trendType)
        ? 'text-teal-500'
        : trendType === 'stable'
          ? 'text-blue-500'
          : 'text-red-500';
    }

    return 'text-blue-500'; // Default
  }, []);

  const getTrendLabel = useCallback((trend: string) => {
    if (trend.includes('/')) {
      // Handle blood pressure trends
      const [systolic, diastolic] = trend.split('/');
      if (systolic === diastolic) return systolic;
      return 'mixed';
    }
    return trend;
  }, []);

  const getActivityIcon = useCallback((type: ActivityType) => {
    switch (type) {
      case 'measurement':
        return <Heart size={18} className="text-purple-500" />;
      case 'medication':
        return <Pill size={18} className="text-teal-500" />;
      case 'doctor':
        return <User size={18} className="text-blue-500" />;
      case 'exercise':
        return <ActivityIcon size={18} className="text-green-500" />;
      case 'import':
        return <FileText size={18} className="text-orange-500" />;
      case 'share':
        return <Share size={18} className="text-blue-500" />;
      default:
        return <Clock size={18} className="text-gray-500" />;
    }
  }, []);

  const getInsightColor = useCallback((importance: 'positive' | 'neutral' | 'warning') => {
    switch (importance) {
      case 'positive':
        return 'bg-teal-50 border-teal-200 text-teal-700';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-700';
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

    // Mock chart visualization
    return (
      <div className="h-[200px] w-full bg-gray-50 border rounded flex items-center justify-center">
        <div className="text-gray-500 text-sm">
          {activeMetric === 'bloodPressure' &&
            'Blood Pressure Chart - Historical data for systolic and diastolic pressure'}
          {activeMetric === 'heartRate' && 'Heart Rate Chart - Historical trend data'}
          {activeMetric === 'bloodSugar' && 'Blood Sugar Chart - Historical levels and trends'}
        </div>
      </div>
    );
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
                <ActivityIcon className="h-5 w-5 text-purple-500 mr-2" />
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
                      {getActivityIcon(activity.type as ActivityType)}
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

export default Dashboard;
