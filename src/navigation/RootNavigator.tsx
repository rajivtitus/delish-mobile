import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAuthContext } from "../services/context/AuthContext";
import AppNavigator from "./AppNavigator";
import AccountNavigator from "./AccountNavigator";

const RootNavigator = () => {
  const { user } = useAuthContext();
  //user does not exist if they are not authenticated
  const isAuthenticated = user;

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
