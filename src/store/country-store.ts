import {produce} from 'immer';
import {create} from 'zustand';

export type Country = {
  name: string;
  dialCode: string;
  code: string;
};

type CountryStore = {
  selectedCountry: Country;
  options: Country[];
  setSelectedCountry: (country: Country) => void;
};

const defaultCountryOptions: Country[] = [
  {name: 'España', dialCode: '+34', code: 'ES'},
  {name: 'Equatorial Guinea', dialCode: '+240', code: 'GQ'},
  {name: 'Grecia', dialCode: '+30', code: 'GR'},
  {name: 'South Georgia and the S...', dialCode: '+500', code: 'GS'},
  {name: 'Guatemala', dialCode: '+502', code: 'GT'},
  {name: 'Guyana', dialCode: '+592', code: 'GY'},
  {name: 'Hong Kong', dialCode: '+852', code: 'HK'},
  {name: 'Honduras', dialCode: '+504', code: 'HN'},
];

export const useCountryStore = create<CountryStore>(set => ({
  selectedCountry: defaultCountryOptions[0],
  options: defaultCountryOptions,
  setSelectedCountry: country =>
    set(
      produce(draft => {
        draft.selectedCountry = country;
      }),
    ),
}));
