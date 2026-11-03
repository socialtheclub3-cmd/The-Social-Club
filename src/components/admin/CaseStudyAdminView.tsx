import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';
import { caseStudyService } from '../../services/caseStudyService';
import type { StorableCaseStudy, StorableResult, ResultIconKey } from '../../data/caseStudyData';

interface Props {
  isAr: boolean;
}

const ICON_OPTIONS: { value: ResultIconKey; label: string }[] = [
  { value: 'TrendingUp', label: 'TrendingUp (نمو)' },
  { value: 'Users', label: 'Users (مستخدمين)' },
  { value: 'DollarSign', label: 'DollarSign (دولار)' },
  { value: 'Target', label: 'Target (هدف)' },
];

const COLOR_PRESETS = [
  '#FF8FB1', '#A78BFA', '#FF8A3D', '#FFD166', '#7ED6B7',
  '#22C55E', '#F59E0B', '#3B82F6', '#EC4899', '#1E1E1E',
];

const GRADIENT_PRESETS = [
  { label: 'Pink → Purple', value: 'linear-gradient(135deg, #FF8FB1 0%, #A78BFA 100%)' },
  { label: 'Dark → Orange', value: 'linear-gradient(135deg, #1E1E1E 0%, #FF8A3D 100%)' },
  { label: 'Mint → Dark', value: 'linear-gradient(135deg, #7ED6B7 0%, #1E1E1E 100%)' },
  { label: 'Purple → Pink', value: 'linear-gradient(135deg, #A78BFA 0%, #FF8FB1 100%)' },
  { label: 'Dark → Purple', value: 'linear-gradient(135deg, #1E1E1E 0%, #2E2E2E 50%, #A78BFA 100%)' },
  { label: 'Orange → Yellow', value: 'linear-gradient(135deg, #FF8A3D 0%, #FFD166 100%)' },
];

const emptyResult = (): StorableResult => ({
  icon: 'TrendingUp',
  value: '',
  label: '',
  labelAr: '',
  color: '#A78BFA',
});

const emptyStudy = (): StorableCaseStudy => ({
  id: '',
  name: '',
  nameAr: '',
  category: '',
  categoryAr: '',
  gradient: GRADIENT_PRESETS[0].value,
  industry: '',
  industryAr: '',
  timeline: '',
  challenge: '',
  challengeAr: '',
  solution: '',
  solutionAr: '',
  results: [emptyResult(), emptyResult(), emptyResult(), emptyResult()],
  deliverables: [''],
  deliverablesAr: [''],
  tags: [''],
  tagsAr: [''],
  description: '',
  descriptionAr: '',
  logo: '',
  isFeatured: false,
  order: 99,
});

const CaseStudyAdminView: React.FC<Props> = ({ isAr }) => {
  const [studies, setStudies] = useState<StorableCaseStudy[]>([]);
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editingStudy, setEditingStudy] = useState<StorableCaseStudy>(emptyStudy());
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string>('basic');

  useEffect(() => {
    const unsub = caseStudyService.subscribe(setStudies);
    return () => unsub();
  }, []);

  const handleNew = () => {
    setEditingStudy(emptyStudy());
    setIsNew(true);
    setExpandedSection('basic');
    setView('form');
  };

  const handleEdit = (study: StorableCaseStudy) => {
    // Ensure results always has 4 rows
    const results = [...study.results];
    while (results.length < 4) results.push(emptyResult());
    // Ensure deliverables/tags always have at least one row
    setEditingStudy({
      ...study,
      results,
      deliverables: study.deliverables.length ? study.deliverables : [''],
      deliverablesAr: study.deliverablesAr.length ? study.deliverablesAr : [''],
      tags: study.tags?.length ? study.tags : [''],
      tagsAr: study.tagsAr?.length ? study.tagsAr : [''],
    });
    setIsNew(false);
    setExpandedSection('basic');
    setView('form');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(isAr ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete this case study?')) return;
    setDeletingId(id);
    await caseStudyService.deleteStudy(id);
    setDeletingId(null);
  };

  const handleSave = async () => {
    if (!editingStudy.name || !editingStudy.nameAr) {
      alert(isAr ? 'يرجى إدخال اسم المشروع بالعربية والإنجليزية' : 'Please enter the project name in both languages');
      return;
    }

    let studyId = editingStudy.id;
    if (!studyId) {
      // Auto-generate ID from English name
      studyId = editingStudy.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now();
    }

    // Clean up empty array entries
    const cleanStudy: StorableCaseStudy = {
      ...editingStudy,
      id: studyId,
      deliverables: editingStudy.deliverables.filter(d => d.trim()),
      deliverablesAr: editingStudy.deliverablesAr.filter(d => d.trim()),
      tags: editingStudy.tags?.filter(t => t.trim()) ?? [],
      tagsAr: editingStudy.tagsAr?.filter(t => t.trim()) ?? [],
      results: editingStudy.results.filter(r => r.value.trim()),
    };

    setSaving(true);
    await caseStudyService.saveStudy(cleanStudy);
    setSaving(false);
    setView('list');
  };

  // ─── field helpers ────────────────────────────────────────────────────────

  const setField = <K extends keyof StorableCaseStudy>(key: K, value: StorableCaseStudy[K]) => {
    setEditingStudy(prev => ({ ...prev, [key]: value }));
  };

  const setResultField = (idx: number, key: keyof StorableResult, value: string) => {
    const results = [...editingStudy.results];
    results[idx] = { ...results[idx], [key]: value };
    setField('results', results);
  };

  const setDeliverable = (idx: number, value: string, lang: 'en' | 'ar') => {
    const key = lang === 'ar' ? 'deliverablesAr' : 'deliverables';
    const arr = [...(editingStudy[key] as string[])];
    arr[idx] = value;
    setField(key, arr);
  };

  const addDeliverable = () => {
    setField('deliverables', [...editingStudy.deliverables, '']);
    setField('deliverablesAr', [...(editingStudy.deliverablesAr ?? []), '']);
  };

  const removeDeliverable = (idx: number) => {
    setField('deliverables', editingStudy.deliverables.filter((_, i) => i !== idx));
    setField('deliverablesAr', (editingStudy.deliverablesAr ?? []).filter((_, i) => i !== idx));
  };

  const setTag = (idx: number, value: string, lang: 'en' | 'ar') => {
    const key = lang === 'ar' ? 'tagsAr' : 'tags';
    const arr = [...((editingStudy[key] as string[]) ?? [])];
    arr[idx] = value;
    setField(key, arr);
  };

  const addTag = () => {
    setField('tags', [...(editingStudy.tags ?? []), '']);
    setField('tagsAr', [...(editingStudy.tagsAr ?? []), '']);
  };

  const removeTag = (idx: number) => {
    setField('tags', (editingStudy.tags ?? []).filter((_, i) => i !== idx));
    setField('tagsAr', (editingStudy.tagsAr ?? []).filter((_, i) => i !== idx));
  };

  // ─── UI helpers ───────────────────────────────────────────────────────────

  const inputClass = 'w-full bg-[#F5F0E8] dark:bg-[#262626] border border-[#1E1E1E]/10 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-[#1E1E1E] dark:text-white placeholder-[#1E1E1E]/40 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/50 transition-all';
  const labelClass = 'block text-[11px] font-bold uppercase tracking-wide text-[#1E1E1E]/50 dark:text-white/50 mb-1.5';

  const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <div className="border border-[#1E1E1E]/8 dark:border-white/10 rounded-2xl overflow-hidden mb-4">
      <button
        type="button"
        className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#1A1A1A] hover:bg-[#FBF6EF] dark:hover:bg-[#222] transition-colors text-left"
        onClick={() => setExpandedSection(expandedSection === id ? '' : id)}
      >
        <span className="font-bold text-sm text-[#1E1E1E] dark:text-white">{title}</span>
        {expandedSection === id ? <ChevronUp size={16} className="text-[#A78BFA]" /> : <ChevronDown size={16} className="opacity-50" />}
      </button>
      {expandedSection === id && (
        <div className="p-4 bg-white dark:bg-[#1A1A1A] border-t border-[#1E1E1E]/8 dark:border-white/10 space-y-4">
          {children}
        </div>
      )}
    </div>
  );

  const BilingualRow = ({
    labelEn, labelAr, fieldEn, fieldAr, placeholderEn = '', placeholderAr = '', multiline = false
  }: {
    labelEn: string; labelAr: string;
    fieldEn: keyof StorableCaseStudy; fieldAr: keyof StorableCaseStudy;
    placeholderEn?: string; placeholderAr?: string;
    multiline?: boolean;
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label className={labelClass}>{labelEn} <span className="text-[#A78BFA]">EN</span></label>
        {multiline ? (
          <textarea
            className={inputClass + ' min-h-[90px] resize-y'}
            placeholder={placeholderEn}
            value={(editingStudy[fieldEn] as string) ?? ''}
            onChange={e => setField(fieldEn, e.target.value)}
            dir="ltr"
          />
        ) : (
          <input type="text" className={inputClass} placeholder={placeholderEn}
            value={(editingStudy[fieldEn] as string) ?? ''}
            onChange={e => setField(fieldEn, e.target.value)} dir="ltr" />
        )}
      </div>
      <div>
        <label className={labelClass}>{labelAr} <span className="text-[#FF8FB1]">AR</span></label>
        {multiline ? (
          <textarea
            className={inputClass + ' min-h-[90px] resize-y'}
            placeholder={placeholderAr}
            value={(editingStudy[fieldAr] as string) ?? ''}
            onChange={e => setField(fieldAr, e.target.value)}
            dir="rtl"
          />
        ) : (
          <input type="text" className={inputClass} placeholder={placeholderAr}
            value={(editingStudy[fieldAr] as string) ?? ''}
            onChange={e => setField(fieldAr, e.target.value)} dir="rtl" />
        )}
      </div>
    </div>
  );

  // ─── LIST VIEW ────────────────────────────────────────────────────────────
  if (view === 'list') {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-[#1E1E1E] dark:text-white">
              {isAr ? 'إدارة الأعمال والحالات' : 'Portfolio & Case Studies'}
            </h2>
            <p className="text-sm text-[#1E1E1E]/50 dark:text-white/50 mt-0.5">
              {isAr ? `${studies.length} مشروع` : `${studies.length} projects`}
            </p>
          </div>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#A78BFA] hover:bg-[#9370e8] text-white text-sm font-bold rounded-xl transition-colors"
          >
            <Plus size={16} />
            {isAr ? 'إضافة مشروع' : 'Add Project'}
          </button>
        </div>

        {studies.length === 0 ? (
          <div className="text-center py-20 text-[#1E1E1E]/40 dark:text-white/40">
            <p className="text-lg font-bold">{isAr ? 'لا توجد مشاريع بعد' : 'No projects yet'}</p>
            <p className="text-sm mt-1">{isAr ? 'أضف أول مشروع لك' : 'Add your first case study'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {studies.map((study) => (
              <div
                key={study.id}
                className="bg-white dark:bg-[#1A1A1A] border border-[#1E1E1E]/8 dark:border-white/10 rounded-2xl p-4 flex items-center gap-4"
              >
                {/* Gradient preview */}
                <div
                  className="w-14 h-14 rounded-xl flex-shrink-0"
                  style={{ background: study.gradient }}
                />
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-black text-[#1E1E1E] dark:text-white text-sm truncate">{study.name}</h3>
                    {study.isFeatured && (
                      <span className="text-[10px] font-bold bg-[#FFD166]/20 text-[#b8950c] px-2 py-0.5 rounded-full">
                        {isAr ? 'مميز' : 'Featured'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#1E1E1E]/50 dark:text-white/50 mt-0.5 truncate">{study.nameAr}</p>
                  <p className="text-[11px] text-[#A78BFA] font-semibold mt-1">{study.industry} · {study.timeline}</p>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(study)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-[#A78BFA] hover:bg-[#A78BFA]/10 transition-colors"
                    title={isAr ? 'تعديل' : 'Edit'}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(study.id)}
                    disabled={deletingId === study.id}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-rose-500 hover:bg-rose-500/10 transition-colors disabled:opacity-40"
                    title={isAr ? 'حذف' : 'Delete'}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ─── FORM VIEW ────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Form header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('list')}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#1E1E1E] dark:text-white hover:bg-[#1E1E1E]/5 dark:hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
          <div>
            <h2 className="text-lg font-black text-[#1E1E1E] dark:text-white">
              {isNew
                ? (isAr ? 'إضافة مشروع جديد' : 'Add New Project')
                : (isAr ? 'تعديل المشروع' : 'Edit Project')}
            </h2>
            {!isNew && (
              <p className="text-xs text-[#1E1E1E]/40 dark:text-white/40 mt-0.5 font-mono">{editingStudy.id}</p>
            )}
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#A78BFA] hover:bg-[#9370e8] disabled:opacity-60 text-white text-sm font-bold rounded-xl transition-colors"
        >
          <Save size={15} />
          {saving ? (isAr ? 'جاري الحفظ...' : 'Saving...') : (isAr ? 'حفظ' : 'Save')}
        </button>
      </div>

      {/* ── BASIC INFO ── */}
      <Section id="basic" title={isAr ? '📋 المعلومات الأساسية' : '📋 Basic Information'}>
        <BilingualRow
          labelEn="Project Name" labelAr="اسم المشروع"
          fieldEn="name" fieldAr="nameAr"
          placeholderEn="e.g. Bloom Fashion Studio" placeholderAr="مثال: بلوم للأزياء"
        />
        <BilingualRow
          labelEn="Category" labelAr="الفئة"
          fieldEn="category" fieldAr="categoryAr"
          placeholderEn="e.g. E-Commerce · D2C" placeholderAr="مثال: التجارة الإلكترونية"
        />
        <BilingualRow
          labelEn="Industry" labelAr="القطاع"
          fieldEn="industry" fieldAr="industryAr"
          placeholderEn="e.g. E-Commerce & Retail" placeholderAr="مثال: التجارة الإلكترونية"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className={labelClass}>{isAr ? 'الجدول الزمني' : 'Timeline'}</label>
            <input type="text" className={inputClass} placeholder="Results in 90 days"
              value={editingStudy.timeline} onChange={e => setField('timeline', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>{isAr ? 'الترتيب' : 'Order'}</label>
            <input type="number" className={inputClass} placeholder="1"
              value={editingStudy.order ?? ''} onChange={e => setField('order', parseInt(e.target.value) || 0)} />
          </div>
          <div>
            <label className={labelClass}>{isAr ? 'رابط الشعار (اختياري)' : 'Logo URL (optional)'}</label>
            <input type="text" className={inputClass} placeholder="/logo.jpg"
              value={editingStudy.logo ?? ''} onChange={e => setField('logo', e.target.value)} />
          </div>
        </div>
        <div className="flex items-center gap-3 pt-1">
          <input
            type="checkbox"
            id="isFeatured"
            className="w-4 h-4 rounded accent-[#A78BFA] cursor-pointer"
            checked={editingStudy.isFeatured ?? false}
            onChange={e => setField('isFeatured', e.target.checked)}
          />
          <label htmlFor="isFeatured" className="text-sm font-semibold text-[#1E1E1E] dark:text-white cursor-pointer">
            {isAr ? 'مشروع مميز (Featured)' : 'Mark as Featured Project'}
          </label>
        </div>
      </Section>

      {/* ── DESCRIPTION & TAGS ── */}
      <Section id="desc" title={isAr ? '✏️ الوصف والتاجز' : '✏️ Description & Tags'}>
        <BilingualRow
          labelEn="Short Description" labelAr="وصف قصير"
          fieldEn="description" fieldAr="descriptionAr"
          placeholderEn="One-line summary shown on the card..." placeholderAr="ملخص يظهر على البطاقة..."
          multiline
        />
        {/* Tags */}
        <div>
          <label className={labelClass}>{isAr ? 'التاجز (Tags)' : 'Tags'}</label>
          {(editingStudy.tags ?? ['']).map((tag, idx) => (
            <div key={idx} className="grid grid-cols-2 gap-2 mb-2">
              <input type="text" className={inputClass} placeholder="e.g. E-Commerce" dir="ltr"
                value={tag} onChange={e => setTag(idx, e.target.value, 'en')} />
              <div className="flex gap-2">
                <input type="text" className={inputClass + ' flex-1'} placeholder="مثال: تجارة إلكترونية" dir="rtl"
                  value={(editingStudy.tagsAr ?? [])[idx] ?? ''} onChange={e => setTag(idx, e.target.value, 'ar')} />
                {(editingStudy.tags ?? []).length > 1 && (
                  <button onClick={() => removeTag(idx)} className="text-rose-500 hover:text-rose-600 px-1">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
          <button onClick={addTag} className="text-[#A78BFA] text-xs font-bold hover:underline flex items-center gap-1 mt-1">
            <Plus size={12} /> {isAr ? 'إضافة تاج' : 'Add Tag'}
          </button>
        </div>
      </Section>

      {/* ── GRADIENT ── */}
      <Section id="visual" title={isAr ? '🎨 التدرج اللوني' : '🎨 Visual / Gradient'}>
        <div>
          <label className={labelClass}>{isAr ? 'اختر تدرجاً جاهزاً' : 'Preset Gradients'}</label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-3">
            {GRADIENT_PRESETS.map(preset => (
              <button
                key={preset.value}
                title={preset.label}
                onClick={() => setField('gradient', preset.value)}
                className={`h-10 rounded-xl border-2 transition-all ${editingStudy.gradient === preset.value ? 'border-[#A78BFA] scale-105' : 'border-transparent'}`}
                style={{ background: preset.value }}
              />
            ))}
          </div>
          <label className={labelClass}>{isAr ? 'أو أدخل CSS مخصص' : 'Or custom CSS gradient'}</label>
          <input type="text" className={inputClass}
            placeholder="linear-gradient(135deg, #FF8FB1 0%, #A78BFA 100%)"
            value={editingStudy.gradient} onChange={e => setField('gradient', e.target.value)} />
          {/* Preview */}
          <div className="mt-3 h-16 rounded-xl" style={{ background: editingStudy.gradient }} />
        </div>
      </Section>

      {/* ── CHALLENGE ── */}
      <Section id="challenge" title={isAr ? '⚡ التحدي' : '⚡ Challenge'}>
        <BilingualRow
          labelEn="Challenge" labelAr="التحدي"
          fieldEn="challenge" fieldAr="challengeAr"
          placeholderEn="Describe the client's main challenge..."
          placeholderAr="وصف التحدي الرئيسي للعميل..."
          multiline
        />
      </Section>

      {/* ── SOLUTION ── */}
      <Section id="solution" title={isAr ? '✅ الحل' : '✅ Solution'}>
        <BilingualRow
          labelEn="Solution" labelAr="الحل"
          fieldEn="solution" fieldAr="solutionAr"
          placeholderEn="Describe the solution you delivered..."
          placeholderAr="وصف الحل الذي قدمته..."
          multiline
        />
      </Section>

      {/* ── RESULTS ── */}
      <Section id="results" title={isAr ? '📊 النتائج (4 مقاييس)' : '📊 Results (4 Metrics)'}>
        {editingStudy.results.map((result, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-3 pb-4 border-b border-[#1E1E1E]/8 dark:border-white/8 last:border-0 last:pb-0">
            <div>
              <label className={labelClass}>{isAr ? 'الأيقونة' : 'Icon'}</label>
              <select
                className={inputClass + ' cursor-pointer'}
                value={result.icon}
                onChange={e => setResultField(idx, 'icon', e.target.value)}
              >
                {ICON_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>{isAr ? 'القيمة' : 'Value'}</label>
              <input type="text" className={inputClass} placeholder="3.4x"
                value={result.value} onChange={e => setResultField(idx, 'value', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Label <span className="text-[#A78BFA]">EN</span></label>
              <input type="text" className={inputClass} placeholder="Return on Ad Spend" dir="ltr"
                value={result.label} onChange={e => setResultField(idx, 'label', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Label <span className="text-[#FF8FB1]">AR</span></label>
              <input type="text" className={inputClass} placeholder="عائد الإعلانات" dir="rtl"
                value={result.labelAr} onChange={e => setResultField(idx, 'labelAr', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>{isAr ? 'اللون' : 'Color'}</label>
              <div className="flex gap-1.5 flex-wrap mt-1">
                {COLOR_PRESETS.map(color => (
                  <button
                    key={color}
                    title={color}
                    onClick={() => setResultField(idx, 'color', color)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${result.color === color ? 'border-white scale-110' : 'border-transparent'}`}
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Section>

      {/* ── DELIVERABLES ── */}
      <Section id="deliverables" title={isAr ? '📦 المخرجات' : '📦 Deliverables'}>
        {editingStudy.deliverables.map((item, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-2 mb-2">
            <input type="text" className={inputClass} placeholder="e.g. Headless e-commerce store" dir="ltr"
              value={item} onChange={e => setDeliverable(idx, e.target.value, 'en')} />
            <div className="flex gap-2">
              <input type="text" className={inputClass + ' flex-1'} placeholder="مثال: متجر إلكتروني" dir="rtl"
                value={(editingStudy.deliverablesAr ?? [])[idx] ?? ''}
                onChange={e => setDeliverable(idx, e.target.value, 'ar')} />
              {editingStudy.deliverables.length > 1 && (
                <button onClick={() => removeDeliverable(idx)} className="text-rose-500 hover:text-rose-600 px-1">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
        <button onClick={addDeliverable} className="text-[#A78BFA] text-xs font-bold hover:underline flex items-center gap-1 mt-1">
          <Plus size={12} /> {isAr ? 'إضافة مخرج' : 'Add Deliverable'}
        </button>
      </Section>

      {/* Bottom save */}
      <div className="flex justify-end pt-2 pb-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#A78BFA] hover:bg-[#9370e8] disabled:opacity-60 text-white font-bold rounded-xl transition-colors"
        >
          <Save size={16} />
          {saving ? (isAr ? 'جاري الحفظ...' : 'Saving...') : (isAr ? 'حفظ المشروع' : 'Save Project')}
        </button>
      </div>
    </div>
  );
};

export default CaseStudyAdminView;

