import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { lang } = useApp();
  const t = translations[lang].faq;

  const faqs = [
    { question: t.q1, answer: t.a1 },
    { question: t.q2, answer: t.a2 },
    { question: t.q3, answer: t.a3 },
    { question: t.q4, answer: t.a4 },
  ];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      id="faq"
      className="section-padding bg-[#F3EBE0] dark:bg-[#161616] overflow-hidden transition-colors duration-300"
      aria-label="Frequently asked questions"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          {/* Left: Heading */}
          <AnimatedSection direction="left" className="lg:col-span-1">
            <SectionHeading
              eyebrow={t.badge}
              title={t.title}
              align="left"
            />
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-[#A78BFA] hover:underline"
            >
              <span>{lang === 'ar' ? 'لديك استفسار آخر؟ تحدث معنا مباشرة' : "Still have questions? Let's talk"}</span>
              <ArrowRight size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
            </a>
          </AnimatedSection>

          {/* Right: Accordion */}
          <AnimatedSection delay={100} className="lg:col-span-2">
            <div className="flex flex-col gap-3.5" role="list">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`bg-white dark:bg-[#1E1E1E] rounded-2xl border transition-all duration-300 ${
                    openIndex === i
                      ? 'border-[#A78BFA]/50 dark:border-[#A78BFA]/50 shadow-md'
                      : 'border-[#1E1E1E]/8 dark:border-white/10'
                  }`}
                  role="listitem"
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full text-left flex items-start justify-between gap-4 p-5 cursor-pointer"
                    aria-expanded={openIndex === i}
                    id={`faq-btn-${i}`}
                    aria-controls={`faq-panel-${i}`}
                  >
                    <span className="text-sm sm:text-base font-bold text-[#1E1E1E] dark:text-white leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                        openIndex === i
                          ? 'bg-[#A78BFA] text-white'
                          : 'bg-[#1E1E1E]/80 dark:bg-white/10 text-[#1E1E1E] dark:text-white'
                      }`}
                    >
                      {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>

                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: openIndex === i ? '400px' : '0',
                      opacity: openIndex === i ? 1 : 0,
                    }}
                  >
                    <div className="px-5 pb-5">
                      <p className="text-sm text-[#1E1E1E]/70 dark:text-white/70 leading-relaxed border-t border-[#1E1E1E]/8 dark:border-white/10 pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
