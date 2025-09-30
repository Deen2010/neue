import { useEffect } from 'react';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useStore } from '@/stores/useStore';

export const useCurrencyConverter = () => {
  const { currency, previousCurrency } = useSettingsStore();
  const { convertAllPrices } = useStore();

  useEffect(() => {
    if (previousCurrency && previousCurrency !== currency) {
      convertAllPrices(currency, previousCurrency);
    }
  }, [currency, previousCurrency, convertAllPrices]);
};