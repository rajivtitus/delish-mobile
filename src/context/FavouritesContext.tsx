import React, { useState, ReactElement, useEffect } from "react";
import { useContext, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const saveFavourites = async (value: Restaurant[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@favourites", jsonValue);
    } catch (err) {
      console.error(err);
    }
  };

  const loadFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem("@favourites");
      if (value) {
        const parsedValue = JSON.parse(value);
        setFavourites(parsedValue);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addFavourite = (restaurant: Restaurant) => {
    setFavourites((prevFavourites) => [...prevFavourites, restaurant]);
  };

  const removeFavourite = (restaurant: Restaurant) => {
    const newFavourites = favourites.filter(
      (favourite) => favourite.placeId !== restaurant.placeId
    );
    setFavourites(newFavourites);
  };

  useEffect(() => {
    loadFavourites();
  }, []);

  useEffect(() => {
    saveFavourites(favourites);
  }, [favourites]);

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
