import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SettingsStackParamList } from "../ts/types/navigation";
import SettingsScreen from "../screens/settings/SettingsScreen";
import FavouritesScreen from "../screens/settings/FavouritesScreen";
import CameraScreen from "../screens/settings/CameraScreen";

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account Settings"
        component={SettingsScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen name="Favourites" component={FavouritesScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
