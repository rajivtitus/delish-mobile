import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RestaurantsStackParamList } from "../ts/types/navigation";
import { headerStyles } from "../themes/styles";
import RestaurantsScreen from "../screens/restaurants/RestaurantsScreen";
import RestaurantDetailsScreen from "../screens/restaurants/RestaurantDetailsScreen";

const { Navigator, Screen } = createStackNavigator<RestaurantsStackParamList>();

const RestaurantsNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerMode: "screen",
      }}
      initialRouteName="Restaurants List"
    >
      <Screen
        name="Restaurants List"
        component={RestaurantsScreen}
        options={{ header: () => null, title: "" }}
      />
      <Screen
        name="Restaurant Details"
        component={RestaurantDetailsScreen}
        options={{
          headerStyle: headerStyles,
        }}
      />
    </Navigator>
  );
};

export default RestaurantsNavigator;
