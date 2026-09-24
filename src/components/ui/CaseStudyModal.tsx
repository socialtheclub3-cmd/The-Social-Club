import React, { useEffect, useRef } from 'react';
import { X, CheckCircle2, BarChart3 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface CaseStudy {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  gradient: string;
  challenge: string;
  challengeAr: string;
  solution: string;
  solutionAr: string;
  results: {
    icon: React.ElementType;
    value: string;
    label: string;
    labelAr: string;
    color: string;
  }[];
  deliverables: string[];
  deliverablesAr: string[];
  timeline: string;
  industry: string;
  industryAr: string;
  logo?: string;
}

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ study, onClose }) => {
  const { lang } = useApp();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!study) return;
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);

    // Animate in
    setTimeout(() => {
      if (overlayRef.current) overlayRef.current.style.opacity = '1';
      if (contentRef.current) {
        contentRef.current.style.opacity = '1';
        contentRef.current.style.transform = 'translateY(0) scale(1)';
      }
    }, 10);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [study, onClose]);

  const handleClose = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = '0';
    if (contentRef.current) {
      contentRef.current.style.opacity = '0';
      contentRef.current.style.transform = 'translateY(20px) scale(0.97)';
    }
    setTimeout(onClose, 250);
  };

  if (!study) return null;

  const isAr = lang === 'ar';

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        opacity: 0,
        transition: 'opacity 0.25s ease',
      }}
      role="dialog"
      aria-modal="true"
      aria-label={isAr ? study.nameAr : study.name}
    >
      <div
        ref={contentRef}
        style={{
          background: 'var(--modal-bg, #fff)',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '760px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          opacity: 0,
          transform: 'translateY(20px) scale(0.97)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
          direction: isAr ? 'rtl' : 'ltr',
        }}
        className="dark:[--modal-bg:#1C1C1C]"
      >
        {/* Header Banner */}
        <div
          style={{
            background: study.gradient,
            borderRadius: '24px 24px 0 0',
            padding: '40px 32px 32px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative blobs */}
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', bottom: -30, left: 20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

          <button
            onClick={handleClose}
            aria-label="Close"
            style={{
              position: 'absolute', top: 16, right: isAr ? 'auto' : 16, left: isAr ? 16 : 'auto',
              background: 'rgba(0,0,0,0.3)',
              border: 'none', borderRadius: '50%',
              width: 36, height: 36,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.5)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.3)')}
          >
            <X size={16} color="white" />
          </button>

          <span style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '5px 12px',
            borderRadius: '999px',
            marginBottom: 16,
          }}>
            {isAr ? study.industryAr : study.industry}
          </span>
          <h2 style={{ color: 'white', fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 900, margin: '0 0 6px', lineHeight: 1.2 }}>
            {isAr ? study.nameAr : study.name}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: 0 }}>{isAr ? study.categoryAr : study.category}</p>

          {/* Timeline badge */}
          <div style={{
            marginTop: 16,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(4px)',
            borderRadius: '999px', padding: '4px 12px',
          }}>
            <BarChart3 size={12} color="rgba(255,255,255,0.85)" />
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: 700 }}>{study.timeline}</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '32px' }}>

          {/* Results Grid */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A78BFA', marginBottom: 14 }}>
              {isAr ? 'النتائج المحققة' : 'Key Results'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
              {study.results.map((r, i) => {
                const Icon = r.icon;
                return (
                  <div key={i} style={{
                    background: `${r.color}12`,
                    border: `1px solid ${r.color}30`,
                    borderRadius: 14,
                    padding: '16px 14px',
                    textAlign: 'center',
                  }}>
                    <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
                      <Icon size={18} color={r.color} />
                    </div>
                    <p style={{ fontSize: 22, fontWeight: 900, color: r.color, margin: '0 0 3px' }}>{r.value}</p>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#888', margin: 0, lineHeight: 1.3 }}>{isAr ? r.labelAr : r.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Challenge */}
          <div style={{ marginBottom: 22 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FF8A3D', marginBottom: 10 }}>
              {isAr ? 'التحدي' : 'The Challenge'}
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--text-body)', margin: 0 }} className="text-[#1E1E1E]/70 dark:text-white/65">
              {isAr ? study.challengeAr : study.challenge}
            </p>
          </div>

          {/* Solution */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#22C55E', marginBottom: 10 }}>
              {isAr ? 'الحل والاستراتيجية' : 'Our Solution'}
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--text-body)', margin: 0 }} className="text-[#1E1E1E]/70 dark:text-white/65">
              {isAr ? study.solutionAr : study.solution}
            </p>
          </div>

          {/* Deliverables */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A78BFA', marginBottom: 12 }}>
              {isAr ? 'ما قدمناه' : 'Deliverables'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
              {(isAr ? study.deliverablesAr : study.deliverables).map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={14} color="#22C55E" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }} className="text-[#1E1E1E]/80 dark:text-white/80">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
              setTimeout(() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 300);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              width: '100%',
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #A78BFA, #7C3AED)',
              color: 'white',
              fontWeight: 800,
              fontSize: 14,
              borderRadius: 12,
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 20px rgba(167,139,250,0.35)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(167,139,250,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(167,139,250,0.35)';
            }}
          >
            <span>{isAr ? 'احصل على نتائج مماثلة لمشروعك ←' : 'Get Similar Results for Your Business →'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
