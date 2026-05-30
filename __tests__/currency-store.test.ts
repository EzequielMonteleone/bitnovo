import {useCurrencyStore} from '@/store/currency-store';

describe('useCurrencyStore', () => {
  beforeEach(() => {
    useCurrencyStore.setState({fiat: 'EUR'});
  });

  it('starts with EUR and the supported currency options', () => {
    const state = useCurrencyStore.getState();

    expect(state.fiat).toBe('EUR');
    expect(state.options).toEqual([
      {label: 'Euro', value: 'EUR', symbol: '€'},
      {label: 'Dólar Estadounidense', value: 'USD', symbol: '$'},
      {label: 'Libra Esterlina', value: 'GBP', symbol: '£'},
    ]);
  });

  it('updates the selected fiat currency', () => {
    useCurrencyStore.getState().setFiat('USD');

    expect(useCurrencyStore.getState().fiat).toBe('USD');
  });
});
