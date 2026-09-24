import React from 'react';
import MagneticButton from './MagneticButton';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  id?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  id,
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-semibold
    transition-all duration-300 ease-in-out cursor-pointer
    focus-visible:outline-2 focus-visible:outline-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed select-none
  `;

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-base rounded-xl',
  };

  const variantStyles = {
    primary: `
      bg-[#1E1E1E] text-white
      hover:bg-[#A78BFA] hover:shadow-lg hover:shadow-[#A78BFA]/20
      active:scale-[0.98]
    `,
    secondary: `
      bg-[#A78BFA] text-white
      hover:bg-[#8B6EF8] hover:shadow-lg hover:shadow-[#A78BFA]/30
      active:scale-[0.98]
    `,
    ghost: `
      bg-transparent text-[#1E1E1E] dark:text-white
      border border-[#1E1E1E]/20 dark:border-white/20
      hover:border-[#A78BFA] hover:text-[#A78BFA]
      active:scale-[0.98]
    `,
    outline: `
      bg-transparent text-white
      border border-white/40
      hover:bg-white hover:text-[#1E1E1E]
      active:scale-[0.98]
    `,
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <MagneticButton>
        <a href={href} onClick={onClick} className={combinedStyles} id={id}>
          {children}
        </a>
      </MagneticButton>
    );
  }

  return (
    <MagneticButton>
      <button
        type={type}
        onClick={onClick}
        className={combinedStyles}
        disabled={disabled}
        id={id}
      >
        {children}
      </button>
    </MagneticButton>
  );
};

export default Button;
