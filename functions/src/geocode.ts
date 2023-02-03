import { Request, Response } from "firebase-functions";
import { Client } from "@googlemaps/google-maps-services-js";
import * as url from "url";

import { mockLocation } from "./mocks/mockLocation";

export const geocodeRequest = (
  request: Request,
  response: Response,
  client: Client
) => {
  const { city, mock } = url.parse(request.url, true).query;

  if (!city) {
    response.status(400).json({ message: "No city specified" });
    return;
  }

  if (mock === "true") {
    const location = mockLocation[city as keyof typeof mockLocation];
    if (location) {
      response.json(location);
    } else {
      response.json({
        results: [],
        status: "ZERO_RESULTS",
      });
    }
    return;
  }

  client
    .geocode({
      params: {
        key: `${process.env.GOOGLE_API_KEY}`,
        address: city as string,
      },
    })
    .then((res) => response.json(res.data))
    .catch((err) => {
      response.status(400);
      return response.json(err);
    });
};
