import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
  const { lang } = useApp();
  const isAr = lang === 'ar';

  return (
    <div
      className="min-h-screen bg-[#FBF6EF] dark:bg-[#121212] flex items-center justify-center overflow-hidden relative"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Background decorative blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #A78BFA 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-[0.10]"
          style={{ background: 'radial-gradient(circle, #FF8FB1 0%, transparent 70%)' }}
        />
      </div>

      <div className="container-custom text-center relative z-10 py-24">
        {/* Animated 404 number */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block text-[180px] sm:text-[250px] lg:text-[320px] font-black leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, #A78BFA 0%, #FF8FB1 60%, #FF8A3D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: 0.15,
            }}
          >
            404
          </span>
        </motion.div>

        {/* Content — overlaid on the number */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="-mt-24 sm:-mt-36 lg:-mt-52 relative z-10"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#A78BFA]">
              {isAr ? 'الصفحة مفقودة' : 'Page Not Found'}
            </span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-[#1E1E1E] dark:text-white leading-tight mb-4">
            {isAr
              ? 'يبدو أن هذه الصفحة ضاعت في الفضاء الرقمي!'
              : 'Looks like this page is lost in the digital void!'}
          </h1>

          <p className="text-base sm:text-lg text-[#1E1E1E]/60 dark:text-white/60 max-w-lg mx-auto leading-relaxed mb-10">
            {isAr
              ? 'لا تقلق، يمكنك العودة إلى الصفحة الرئيسية ونبدأ من جديد في بناء حضورك الرقمي.'
              : "Don't worry, let's get you back to growing your business."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/" variant="primary" size="lg" id="not-found-home-btn">
              {isAr ? 'العودة للرئيسية' : 'Back to Home'}
            </Button>
            <Button href="/#contact" variant="ghost" size="lg" id="not-found-contact-btn">
              {isAr ? 'تواصل معنا' : 'Contact Us'}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
