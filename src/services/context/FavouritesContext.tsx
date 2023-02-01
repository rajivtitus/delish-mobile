import React, { useState, ReactElement, useEffect } from "react";
import { useContext, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Restaurant } from "../../ts/interfaces/restaurant";
import { useAuthContext } from "./AuthContext";

interface FavouritesContext {
  favourites: Restaurant[];
  addFavourite: (x: Restaurant) => void;
  removeFavourite: (x: Restaurant) => void;
}

interface Props {
  children: ReactElement | ReactElement[];
}

export const FavouritesContext = createContext<FavouritesContext>({
  favourites: [],
  addFavourite: () => null,
  removeFavourite: () => null,
});

export const FavouritesProvider = ({ children }: Props): JSX.Element => {
  const [favourites, setFavourites] = useState<Restaurant[]>([]);
  const { user } = useAuthContext();

  const saveFavourites = async (value: Restaurant[], uid: string) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favourites${uid}`, jsonValue);
    } catch (err) {
      console.error(err);
    }
  };

  const loadFavourites = async (uid: string) => {
    try {
      const value = await AsyncStorage.getItem(`@favourites${uid}`);
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
    if (user && user.uid) {
      loadFavourites(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid) {
      saveFavourites(favourites, user.uid);
    }
  }, [user, favourites]);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
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
