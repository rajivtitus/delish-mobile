import React, { useState, ReactElement, useEffect } from "react";
import { useContext, createContext } from "react";

import { Restaurant } from "../../ts/interfaces/restaurant";
import { Location } from "../../ts/interfaces/location";
import { restaurantsRequest, restaurantsTransform } from "../api/restaurants";
import { useLocationContext } from "./LocationContext";

interface RestaurantsContext {
  restaurants: Restaurant[];
  isLoading: boolean;
  error: string | null | undefined;
}

interface Props {
  children: ReactElement | ReactElement[];
}

export const RestaurantsContext = createContext<RestaurantsContext>({
  restaurants: [],
  isLoading: false,
  error: null,
});

export const RestaurantsProvider = ({ children }: Props): JSX.Element => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | undefined>(null);
  const { location } = useLocationContext();

  useEffect(() => {
    const fetchRestaurants = async (currentLocation: Location) => {
      setIsLoading(true);
      restaurantsRequest(currentLocation)
        .then((res) => {
          if (res.status === "OK") {
            return restaurantsTransform(res.results);
          } else {
            throw Error("Something went wrong. Please try again later!");
          }
        })
        .then((data) => {
          setRestaurants(data);
          setError(null);
        })
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false));
    };

    location && fetchRestaurants(location);
  }, [location]);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};

export function useRestaurantsContext(): RestaurantsContext {
  return useContext(RestaurantsContext);
}
