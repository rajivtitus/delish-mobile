import React, { useState, ReactElement, useEffect } from "react";
import { useContext, createContext } from "react";

import { Restaurant } from "../ts/interfaces/restaurant";
import { restaurantsRequest, restaurantsTransform } from "../api/restaurants";

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

  useEffect(() => {
    const fetchRestaurants = () => {
      setIsLoading(true);
      restaurantsRequest()
        .then(({ results }) => restaurantsTransform(results))
        .then((res) => setRestaurants(res))
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    };

    fetchRestaurants();
  }, []);

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
