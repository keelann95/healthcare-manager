import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import AnimatedElement from './AnimatedElement';

type LucideIcon = /*unresolved*/ any;

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  color,
  delay = 0,
}) => {
  const getColorClasses = () => {
    const colorMap: Record<string, { bg: string; light: string; text: string }> = {
      blue: { bg: 'bg-blue-100', light: 'bg-blue-50', text: 'text-blue-600' },
      indigo: { bg: 'bg-indigo-100', light: 'bg-indigo-50', text: 'text-indigo-600' },
      purple: { bg: 'bg-purple-100', light: 'bg-purple-50', text: 'text-purple-600' },
      green: { bg: 'bg-green-100', light: 'bg-green-50', text: 'text-green-600' },
      teal: { bg: 'bg-teal-100', light: 'bg-teal-50', text: 'text-teal-600' },
      cyan: { bg: 'bg-cyan-100', light: 'bg-cyan-50', text: 'text-cyan-600' },
    };

    return colorMap[color] || colorMap.blue;
  };

  const { bg, light, text } = getColorClasses();

  return (
    <AnimatedElement animation="fadeInUp" delay={delay}>
      <div
        className={`p-6 rounded-xl ${light} border border-slate-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
      >
        <div className={`w-14 h-14 ${bg} rounded-xl flex items-center justify-center mb-6`}>
          <Icon className={`h-7 w-7 ${text}`} />
        </div>
        <h3 className="text-xl font-bold text-blue-900 mb-3">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </div>
    </AnimatedElement>
  );
};

export default FeatureCard;
