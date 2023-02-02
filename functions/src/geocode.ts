import { Request, Response } from "firebase-functions/v1";
import * as url from "url";

import { mockLocation } from "./mocks/mockLocation";

export const geocodeRequest = (request: Request, response: Response) => {
  const { city } = url.parse(request.url, true).query;
  const locationFound = mockLocation[city as keyof typeof mockLocation];
  if (locationFound) {
    response.json(locationFound);
  } else {
    response.send("No location");
  }
};
