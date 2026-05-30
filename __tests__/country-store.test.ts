import {Country, useCountryStore} from '@/store/country-store';

describe('useCountryStore', () => {
  beforeEach(() => {
    const [defaultCountry] = useCountryStore.getState().options;
    useCountryStore.setState({selectedCountry: defaultCountry});
  });

  it('starts with Spain selected and the configured country options', () => {
    const state = useCountryStore.getState();

    expect(state.selectedCountry).toEqual({
      name: 'España',
      dialCode: '+34',
      code: 'ES',
    });
    expect(state.options).toHaveLength(8);
    expect(state.options).toContainEqual({
      name: 'Guatemala',
      dialCode: '+502',
      code: 'GT',
    });
  });

  it('updates the selected country', () => {
    const country: Country = {
      name: 'Grecia',
      dialCode: '+30',
      code: 'GR',
    };

    useCountryStore.getState().setSelectedCountry(country);

    expect(useCountryStore.getState().selectedCountry).toEqual(country);
  });
});
