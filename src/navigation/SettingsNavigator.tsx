import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SettingsStackParamList } from "../ts/types/navigation";
import SettingsScreen from "../screens/settings/SettingsScreen";
import FavouritesScreen from "../screens/settings/FavouritesScreen";

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="Favourites" component={FavouritesScreen} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
