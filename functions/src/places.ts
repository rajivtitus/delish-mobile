import { Request, Response } from "firebase-functions/v1";
import { Client } from "@googlemaps/google-maps-services-js";
import * as url from "url";

export const placesRequest = (
  request: Request,
  response: Response,
  client: Client
) => {
  const { location } = url.parse(request.url, true).query;

  if (!location) {
    response.status(400).json({ message: "No location specified" });
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
    .then((res) => response.json(res.data))
    .catch((err) => {
      response.status(400);
      return response.json(err);
    });
};
