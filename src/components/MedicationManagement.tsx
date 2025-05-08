'use client';
import React, { useState } from 'react';
import { Clock, AlertCircle, Plus, Bell, History, Search, ChevronRight, X } from 'lucide-react';
import Button from '../components/ui/Button';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timeOfDay: string[];
  startDate: Date;
  endDate?: Date;
  sideEffects: string[];
  notes: string;
}

const mockMedications: Medication[] = [
  {
    id: 'med1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Daily',
    timeOfDay: ['Morning'],
    startDate: new Date('2024-01-01'),
    sideEffects: ['Dry cough', 'Dizziness'],
    notes: 'Take with food',
  },
  {
    id: 'med2',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    timeOfDay: ['Morning', 'Evening'],
    startDate: new Date('2024-02-15'),
    sideEffects: ['Nausea'],
    notes: 'Take with meals',
  },
  {
    id: 'med3',
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Daily',
    timeOfDay: ['Evening'],
    startDate: new Date('2024-03-01'),
    sideEffects: [],
    notes: 'Take in the evening',
  },
];

const MedicationManagement = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  const todaysMedications = mockMedications.filter((med) => {
    const now = new Date();
    return med.startDate <= now && (!med.endDate || med.endDate >= now);
  });

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-900 mb-2">Medication Management</h1>
          <p className="text-slate-600">Track and manage your medications</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-6 w-6 text-blue-600" />
              <span className="text-sm text-slate-500">Today's Medications</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">{todaysMedications.length}</span>
              <span className="ml-2 text-sm text-blue-600">medications due</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Bell className="h-6 w-6 text-purple-600" />
              <span className="text-sm text-slate-500">Upcoming Reminders</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">3</span>
              <span className="ml-2 text-sm text-purple-600">in next 2 hours</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <span className="text-sm text-slate-500">Interactions</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">1</span>
              <span className="ml-2 text-sm text-red-600">potential warning</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <History className="h-6 w-6 text-green-600" />
              <span className="text-sm text-slate-500">Adherence Rate</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">95%</span>
              <span className="ml-2 text-sm text-green-600">this month</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('current')}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'current'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Current Medications
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'history'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  History
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search medications..."
                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medication
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {mockMedications.map((medication) => (
                <div
                  key={medication.id}
                  className="p-4 rounded-lg border border-slate-100 hover:border-blue-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900">{medication.name}</h3>
                      <p className="text-slate-600">
                        {medication.dosage} - {medication.frequency}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedMedication(medication)}
                      className="p-2 hover:bg-slate-50 rounded-full"
                    >
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {medication.timeOfDay.map((time) => (
                      <span
                        key={time}
                        className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                      >
                        {time}
                      </span>
                    ))}
                    {medication.sideEffects.map((effect) => (
                      <span
                        key={effect}
                        className="px-2 py-1 bg-red-50 text-red-600 rounded-full text-sm"
                      >
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-blue-900">Medication Schedule</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">View Calendar</button>
            </div>
            <div className="space-y-4">
              {[
                { time: '8:00 AM', meds: ['Lisinopril', 'Metformin'] },
                { time: '2:00 PM', meds: ['Metformin'] },
                { time: '8:00 PM', meds: ['Atorvastatin'] },
              ].map((schedule, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 rounded-lg border border-slate-100"
                >
                  <div className="w-20 text-sm font-medium text-slate-600">{schedule.time}</div>
                  <div className="flex-1">
                    {schedule.meds.map((med, i) => (
                      <span
                        key={i}
                        className="inline-block px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm mr-2"
                      >
                        {med}
                      </span>
                    ))}
                  </div>
                  <button className="p-2 hover:bg-slate-50 rounded-full">
                    <Bell className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-blue-900">Interaction Warnings</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium text-red-900">Potential Interaction</h3>
                    <p className="text-sm text-red-700 mt-1">
                      Lisinopril may interact with your other medications. Consult your healthcare
                      provider.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium text-yellow-900">Timing Recommendation</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Consider taking Metformin at different times to maximize effectiveness.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Medication Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-blue-900">Add New Medication</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full"
                >
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Medication Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter medication name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter dosage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Frequency</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select frequency</option>
                    <option value="daily">Daily</option>
                    <option value="twice">Twice Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Time of Day
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Morning', 'Afternoon', 'Evening', 'Bedtime'].map((time) => (
                      <label key={time} className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                        <span className="ml-2 text-sm text-slate-600">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                  <textarea
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Add any special instructions or notes"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary">Add Medication</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationManagement;
