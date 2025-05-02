'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedElementProps {
  children: React.ReactNode;
  animation: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight';
  delay?: number;
  duration?: number;
  className?: string;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  animation,
  delay = 0,
  duration = 0.5,
  className = '',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  const getAnimationStyles = () => {
    const baseStyles = {
      opacity: isVisible ? 1 : 0,
      transform: '',
      transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
    };

    switch (animation) {
      case 'fadeInUp':
        baseStyles.transform = isVisible ? 'translateY(0)' : 'translateY(40px)';
        break;
      case 'fadeInDown':
        baseStyles.transform = isVisible ? 'translateY(0)' : 'translateY(-40px)';
        break;
      case 'fadeInLeft':
        baseStyles.transform = isVisible ? 'translateX(0)' : 'translateX(40px)';
        break;
      case 'fadeInRight':
        baseStyles.transform = isVisible ? 'translateX(0)' : 'translateX(-40px)';
        break;
      case 'fadeIn':
      default:
        break;
    }

    return baseStyles;
  };

  return (
    <div ref={elementRef} style={getAnimationStyles()} className={className}>
      {children}
    </div>
  );
};

export default AnimatedElement;
