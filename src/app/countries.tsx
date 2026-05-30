import BasicHeader from '@/components/headers/basicHeader';
import {ThemedView} from '@/components/themed-view';
import SearchComponent, {SearchItem} from '@/components/ui/search';
import {Spacing} from '@/constants/theme';
import {useCountryStore} from '@/store/country-store';
import {useRouter} from 'expo-router';
import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

const Countries = () => {
  const {t} = useTranslation();
  const router = useRouter();
  const countryOptions = useCountryStore(state => state.options);
  const selectedCountry = useCountryStore(state => state.selectedCountry);
  const setSelectedCountry = useCountryStore(state => state.setSelectedCountry);

  const itemsTransformed = useMemo(
    () =>
      countryOptions.map(option => ({
        label: option.dialCode,
        value: option.name,
        selected: option.code === selectedCountry.code,
      })),
    [countryOptions, selectedCountry],
  );

  const handleSelect = useCallback(
    (item: SearchItem) => {
      const foundCountry = countryOptions.find(c => c.name === item.value);
      if (foundCountry) {
        setSelectedCountry(foundCountry);
      }
      router.back();
    },
    [countryOptions, router, setSelectedCountry],
  );

  return (
    <ThemedView style={styles.container}>
      <BasicHeader title={t('countries.select')} />
      <ThemedView style={styles.body}>
        <SearchComponent items={itemsTransformed} onSelect={handleSelect} />
      </ThemedView>
    </ThemedView>
  );
};

export default Countries;

const styles = StyleSheet.create({
  container: {flex: 1},
  body: {padding: Spacing.three},
});
