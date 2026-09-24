import React, { useState, useEffect } from 'react';
import { Check, Sparkles, Zap, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import TiltCard from '../ui/TiltCard';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { pricingService, type PricingConfig } from '../../services/pricingService';

const Pricing: React.FC = () => {
  const { lang, formatCurrency } = useApp();
  const t = translations[lang].pricing;
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');
  const [prices, setPrices] = useState<PricingConfig>(pricingService.getPricing());

  useEffect(() => {
    const unsubscribe = pricingService.subscribe((config) => setPrices(config));
    return () => unsubscribe();
  }, []);

  const plans = [
    {
      id: 'starter',
      key: 'plan1',
      data: t.plan1,
      icon: Zap,
      accent: '#FF8A3D',
      popular: false,
      priceMonthly: prices.starter.monthly,
      priceQuarterly: prices.starter.quarterly,
    },
    {
      id: 'scale',
      key: 'plan2',
      data: t.plan2,
      icon: Sparkles,
      accent: '#A78BFA',
      popular: true,
      priceMonthly: prices.scale.monthly,
      priceQuarterly: prices.scale.quarterly,
    },
    {
      id: 'enterprise',
      key: 'plan3',
      data: t.plan3,
      icon: Shield,
      accent: '#7ED6B7',
      popular: false,
      priceMonthly: prices.enterprise.monthly,
      priceQuarterly: prices.enterprise.quarterly,
    },
  ];

  const handleSelectPlan = (planName: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Pre-fill or focus message if available
      const textarea = document.getElementById('contact-message') as HTMLTextAreaElement | null;
      if (textarea) {
        textarea.value = isAr 
          ? `مرحباً، أود الاستفسار والبدء مع: ${planName}`
          : `Hi, I would like to get started with the ${planName} package.`;
        textarea.focus();
      }
    }
  };

  return (
    <section
      id="pricing"
      className="section-padding bg-[#FBF6EF] dark:bg-[#121212] overflow-hidden transition-colors duration-300 relative"
      aria-label="Pricing and packages"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#A78BFA]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-12">
          <SectionHeading
            eyebrow={t.badge}
            title={t.title}
            subtitle={t.subtitle}
            align="center"
          />

          {/* Billing Switcher Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-white dark:bg-[#1E1E1E] border border-[#1E1E1E]/10 dark:border-white/10 shadow-xs">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-[#1E1E1E] text-white dark:bg-white dark:text-[#121212] shadow-sm'
                  : 'text-[#1E1E1E]/60 dark:text-white/60 hover:text-[#1E1E1E] dark:hover:text-white'
              }`}
            >
              {isAr ? 'اشتراك شهري' : 'Monthly'}
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('quarterly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                billingCycle === 'quarterly'
                  ? 'bg-[#1E1E1E] text-white dark:bg-white dark:text-[#121212] shadow-sm'
                  : 'text-[#1E1E1E]/60 dark:text-white/60 hover:text-[#1E1E1E] dark:hover:text-white'
              }`}
            >
              <span>{isAr ? 'اشتراك ربع سنوي' : 'Quarterly'}</span>
              <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded-full bg-[#A78BFA] text-[#1E1E1E]">
                {isAr ? 'خصم 15%' : 'Save 15%'}
              </span>
            </button>
          </div>
        </AnimatedSection>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            const currentPrice = billingCycle === 'quarterly' ? plan.priceQuarterly : plan.priceMonthly;

            return (
              <AnimatedSection key={plan.id} delay={idx * 120} className="flex w-full">
                <TiltCard className="w-full h-full flex">
                  <div
                    className={`w-full h-full rounded-3xl p-8 transition-all duration-500 flex flex-col justify-between relative ${
                      plan.popular
                        ? 'bg-white dark:bg-[#1E1E1E] border-2 border-[#A78BFA] shadow-xl shadow-[#A78BFA]/10 lg:-translate-y-3'
                        : 'bg-white dark:bg-[#181818] border border-[#1E1E1E]/8 dark:border-white/10 shadow-sm hover:border-[#1E1E1E]/20 dark:hover:border-white/20'
                    }`}
                  >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#FF8FB1] text-white font-black text-[11px] tracking-wider uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                      <Sparkles size={12} />
                      {t.popularBadge}
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${plan.accent}18` }}
                      >
                        <Icon size={22} style={{ color: plan.accent }} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E]/40 dark:text-white/40">
                        {isAr ? `المستوى 0${idx + 1}` : `Tier 0${idx + 1}`}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-[#1E1E1E] dark:text-white mb-2">
                      {plan.data.name}
                    </h3>
                    <p className="text-xs text-[#1E1E1E]/60 dark:text-white/60 leading-relaxed min-h-[38px] mb-6">
                      {plan.data.tagline}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-[#1E1E1E]/8 dark:border-white/10">
                      <span className="text-4xl sm:text-5xl font-black tracking-tight text-[#1E1E1E] dark:text-white">
                        {formatCurrency(currentPrice)}
                      </span>
                      {plan.data.period && (
                        <span className="text-xs font-semibold text-[#1E1E1E]/50 dark:text-white/50">
                          {plan.data.period}
                        </span>
                      )}
                    </div>

                    {/* Features list */}
                    <ul className="space-y-3.5 mb-8">
                      {plan.data.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-xs leading-relaxed text-[#1E1E1E]/75 dark:text-white/75">
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: `${plan.accent}25` }}
                          >
                            <Check size={11} style={{ color: plan.accent }} strokeWidth={3} />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action CTA */}
                  <div>
                    <button
                      type="button"
                      onClick={() => handleSelectPlan(plan.data.name)}
                      className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                        plan.popular
                          ? 'bg-[#A78BFA] hover:bg-[#906fe7] text-[#1E1E1E] shadow-md shadow-[#A78BFA]/30 hover:scale-[1.02]'
                          : 'bg-[#1E1E1E]/5 dark:bg-white/10 hover:bg-[#1E1E1E] dark:hover:bg-white hover:text-white dark:hover:text-[#121212] text-[#1E1E1E] dark:text-white'
                      }`}
                    >
                      <span>{t.planCta}</span>
                      <ArrowIcon size={16} />
                    </button>
                  </div>
                  </div>
                </TiltCard>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Enterprise Bottom Help Callout */}
        <AnimatedSection delay={350} className="mt-14 max-w-2xl mx-auto text-center">
          <div className="p-6 rounded-2xl border border-[#1E1E1E]/8 dark:border-white/10 bg-white/60 dark:bg-[#1E1E1E]/50 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left sm:text-start">
              <h4 className="text-sm font-black text-[#1E1E1E] dark:text-white mb-1">
                {isAr ? 'تحتاج باقة مخصصة بالكامل لأهدافك؟' : 'Need a completely custom enterprise scope?'}
              </h4>
              <p className="text-xs text-[#1E1E1E]/60 dark:text-white/60">
                {isAr ? 'تحدث مباشرة مع مستشار النمو لدينا لتفصيل الخطة المثالية.' : 'Talk directly with our growth strategist to design a tailored blueprint.'}
              </p>
            </div>
            <Button
              href="#contact"
              variant="outline"
              size="sm"
              className="flex-shrink-0"
            >
              {t.customCta}
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Pricing;
