import React, { useState } from 'react';
import { CheckCircle, Mail, MessageCircle, ArrowRight, ArrowLeft, Briefcase, Code, Megaphone, TrendingUp, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { leadsService } from '../../services/leadsService';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  services: string[];
  budget: string;
  projectDetails: string;
  preferredDate: string;
  preferredTime: string;
}

const initialForm: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  services: [],
  budget: '',
  projectDetails: '',
  preferredDate: '',
  preferredTime: '',
};

const Contact: React.FC = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  const { lang, formatCurrency } = useApp();
  const isAr = lang === 'ar';
  const t = translations[lang].contact;

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('socialtheclub.3@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
    window.location.href = 'mailto:socialtheclub.3@gmail.com';
  };

  const serviceOptions = [
    { id: 'digital-marketing', icon: Megaphone, label: isAr ? 'التسويق الرقمي والسوشيال ميديا' : 'Digital Marketing & Social Media' },
    { id: 'web-development', icon: Code, label: isAr ? 'تصميم وتطوير المواقع' : 'Web Design & Development' },
    { id: 'lead-generation', icon: TrendingUp, label: isAr ? 'توليد العملاء (Lead Generation)' : 'Lead Generation & SEO' },
    { id: 'branding', icon: Briefcase, label: isAr ? 'بناء الهوية والعلامة التجارية' : 'Branding & Identity' },
  ];

  const budgetOptions = [
    { id: 'starter', icon: DollarSign, label: isAr ? `أقل من ${formatCurrency(1000)}` : `Under ${formatCurrency(1000)}` },
    { id: 'growth', icon: DollarSign, label: `${formatCurrency(1000)} - ${formatCurrency(2500)}` },
    { id: 'scale', icon: DollarSign, label: `${formatCurrency(2500)} - ${formatCurrency(5000)}+` },
  ];

  const validateStep = (currentStep: number): boolean => {
    const errs: Partial<FormData> & { service?: string } = {};
    if (currentStep === 1) {
      if (form.services.length === 0) errs.service = isAr ? 'يرجى اختيار خدمة واحدة على الأقل' : 'Please select at least one service';
    } else if (currentStep === 2) {
      if (!form.budget) errs.budget = isAr ? 'يرجى تحديد الميزانية' : 'Please select a budget';
    } else if (currentStep === 3) {
      if (!form.projectDetails.trim()) errs.projectDetails = isAr ? 'يرجى كتابة تفاصيل مشروعك' : 'Please tell us about your project';
    } else if (currentStep === 4) {
      if (!form.name.trim()) errs.name = isAr ? 'يرجى إدخال الاسم' : 'Name is required';
      if (!form.email.trim()) errs.email = isAr ? 'يرجى إدخال البريد الإلكتروني' : 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = isAr ? 'صيغة البريد غير صحيحة' : 'Enter a valid email';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(s => s + 1);
    }
  };

  const handlePrev = () => {
    setStep(s => s - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleServiceToggle = (id: string) => {
    setForm(prev => {
      const current = prev.services;
      const updated = current.includes(id) ? current.filter(s => s !== id) : [...current, id];
      return { ...prev, services: updated };
    });
    setErrors(prev => ({ ...prev, service: undefined }));
  };

  const handleOptionSelect = (field: 'budget', value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    setLoading(true);

    try {
      const selectedServicesText = form.services
        .map(id => serviceOptions.find(o => o.id === id)?.label)
        .filter(Boolean)
        .join(' + ');

      leadsService.saveLead({
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        service: selectedServicesText,
        budget: budgetOptions.find(o => o.id === form.budget)?.label || form.budget,
        projectDetails: form.projectDetails,
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
      });

      await emailjs.send(
        'service_ecxzgc5',
        'template_t1a7wpo',
        {
          from_name: form.name,
          from_email: form.email,
          service: selectedServicesText,
          budget: budgetOptions.find(o => o.id === form.budget)?.label || form.budget,
          message: `${form.projectDetails}\n\nPreferred Call Date: ${form.preferredDate}\nPreferred Call Time: ${form.preferredTime}`,
          company: form.company,
          phone: form.phone,
        },
        'qYdDNevz3Bcanc4g8'
      );

      setSubmitted(true);
      setForm(initialForm);
      setStep(1);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(isAr ? 'حدث خطأ، يرجى المحاولة لاحقاً' : 'An error occurred, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const inputBase = 'w-full px-4 py-3.5 rounded-xl bg-[#F8F4EE] dark:bg-[#121212] border text-sm text-[#1E1E1E] dark:text-white placeholder:text-[#1E1E1E]/40 dark:text-white/40 focus:outline-none focus:border-[#A78BFA] focus:ring-2 focus:ring-[#A78BFA]/20 transition-all duration-200';
  const inputNormal = 'border-transparent dark:border-white/5';
  const inputError = 'border-[#FF8FB1] ring-2 ring-[#FF8FB1]/15';
  const fieldClass = (field: keyof FormData) => `${inputBase} ${errors[field] ? inputError : inputNormal}`;

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, x: isAr ? -30 : 30 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isAr ? 30 : -30 },
  };

  return (
    <section
      id="contact"
      className="section-padding bg-[#FBF6EF] dark:bg-[#121212] overflow-hidden transition-colors duration-300"
      aria-label="Contact and project inquiry"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          
          {/* Left: Info column */}
          <AnimatedSection direction="left" className="lg:col-span-2 flex flex-col gap-8">
            <SectionHeading eyebrow={t.badge} title={t.title} align="left" />
            <p className="text-[#1E1E1E]/70 dark:text-white/70 text-sm leading-relaxed max-w-sm">
              {t.desc}
            </p>

            <div className="flex flex-col gap-5 mt-4">
              <a href="mailto:socialtheclub.3@gmail.com" onClick={handleEmailClick} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-[#A78BFA]/15 flex items-center justify-center group-hover:bg-[#A78BFA] transition-colors duration-300">
                  <Mail size={18} className="text-[#A78BFA] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#1E1E1E]/50 dark:text-white/50 font-bold mb-1 flex items-center gap-2">
                    {isAr ? 'البريد الإلكتروني' : 'Email'}
                    {copiedEmail && <span className="text-[10px] text-[#A78BFA] font-black bg-[#A78BFA]/10 px-2 py-0.5 rounded-full">{isAr ? 'تم النسخ!' : 'Copied!'}</span>}
                  </p>
                  <p className="text-base font-black text-[#1E1E1E] dark:text-white group-hover:text-[#A78BFA] transition-colors">socialtheclub.3@gmail.com</p>
                </div>
              </a>

              <a href="https://wa.me/201043971900" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-[#7ED6B7]/15 flex items-center justify-center group-hover:bg-[#7ED6B7] transition-colors duration-300">
                  <MessageCircle size={18} className="text-[#7ED6B7] group-hover:text-[#1E1E1E] transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#1E1E1E]/50 dark:text-white/50 font-bold mb-1">
                    {isAr ? 'واتساب مباشر' : 'Direct WhatsApp'}
                  </p>
                  <p className="text-base font-black text-[#1E1E1E] dark:text-white group-hover:text-[#7ED6B7] transition-colors">
                    +20 10 4397 1900
                  </p>
                </div>
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1E1E1E] to-[#282828] border border-white/10 hidden lg:block mt-auto shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#A78BFA]/20 blur-[50px] rounded-full pointer-events-none" />
              <p className="text-[10px] font-black uppercase tracking-widest text-[#A78BFA] mb-3 flex items-center gap-2">
                <CheckCircle size={14} />
                {isAr ? 'ضمان الاستجابة السريعة' : 'Rapid Response SLA'}
              </p>
              <p className="text-xs text-white/80 leading-relaxed font-medium">
                {t.responseGuarantee}
              </p>
            </div>
          </AnimatedSection>

          {/* Right: Multi-Step Form */}
          <AnimatedSection delay={100} className="lg:col-span-3">
            <div className="bg-white dark:bg-[#1C1C1C] rounded-3xl p-5 sm:p-10 border border-[#1E1E1E]/8 dark:border-white/10 shadow-xl relative min-h-[400px] flex flex-col">
              
              {submitted ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 rounded-full bg-[#7ED6B7]/20 flex items-center justify-center text-[#7ED6B7] mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-[#1E1E1E] dark:text-white mb-3">
                    {isAr ? 'استلمنا طلبك يا بطل! 🚀' : 'Request Received! 🚀'}
                  </h3>
                  <p className="text-base text-[#1E1E1E]/60 dark:text-white/60 max-w-sm leading-relaxed mb-8">
                    {isAr ? 'فريقنا بيدرس تفاصيل مشروعك دلوقتي وهنكلمك في أقرب وقت عشان نبدأ شغل.' : 'Our team is reviewing your project details. We will be in touch shortly.'}
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="ghost" size="md">
                    {isAr ? 'إرسال طلب تاني' : 'Submit Another'}
                  </Button>
                </div>
              ) : (
                <>
                  {/* Progress Bar */}
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#A78BFA]">
                        {isAr ? 'طلب استشارة' : 'Project Inquiry'}
                      </span>
                      <span className="text-[10px] font-bold text-[#1E1E1E]/50 dark:text-white/50">
                        {step} / 4
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#F8F4EE] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#A78BFA]"
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / 4) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="flex-1 flex flex-col relative">
                    <AnimatePresence mode="wait">
                      
                      {/* STEP 1: SERVICE */}
                      {step === 1 && (
                        <motion.div key="step1" variants={formVariants} initial="hidden" animate="enter" exit="exit" transition={{ duration: 0.3 }} className="flex flex-col justify-center w-full py-2">
                          <h3 className="text-2xl font-black text-[#1E1E1E] dark:text-white mb-6">
                            {isAr ? 'إيه الخدمة اللي بتدور عليها؟ 👀' : 'What service are you looking for? 👀'}
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            {serviceOptions.map((opt) => (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => handleServiceToggle(opt.id)}
                                className={`p-4 rounded-2xl border-2 text-start transition-all duration-200 flex items-center justify-between gap-4 ${
                                  form.services.includes(opt.id)
                                    ? 'border-[#A78BFA] bg-[#A78BFA]/10 shadow-md scale-[1.02]'
                                    : 'border-[#1E1E1E]/5 dark:border-white/5 bg-[#F8F4EE]/50 dark:bg-[#121212]/50 hover:border-[#A78BFA]/40 hover:bg-[#A78BFA]/5'
                                }`}
                              >
                                <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${form.services.includes(opt.id) ? 'bg-[#A78BFA] text-white' : 'bg-white dark:bg-[#1C1C1C] text-[#1E1E1E] dark:text-white'}`}>
                                    <opt.icon size={18} />
                                  </div>
                                  <span className="font-bold text-sm text-[#1E1E1E] dark:text-white leading-tight">{opt.label}</span>
                                </div>
                                <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 ${form.services.includes(opt.id) ? 'border-[#A78BFA] bg-[#A78BFA]' : 'border-[#1E1E1E]/20 dark:border-white/20'}`}>
                                  {form.services.includes(opt.id) && <CheckCircle size={12} className="text-white" />}
                                </div>
                              </button>
                            ))}
                          </div>
                          {/* @ts-ignore */}
                          {errors.service && <p className="text-xs font-bold text-[#FF8FB1] mt-2 animate-pulse">{errors.service}</p>}
                        </motion.div>
                      )}

                      {/* STEP 2: BUDGET */}
                      {step === 2 && (
                        <motion.div key="step2" variants={formVariants} initial="hidden" animate="enter" exit="exit" transition={{ duration: 0.3 }} className="flex flex-col justify-center w-full py-2">
                          <h3 className="text-2xl font-black text-[#1E1E1E] dark:text-white mb-6">
                            {isAr ? 'إيه ميزانيتك التسويقية التقريبية شهرياً؟ 💰' : 'What is your estimated monthly budget? 💰'}
                          </h3>
                          <div className="flex flex-col gap-3 mb-4">
                            {budgetOptions.map((opt) => (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => handleOptionSelect('budget', opt.id)}
                                className={`p-4 rounded-2xl border-2 text-start transition-all duration-200 flex items-center justify-between ${
                                  form.budget === opt.id
                                    ? 'border-[#FF8A3D] bg-[#FF8A3D]/10 shadow-md scale-[1.02]'
                                    : 'border-[#1E1E1E]/5 dark:border-white/5 bg-[#F8F4EE]/50 dark:bg-[#121212]/50 hover:border-[#FF8A3D]/40 hover:bg-[#FF8A3D]/5'
                                }`}
                              >
                                <span className="font-black text-lg text-[#1E1E1E] dark:text-white">{opt.label}</span>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${form.budget === opt.id ? 'border-[#FF8A3D] bg-[#FF8A3D]' : 'border-[#1E1E1E]/20 dark:border-white/20'}`}>
                                  {form.budget === opt.id && <CheckCircle size={14} className="text-white" />}
                                </div>
                              </button>
                            ))}
                          </div>
                          {errors.budget && <p className="text-xs font-bold text-[#FF8FB1] mt-2 animate-pulse">{errors.budget}</p>}
                        </motion.div>
                      )}

                      {/* STEP 3: DETAILS */}
                      {step === 3 && (
                        <motion.div key="step3" variants={formVariants} initial="hidden" animate="enter" exit="exit" transition={{ duration: 0.3 }} className="flex flex-col justify-center w-full py-2">
                          <h3 className="text-2xl font-black text-[#1E1E1E] dark:text-white mb-6">
                            {isAr ? 'احكيلنا شوية عن مشروعك 📝' : 'Tell us a bit about your project 📝'}
                          </h3>
                          <div className="mb-5">
                            <label className="block text-[11px] font-black uppercase tracking-wider text-[#1E1E1E]/50 dark:text-white/50 mb-2">
                              {isAr ? 'تفاصيل المشروع وأهدافك' : 'Project Details & Goals'} <span className="text-[#FF8FB1]">*</span>
                            </label>
                            <textarea
                              name="projectDetails"
                              rows={5}
                              value={form.projectDetails}
                              onChange={handleChange}
                              placeholder={isAr ? 'إحنا شركة X وعايزين نوصل لـ Y عن طريق...' : 'We are company X looking to achieve Y by...'}
                              className={fieldClass('projectDetails')}
                            />
                            {errors.projectDetails && <p className="text-xs font-bold text-[#FF8FB1] mt-2">{errors.projectDetails}</p>}
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                            <div className="min-w-0 w-full">
                              <label className="block text-[10px] font-black uppercase tracking-wider text-[#1E1E1E]/50 dark:text-white/50 mb-2">
                                {isAr ? 'اليوم المفضل للمكالمة' : 'Preferred Date'} <span className="text-[9px] font-normal opacity-70">(Optional)</span>
                              </label>
                              <input type="date" name="preferredDate" value={form.preferredDate} onChange={handleChange} className={`${inputBase} ${inputNormal} appearance-none min-w-0 block w-full`} />
                            </div>
                            <div className="min-w-0 w-full">
                              <label className="block text-[10px] font-black uppercase tracking-wider text-[#1E1E1E]/50 dark:text-white/50 mb-2">
                                {isAr ? 'الوقت المفضل' : 'Preferred Time'} <span className="text-[9px] font-normal opacity-70">(Optional)</span>
                              </label>
                              <input type="time" name="preferredTime" value={form.preferredTime} onChange={handleChange} className={`${inputBase} ${inputNormal} appearance-none min-w-0 block w-full`} />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 4: CONTACT INFO */}
                      {step === 4 && (
                        <motion.div key="step4" variants={formVariants} initial="hidden" animate="enter" exit="exit" transition={{ duration: 0.3 }} className="flex flex-col justify-center w-full py-2">
                          <h3 className="text-2xl font-black text-[#1E1E1E] dark:text-white mb-6">
                            {isAr ? 'ممتاز! هنبعتلك الخطة فين؟ 📬' : 'Awesome! Where should we send it? 📬'}
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-[11px] font-black uppercase tracking-wider text-[#1E1E1E]/50 dark:text-white/50 mb-2">
                                {isAr ? 'اسمك الكريم' : 'Your Name'} <span className="text-[#FF8FB1]">*</span>
                              </label>
                              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={fieldClass('name')} />
                              {errors.name && <p className="text-xs font-bold text-[#FF8FB1] mt-1">{errors.name}</p>}
                            </div>
                            <div>
                              <label className="block text-[11px] font-black uppercase tracking-wider text-[#1E1E1E]/50 dark:text-white/50 mb-2">
                                {isAr ? 'اسم الشركة' : 'Company Name'}
                              </label>
                              <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Acme Corp" className={inputBase + " " + inputNormal} />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-black uppercase tracking-wider text-[#1E1E1E]/50 dark:text-white/50 mb-2">
                                {isAr ? 'البريد الإلكتروني' : 'Email Address'} <span className="text-[#FF8FB1]">*</span>
                              </label>
                              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={fieldClass('email')} />
                              {errors.email && <p className="text-xs font-bold text-[#FF8FB1] mt-1">{errors.email}</p>}
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-black uppercase tracking-wider text-[#1E1E1E]/50 dark:text-white/50 mb-2">
                                {isAr ? 'رقم الموبايل / واتساب' : 'Phone / WhatsApp'}
                              </label>
                              <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+20 1..." className={inputBase + " " + inputNormal} />
                            </div>
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </form>

                  {/* Navigation Buttons */}
                  <div className="mt-8 pt-6 border-t border-[#1E1E1E]/5 dark:border-white/5 flex items-center justify-between sticky bottom-0 bg-white dark:bg-[#1C1C1C] z-10">
                    {step > 1 ? (
                      <button type="button" onClick={handlePrev} className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#1E1E1E]/60 dark:text-white/60 hover:text-[#1E1E1E] dark:hover:text-white hover:bg-[#F8F4EE] dark:hover:bg-[#2A2A2A] transition-all flex items-center gap-2">
                        <ArrowLeft size={16} className={isAr ? 'rotate-180' : ''} />
                        {isAr ? 'السابق' : 'Back'}
                      </button>
                    ) : (
                      <div /> // Spacer
                    )}
                    
                    {step < 4 ? (
                      <Button type="button" onClick={handleNext} variant="primary" size="lg" className="flex items-center gap-2">
                        {isAr ? 'التالي' : 'Next Step'}
                        <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
                      </Button>
                    ) : (
                      <Button type="submit" onClick={handleSubmit} variant="primary" size="lg" disabled={loading} className="flex items-center gap-2 bg-gradient-to-r from-[#A78BFA] to-[#FF8FB1] hover:scale-105 transition-transform shadow-lg shadow-[#A78BFA]/30 border-none">
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            {isAr ? 'جاري الإرسال...' : 'Sending...'}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            {isAr ? 'إرسال طلب العمل 🚀' : 'Submit Project 🚀'}
                          </span>
                        )}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
