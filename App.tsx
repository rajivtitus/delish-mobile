import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";

import theme from "./src/themes/theme";
import { RestaurantsProvider } from "./src/context/RestaurantsContext";
import { LocationProvider } from "./src/context/LocationContext";
import AppNavigator from "./src/navigation/AppNavigator";

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
      <LocationProvider>
        <RestaurantsProvider>
          <AppNavigator />
          <ExpoStatusBar style="auto" />
        </RestaurantsProvider>
      </LocationProvider>
    </PaperProvider>
  );
}
