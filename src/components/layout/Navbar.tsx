import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

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
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="appearance-none bg-[#1E1E1E]/5 dark:bg-white/10 hover:bg-[#1E1E1E]/10 dark:hover:bg-white/20 text-[#1E1E1E] dark:text-white rounded-full px-3 py-1.5 text-xs font-bold cursor-pointer outline-none focus:ring-2 focus:ring-[#A78BFA] transition-all"
            >
              <option value="USD">USD</option>
              <option value="SAR">SAR</option>
              <option value="AED">AED</option>
              <option value="EGP">EGP</option>
            </select>

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
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="appearance-none bg-[#1E1E1E]/50 dark:bg-white/10 text-[#1E1E1E] dark:text-white rounded-full px-2 py-1 text-[10px] font-bold cursor-pointer outline-none"
            >
              <option value="USD">USD</option>
              <option value="SAR">SAR</option>
              <option value="AED">AED</option>
              <option value="EGP">EGP</option>
            </select>

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
