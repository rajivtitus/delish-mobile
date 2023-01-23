const camelize = require("camelize");

import { LocationApiData, Geocode } from "../ts/interfaces/location";
import { locationMock } from "./mocks/locationMock";

export const locationRequest = (
  searchKeyword: string
): Promise<LocationApiData> => {
  return new Promise((resolve, reject) => {
    const locationFound =
      locationMock[searchKeyword as keyof typeof locationMock];
    if (locationFound) {
      const formattedResponse = camelize(locationFound);
      resolve(formattedResponse);
    } else {
      reject("No location found");
    }
  });
};

export const locationTransform = (geocode: Geocode) => {
  const { lat, lng } = geocode.geometry.location;
  return { lat, lng };
};
