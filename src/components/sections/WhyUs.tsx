import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const WhyUs: React.FC = () => {
  const { lang } = useApp();
  const t = translations[lang].whyUs;

  const items = [
    { number: '01', title: t.point1Title, description: t.point1Desc, accent: '#A78BFA' },
    { number: '02', title: t.point2Title, description: t.point2Desc, accent: '#FF8A3D' },
    { number: '03', title: t.point3Title, description: t.point3Desc, accent: '#FF8FB1' },
    { number: '04', title: t.point4Title, description: t.point4Desc, accent: '#7ED6B7' },
  ];

  return (
    <section
      id="why"
      className="section-padding bg-[#F3EBE0] dark:bg-[#181818] overflow-hidden transition-colors duration-300"
      aria-label="Why work with us"
    >
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20">
          {/* Left: Heading */}
          <AnimatedSection direction="left" className="lg:w-[38%] flex-shrink-0">
            <SectionHeading
              eyebrow={t.badge}
              title={t.title}
              align="left"
            />
            <p className="text-[#1E1E1E]/60 dark:text-white/65 text-base leading-relaxed mt-5">
              {lang === 'ar'
                ? 'ذا سوشيال كلوب صُممت برؤية مختلفة تماماً. نحن لسنا مجرد وكالة تكتفي بنشر بوستات على السوشيال ميديا — نحن شريك نمو متكامل يعمل جنباً إلى جنب مع فريقك.'
                : 'The Social Club is built differently. We are not just a vanity social media agency — we are a full-stack growth partner committed to multiplying your revenue.'}
            </p>
          </AnimatedSection>

          {/* Right: Feature blocks */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {items.map((item, i) => (
              <AnimatedSection key={item.number} delay={i * 80}>
                <div
                  className="bg-white dark:bg-[#202020] rounded-2xl p-6 border border-[#1E1E1E]/8 dark:border-white/10 card-lift h-full shadow-sm"
                >
                  {/* Number with accent color */}
                  <div
                    className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-xs font-black mb-4"
                    style={{ backgroundColor: `${item.accent}20`, color: item.accent }}
                  >
                    {item.number}
                  </div>
                  <h3 className="text-lg font-black text-[#1E1E1E] dark:text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-[#1E1E1E]/60 dark:text-white/65 leading-relaxed">{item.description}</p>
                  {/* Accent bottom border */}
                  <div
                    className="mt-5 h-[3px] rounded-full w-12"
                    style={{ backgroundColor: item.accent }}
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
