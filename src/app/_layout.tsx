import KeyboardView from '@/components/generic/keyboardView';
import {MainContainer} from '@/components/generic/mainContainer';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {DarkTheme, DefaultTheme, Stack, ThemeProvider} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {useColorScheme} from 'react-native';
import '../i18n';
import '../reactotron';

const queryClient = new QueryClient();
const hideHeader = {headerShown: false};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <MainContainer>
          <KeyboardView>
            <Stack>
              <Stack.Screen name="index" options={hideHeader} />
              <Stack.Screen name="qr" options={hideHeader} />
              <Stack.Screen name="share" options={hideHeader} />
              <Stack.Screen name="success" options={hideHeader} />
              <Stack.Screen name="currency" options={hideHeader} />
              <Stack.Screen name="countries" options={hideHeader} />
            </Stack>
          </KeyboardView>
        </MainContainer>
        <StatusBar style="auto" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
