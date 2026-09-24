import React, { useState } from 'react';
import { CheckCircle, Mail, MessageCircle } from 'lucide-react';
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
  service: string;
  budget: string;
  projectDetails: string;
}

const initialForm: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  budget: '',
  projectDetails: '',
};

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { lang, formatCurrency } = useApp();
  const t = translations[lang].contact;

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('socialtheclub.3@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
    window.location.href = 'mailto:socialtheclub.3@gmail.com';
  };

  const serviceOptions = [
    { value: '', label: t.servicePlaceholder },
    { value: 'digital-marketing', label: t.serviceOpt1 },
    { value: 'web-development', label: t.serviceOpt2 },
    { value: 'lead-generation', label: t.serviceOpt3 },
    { value: 'full-growth', label: t.serviceOpt4 },
  ];

  const budgetOptions = [
    { value: '', label: t.budgetPlaceholder },
    { value: 'starter', label: lang === 'ar' ? `أقل من ${formatCurrency(1000)}` : `Under ${formatCurrency(1000)}` },
    { value: 'growth', label: `${formatCurrency(1000)} - ${formatCurrency(2500)}` },
    { value: 'scale', label: `${formatCurrency(2500)} - ${formatCurrency(5000)}+` },
  ];

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = lang === 'ar' ? 'يرجى إدخال الاسم' : 'Name is required';
    if (!form.email.trim()) errs.email = lang === 'ar' ? 'يرجى إدخال البريد الإلكتروني' : 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = lang === 'ar' ? 'صيغة البريد غير صحيحة' : 'Enter a valid email';
    if (!form.service) errs.service = lang === 'ar' ? 'يرجى اختيار الخدمة' : 'Please select a service';
    if (!form.projectDetails.trim())
      errs.projectDetails = lang === 'ar' ? 'يرجى كتابة تفاصيل مشروعك' : 'Please tell us about your project';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      // Save locally to Leads Database for Owner Dashboard
      leadsService.saveLead({
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        service: form.service,
        budget: form.budget,
        projectDetails: form.projectDetails,
      });

      // Send email via EmailJS
      await emailjs.send(
        'service_ecxzgc5',
        'template_t1a7wpo',
        {
          from_name: form.name,
          from_email: form.email,
          service: serviceOptions.find(opt => opt.value === form.service)?.label || form.service,
          budget: budgetOptions.find(opt => opt.value === form.budget)?.label || form.budget,
          message: form.projectDetails,
          company: form.company,
          phone: form.phone,
        },
        'qYdDNevz3Bcanc4g8'
      );

      setSubmitted(true);
      setForm(initialForm);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(lang === 'ar' ? 'حدث خطأ، يرجى المحاولة لاحقاً' : 'An error occurred, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    'w-full px-4 py-3 rounded-xl bg-white dark:bg-[#202020] border text-sm text-[#1E1E1E] dark:text-white placeholder:text-[#1E1E1E]/40 dark:text-white/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#A78BFA] focus:ring-2 focus:ring-[#A78BFA]/20 transition-all duration-200';
  const inputNormal = 'border-[#1E1E1E]/10 dark:border-white/15 dark:border-white/10';
  const inputError = 'border-[#FF8FB1] ring-2 ring-[#FF8FB1]/15';

  const fieldClass = (field: keyof FormData) =>
    `${inputBase} ${errors[field] ? inputError : inputNormal}`;

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
            <SectionHeading
              eyebrow={t.badge}
              title={t.title}
              align="left"
            />
            <p className="text-[#1E1E1E]/70 dark:text-white/70 text-sm leading-relaxed">
              {t.desc}
            </p>

            {/* Contact links */}
            <div className="flex flex-col gap-4">
              <a
                href="mailto:socialtheclub.3@gmail.com"
                onClick={handleEmailClick}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#A78BFA]/15 flex items-center justify-center group-hover:bg-[#A78BFA] transition-colors duration-200">
                  <Mail size={16} className="text-[#A78BFA] group-hover:text-white transition-colors duration-200" />
                </div>
                <div>
                  <p className="text-xs text-[#1E1E1E]/50 dark:text-white/50 font-semibold flex items-center gap-2">
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    {copiedEmail && (
                      <span className="text-[10px] text-[#A78BFA] font-bold bg-[#A78BFA]/10 px-2 py-0.5 rounded-full">
                        {lang === 'ar' ? 'تم النسخ!' : 'Copied!'}
                      </span>
                    )}
                  </p>
                  <p className="text-sm font-bold text-[#1E1E1E] dark:text-white">socialtheclub.3@gmail.com</p>
                </div>
              </a>
              <a
                href="https://wa.me/201043971900"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#7ED6B7]/15 flex items-center justify-center group-hover:bg-[#7ED6B7] transition-colors duration-200">
                  <MessageCircle size={16} className="text-[#7ED6B7] group-hover:text-white transition-colors duration-200" />
                </div>
                <div>
                  <p className="text-xs text-[#1E1E1E]/50 dark:text-white/50 font-semibold">
                    {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
                  </p>
                  <p className="text-sm font-bold text-[#1E1E1E] dark:text-white">
                    {lang === 'ar' ? 'دردشة مباشرة' : 'Chat with us'}
                  </p>
                </div>
              </a>
            </div>

            {/* Decorative box */}
            <div className="p-6 rounded-2xl brand-gradient-bg border border-white/10 hidden lg:block">
              <p className="text-xs font-black uppercase tracking-widest text-[#A78BFA] mb-2">
                {lang === 'ar' ? 'ضمان الاستجابة السريعة' : 'Rapid Response SLA'}
              </p>
              <p className="text-xs text-white/70 leading-relaxed">
                {t.responseGuarantee}
              </p>
            </div>
          </AnimatedSection>

          {/* Right: Form */}
          <AnimatedSection delay={100} className="lg:col-span-3">
            <div className="bg-white dark:bg-[#1C1C1C] rounded-3xl p-6 sm:p-10 border border-[#1E1E1E]/8 dark:border-white/10 shadow-lg">
              {submitted ? (
                <div className="text-center py-12 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#7ED6B7]/20 flex items-center justify-center text-[#7ED6B7] mb-2">
                    <CheckCircle size={36} />
                  </div>
                  <h3 className="text-2xl font-black text-[#1E1E1E] dark:text-white">
                    {lang === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Inquiry Received!'}
                  </h3>
                  <p className="text-sm text-[#1E1E1E]/60 dark:text-white/60 max-w-sm leading-relaxed">
                    {t.successMsg}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm font-black text-[#A78BFA] hover:underline cursor-pointer mt-4"
                  >
                    {lang === 'ar' ? 'إرسال طلب مشروع آخر' : 'Submit another inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Project inquiry form">
                  <h3 className="text-xl font-black text-[#1E1E1E] dark:text-white mb-6">
                    {lang === 'ar' ? 'بيانات المشروع' : 'Project Inquiry'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-[#1E1E1E]/70 dark:text-white/70 mb-1.5">
                        {t.nameLabel} <span className="text-[#FF8FB1]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t.namePlaceholder}
                        className={fieldClass('name')}
                      />
                      {errors.name && (
                        <p className="text-xs text-[#FF8FB1] mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-xs font-bold text-[#1E1E1E]/70 dark:text-white/70 mb-1.5">
                        {lang === 'ar' ? 'اسم شركتك أو نشاطك' : 'Company / Brand Name'}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder={lang === 'ar' ? 'شركتك' : 'Company LLC'}
                        className={fieldClass('company')}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-[#1E1E1E]/70 dark:text-white/70 mb-1.5">
                        {t.emailLabel} <span className="text-[#FF8FB1]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t.emailPlaceholder}
                        className={fieldClass('email')}
                      />
                      {errors.email && (
                        <p className="text-xs text-[#FF8FB1] mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-[#1E1E1E]/70 dark:text-white/70 mb-1.5">
                        {lang === 'ar' ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+20 1..."
                        className={fieldClass('phone')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Service */}
                    <div>
                      <label htmlFor="service" className="block text-xs font-bold text-[#1E1E1E]/70 dark:text-white/70 mb-1.5">
                        {t.serviceLabel} <span className="text-[#FF8FB1]">*</span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className={fieldClass('service')}
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-xs text-[#FF8FB1] mt-1">{errors.service}</p>
                      )}
                    </div>

                    {/* Budget */}
                    <div>
                      <label htmlFor="budget" className="block text-xs font-bold text-[#1E1E1E]/70 dark:text-white/70 mb-1.5">
                        {t.budgetLabel}
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className={fieldClass('budget')}
                      >
                        {budgetOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="mb-6">
                    <label htmlFor="projectDetails" className="block text-xs font-bold text-[#1E1E1E]/70 dark:text-white/70 mb-1.5">
                      {t.messageLabel} <span className="text-[#FF8FB1]">*</span>
                    </label>
                    <textarea
                      id="projectDetails"
                      name="projectDetails"
                      rows={4}
                      value={form.projectDetails}
                      onChange={handleChange}
                      placeholder={t.messagePlaceholder}
                      className={fieldClass('projectDetails')}
                    />
                    {errors.projectDetails && (
                      <p className="text-xs text-[#FF8FB1] mt-1">{errors.projectDetails}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                    id="contact-submit"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        {t.submittingBtn}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {t.submitBtn}
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
