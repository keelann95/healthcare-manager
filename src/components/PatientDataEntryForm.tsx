'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Activity, Pill, Thermometer, Heart, LineChart, Droplets, Plus, X, Save, Upload } from 'lucide-react';

export default function PatientDataEntryForm() {
  const [activeTab, setActiveTab] = useState('vitals');
  const [formData, setFormData] = useState({
    vitals: {
      bloodPressure: { systolic: '', diastolic: '' },
      heartRate: '',
      temperature: '',
      oxygenLevel: '',
      bloodSugar: '',
      weight: '',
      height: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().substring(0, 5)
    },
    medications: [],
    symptoms: [],
    appointments: []
  });
  
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    startDate: new Date().toISOString().split('T')[0],
    notes: ''
  });
  
  const [newSymptom, setNewSymptom] = useState({
    name: '',
    severity: '3',
    startDate: new Date().toISOString().split('T')[0],
    notes: ''
  });
  
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    doctor: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().substring(0, 5),
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to your backend
      // await fetch('/api/patient-data', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitMessage('Data saved successfully!');
      setSubmitSuccess(true);
      
      // Clear form or prepare for next entry
      if (activeTab === 'symptoms') {
        setNewSymptom({
          name: '',
          severity: '3',
          startDate: new Date().toISOString().split('T')[0],
          notes: ''
        });
      } else if (activeTab === 'medications') {
        setNewMedication({
          name: '',
          dosage: '',
          frequency: 'daily',
          startDate: new Date().toISOString().split('T')[0],
          notes: ''
        });
      } else if (activeTab === 'appointments') {
        setNewAppointment({
          title: '',
          doctor: '',
          date: new Date().toISOString().split('T')[0],
          time: new Date().toTimeString().substring(0, 5),
          notes: ''
        });
      }
      
    } catch (error) {
      setSubmitMessage('Error saving data. Please try again.');
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 3000);
    }
  };
  
  // Handle vital sign input changes
  const handleVitalsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      vitals: {
        ...prev.vitals,
        [field]: value
      }
    }));
  };
  
  // Handle blood pressure input changes
  const handleBPChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      vitals: {
        ...prev.vitals,
        bloodPressure: {
          ...prev.vitals.bloodPressure,
          [type]: value
        }
      }
    }));
  };
  
  // Add new medication
  const addMedication = () => {
    if (newMedication.name.trim() === '' || newMedication.dosage.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      medications: [...prev.medications, { ...newMedication, id: Date.now() }]
    }));
    
    setNewMedication({
      name: '',
      dosage: '',
      frequency: 'daily',
      startDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };
  
  // Remove medication
  const removeMedication = (id) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.filter(med => med.id !== id)
    }));
  };
  
  // Add new symptom
  const addSymptom = () => {
    if (newSymptom.name.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      symptoms: [...prev.symptoms, { ...newSymptom, id: Date.now() }]
    }));
    
    setNewSymptom({
      name: '',
      severity: '3',
      startDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };
  
  // Remove symptom
  const removeSymptom = (id) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.filter(symptom => symptom.id !== id)
    }));
  };
  
  // Add new appointment
  const addAppointment = () => {
    if (newAppointment.title.trim() === '' || newAppointment.doctor.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      appointments: [...prev.appointments, { ...newAppointment, id: Date.now() }]
    }));
    
    setNewAppointment({
      title: '',
      doctor: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().substring(0, 5),
      notes: ''
    });
  };
  
  // Remove appointment
  const removeAppointment = (id) => {
    setFormData(prev => ({
      ...prev,
      appointments: prev.appointments.filter(appt => appt.id !== id)
    }));
  };
  
  // Tab navigation components
  const tabs = [
    { id: 'vitals', label: 'Vital Signs', icon: <Activity size={18} /> },
    { id: 'medications', label: 'Medications', icon: <Pill size={18} /> },
    { id: 'symptoms', label: 'Symptoms', icon: <Thermometer size={18} /> },
    { id: 'appointments', label: 'Appointments', icon: <Calendar size={18} /> }
  ];
  
  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left Sidebar Navigation */}
        <aside className="bg-blue-600 text-white p-4 md:w-64 flex flex-col">
          <h2 className="text-xl font-bold mb-6 text-center">Health Data Entry</h2>
          
          <nav className="flex flex-col gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-800 text-white' 
                    : 'hover:bg-blue-700 text-blue-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
          
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="mt-auto bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span>Saving...</span>
            ) : (
              <>
                <Save size={18} />
                <span>Save Data</span>
              </>
            )}
          </button>
          
          {submitMessage && (
            <div className={`mt-4 p-3 rounded-lg text-center ${
              submitSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {submitMessage}
            </div>
          )}
        </aside>
        
        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vitals Tab */}
            {activeTab === 'vitals' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                  <Heart className="text-red-500" />
                  Vital Signs
                </h3>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-700">Date & Time</h4>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-blue-500" />
                        <input
                          type="date"
                          value={formData.vitals.date}
                          onChange={(e) => handleVitalsChange('date', e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-blue-500" />
                        <input
                          type="time"
                          value={formData.vitals.time}
                          onChange={(e) => handleVitalsChange('time', e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Blood Pressure (mmHg)
                        </label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="number"
                            placeholder="Systolic"
                            value={formData.vitals.bloodPressure.systolic}
                            onChange={(e) => handleBPChange('systolic', e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-gray-500">/</span>
                          <input
                            type="number"
                            placeholder="Diastolic"
                            value={formData.vitals.bloodPressure.diastolic}
                            onChange={(e) => handleBPChange('diastolic', e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Heart Rate (bpm)
                        </label>
                        <input
                          type="number"
                          placeholder="Heart Rate"
                          value={formData.vitals.heartRate}
                          onChange={(e) => handleVitalsChange('heartRate', e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Temperature (°F)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="Temperature"
                          value={formData.vitals.temperature}
                          onChange={(e) => handleVitalsChange('temperature', e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Blood Oxygen (%)
                        </label>
                        <input
                          type="number"
                          placeholder="Oxygen Level"
                          value={formData.vitals.oxygenLevel}
                          onChange={(e) => handleVitalsChange('oxygenLevel', e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Blood Sugar (mg/dL)
                        </label>
                        <input
                          type="number"
                          placeholder="Blood Sugar"
                          value={formData.vitals.bloodSugar}
                          onChange={(e) => handleVitalsChange('bloodSugar', e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Weight (lbs)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="Weight"
                          value={formData.vitals.weight}
                          onChange={(e) => handleVitalsChange('weight', e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Height (in)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="Height"
                          value={formData.vitals.height}
                          onChange={(e) => handleVitalsChange('height', e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div className="mt-6">
                        <button
                          type="button"
                          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
                          onClick={() => {
                            handleVitalsChange('bloodPressure', { systolic: '120', diastolic: '80' });
                            handleVitalsChange('heartRate', '75');
                            handleVitalsChange('oxygenLevel', '98');
                          }}
                        >
                          <Upload size={16} />
                          <span>Import from Device</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="font-medium text-gray-700 mb-4">Vital Signs Trends</h4>
                  <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg border border-gray-200">
                    <div className="text-center text-gray-500 flex flex-col items-center">
                      <LineChart size={40} className="text-blue-500 mb-2" />
                      <p>Trends will be displayed here after saving multiple data points</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Medications Tab */}
            {activeTab === 'medications' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                  <Pill className="text-purple-500" />
                  Medications
                </h3>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="font-medium text-gray-700 mb-4">Add New Medication</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Medication Name
                        </label>
                        <input
                          type="text"
                          placeholder="Medication Name"
                          value={newMedication.name}
                          onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Dosage
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 10mg"
                          value={newMedication.dosage}
                          onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Frequency
                        </label>
                        <select
                          value={newMedication.frequency}
                          onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="daily">Daily</option>
                          <option value="twice-daily">Twice Daily</option>
                          <option value="three-times-daily">Three Times Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="as-needed">As Needed</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={newMedication.startDate}
                          onChange={(e) => setNewMedication({...newMedication, startDate: e.target.value})}
                          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Notes
                        </label>
                        <textarea
                          placeholder="Any additional notes"
                          value={newMedication.notes}
                          onChange={(e) => setNewMedication({...newMedication, notes: e.target.value})}
                          className="border border-gray-300 rounded px-3 py-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={addMedication}
                      className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!newMedication.name || !newMedication.dosage}
                    >
                      <Plus size={16} />
                      <span>Add Medication</span>
                    </button>
                  </div>
                </div>
                
                {formData.medications.length > 0 && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="font-medium text-gray-700 mb-4">Current Medications</h4>
                    
                    <div className="space-y-4">
                      {formData.medications.map(med => (
                        <div key={med.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                          <div>
                            <h5 className="font-medium text-gray-800">{med.name}</h5>
                            <p className="text-sm text-gray-600">
                              {med.dosage} • {med.frequency.replace('-', ' ')} • Since {med.startDate}
                            </p>
                            {med.notes && (
                              <p className="text-sm text-gray-500 mt-1">Notes: {med.notes}</p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeMedication(med.id)}
                            className="text-red-500 hover:text-red-700 p-1 transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Symptoms Tab */}
            {activeTab === 'symptoms' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                  <Thermometer className="text-red-500" />
                  Symptoms
                </h3>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="font-medium text-gray-700 mb-4">Add New Symptom</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Symptom Name
                        </label>
                        <input
                          type="text"
                          placeholder="Symptom Name"
                          value={newSymptom.name}
                          onChange={(e) => setNewSymptom({...newSymptom, name: e.target.value})}
                          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Severity (1-10)
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={newSymptom.severity}
                            onChange={(e) => setNewSymptom({...newSymptom, severity: e.target.value})}
                            className="w-full accent-red-500"
                          />
                          <span className="text-gray-700 font-medium">{newSymptom.severity}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={newSymptom.startDate}
                          onChange={(e) => setNewSymptom({...newSymptom, startDate: e.target.value})}
                          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Notes
                      </label>
                      <textarea
                        placeholder="Describe your symptoms in detail"
                        value={newSymptom.notes}
                        onChange={(e) => setNewSymptom({...newSymptom, notes: e.target.value})}
                        className="border border-gray-300 rounded px-3 py-2 w-full h-32 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={addSymptom}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!newSymptom.name}
                    >
                      <Plus size={16} />
                      <span>Add Symptom</span>
                    </button>
                  </div>
                </div>
                
                {formData.symptoms.length > 0 && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="font-medium text-gray-700 mb-4">Current Symptoms</h4>
                    
                    <div className="space-y-4">
                      {formData.symptoms.map(symptom => (
                        <div key={symptom.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-medium text-gray-800">{symptom.name}</h5>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                parseInt(symptom.severity) > 7 
                                  ? 'bg-red-100 text-red-800' 
                                  : parseInt(symptom.severity) > 4 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-green-100 text-green-800'
                              }`}>
                                Severity: {symptom.severity}/10
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Started on {symptom.startDate}
                            </p>
                            {symptom.notes && (
                              <p className="text-sm text-gray-500 mt-1">Notes: {symptom.notes}</p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSymptom(symptom.id)}
                            className="text-red-500 hover:text-red-700 p-1 transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                  <Calendar className="text-blue-500" />
                  Appointments
                </h3>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="font-medium text-gray-700 mb-4">Schedule New Appointment</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Appointment Title
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Annual Physical"
                          value={newAppointment.title}
                          onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Doctor/Provider
                        </label>
                        <input
                          type="text"
                          placeholder="Doctor's Name"
                          value={newAppointment.doctor}
                          onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})}
                          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <label className="block mb-1 text-sm font-medium text-gray-700">
                            Date
                          </label>
                          <input
                            type="date"
                            value={newAppointment.date}
                            onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block mb-1 text-sm font-medium text-gray-700">
                            Time
                          </label>
                          <input
                            type="time"
                            value={newAppointment.time}
                            onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Notes
                      </label>
                      <textarea
                        placeholder="Any additional notes about the appointment"
                        value={newAppointment.notes}
                        onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                        className="border border-gray-300 rounded px-3 py-2 w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={addAppointment}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!newAppointment.title || !newAppointment.doctor}
                    >
                      <Plus size={16} />
                      <span>Add Appointment</span>
                    </button>
                  </div>
                </div>
                
                {formData.appointments.length > 0 && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="font-medium text-gray-700 mb-4">Upcoming Appointments</h4>
                    
                    <div className="space-y-4">
                      {formData.appointments.map(appt => (
                        <div key={appt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                          <div>
                            <h5 className="font-medium text-gray-800">{appt.title}</h5>
                            <p className="text-sm text-gray-600">
                              With {appt.doctor} • {appt.date} at {appt.time}
                            </p>
                            {appt.notes && (
                              <p className="text-sm text-gray-500 mt-1">Notes: {appt.notes}</p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAppointment(appt.id)}
                            className="text-red-500 hover:text-red-700 p-1 transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}