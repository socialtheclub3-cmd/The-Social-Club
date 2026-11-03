import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { defaultCaseStudies } from '../data/caseStudyData';
import type { StorableCaseStudy } from '../data/caseStudyData';

export type { StorableCaseStudy };
export { defaultCaseStudies };

const STORAGE_KEY = 'tsc_case_studies';

export const caseStudyService = {
  // Local storage fallback
  getStudiesLocal: (): StorableCaseStudy[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return defaultCaseStudies;
      const parsed: StorableCaseStudy[] = JSON.parse(data);
      return parsed.length > 0 ? parsed : defaultCaseStudies;
    } catch {
      return defaultCaseStudies;
    }
  },

  // Subscribe to real-time changes
  subscribe: (callback: (studies: StorableCaseStudy[]) => void): (() => void) => {
    // Deliver local studies immediately so the page is NEVER blank
    const localStudies = caseStudyService.getStudiesLocal();
    callback(localStudies);

    const updateFromLocal = () => callback(caseStudyService.getStudiesLocal());
    window.addEventListener('tsc_casestudies_updated', updateFromLocal);

    if (db) {
      const unsubscribe = onSnapshot(
        collection(db, 'case_studies'),
        (snapshot) => {
          let studies = snapshot.docs.map((d) => ({ ...d.data(), id: d.id } as StorableCaseStudy));

          // If Firestore is empty, use local/defaults and seed them
          if (studies.length === 0) {
            studies = caseStudyService.getStudiesLocal();
            studies.forEach((s) => {
              setDoc(doc(db!, 'case_studies', s.id), s).catch(() => {});
            });
          } else {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(studies));
          }

          studies.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
          callback(studies);
        },
        () => {
          callback(caseStudyService.getStudiesLocal());
        }
      );
      return () => {
        unsubscribe();
        window.removeEventListener('tsc_casestudies_updated', updateFromLocal);
      };
    }

    return () => window.removeEventListener('tsc_casestudies_updated', updateFromLocal);
  },

  saveStudy: async (study: StorableCaseStudy): Promise<StorableCaseStudy> => {
    // Always save locally first so UI updates immediately even if Firestore permissions are restricted
    const studies = caseStudyService.getStudiesLocal();
    const existingIdx = studies.findIndex((s) => s.id === study.id);
    if (existingIdx >= 0) {
      studies[existingIdx] = study;
    } else {
      studies.push(study);
    }
    studies.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(studies));
    window.dispatchEvent(new Event('tsc_casestudies_updated'));

    if (db) {
      try {
        await setDoc(doc(db!, 'case_studies', study.id), study);
      } catch {
        // Fallback already saved in localStorage
      }
    }
    return study;
  },

  deleteStudy: async (id: string): Promise<void> => {
    const studies = caseStudyService.getStudiesLocal();
    const filtered = studies.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event('tsc_casestudies_updated'));

    if (db) {
      try {
        await deleteDoc(doc(db!, 'case_studies', id));
      } catch {
        // Fallback already updated in localStorage
      }
    }
  },
};
