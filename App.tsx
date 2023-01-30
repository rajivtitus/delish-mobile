import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";

import "./src/utils/firebase";
import theme from "./src/themes/theme";
import { RestaurantsProvider } from "./src/services/context/RestaurantsContext";
import { LocationProvider } from "./src/services/context/LocationContext";
import { FavouritesProvider } from "./src/services/context/FavouritesContext";
import { AuthProvider } from "./src/services/context/AuthContext";
import RootNavigator from "./src/navigation/RootNavigator";

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
      <AuthProvider>
        <FavouritesProvider>
          <LocationProvider>
            <RestaurantsProvider>
              <RootNavigator />
              <ExpoStatusBar style="auto" />
            </RestaurantsProvider>
          </LocationProvider>
        </FavouritesProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
