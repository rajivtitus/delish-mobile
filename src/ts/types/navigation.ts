import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";

import { Restaurant } from "../interfaces/restaurant";

export type HomeTabParamList = {
  Restaurants: undefined;
  Map: undefined;
  Settings: undefined;
};
export type HomeTabParam = "Restaurants" | "Map" | "Settings";
export type HomeTabScreenProps = BottomTabScreenProps<
  HomeTabParamList,
  HomeTabParam
>;

export type RestaurantsStackParamList = {
  RestaurantsScreen: undefined;
  RestaurantDetail: { restaurant: Restaurant };
};
export type RestaurantsStackParam = "RestaurantsScreen" | "RestaurantDetail";
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
  SettingsScreen: undefined;
  Favourites: undefined;
};
export type SettingsStackParam = "SettingsScreen" | "Favourites";
export type SettingsStackNavigationProps = StackNavigationProp<
  SettingsStackParamList,
  SettingsStackParam
>;
