import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StripeProvider } from "@stripe/stripe-react-native";
import { STRIPE_API_KEY } from "@env";

import { HomeTabParamList, HomeTabScreenProps } from "../ts/types/navigation";
import { Theme } from "../ts/types/theme";
import { RestaurantsProvider } from "../../src/services/context/RestaurantsContext";
import { LocationProvider } from "../../src/services/context/LocationContext";
import { FavouritesProvider } from "../../src/services/context/FavouritesContext";
import { CheckoutProvider } from "../services/context/CheckoutContext";
import { useTheme } from "react-native-paper";
import RestaurantsNavigator from "./RestaurantsNavigator";
import MapScreen from "../screens/map/MapScreen";
import SettingsNavigator from "./SettingsNavigator";
import CartScreen from "../screens/checkout/CartScreen";

type Icon = "md-restaurant" | "md-map" | "md-settings";

type ScreenOptionsProps = HomeTabScreenProps & {
  theme: Theme;
};

const { Navigator, Screen } = createBottomTabNavigator<HomeTabParamList>();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Cart: "md-cart",
  Settings: "md-settings",
};

const screenOptions = ({ route, theme }: ScreenOptionsProps) => {
  const iconName = TAB_ICON[route.name] as Icon;
  return {
    tabBarIcon: ({ size, color }: { size: number; color: string }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.secondary,
    headerShown: false,
  };
};

const AppNavigator = () => {
  const theme = useTheme<Theme>();

  return (
    <FavouritesProvider>
      <LocationProvider>
        <RestaurantsProvider>
          <StripeProvider publishableKey={STRIPE_API_KEY}>
            <CheckoutProvider>
              <Navigator
                screenOptions={(props) => screenOptions({ ...props, theme })}
                initialRouteName="Restaurants"
              >
                <Screen name="Restaurants" component={RestaurantsNavigator} />
                <Screen name="Map" component={MapScreen} />
                <Screen name="Cart" component={CartScreen} />
                <Screen name="Settings" component={SettingsNavigator} />
              </Navigator>
            </CheckoutProvider>
          </StripeProvider>
        </RestaurantsProvider>
      </LocationProvider>
    </FavouritesProvider>
  );
};

export default AppNavigator;
