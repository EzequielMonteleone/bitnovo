import {SvgSearch} from '@/assets';
import {Spacing} from '@/constants/theme';
import {FC, useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TextInput} from 'react-native';
import {ThemedView} from '../themed-view';

interface SearchInputProps {
  value?: string;
  onChange?(value: string): void;
}

const SearchInput: FC<SearchInputProps> = ({value, onChange}) => {
  const {t} = useTranslation();
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = useCallback(
    (text: string) => {
      setInputValue(text);
      onChange?.(text);
    },
    [onChange],
  );

  return (
    <ThemedView style={styles.container}>
      <SvgSearch />
      <TextInput
        autoCorrect={false}
        inputMode="search"
        keyboardType="default"
        style={styles.input}
        placeholder={t('common.search')}
        value={inputValue}
        onChangeText={handleChange}
      />
    </ThemedView>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    borderColor: '#E0E0E0',
    height: 58,
    borderWidth: 1,
  },
  input: {flex: 1, marginHorizontal: Spacing.two},
});
