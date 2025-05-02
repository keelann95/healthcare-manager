'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedElement from './ui/AnimatedElement';

const testimonials = [
  {
    content:
      'As a patient with multiple chronic conditions, keeping my health data organized was a nightmare. This platform has changed everything. I can securely share relevant information with each specialist without repeating tests or explanations.',
    author: 'Sarah Johnson',
    role: 'Patient',
    image:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    content:
      'The decentralized approach has transformed how our practice handles patient data. We get exactly what we need, when we need it, while respecting patient privacy. The AI insights have helped us spot trends we might have missed.',
    author: 'Dr. Michael Chen',
    role: 'Cardiologist',
    image:
      'https://images.pexels.com/photos/5329069/pexels-photo-5329069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    content:
      'As a healthcare administrator, this platform solves many of our data management challenges. Interoperability with our existing systems was seamless, and the security protocols exceed our requirements.',
    author: 'Lisa Patel',
    role: 'Healthcare Administrator',
    image:
      'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          subtitle="Success Stories"
          title="What Our Users Say"
          description="Join thousands of patients and healthcare providers who are already benefiting from our secure, decentralized platform."
          center
        />

        <div className="mt-16 max-w-4xl mx-auto">
          <AnimatedElement animation="fadeIn" key={`testimonial-${activeIndex}`}>
            <div className="bg-gradient-to-br from-slate-50 to-white p-8 md:p-10 rounded-2xl shadow-lg">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto md:mx-0">
                    <div className="absolute inset-0 bg-blue-200 rounded-full opacity-20 blur-lg"></div>
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].author}
                      className="relative w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mb-6 text-lg italic text-slate-700">
                    "{testimonials[activeIndex].content}"
                  </blockquote>
                  <div>
                    <p className="font-bold text-blue-900">{testimonials[activeIndex].author}</p>
                    <p className="text-slate-600">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>

          <div className="flex justify-center mt-10 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-blue-600" />
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeIndex === index ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
