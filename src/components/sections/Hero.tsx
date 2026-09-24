import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';
import StaggeredText from '../ui/StaggeredText';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const { lang } = useApp();
  const t = translations[lang].hero;

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#FBF6EF] dark:bg-[#121212] transition-colors duration-300"
      aria-label="Hero section"
    >
      {/* Background decorative shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Large lavender blob */}
        <motion.div
          className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full opacity-[0.14] dark:opacity-[0.2]"
          style={{ background: 'radial-gradient(circle, #A78BFA 0%, transparent 70%)', y: y1 }}
        />
        {/* Smaller pink blob */}
        <motion.div
          className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full opacity-[0.10] dark:opacity-[0.15]"
          style={{ background: 'radial-gradient(circle, #FF8FB1 0%, transparent 70%)', y: y2 }}
        />
        {/* Orange accent dot */}
        <div className="absolute top-1/3 right-[15%] w-3 h-3 rounded-full bg-[#FF8A3D] opacity-60" />
        {/* Yellow accent dot */}
        <div className="absolute top-1/2 left-[8%] w-2 h-2 rounded-full bg-[#FFD166] opacity-50" />
        {/* Mint dot */}
        <div className="absolute bottom-1/3 right-[20%] w-2 h-2 rounded-full bg-[#7ED6B7] opacity-50" />
      </div>

      {/* Spark lines (brand accent) */}
      <div className={`absolute top-[18%] ${lang === 'ar' ? 'left-[12%]' : 'right-[12%]'} pointer-events-none`} aria-hidden="true">
        <div className="flex flex-col gap-2 items-center">
          <div
            className="w-[5px] h-[30px] rounded-full bg-[#FF8FB1] opacity-80"
            style={{ transform: 'rotate(-15deg)' }}
          />
          <div
            className="w-[5px] h-[22px] rounded-full bg-[#FF8A3D] opacity-80"
            style={{ transform: 'rotate(10deg)', marginLeft: '14px' }}
          />
          <div
            className="w-[5px] h-[18px] rounded-full bg-[#FFD166] opacity-80"
            style={{ transform: 'rotate(-5deg)', marginLeft: '-8px' }}
          />
        </div>
      </div>

      <div className="container-custom py-32 lg:py-40 relative z-10">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 mb-6 transition-all duration-700"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#A78BFA]">
              {t.badge}
            </span>
          </div>

          {/* Headline */}
          <div
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.12] text-[#1E1E1E] dark:text-white mb-6"
          >
            {loaded && (
              <>
                <StaggeredText text={t.headlineStart} delay={0.1} />
                <span
                  className="italic font-bold mx-2 inline-block"
                  style={{
                    color: '#A78BFA',
                    fontFamily: lang === 'ar' ? 'inherit' : "Georgia, 'Times New Roman', serif",
                  }}
                >
                  <StaggeredText text={t.headlineItalic} delay={0.3} />
                </span>
                <StaggeredText text={t.headlineEnd} delay={0.5} />
              </>
            )}
          </div>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl text-[#1E1E1E]/70 dark:text-white/70 max-w-2xl leading-relaxed mb-10 transition-all duration-700"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '200ms',
            }}
          >
            {t.subheadline}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center gap-4 mb-14 transition-all duration-700"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '300ms',
            }}
          >
            <Button
              href="#contact"
              variant="primary"
              size="lg"
              id="hero-cta-primary"
              onClick={handleScroll('#contact')}
            >
              {t.startProject}
            </Button>
            <Button
              href="#work"
              variant="ghost"
              size="lg"
              id="hero-cta-secondary"
              onClick={handleScroll('#work')}
            >
              {t.seeWork}
            </Button>
          </div>

          {/* Service tags */}
          <div
            className="flex flex-wrap items-center gap-4 sm:gap-6 transition-all duration-700"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '450ms',
            }}
          >
            {[
              { label: t.marketing, color: '#A78BFA' },
              { label: t.web, color: '#FF8A3D' },
              { label: t.leads, color: '#7ED6B7' },
            ].map((tag, i) => (
              <React.Fragment key={tag.label}>
                {i > 0 && (
                  <span
                    className="w-1.5 h-1.5 rounded-full opacity-40 bg-[#1E1E1E] dark:bg-white dark:bg-[#1C1C1C]"
                  />
                )}
                <span
                  className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em]"
                  style={{ color: tag.color }}
                >
                  {tag.label}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700"
        style={{
          opacity: loaded ? 0.4 : 0,
          transitionDelay: '800ms',
        }}
        aria-hidden="true"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-[#1E1E1E]/60 dark:text-white/60">
          {t.scroll}
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#1E1E1E]/40 dark:from-white/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
