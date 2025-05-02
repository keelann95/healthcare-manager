// app/dashboard/page.tsx
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import TrustSection from '@/components/TrustSection';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <TrustSection />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
