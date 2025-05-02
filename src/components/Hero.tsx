import React from 'react';
import { Shield, Database, Brain } from 'lucide-react';
import Button from './ui/Button';
import AnimatedElement from './ui/AnimatedElement';

const Hero = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <AnimatedElement animation="fadeInUp" delay={0.1}>
              <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full mb-4">
                Healthcare Revolution
              </span>
            </AnimatedElement>

            <AnimatedElement animation="fadeInUp" delay={0.2}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 leading-tight mb-4">
                Secure Your Health Data with Decentralized Technology
              </h1>
            </AnimatedElement>

            <AnimatedElement animation="fadeInUp" delay={0.3}>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                Take control of your healthcare data with our cutting-edge decentralized platform.
                Enhanced privacy, AI-powered insights, and seamless provider collaboration.
              </p>
            </AnimatedElement>

            <AnimatedElement animation="fadeInUp" delay={0.4}>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button href="#contact" variant="primary" size="lg">
                  Get Started
                </Button>
                <Button href="#demo" variant="secondary" size="lg">
                  Watch Demo
                </Button>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fadeInUp" delay={0.5}>
              <div className="mt-12 flex items-center space-x-8">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-slate-700">HIPAA Compliant</span>
                </div>
                <div className="flex items-center">
                  <Database className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-slate-700">Encrypted Storage</span>
                </div>
                <div className="flex items-center">
                  <Brain className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-slate-700">AI Powered</span>
                </div>
              </div>
            </AnimatedElement>
          </div>

          <div className="md:w-1/2 mt-12 md:mt-0">
            <AnimatedElement animation="fadeIn" delay={0.6}>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 rounded-full opacity-20 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative bg-white p-2 rounded-2xl shadow-xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Healthcare data visualization"
                    className="w-full h-auto rounded-xl"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs font-medium text-slate-700">Encrypted</span>
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

export default Hero;
