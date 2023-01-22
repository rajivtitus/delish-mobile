import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";
import { Ionicons } from "@expo/vector-icons";

import theme from "./src/themes/theme";
import RestaurantsScreen from "./src/features/restaurants/screens/RestaurantsScreen";

type RootTabParamList = {
  Restaurants: undefined;
  Map: undefined;
  Settings: undefined;
};

type RootTabParam = "Restaurants" | "Map" | "Settings";

type RouteProps = BottomTabScreenProps<RootTabParamList, RootTabParam>;

type Icon = "md-restaurant" | "md-map" | "md-settings";

const Tab = createBottomTabNavigator<RootTabParamList>();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

const screenOptions = ({ route }: RouteProps) => {
  const iconName = TAB_ICON[route.name] as Icon;

  return {
    tabBarIcon: ({ size, color }: { size: number; color: string }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
  };
};

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
      <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
          <Tab.Screen name="Map" component={RestaurantsScreen} />
          <Tab.Screen name="Settings" component={RestaurantsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <ExpoStatusBar style="auto" />
    </PaperProvider>
  );
}
