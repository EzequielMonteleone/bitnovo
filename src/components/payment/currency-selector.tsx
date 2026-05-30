import {CurrencyOptionItem} from '@/components/payment/currency-option-item';
import {ThemedText} from '@/components/themed-text';
import {ThemedView} from '@/components/themed-view';
import {Spacing} from '@/constants/theme';
import {useCurrencyStore} from '@/store/currency-store';
import {CurrencyOption} from '@/types/payments';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Modal, Pressable, StyleSheet, View} from 'react-native';

type Props = {
  visible: boolean;
  onSelect(value: CurrencyOption['value']): void;
  onClose(): void;
};

export function CurrencySelector({visible, onSelect, onClose}: Props) {
  const {t} = useTranslation();
  const renderItem = useCallback(
    ({item}: {item: CurrencyOption}) => (
      <CurrencyOptionItem item={item} onSelect={onSelect} onClose={onClose} />
    ),
    [onClose, onSelect],
  );

  const currencyOptions = useCurrencyStore(state => state.options);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <ThemedView type="backgroundElement" style={styles.modal}>
          <ThemedText type="subtitle" style={styles.title}>
            {t('currency.select')}
          </ThemedText>
          <FlatList
            data={currencyOptions}
            renderItem={renderItem}
            keyExtractor={item => item.value}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.list}
          />
          <Pressable onPress={onClose} style={styles.closeButton}>
            <ThemedText type="linkPrimary">{t('common.close')}</ThemedText>
          </Pressable>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  modal: {
    padding: Spacing.four,
    borderTopLeftRadius: Spacing.four,
    borderTopRightRadius: Spacing.four,
    gap: Spacing.three,
  },
  list: {
    gap: Spacing.two,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  title: {
    marginBottom: Spacing.two,
  },
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
  closeButton: {
    marginTop: Spacing.three,
    alignSelf: 'center',
  },
});
