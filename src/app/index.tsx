import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {useRouter} from 'expo-router';
import {useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, TextInput} from 'react-native';

import {createPayment} from '@/api/payments';
import CurrencyHeader from '@/components/headers/currencyHeader';
import {ThemedText} from '@/components/themed-text';
import {ThemedView} from '@/components/themed-view';
import {Button} from '@/components/ui/button';
import {Spacing} from '@/constants/theme';
import {useCurrencyStore} from '@/store/currency-store';
import {CreatePaymentPayload, OrderResponse} from '@/types/payments';

const NOTES_MAX_LENGTH = 140;

export default function CreatePaymentScreen() {
  const router = useRouter();
  const {t} = useTranslation();
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const fiat = useCurrencyStore(state => state.fiat);
  const currencyOptions = useCurrencyStore(state => state.options);
  const currencySymbol = useMemo(
    () => currencyOptions.find(option => option.value === fiat)?.symbol ?? fiat,
    [currencyOptions, fiat],
  );
  const mutation = useMutation<
    AxiosResponse<OrderResponse>,
    Error,
    CreatePaymentPayload
  >({
    mutationFn: createPayment,
    onSuccess: response => {
      const data = response.data;
      router.replace({
        pathname: '/share',
        params: {
          identifier: data.identifier,
          web_url: data.web_url,
          amount,
          fiat,
        },
      });
    },
  });

  const parsedAmount = useMemo(
    () => Number(amount.replace(',', '.')),
    [amount],
  );
  const canSubmit = useMemo(
    () => parsedAmount > 0 && notes.trim().length > 0,
    [parsedAmount, notes],
  );

  const handleSubmit = useCallback(() => {
    if (!canSubmit) {
      return;
    }

    mutation.mutate({
      expected_output_amount: parsedAmount,
      fiat,
      notes: notes.trim(),
    });
  }, [canSubmit, fiat, mutation, notes, parsedAmount]);

  return (
    <ThemedView style={styles.container}>
      <CurrencyHeader title={t('create.title')} />
      <ScrollView contentContainerStyle={styles.body}>
        <ThemedView style={styles.body}>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder={`0.00 ${currencySymbol}`}
            keyboardType="decimal-pad"
            placeholderTextColor="#002859"
          />

          <ThemedView style={styles.card}>
            <ThemedText type="smallBold">{t('create.concept')}</ThemedText>
            <ThemedView style={styles.containerInput}>
              <TextInput
                style={styles.notesInput}
                value={notes}
                onChangeText={setNotes}
                placeholder={t('create.notesPlaceholder')}
                placeholderTextColor="#9CA3AF"
                maxLength={NOTES_MAX_LENGTH}
                multiline
              />
            </ThemedView>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={styles.notesCounter}>
              {t('create.notesCounter', {
                count: notes.length,
                max: NOTES_MAX_LENGTH,
              })}
            </ThemedText>
          </ThemedView>

          {mutation.error && (
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={styles.errorText}>
              {t('error.createPayment')}
            </ThemedText>
          )}
        </ThemedView>
        <Button
          style={[
            styles.submitButton,
            (!canSubmit || mutation.isPending) && styles.disabledButton,
          ]}
          disabled={!canSubmit || mutation.isPending}
          loading={mutation.isPending}
          onPress={handleSubmit}>
          {mutation.isPending ? t('button.creating') : t('button.continue')}
        </Button>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  body: {flex: 1},
  card: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  amountInput: {
    fontSize: 40,
    fontWeight: '700',
    paddingVertical: Spacing.two,
    alignSelf: 'center',
    marginTop: Spacing.five,
    color: '#002859',
  },
  notesInput: {
    paddingVertical: Spacing.two,
    fontSize: 16,
    minHeight: 84,
    textAlignVertical: 'top',
  },
  notesCounter: {
    alignSelf: 'flex-end',
    marginTop: -Spacing.two,
  },
  errorText: {
    color: '#B91C1C',
    marginHorizontal: Spacing.three,
  },
  submitButton: {
    paddingVertical: Spacing.four,
    marginHorizontal: Spacing.three,
  },
  disabledButton: {
    opacity: 0.5,
  },
  containerInput: {
    padding: 8,
    borderRadius: 8,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
});
