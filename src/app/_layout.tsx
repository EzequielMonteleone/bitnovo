import KeyboardView from '@/components/generic/keyboardView';
import {MainContainer} from '@/components/generic/mainContainer';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {DarkTheme, DefaultTheme, Stack, ThemeProvider} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {useColorScheme} from 'react-native';
import '../reactotron';
import '../i18n';

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <MainContainer>
          <KeyboardView>
            <Stack>
              <Stack.Screen name="index" options={{headerShown: false}} />
              <Stack.Screen name="qr" options={{headerShown: false}} />
              <Stack.Screen name="share" options={{headerShown: false}} />
              <Stack.Screen name="success" options={{headerShown: false}} />
              <Stack.Screen name="currency" options={{headerShown: false}} />
              <Stack.Screen name="countries" options={{headerShown: false}} />
            </Stack>
          </KeyboardView>
        </MainContainer>
        <StatusBar style="auto" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
