import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useApp();
  const isAr = lang === 'ar';

  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '201043971900';

  // Don't render if no phone number is configured
  if (!phoneNumber) return null;

  const defaultMessage = isAr
    ? 'مرحباً، أود الاستفسار عن خدماتكم 👋'
    : "Hello! I'd like to inquire about your services 👋";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div
      className={`fixed bottom-6 z-[9000] ${isAr ? 'left-6' : 'right-6'} flex flex-col items-end gap-3`}
    >
      {/* Chat bubble popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl shadow-black/20 p-5 w-72 border border-[#1E1E1E]/5 dark:border-white/5 ${isAr ? 'text-right' : 'text-left'}`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1E1E1E] dark:text-white">
                  The Social Club
                </p>
                <p className="text-xs text-[#25D366] font-medium">
                  {isAr ? '● متاح الآن' : '● Online Now'}
                </p>
              </div>
            </div>

            {/* Message bubble */}
            <div className="bg-[#F3EBE0] dark:bg-[#2A2A2A] rounded-xl rounded-tl-sm p-3 mb-4">
              <p className="text-sm text-[#1E1E1E] dark:text-white leading-relaxed">
                {isAr
                  ? 'مرحباً! 👋 كيف يمكننا مساعدتك في تنمية أعمالك؟'
                  : "Hey there! 👋 How can we help you grow your business?"}
              </p>
            </div>

            {/* CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors duration-200"
            >
              <MessageCircle size={16} />
              {isAr ? 'ابدأ المحادثة' : 'Start Chat'}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button */}
      <div className="relative">
        {/* Pulse animation ring */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" style={{ animationDelay: '0.5s' }} />
          </>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5A] shadow-lg shadow-[#25D366]/30 flex items-center justify-center transition-colors duration-200"
          aria-label={isAr ? 'تواصل عبر واتساب' : 'Contact us on WhatsApp'}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} className="text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle size={24} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default WhatsAppButton;
