import Features from '@/components/Features';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import TrustSection from '@/components/TrustSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <TrustSection />
      <Testimonials />
    </main>
  );
}
