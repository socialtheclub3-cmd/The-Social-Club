import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  titleClassName?: string;
  light?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  titleClassName = '',
  light = false,
}) => {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  const textColor = light ? 'text-white' : 'text-[#1E1E1E] dark:text-white';
  const subtitleColor = light ? 'text-white/70' : 'text-[#1E1E1E]/60 dark:text-white/60';
  const eyebrowColor = light ? 'text-[#A78BFA]' : 'text-[#A78BFA]';

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      {eyebrow && (
        <span className={`text-sm font-semibold uppercase tracking-[0.15em] ${eyebrowColor}`}>
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] ${textColor} ${titleClassName}`}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p className={`text-base sm:text-lg font-normal max-w-2xl ${subtitleColor} leading-relaxed`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
