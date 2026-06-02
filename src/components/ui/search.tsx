import {Spacing} from '@/constants/theme';
import {FC, useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View} from 'react-native';
import {ThemedText} from '../themed-text';
import {ThemedView} from '../themed-view';
import SearchInput from './searchInput';
import SearchRow from './searchRow';

export type SearchItem = {
  label: string;
  value: string;
  selected: boolean;
};

interface SearchComponentProps {
  items: SearchItem[];
  onSelect(value: SearchItem): void;
}

const SearchComponent: FC<SearchComponentProps> = ({items, onSelect}) => {
  const [query, setQuery] = useState('');
  const {t} = useTranslation();
  const handleSearchChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return items;
    }

    return items.filter(item => {
      return (
        item.label.toLowerCase().includes(normalizedQuery) ||
        item.value.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [items, query]);

  return (
    <ThemedView>
      <SearchInput onChange={handleSearchChange} />
      <FlatList
        style={styles.list}
        data={filteredItems}
        keyExtractor={item => item.value}
        renderItem={({item}) => <SearchRow item={item} onSelect={onSelect} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText>{t('search.noResults')}</ThemedText>
          </View>
        }
      />
    </ThemedView>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  emptyContainer: {
    padding: Spacing.four,
    alignItems: 'center',
  },
  list: {marginTop: Spacing.two},
});
