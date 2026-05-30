import {SvgArrowRight, SvgTickCircle} from '@/assets';
import {Spacing} from '@/constants/theme';
import {useCallback} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {ThemedText} from '../themed-text';
import {ThemedView} from '../themed-view';
import {SearchItem} from './search';

interface SearchRowProps {
  item: SearchItem;
  onSelect(value: SearchItem): void;
}

const SearchRow: React.FC<SearchRowProps> = ({item, onSelect}) => {
  const handlePress = useCallback(() => {
    onSelect(item);
  }, [item, onSelect]);

  return (
    <Pressable style={styles.pressable} onPress={handlePress}>
      <ThemedView style={styles.mainContainer}>
        <ThemedView style={styles.body}>
          <ThemedText type="smallBold" themeColor="primary">
            {item.label}
          </ThemedText>
          <ThemedText themeColor="textSecondary">{item.value}</ThemedText>
        </ThemedView>
        {item.selected ? <SvgTickCircle /> : <SvgArrowRight />}
      </ThemedView>
    </Pressable>
  );
};

export default SearchRow;

const styles = StyleSheet.create({
  pressable: {
    marginVertical: Spacing.two,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {flex: 1},
});
