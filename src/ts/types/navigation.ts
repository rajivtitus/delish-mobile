import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

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
