import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";

import { Restaurant } from "../interfaces/restaurant";

export type HomeTabParamList = {
  Restaurants: undefined;
  Map: undefined;
  Cart: undefined;
  Settings: undefined;
};
export type HomeTabParam = "Restaurants" | "Map" | "Cart" | "Settings";
export type HomeTabScreenProps = BottomTabScreenProps<
  HomeTabParamList,
  HomeTabParam
>;

export type RestaurantsStackParamList = {
  "Restaurants List": undefined;
  "Restaurant Details": { restaurant: Restaurant };
};
export type RestaurantsStackParam = "Restaurants List" | "Restaurant Details";
export type RestaurantsStackScreenProps = StackScreenProps<
  RestaurantsStackParamList,
  RestaurantsStackParam
>;
export type RestaurantsStackNavigationProps = StackNavigationProp<
  RestaurantsStackParamList,
  RestaurantsStackParam
>;

export type AccountStackParamList = {
  Login: undefined;
  Register: undefined;
};
export type AccountStackParam = "Register" | "Login";
export type AccountStackNavigationProps = StackNavigationProp<
  AccountStackParamList,
  AccountStackParam
>;

export type SettingsStackParamList = {
  "Account Settings": undefined;
  Favourites: undefined;
  Camera: undefined;
};
export type SettingsStackParam = "Account Settings" | "Favourites" | "Camera";
export type SettingsStackNavigationProps = StackNavigationProp<
  SettingsStackParamList,
  SettingsStackParam
>;

export type CheckoutStackParamList = {
  "Cart Details": undefined;
  "Checkout Status"?: { error: string };
};
export type CheckoutStackParam = "Cart Details" | "Checkout Status";
export type CheckoutStackScreenProps = StackScreenProps<
  CheckoutStackParamList,
  CheckoutStackParam
>;
export type CheckoutStackNavigationProps = StackNavigationProp<
  CheckoutStackParamList,
  CheckoutStackParam
>;
