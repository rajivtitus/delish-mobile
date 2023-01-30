import React, { useState, ReactElement, useEffect } from "react";
import { useContext, createContext } from "react";

import { Viewport } from "../../ts/interfaces/location";
import { locationRequest, locationTransform } from "../api/location";
interface Locale {
  lat: number;
  lng: number;
  viewport: Viewport;
}
interface LocationContext {
  keyword: string;
  location: Locale | null | undefined;
  isLoading: boolean;
  error: string | null | undefined;
  onSearch: (searchTerm: string) => void;
}

interface Props {
  children: ReactElement | ReactElement[];
}

export const LocationContext = createContext<LocationContext>({
  keyword: "",
  location: null,
  isLoading: false,
  error: null,
  onSearch: () => null,
});

export const LocationProvider = ({ children }: Props): JSX.Element => {
  const [keyword, setKeyword] = useState("Toronto");
  const [location, setLocation] = useState<Locale | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword: string) => {
    if (searchKeyword) {
      setIsLoading(true);
      setKeyword(searchKeyword);
      locationRequest(searchKeyword.toLowerCase())
        .then(({ results }) => locationTransform(results[0]))
        .then((res) => setLocation(res))
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => onSearch(keyword), [keyword]);

  return (
    <LocationContext.Provider
      value={{
        keyword,
        location,
        isLoading,
        error,
        onSearch,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export function useLocationContext(): LocationContext {
  return useContext(LocationContext);
}
