import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { CheckCircle } from 'lucide-react';

const eventsEn = [
  { name: 'Ahmed from Cairo', action: 'requested a free audit' },
  { name: 'Tech Startup', action: 'booked the Growth Suite' },
  { name: 'Sarah from Dubai', action: 'scheduled a consultation' },
  { name: 'E-commerce Brand', action: 'started a new project' },
];

const eventsAr = [
  { name: 'أحمد من القاهرة', action: 'طلب استشارة مجانية' },
  { name: 'شركة تقنية', action: 'حجزت باقة النمو الشامل' },
  { name: 'سارة من دبي', action: 'حددت موعد استشارة' },
  { name: 'متجر إلكتروني', action: 'بدأ مشروع جديد معنا' },
];

const LiveTicker: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [eventIndex, setEventIndex] = useState(0);
  const { lang } = useApp();
  const isAr = lang === 'ar';
  const events = isAr ? eventsAr : eventsEn;

  useEffect(() => {
    // Start showing popups after 3 seconds
    const initialDelay = setTimeout(() => {
      showNextEvent();
    }, 3000);

    return () => clearTimeout(initialDelay);
  }, [lang]);

  const showNextEvent = () => {
    setEventIndex(Math.floor(Math.random() * events.length));
    setIsVisible(true);
    
    // Hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
      
      // Show next one after 10 to 20 seconds
      const nextDelay = 10000 + Math.random() * 10000;
      setTimeout(() => {
        showNextEvent();
      }, nextDelay);
      
    }, 5000);
  };

  const currentEvent = events[eventIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: isAr ? 50 : -50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`fixed bottom-24 ${isAr ? 'right-6' : 'left-6'} z-[8000] bg-white/90 dark:bg-[#1E1E1E]/90 backdrop-blur-md shadow-2xl border border-white/20 dark:border-white/10 rounded-2xl p-4 w-72 md:w-80 flex items-start gap-4`}
        >
          <div className="w-10 h-10 rounded-full bg-[#A78BFA]/20 flex items-center justify-center flex-shrink-0 mt-1">
            <CheckCircle size={20} className="text-[#A78BFA]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1E1E1E] dark:text-white mb-1">
              {currentEvent.name}
            </p>
            <p className="text-xs text-[#1E1E1E]/70 dark:text-white/70">
              {currentEvent.action}
            </p>
            <p className="text-[10px] text-[#A78BFA] font-semibold mt-2">
              {isAr ? 'منذ قليل' : 'Just now'}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveTicker;
