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
  const [error, setError] = useState(null);
  const { location } = useLocationContext();

  useEffect(() => {
    const fetchRestaurants = (currentLocation: Location) => {
      setIsLoading(true);
      restaurantsRequest(currentLocation)
        .then(({ results }) => restaurantsTransform(results))
        .then((res) => setRestaurants(res))
        .catch((err) => setError(err))
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
