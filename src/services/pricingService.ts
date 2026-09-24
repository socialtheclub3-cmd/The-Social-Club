import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export interface PricingConfig {
  starter: {
    monthly: number | 'Custom';
    quarterly: number | 'Custom';
  };
  scale: {
    monthly: number | 'Custom';
    quarterly: number | 'Custom';
  };
  enterprise: {
    monthly: number | 'Custom';
    quarterly: number | 'Custom';
  };
}

const defaultPricing: PricingConfig = {
  starter: {
    monthly: 1200,
    quarterly: 990,
  },
  scale: {
    monthly: 2800,
    quarterly: 2350,
  },
  enterprise: {
    monthly: 'Custom',
    quarterly: 'Custom',
  },
};

const STORAGE_KEY = 'tsc_pricing_config';
const DOC_ID = 'main_config';

export const pricingService = {
  getPricingLocal: (): PricingConfig => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse pricing', e);
    }
    return defaultPricing;
  },

  // Added for synchronous initial load
  getPricing: (): PricingConfig => {
    return pricingService.getPricingLocal();
  },

  subscribe: (callback: (config: PricingConfig) => void): (() => void) => {
    if (db) {
      const unsubscribe = onSnapshot(doc(db, 'pricing', DOC_ID), (snapshot) => {
        if (snapshot.exists()) {
          callback(snapshot.data() as PricingConfig);
        } else {
          callback(defaultPricing);
        }
      });
      return unsubscribe;
    } else {
      const update = () => callback(pricingService.getPricingLocal());
      window.addEventListener('pricing_updated', update);
      update();
      return () => window.removeEventListener('pricing_updated', update);
    }
  },

  updatePricing: async (newPricing: PricingConfig): Promise<void> => {
    if (db) {
      await setDoc(doc(db, 'pricing', DOC_ID), newPricing);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPricing));
      window.dispatchEvent(new Event('pricing_updated'));
    }
  },
};
