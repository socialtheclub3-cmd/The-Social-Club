import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { lang } = useApp();
  const isAr = lang === 'ar';

  useEffect(() => {
    const hasConsented = localStorage.getItem('tsc_cookie_consent');
    if (!hasConsented) {
      // Delay showing the banner so it doesn't overwhelm immediately
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('tsc_cookie_consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 w-full z-[9500] bg-[#1E1E1E] text-white p-4 shadow-2xl border-t border-white/10"
        >
          <div className="container-custom mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/80 max-w-3xl">
              {isAr 
                ? 'نحن نستخدم ملفات تعريف الارتباط (Cookies) لضمان حصولك على أفضل تجربة على موقعنا ولتحليل حركة المرور، مما يساعدنا على تقديم خدمة أفضل لعملائنا.'
                : 'We use cookies to ensure you get the best experience on our website and to analyze our traffic, helping us deliver a better service.'}
            </p>
            <div className="flex gap-3 flex-shrink-0">
              <button 
                onClick={handleAccept}
                className="bg-[#A78BFA] hover:bg-[#8B5CF6] text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg"
              >
                {isAr ? 'موافق' : 'Accept All'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
