import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  ShoppingBag, 
  Briefcase, 
  Home as HomeIcon, 
  Stethoscope, 
  ArrowRight, 
  ArrowLeft,
  MessageCircle,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

type IndustryKey = 'ecommerce' | 'b2b' | 'realestate' | 'clinics';

interface IndustryConfig {
  id: IndustryKey;
  icon: React.ElementType;
  defaultAvgValue: number;
  minValue: number;
  maxValue: number;
  multiplier: number;
  accent: string;
}

const industryConfigs: Record<IndustryKey, IndustryConfig> = {
  ecommerce: {
    id: 'ecommerce',
    icon: ShoppingBag,
    defaultAvgValue: 70,
    minValue: 20,
    maxValue: 500,
    multiplier: 4.2,
    accent: '#FF8A3D',
  },
  b2b: {
    id: 'b2b',
    icon: Briefcase,
    defaultAvgValue: 1200,
    minValue: 200,
    maxValue: 5000,
    multiplier: 4.8,
    accent: '#A78BFA',
  },
  realestate: {
    id: 'realestate',
    icon: HomeIcon,
    defaultAvgValue: 4000,
    minValue: 500,
    maxValue: 10000,
    multiplier: 6.5,
    accent: '#7ED6B7',
  },
  clinics: {
    id: 'clinics',
    icon: Stethoscope,
    defaultAvgValue: 350,
    minValue: 50,
    maxValue: 2500,
    multiplier: 4.5,
    accent: '#FF8FB1',
  },
};

const RoiCalculator: React.FC = () => {
  const { lang, formatCurrency } = useApp();
  const t = translations[lang].calculator;
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [selectedIndustry, setSelectedIndustry] = useState<IndustryKey>('ecommerce');
  const [budget, setBudget] = useState<number>(3000);
  const [avgValue, setAvgValue] = useState<number>(industryConfigs.ecommerce.defaultAvgValue);

  const currentConfig = industryConfigs[selectedIndustry];

  const handleIndustryChange = (ind: IndustryKey) => {
    setSelectedIndustry(ind);
    setAvgValue(industryConfigs[ind].defaultAvgValue);
  };

  // Calculations
  const { projectedRevenue, estimatedDeals, roasMultiplier } = useMemo(() => {
    const mult = currentConfig.multiplier;
    const revenue = Math.round(budget * mult);
    const deals = Math.max(1, Math.round(revenue / Math.max(10, avgValue)));
    return {
      projectedRevenue: revenue,
      estimatedDeals: deals,
      roasMultiplier: mult.toFixed(1),
    };
  }, [budget, avgValue, currentConfig]);

  const industryName = t.industries[selectedIndustry];

  const handleClaimBlueprint = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      const textarea = document.getElementById('contact-message') as HTMLTextAreaElement | null;
      if (textarea) {
        textarea.value = isAr
          ? `مرحباً، قمت بحساب العائد لمشروع (${industryName}) بميزانية شهرياً $${budget.toLocaleString()}، وأود الحصول على خطة العمل لتحقيق إيراد متوقع $${projectedRevenue.toLocaleString()} (عائد ${roasMultiplier}x).`
          : `Hi, I ran the growth calculator for (${industryName}) with a monthly budget of $${budget.toLocaleString()}, and would like to claim the roadmap to reach $${projectedRevenue.toLocaleString()} (est. ${roasMultiplier}x ROAS).`;
        textarea.focus();
      }
    }
  };

  const getWhatsAppBlueprintUrl = () => {
    const text = isAr
      ? `مرحباً The Social Club 👋، قمت بحساب العائد لمشروعي (${industryName}) بميزانية $${budget.toLocaleString()} شهرياً، وأود مناقشة خطة الوصول لإيراد $${projectedRevenue.toLocaleString()} المتوقع.`
      : `Hello The Social Club 👋, I calculated projected growth for (${industryName}) with a $${budget.toLocaleString()} monthly budget, and would like to discuss the roadmap to achieve $${projectedRevenue.toLocaleString()}.`;
    return `https://wa.me/201043971900?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="calculator"
      className="section-padding bg-[#F3EBE0]/60 dark:bg-[#141414] overflow-hidden transition-colors duration-300 relative"
      aria-label="Growth and ROI Calculator"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-[#A78BFA]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#FF8A3D]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-12">
          <SectionHeading
            eyebrow={t.badge}
            title={t.title}
            subtitle={t.subtitle}
            align="center"
          />
        </AnimatedSection>

        <div className="max-w-5xl mx-auto bg-white dark:bg-[#1C1C1C] rounded-3xl p-6 sm:p-10 border border-[#1E1E1E]/8 dark:border-white/10 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Interactive Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Industry Selector */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#1E1E1E]/70 dark:text-white/70 mb-3 flex items-center gap-2">
                  <Calculator size={14} className="text-[#A78BFA]" />
                  <span>{t.industryLabel}</span>
                </label>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {(['ecommerce', 'b2b', 'realestate', 'clinics'] as IndustryKey[]).map((key) => {
                    const cfg = industryConfigs[key];
                    const Icon = cfg.icon;
                    const isSelected = selectedIndustry === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleIndustryChange(key)}
                        className={`p-3.5 rounded-2xl border text-start flex items-center gap-3 transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#1E1E1E] text-white dark:bg-white dark:text-[#121212] border-transparent shadow-md scale-[1.02]'
                            : 'bg-[#F8F4EE] dark:bg-[#222222] text-[#1E1E1E]/80 dark:text-white/80 border-[#1E1E1E]/5 dark:border-white/5 hover:border-[#A78BFA]/40'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-white/20 dark:bg-black/10' : 'bg-white dark:bg-[#181818]'
                          }`}
                        >
                          <Icon size={16} style={{ color: isSelected ? 'inherit' : cfg.accent }} />
                        </div>
                        <span className="text-xs font-bold leading-snug">
                          {t.industries[key]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E]/70 dark:text-white/70">
                    {t.budgetLabel}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#A78BFA]">
                    {formatCurrency(budget)}
                    <span className="text-xs font-normal text-[#1E1E1E]/50 dark:text-white/50"> /mo</span>
                  </span>
                </div>

                <input
                  type="range"
                  min={500}
                  max={20000}
                  step={250}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#F8F4EE] dark:bg-[#282828] rounded-full appearance-none cursor-pointer accent-[#A78BFA]"
                />

                <div className="flex items-center justify-between text-[11px] font-semibold text-[#1E1E1E]/40 dark:text-white/40">
                  <span>{formatCurrency(500)}</span>
                  <span>{formatCurrency(5000)}</span>
                  <span>{formatCurrency(10000)}</span>
                  <span>{formatCurrency(20000)}+</span>
                </div>
              </div>

              {/* Deal / Order Value Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E]/70 dark:text-white/70">
                    {t.dealValueLabel}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#1E1E1E] dark:text-white">
                    {formatCurrency(avgValue)}
                  </span>
                </div>

                <input
                  type="range"
                  min={currentConfig.minValue}
                  max={currentConfig.maxValue}
                  step={selectedIndustry === 'ecommerce' ? 5 : 50}
                  value={avgValue}
                  onChange={(e) => setAvgValue(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#F8F4EE] dark:bg-[#282828] rounded-full appearance-none cursor-pointer accent-[#A78BFA]"
                />

                <div className="flex items-center justify-between text-[11px] font-semibold text-[#1E1E1E]/40 dark:text-white/40">
                  <span>{formatCurrency(currentConfig.minValue)}</span>
                  <span>{formatCurrency(Math.round((currentConfig.minValue + currentConfig.maxValue) / 2))}</span>
                  <span>{formatCurrency(currentConfig.maxValue)}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Projected Results Showcase (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#1E1E1E] to-[#282828] dark:from-[#111] dark:to-[#181818] rounded-3xl p-6 sm:p-7 text-white shadow-2xl relative flex flex-col justify-between border border-white/10">
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#A78BFA]" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#A78BFA]">
                    {t.forecastTitle}
                  </span>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-bold text-[#7ED6B7] flex items-center gap-1">
                  <ShieldCheck size={12} />
                  <span>{roasMultiplier}x ROAS Target</span>
                </div>
              </div>

              {/* Main Projected Revenue Card */}
              <div className="mb-6">
                <span className="text-xs font-semibold text-white/60 block mb-1">
                  {t.estRevenue}
                </span>
                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#A78BFA] tracking-tight">
                  {formatCurrency(projectedRevenue)}
                  <span className="text-base font-medium text-white/50 tracking-normal"> /mo</span>
                </div>
              </div>

              {/* Key Metrics Breakdown */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-white/50 block mb-1">
                    {t.estLeads}
                  </span>
                  <div className="text-xl font-black text-[#7ED6B7] flex items-center gap-1">
                    <TrendingUp size={16} />
                    <span>~{estimatedDeals.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-white/50 block mb-1">
                    {t.estRoas}
                  </span>
                  <div className="text-xl font-black text-[#FF8A3D]">
                    {roasMultiplier}x
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-[10px] text-white/40 leading-relaxed mb-6">
                {t.disclaimer}
              </p>

              {/* Call to Actions */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleClaimBlueprint}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#A78BFA] hover:bg-[#906fe7] text-[#1E1E1E] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#A78BFA]/25 transition-all hover:scale-[1.02]"
                >
                  <span>{t.ctaBtn}</span>
                  <ArrowIcon size={16} />
                </button>

                <a
                  href={getWhatsAppBlueprintUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle size={14} className="text-[#25D366]" />
                  <span>{t.whatsappBtn}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default RoiCalculator;
