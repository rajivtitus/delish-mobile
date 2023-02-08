import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { CheckoutStackParamList } from "../ts/types/navigation";
import CartScreen from "../screens/checkout/CartScreen";
import CheckoutStatusScreen from "../screens/checkout/CheckoutStatusScreen";

const { Navigator, Screen } = createStackNavigator<CheckoutStackParamList>();

const CheckoutNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerMode: "screen",
      }}
    >
      <Screen
        name="Cart Details"
        component={CartScreen}
        options={{ header: () => null, title: "" }}
      />
      <Screen
        name="Checkout Status"
        component={CheckoutStatusScreen}
        options={{ title: "" }}
      />
    </Navigator>
  );
};

export default CheckoutNavigator;
