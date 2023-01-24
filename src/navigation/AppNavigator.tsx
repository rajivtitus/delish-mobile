import React from "react";
import { Text } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { HomeTabParamList, HomeTabScreenProps } from "../ts/types/navigation";
import RestaurantsNavigator from "./RestaurantsNavigator";

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

const Map = () => {
  return <Text>Map</Text>;
};

const Settings = () => {
  return <Text>Settings</Text>;
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
