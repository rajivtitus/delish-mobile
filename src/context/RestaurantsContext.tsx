import React, { ReactElement } from "react";
import { useContext, createContext } from "react";

interface RestaurantsContext {
  getRestaurants: () => void;
}

interface Props {
  children: ReactElement;
}

export const RestaurantsContext = createContext<RestaurantsContext>({
  getRestaurants: () => null,
});

export const RestaurantsProvider = ({ children }: Props): JSX.Element => {
  const getRestaurants = () => {};
  return (
    <RestaurantsContext.Provider value={{ getRestaurants }}>
      {children}
    </RestaurantsContext.Provider>
  );
};

export function useRestaurantsContext(): RestaurantsContext {
  return useContext(RestaurantsContext);
}
