import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";

import theme from "./src/themes/theme";
import RestaurantsScreen from "./src/features/restaurants/screens/RestaurantsScreen";

export default function App(): JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <RestaurantsScreen />
      <ExpoStatusBar style="auto" />
    </PaperProvider>
  );
}
