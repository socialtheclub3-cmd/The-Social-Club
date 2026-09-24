import React, { useState } from 'react';
import { Mail, MessageCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const TiktokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Footer: React.FC = () => {
  const { lang } = useApp();
  const t = translations[lang].footer;
  const tn = translations[lang].nav;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('socialtheclub.3@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
    window.location.href = 'mailto:socialtheclub.3@gmail.com';
  };
  const ts = translations[lang].services;

  const footerNav = [
    { label: tn.home, href: '#home' },
    { label: tn.services, href: '#services' },
    { label: tn.work, href: '#work' },
    { label: tn.process, href: '#process' },
    { label: tn.about, href: '#about' },
    { label: lang === 'ar' ? 'تواصل معنا' : 'Contact', href: '#contact' },
  ];

  const footerServices = [
    ts.s1Title,
    ts.s2Title,
    ts.s3Title,
  ];

  const handleScroll = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="brand-gradient-bg text-white border-t border-white/10" role="contentinfo">
      {/* Main Footer */}
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            <Logo variant="light" />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {t.desc}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/the_socialclub.3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#A78BFA] flex items-center justify-center transition-colors duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.tiktok.com/@thesocialclub.3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#A78BFA] flex items-center justify-center transition-colors duration-200"
                aria-label="TikTok"
              >
                <TiktokIcon />
              </a>
              <a
                href="https://www.facebook.com/share/1FC5LeU7fu/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#A78BFA] flex items-center justify-center transition-colors duration-200"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.18em] text-white/40 mb-5">
              {t.navTitle}
            </h3>
            <ul className="flex flex-col gap-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={handleScroll(item.href)}
                    className="text-sm text-white/70 hover:text-[#A78BFA] transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.18em] text-white/40 mb-5">
              {t.servicesTitle}
            </h3>
            <ul className="flex flex-col gap-3">
              {footerServices.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={handleScroll('#services')}
                    className="text-sm text-white/70 hover:text-[#A78BFA] transition-colors duration-200"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.18em] text-white/40 mb-5">
              {t.contactTitle}
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="mailto:socialtheclub.3@gmail.com"
                  onClick={handleEmailClick}
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-[#A78BFA] transition-colors duration-200 group cursor-pointer"
                >
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#A78BFA] transition-colors duration-200">
                    <Mail size={14} />
                  </span>
                  <span>
                    socialtheclub.3@gmail.com
                    {copiedEmail && (
                      <span className="ml-2 rtl:ml-0 rtl:mr-2 text-[10px] text-white font-bold bg-[#A78BFA] px-2 py-0.5 rounded-full">
                        {lang === 'ar' ? 'تم النسخ!' : 'Copied!'}
                      </span>
                    )}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/201043971900"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-[#A78BFA] transition-colors duration-200 group"
                >
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#A78BFA] transition-colors duration-200">
                    <MessageCircle size={14} />
                  </span>
                  {t.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs text-white/40">
              {t.copyright}
            </p>
            <div className="flex items-center gap-3 px-3 border-l border-white/10 rtl:border-r rtl:border-l-0">
              <Link to="/privacy" className="text-xs text-white/40 hover:text-white transition-colors">
                {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </Link>
              <span className="text-white/20">•</span>
              <Link to="/terms" className="text-xs text-white/40 hover:text-white transition-colors">
                {lang === 'ar' ? 'شروط الاستخدام' : 'Terms of Service'}
              </Link>
            </div>
            <a
              href="/admin"
              className="text-white/20 hover:text-[#A78BFA] transition-colors p-1 ml-auto"
              title="Portal"
              aria-label="Admin Portal"
            >
              <Lock size={12} />
            </a>
          </div>
          <p className="text-xs text-white/40">
            {t.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
