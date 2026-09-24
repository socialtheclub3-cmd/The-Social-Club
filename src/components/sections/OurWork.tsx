import React, { useState } from 'react';
import { ArrowRight, TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import CaseStudyModal, { type CaseStudy } from '../ui/CaseStudyModal';

const caseStudies: CaseStudy[] = [
  {
    id: 'apex',
    name: 'Apex Living Real Estate',
    nameAr: 'أبكس للمقاولات والتطوير',
    category: 'Luxury Real Estate · Full Growth Suite',
    categoryAr: 'عقارات فاخرة · منظومة نمو متكاملة',
    gradient: 'linear-gradient(135deg, #1E1E1E 0%, #A78BFA 100%)',
    industry: 'Real Estate',
    industryAr: 'العقارات',
    timeline: 'Results in 90 days',
    challenge:
      'Apex Living had an exceptional real-estate portfolio but was relying on referrals and traditional agents. Their digital presence was non-existent, and they were missing out on a massive pool of high-net-worth online buyers and investors.',
    challengeAr:
      'كانت أبكس ليفينج تمتلك محفظة عقارية فاخرة لكنها تعتمد كلياً على الإحالات والوسطاء التقليديين. كان حضورها الرقمي شبه معدوم، مما جعلها تفوّت شريحة ضخمة من المشترين والمستثمرين الأثرياء.',
    solution:
      'We designed a luxury digital ecosystem — from a premium property showcase website to hyper-targeted Meta and Google campaigns focused on high-net-worth audiences. A custom lead qualification funnel filtered serious buyers from casual browsers, feeding directly into their sales team\'s CRM.',
    solutionAr:
      'صممنا منظومة رقمية فاخرة متكاملة — من موقع عرض عقارات فاخر عالي الأداء إلى حملات ميتا وجوجل مستهدفة بدقة لفئة الأثرياء والمستثمرين. مسار تأهيل عملاء مخصص يصفّي الجادين من المتصفحين ويغذي فريق المبيعات مباشرةً.',
    results: [
      { icon: Users, value: '450+', label: 'Qualified Buyer Inquiries', labelAr: 'استفسار مشتري مؤهل', color: '#A78BFA' },
      { icon: TrendingUp, value: '+340%', label: 'Revenue Increase', labelAr: 'زيادة في المبيعات', color: '#22C55E' },
      { icon: DollarSign, value: '2.8x', label: 'ROAS Achieved', labelAr: 'عائد الإنفاق الإعلاني', color: '#FF8A3D' },
      { icon: Target, value: '-42%', label: 'Cost Per Lead', labelAr: 'انخفاض تكلفة العميل', color: '#F59E0B' },
    ],
    deliverables: [
      'Luxury property showcase website',
      'Meta & Google Ads campaigns',
      'Lead qualification funnel',
      'CRM integration & automation',
      'Weekly ROI reporting dashboard',
    ],
    deliverablesAr: [
      'موقع عرض عقارات فاخر',
      'حملات إعلانية على ميتا وجوجل',
      'مسار تأهيل العملاء المحتملين',
      'ربط وأتمتة نظام CRM',
      'تقارير أداء وعائد أسبوعية',
    ],
  },
  {
    id: 'bloom',
    name: 'Bloom Fashion Studio',
    nameAr: 'بلوم للأزياء الفاخرة',
    category: 'Direct to Consumer · E-Commerce',
    categoryAr: 'متجر إلكتروني · بيع مباشر للمستهلك',
    gradient: 'linear-gradient(135deg, #FF8FB1 0%, #A78BFA 100%)',
    industry: 'E-Commerce & Retail',
    industryAr: 'التجارة الإلكترونية',
    timeline: 'Results in first 90 days',
    challenge:
      'Bloom had a beautiful physical boutique but a slow, poorly converting online store. Their social media was inconsistent, and return on ad spend was below 1.2x, making paid growth unprofitable.',
    challengeAr:
      'كانت بلوم تمتلك بوتيك فيزيائي جميل لكن متجرها الإلكتروني كان بطيئاً وضعيف التحويل. كان التواجد على منصات التواصل غير منتظم، وعائد الإنفاق الإعلاني أقل من 1.2x مما يجعل النمو المدفوع غير مجدٍ.',
    solution:
      'We rebuilt their e-commerce experience as a high-speed, mobile-first headless store with conversion-focused UX. We then deployed performance creative testing across Meta Ads — iterating on 30+ ad creatives monthly — until we found the winning hooks that resonated with their target audience.',
    solutionAr:
      'أعدنا بناء تجربة التسوق الإلكتروني كمتجر headless سريع يركز على الهاتف المحمول مع تصميم تجربة مستخدم محورها التحويل. أطلقنا بعدها اختبارات إعلانات إبداعية مكثفة على ميتا — مكررين أكثر من 30 إعلاناً شهرياً — حتى وجدنا الصيغ الفائزة.',
    results: [
      { icon: TrendingUp, value: '3.4x', label: 'Return on Ad Spend', labelAr: 'عائد الإنفاق الإعلاني', color: '#FF8FB1' },
      { icon: DollarSign, value: '+180%', label: 'Average Order Value', labelAr: 'زيادة متوسط قيمة الطلب', color: '#A78BFA' },
      { icon: Users, value: '2.9x', label: 'Repeat Purchase Rate', labelAr: 'معدل تكرار الشراء', color: '#22C55E' },
      { icon: Target, value: '-55%', label: 'Page Load Time', labelAr: 'تحسن سرعة الموقع', color: '#F59E0B' },
    ],
    deliverables: [
      'Headless e-commerce store (React)',
      '30+ ad creative variations tested',
      'Email & SMS nurturing sequences',
      'Conversion rate optimization',
      'Influencer collaboration strategy',
    ],
    deliverablesAr: [
      'متجر إلكتروني Headless بتقنية React',
      'اختبار 30+ تصميم إعلاني مختلف',
      'سلاسل بريد إلكتروني وSMS تلقائية',
      'تحسين معدل التحويل (CRO)',
      'استراتيجية التعاون مع المؤثرين',
    ],
  },
  {
    id: 'strata',
    name: 'Strata Cloud Solutions',
    nameAr: 'ستراتا للحلول السحابية',
    category: 'B2B Enterprise · SaaS Lead Generation',
    categoryAr: 'شركات B2B · جلب عملاء SaaS',
    gradient: 'linear-gradient(135deg, #1E1E1E 0%, #FF8A3D 100%)',
    industry: 'B2B & SaaS',
    industryAr: 'B2B والبرمجيات',
    timeline: 'Results in 60 days',
    challenge:
      'Strata had a powerful cloud product but a generic website that failed to communicate technical value to enterprise buyers. Their sales team was spending too much time on cold outreach with low conversion rates.',
    challengeAr:
      'كانت ستراتا تمتلك منتجاً سحابياً قوياً لكن موقعها العادي كان يفشل في إيصال القيمة التقنية لمشتري المؤسسات. كان فريق المبيعات يُضيّع وقتاً كبيراً في التواصل البارد بمعدلات تحويل ضعيفة.',
    solution:
      'We created an interactive SaaS landing experience with live product demos, ROI calculators, and automated qualification sequences. Paired with LinkedIn and Google demand-gen campaigns targeting C-suite executives, we built a self-qualifying inbound pipeline that booked demos on autopilot.',
    solutionAr:
      'أنشأنا تجربة صفحة هبوط تفاعلية تشمل عروضاً توضيحية حية وحاسبات ROI ومتسلسلات تأهيل تلقائية. جنباً إلى جنب مع حملات LinkedIn وGoogle تستهدف المسؤولين التنفيذيين، بنينا خط أنابيب وارد يحجز العروض التوضيحية تلقائياً.',
    results: [
      { icon: Users, value: '40+', label: 'Executive Demos / Month', labelAr: 'عرض توضيحي تنفيذي شهرياً', color: '#FF8A3D' },
      { icon: TrendingUp, value: '6.2x', label: 'Pipeline Growth', labelAr: 'نمو خط الأنابيب', color: '#22C55E' },
      { icon: DollarSign, value: '-68%', label: 'Cost Per Demo Booked', labelAr: 'انخفاض تكلفة الحجز', color: '#A78BFA' },
      { icon: Target, value: '92%', label: 'Lead Quality Score', labelAr: 'نقاط جودة العملاء', color: '#F59E0B' },
    ],
    deliverables: [
      'Interactive SaaS landing page',
      'LinkedIn & Google demand gen campaigns',
      'Automated demo booking system',
      'Lead scoring & CRM automation',
      'C-suite targeted content strategy',
    ],
    deliverablesAr: [
      'صفحة هبوط تفاعلية للـ SaaS',
      'حملات LinkedIn وGoogle للطلب',
      'نظام حجز تلقائي للعروض التوضيحية',
      'تقييم العملاء وأتمتة CRM',
      'استراتيجية محتوى مستهدفة للمسؤولين',
    ],
  },
];

const OurWork: React.FC = () => {
  const { lang } = useApp();
  const t = translations[lang].ourWork;
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);

  const projectItems = caseStudies.map((cs) => ({
    ...cs,
    label: lang === 'ar' ? cs.categoryAr.split(' · ')[1] || cs.categoryAr.split(' · ')[0] : cs.category.split(' · ')[1] || cs.category.split(' · ')[0],
    description:
      cs.id === 'apex'
        ? lang === 'ar'
          ? 'إعادة إطلاق المنصة الرقمية وبناء قمع إعلانات موجهة لكبار المشترين والمستثمرين، مما حقق نمواً قياسياً في المبيعات.'
          : 'Complete web ecosystem overhaul with hyper-targeted paid lead funnels generating over 450+ qualified property buyer inquiries.'
        : cs.id === 'bloom'
        ? lang === 'ar'
          ? 'متجر إلكتروني عالي الأداء مع حملات محتوى إبداعي رفعت متوسط سلة الشراء ومعدل تكرار الطلبات.'
          : 'High-speed headless e-commerce store with performance creative testing driving 3.4x return on ad spend in first 90 days.'
        : lang === 'ar'
        ? 'بناء صفحة هبوط تقنية فائقة الإقناع مع نظام تأهيل تلقائي للمكالمات الاستشارية لكبار المديرين التنفيذيين.'
        : 'Interactive SaaS landing experience paired with automated qualification sequences booking 40+ executive demos monthly.',
    tags:
      cs.id === 'apex'
        ? lang === 'ar' ? ['إعلانات مدفوعة', 'موقع ويب فخم', 'جلب عملاء'] : ['Paid Media', 'Luxury Web', 'Lead Gen']
        : cs.id === 'bloom'
        ? lang === 'ar' ? ['تصميم متجر', 'تسويق رقمي', 'تحسين تحويلات'] : ['E-Commerce', 'Creative Ads', 'CRO']
        : lang === 'ar' ? ['موقع مخصص', 'أتمتة CRM', 'جلب عملاء'] : ['Custom Web', 'CRM Automation', 'Lead Gen'],
  }));

  return (
    <>
      <section
        id="work"
        className="section-padding bg-[#FBF6EF] dark:bg-[#121212] overflow-hidden transition-colors duration-300"
        aria-label="Our work portfolio"
      >
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <AnimatedSection>
              <SectionHeading
                eyebrow={t.badge}
                title={t.title}
                subtitle={t.subtitle}
                align="left"
              />
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-shrink-0 text-sm font-black text-[#1E1E1E] dark:text-white hover:text-[#A78BFA] transition-colors inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>{t.viewAllBtn}</span>
                <ArrowRight size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
              </a>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectItems.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 120}>
                <article className="group rounded-3xl overflow-hidden bg-white dark:bg-[#1C1C1C] border border-[#1E1E1E]/8 dark:border-white/10 card-lift flex flex-col h-full shadow-sm">
                  {/* Project Visual */}
                  <div className="relative aspect-[4/3] overflow-hidden" style={{ background: project.gradient }}>
                    {/* Concept label */}
                    <span className={`absolute top-4 ${lang === 'ar' ? 'right-4' : 'left-4'} bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full`}>
                      {project.label}
                    </span>
                    {/* Decorative inner card */}
                    <div className="absolute inset-6 bottom-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-4">
                      <div className="text-center">
                        <p className="text-white font-black text-xl leading-tight">{lang === 'ar' ? project.nameAr : project.name}</p>
                        <p className="text-white/80 text-xs mt-1">{lang === 'ar' ? project.industryAr : project.industry}</p>
                      </div>
                    </div>

                    {/* Hover overlay with quick metrics */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-3 p-6">
                        {project.results.slice(0, 4).map((r, ri) => (
                          <div key={ri} className="text-center">
                            <p className="text-white font-black text-lg" style={{ color: r.color }}>{r.value}</p>
                            <p className="text-white/75 text-[10px] font-semibold leading-tight mt-0.5">{lang === 'ar' ? r.labelAr : r.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] font-bold uppercase tracking-wide bg-[#FBF6EF] dark:bg-[#262626] text-[#1E1E1E]/70 dark:text-white/70 px-2.5 py-1 rounded-full border border-[#1E1E1E]/10 dark:border-white/10"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-black text-[#1E1E1E] dark:text-white mb-2">{lang === 'ar' ? project.nameAr : project.name}</h3>
                    <p className="text-sm text-[#1E1E1E]/60 dark:text-white/65 leading-relaxed flex-1">{project.description}</p>

                    <button
                      onClick={() => setActiveStudy(project)}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1E1E1E] dark:text-white hover:text-[#A78BFA] transition-all duration-200 group-hover:gap-3 cursor-pointer bg-transparent border-none p-0"
                      aria-label={`View case study for ${lang === 'ar' ? project.nameAr : project.name}`}
                    >
                      <span>{t.viewProject}</span>
                      <ArrowRight size={15} className={lang === 'ar' ? 'rotate-180' : ''} />
                    </button>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <CaseStudyModal study={activeStudy} onClose={() => setActiveStudy(null)} />
    </>
  );
};

export default OurWork;
