import React from 'react';
import Button from '../ui/Button';
import AnimatedSection from '../ui/AnimatedSection';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const FinalCTA: React.FC = () => {
  const { lang } = useApp();
  const t = translations[lang].finalCta;

  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="cta"
      className="relative overflow-hidden py-24 lg:py-32 brand-gradient-bg transition-colors duration-300"
      aria-label="Call to action"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.14]"
          style={{ background: 'radial-gradient(circle, #A78BFA 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #FF8FB1 0%, transparent 70%)' }}
        />
        {/* Sparks */}
        <div className={`absolute top-1/4 ${lang === 'ar' ? 'left-[20%]' : 'right-[20%]'} flex flex-col gap-2 items-center opacity-60`}>
          <div className="w-[4px] h-[24px] rounded-full bg-[#FF8FB1]" style={{ transform: 'rotate(-15deg)' }} />
          <div className="w-[4px] h-[18px] rounded-full bg-[#FF8A3D]" style={{ transform: 'rotate(10deg)', marginLeft: '10px' }} />
          <div className="w-[4px] h-[14px] rounded-full bg-[#FFD166]" style={{ transform: 'rotate(-5deg)', marginLeft: '-5px' }} />
        </div>
      </div>

      <div className="container-custom relative z-10 text-center">
        <AnimatedSection>
          <span className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#A78BFA]">
              {t.badge}
            </span>
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.12] mb-6">
            {t.title}
          </h2>

          <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed mb-10">
            {t.desc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="#contact"
              variant="secondary"
              size="lg"
              id="final-cta-btn"
              onClick={handleScroll}
            >
              {t.ctaBtn}
            </Button>
            <a
              href="mailto:socialtheclub.3@gmail.com"
              className="text-sm font-bold text-white/60 hover:text-white transition-colors duration-200"
            >
              {t.emailUs}
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FinalCTA;
