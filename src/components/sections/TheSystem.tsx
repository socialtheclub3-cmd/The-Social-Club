import React from 'react';
import { ArrowDown } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const TheSystem: React.FC = () => {
  const { lang } = useApp();
  const t = translations[lang].theSystem;

  const stages = [
    {
      num: t.step1Num,
      label: t.step1Title,
      description: t.step1Desc,
      color: '#A78BFA',
    },
    {
      num: t.step2Num,
      label: t.step2Title,
      description: t.step2Desc,
      color: '#FF8A3D',
    },
    {
      num: t.step3Num,
      label: t.step3Title,
      description: t.step3Desc,
      color: '#7ED6B7',
    },
  ];

  return (
    <section
      id="system"
      className="section-padding brand-gradient-bg overflow-hidden transition-colors duration-300"
      aria-label="Our growth system"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: Heading */}
          <AnimatedSection direction="left">
            <SectionHeading
              eyebrow={t.badge}
              title={t.title}
              light
            />
            <p className="text-white/65 text-base leading-relaxed mt-6 max-w-md">
              {lang === 'ar'
                ? 'أغلب الوكالات تكتفي بنشر إعلانات أو بوستات. نحن نصمم محرك النمو بأكمله — من المشاهدة الأولى وحتى إتمام البيع — لتعمل كل عناصر خطتك التسويقية بتناغم تام.'
                : 'Most agencies stop at content or ads. We build the entire growth engine — from the first impression to the closed deal — so every piece works together seamlessly.'}
            </p>
            <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-white/5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#1E1E1E] mb-2">
                {lang === 'ar' ? 'القيمة الحقيقية لمنظومتنا' : 'Why it matters'}
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                {lang === 'ar'
                  ? 'عندما يتكامل التسويق مع متجرك/موقعك وأنظمة الـ Leads المؤتمتة، تنخفض تكاليف إعلاناتك وتتضاعف مبيعاتك بشكل أسرع بكثير.'
                  : 'When marketing, web presence and automated lead funnels are built together, they convert better, reduce customer acquisition cost, and scale faster.'}
              </p>
            </div>
          </AnimatedSection>

          {/* Right: Funnel */}
          <AnimatedSection direction="right" delay={150}>
            <div className="flex flex-col items-center gap-0 relative">
              {stages.map((stage, i) => (
                <div key={stage.num} className="flex flex-col items-center w-full max-w-md">
                  {/* Stage */}
                  <div
                    className="w-full flex items-start gap-4 p-5 rounded-2xl border border-white/10 transition-all duration-300 hover:border-white/25 group"
                    style={{ backgroundColor: `${stage.color}12` }}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: stage.color }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-base font-black text-white">{stage.label}</p>
                        <span className="text-xs font-black text-white/30">{stage.num}</span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed">{stage.description}</p>
                    </div>
                  </div>

                  {/* Arrow between stages */}
                  {i < stages.length - 1 && (
                    <div className="my-2 flex items-center justify-center text-white/30">
                      <ArrowDown size={18} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default TheSystem;
