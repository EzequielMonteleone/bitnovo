import {Spacing} from '@/constants/theme';
import {ReactNode} from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {ThemedText} from '../themed-text';

export type ButtonVariant = 'filled' | 'outline' | 'link';

interface ButtonProps {
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  leftIcon,
  rightIcon,
  onPress,
  disabled = false,
  loading = false,
  children,
  style,
}) => {
  const isButtonDisabled = disabled || loading;

  return (
    <Pressable
      style={[
        styles.base,
        variant === 'filled' && styles.filled,
        variant === 'outline' && styles.outline,
        variant === 'link' && styles.link,
        isButtonDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isButtonDisabled}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'filled' ? '#FFFFFF' : '#0F4BFF'}
          size="small"
        />
      ) : (
        <>
          {leftIcon && leftIcon}
          {typeof children === 'string' ? (
            <ThemedText
              type="small"
              style={[
                variant === 'filled' && styles.textFilled,
                variant === 'outline' && styles.textOutline,
                variant === 'link' && styles.textLink,
              ]}>
              {children}
            </ThemedText>
          ) : (
            children
          )}
          {rightIcon && rightIcon}
        </>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  filled: {
    paddingVertical: Spacing.four,
    borderRadius: Spacing.two,
    backgroundColor: '#0F4BFF',
  },
  outline: {
    paddingVertical: Spacing.four,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: '#0F4BFF',
    backgroundColor: 'transparent',
  },
  link: {
    paddingVertical: Spacing.two,
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  textFilled: {
    color: '#FFFFFF',
  },
  textOutline: {
    color: '#0F4BFF',
  },
  textLink: {
    color: '#0F4BFF',
    fontWeight: '500',
  },
});
