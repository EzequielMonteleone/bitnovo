import {SvgArrowDown} from '@/assets';
import {ThemedView} from '@/components/themed-view';
import {Spacing} from '@/constants/theme';
import {useCurrencyStore} from '@/store/currency-store';
import {useRouter} from 'expo-router';
import {FC, useCallback} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {ThemedText} from '../themed-text';

interface CurrencyHeaderProps {
  title: string;
}

const CurrencyHeader: FC<CurrencyHeaderProps> = ({title}) => {
  const {fiat} = useCurrencyStore();
  const router = useRouter();
  const handlePress = useCallback(() => {
    router.push('/currency');
  }, [router]);
  return (
    <ThemedView style={styles.container}>
      <ThemedText themeColor="primary" style={styles.title}>
        {title}
      </ThemedText>
      <Pressable style={styles.pressable} onPress={handlePress}>
        <ThemedView
          type="backgroundElement"
          style={styles.selectedCurrencyContainer}>
          <ThemedText type="smallBold" themeColor="primary">
            {fiat}
          </ThemedText>
          <SvgArrowDown />
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
};

export default CurrencyHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressable: {
    position: 'absolute',
    right: Spacing.three,
    flexDirection: 'row',
  },
  selectedCurrencyContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: 99,
    gap: Spacing.one,
    flexDirection: 'row',
  },
});
