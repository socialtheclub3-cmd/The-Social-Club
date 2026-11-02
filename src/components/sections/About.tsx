import React from 'react';
import { TrendingUp, Target, Code2, Sparkles } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const About: React.FC = () => {
  const { lang } = useApp();
  const t = translations[lang].about;

  const specialists = [
    {
      title: lang === 'ar' ? 'استراتيجيات النمو وقمع المبيعات' : 'Growth Strategy & Funnels',
      subtitle: lang === 'ar' ? 'هندسة التوسع والاستحواذ' : 'Acquisition & Funnel Architecture',
      badge: lang === 'ar' ? 'خبرة 7+ سنوات' : '7+ Yrs Track Record',
      color: '#A78BFA',
      icon: TrendingUp,
      desc: lang === 'ar' 
        ? 'تخطيط مسارات البيع (Funnels) وهندسة العروض الاستثمارية، وإدارة استراتيجيات التوسع لأكثر من 40 علامة تجارية في مصر والخليج.' 
        : 'Full-funnel architecture and growth strategy. Engineered scalable acquisition engines for 40+ brands across Egypt and the GCC.',
    },
    {
      title: lang === 'ar' ? 'شراء الوسائط والإعلانات المدفوعة' : 'Performance Media & Paid Ads',
      subtitle: lang === 'ar' ? 'إدارة وتحسين الحملات الممولة' : 'Ad Scaling & Media Buying',
      badge: lang === 'ar' ? 'معتمد Meta & Google' : 'Meta & Google Certified',
      color: '#FF8FB1',
      icon: Target,
      desc: lang === 'ar' 
        ? 'إدارة الميزانيات الكبيرة واختبار الزوايا الإعلانية المتقدمة، وإشراف على حملات تجاوزت ميزانياتها 25 مليون جنيه بعوائد موثقة.' 
        : 'Specialized media buying unit managing aggressive ad scaling, dynamic creative testing, and multi-touchpoint attribution.',
    },
    {
      title: lang === 'ar' ? 'البنية التقنية وتطوير الويب' : 'Web & Tech Infrastructure',
      subtitle: lang === 'ar' ? 'مواقع فائقة السرعة ومسارات تحويل' : 'Headless & High-Converting UI',
      badge: lang === 'ar' ? 'متاجر سريعة & CRO' : 'Headless & CRO Architect',
      color: '#FF8A3D',
      icon: Code2,
      desc: lang === 'ar' 
        ? 'بناء منصات Headless ومتاجر فائقة السرعة وصفحات هبوط ترفع معدل التحويل مع أتمتة الربط بالـ CRM وأنظمة التتبع والواتساب.' 
        : 'Full-stack software engineering building sub-second headless web apps, high-converting checkout flows, and automated CRM pipelines.',
    },
    {
      title: lang === 'ar' ? 'الإخراج الإبداعي والمحتوى البيعي' : 'Creative & Direct Response',
      subtitle: lang === 'ar' ? 'خطافات إعلانية وفيديوهات UGC' : 'High-Converting Hooks & UGC',
      badge: lang === 'ar' ? '500+ إعلان رابح' : '500+ High-Converting Hooks',
      color: '#7ED6B7',
      icon: Sparkles,
      desc: lang === 'ar' 
        ? 'صناعة خطافات الإعلانات وكتابة النصوص النفسية المؤثرة وفيديوهات الـ UGC التي تضاعف معدل النقر والتحويل للمتاجر والشركات.' 
        : 'Direct-response copywriting and creative production crafting high-converting ad hooks, UGC angles, and persuasive buyer psychology.',
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
            <p className="text-white/80 text-base leading-relaxed mt-6 max-w-lg">
              {t.p1}
            </p>
            <p className="text-white/70 text-sm leading-relaxed mt-4 max-w-lg">
              {t.p2}
            </p>

            {/* Operating Markets & Focus Badge */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs font-black uppercase tracking-widest text-[#A78BFA] mb-3">
                {lang === 'ar' ? 'الأسواق والقطاعات التي نعمل معها' : 'Operating Markets & Industry Focus'}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  { name: lang === 'ar' ? 'مصر' : 'Egypt', flag: '🇪🇬' },
                  { name: lang === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia', flag: '🇸🇦' },
                  { name: lang === 'ar' ? 'الإمارات العربية المتحدة' : 'UAE', flag: '🇦🇪' },
                  { name: lang === 'ar' ? 'الشرق الأوسط والخليج' : 'MENA Region', flag: '🌍' },
                ].map((market) => (
                  <span
                    key={market.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/10"
                  >
                    <span>{market.flag}</span>
                    <span>{market.name}</span>
                  </span>
                ))}
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                {lang === 'ar'
                  ? 'متخصصون في: المتاجر الإلكترونية (E-Commerce D2C)، استقطاب عملاء الشركات (B2B)، التسويق العقاري الفاخر، والعيادات والمراكز التخصصية.'
                  : 'Specialized in: D2C E-Commerce, B2B High-Ticket Lead Gen, Luxury Real Estate, and Specialized Healthcare Clinics.'}
              </p>
            </div>
          </AnimatedSection>

          {/* Right: Core Specialists */}
          <AnimatedSection direction="right" delay={150}>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50 mb-6">
              {lang === 'ar' ? 'التخصصات والخبرات التنفيذية' : 'Core Disciplines & Specialist Units'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specialists.map((specialist) => {
                const Icon = specialist.icon;
                return (
                  <div
                    key={specialist.title}
                    className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
                            style={{ backgroundColor: `${specialist.color}35`, border: `1px solid ${specialist.color}50` }}
                          >
                            <Icon size={18} style={{ color: specialist.color }} />
                          </div>
                          <div>
                            <h3 className="text-sm font-black text-white leading-snug">{specialist.title}</h3>
                            <p className="text-[11px] font-semibold text-white/70">{specialist.subtitle}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-2.5">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md" style={{ backgroundColor: `${specialist.color}25`, color: specialist.color }}>
                          {specialist.badge}
                        </span>
                      </div>

                      <p className="text-xs text-white/60 leading-relaxed">{specialist.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Brand quote */}
            <div className="mt-6 p-5 rounded-2xl border border-[#A78BFA]/25 bg-[#A78BFA]/10">
              <p className="text-sm text-white/90 italic leading-relaxed">
                {lang === 'ar'
                  ? '"نحن لا نسلم مشروعك لمتدربين أو مساعدين مبتدئين. كل عميل يتعامل مباشرة مع قيادات تنفيذية تمتلك خبرة موثقة في إدارة الحملات وبناء المنصات الناجحة."'
                  : '"We never outsource your growth to interns. Every brand partners directly with senior specialists who have real skin in the game."'}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
