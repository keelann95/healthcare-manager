// app/(public)/layout.tsx
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function PublicLayout({
  children,
  userRole,
  userData,
}: {
  children: React.ReactNode;
  userRole: any;
  userData: any;
}) {
  return (
    <>
      <Header userRole={userRole} userData={userData} />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
}
