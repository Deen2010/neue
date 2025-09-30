import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';
export type Currency = 'EUR' | 'USD' | 'GBP' | 'CHF';

interface SettingsState {
  theme: Theme;
  currency: Currency;
  setTheme: (theme: Theme) => void;
  setCurrency: (currency: Currency) => void;
  previousCurrency?: Currency;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      currency: 'EUR',
      setTheme: (theme) => set({ theme }),
      setCurrency: (currency) => {
        const currentState = get();
        set({ 
          previousCurrency: currentState.currency,
          currency 
        });
      },
    }),
    {
      name: 'resale-hub-settings',
      version: 1
    }
  )
);