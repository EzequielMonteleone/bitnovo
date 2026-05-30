import {FC} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface KeyboardViewProps {
  children: React.ReactNode;
}

const KeyboardView: FC<KeyboardViewProps> = ({children}) => {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={insets.bottom}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardView;

const styles = StyleSheet.create({container: {flex: 1}});
