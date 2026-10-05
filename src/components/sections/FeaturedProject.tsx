import React from 'react';
import { ArrowRight, BarChart3, Target, Zap } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import Button from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const FeaturedProject: React.FC = () => {
  const { lang } = useApp();
  const t = translations[lang].featuredProject;

  const servicesUsed =
    lang === 'ar'
      ? ['إعلانات مدفوعة', 'صفحات هبوط بيعية', 'تأهيل العملاء', 'أتمتة CRM']
      : ['Lead Generation', 'Landing Page', 'Paid Ads', 'CRM Setup'];

  return (
    <section
      id="featured"
      className="section-padding bg-[#FBF6EF] dark:bg-[#121212] overflow-hidden transition-colors duration-300"
      aria-label="Featured case study"
    >
      <div className="container-custom">
        {/* Eyebrow */}
        <AnimatedSection className="mb-10">
          <span className="text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-[#A78BFA]">
            {t.badge}
          </span>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Visual */}
          <AnimatedSection direction="left">
            <div
              className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #1E1E1E 0%, #2E2E2E 50%, #A78BFA 100%)',
              }}
            >
              {/* Inner mockup */}
              <div className="absolute inset-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col p-6">
                {/* Browser bar */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF8FB1]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFD166]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7ED6B7]" />
                  <div className="flex-1 h-5 bg-white/10 rounded-md mx-2" />
                </div>
                {/* Dashboard Chart Mockup */}
                <div className="flex-1 flex flex-col h-full relative mt-2">
                  {/* Chart bars animated */}
                  <div className="flex-1 flex items-end justify-between gap-3 px-2 pb-6 relative z-0">
                    <div className="w-full bg-[#A78BFA]/20 rounded-t-md h-[30%] animate-pulse" style={{ animationDelay: '0ms' }} />
                    <div className="w-full bg-[#A78BFA]/20 rounded-t-md h-[45%] animate-pulse" style={{ animationDelay: '200ms' }} />
                    <div className="w-full bg-[#A78BFA]/30 rounded-t-md h-[65%] animate-pulse" style={{ animationDelay: '400ms' }} />
                    <div className="w-full bg-[#A78BFA]/60 rounded-t-md h-[95%] animate-pulse relative" style={{ animationDelay: '600ms' }}>
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded shadow-lg animate-bounce">
                        +340%
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom animated icon boxes */}
                  <div className="mt-auto grid grid-cols-3 gap-3 relative z-10">
                    <div className="aspect-square bg-[#A78BFA]/20 border border-[#A78BFA]/30 rounded-xl flex flex-col items-center justify-center gap-1.5 group cursor-pointer overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#A78BFA]/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <BarChart3 className="text-[#A78BFA] w-6 h-6 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
                      <span className="text-[10px] font-bold text-[#A78BFA] opacity-0 group-hover:opacity-100 transition-opacity duration-300">Growth</span>
                    </div>
                    <div className="aspect-square bg-[#FF8FB1]/20 border border-[#FF8FB1]/30 rounded-xl flex flex-col items-center justify-center gap-1.5 group cursor-pointer overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#FF8FB1]/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <Target className="text-[#FF8FB1] w-6 h-6 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
                      <span className="text-[10px] font-bold text-[#FF8FB1] opacity-0 group-hover:opacity-100 transition-opacity duration-300">Ads</span>
                    </div>
                    <div className="aspect-square bg-[#FF8A3D]/20 border border-[#FF8A3D]/30 rounded-xl flex flex-col items-center justify-center gap-1.5 group cursor-pointer overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#FF8A3D]/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <Zap className="text-[#FF8A3D] w-6 h-6 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
                      <span className="text-[10px] font-bold text-[#FF8A3D] opacity-0 group-hover:opacity-100 transition-opacity duration-300">CRO</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Concept label */}
              <span className={`absolute top-5 ${lang === 'ar' ? 'right-5' : 'left-5'} bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full`}>
                {lang === 'ar' ? 'نتائج موثقة' : 'Verified Growth'}
              </span>
            </div>
          </AnimatedSection>

          {/* Right: Case study info */}
          <AnimatedSection direction="right" delay={150}>
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1E1E1E] dark:text-white leading-tight mb-2">
                  {t.title}
                </h2>
                <p className="text-sm font-bold text-[#A78BFA]">
                  {lang === 'ar' ? 'تجارة إلكترونية وشركات رائدة' : 'D2C Brand / Multi-Channel Growth'}
                </p>
              </div>

              <p className="text-sm text-[#1E1E1E]/70 dark:text-white/70 leading-relaxed">
                {t.desc}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 my-2">
                {[
                  { val: t.metric1Val, lbl: t.metric1Lbl },
                  { val: t.metric2Val, lbl: t.metric2Lbl },
                  { val: t.metric3Val, lbl: t.metric3Lbl },
                ].map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white dark:bg-[#1E1E1E] border border-[#1E1E1E]/8 dark:border-white/10 text-center">
                    <p className="text-xl font-black text-[#A78BFA]">{m.val}</p>
                    <p className="text-[11px] font-semibold text-[#1E1E1E]/60 dark:text-white/60 mt-1">{m.lbl}</p>
                  </div>
                ))}
              </div>

              {/* Services used */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#1E1E1E]/50 dark:text-white/50 mb-3">
                  {lang === 'ar' ? 'الخدمات المنفذة' : 'Services Deployed'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {servicesUsed.map((s) => (
                    <span key={s} className="text-xs font-bold bg-[#A78BFA]/10 text-[#A78BFA] px-3 py-1.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                href="#contact"
                variant="primary"
                size="md"
                className="self-start mt-2"
                onClick={(e?: React.MouseEvent) => {
                  e?.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>{t.readFull}</span>
                <ArrowRight size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
