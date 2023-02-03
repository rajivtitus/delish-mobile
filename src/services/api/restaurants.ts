const camelize = require("camelize");

import { Restaurant } from "../../ts/interfaces/restaurant";
import { Location } from "../../ts/interfaces/location";
import { FetchOptions } from "../../ts/interfaces/fetch";
import { getUrl } from "../../utils/environment";

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
  const fetchOptions: FetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const location = `${lat},${lng}`;
  const url = getUrl(`/placesNearby?location=${location}`);

  return fetch(url, fetchOptions)
    .then((res) => res.json())
    .then((data) => camelize(data))
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
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
