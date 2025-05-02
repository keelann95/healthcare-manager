'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Database, Brain, Menu, X } from 'lucide-react';
import Button from './ui/Button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-blue-900">DHDM</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-blue-900 hover:text-blue-600 font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-blue-900 hover:text-blue-600 font-medium transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-blue-900 hover:text-blue-600 font-medium transition-colors"
            >
              Testimonials
            </a>
            <Button href="#contact" variant="primary" size="sm">
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-900 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-4">
            <a
              href="#features"
              className="text-blue-900 hover:text-blue-600 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-blue-900 hover:text-blue-600 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-blue-900 hover:text-blue-600 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <Button
              href="#contact"
              variant="primary"
              size="sm"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full"
            >
              Get Started
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
