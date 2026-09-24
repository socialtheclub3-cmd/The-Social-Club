import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  LogOut, 
  Download, 
  Search, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  Trash2, 
  PlusCircle, 
  Eye, 
  EyeOff,
  X, 
  TrendingUp, 
  Users, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  LayoutGrid,
  List,
  ChevronRight,
  ChevronLeft,
  Save,
  Send,
  Building2,
  FileText
} from 'lucide-react';
import { leadsService } from '../services/leadsService';
import type { Lead, LeadStatus } from '../services/leadsService';
import { pricingService, type PricingConfig } from '../services/pricingService';
import { useApp } from '../context/AppContext';
import PricingAdminView from '../components/admin/PricingAdminView';

const DEFAULT_PASSWORD = 'Thesocialclub26';

const Admin: React.FC = () => {
  const { lang } = useApp();
  const isAr = lang === 'ar';
  const ArrowBack = isAr ? ArrowRight : ArrowLeft;
  const NextArrow = isAr ? ChevronLeft : ChevronRight;

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('tsc_admin_logged') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Data & Filters
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('kanban');
  const [activeTab, setActiveTab] = useState<'leads' | 'pricing'>('leads');
  const [pricingConfig, setPricingConfig] = useState<PricingConfig>(pricingService.getPricing());

  // Modals
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadNotes, setLeadNotes] = useState('');
  const [notesSaved, setNotesSaved] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [whatsAppModalLead, setWhatsAppModalLead] = useState<Lead | null>(null);

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'digital-marketing',
    budget: '$1,000 – $2,500',
    projectDetails: '',
  });

  // Load leads
  useEffect(() => {
    const unsubscribeLeads = leadsService.subscribe((data) => setLeads(data));
    const unsubscribePricing = pricingService.subscribe((config) => setPricingConfig(config));
    return () => {
      unsubscribeLeads();
      unsubscribePricing();
    };
  }, []);

  const getSavedPassword = () => {
    return localStorage.getItem('tsc_admin_password') || DEFAULT_PASSWORD;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === getSavedPassword()) {
      setIsAuthenticated(true);
      sessionStorage.setItem('tsc_admin_logged', 'true');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('tsc_admin_logged');
    setPasswordInput('');
  };

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    leadsService.updateLeadStatus(id, newStatus);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm(isAr ? 'هل أنت متأكد من حذف هذا العميل؟' : 'Are you sure you want to delete this lead?')) {
      leadsService.deleteLead(id);
      if (selectedLead?.id === id) setSelectedLead(null);
    }
  };

  const handleClearAll = () => {
    if (window.confirm(isAr ? 'هل أنت متأكد من مسح كافة بيانات العملاء؟' : 'Are you sure you want to clear all leads?')) {
      leadsService.clearAllLeads();
    }
  };

  const handleSaveNotes = () => {
    if (!selectedLead) return;
    leadsService.updateLeadNotes(selectedLead.id, leadNotes);
    setSelectedLead((prev) => (prev ? { ...prev, notes: leadNotes } : null));
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name.trim()) return;

    leadsService.saveLead({
      name: newLeadForm.name,
      company: newLeadForm.company,
      email: newLeadForm.email || 'manual@thesocialclub.com',
      phone: newLeadForm.phone,
      service: newLeadForm.service,
      budget: newLeadForm.budget,
      projectDetails: newLeadForm.projectDetails || 'عميل مسجل يدوياً عبر لوحة الإدارة',
    });

    setShowAddModal(false);
    setNewLeadForm({
      name: '',
      company: '',
      email: '',
      phone: '',
      service: 'digital-marketing',
      budget: '$1,000 – $2,500',
      projectDetails: '',
    });
  };

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.phone || '').includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'new').length;
  const contactedLeads = leads.filter((l) => l.status === 'contacted').length;
  const meetingLeads = leads.filter((l) => l.status === 'meeting').length;
  const wonLeads = leads.filter((l) => l.status === 'won').length;

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'new':
        return {
          label: isAr ? 'طلب جديد' : 'New',
          bg: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
          indicator: 'bg-blue-500',
        };
      case 'contacted':
        return {
          label: isAr ? 'تم التواصل' : 'Contacted',
          bg: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
          indicator: 'bg-amber-500',
        };
      case 'meeting':
        return {
          label: isAr ? 'اجتماع مجدول' : 'Meeting',
          bg: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
          indicator: 'bg-purple-500',
        };
      case 'won':
        return {
          label: isAr ? 'صفقة رابحة 🎉' : 'Won Deal 🎉',
          bg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
          indicator: 'bg-emerald-500',
        };
      case 'archived':
        return {
          label: isAr ? 'مؤرشف' : 'Archived',
          bg: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
          indicator: 'bg-gray-500',
        };
    }
  };

  const kanbanColumns: { id: LeadStatus; titleAr: string; titleEn: string; accent: string }[] = [
    { id: 'new', titleAr: 'طلبات جديدة', titleEn: 'New Inquiries', accent: '#3B82F6' },
    { id: 'contacted', titleAr: 'تم التواصل والمتابعة', titleEn: 'In Contact', accent: '#F59E0B' },
    { id: 'meeting', titleAr: 'اجتماع / استشارة', titleEn: 'Meeting / Strategy', accent: '#8B5CF6' },
    { id: 'won', titleAr: 'تم التعاقد بنجاح 🏆', titleEn: 'Won Deals 🏆', accent: '#10B981' },
  ];

  // WhatsApp Message Templates
  const getWhatsAppUrl = (phone: string, lead: Lead, templateIndex: number) => {
    const clean = phone.replace(/[^0-9]/g, '');
    let text = '';

    if (templateIndex === 1) {
      text = isAr
        ? `مرحباً ${lead.name} 👋، معك فريق The Social Club.\nاستلمنا طلبك بخصوص ${lead.service || 'النمو الرقمي'} وسعداء جداً بالتواصل معك لمناقشة خطة العمل.`
        : `Hi ${lead.name} 👋, this is The Social Club growth team.\nWe received your inquiry regarding ${lead.service || 'digital growth'} and look forward to discussing your custom roadmap.`;
    } else if (templateIndex === 2) {
      text = isAr
        ? `أهلاً ${lead.name}، بخصوص طلبك في The Social Club.. هل يناسبك تحديد موعد مكالمة استراتيجية سريعة مدتها 15 دقيقة لمراجعة أهدافك وحساب العائد المتوقع؟`
        : `Hello ${lead.name}, regarding your project at The Social Club.. Would you be available for a brief 15-min strategy call to review your goals and revenue projections?`;
    } else {
      text = isAr
        ? `مرحباً ${lead.name}، أرسل لك تفاصيل باقة النمو المقترحة لمشروعك من The Social Club مع كافة الخدمات ومؤشرات الأداء.`
        : `Hi ${lead.name}, here are the details for your custom growth package from The Social Club outlining deliverables and milestones.`;
    }

    return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen bg-[#FBF6EF] dark:bg-[#121212] flex items-center justify-center p-4 transition-colors duration-300 relative overflow-hidden"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <div className="absolute w-[600px] h-[600px] bg-[#A78BFA]/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 sm:p-10 border border-[#1E1E1E]/10 dark:border-white/10 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#A78BFA] to-[#FF8FB1] text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#A78BFA]/30">
              <Lock size={28} />
            </div>
            <h1 className="text-2xl font-black text-[#1E1E1E] dark:text-white">
              {isAr ? 'بوابة إدارة The Social Club' : 'The Social Club CRM'}
            </h1>
            <p className="text-xs text-[#1E1E1E]/60 dark:text-white/60 mt-1.5 leading-relaxed">
              {isAr ? 'لوحة التحكم المركزية لبيانات ومتابعة صفقات العملاء' : 'Executive portal for lead pipeline & growth analytics'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1E1E]/70 dark:text-white/70 mb-2">
                {isAr ? 'كلمة المرور (Password)' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError(false);
                  }}
                  placeholder="••••••••••••"
                  className="w-full text-center tracking-widest text-lg font-bold py-3.5 px-12 rounded-2xl bg-[#FBF6EF] dark:bg-[#121212] border border-[#1E1E1E]/10 dark:border-white/15 focus:outline-none focus:border-[#A78BFA] focus:ring-2 focus:ring-[#A78BFA]/20 text-[#1E1E1E] dark:text-white transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-3.5 rtl:right-auto rtl:left-3.5 text-[#1E1E1E]/40 dark:text-white/40 hover:text-[#A78BFA] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-rose-500 font-bold mt-2 text-center">
                  {isAr ? 'كلمة المرور غير صحيحة! يرجى التأكد والمحاولة مجدداً.' : 'Incorrect password! Please check and try again.'}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-[#A78BFA] hover:bg-[#906fe7] text-[#1E1E1E] font-black text-sm shadow-xl shadow-[#A78BFA]/25 transition-all duration-300 hover:scale-[1.01]"
            >
              {isAr ? 'تسجيل الدخول للوحة التحكم ←' : 'Access CRM Dashboard →'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#1E1E1E]/6 dark:border-white/8 text-center">
            <a
              href="/"
              className="text-xs text-[#1E1E1E]/50 dark:text-white/50 hover:text-[#A78BFA] inline-flex items-center gap-1.5 transition-colors font-semibold"
            >
              <ArrowBack size={14} />
              <span>{isAr ? 'الرجوع للموقع الرئيسي' : 'Return to Website'}</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div 
      className="min-h-screen bg-[#F8F4EE] dark:bg-[#111111] text-[#1E1E1E] dark:text-white transition-colors duration-300 pb-24"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#181818]/95 backdrop-blur-md border-b border-[#1E1E1E]/8 dark:border-white/10 px-6 py-3.5 shadow-xs">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="/"
              className="w-9 h-9 rounded-xl bg-[#1E1E1E]/5 dark:bg-white/5 flex items-center justify-center hover:bg-[#A78BFA]/20 transition-colors"
              title={isAr ? 'الموقع الرئيسي' : 'Website'}
            >
              <ArrowBack size={17} />
            </a>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h1 className="text-base sm:text-lg font-black tracking-tight">
                  The Social Club <span className="text-[#A78BFA]">CRM</span>
                </h1>
              </div>
              <p className="text-[11px] text-[#1E1E1E]/50 dark:text-white/50">
                {isAr ? 'منظومة إدارة العملاء والصفقات' : 'Client Acquisition Pipeline'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Main Tabs (Leads vs Pricing) */}
            <div className="hidden sm:inline-flex p-1 bg-[#F8F4EE] dark:bg-[#121212] rounded-xl border border-[#1E1E1E]/8 dark:border-white/8 mr-2 ml-2">
              <button
                onClick={() => setActiveTab('leads')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'leads'
                    ? 'bg-white dark:bg-[#222] text-[#1E1E1E] dark:text-white shadow-xs'
                    : 'text-[#1E1E1E]/50 dark:text-white/50 hover:text-[#1E1E1E]'
                }`}
              >
                <Users size={13} />
                <span>{isAr ? 'العملاء' : 'Leads'}</span>
              </button>
              <button
                onClick={() => setActiveTab('pricing')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'pricing'
                    ? 'bg-white dark:bg-[#222] text-[#1E1E1E] dark:text-white shadow-xs'
                    : 'text-[#1E1E1E]/50 dark:text-white/50 hover:text-[#1E1E1E]'
                }`}
              >
                <TrendingUp size={13} />
                <span>{isAr ? 'الأسعار' : 'Pricing'}</span>
              </button>
            </div>

            {/* View Mode Switcher */}
            {activeTab === 'leads' && (
              <div className="hidden sm:inline-flex p-1 bg-[#F8F4EE] dark:bg-[#121212] rounded-xl border border-[#1E1E1E]/8 dark:border-white/8">
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'kanban'
                      ? 'bg-white dark:bg-[#222] text-[#1E1E1E] dark:text-white shadow-xs'
                      : 'text-[#1E1E1E]/50 dark:text-white/50 hover:text-[#1E1E1E]'
                  }`}
                >
                  <LayoutGrid size={13} />
                  <span>{isAr ? 'لوحة كانبان' : 'Pipeline'}</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'table'
                      ? 'bg-white dark:bg-[#222] text-[#1E1E1E] dark:text-white shadow-xs'
                      : 'text-[#1E1E1E]/50 dark:text-white/50 hover:text-[#1E1E1E]'
                  }`}
                >
                  <List size={13} />
                  <span>{isAr ? 'الجدول' : 'Table'}</span>
                </button>
              </div>
            )}

            {/* Manual Add Lead */}
            {activeTab === 'leads' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#A78BFA] hover:bg-[#906fe7] text-[#1E1E1E] text-xs font-bold shadow-sm transition-all"
              >
                <PlusCircle size={14} />
                <span>{isAr ? 'إضافة عميل' : 'Add Lead'}</span>
              </button>
            )}

            {/* Export CSV */}
            {activeTab === 'leads' && (
              <button
                onClick={() => leadsService.exportToCSV(filteredLeads)}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-[#222222] border border-[#1E1E1E]/10 dark:border-white/10 text-xs font-bold hover:border-[#A78BFA] transition-all shadow-xs"
                title={isAr ? 'تصدير إكسيل' : 'Export Excel'}
              >
                <Download size={14} className="text-[#A78BFA]" />
                <span>{isAr ? 'تصدير' : 'Export'}</span>
              </button>
            )}

            {activeTab === 'leads' && leads.length > 0 && (
              <button
                onClick={handleClearAll}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-500/70 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                title={isAr ? 'مسح الكل' : 'Clear All'}
              >
                <Trash2 size={13} />
                <span>{isAr ? 'مسح الكل' : 'Clear'}</span>
              </button>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-rose-500 hover:bg-rose-500/10 transition-colors"
              title={isAr ? 'تسجيل خروج' : 'Logout'}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {activeTab === 'pricing' ? (
          <PricingAdminView pricingConfig={pricingConfig} setPricingConfig={setPricingConfig} isAr={isAr} />
        ) : (
          <>
        {/* KPI Metrics Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-8">
          <div className="bg-white dark:bg-[#1A1A1A] p-4 sm:p-5 rounded-2xl border border-[#1E1E1E]/8 dark:border-white/10 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#A78BFA]/15 text-[#A78BFA] flex items-center justify-center flex-shrink-0">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[11px] text-[#1E1E1E]/50 dark:text-white/50 font-bold">{isAr ? 'إجمالي الطلبات' : 'Total Pipeline'}</p>
              <p className="text-xl sm:text-2xl font-black">{totalLeads}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1A1A1A] p-4 sm:p-5 rounded-2xl border border-[#1E1E1E]/8 dark:border-white/10 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center flex-shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-[11px] text-[#1E1E1E]/50 dark:text-white/50 font-bold">{isAr ? 'طلبات جديدة' : 'New Inquiries'}</p>
              <p className="text-xl sm:text-2xl font-black text-blue-500">{newLeads}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1A1A1A] p-4 sm:p-5 rounded-2xl border border-[#1E1E1E]/8 dark:border-white/10 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center flex-shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[11px] text-[#1E1E1E]/50 dark:text-white/50 font-bold">{isAr ? 'قيد المتابعة' : 'In Contact'}</p>
              <p className="text-xl sm:text-2xl font-black text-amber-500">{contactedLeads}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1A1A1A] p-4 sm:p-5 rounded-2xl border border-[#1E1E1E]/8 dark:border-white/10 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center flex-shrink-0">
              <MessageSquare size={20} />
            </div>
            <div>
              <p className="text-[11px] text-[#1E1E1E]/50 dark:text-white/50 font-bold">{isAr ? 'اجتماعات مجدولة' : 'Meetings'}</p>
              <p className="text-xl sm:text-2xl font-black text-purple-500">{meetingLeads}</p>
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1 bg-white dark:bg-[#1A1A1A] p-4 sm:p-5 rounded-2xl border border-[#1E1E1E]/8 dark:border-white/10 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center flex-shrink-0">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-[11px] text-[#1E1E1E]/50 dark:text-white/50 font-bold">{isAr ? 'صفقات رابحة' : 'Won Deals'}</p>
              <p className="text-xl sm:text-2xl font-black text-emerald-500">{wonLeads}</p>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-2xl border border-[#1E1E1E]/8 dark:border-white/10 shadow-xs mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search size={15} className="absolute top-1/2 -translate-y-1/2 right-3.5 rtl:right-3.5 ltr:left-3.5 text-[#1E1E1E]/40 dark:text-white/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isAr ? 'بحث بالاسم، الإيميل، الهاتف، الشركة...' : 'Search by lead, email, phone, company...'}
              className="w-full text-xs font-medium py-2.5 px-10 rounded-xl bg-[#F8F4EE] dark:bg-[#111111] border border-transparent focus:border-[#A78BFA] focus:outline-none text-[#1E1E1E] dark:text-white transition-all"
            />
          </div>

          {/* Quick status filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: isAr ? 'الكل' : 'All' },
              { id: 'new', label: isAr ? 'جديد' : 'New' },
              { id: 'contacted', label: isAr ? 'تم التواصل' : 'Contacted' },
              { id: 'meeting', label: isAr ? 'اجتماع' : 'Meeting' },
              { id: 'won', label: isAr ? 'تم التعاقد' : 'Won' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  statusFilter === tab.id
                    ? 'bg-[#1E1E1E] text-white dark:bg-white dark:text-[#121212]'
                    : 'bg-[#F8F4EE] dark:bg-[#111111] text-[#1E1E1E]/60 dark:text-white/60 hover:text-[#1E1E1E] dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredLeads.length === 0 ? (
          <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-12 text-center border border-[#1E1E1E]/8 dark:border-white/10">
            <div className="w-16 h-16 rounded-2xl bg-[#A78BFA]/10 text-[#A78BFA] flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={26} />
            </div>
            <h3 className="text-lg font-black mb-1">
              {isAr ? 'لا توجد طلبات مسجلة حالياً' : 'No inquiries found'}
            </h3>
            <p className="text-xs text-[#1E1E1E]/60 dark:text-white/60 max-w-sm mx-auto mb-6 leading-relaxed">
              {isAr 
                ? 'استمارة التواصل في الموقع الرئيسي ستسجل بيانات العملاء هنا لحظياً فور إرسالها. أو يمكنك إضافة عميل يدوياً.' 
                : 'Inquiries submitted through the website will appear here in real-time. You can also log leads manually.'}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 rounded-xl bg-[#A78BFA] text-[#1E1E1E] font-bold text-xs shadow-md shadow-[#A78BFA]/20 hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <PlusCircle size={15} />
              <span>{isAr ? 'إضافة عميل جديد يدوياً' : 'Add Lead Manually'}</span>
            </button>
          </div>
        ) : viewMode === 'kanban' ? (
          /* =================== KANBAN PIPELINE VIEW =================== */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
            {kanbanColumns.map((col) => {
              const colLeads = filteredLeads.filter((l) => l.status === col.id);

              return (
                <div 
                  key={col.id} 
                  className="bg-white/80 dark:bg-[#181818]/80 rounded-3xl p-4 border border-[#1E1E1E]/8 dark:border-white/8 flex flex-col min-h-[500px]"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#1E1E1E]/6 dark:border-white/6">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.accent }} />
                      <h3 className="text-xs font-black tracking-wide">
                        {isAr ? col.titleAr : col.titleEn}
                      </h3>
                    </div>
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-[#1E1E1E]/5 dark:bg-white/10 text-[#1E1E1E]/60 dark:text-white/60">
                      {colLeads.length}
                    </span>
                  </div>

                  {/* Cards in Column */}
                  <div className="space-y-3 flex-1">
                    {colLeads.map((lead) => {
                      const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');

                      return (
                        <div
                          key={lead.id}
                          className="bg-white dark:bg-[#202020] rounded-2xl p-4 border border-[#1E1E1E]/6 dark:border-white/8 shadow-xs hover:shadow-md transition-all duration-300 group"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h4 className="text-sm font-black text-[#1E1E1E] dark:text-white leading-tight">
                                {lead.name}
                              </h4>
                              {lead.company && (
                                <p className="text-[11px] font-medium text-[#1E1E1E]/50 dark:text-white/50 mt-0.5 flex items-center gap-1">
                                  <Building2 size={11} className="text-[#A78BFA]" />
                                  <span>{lead.company}</span>
                                </p>
                              )}
                            </div>
                            <span className="text-[10px] font-bold text-[#1E1E1E]/40 dark:text-white/40 whitespace-nowrap">
                              {new Date(lead.createdAt).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>

                          {/* Service & Budget tags */}
                          <div className="flex flex-wrap gap-1.5 my-2.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#A78BFA]/15 text-[#A78BFA] capitalize">
                              {lead.service ? lead.service.replace('-', ' ') : 'General'}
                            </span>
                            {lead.budget && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-[#1E1E1E]/5 dark:bg-white/5 text-[#1E1E1E]/60 dark:text-white/60">
                                {lead.budget}
                              </span>
                            )}
                          </div>

                          {/* Notes Preview if available */}
                          {lead.notes && (
                            <div className="p-2 rounded-xl bg-[#F8F4EE] dark:bg-[#171717] text-[10px] text-[#1E1E1E]/70 dark:text-white/70 italic mb-3 flex items-start gap-1">
                              <FileText size={11} className="text-[#A78BFA] flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{lead.notes}</span>
                            </div>
                          )}

                          {/* Action footer */}
                          <div className="flex items-center justify-between pt-2.5 border-t border-[#1E1E1E]/6 dark:border-white/6 mt-2">
                            <div className="flex items-center gap-1.5">
                              {cleanPhone && (
                                <button
                                  onClick={() => setWhatsAppModalLead(lead)}
                                  className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-colors"
                                  title="WhatsApp"
                                >
                                  <Phone size={13} />
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setSelectedLead(lead);
                                  setLeadNotes(lead.notes || '');
                                }}
                                className="w-7 h-7 rounded-lg bg-[#1E1E1E]/5 dark:bg-white/10 text-[#1E1E1E] dark:text-white hover:bg-[#A78BFA] hover:text-[#1E1E1E] flex items-center justify-center transition-colors"
                                title={isAr ? 'عرض وتدوين ملاحظات' : 'Details & Notes'}
                              >
                                <Eye size={13} />
                              </button>
                              <button
                                onClick={() => handleDelete(lead.id)}
                                className="w-7 h-7 rounded-lg text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/10 flex items-center justify-center transition-colors"
                                title={isAr ? 'حذف' : 'Delete'}
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>

                            {/* Move to next stage button */}
                            <div className="flex items-center gap-1">
                              {col.id === 'new' && (
                                <button
                                  onClick={() => handleStatusChange(lead.id, 'contacted')}
                                  className="px-2 py-1 rounded-lg bg-[#1E1E1E]/5 dark:bg-white/5 hover:bg-[#A78BFA] hover:text-[#1E1E1E] text-[10px] font-bold flex items-center gap-0.5 transition-all"
                                  title={isAr ? 'نقل إلى تم التواصل' : 'Move to Contacted'}
                                >
                                  <span>{isAr ? 'تواصل' : 'Next'}</span>
                                  <NextArrow size={11} />
                                </button>
                              )}
                              {col.id === 'contacted' && (
                                <button
                                  onClick={() => handleStatusChange(lead.id, 'meeting')}
                                  className="px-2 py-1 rounded-lg bg-[#1E1E1E]/5 dark:bg-white/5 hover:bg-[#A78BFA] hover:text-[#1E1E1E] text-[10px] font-bold flex items-center gap-0.5 transition-all"
                                  title={isAr ? 'نقل إلى اجتماع' : 'Move to Meeting'}
                                >
                                  <span>{isAr ? 'اجتماع' : 'Next'}</span>
                                  <NextArrow size={11} />
                                </button>
                              )}
                              {col.id === 'meeting' && (
                                <button
                                  onClick={() => handleStatusChange(lead.id, 'won')}
                                  className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white text-[10px] font-black flex items-center gap-0.5 transition-all"
                                  title={isAr ? 'إغلاق الصفقة (Won)' : 'Win Deal'}
                                >
                                  <span>{isAr ? 'تعاقد' : 'Win'}</span>
                                  <NextArrow size={11} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {colLeads.length === 0 && (
                      <div className="p-6 text-center text-xs text-[#1E1E1E]/30 dark:text-white/30 border border-dashed border-[#1E1E1E]/10 dark:border-white/10 rounded-2xl">
                        {isAr ? 'لا يوجد عملاء في هذه المرحلة' : 'No leads in this stage'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* =================== TABLE VIEW =================== */
          <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl border border-[#1E1E1E]/8 dark:border-white/10 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs">
                <thead>
                  <tr className="bg-[#F8F4EE]/60 dark:bg-[#141414] border-b border-[#1E1E1E]/8 dark:border-white/10 text-[#1E1E1E]/60 dark:text-white/60 uppercase tracking-wider font-bold">
                    <th className="py-4 px-5 text-start">{isAr ? 'العميل' : 'Lead'}</th>
                    <th className="py-4 px-5 text-start">{isAr ? 'الخدمة والميزانية' : 'Service & Budget'}</th>
                    <th className="py-4 px-5 text-start">{isAr ? 'التاريخ' : 'Date'}</th>
                    <th className="py-4 px-5 text-start">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-4 px-5 text-center">{isAr ? 'إجراءات' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E1E1E]/6 dark:divide-white/8 font-medium">
                  {filteredLeads.map((lead) => {
                    const badge = getStatusBadge(lead.status);
                    const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');

                    return (
                      <tr key={lead.id} className="hover:bg-[#F8F4EE]/40 dark:hover:bg-[#202020]/40 transition-colors">
                        <td className="py-4 px-5">
                          <div className="font-bold text-[#1E1E1E] dark:text-white text-sm flex items-center gap-2">
                            <span>{lead.name}</span>
                            {lead.company && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1E1E1E]/5 dark:bg-white/10 text-[#1E1E1E]/70 dark:text-white/70">
                                {lead.company}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#1E1E1E]/50 dark:text-white/50 mt-0.5 flex items-center gap-2">
                            <span>{lead.email}</span>
                            {lead.phone && <span>• {lead.phone}</span>}
                          </div>
                        </td>

                        <td className="py-4 px-5">
                          <span className="font-bold text-[#A78BFA] block capitalize">
                            {lead.service ? lead.service.replace('-', ' ') : 'General'}
                          </span>
                          <span className="text-[11px] text-[#1E1E1E]/50 dark:text-white/50">
                            {lead.budget ? `${isAr ? 'ميزانية: ' : 'Budget: '}${lead.budget}` : '-'}
                          </span>
                        </td>

                        <td className="py-4 px-5 whitespace-nowrap text-[#1E1E1E]/60 dark:text-white/60 text-[11px]">
                          {new Date(lead.createdAt).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>

                        <td className="py-4 px-5">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                            className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${badge.bg}`}
                          >
                            <option value="new">{isAr ? 'طلب جديد' : 'New'}</option>
                            <option value="contacted">{isAr ? 'تم التواصل' : 'Contacted'}</option>
                            <option value="meeting">{isAr ? 'اجتماع مجدول' : 'Meeting'}</option>
                            <option value="won">{isAr ? 'تم التعاقد' : 'Won Deal'}</option>
                            <option value="archived">{isAr ? 'أرشفة' : 'Archived'}</option>
                          </select>
                        </td>

                        <td className="py-4 px-5">
                          <div className="flex items-center justify-center gap-2">
                            {cleanPhone && (
                              <button
                                onClick={() => setWhatsAppModalLead(lead)}
                                className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all"
                                title="WhatsApp"
                              >
                                <Phone size={14} />
                              </button>
                            )}

                            <a
                              href={`mailto:${lead.email}?subject=${encodeURIComponent('The Social Club - Project Discussion')}`}
                              className="w-8 h-8 rounded-xl bg-[#1E1E1E]/5 dark:bg-white/10 text-[#1E1E1E] dark:text-white hover:bg-[#A78BFA] hover:text-[#1E1E1E] flex items-center justify-center transition-all"
                              title="Email"
                            >
                              <Mail size={14} />
                            </a>

                            <button
                              onClick={() => {
                                setSelectedLead(lead);
                                setLeadNotes(lead.notes || '');
                              }}
                              className="w-8 h-8 rounded-xl bg-[#A78BFA]/15 text-[#A78BFA] hover:bg-[#A78BFA] hover:text-[#1E1E1E] flex items-center justify-center transition-all"
                              title={isAr ? 'عرض الملاحظات' : 'View & Notes'}
                            >
                              <Eye size={14} />
                            </button>

                            <button
                              onClick={() => handleDelete(lead.id)}
                              className="w-8 h-8 rounded-xl text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/10 flex items-center justify-center transition-all"
                              title={isAr ? 'حذف' : 'Delete'}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
          </>
        )}
      </div>

      {/* =================== MODAL: LEAD DETAILS & INTERNAL NOTES =================== */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-lg rounded-3xl p-6 sm:p-7 border border-[#1E1E1E]/10 dark:border-white/10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 text-[#1E1E1E]/40 dark:text-white/40 hover:text-[#1E1E1E] dark:hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#A78BFA] to-[#FF8FB1] text-white flex items-center justify-center font-black text-lg shadow-sm">
                {selectedLead.name[0]}
              </div>
              <div>
                <h3 className="text-lg font-black">{selectedLead.name}</h3>
                <p className="text-xs text-[#1E1E1E]/50 dark:text-white/50">{selectedLead.company || 'Direct Founder / Client'}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#F8F4EE] dark:bg-[#121212]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#1E1E1E]/40 dark:text-white/40 block mb-1">
                    {isAr ? 'البريد' : 'Email'}
                  </span>
                  <a href={`mailto:${selectedLead.email}`} className="font-bold text-[#A78BFA] hover:underline break-all">
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#1E1E1E]/40 dark:text-white/40 block mb-1">
                    {isAr ? 'الهاتف' : 'Phone'}
                  </span>
                  <span className="font-bold">{selectedLead.phone || '-'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#1E1E1E]/40 dark:text-white/40 block mb-1">
                    {isAr ? 'الخدمة المطلوبة' : 'Service'}
                  </span>
                  <span className="font-bold capitalize">{selectedLead.service}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#1E1E1E]/40 dark:text-white/40 block mb-1">
                    {isAr ? 'الميزانية المتوقعة' : 'Budget'}
                  </span>
                  <span className="font-bold">{selectedLead.budget || '-'}</span>
                </div>
              </div>

              {/* Project Details from Client */}
              <div>
                <span className="text-[11px] font-bold text-[#1E1E1E]/70 dark:text-white/70 block mb-1.5">
                  {isAr ? 'تفاصيل وأهداف المشروع من العميل:' : 'Project Details from Client:'}
                </span>
                <div className="p-4 rounded-2xl bg-[#F8F4EE] dark:bg-[#121212] leading-relaxed text-[#1E1E1E]/80 dark:text-white/80 whitespace-pre-wrap font-medium">
                  {selectedLead.projectDetails}
                </div>
              </div>

              {/* Internal Notes by Agency Owner */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-black text-[#A78BFA] flex items-center gap-1.5">
                    <FileText size={13} />
                    {isAr ? 'سجل الملاحظات الداخلية الخاصة بك (Private Notes):' : 'Internal Agency Notes:'}
                  </span>
                  {notesSaved && (
                    <span className="text-[10px] font-bold text-emerald-500 animate-fade-in">
                      {isAr ? '✓ تم الحفظ' : '✓ Saved'}
                    </span>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  placeholder={isAr ? 'اكتب ملاحظاتك هنا (مثلاً: تم الاتفاق على اجتماع يوم الثلاثاء، مهتم بباقة الـ Scale...)' : 'Write internal follow-up notes here...'}
                  className="w-full p-3 rounded-2xl bg-[#F8F4EE] dark:bg-[#121212] border border-[#1E1E1E]/10 dark:border-white/10 focus:outline-none focus:border-[#A78BFA] text-[#1E1E1E] dark:text-white text-xs"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="mt-2 px-4 py-2 rounded-xl bg-[#1E1E1E] dark:bg-white text-white dark:text-[#121212] font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition-all"
                >
                  <Save size={13} />
                  <span>{isAr ? 'حفظ الملاحظات' : 'Save Notes'}</span>
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 pt-4 border-t border-[#1E1E1E]/6 dark:border-white/8">
              {selectedLead.phone && (
                <button
                  onClick={() => {
                    const l = selectedLead;
                    setSelectedLead(null);
                    setWhatsAppModalLead(l);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                >
                  <Phone size={14} />
                  <span>{isAr ? 'محادثة واتساب سريعة' : 'WhatsApp'}</span>
                </button>
              )}
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2.5 rounded-xl bg-[#1E1E1E]/5 dark:bg-white/10 font-bold text-xs"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================== MODAL: WHATSAPP TEMPLATE PICKER =================== */}
      {whatsAppModalLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-3xl p-6 border border-[#1E1E1E]/10 dark:border-white/10 shadow-2xl relative">
            <button
              onClick={() => setWhatsAppModalLead(null)}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 text-[#1E1E1E]/40 dark:text-white/40"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="text-base font-black">
                  {isAr ? 'اختر قالب رسالة الواتساب' : 'Choose WhatsApp Template'}
                </h3>
                <p className="text-xs text-[#1E1E1E]/50 dark:text-white/50">
                  {isAr ? `إلى: ${whatsAppModalLead.name}` : `To: ${whatsAppModalLead.name}`}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 1,
                  titleAr: '1. ترحيب وتأكيد استلام الطلب 👋',
                  titleEn: '1. Welcome & Inquiry Confirmation 👋',
                  descAr: 'رسالة ودية ترحب بالعميل وتؤكد استلام طلبه ومستعدة لبدء النقاش.',
                  descEn: 'Friendly intro confirming their inquiry and proposing next steps.',
                },
                {
                  id: 2,
                  titleAr: '2. دعوة لحجز مكالمة استشارية 📞',
                  titleEn: '2. Strategy Call Invite 📞',
                  descAr: 'اقتراح موعد مكالمة زووم أو تليفون لمراجعة خطة العمل والأرقام.',
                  descEn: 'Invitation for a 15-min strategy call to align on growth milestones.',
                },
                {
                  id: 3,
                  titleAr: '3. إرسال عرض الأسعار والباقة 💰',
                  titleEn: '3. Pricing & Proposal Delivery 💰',
                  descAr: 'رسالة إرسال عرض الباقة المقترحة والخدمات المشمولة.',
                  descEn: 'Sharing tailored growth package pricing and key deliverables.',
                },
              ].map((template) => (
                <a
                  key={template.id}
                  href={getWhatsAppUrl(whatsAppModalLead.phone || '', whatsAppModalLead, template.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setWhatsAppModalLead(null)}
                  className="p-3.5 rounded-2xl bg-[#F8F4EE] dark:bg-[#141414] hover:bg-emerald-500/10 border border-[#1E1E1E]/6 dark:border-white/6 hover:border-emerald-500/30 transition-all block group text-start"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-[#1E1E1E] dark:text-white group-hover:text-emerald-500 transition-colors">
                      {isAr ? template.titleAr : template.titleEn}
                    </span>
                    <Send size={12} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[11px] text-[#1E1E1E]/60 dark:text-white/60">
                    {isAr ? template.descAr : template.descEn}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================== MODAL: ADD MANUAL LEAD =================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-lg rounded-3xl p-6 sm:p-7 border border-[#1E1E1E]/10 dark:border-white/10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 text-[#1E1E1E]/40 dark:text-white/40"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <h3 className="text-lg font-black">
                {isAr ? 'إضافة عميل جديد يدوياً' : 'Add New Client Lead'}
              </h3>
              <p className="text-xs text-[#1E1E1E]/50 dark:text-white/50">
                {isAr ? 'تسجيل عميل تواصل معك مباشرة عبر الهاتف أو إنستغرام' : 'Log a deal or referral received outside the website'}
              </p>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#1E1E1E]/70 dark:text-white/70 mb-1">
                  {isAr ? 'اسم العميل *' : 'Client Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  placeholder={isAr ? 'مثال: محمد الشريف' : 'e.g. John Smith'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F4EE] dark:bg-[#121212] border border-[#1E1E1E]/10 dark:border-white/10 focus:outline-none focus:border-[#A78BFA] text-[#1E1E1E] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1E1E1E]/70 dark:text-white/70 mb-1">
                    {isAr ? 'اسم الشركة / المشروع' : 'Company Name'}
                  </label>
                  <input
                    type="text"
                    value={newLeadForm.company}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                    placeholder={isAr ? 'مثال: Aura Fashion' : 'e.g. Acme Corp'}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F4EE] dark:bg-[#121212] border border-[#1E1E1E]/10 dark:border-white/10 focus:outline-none focus:border-[#A78BFA] text-[#1E1E1E] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1E1E1E]/70 dark:text-white/70 mb-1">
                    {isAr ? 'رقم الواتساب / الهاتف' : 'Phone / WhatsApp'}
                  </label>
                  <input
                    type="text"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    placeholder="+201012345678"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F4EE] dark:bg-[#121212] border border-[#1E1E1E]/10 dark:border-white/10 focus:outline-none focus:border-[#A78BFA] text-[#1E1E1E] dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1E1E1E]/70 dark:text-white/70 mb-1">
                    {isAr ? 'الخدمة المطلوبة' : 'Service'}
                  </label>
                  <select
                    value={newLeadForm.service}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F4EE] dark:bg-[#121212] border border-[#1E1E1E]/10 dark:border-white/10 focus:outline-none focus:border-[#A78BFA] text-[#1E1E1E] dark:text-white"
                  >
                    <option value="digital-marketing">{isAr ? 'تسويق رقمي وإعلانات' : 'Digital Marketing'}</option>
                    <option value="web-development">{isAr ? 'تطوير وبرمجة موقع' : 'Web Development'}</option>
                    <option value="lead-generation">{isAr ? 'جلب عملاء (Lead Gen)' : 'Lead Generation'}</option>
                    <option value="full-growth">{isAr ? 'باقة النمو المتكاملة' : 'Full Growth Engine'}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#1E1E1E]/70 dark:text-white/70 mb-1">
                    {isAr ? 'الميزانية المتوقعة' : 'Budget'}
                  </label>
                  <select
                    value={newLeadForm.budget}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, budget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F4EE] dark:bg-[#121212] border border-[#1E1E1E]/10 dark:border-white/10 focus:outline-none focus:border-[#A78BFA] text-[#1E1E1E] dark:text-white"
                  >
                    <option value="$1,000 – $2,500">$1,000 – $2,500</option>
                    <option value="$2,500 – $5,000+">$2,500 – $5,000+</option>
                    <option value="Under $1,000">{isAr ? 'أقل من $1,000' : 'Under $1,000'}</option>
                    <option value="Enterprise Custom">{isAr ? 'ميزانية مفتوحة (Custom)' : 'Custom Enterprise'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1E1E1E]/70 dark:text-white/70 mb-1">
                  {isAr ? 'ملاحظات أولية عن العميل' : 'Project Details / Notes'}
                </label>
                <textarea
                  rows={2}
                  value={newLeadForm.projectDetails}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, projectDetails: e.target.value })}
                  placeholder={isAr ? 'اكتب ما طلبه العميل أو تفاصيل الاتفاق...' : 'Write initial notes or client requests...'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F4EE] dark:bg-[#121212] border border-[#1E1E1E]/10 dark:border-white/10 focus:outline-none focus:border-[#A78BFA] text-[#1E1E1E] dark:text-white"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#1E1E1E]/5 dark:bg-white/10 font-bold"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#A78BFA] text-[#1E1E1E] font-black shadow-md shadow-[#A78BFA]/20"
                >
                  {isAr ? 'حفظ العميل في المنظومة' : 'Save Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
