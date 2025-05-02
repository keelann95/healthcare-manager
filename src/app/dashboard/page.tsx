// app/dashboard/page.tsx

import Dashboard from '@/components/Dashboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <main>
        <Dashboard />
      </main>
    </div>
  );
}
