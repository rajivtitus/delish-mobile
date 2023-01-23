const camelize = require("camelize");

import { Restaurant } from "../ts/interfaces/restaurant";
import { restaurantsMock } from "./mocks/restaurantsMock";

type RestaurantInitial = Omit<Restaurant, "isOpenNow" | "isClosedTemporarily">;
interface RestaurantApiData {
  htmlAttributions: any[];
  nextPageToken: string;
  results: RestaurantInitial[];
  status: string;
}

export const restaurantsRequest = (): Promise<RestaurantApiData> => {
  return new Promise((resolve, _) => {
    const formattedResponse = camelize(restaurantsMock);
    resolve(formattedResponse);
  });
};

export const restaurantsTransform = (restaurants: RestaurantInitial[]) => {
  const transformedRestaurants = restaurants.map((restaurant) => ({
    ...restaurant,
    isOpenNow: restaurant.openingHours && restaurant.openingHours.openNow,
    isClosedTemporarily: restaurant.businessStatus === "CLOSED_TEMPORARILY",
  }));
  return transformedRestaurants;
};
