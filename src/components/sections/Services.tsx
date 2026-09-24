import React from 'react';
import { Megaphone, Code2, Target, ArrowRight, Check } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import TiltCard from '../ui/TiltCard';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const iconMap: Record<string, React.ReactNode> = {
  megaphone: <Megaphone size={24} />,
  code: <Code2 size={24} />,
  target: <Target size={24} />,
};

const Services: React.FC = () => {
  const { lang } = useApp();
  const t = translations[lang].services;

  const serviceList = [
    {
      number: '01',
      icon: 'megaphone',
      title: t.s1Title,
      description: t.s1Desc,
      deliverables: [t.s1Feature1, t.s1Feature2, t.s1Feature3],
      bg: 'bg-[#FF8A3D]',
      text: 'text-white',
      subtext: 'text-white/80',
      border: 'border-0',
      iconBg: 'bg-white/20 text-white',
      dotBg: 'bg-white/80',
    },
    {
      number: '02',
      icon: 'code',
      title: t.s2Title,
      description: t.s2Desc,
      deliverables: [t.s2Feature1, t.s2Feature2, t.s2Feature3],
      bg: 'bg-[#FFD166]',
      text: 'text-[#1E1E1E]',
      subtext: 'text-[#1E1E1E]/70',
      border: 'border-0',
      iconBg: 'bg-[#1E1E1E]/10 text-[#1E1E1E]',
      dotBg: 'bg-[#1E1E1E]/70',
    },
    {
      number: '03',
      icon: 'target',
      title: t.s3Title,
      description: t.s3Desc,
      deliverables: [t.s3Feature1, t.s3Feature2, t.s3Feature3],
      bg: 'bg-[#7ED6B7]',
      text: 'text-[#1E1E1E]',
      subtext: 'text-[#1E1E1E]/70',
      border: 'border-0',
      iconBg: 'bg-[#1E1E1E]/10 text-[#1E1E1E]',
      dotBg: 'bg-[#1E1E1E]/70',
    },
  ];

  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="services"
      className="section-padding bg-[#FBF6EF] dark:bg-[#121212] overflow-hidden transition-colors duration-300"
      aria-label="Services"
    >
      <div className="container-custom">
        <AnimatedSection className="mb-14">
          <SectionHeading
            eyebrow={t.badge}
            title={t.title}
            subtitle={t.subtitle}
            align="left"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {serviceList.map((service, i) => (
            <AnimatedSection key={service.number} delay={i * 100}>
              <TiltCard className="h-full">
                <div
                  className={`relative rounded-3xl p-8 h-full flex flex-col card-lift ${service.bg} ${service.border} overflow-hidden shadow-sm`}
                >
                {/* Large background number */}
                <span
                  className={`absolute -top-4 ${lang === 'ar' ? '-left-2' : '-right-2'} text-[120px] font-black leading-none select-none pointer-events-none opacity-10`}
                >
                  {service.number}
                </span>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${service.iconBg}`}>
                  {iconMap[service.icon]}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className={`text-xs font-bold uppercase tracking-[0.15em] mb-2 ${service.subtext}`}>
                    {service.number}
                  </p>
                  <h3 className={`text-2xl font-black mb-4 leading-snug ${service.text}`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-6 ${service.subtext}`}>
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-8" aria-label={`Deliverables for ${service.title}`}>
                    {service.deliverables.map((item) => (
                      <li key={item} className={`flex items-center gap-2 text-xs font-medium ${service.subtext}`}>
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center ${service.dotBg} text-white flex-shrink-0`}>
                          <Check size={10} strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  onClick={handleScroll}
                  className={`inline-flex items-center gap-2 text-sm font-bold ${service.text} hover:opacity-80 transition-all group`}
                >
                  <span>{t.exploreService}</span>
                  <ArrowRight size={16} className={`transition-transform duration-200 ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                </a>
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
