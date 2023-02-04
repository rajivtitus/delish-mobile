import { Request, Response } from "firebase-functions/v1";
import { Client } from "@googlemaps/google-maps-services-js";
import * as url from "url";

import { mockRestaurants } from "./mocks/mockRestaurants";
import { mockImages } from "./mocks/mockRestaurants";

// Using random images because requesting Google assets costs $$
const addRandomImage = (restaurant: any) => {
  const randomIndex = Math.floor(Math.random() * mockImages.length);
  restaurant.photos[0] = mockImages[randomIndex];
  return restaurant;
};

export const placesRequest = (
  request: Request,
  response: Response,
  client: Client
) => {
  const { location = "", mock } = url.parse(request.url, true).query;

  if (mock === "true") {
    const restaurants =
      mockRestaurants[location as keyof typeof mockRestaurants];

    if (restaurants) {
      restaurants.results = restaurants.results.map(addRandomImage);
      response.json(restaurants);
    } else {
      response.status(400).json({
        status: 400,
        message: "Request failed with status code 400",
      });
    }
    return;
  }

  client
    .placesNearby({
      params: {
        key: `${process.env.GOOGLE_API_KEY}`,
        location: location as string,
        radius: 1500,
        type: "restaurant",
      },
    })
    .then((res) => {
      res.data.results = res.data.results.map(addRandomImage);
      return response.json(res.data);
    })
    .catch((err) => {
      response.status(400);
      return response.json(err);
    });
};
