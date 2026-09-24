import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import AnimatedCounter from '../ui/AnimatedCounter';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const TrustIntro: React.FC = () => {
  const { lang } = useApp();
  const t = translations[lang].trust;
  const th = translations[lang].hero;

  const indicators = [
    { label: th.marketing, color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
    { label: th.web, color: '#FF8A3D', bg: 'rgba(255,138,61,0.12)' },
    { label: th.leads, color: '#7ED6B7', bg: 'rgba(126,214,183,0.12)' },
  ];

  return (
    <section
      id="trust"
      className="brand-gradient-bg py-20 lg:py-28 overflow-hidden transition-colors duration-300"
      aria-label="Agency introduction"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Statement */}
          <AnimatedSection direction="left">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#A78BFA] mb-4">
              {t.pill}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.2] mb-6">
              {t.headline}
              <br />
              <span style={{ color: '#A78BFA' }}>{t.highlight}</span>
            </h2>
            <div className="flex gap-3 mt-8 flex-wrap">
              {indicators.map((ind) => (
                <div
                  key={ind.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: ind.bg }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: ind.color }}
                  />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: ind.color }}>
                    {ind.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: Paragraph & Stats */}
          <AnimatedSection direction="right" delay={150}>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              {t.description}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { val: t.stat1Value, lbl: t.stat1Label },
                { val: t.stat2Value, lbl: t.stat2Label },
                { val: t.stat3Value, lbl: t.stat3Label },
                { val: t.stat4Value, lbl: t.stat4Label },
              ].map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xs transition-transform duration-300 hover:-translate-y-1">
                  <p className="text-2xl font-black text-[#A78BFA] mb-1">
                    <AnimatedCounter value={stat.val} duration={2} />
                  </p>
                  <p className="text-xs text-white/60 font-medium leading-snug">{stat.lbl}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default TrustIntro;
