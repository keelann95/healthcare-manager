import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import Button from './ui/Button';
import AnimatedElement from './ui/AnimatedElement';

const CallToAction = () => {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-br from-blue-900 to-blue-800 text-white"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedElement animation="fadeInUp" delay={0.1}>
            <Shield className="h-16 w-16 text-blue-300 mx-auto mb-6" />
          </AnimatedElement>

          <AnimatedElement animation="fadeInUp" delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Take Control of Your Health Data?
            </h2>
          </AnimatedElement>

          <AnimatedElement animation="fadeInUp" delay={0.3}>
            <p className="text-xl text-blue-200 mb-10 leading-relaxed">
              Join thousands of patients and healthcare providers who are already benefiting from
              our secure, decentralized platform.
            </p>
          </AnimatedElement>

          <AnimatedElement animation="fadeInUp" delay={0.4}>
            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Get Started Today</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-blue-300/30 focus:border-blue-300 focus:outline-none text-white placeholder:text-blue-200"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-blue-300/30 focus:border-blue-300 focus:outline-none text-white placeholder:text-blue-200"
                  />
                </div>
                <div>
                  <select className="w-full px-4 py-3 rounded-lg bg-white/20 border border-blue-300/30 focus:border-blue-300 focus:outline-none text-white">
                    <option value="" className="bg-blue-800">
                      I am a...
                    </option>
                    <option value="patient" className="bg-blue-800">
                      Patient
                    </option>
                    <option value="provider" className="bg-blue-800">
                      Healthcare Provider
                    </option>
                    <option value="admin" className="bg-blue-800">
                      Healthcare Administrator
                    </option>
                  </select>
                </div>
                <Button variant="white" size="lg" className="w-full">
                  Get Access
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="fadeIn" delay={0.5}>
            <p className="mt-8 text-sm text-blue-300">
              By signing up, you agree to our Terms of Service and Privacy Policy.
              <br />
              All data is encrypted and secure.
            </p>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
