import { Request, Response } from "firebase-functions/v1";
import * as url from "url";

import { mockRestaurants } from "./mocks/mockRestaurants";

export const placesRequest = (request: Request, response: Response) => {
  const { location } = url.parse(request.url, true).query;
  const restaurants = mockRestaurants[location as keyof typeof mockRestaurants];

  if (restaurants) {
    response.json(restaurants);
  } else {
    response.json([]);
  }
};
