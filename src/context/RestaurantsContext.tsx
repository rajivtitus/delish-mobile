import React, { useState, ReactElement, useEffect } from "react";
import { useContext, createContext } from "react";
import camelize from "camelize";

import { restaurantsRequest } from "../api/restaurants";

interface RestaurantsContext {
  restaurants: string[];
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
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = () => {
      restaurantsRequest()
        .then((data) => camelize(data))
        .then((newData) => console.dir(newData));
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
