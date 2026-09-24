import React from 'react';
import { pricingService, type PricingConfig } from '../../services/pricingService';
import { Save } from 'lucide-react';

interface Props {
  pricingConfig: PricingConfig;
  setPricingConfig: (config: PricingConfig) => void;
  isAr: boolean;
}

const PricingAdminView: React.FC<Props> = ({ pricingConfig, setPricingConfig, isAr }) => {
  const handleChange = (plan: keyof PricingConfig, cycle: 'monthly' | 'quarterly', value: string) => {
    const numValue = value.toLowerCase() === 'custom' || value === '' ? 'Custom' : Number(value);
    setPricingConfig({
      ...pricingConfig,
      [plan]: {
        ...pricingConfig[plan],
        [cycle]: numValue,
      },
    });
  };

  const handleSave = () => {
    pricingService.updatePricing(pricingConfig);
    alert(isAr ? 'تم حفظ الأسعار بنجاح!' : 'Pricing saved successfully!');
  };

  const plans = [
    { id: 'starter', label: isAr ? 'الباقة الأساسية (Starter)' : 'Starter Plan' },
    { id: 'scale', label: isAr ? 'باقة النمو (Scale)' : 'Scale Plan' },
    { id: 'enterprise', label: isAr ? 'الشركات الكبرى (Enterprise)' : 'Enterprise Plan' },
  ] as const;

  return (
    <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-2xl border border-[#1E1E1E]/8 dark:border-white/10 shadow-xs max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-black">{isAr ? 'إدارة الأسعار الأساسية (USD)' : 'Manage Base Pricing (USD)'}</h2>
          <p className="text-xs text-[#1E1E1E]/50 dark:text-white/50 mt-1">
            {isAr
              ? 'تغيير الأسعار هنا سينعكس فوراً على الموقع. أدخل السعر بالدولار وسيتم تحويله تلقائياً لعملة العميل.'
              : 'Changing prices here will instantly update the website. Enter base USD price; it will be converted based on client currency.'}
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-[#A78BFA] hover:bg-[#906fe7] text-[#1E1E1E] text-xs font-bold rounded-xl shadow-md transition-all"
        >
          <Save size={16} />
          {isAr ? 'حفظ التغييرات' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-8">
        {plans.map((plan) => (
          <div key={plan.id} className="p-5 rounded-2xl bg-[#F8F4EE] dark:bg-[#121212] border border-[#1E1E1E]/5 dark:border-white/5">
            <h3 className="text-sm font-bold mb-4">{plan.label}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#1E1E1E]/50 dark:text-white/50 mb-1">
                  {isAr ? 'الدفع الشهري (USD)' : 'Monthly Price (USD)'}
                </label>
                <input
                  type="text"
                  value={pricingConfig[plan.id].monthly}
                  onChange={(e) => handleChange(plan.id, 'monthly', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1A1A1A] border border-[#1E1E1E]/10 dark:border-white/10 text-sm focus:outline-none focus:border-[#A78BFA]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#1E1E1E]/50 dark:text-white/50 mb-1">
                  {isAr ? 'الدفع الربع سنوي (USD)' : 'Quarterly Price (USD)'}
                </label>
                <input
                  type="text"
                  value={pricingConfig[plan.id].quarterly}
                  onChange={(e) => handleChange(plan.id, 'quarterly', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1A1A1A] border border-[#1E1E1E]/10 dark:border-white/10 text-sm focus:outline-none focus:border-[#A78BFA]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingAdminView;
