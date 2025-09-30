import { Currency } from "@/stores/useSettingsStore";

// Base rates relative to EUR (as of 2024)
const BASE_RATES: Record<Currency, number> = {
  EUR: 1.0,
  USD: 1.08,
  GBP: 0.85,
  CHF: 0.96
};

export const convertCurrency = (
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number => {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert from source currency to EUR, then to target currency
  const euroAmount = amount / BASE_RATES[fromCurrency];
  const targetAmount = euroAmount * BASE_RATES[toCurrency];
  
  return Math.round(targetAmount * 100) / 100; // Round to 2 decimal places
};

export const getExchangeRate = (fromCurrency: Currency, toCurrency: Currency): number => {
  if (fromCurrency === toCurrency) return 1;
  return BASE_RATES[toCurrency] / BASE_RATES[fromCurrency];
};