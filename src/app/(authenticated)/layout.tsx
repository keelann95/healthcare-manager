'use client';
// app/(auth)/layout.tsx

import Footer from '@/components/Footer';
import { AdminHeader, PatientHeader, ProviderHeader } from '@/components/Header';
import { useUser } from '@/lib/useUser';

const AppHeader = ({ user }) => {
  if (!user) return null;

  switch (user.role) {
    case 'admin':
      return <AdminHeader userName={user.name} />;
    case 'provider':
      return <ProviderHeader providerName={user.name} />;
    case 'patient':
      return <PatientHeader patientName={user.name} />;
    default:
      return null;
  }
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const User = useUser();

  return (
    <>
      <AppHeader user={User} />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
}
