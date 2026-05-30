import {ThemedText} from '@/components/themed-text';
import {Spacing} from '@/constants/theme';
import {CurrencyOption} from '@/types/payments';
import {Pressable, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

type Props = {
  item: CurrencyOption;
  onSelect(value: CurrencyOption['value']): void;
  onClose(): void;
};

export function CurrencyOptionItem({item, onSelect, onClose}: Props) {
  const {t} = useTranslation();

  return (
    <Pressable
      style={({pressed}) => [
        styles.optionButton,
        pressed && styles.optionPressed,
      ]}
      onPress={() => {
        onSelect(item.value);
        onClose();
      }}>
      <ThemedText type="default" style={styles.optionText}>
        {t(`currency.${item.value}`)}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {item.symbol}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  optionButton: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionPressed: {
    opacity: 0.7,
  },
  optionText: {
    fontWeight: '600',
  },
});
