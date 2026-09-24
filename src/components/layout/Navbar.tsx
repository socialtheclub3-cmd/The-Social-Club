import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const currencies = [
  { value: 'USD', label: 'USD ($)', flag: 'us' },
  { value: 'SAR', label: 'SAR (ر.س)', flag: 'sa' },
  { value: 'AED', label: 'AED (د.إ)', flag: 'ae' },
  { value: 'EGP', label: 'EGP (ج.م)', flag: 'eg' },
];

const CurrencyDropdown: React.FC<{ currency: string; setCurrency: any; isMobile?: boolean }> = ({ currency, setCurrency, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = currencies.find(c => c.value === currency) || currencies[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 bg-[#1E1E1E]/5 dark:bg-white/10 hover:bg-[#1E1E1E]/10 dark:hover:bg-white/20 text-[#1E1E1E] dark:text-white rounded-full font-bold transition-all ${isMobile ? 'px-2 py-1 text-[10px]' : 'px-3 py-1.5 text-xs'}`}
        aria-label="Select currency"
      >
        <img src={`https://flagcdn.com/w20/${selected.flag}.png`} alt={selected.value} className="w-3.5 h-2.5 sm:w-4 sm:h-3 object-cover rounded-sm shadow-sm" />
        <span>{selected.value}</span>
        <ChevronDown size={isMobile ? 12 : 14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white dark:bg-[#1E1E1E] rounded-xl shadow-xl border border-[#1E1E1E]/10 dark:border-white/10 py-2 w-32 sm:w-36 z-[9000] overflow-hidden">
          {currencies.map(opt => (
            <button
              key={opt.value}
              onClick={() => { setCurrency(opt.value); setIsOpen(false); }}
              className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-xs font-bold text-left transition-colors ${currency === opt.value ? 'bg-[#A78BFA]/10 text-[#A78BFA]' : 'text-[#1E1E1E] dark:text-white hover:bg-[#1E1E1E]/5 dark:hover:bg-white/5'}`}
            >
              <img src={`https://flagcdn.com/w20/${opt.flag}.png`} alt={opt.value} className="w-4 h-3 object-cover rounded-sm shadow-sm" />
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const { lang, toggleLang, theme, toggleTheme, currency, setCurrency } = useApp();
  const t = translations[lang].nav;

  const navLinks = [
    { label: t.home, href: '#home' },
    { label: t.services, href: '#services' },
    { label: lang === 'ar' ? 'حاسبة النمو' : 'Growth Calc', href: '#calculator' },
    { label: t.work, href: '#work' },
    { label: lang === 'ar' ? 'الباقات' : 'Pricing', href: '#pricing' },
    { label: t.about, href: '#about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#FBF6EF]/95 dark:bg-[#121212]/90 backdrop-blur-md shadow-sm border-b border-[#1E1E1E]/5 dark:border-white/10 py-3'
            : 'bg-transparent py-5'
        }`}
        role="banner"
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex-shrink-0 focus-visible:outline-none"
            aria-label="The Social Club — Home"
          >
            <Logo className="h-11 sm:h-12" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`text-sm font-semibold transition-colors duration-200 link-underline ${
                  activeLink === link.href
                    ? 'text-[#A78BFA]'
                    : 'text-[#1E1E1E]/80 dark:text-white/80 hover:text-[#1E1E1E] dark:text-white dark:hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Theme Toggle, Lang Switcher & CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#1E1E1E]/50 dark:bg-white/10 hover:bg-[#1E1E1E]/10 dark:hover:bg-white/20 text-[#1E1E1E] dark:text-white transition-all cursor-pointer"
              title={lang === 'en' ? 'التحويل للعربية' : 'Switch to English'}
              aria-label="Toggle language"
            >
              <Globe size={14} className="text-[#A78BFA]" />
              <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
            </button>

            {/* Currency Switcher */}
            <CurrencyDropdown currency={currency} setCurrency={setCurrency} />

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1E1E1E]/50 dark:bg-white/10 hover:bg-[#1E1E1E]/10 dark:hover:bg-white/20 text-[#1E1E1E] dark:text-white transition-all cursor-pointer"
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon size={16} className="text-[#1E1E1E] dark:text-white" />
              ) : (
                <Sun size={16} className="text-[#FFD166]" />
              )}
            </button>

            {/* CTA Button */}
            <Button
              href="#contact"
              variant="primary"
              size="sm"
              id="nav-cta"
              onClick={() => handleNavClick('#contact')}
            >
              {t.cta}
            </Button>
          </div>

          {/* Mobile Actions: Lang, Theme, Currency & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <CurrencyDropdown currency={currency} setCurrency={setCurrency} isMobile />

            <button
              onClick={toggleLang}
              className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#1E1E1E]/50 dark:bg-white/10 text-[#1E1E1E] dark:text-white"
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>

            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1E1E1E]/50 dark:bg-white/10 text-[#1E1E1E] dark:text-white"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} className="text-[#FFD166]" />}
            </button>

            <button
              className="flex items-center justify-center w-10 h-10 rounded-lg text-[#1E1E1E] dark:text-white hover:bg-[#1E1E1E]/50 dark:hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              id="hamburger-btn"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} h-full w-4/5 max-w-sm bg-[#FBF6EF] dark:bg-[#1A1A1A] flex flex-col transition-transform duration-300 ease-in-out ${
            menuOpen ? 'translate-x-0' : lang === 'ar' ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#1E1E1E]/10 dark:border-white/10">
            <Logo />
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-[#1E1E1E] dark:text-white hover:bg-[#1E1E1E]/50"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col px-6 py-8 gap-2 flex-1" aria-label="Mobile navigation links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-lg font-bold text-[#1E1E1E] dark:text-white py-3 border-b border-[#1E1E1E]/8 dark:border-white/10 hover:text-[#A78BFA] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="px-6 py-8 border-t border-[#1E1E1E]/10 dark:border-white/10">
            <Button
              href="#contact"
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => handleNavClick('#contact')}
            >
              {t.cta}
            </Button>
            <p className="text-xs text-center text-[#1E1E1E]/40 dark:text-white/40 mt-3">
              {translations[lang].footer.tagline}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
