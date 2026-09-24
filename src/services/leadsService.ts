import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export type LeadStatus = 'new' | 'contacted' | 'meeting' | 'won' | 'archived';

export interface Lead {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service: string;
  budget?: string;
  projectDetails: string;
  createdAt: string;
  status: LeadStatus;
  notes?: string;
}

const STORAGE_KEY = 'tsc_leads_database';

export const leadsService = {
  // Local storage fallback
  getLeadsLocal: (): Lead[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed: Lead[] = JSON.parse(data);
      return parsed.filter((l) => !l.id.startsWith('lead_demo_'));
    } catch (e) {
      return [];
    }
  },

  // Subscribe to real-time changes
  subscribe: (callback: (leads: Lead[]) => void): (() => void) => {
    if (db) {
      const unsubscribe = onSnapshot(collection(db, 'leads'), (snapshot) => {
        const leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead));
        leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        callback(leads);
      }, (error) => {
        console.error("Firestore subscription error:", error);
      });
      return unsubscribe;
    } else {
      const update = () => callback(leadsService.getLeadsLocal());
      window.addEventListener('tsc_leads_updated', update);
      update();
      return () => window.removeEventListener('tsc_leads_updated', update);
    }
  },

  saveLead: async (data: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<Lead> => {
    const newLead: Lead = {
      ...data,
      id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    if (db) {
      try {
        await setDoc(doc(db, 'leads', newLead.id), newLead);
      } catch (e) {
        console.error("Error saving to Firestore", e);
      }
    } else {
      const leads = leadsService.getLeadsLocal();
      leads.unshift(newLead);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
      window.dispatchEvent(new Event('tsc_leads_updated'));
    }
    return newLead;
  },

  updateLeadStatus: async (id: string, status: LeadStatus): Promise<void> => {
    if (db) {
      await updateDoc(doc(db, 'leads', id), { status });
    } else {
      const leads = leadsService.getLeadsLocal();
      const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('tsc_leads_updated'));
    }
  },

  updateLeadNotes: async (id: string, notes: string): Promise<void> => {
    if (db) {
      await updateDoc(doc(db, 'leads', id), { notes });
    } else {
      const leads = leadsService.getLeadsLocal();
      const updated = leads.map((l) => (l.id === id ? { ...l, notes } : l));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('tsc_leads_updated'));
    }
  },

  deleteLead: async (id: string): Promise<void> => {
    if (db) {
      await deleteDoc(doc(db, 'leads', id));
    } else {
      const leads = leadsService.getLeadsLocal();
      const filtered = leads.filter((l) => l.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new Event('tsc_leads_updated'));
    }
  },

  clearAllLeads: async (): Promise<void> => {
    if (db) {
      const snapshot = await getDocs(collection(db, 'leads'));
      snapshot.forEach((d) => deleteDoc(doc(db!, 'leads', d.id)));
    } else {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('tsc_leads_updated'));
    }
  },

  exportToCSV: (leads: Lead[]): void => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Date', 'Status', 'Name', 'Company', 'Email', 'Phone', 'Service', 'Budget', 'Project Details'];
    const rows = leads.map((l) => [
      l.id,
      new Date(l.createdAt).toLocaleString(),
      l.status,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${(l.budget || '').replace(/"/g, '""')}"`,
      `"${(l.projectDetails || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `the_social_club_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
