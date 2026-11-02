import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const About: React.FC = () => {
  const { lang } = useApp();
  const t = translations[lang].about;

  const teamMembers = [
    {
      name: lang === 'ar' ? 'عمر الكامل' : 'Omar Al-Kamel',
      role: lang === 'ar' ? 'المؤسس ورئيس استراتيجيات النمو' : 'Founder & Head of Growth',
      badge: lang === 'ar' ? '7+ سنوات خبرة' : '7+ Yrs Track Record',
      color: '#A78BFA',
      initials: 'OK',
      desc: lang === 'ar' 
        ? 'خبير تخطيط مسارات البيع (Funnels) وهندسة العروض الاستثمارية، أدار استراتيجيات التوسع لأكثر من 40 علامة تجارية في مصر والخليج.' 
        : 'Full-funnel architect and growth strategist. Engineered scalable acquisition engines for 40+ brands across Egypt and the GCC.',
    },
    {
      name: lang === 'ar' ? 'زياد عبد الفتاح' : 'Ziad Abdel Fattah',
      role: lang === 'ar' ? 'مدير شراء الوسائط والإعلانات المدفوعة' : 'Performance Media Director',
      badge: lang === 'ar' ? 'معتمد Meta & Google' : 'Meta & Google Certified',
      color: '#FF8FB1',
      initials: 'ZA',
      desc: lang === 'ar' 
        ? 'متخصص في إدارة الميزانيات الكبيرة واختبار الزوايا الإعلانية المتقدمة، أشرف على حملات تجاوزت ميزانياتها 25 مليون جنيه بعوائد موثقة.' 
        : 'Media buying veteran specializing in aggressive ad scaling, dynamic creative testing, and multi-touchpoint attribution.',
    },
    {
      name: lang === 'ar' ? 'م. يوسف إبراهيم' : 'Eng. Youssef Ibrahim',
      role: lang === 'ar' ? 'رئيس التطوير التقني والواجهات' : 'Head of Web & Tech Infrastructure',
      badge: lang === 'ar' ? 'متاجر سريعة & CRO' : 'Headless & CRO Architect',
      color: '#FF8A3D',
      initials: 'YI',
      desc: lang === 'ar' 
        ? 'مهندس برمجيات متخصص في بناء منصات Headless فائقة السرعة وصفحات هبوط ترفع معدل التحويل مع أتمتة الربط بالـ CRM والواتساب.' 
        : 'Full-stack software architect building sub-second headless web apps, high-converting checkout flows, and automated CRM pipelines.',
    },
    {
      name: lang === 'ar' ? 'نادين الشريف' : 'Nadine El-Sherif',
      role: lang === 'ar' ? 'مديرة الإخراج الإبداعي والمحتوى البيعي' : 'Creative Director & Direct Response',
      badge: lang === 'ar' ? '500+ إعلان رابح' : '500+ High-Converting Hooks',
      color: '#7ED6B7',
      initials: 'NS',
      desc: lang === 'ar' 
        ? 'خبيرة صناعة خطافات الإعلانات وكتابة النصوص النفسية المؤثرة وفيديوهات الـ UGC التي تضاعف معدل النقر والتحويل للمتاجر والشركات.' 
        : 'Direct-response copywriter and video director crafting high-converting ad hooks, UGC angles, and persuasive buyer psychology.',
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

          {/* Right: Real Team Members */}
          <AnimatedSection direction="right" delay={150}>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50 mb-6">
              {lang === 'ar' ? 'الفريق القيادي والتخصصات التنفيذية' : 'Leadership & Core Specialists'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-sm"
                          style={{ backgroundColor: `${member.color}35`, border: `1px solid ${member.color}50` }}
                        >
                          {member.initials}
                        </div>
                        <div>
                          <h3 className="text-base font-black text-white leading-snug">{member.name}</h3>
                          <p className="text-[11px] font-semibold text-white/70">{member.role}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-2.5">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md" style={{ backgroundColor: `${member.color}25`, color: member.color }}>
                        {member.badge}
                      </span>
                    </div>

                    <p className="text-xs text-white/60 leading-relaxed">{member.desc}</p>
                  </div>
                </div>
              ))}
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
