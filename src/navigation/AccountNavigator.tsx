import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AccountStackParamList } from "../ts/types/navigation";
import LoginScreen from "../screens/account/LoginScreen";
import RegisterScreen from "../screens/account/RegisterScreen";

const Stack = createStackNavigator<AccountStackParamList>();

const AccountNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
