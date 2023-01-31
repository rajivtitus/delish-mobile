import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { HomeTabParamList, HomeTabScreenProps } from "../ts/types/navigation";
import { RestaurantsProvider } from "../../src/services/context/RestaurantsContext";
import { LocationProvider } from "../../src/services/context/LocationContext";
import { FavouritesProvider } from "../../src/services/context/FavouritesContext";
import RestaurantsNavigator from "./RestaurantsNavigator";
import MapScreen from "../screens/map/MapScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";

type Icon = "md-restaurant" | "md-map" | "md-settings";

const Tab = createBottomTabNavigator<HomeTabParamList>();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

const screenOptions = ({ route }: HomeTabScreenProps) => {
  const iconName = TAB_ICON[route.name] as Icon;
  return {
    tabBarIcon: ({ size, color }: { size: number; color: string }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
    headerShown: false,
  };
};

const AppNavigator = () => {
  return (
    <FavouritesProvider>
      <LocationProvider>
        <RestaurantsProvider>
          <Tab.Navigator
            screenOptions={screenOptions}
            initialRouteName="Restaurants"
          >
            <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </RestaurantsProvider>
      </LocationProvider>
    </FavouritesProvider>
  );
};

export default AppNavigator;
