import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { CheckCircle } from 'lucide-react';

const eventsEn = [
  { name: 'D2C Retail Brand', action: 'requested a free growth audit' },
  { name: 'Enterprise SaaS Startup', action: 'booked a discovery sprint' },
  { name: 'Luxury Real Estate Group', action: 'scheduled a strategy consultation' },
  { name: 'Specialized Healthcare Center', action: 'initiated a new patient lead funnel' },
];

const eventsAr = [
  { name: 'علامة تجارة إلكترونية (D2C)', action: 'طلبت تدقيقاً مجانياً لإعلاناتها' },
  { name: 'شركة برمجيات وخدمات B2B', action: 'حجزت جلسة استكشاف استراتيجية' },
  { name: 'مجموعة استثمار وتسويق عقاري', action: 'حددت موعد استشارة لتوليد المشترين' },
  { name: 'مركز طبي تخصصي', action: 'أطلق منظومة استقطاب مرضى جديدة' },
];

const LiveTicker: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [eventIndex, setEventIndex] = useState(0);
  const { lang } = useApp();
  const isAr = lang === 'ar';
  const events = isAr ? eventsAr : eventsEn;

  useEffect(() => {
    // Show first one after 5 minutes (300,000 ms)
    const initialDelay = setTimeout(() => {
      showNextEvent();
    }, 300000);

    return () => clearTimeout(initialDelay);
  }, [lang]);

  const showNextEvent = () => {
    setEventIndex(Math.floor(Math.random() * events.length));
    setIsVisible(true);
    
    // Hide after 15 seconds (duration of animation)
    setTimeout(() => {
      setIsVisible(false);
      
      // Show next one after 10 minutes (600,000 ms)
      setTimeout(() => {
        showNextEvent();
      }, 600000);
      
    }, 15000);
  };

  const currentEvent = events[eventIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-[72px] left-0 w-full z-[8000] bg-[#1E1E1E] text-white py-2 overflow-hidden flex items-center"
        >
          <motion.div
            initial={{ x: isAr ? '-100vw' : '100vw' }}
            animate={{ x: isAr ? '100vw' : '-100vw' }}
            transition={{ duration: 15, ease: 'linear' }}
            className="flex items-center gap-3 whitespace-nowrap px-4"
          >
            <CheckCircle size={16} className="text-[#7ED6B7]" />
            <span className="font-bold">{currentEvent.name}</span>
            <span className="opacity-80">{currentEvent.action}</span>
            <span className="text-[#7ED6B7] text-xs ml-2">
              {isAr ? 'منذ قليل' : 'Just now'}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveTicker;
