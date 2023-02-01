import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { RestaurantsStackParamList } from "../ts/types/navigation";
import RestaurantsScreen from "../screens/restaurants/RestaurantsScreen";
import RestaurantDetailsScreen from "../screens/restaurants/RestaurantDetailsScreen";

const Stack = createStackNavigator<RestaurantsStackParamList>();

const RestaurantsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerMode: "screen",
      }}
    >
      <Stack.Screen
        name="Restaurants List"
        component={RestaurantsScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Restaurant Details"
        component={RestaurantDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default RestaurantsNavigator;
