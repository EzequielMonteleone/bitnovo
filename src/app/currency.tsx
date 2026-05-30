import BasicHeader from '@/components/headers/basicHeader';
import {ThemedView} from '@/components/themed-view';
import SearchComponent, {SearchItem} from '@/components/ui/search';
import {Spacing} from '@/constants/theme';
import {useCurrencyStore} from '@/store/currency-store';
import {PaymentCurrency} from '@/types/payments';
import {useRouter} from 'expo-router';
import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

const Currency = () => {
  const {t} = useTranslation();
  const router = useRouter();
  const currencyOptions = useCurrencyStore(state => state.options);
  const selectedCurrency = useCurrencyStore(state => state.fiat);
  const setFiat = useCurrencyStore(state => state.setFiat);

  const itemsTransformed = useMemo(
    () =>
      currencyOptions.map(option => ({
        label: option.label,
        value: option.value,
        selected: option.value === selectedCurrency,
      })),
    [currencyOptions, selectedCurrency],
  );

  const handleSelect = useCallback(
    (item: SearchItem) => {
      setFiat(item.value as PaymentCurrency);
      router.back();
    },
    [router, setFiat],
  );

  return (
    <ThemedView style={styles.container}>
      <BasicHeader title={t('currency.select')} />
      <ThemedView style={styles.body}>
        <SearchComponent items={itemsTransformed} onSelect={handleSelect} />
      </ThemedView>
    </ThemedView>
  );
};

export default Currency;

const styles = StyleSheet.create({
  container: {flex: 1},
  body: {padding: Spacing.three},
});
