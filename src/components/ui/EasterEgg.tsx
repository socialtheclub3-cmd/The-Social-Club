import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASTER_EGG_CODE = 'grow';

interface Rocket {
  id: number;
  left: string;
  delay: number;
  size: string;
}

const EasterEgg: React.FC = () => {
  const [keys, setKeys] = useState<string[]>([]);
  const [rockets, setRockets] = useState<Rocket[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      
      const key = e.key.toLowerCase();
      if (!/^[a-z]$/.test(key)) return;

      setKeys((prev) => {
        const newKeys = [...prev, key];
        if (newKeys.length > EASTER_EGG_CODE.length) {
          newKeys.shift();
        }
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (keys.join('') === EASTER_EGG_CODE) {
      triggerEasterEgg();
      setKeys([]);
    }
  }, [keys]);

  const triggerEasterEgg = () => {
    const newRockets = Array.from({ length: 25 }).map((_, i) => ({
      id: Date.now() + i,
      left: `${Math.random() * 90 + 5}%`, // Keeps them from hitting the very edges
      delay: Math.random() * 1.5, // Used in framer-motion delay
      size: `${Math.random() * 2 + 2}rem`,
    }));
    
    setRockets(newRockets);

    setTimeout(() => {
      setRockets([]);
    }, 5000);
  };

  return (
    <AnimatePresence>
      {rockets.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          
          <motion.div 
            initial={{ scale: 0.5, opacity: 0, x: '-50%', y: '-50%' }}
            animate={{ scale: 1, opacity: 1, x: '-50%', y: '-50%' }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="absolute top-1/2 left-1/2 text-center z-10"
          >
            <motion.h2 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-5xl md:text-8xl font-black text-white mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            >
              GROWTH MODE 🚀
            </motion.h2>
            <p className="text-2xl text-[#A78BFA] font-bold drop-shadow-lg uppercase tracking-widest">
              To The Moon!
            </p>
          </motion.div>
          
          {rockets.map((r) => (
            <motion.div
              key={r.id}
              className="absolute bottom-[-100px]"
              initial={{ y: 0, scale: 1, rotate: 0, opacity: 1 }}
              animate={{ 
                y: '-120vh', 
                scale: [1, 1.5, 1],
                rotate: [0, 10, -10],
                opacity: [1, 1, 0]
              }}
              transition={{ 
                duration: 3, 
                ease: "easeInOut", 
                delay: r.delay 
              }}
              style={{
                left: r.left,
                fontSize: r.size,
                filter: 'drop-shadow(0 10px 10px rgba(255,143,177,0.5))'
              }}
            >
              🚀
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterEgg;
