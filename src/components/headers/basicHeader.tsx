import {SvgArrowLeft} from '@/assets';
import {ThemedView} from '@/components/themed-view';
import {Spacing} from '@/constants/theme';
import {useRouter} from 'expo-router';
import {FC} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {ThemedText} from '../themed-text';

interface BasicHeaderProps {
  title?: string;
}

const BasicHeader: FC<BasicHeaderProps> = ({title}) => {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      {title && (
        <ThemedText themeColor="primary" style={styles.title}>
          {title}
        </ThemedText>
      )}
      <Pressable onPress={router.back} style={styles.pressable}>
        <ThemedView type="secondary" style={styles.containerArrow}>
          <SvgArrowLeft height={24} width={24} />
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
};

export default BasicHeader;

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
    left: Spacing.three,
  },
  containerArrow: {
    flexDirection: 'row',
    padding: Spacing.one,
    borderRadius: 99,
  },
});
