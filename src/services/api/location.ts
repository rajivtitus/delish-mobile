const camelize = require("camelize");

import { LocationApiData, Geocode } from "../../ts/interfaces/location";
import { mockLocation } from "./mocks/mockLocation";

export const locationRequest = (
  searchKeyword: string
): Promise<LocationApiData> => {
  return new Promise((resolve, reject) => {
    const locationFound =
      mockLocation[searchKeyword as keyof typeof mockLocation];
    if (locationFound) {
      const formattedResponse = camelize(locationFound);
      resolve(formattedResponse);
    } else {
      reject("No location found");
    }
  });
};

export const locationTransform = (geocode: Geocode) => {
  const { viewport, location } = geocode.geometry;
  const { lat, lng } = location;
  return { lat, lng, viewport };
};
