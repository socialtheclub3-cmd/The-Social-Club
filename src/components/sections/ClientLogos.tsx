import React from 'react';
import { useApp } from '../../context/AppContext';

const ClientLogos: React.FC = () => {
  const { lang } = useApp();
  
  // We'll use tech platforms and generic partners to build trust
  const partners = [
    'Meta Business Partner', 'Google Ads Certified', 'TikTok For Business', 'Snapchat Ads',
    'LinkedIn Marketing', 'Shopify Partners', 'WordPress Experts', 'WooCommerce'
  ];

  return (
    <section className="py-10 bg-white dark:bg-[#1C1C1C] border-y border-[#1E1E1E]/5 dark:border-white/5 overflow-hidden">
      <div className="container-custom mx-auto mb-6">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-[#1E1E1E]/40 dark:text-white/40">
          {lang === 'ar' ? 'شركاء النجاح والتقنيات المعتمدة' : 'Trusted by & Certified Partners'}
        </p>
      </div>
      
      <div className="relative w-full overflow-hidden flex">
        {/* Gradient fades for edges */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-white dark:from-[#1C1C1C] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-white dark:from-[#1C1C1C] to-transparent z-10 pointer-events-none"></div>
        
        {/* Animated Track */}
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {/* Double the array for seamless looping */}
          {[...partners, ...partners].map((partner, idx) => (
            <div key={idx} className="mx-8 md:mx-16 flex items-center justify-center">
              <span className="text-xl md:text-2xl font-black text-[#1E1E1E]/20 dark:text-white/20 uppercase tracking-tighter">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
