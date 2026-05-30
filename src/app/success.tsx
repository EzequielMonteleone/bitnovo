import {Image} from 'expo-image';
import {useRouter} from 'expo-router';
import {StyleSheet} from 'react-native';

import {SvgTickCircle} from '@/assets';
import {ThemedText} from '@/components/themed-text';
import {ThemedView} from '@/components/themed-view';
import {Button} from '@/components/ui/button';
import {Spacing} from '@/constants/theme';
import {useTranslation} from 'react-i18next';

const SuccessScreen = () => {
  const router = useRouter();
  const {t} = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/images/bitnovo.png')}
        style={styles.logo}
        contentFit="contain"
      />
      <ThemedView style={styles.card}>
        <SvgTickCircle width={80} height={80} />
        <ThemedText type="default">{t('success.title')}</ThemedText>
        <ThemedText
          type="small"
          themeColor="textSecondary"
          style={styles.subtitle}>
          {t('success.subtitle')}
        </ThemedText>
      </ThemedView>
      <Button variant="outline" onPress={() => router.replace('/')}>
        {t('success.done')}
      </Button>
    </ThemedView>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.four,
    gap: Spacing.four,
  },
  logo: {
    width: 100,
    height: 48,
    alignSelf: 'center',
  },
  card: {
    flex: 1,
    gap: Spacing.two,
    justifyContent: 'center',
    padding: Spacing.four,
    borderRadius: Spacing.four,
    alignItems: 'center',
  },
  subtitle: {
    marginTop: Spacing.two,
    textAlign: 'center',
  },
});
