import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";

import theme from "./src/themes/theme";
import RestaurantsScreen from "./src/features/restaurants/screens/RestaurantsScreen";

export default function App(): JSX.Element | null {
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <RestaurantsScreen />
      <ExpoStatusBar style="auto" />
    </PaperProvider>
  );
}
