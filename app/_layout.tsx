import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  Overpass_100Thin,
  Overpass_100Thin_Italic,
  Overpass_200ExtraLight,
  Overpass_200ExtraLight_Italic,
  Overpass_300Light,
  Overpass_300Light_Italic,
  Overpass_400Regular,
  Overpass_400Regular_Italic,
  Overpass_500Medium,
  Overpass_500Medium_Italic,
  Overpass_600SemiBold,
  Overpass_600SemiBold_Italic,
  Overpass_700Bold,
  Overpass_700Bold_Italic,
  Overpass_800ExtraBold,
  Overpass_800ExtraBold_Italic,
  Overpass_900Black,
  Overpass_900Black_Italic,
} from '@expo-google-fonts/overpass';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import FetchCacheProvider from '#components/providers/FetchCacheProvider';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Overpass_100Thin,
    Overpass_200ExtraLight,
    Overpass_300Light,
    Overpass_400Regular,
    Overpass_500Medium,
    Overpass_600SemiBold,
    Overpass_700Bold,
    Overpass_800ExtraBold,
    Overpass_900Black,
    Overpass_100Thin_Italic,
    Overpass_200ExtraLight_Italic,
    Overpass_300Light_Italic,
    Overpass_400Regular_Italic,
    Overpass_500Medium_Italic,
    Overpass_600SemiBold_Italic,
    Overpass_700Bold_Italic,
    Overpass_800ExtraBold_Italic,
    Overpass_900Black_Italic,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error != null) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <FetchCacheProvider>
          <Stack />
        </FetchCacheProvider>
      </ThemeProvider>
    </>
  );
}
