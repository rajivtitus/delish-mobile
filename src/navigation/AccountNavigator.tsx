import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AccountStackParamList } from "../ts/types/navigation";
import LoginScreen from "../screens/account/LoginScreen";
import RegisterScreen from "../screens/account/RegisterScreen";

const { Navigator, Screen } = createStackNavigator<AccountStackParamList>();

const AccountNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Register" component={RegisterScreen} />
    </Navigator>
  );
};

export default AccountNavigator;
