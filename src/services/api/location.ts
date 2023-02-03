import { host } from "../../utils/environment";
const camelize = require("camelize");

import { LocationApiData, Geocode } from "../../ts/interfaces/location";
import { FetchOptions } from "../../ts/interfaces/fetch";

export const locationRequest = (
  searchKeyword: string
): Promise<LocationApiData> => {
  const fetchOptions: FetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(`${host}/geocode?city=${searchKeyword}&mock=true`, fetchOptions)
    .then((res) => res.json())
    .then((data) => camelize(data))
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
};

export const locationTransform = (geocode: Geocode) => {
  const { viewport, location } = geocode.geometry;
  const { lat, lng } = location;
  return { lat, lng, viewport };
};
