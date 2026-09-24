import React from 'react';
import { motion } from 'framer-motion';

interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number;
  wordMode?: boolean;
}

const StaggeredText: React.FC<StaggeredTextProps> = ({
  text,
  className = '',
  delay = 0,
  wordMode = true,
}) => {
  const elements = wordMode ? text.split(' ') : text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: wordMode ? '0.25em' : '0' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {elements.map((element, index) => (
        <motion.span variants={child} key={index} style={{ display: 'inline-block' }}>
          {element === ' ' && !wordMode ? '\u00A0' : element}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default StaggeredText;
