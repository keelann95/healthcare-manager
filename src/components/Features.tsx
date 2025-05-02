import React from 'react';
import { Shield, Lock, Brain, Database, Share2, Users } from 'lucide-react';
import FeatureCard from './ui/FeatureCard';
import SectionHeading from './ui/SectionHeading';

const features = [
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'Your health data remains private with end-to-end encryption and zero-knowledge proofs.',
    color: 'blue',
  },
  {
    icon: Database,
    title: 'Decentralized Storage',
    description: 'Data stored across a secure network rather than in vulnerable central databases.',
    color: 'indigo',
  },
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Receive personalized health recommendations while maintaining data privacy.',
    color: 'purple',
  },
  {
    icon: Share2,
    title: 'Seamless Sharing',
    description: 'Securely share specific health data with providers of your choice.',
    color: 'green',
  },
  {
    icon: Lock,
    title: 'Patient Controlled',
    description: 'You decide who can access your information and for how long.',
    color: 'teal',
  },
  {
    icon: Users,
    title: 'Provider Network',
    description: 'Connect with healthcare providers who respect your data privacy.',
    color: 'cyan',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          subtitle="Key Features"
          title="Why Choose Our Platform"
          description="Our decentralized healthcare data manager combines cutting-edge technology with user-friendly design to revolutionize how your health information is stored and shared."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
