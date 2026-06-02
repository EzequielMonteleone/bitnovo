import {useLocalSearchParams, useRouter} from 'expo-router';
import {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {SvgInfoCircle} from '@/assets';
import BasicHeader from '@/components/headers/basicHeader';
import {ThemedText} from '@/components/themed-text';
import {ThemedView} from '@/components/themed-view';
import {Spacing} from '@/constants/theme';
import {usePaymentWebsocket} from '@/hooks/use-payment-websocket';
import {useTranslation} from 'react-i18next';
import QRCode from 'react-native-qrcode-svg';

const QrScreen = () => {
  const router = useRouter();
  const {t} = useTranslation();
  const params = useLocalSearchParams();
  const identifier = params.identifier as string | undefined;
  const webUrl = params.web_url
    ? decodeURIComponent(params.web_url as string)
    : '';
  const amount = params.amount;
  const symbol = params.symbol;

  const {isPaid} = usePaymentWebsocket(identifier);

  useEffect(() => {
    if (identifier && isPaid) {
      router.replace({pathname: '/success'});
    }
  }, [identifier, isPaid, router]);

  return (
    <ThemedView style={styles.container}>
      <BasicHeader />
      <ThemedView type="primaryButton" style={styles.centeredContainer}>
        <ThemedView type="backgroundSelected" style={styles.infoContainer}>
          <SvgInfoCircle color="#0F4BFF" backgroundColor="#0F4BFF" />
          <ThemedText numberOfLines={2} type="small" style={styles.textInfo}>
            {t('qr.info')}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.qrContainer}>
          <QRCode value={webUrl} size={240} />
        </ThemedView>
        <ThemedText
          style={styles.amountText}
          themeColor="textSecondary"
          type="subtitle">
          {`${amount} ${symbol}`}
        </ThemedText>
        <ThemedText
          style={styles.updatedAutomaticallyText}
          themeColor="backgroundElement"
          type="smallBold">
          {t('qr.updatedAutomatically')}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default QrScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  infoContainer: {
    padding: Spacing.two,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    textAlign: 'center',
    color: '#ffffff',
  },
  textInfo: {
    flex: 1,
    marginLeft: Spacing.two,
  },
  updatedAutomaticallyText: {
    textAlign: 'center',
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.four,
    borderRadius: 8,
  },
});
