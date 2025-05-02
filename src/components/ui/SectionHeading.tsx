import React from 'react';
import AnimatedElement from './AnimatedElement';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  center?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  subtitle,
  title,
  description,
  center = false,
}) => {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {subtitle && (
        <AnimatedElement animation="fadeInUp" delay={0.1}>
          <div
            className={`inline-block px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full mb-4`}
          >
            {subtitle}
          </div>
        </AnimatedElement>
      )}

      <AnimatedElement animation="fadeInUp" delay={0.2}>
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">{title}</h2>
      </AnimatedElement>

      {description && (
        <AnimatedElement animation="fadeInUp" delay={0.3}>
          <p className="text-lg text-slate-600">{description}</p>
        </AnimatedElement>
      )}
    </div>
  );
};

export default SectionHeading;
