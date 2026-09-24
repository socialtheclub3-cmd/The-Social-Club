import React, { useState } from 'react';
import { Quote, Star, CheckCircle, TrendingUp, Building2 } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

interface TestimonialItem {
  id: string;
  category: 'all' | 'ecommerce' | 'leads' | 'web';
  textAr: string;
  textEn: string;
  authorAr: string;
  authorEn: string;
  roleAr: string;
  roleEn: string;
  company: string;
  metric: string;
  metricLabelAr: string;
  metricLabelEn: string;
  accent: string;
}

const Testimonials: React.FC = () => {
  const { lang } = useApp();
  const t = translations[lang].testimonials;
  const isAr = lang === 'ar';

  const [activeCategory, setActiveCategory] = useState<'all' | 'ecommerce' | 'leads' | 'web'>('all');

  const testimonials: TestimonialItem[] = [
    {
      id: '1',
      category: 'ecommerce',
      textAr: 'الفريق في ذا سوشيال كلوب غيّر قواعد اللعبة لمتجرنا. خلال 90 يوم فقط تضاعفت الإيرادات وانخفضت تكلفة الاستحواذ على العميل بنسبة 35%. فهمهم لسلوك المشتري العربي استثنائي.',
      textEn: 'The team at The Social Club completely changed the game for our online store. Within 90 days, revenue doubled while customer acquisition cost dropped by 35%. Their grasp of conversion funnels is extraordinary.',
      authorAr: 'كريم المنشاوي',
      authorEn: 'Kareem El-Menshawy',
      roleAr: 'المؤسس والرئيس التنفيذي',
      roleEn: 'Founder & CEO',
      company: 'Aura Lifestyle',
      metric: '+320%',
      metricLabelAr: 'نمو في المبيعات الشهرية',
      metricLabelEn: 'Monthly Revenue Growth',
      accent: '#FF8A3D',
    },
    {
      id: '2',
      category: 'leads',
      textAr: 'كنا نعاني من جلب عملاء غير جادين عبر الإعلانات التقليدية. نظام الـ Funnel والأتمتة الذي بنوه وفّر على فريق المبيعات لدينا مئات الساعات، وضاعف حجم الصفقات المغلقة شهرياً.',
      textEn: 'We struggled with unqualified leads from standard ads. The high-intent funnel and automation infrastructure they engineered saved our sales team hundreds of hours and doubled closed deals.',
      authorAr: 'م. سارة عبد الرحمن',
      authorEn: 'Eng. Sarah Abdelrahman',
      roleAr: 'مديرة العمليات والتسويق',
      roleEn: 'VP of Marketing & Growth',
      company: 'Nexora B2B Solutions',
      metric: '4.8x',
      metricLabelAr: 'عائد على الإنفاق الإعلاني (ROAS)',
      metricLabelEn: 'Return on Ad Spend',
      accent: '#A78BFA',
    },
    {
      id: '3',
      category: 'web',
      textAr: 'من أفضل القرارات الاستثمارية لشركتنا. دمجوا بين تطوير موقع فخم فائق السرعة وإعلانات استهداف دقيقة، فزاد معدل إغلاق المبيعات بنسبة 180% وتغير انطباع العملاء تماماً.',
      textEn: 'One of the best ROI decisions we made this year. They combined a blisteringly fast, ultra-premium web platform with precision campaigns, boosting our sales close rate by 180%.',
      authorAr: 'أحمد الشناوي',
      authorEn: 'Ahmed El-Shennawy',
      roleAr: 'مؤسس ومدير تنفيذي',
      roleEn: 'Founder & Managing Director',
      company: 'Horizon Group Developments',
      metric: '+180%',
      metricLabelAr: 'زيادة بمعدل تحويل العملاء',
      metricLabelEn: 'Conversion Rate Lift',
      accent: '#7ED6B7',
    },
    {
      id: '4',
      category: 'leads',
      textAr: 'الاحترافية في التنفيذ والمتابعة اليومية للأرقام جعلتنا نعتبرهم شريك نجاح أساسي وليس مجرد وكالة خارجية. استطعنا التوسع إلى سوقين إقليميين جديدين خلال 6 أشهر بثقة كاملة.',
      textEn: 'Their data-driven discipline and daily attention to metrics turned them from a vendor into an irreplaceable growth partner. We scaled into two regional markets in 6 months with absolute confidence.',
      authorAr: 'د. طارق الحكيم',
      authorEn: 'Dr. Tarek El-Hakim',
      roleAr: 'المدير الطبي والتنفيذي',
      roleEn: 'Managing Partner',
      company: 'Elite Specialized Centers',
      metric: '10x',
      metricLabelAr: 'حجم استقطاب المرضى المؤهلين',
      metricLabelEn: 'Qualified Patient Inquiries',
      accent: '#FF8FB1',
    },
  ];

  const categories = [
    { id: 'all', labelAr: 'جميع الآراء', labelEn: 'All Reviews' },
    { id: 'ecommerce', labelAr: 'المتاجر الإلكترونية', labelEn: 'E-commerce' },
    { id: 'leads', labelAr: 'جلب العملاء (B2B)', labelEn: 'Lead Generation' },
    { id: 'web', labelAr: 'المواقع والبرمجة', labelEn: 'Web & Systems' },
  ];

  const filteredTestimonials = activeCategory === 'all'
    ? testimonials
    : testimonials.filter((t) => t.category === activeCategory);

  return (
    <section
      id="testimonials"
      className="section-padding bg-[#F3EBE0]/60 dark:bg-[#151515] overflow-hidden transition-colors duration-300 relative"
      aria-label="Client testimonials"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#A78BFA]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#FF8A3D]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <AnimatedSection className="mb-10 text-center">
          <SectionHeading
            eyebrow={t.badge}
            title={t.title}
            subtitle={
              isAr
                ? 'نتائج واقعية، أرقام موثقة، وقصص نجاح حقيقية لشركائنا في رحلة الصعود الرقمي.'
                : 'Real outcomes, audited metrics, and genuine success stories from ambitious brands we scale.'
            }
            align="center"
          />

          {/* Social Proof Trust Bar */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 py-2 px-5 rounded-full bg-white/70 dark:bg-[#1F1F1F]/70 border border-[#1E1E1E]/8 dark:border-white/10 shadow-xs backdrop-blur-xs">
            <div className="flex items-center gap-1 text-[#FFB800]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </div>
            <span className="text-xs font-black text-[#1E1E1E] dark:text-white">
              {isAr ? 'تقييم 4.9 من 5' : '4.9 / 5 Rating'}
            </span>
            <span className="text-xs text-[#1E1E1E]/40 dark:text-white/40">•</span>
            <span className="text-xs font-semibold text-[#1E1E1E]/70 dark:text-white/70">
              {isAr ? 'أكثر من 35+ شريك موثّق' : '35+ Verified Growth Partners'}
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#1E1E1E] text-white dark:bg-white dark:text-[#121212] shadow-sm scale-105'
                    : 'bg-white/80 dark:bg-[#202020] text-[#1E1E1E]/70 dark:text-white/70 hover:text-[#1E1E1E] dark:hover:text-white border border-[#1E1E1E]/5 dark:border-white/5'
                }`}
              >
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredTestimonials.map((item, idx) => (
            <AnimatedSection key={item.id} delay={idx * 80}>
              <div className="bg-white dark:bg-[#1D1D1D] rounded-3xl p-7 border border-[#1E1E1E]/8 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#A78BFA]/40 transition-all duration-500 flex flex-col justify-between h-full group">
                <div>
                  {/* Top Bar: Metric Highlight & Verified Badge */}
                  <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-[#1E1E1E]/6 dark:border-white/8">
                    <div className="flex items-center gap-2">
                      <div
                        className="px-3 py-1.5 rounded-xl font-black text-sm flex items-center gap-1.5 shadow-xs"
                        style={{ backgroundColor: `${item.accent}18`, color: item.accent }}
                      >
                        <TrendingUp size={15} />
                        <span>{item.metric}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-[#1E1E1E]/60 dark:text-white/60">
                        {isAr ? item.metricLabelAr : item.metricLabelEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[#7ED6B7] bg-[#7ED6B7]/10 px-2.5 py-1 rounded-full text-[10px] font-bold">
                      <CheckCircle size={12} />
                      <span>{isAr ? 'عميل موثّق' : 'Verified'}</span>
                    </div>
                  </div>

                  {/* Stars & Quote */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#FFB800]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <Quote size={20} className="text-[#1E1E1E]/20 dark:text-white/20 group-hover:text-[#A78BFA] transition-colors" />
                  </div>

                  {/* Body Text */}
                  <p className="text-sm text-[#1E1E1E]/80 dark:text-white/85 leading-relaxed mb-6 font-medium">
                    "{isAr ? item.textAr : item.textEn}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-4 border-t border-[#1E1E1E]/6 dark:border-white/8">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm text-white shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, ${item.accent}, #A78BFA)`,
                      }}
                    >
                      {(isAr ? item.authorAr : item.authorEn).slice(0, 1)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#1E1E1E] dark:text-white leading-snug">
                        {isAr ? item.authorAr : item.authorEn}
                      </h4>
                      <p className="text-xs text-[#1E1E1E]/55 dark:text-white/55">
                        {isAr ? item.roleAr : item.roleEn}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1E1E1E]/4 dark:bg-white/5 text-[11px] font-bold text-[#1E1E1E]/70 dark:text-white/70">
                    <Building2 size={13} className="text-[#A78BFA]" />
                    <span>{item.company}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
