import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const Process: React.FC = () => {
  const { lang } = useApp();
  const t = translations[lang].process;

  const steps = [
    { number: '01', title: t.step1, description: t.step1Desc },
    { number: '02', title: t.step2, description: t.step2Desc },
    { number: '03', title: t.step3, description: t.step3Desc },
    { number: '04', title: t.step4, description: t.step4Desc },
  ];

  return (
    <section
      id="process"
      className="section-padding bg-[#FBF6EF] dark:bg-[#121212] overflow-hidden transition-colors duration-300"
      aria-label="Our process"
    >
      <div className="container-custom">
        <AnimatedSection className="mb-14 text-center">
          <SectionHeading
            eyebrow={t.badge}
            title={t.title}
            align="center"
          />
        </AnimatedSection>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-[42px] left-8 right-8 h-[2px] bg-[#1E1E1E]/10 dark:bg-white/10" />
            <div className="grid grid-cols-4 gap-8 relative z-10">
              {steps.map((step, i) => (
                <AnimatedSection key={step.number} delay={i * 90}>
                  <div className="flex flex-col items-center text-center">
                    {/* Step circle */}
                    <div className="w-[84px] h-[84px] rounded-full bg-white dark:bg-[#1C1C1C] border-2 border-[#1E1E1E]/10 dark:border-white/10 flex flex-col items-center justify-center mb-5 transition-all duration-300 hover:border-[#A78BFA] hover:shadow-lg hover:shadow-[#A78BFA]/15 group">
                      <span className="text-sm font-black text-[#A78BFA]">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-[#1E1E1E] dark:text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-[#1E1E1E]/60 dark:text-white/65 leading-relaxed">{step.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden flex flex-col">
          <div className={`relative ${lang === 'ar' ? 'pr-8 border-r-2' : 'pl-8 border-l-2'} border-[#1E1E1E]/10 dark:border-white/10`}>
            {steps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 100} className={i < steps.length - 1 ? 'mb-8' : ''}>
                <div className="relative">
                  {/* Dot on timeline */}
                  <div className={`absolute ${lang === 'ar' ? '-right-[41px]' : '-left-[41px]'} top-1 w-5 h-5 rounded-full bg-[#A78BFA] border-[3px] border-[#FBF6EF] dark:border-[#121212]`} />
                  <div className="bg-white dark:bg-[#1C1C1C] rounded-2xl p-5 border border-[#1E1E1E]/8 dark:border-white/10 shadow-sm">
                    <span className="text-xs font-black text-[#A78BFA] mb-2 block">
                      {step.number}
                    </span>
                    <h3 className="text-base font-black text-[#1E1E1E] dark:text-white mb-1">{step.title}</h3>
                    <p className="text-xs text-[#1E1E1E]/60 dark:text-white/65 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
