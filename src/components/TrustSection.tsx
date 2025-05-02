import React from 'react';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedElement from './ui/AnimatedElement';

const certifications = [
  'HIPAA Compliant',
  'GDPR Compliant',
  'SOC 2 Certified',
  'ISO 27001 Certified',
  'Regular Security Audits',
  '256-bit Encryption',
];

const TrustSection = () => {
  return (
    <section className="py-16 md:py-24 bg-blue-900 text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <AnimatedElement animation="fadeInUp" delay={0.1}>
              <div className="inline-block px-3 py-1 text-sm font-semibold text-blue-200 bg-blue-800 rounded-full mb-4">
                Industry Leading Security
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fadeInUp" delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Data Security Is Our Top Priority
              </h2>
            </AnimatedElement>

            <AnimatedElement animation="fadeInUp" delay={0.3}>
              <p className="text-blue-200 mb-8 leading-relaxed">
                We've built our platform with the highest security standards in mind. Our
                decentralized approach eliminates single points of failure, while our encryption
                protocols ensure your data remains private even as it's being analyzed or shared.
              </p>
            </AnimatedElement>

            <AnimatedElement animation="fadeInUp" delay={0.4}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-blue-100">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedElement>
          </div>

          <div className="md:w-1/2 mt-12 md:mt-0">
            <AnimatedElement animation="fadeIn" delay={0.5}>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-700 rounded-full opacity-20 blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-blue-800 to-blue-700 p-8 rounded-2xl shadow-xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
                  <div className="relative">
                    <ShieldCheck className="h-16 w-16 text-blue-300 mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Security By Design</h3>
                    <p className="text-blue-200 mb-6">
                      Our architecture is built on zero-knowledge proofs, multi-party computation,
                      and state-of-the-art encryption to ensure your most sensitive health data
                      remains private while still allowing for powerful AI analysis.
                    </p>
                    <div className="pt-6 border-t border-blue-700">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                        <span className="text-blue-100 font-medium">
                          Systems actively monitored 24/7/365
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
