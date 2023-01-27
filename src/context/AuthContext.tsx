import React, { useState, ReactElement, useEffect } from "react";
import { useContext, createContext } from "react";

interface AuthContext {
  user: {};
  isLoading: boolean;
  error: string | null | undefined;
}

interface Props {
  children: ReactElement | ReactElement[];
}

export const AuthContext = createContext<AuthContext>({
  user: "",
  isLoading: false,
  error: null,
});

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<{}>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext(): AuthContext {
  return useContext(AuthContext);
}
