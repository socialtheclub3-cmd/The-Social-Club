import React, { useEffect, useState } from 'react';

const EASTER_EGG_CODE = 'grow';

interface Rocket {
  id: number;
  left: string;
  delay: string;
  size: string;
}

const EasterEgg: React.FC = () => {
  const [keys, setKeys] = useState<string[]>([]);
  const [rockets, setRockets] = useState<Rocket[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
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
    // Generate 25 rockets with random positions and delays
    const newRockets = Array.from({ length: 25 }).map((_, i) => ({
      id: Date.now() + i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 1.5}s`,
      size: `${Math.random() * 2 + 2}rem`,
    }));
    
    setRockets(newRockets);

    // Remove rockets after animation finishes
    setTimeout(() => {
      setRockets([]);
    }, 5000);
  };

  if (rockets.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 animate-in fade-in" />
      <div className="easter-egg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <h2 className="text-5xl md:text-8xl font-black text-white mb-4 animate-bounce drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
          GROWTH MODE 🚀
        </h2>
        <p className="text-2xl text-[#A78BFA] font-bold drop-shadow-lg uppercase tracking-widest">
          To The Moon!
        </p>
      </div>
      
      {rockets.map((r) => (
        <div
          key={r.id}
          className="easter-egg-rocket absolute bottom-[-100px]"
          style={{
            left: r.left,
            animationDelay: r.delay,
            fontSize: r.size,
            filter: 'drop-shadow(0 10px 10px rgba(255,143,177,0.5))'
          }}
        >
          🚀
        </div>
      ))}
      <style>{`
        .easter-egg-rocket {
          animation: fly-up 3s ease-in-out forwards;
        }
        .easter-egg-text {
          animation: scale-in 0.5s ease-out forwards;
        }
        @keyframes fly-up {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-60vh) scale(1.5) rotate(10deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) scale(1) rotate(-10deg);
            opacity: 0;
          }
        }
        @keyframes scale-in {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default EasterEgg;
