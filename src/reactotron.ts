import { REACTOTRON_HOST } from '@env';
import Constants from 'expo-constants';
import { NativeModules, Platform } from 'react-native';
import Reactotron from 'reactotron-react-native';

declare global {
  interface Console {
    tron?: typeof Reactotron;
  }
}

/** Metro / Expo host — same machine Reactotron runs on. */
function getReactotronHost(): string {
  if (REACTOTRON_HOST?.trim()) {
    return REACTOTRON_HOST.trim();
  }

  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const host = hostUri.split(':')[0];
    if (host) return host;
  }

  const scriptURL = NativeModules.SourceCode?.scriptURL as string | undefined;
  if (scriptURL) {
    const host = scriptURL.split('://')[1]?.split(':')[0];
    if (host && host !== 'localhost' && host !== '127.0.0.1') {
      return host;
    }
  }

  // Android emulator: 10.0.2.2 is the host loopback to your dev machine.
  if (Platform.OS === 'android') {
    return '10.0.2.2';
  }

  return 'localhost';
}

const isReactotronAvailable = __DEV__ && Platform.OS !== 'web';

if (isReactotronAvailable) {
  const host = getReactotronHost();

  Reactotron.configure({ name: 'bitnovo-test', host })
    .useReactNative()
    .connect();

  Reactotron.clear?.();
  console.tron = Reactotron;
}

export default Reactotron;
