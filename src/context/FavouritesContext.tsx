import React, { useState, ReactElement } from "react";
import { useContext, createContext } from "react";

import { Restaurant } from "../ts/interfaces/restaurant";

interface FavouritesContext {
  favourites: Restaurant[];
  isLoading: boolean;
  error: string | null | undefined;
  addFavourite: (x: Restaurant) => void;
  removeFavourite: (x: Restaurant) => void;
}

interface Props {
  children: ReactElement | ReactElement[];
}

export const FavouritesContext = createContext<FavouritesContext>({
  favourites: [],
  isLoading: false,
  error: null,
  addFavourite: () => null,
  removeFavourite: () => null,
});

export const FavouritesProvider = ({ children }: Props): JSX.Element => {
  const [favourites, setFavourites] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const addFavourite = (restaurant: Restaurant) => {
    setFavourites((prevFavourites) => [...prevFavourites, restaurant]);
  };

  const removeFavourite = (restaurant: Restaurant) => {
    const newFavourites = favourites.filter(
      (favourite) => favourite.placeId !== restaurant.placeId
    );
    setFavourites(newFavourites);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        isLoading,
        error,
        addFavourite,
        removeFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export function useFavouritesContext(): FavouritesContext {
  return useContext(FavouritesContext);
}
