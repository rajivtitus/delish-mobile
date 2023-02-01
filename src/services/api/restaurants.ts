const camelize = require("camelize");

import { Restaurant } from "../../ts/interfaces/restaurant";
import { Location } from "../../ts/interfaces/location";
import { mockRestaurants } from "./mocks/mockRestaurants";

type RestaurantInitial = Omit<
  Restaurant,
  "address" | "isOpenNow" | "isClosedTemporarily"
>;
interface RestaurantApiData {
  htmlAttributions: any[];
  nextPageToken: string;
  results: RestaurantInitial[];
  status: string;
}

export const restaurantsRequest = ({
  lat,
  lng,
}: Location): Promise<RestaurantApiData> => {
  return new Promise((resolve, reject) => {
    const currentLocation = `${lat},${lng}`;
    const restaurants =
      mockRestaurants[currentLocation as keyof typeof mockRestaurants];
    if (restaurants) {
      const formattedResponse = camelize(restaurants);
      setTimeout(() => resolve(formattedResponse), 1000);
    } else {
      reject("No restaurants found");
    }
  });
};

export const restaurantsTransform = (restaurants: RestaurantInitial[]) => {
  const transformedRestaurants = restaurants.map((restaurant) => ({
    ...restaurant,
    address: restaurant.vicinity,
    isOpenNow: restaurant.openingHours && restaurant.openingHours.openNow,
    isClosedTemporarily: restaurant.businessStatus === "CLOSED_TEMPORARILY",
  }));
  return transformedRestaurants;
};
