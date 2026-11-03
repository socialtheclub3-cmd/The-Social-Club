import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Sparkles, X } from 'lucide-react';

const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { lang } = useApp();
  const isAr = lang === 'ar';

  useEffect(() => {
    if (isDismissed) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      // Show CTA after scrolling 500px down
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleBooking = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-[72px] left-0 w-full z-[8500] bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl border-b border-[#1E1E1E]/5 dark:border-white/5 shadow-sm"
        >
          <div className="container-custom mx-auto py-3 px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex w-6 h-6 rounded-full bg-[#A78BFA]/20 items-center justify-center animate-pulse">
                <Sparkles size={14} className="text-[#A78BFA]" />
              </span>
              <p className="text-sm font-semibold text-[#1E1E1E] dark:text-white">
                {isAr
                  ? '💡 متاح عدد محدود من جلسات تدقيق الحسابات واستراتيجيات النمو المجانية هذا الأسبوع.'
                  : '💡 Limited free growth audit & strategy sessions available for scaling brands this week.'}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleBooking}
                className="bg-[#A78BFA] hover:bg-[#906fe7] text-[#1E1E1E] px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:scale-105 transition-all duration-200 shadow-md shadow-[#A78BFA]/20 cursor-pointer"
              >
                {isAr ? 'احجز جلستك المجانية' : 'Claim Free Audit'}
                <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
              </button>
              
              <button 
                onClick={handleDismiss}
                className="text-[#1E1E1E]/50 dark:text-white/50 hover:text-[#1E1E1E] dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Close CTA"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
