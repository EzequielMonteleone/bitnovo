import {fireEvent, render} from '@testing-library/react-native';

import {Button} from '@/components/ui/button';

describe('<Button />', () => {
  it('renders string children and handles presses', () => {
    const onPress = jest.fn();
    const {getByText} = render(<Button onPress={onPress}>Continue</Button>);

    fireEvent.press(getByText('Continue'));

    expect(getByText('Continue')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('disables presses while loading', () => {
    const onPress = jest.fn();
    const {UNSAFE_getByProps, queryByText} = render(
      <Button loading onPress={onPress}>
        Continue
      </Button>,
    );

    const button = UNSAFE_getByProps({disabled: true});

    expect(button.props.disabled).toBe(true);
    expect(queryByText('Continue')).toBeNull();
    expect(onPress).not.toHaveBeenCalled();
  });
});
