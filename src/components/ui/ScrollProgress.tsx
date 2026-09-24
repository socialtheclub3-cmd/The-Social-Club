import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[99999] h-[3px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #A78BFA 0%, #FF8FB1 50%, #FF8A3D 100%)',
      }}
    />
  );
};

export default ScrollProgress;
