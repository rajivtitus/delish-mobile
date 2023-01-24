import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { RestaurantsStackParamList } from "../ts/types/navigation";
import RestaurantsScreen from "../features/restaurants/screens/RestaurantsScreen";
import RestaurantDetailsScreen from "../features/restaurants/screens/RestaurantDetailsScreen";

const RestaurantStack = createStackNavigator<RestaurantsStackParamList>();

const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerShown: false,
      }}
    >
      <RestaurantStack.Screen
        name="RestaurantsScreen"
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailsScreen}
      />
    </RestaurantStack.Navigator>
  );
};

export default RestaurantsNavigator;
