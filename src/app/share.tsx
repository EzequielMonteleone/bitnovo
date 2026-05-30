import {useLocalSearchParams, useRouter} from 'expo-router';
import {useCallback, useMemo, useState} from 'react';
import {
  Alert,
  Linking,
  Pressable,
  Share,
  StyleSheet,
  TextInput,
} from 'react-native';

import {
  SvgArrowDown,
  SvgExport,
  SvgLink,
  SvgMoneyTime,
  SvgScanBarCode,
  SvgSms,
  SvgWhatsapp,
} from '@/assets';
import {ThemedText} from '@/components/themed-text';
import {ThemedView} from '@/components/themed-view';
import {Button} from '@/components/ui/button';
import {Spacing} from '@/constants/theme';
import {useCountryStore} from '@/store/country-store';
import {useCurrencyStore} from '@/store/currency-store';
import {PaymentCurrency} from '@/types/payments';
import {useTranslation} from 'react-i18next';

const ShareScreen = () => {
  const router = useRouter();
  const {t} = useTranslation();
  const selectedCountry = useCountryStore(state => state.selectedCountry);
  const params = useLocalSearchParams();
  const identifier = params.identifier as string | undefined;
  const webUrl = params.web_url
    ? decodeURIComponent(params.web_url as string)
    : '';
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const amount = params.amount;
  const fiat = params.fiat;
  const currencyOptions = useCurrencyStore(state => state.options);
  const currencySymbol = useMemo(
    () =>
      currencyOptions.find(option => option.value === (fiat as PaymentCurrency))
        ?.symbol ?? fiat,
    [currencyOptions, fiat],
  );

  const message = useMemo(
    () => t('share.message', {amount, fiat, url: webUrl}),
    [t, amount, fiat, webUrl],
  );

  const openWhatsApp = useCallback(async () => {
    const cleanDialCode = selectedCountry.dialCode.replace(/[^\d]/g, '');
    const cleanNumber = whatsappNumber.replace(/[^\d]/g, '');
    const fullPhone = `${cleanDialCode}${cleanNumber}`;
    const url = `whatsapp://send?phone=${fullPhone}&text=${encodeURIComponent(message)}`;
    await Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Failed to open WhatsApp');
    });
  }, [message, selectedCountry.dialCode, whatsappNumber]);

  const openEmail = useCallback(async () => {
    const url = `mailto:?subject=${encodeURIComponent(t('share.emailSubject'))}&body=${encodeURIComponent(message)}`;
    await Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Failed to open email');
    });
  }, [message, t]);

  const shareLink = useCallback(async () => {
    await Share.share({message}).catch(() => {
      Alert.alert('Error', 'Failed to share link');
    });
  }, [message]);

  const handleViewQr = useCallback(() => {
    router.push({
      pathname: '/qr',
      params: {
        identifier,
        web_url: webUrl,
        amount,
        fiat,
        symbol: currencySymbol,
      },
    } as any);
  }, [amount, currencySymbol, fiat, identifier, router, webUrl]);

  const handleOnSelectCountry = useCallback(() => {
    router.push('/countries');
  }, [router]);

  const handleOnPressReset = useCallback(() => {
    router.replace('/');
  }, [router]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <ThemedView style={styles.header}>
          <SvgMoneyTime />
          <ThemedView>
            <ThemedText themeColor="textSecondary" type="small">
              {t('share.requestSubject')}
            </ThemedText>
            <ThemedText type="subtitle" themeColor="text">
              {`${amount} ${currencySymbol}`}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedText themeColor="textSecondary" type="small">
          {t('share.shareMessage')}
        </ThemedText>
      </ThemedView>
      {/* Link and QR code section */}
      <ThemedView style={styles.linksContainer}>
        <Pressable style={styles.linkPressableContainer} onPress={handleViewQr}>
          <ThemedView style={styles.linkContainer}>
            <SvgLink />
            <ThemedText
              style={styles.linkText}
              themeColor="primary"
              type="small">
              {webUrl}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.barCodeContainer}>
            <SvgScanBarCode />
          </ThemedView>
        </Pressable>
        {/* Link email */}
        <Pressable style={styles.linkPressableContainer} onPress={openEmail}>
          <ThemedView style={styles.linkContainer}>
            <SvgSms />
            <ThemedText
              style={styles.linkText}
              themeColor="primary"
              type="small">
              {t('share.emailMessage')}
            </ThemedText>
          </ThemedView>
        </Pressable>
        {/* Link whatsapp */}
        <ThemedView style={styles.linkContainerWhasapp}>
          <SvgWhatsapp />
          <Pressable
            style={styles.countrySelector}
            onPress={handleOnSelectCountry}>
            <ThemedText themeColor="primary" type="small">
              {selectedCountry.dialCode}
            </ThemedText>
            <SvgArrowDown />
          </Pressable>
          <TextInput
            style={styles.inputNumber}
            keyboardType="phone-pad"
            placeholder={t('share.whatsappNumber')}
            value={whatsappNumber}
            maxLength={10}
            onChangeText={setWhatsappNumber}
          />
          <Pressable
            style={[
              styles.whatsappSendButton,
              !whatsappNumber.length && styles.whatsappSendButtonDisabled,
            ]}
            disabled={!whatsappNumber.length}
            onPress={openWhatsApp}>
            <ThemedText type="smallBold" style={styles.whatsappSendText}>
              {t('common.send')}
            </ThemedText>
          </Pressable>
        </ThemedView>
        {/* Share link */}
        <Pressable style={styles.linkPressableContainer} onPress={shareLink}>
          <ThemedView style={styles.linkContainer}>
            <SvgExport />
            <ThemedText
              style={styles.linkText}
              themeColor="primary"
              type="small">
              {t('share.shareOtherPlatforms')}
            </ThemedText>
          </ThemedView>
        </Pressable>
      </ThemedView>
      <Button
        variant="outline"
        rightIcon={<SvgExport />}
        onPress={handleOnPressReset}>
        {t('success.newRequest')}
      </Button>
    </ThemedView>
  );
};

export default ShareScreen;

const styles = StyleSheet.create({
  inputNumber: {flex: 1},
  whatsappSendButton: {
    backgroundColor: '#0F4BFF',
    borderRadius: 8,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  whatsappSendButtonDisabled: {
    opacity: 0.5,
  },
  whatsappSendText: {
    color: '#FFFFFF',
  },
  linksContainer: {
    gap: Spacing.three,
    flex: 1,
  },
  linkPressableContainer: {flexDirection: 'row'},
  linkContainerWhasapp: {
    flexDirection: 'row',
    borderRadius: 8,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    borderWidth: 1,
    padding: Spacing.three,
  },
  linkContainer: {
    flexDirection: 'row',
    padding: Spacing.three,
    borderRadius: 8,
    flex: 1,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  linkText: {flex: 1, marginHorizontal: Spacing.two},
  countrySelector: {
    flexDirection: 'row',
    gap: Spacing.one,
    alignItems: 'center',
    marginHorizontal: Spacing.two,
  },
  barCodeContainer: {
    backgroundColor: '#0F4BFF',
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginLeft: Spacing.three,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: Spacing.three,
  },
  headerContainer: {alignItems: 'center', marginBottom: Spacing.four},
  header: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
});
