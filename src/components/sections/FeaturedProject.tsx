import React, { useState, useEffect } from 'react';
import { BookOpen, TrendingUp, DollarSign, Target, Users } from 'lucide-react';
import { SiGoogleads, SiTiktok, SiMeta, SiShopify } from 'react-icons/si';
import AnimatedSection from '../ui/AnimatedSection';
import Button from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import CaseStudyModal, { type CaseStudy } from '../ui/CaseStudyModal';
import { caseStudyService } from '../../services/caseStudyService';
import type { StorableCaseStudy, ResultIconKey } from '../../data/caseStudyData';

const ICON_MAP: Record<ResultIconKey, React.ElementType> = {
  TrendingUp,
  Users,
  DollarSign,
  Target,
};

const featuredCaseStudyData: CaseStudy = {
  id: 'apex-living',
  name: 'Apex Omnichannel Brand',
  nameAr: 'أبيكس للمنتجات والحلول الراقية',
  category: 'Omnichannel D2C & Retail',
  categoryAr: 'تجارة تجزئة متعددة القنوات وبيع مباشر',
  gradient: 'linear-gradient(135deg, #1E1E1E 0%, #2E2E2E 50%, #A78BFA 100%)',
  industry: 'D2C Retail & Home Living',
  industryAr: 'التجارة الإلكترونية والتجزئة',
  timeline: '90-Day Scaling Sprint',
  challenge:
    'Apex faced high customer acquisition costs ($84/customer) and flatlined sales due to fragmented ad creatives and an unoptimized mobile checkout that lost 68% of cart visitors.',
  challengeAr:
    'واجهت أبيكس ارتفاعاً حاداً في تكلفة اكتساب العميل (84 دولار لكل عميل) وركوداً في المبيعات بسبب عشوائية الحملات الإعلانية وضعف صفحة الدفع على الموبايل التي كانت تفقد 68% من الزوار.',
  solution:
    'We overhauled their funnel with a high-velocity mobile headless storefront, installed full-funnel Meta and Google tracking, and created 45+ dynamic video ad angles highlighting social proof and luxury craftsmanship. We also automated cart-recovery and retention sequences.',
  solutionAr:
    'أعدنا هيكلة قمع المبيعات بمتجر فائق السرعة مخصص للهواتف، وضبطنا أنظمة تتبع المبيعات المتقدمة على ميتا وجوجل، وأنتجنا 45 زاوية إعلانية بالفيديو تركز على الإثبات الاجتماعي. كما فعلنا أتمتة استرداد السلات المتروكة وسلاسل البريد البيعية.',
  results: [
    { icon: TrendingUp, value: '+340%', label: 'Revenue Increase', labelAr: 'زيادة صافي الإيرادات', color: '#A78BFA' },
    { icon: DollarSign, value: '2.8x', label: 'ROAS Scaled', labelAr: 'مضاعفة عائد الإعلانات', color: '#7ED6B7' },
    { icon: Target, value: '-42%', label: 'Cost Per Acquisition', labelAr: 'انخفاض تكلفة الاكتساب', color: '#FF8A3D' },
    { icon: Users, value: '82%', label: 'Cart Checkout Rate', labelAr: 'إتمام عمليات الشراء', color: '#FF8FB1' },
  ],
  deliverables: [
    'Complete UX/UI redesign & mobile checkout optimization',
    'Omnichannel Meta & Google Performance Max campaigns',
    'Automated Klaviyo email & SMS revenue flows',
    'Custom Conversion API (CAPI) & real-time analytics dashboard',
    '45+ short-form creative assets tested monthly',
  ],
  deliverablesAr: [
    'إعادة تصميم تجربة المستخدم وتحسين مسار الدفع على الموبايل',
    'حملات إعلانات متعددة القنوات عبر Meta و Google Performance Max',
    'أتمتة سلاسل البريد الإلكتروني والرسائل القصيرة لاسترداد السلات',
    'ربط Conversion API (CAPI) ولوحة تحكم حية لمتابعة النتائج',
    'صناعة واختبار أكثر من 45 تصميماً وفيديو إعلاني شهرياً',
  ],
};

const FeaturedProject: React.FC = () => {
  const { lang } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [customFeatured, setCustomFeatured] = useState<StorableCaseStudy | null>(null);
  const t = translations[lang].featuredProject;

  useEffect(() => {
    const unsub = caseStudyService.subscribe((studies) => {
      const feat = studies.find((s) => s.isFeatured);
      setCustomFeatured(feat ?? null);
    });
    return () => unsub();
  }, []);

  const activeModalStudy: CaseStudy = customFeatured
    ? {
        ...customFeatured,
        results: customFeatured.results.map((r) => ({
          ...r,
          icon: ICON_MAP[r.icon] ?? TrendingUp,
        })),
      }
    : featuredCaseStudyData;

  const displayTitle = customFeatured
    ? lang === 'ar'
      ? customFeatured.nameAr
      : customFeatured.name
    : t.title;

  const displaySubtitle = customFeatured
    ? lang === 'ar'
      ? customFeatured.industryAr || customFeatured.categoryAr
      : customFeatured.industry || customFeatured.category
    : lang === 'ar'
    ? 'تجارة إلكترونية وشركات رائدة'
    : 'D2C Brand / Multi-Channel Growth';

  const displayDesc = customFeatured
    ? lang === 'ar'
      ? customFeatured.descriptionAr || customFeatured.challengeAr
      : customFeatured.description || customFeatured.challenge
    : t.desc;

  const displayMetrics =
    customFeatured && customFeatured.results.length >= 3
      ? customFeatured.results.slice(0, 3).map((r) => ({
          val: r.value,
          lbl: lang === 'ar' ? r.labelAr : r.label,
        }))
      : [
          { val: t.metric1Val, lbl: t.metric1Lbl },
          { val: t.metric2Val, lbl: t.metric2Lbl },
          { val: t.metric3Val, lbl: t.metric3Lbl },
        ];

  const servicesUsed = customFeatured
    ? (lang === 'ar' ? customFeatured.tagsAr : customFeatured.tags)?.filter(Boolean).length
      ? (lang === 'ar' ? customFeatured.tagsAr! : customFeatured.tags!).filter(Boolean)
      : (lang === 'ar' ? customFeatured.deliverablesAr : customFeatured.deliverables).slice(0, 4)
    : lang === 'ar'
    ? ['إعلانات مدفوعة', 'صفحات هبوط بيعية', 'تأهيل العملاء', 'أتمتة CRM']
    : ['Lead Generation', 'Landing Page', 'Paid Ads', 'CRM Setup'];

  return (
    <>
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
                  <div className="mt-auto grid grid-cols-4 gap-2 lg:gap-3 relative z-10">
                    {/* Meta */}
                    <div className="aspect-square bg-[#0668E1]/20 border border-[#0668E1]/30 rounded-xl flex flex-col items-center justify-center gap-1 group cursor-pointer overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0668E1]/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <SiMeta className="text-[#0668E1] dark:text-[#0668E1] w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
                      <span className="text-[9px] font-bold text-[#0668E1] opacity-0 group-hover:opacity-100 transition-opacity duration-300">Meta</span>
                    </div>
                    {/* Google Ads */}
                    <div className="aspect-square bg-[#F4B400]/20 border border-[#F4B400]/30 rounded-xl flex flex-col items-center justify-center gap-1 group cursor-pointer overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#F4B400]/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <SiGoogleads className="text-[#F4B400] w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
                      <span className="text-[9px] font-bold text-[#F4B400] opacity-0 group-hover:opacity-100 transition-opacity duration-300">Google</span>
                    </div>
                    {/* TikTok */}
                    <div className="aspect-square bg-[#00f2fe]/20 border border-[#00f2fe]/30 rounded-xl flex flex-col items-center justify-center gap-1 group cursor-pointer overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00f2fe]/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <SiTiktok className="text-[#00f2fe] w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
                      <span className="text-[9px] font-bold text-[#00f2fe] opacity-0 group-hover:opacity-100 transition-opacity duration-300">TikTok</span>
                    </div>
                    {/* Shopify */}
                    <div className="aspect-square bg-[#95BF47]/20 border border-[#95BF47]/30 rounded-xl flex flex-col items-center justify-center gap-1 group cursor-pointer overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#95BF47]/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <SiShopify className="text-[#95BF47] w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
                      <span className="text-[9px] font-bold text-[#95BF47] opacity-0 group-hover:opacity-100 transition-opacity duration-300">Shopify</span>
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
                  {displayTitle}
                </h2>
                <p className="text-sm font-bold text-[#A78BFA]">
                  {displaySubtitle}
                </p>
              </div>

              <p className="text-sm text-[#1E1E1E]/70 dark:text-white/70 leading-relaxed">
                {displayDesc}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 my-2">
                {displayMetrics.map((m, idx) => (
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

                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={() => setShowModal(true)}
                    className="cursor-pointer"
                  >
                    <BookOpen size={16} />
                    <span>{t.readFull}</span>
                  </Button>

                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs sm:text-sm font-bold text-[#1E1E1E]/70 dark:text-white/70 hover:text-[#A78BFA] dark:hover:text-[#A78BFA] transition-colors py-2 px-3"
                  >
                    {lang === 'ar' ? 'اطلب خطة مماثلة لمشروعك ←' : 'Get a Similar Roadmap →'}
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Case Study Full Modal */}
      <CaseStudyModal study={showModal ? activeModalStudy : null} onClose={() => setShowModal(false)} />
    </>
  );
};

export default FeaturedProject;
