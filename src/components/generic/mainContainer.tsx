import {FunctionComponent} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface MainContainerProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

export const MainContainer: FunctionComponent<MainContainerProps> = ({
  children,
  style,
}) => {
  return (
    <SafeAreaView style={[style, styles.container]}>{children}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
});
