import React from 'react';
import { Shield, Database, Share2, UserCircle } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedElement from './ui/AnimatedElement';

const steps = [
  {
    number: '01',
    icon: UserCircle,
    title: 'Create Your Account',
    description:
      'Sign up with your email and set up your secure account with multi-factor authentication.',
    delay: 0.1,
  },
  {
    number: '02',
    icon: Shield,
    title: 'Import Your Data',
    description: 'Securely import your existing health records and data from providers or devices.',
    delay: 0.2,
  },
  {
    number: '03',
    icon: Database,
    title: 'Decentralized Storage',
    description:
      'Your data is encrypted and stored across a secure network of nodes rather than in a central database.',
    delay: 0.3,
  },
  {
    number: '04',
    icon: Share2,
    title: 'Control Access',
    description:
      'Grant and revoke access to specific parts of your health data to chosen providers.',
    delay: 0.4,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          subtitle="Simple Process"
          title="How It Works"
          description="Our platform makes managing your healthcare data simple and secure, with just a few steps to complete control."
          center
        />

        <div className="mt-16 relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 transform -translate-x-1/2"></div>

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <AnimatedElement key={index} animation="fadeInUp" delay={step.delay}>
                <div
                  className={`flex flex-col lg:flex-row ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } items-center`}
                >
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <div className={`text-center lg:text-${index % 2 === 0 ? 'right' : 'left'}`}>
                      <div className="inline-block text-5xl font-bold text-blue-100 mb-4">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-bold text-blue-900 mb-2">{step.title}</h3>
                      <p className="text-slate-600">{step.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 lg:mt-0 lg:w-1/2 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-100 rounded-full opacity-20 blur-lg"></div>
                      <div className="relative bg-white p-4 rounded-full shadow-lg">
                        <step.icon className="h-12 w-12 text-blue-600" />
                      </div>

                      {/* Connector to timeline - only on desktop */}
                      <div
                        className={`hidden lg:block absolute top-1/2 ${
                          index % 2 === 0 ? 'left-full' : 'right-full'
                        } w-8 h-0.5 bg-blue-100 transform -translate-y-1/2`}
                      ></div>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
