import React from 'react';
import { useApp } from '../../context/AppContext';

interface LogoProps {
  variant?: 'dark' | 'light' | 'color';
  className?: string;
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ variant, className = '' }) => {
  const { theme } = useApp();
  
  // If variant not specified, automatically adapt to current theme
  const isLight = variant ? variant === 'light' : theme === 'dark';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/logo.png"
        alt="The Social Club"
        className="h-12 sm:h-14 w-auto object-contain transition-all duration-300 hover:scale-105"
        style={
          isLight
            ? {
                filter: 'invert(1) hue-rotate(180deg) brightness(1.2)',
              }
            : undefined
        }
      />
    </div>
  );
};

export default Logo;
