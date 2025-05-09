'use client';
import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  FileText,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';

interface Patient {
  id: string;
  name: string;
  lastAccessed: Date;
  status: 'Active' | 'Pending' | 'Archived';
  type: 'Full' | 'Partial' | 'Emergency';
  nextAppointment: Date | null;
}

const mockPatients: Patient[] = [
  {
    id: 'P-001',
    name: 'John Smith',
    lastAccessed: new Date('2024-03-10'),
    status: 'Active',
    type: 'Full',
    nextAppointment: new Date('2024-03-20'),
  },
  {
    id: 'P-002',
    name: 'Sarah Johnson',
    lastAccessed: new Date('2024-03-09'),
    status: 'Active',
    type: 'Partial',
    nextAppointment: new Date('2024-03-25'),
  },
  {
    id: 'P-003',
    name: 'Michael Brown',
    lastAccessed: new Date('2024-03-08'),
    status: 'Pending',
    type: 'Emergency',
    nextAppointment: null,
  },
];

const columnHelper = createColumnHelper<Patient>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Patient Name',
    cell: (info) => (
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
          {info
            .getValue()
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <span className="font-medium">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <span
        className={`px-2 py-1 rounded-full text-sm ${
          info.getValue() === 'Active'
            ? 'bg-green-100 text-green-700'
            : info.getValue() === 'Pending'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-100 text-gray-700'
        }`}
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('type', {
    header: 'Access Type',
    cell: (info) => (
      <span
        className={`px-2 py-1 rounded-full text-sm ${
          info.getValue() === 'Full'
            ? 'bg-blue-100 text-blue-700'
            : info.getValue() === 'Partial'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-red-100 text-red-700'
        }`}
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('lastAccessed', {
    header: 'Last Accessed',
    cell: (info) => format(info.getValue(), 'MMM d, yyyy'),
  }),
  columnHelper.accessor('nextAppointment', {
    header: 'Next Appointment',
    cell: (info) => {
      const value = info.getValue();
      return value instanceof Date ? format(value, 'MMM d, yyyy') : 'Not scheduled';
    },
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => (
      <button className="p-2 hover:bg-slate-100 rounded-full">
        <MoreVertical className="h-4 w-4 text-slate-500" />
      </button>
    ),
  }),
];

const ProviderPortal = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const table = useReactTable({
    data: mockPatients,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-900 mb-2">Provider Portal</h1>
          <p className="text-slate-600">Manage your patients' data and access requests</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-6 w-6 text-blue-600" />
              <span className="text-sm text-slate-500">Total Patients</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">248</span>
              <span className="ml-2 text-sm text-green-600">+12% this month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <MessageSquare className="h-6 w-6 text-purple-600" />
              <span className="text-sm text-slate-500">Pending Messages</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">15</span>
              <span className="ml-2 text-sm text-yellow-600">5 urgent</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <FileText className="h-6 w-6 text-green-600" />
              <span className="text-sm text-slate-500">Documents</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">1,284</span>
              <span className="ml-2 text-sm text-blue-600">89% encrypted</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Bell className="h-6 w-6 text-red-600" />
              <span className="text-sm text-slate-500">Alerts</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-900">3</span>
              <span className="ml-2 text-sm text-red-600">Requires attention</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add Patient
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-slate-600"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-blue-900">Upcoming Appointments</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 rounded-lg border border-slate-100 hover:border-blue-100 transition-colors"
                >
                  <div className="mr-4">
                    <Calendar className="h-10 w-10 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-blue-900">Sarah Johnson</h3>
                    <p className="text-sm text-slate-500">Regular Checkup</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-900">2:30 PM</p>
                    <p className="text-sm text-slate-500">Mar 25, 2024</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-blue-900">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: FileText,
                  text: 'Updated medical records for John Smith',
                  time: '2 hours ago',
                },
                { icon: MessageSquare, text: 'New message from Dr. Anderson', time: '4 hours ago' },
                {
                  icon: Clock,
                  text: 'Appointment rescheduled with Michael Brown',
                  time: 'Yesterday',
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="p-2 rounded-lg bg-slate-50 mr-4">
                    <activity.icon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-600">{activity.text}</p>
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                  <button className="p-1 hover:bg-slate-50 rounded">
                    <ArrowUpRight className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderPortal;
