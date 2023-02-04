const camelize = require("camelize");

import { LocationApiData, Geocode } from "../../ts/interfaces/location";
import { FetchOptions } from "../../ts/interfaces/fetch";
import { getUrl } from "../../utils/environment";

export const locationRequest = (
  searchKeyword: string
): Promise<LocationApiData> => {
  const fetchOptions: FetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url = getUrl(`/geocode?city=${searchKeyword}`);

  return fetch(url, fetchOptions)
    .then((res) => res.json())
    .then((data) => camelize(data))
    .catch((_) => {
      throw Error("Something went wrong. Please try again later!");
    });
};

export const locationTransform = (geocode: Geocode) => {
  const { viewport, location } = geocode.geometry;
  const { lat, lng } = location;
  return { lat, lng, viewport };
};
