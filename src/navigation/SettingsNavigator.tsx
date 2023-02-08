import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SettingsStackParamList } from "../ts/types/navigation";
import SettingsScreen from "../screens/settings/SettingsScreen";
import FavouritesScreen from "../screens/settings/FavouritesScreen";
import CameraScreen from "../screens/settings/CameraScreen";
import { headerStyles } from "../themes/styles";

const { Navigator, Screen } = createStackNavigator<SettingsStackParamList>();

const SettingsNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerMode: "screen",
      }}
    >
      <Screen
        name="Account Settings"
        component={SettingsScreen}
        options={{ header: () => null, title: "Settings" }}
      />
      <Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          headerStyle: headerStyles,
        }}
      />
      <Screen name="Camera" component={CameraScreen} />
    </Navigator>
  );
};

export default SettingsNavigator;
