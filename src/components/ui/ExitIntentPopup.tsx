import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowRight, Zap, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ExitIntentPopup: React.FC = () => {
  const { lang } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isAr = lang === 'ar';

  useEffect(() => {
    const alreadyDismissed = sessionStorage.getItem('tsc_exit_popup_shown');
    if (alreadyDismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 10) return; // Only trigger when mouse leaves from top
      if (hasShown) return;

      // Small delay to avoid false triggers
      timerRef.current = setTimeout(() => {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('tsc_exit_popup_shown', '1');
      }, 200);
    };

    // Mobile: show after 45s on page
    const mobileTimer = setTimeout(() => {
      if (!hasShown && window.innerWidth < 768) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('tsc_exit_popup_shown', '1');
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (timerRef.current) clearTimeout(timerRef.current);
      clearTimeout(mobileTimer);
    };
  }, [hasShown]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (overlayRef.current) overlayRef.current.style.opacity = '1';
        if (cardRef.current) {
          cardRef.current.style.opacity = '1';
          cardRef.current.style.transform = 'translateY(0) scale(1)';
        }
      }, 10);
    } else {
      document.body.style.overflow = '';
    }
  }, [isVisible]);

  const handleClose = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = '0';
    if (cardRef.current) {
      cardRef.current.style.opacity = '0';
      cardRef.current.style.transform = 'translateY(24px) scale(0.96)';
    }
    setTimeout(() => setIsVisible(false), 280);
  };

  if (!isVisible) return null;

  const content = {
    en: {
      eyebrow: '⚡ WAIT — Before You Go',
      headline: 'Get a Free Growth Audit',
      sub: 'for Your Business',
      desc: "You're leaving without knowing what's holding back your revenue. Let us show you exactly where your biggest growth gaps are — no cost, no commitment.",
      offer1: 'Identify your top 3 revenue leaks',
      offer2: 'Benchmarks vs. competitors in your space',
      offer3: 'A custom 30-day action plan',
      cta: 'Claim My Free Audit →',
      whatsapp: 'Chat on WhatsApp Instead',
      dismiss: "No thanks, I'll pass on free growth",
    },
    ar: {
      eyebrow: '⚡ لحظة — قبل أن تغادر',
      headline: 'احصل على تدقيق نمو مجاني',
      sub: 'لمشروعك',
      desc: 'أنت على وشك المغادرة دون معرفة ما يعيق نمو إيراداتك. دعنا نكشف لك أين تكمن فرص النمو الأكبر — بدون تكلفة أو التزام.',
      offer1: 'تحديد أبرز 3 نقاط تسرب في إيراداتك',
      offer2: 'مقارنة أدائك مع المنافسين في مجالك',
      offer3: 'خطة عمل مخصصة لمدة 30 يوماً',
      cta: 'احصل على التدقيق المجاني ←',
      whatsapp: 'تحدث معنا على واتساب',
      dismiss: 'لا شكراً، سأتجاوز هذه الفرصة',
    },
  };

  const t = content[lang];

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        opacity: 0,
        transition: 'opacity 0.28s ease',
        direction: isAr ? 'rtl' : 'ltr',
      }}
      role="dialog"
      aria-modal="true"
      aria-label={isAr ? 'عرض خاص' : 'Special Offer'}
    >
      <div
        ref={cardRef}
        style={{
          width: '100%',
          maxWidth: 520,
          borderRadius: 24,
          overflow: 'hidden',
          opacity: 0,
          transform: 'translateY(24px) scale(0.96)',
          transition: 'opacity 0.28s ease, transform 0.28s ease',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        {/* Top gradient band */}
        <div style={{
          background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #FF8A3D 100%)',
          padding: '28px 32px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative circles */}
          <div style={{ position: 'absolute', top: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

          <button
            onClick={handleClose}
            aria-label="Close popup"
            style={{
              position: 'absolute', top: 14, right: isAr ? 'auto' : 14, left: isAr ? 14 : 'auto',
              background: 'rgba(0,0,0,0.25)', border: 'none', borderRadius: '50%',
              width: 32, height: 32, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.45)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.25)')}
          >
            <X size={14} color="white" />
          </button>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '999px',
            padding: '4px 12px',
            marginBottom: 12,
          }}>
            <Zap size={10} color="white" fill="white" />
            <span style={{ color: 'white', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t.eyebrow.replace('⚡ ', '')}</span>
          </div>

          <h2 style={{ color: 'white', fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: 900, margin: '0 0 3px', lineHeight: 1.2 }}>
            {t.headline}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: 600, margin: 0 }}>{t.sub}</p>
        </div>

        {/* Body */}
        <div style={{ background: '#fff', padding: '28px 32px 32px' }} className="dark:bg-[#1C1C1C]">

          <p style={{ fontSize: 14, lineHeight: 1.75, marginBottom: 20 }} className="text-[#1E1E1E]/70 dark:text-white/65">
            {t.desc}
          </p>

          {/* Offer bullets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {[t.offer1, t.offer2, t.offer3].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #A78BFA, #7C3AED)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: 'white', fontSize: 11, fontWeight: 900 }}>✓</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700 }} className="text-[#1E1E1E]/85 dark:text-white/85">{item}</span>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <a
            id="exit-popup-cta"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
              setTimeout(() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 300);
            }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', padding: '14px 24px',
              background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
              color: 'white', fontWeight: 800, fontSize: 14,
              borderRadius: 12, textDecoration: 'none',
              marginBottom: 10,
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(124,58,237,0.55)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.4)';
            }}
          >
            {t.cta}
            <ArrowRight size={15} />
          </a>

          {/* WhatsApp CTA */}
          <a
            id="exit-popup-whatsapp"
            href="https://wa.me/201043971900?text=Hi, I'd like a free growth audit for my business"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', padding: '12px 24px',
              background: '#25D366',
              color: 'white', fontWeight: 700, fontSize: 13,
              borderRadius: 12, textDecoration: 'none',
              marginBottom: 16,
              transition: 'transform 0.2s, opacity 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.opacity = '1';
            }}
          >
            <MessageCircle size={15} />
            {t.whatsapp}
          </a>

          {/* Dismiss link */}
          <button
            id="exit-popup-dismiss"
            onClick={handleClose}
            style={{
              display: 'block', width: '100%',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 11, fontWeight: 600, textAlign: 'center',
              transition: 'opacity 0.2s',
              padding: '4px 0',
            }}
            className="text-[#1E1E1E]/35 dark:text-white/35 hover:opacity-70"
          >
            {t.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
