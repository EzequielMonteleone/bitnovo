import {produce} from 'immer';
import {create} from 'zustand';

import {CurrencyOption, PaymentCurrency} from '@/types/payments';

type CurrencyStore = {
  fiat: PaymentCurrency;
  options: CurrencyOption[];
  setFiat: (fiat: PaymentCurrency) => void;
};

const defaultCurrencyOptions: CurrencyOption[] = [
  {label: 'Euro', value: 'EUR', symbol: '€'},
  {label: 'Dólar Estadounidense', value: 'USD', symbol: '$'},
  {label: 'Libra Esterlina', value: 'GBP', symbol: '£'},
];

export const useCurrencyStore = create<CurrencyStore>(set => ({
  fiat: 'EUR',
  options: defaultCurrencyOptions,
  setFiat: fiat =>
    set(
      produce(draft => {
        draft.fiat = fiat;
      }),
    ),
}));
