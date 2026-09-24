import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const About: React.FC = () => {
  const { lang } = useApp();
  const t = translations[lang].about;

  const pillars = [
    {
      label: lang === 'ar' ? 'الاستراتيجية' : 'Strategy',
      color: '#A78BFA',
      desc: lang === 'ar' ? 'أبحاث السوق والتموضع الرقمي' : 'Research, positioning & roadmap',
    },
    {
      label: lang === 'ar' ? 'الإبداع' : 'Creative',
      color: '#FF8FB1',
      desc: lang === 'ar' ? 'تصميمات فاخرة ونصوص بيعية' : 'High-converting design & storytelling',
    },
    {
      label: lang === 'ar' ? 'التقنية' : 'Technology',
      color: '#FF8A3D',
      desc: lang === 'ar' ? 'مواقع فائقة السرعة وأنظمة CRM' : 'Modern web apps, funnels & integrations',
    },
    {
      label: lang === 'ar' ? 'الأداء' : 'Performance',
      color: '#7ED6B7',
      desc: lang === 'ar' ? 'إدارة إعلانات وتحليلات لحظية' : 'Paid media, testing & scale analytics',
    },
  ];

  return (
    <section
      id="about"
      className="section-padding brand-gradient-bg overflow-hidden transition-colors duration-300"
      aria-label="About The Social Club"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left */}
          <AnimatedSection direction="left">
            <SectionHeading
              eyebrow={t.badge}
              title={t.title}
              light
            />
            <p className="text-white/70 text-base leading-relaxed mt-6 max-w-md">
              {t.p1}
            </p>
            <p className="text-white/70 text-base leading-relaxed mt-4 max-w-md">
              {t.p2}
            </p>
          </AnimatedSection>

          {/* Right: Team pillars */}
          <AnimatedSection direction="right" delay={150}>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50 mb-6">
              {lang === 'ar' ? 'ركائز عملنا الأربعة' : 'How We Are Structured'}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {pillars.map((pillar) => (
                <div
                  key={pillar.label}
                  className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/25 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-sm font-black"
                    style={{ backgroundColor: `${pillar.color}20`, color: pillar.color }}
                  >
                    {pillar.label[0]}
                  </div>
                  <h3 className="text-base font-black text-white mb-1">{pillar.label}</h3>
                  <p className="text-xs text-white/60 leading-snug">{pillar.desc}</p>
                </div>
              ))}
            </div>

            {/* Brand quote */}
            <div className="mt-6 p-5 rounded-2xl border border-[#A78BFA]/25 bg-[#A78BFA]/10">
              <p className="text-sm text-white/85 italic leading-relaxed">
                {lang === 'ar'
                  ? '"ذا سوشيال كلوب ليست مجرد وكالة تواصل اجتماعي. نحن نجمع بين التسويق، التقنية، والإبداع لتمكين الشركات من بناء حضور رقمي قوي وتحويل التفاعل لأرباح مستمرة."'
                  : '"The Social Club is not just a social media agency. We combine marketing, technology, creativity, and lead generation to help businesses build a stronger digital presence."'}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
