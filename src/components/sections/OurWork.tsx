import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import CaseStudyModal, { type CaseStudy } from '../ui/CaseStudyModal';
import { caseStudyService } from '../../services/caseStudyService';
import type { StorableCaseStudy, ResultIconKey } from '../../data/caseStudyData';

// Map string icon keys to actual React components
const ICON_MAP: Record<ResultIconKey, React.ElementType> = {
  TrendingUp,
  Users,
  DollarSign,
  Target,
};

// Convert a StorableCaseStudy (serializable) → CaseStudy (with React icons) for the modal
function toModalCaseStudy(cs: StorableCaseStudy): CaseStudy {
  return {
    ...cs,
    results: cs.results.map(r => ({
      ...r,
      icon: ICON_MAP[r.icon] ?? TrendingUp,
    })),
  };
}

const OurWork: React.FC = () => {
  const { lang } = useApp();
  const t = translations[lang].ourWork;
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);
  const [caseStudies, setCaseStudies] = useState<StorableCaseStudy[]>([]);

  useEffect(() => {
    const unsub = caseStudyService.subscribe(setCaseStudies);
    return () => unsub();
  }, []);

  const projectItems = caseStudies.map((cs) => ({
    ...cs,
    label:
      lang === 'ar'
        ? cs.categoryAr.split(' · ')[1] || cs.categoryAr.split(' · ')[0]
        : cs.category.split(' · ')[1] || cs.category.split(' · ')[0],
    description:
      lang === 'ar'
        ? cs.descriptionAr || (lang === 'ar' ? cs.challengeAr.slice(0, 100) + '…' : cs.challenge.slice(0, 100) + '…')
        : cs.description || cs.challenge.slice(0, 120) + '…',
    tags: lang === 'ar' ? (cs.tagsAr?.filter(Boolean) ?? []) : (cs.tags?.filter(Boolean) ?? []),
  }));

  return (
    <>
      <section
        id="work"
        className="section-padding bg-[#FBF6EF] dark:bg-[#121212] overflow-hidden transition-colors duration-300"
        aria-label="Our work portfolio"
      >
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <AnimatedSection>
              <SectionHeading
                eyebrow={t.badge}
                title={t.title}
                subtitle={t.subtitle}
                align="left"
              />
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-shrink-0 text-sm font-black text-[#1E1E1E] dark:text-white hover:text-[#A78BFA] transition-colors inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>{t.viewAllBtn}</span>
                <ArrowRight size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
              </a>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectItems.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 120}>
                <article className="group rounded-3xl overflow-hidden bg-white dark:bg-[#1C1C1C] border border-[#1E1E1E]/8 dark:border-white/10 card-lift flex flex-col h-full shadow-sm">
                  {/* Project Visual */}
                  <div className="relative aspect-[4/3] overflow-hidden" style={{ background: project.gradient }}>
                    {project.id === 'eduguide' && project.logo ? (
                      <img src={project.logo} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-6 bottom-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-4">
                        {project.logo ? (
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white shadow-xl shadow-black/10 flex items-center justify-center p-2">
                            <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="text-center">
                            <p className="text-white font-black text-xl leading-tight">{lang === 'ar' ? project.nameAr : project.name}</p>
                            <p className="text-white/80 text-xs mt-1">{lang === 'ar' ? project.industryAr : project.industry}</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Category label */}
                    <span className={`absolute top-4 ${lang === 'ar' ? 'right-4' : 'left-4'} bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full z-10`}>
                      {project.label}
                    </span>

                    {/* Hover overlay with quick metrics */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-3 p-6">
                        {project.results.slice(0, 4).map((r, ri) => (
                          <div key={ri} className="text-center">
                            <p className="text-white font-black text-lg" style={{ color: r.color }}>{r.value}</p>
                            <p className="text-white/75 text-[10px] font-semibold leading-tight mt-0.5">{lang === 'ar' ? r.labelAr : r.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] font-bold uppercase tracking-wide bg-[#FBF6EF] dark:bg-[#262626] text-[#1E1E1E]/70 dark:text-white/70 px-2.5 py-1 rounded-full border border-[#1E1E1E]/10 dark:border-white/10"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-black text-[#1E1E1E] dark:text-white mb-2">{lang === 'ar' ? project.nameAr : project.name}</h3>
                    <p className="text-sm text-[#1E1E1E]/60 dark:text-white/65 leading-relaxed flex-1">{project.description}</p>

                    <button
                      onClick={() => setActiveStudy(toModalCaseStudy(project))}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1E1E1E] dark:text-white hover:text-[#A78BFA] transition-all duration-200 group-hover:gap-3 cursor-pointer bg-transparent border-none p-0"
                      aria-label={`View case study for ${lang === 'ar' ? project.nameAr : project.name}`}
                    >
                      <span>{t.viewProject}</span>
                      <ArrowRight size={15} className={lang === 'ar' ? 'rotate-180' : ''} />
                    </button>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <CaseStudyModal study={activeStudy} onClose={() => setActiveStudy(null)} />
    </>
  );
};

export default OurWork;
