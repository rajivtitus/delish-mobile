import React, { useState, ReactElement, useEffect } from "react";
import { useContext, createContext } from "react";
import { getAuth, User, AuthError } from "firebase/auth";

import loginRequest from "../api/login";
import registerRequest from "../api/register";

interface AuthContext {
  user: User | null | undefined;
  isLoading: boolean;
  error: AuthError | null | undefined;
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, password: string) => void;
}

interface Props {
  children: ReactElement | ReactElement[];
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  isLoading: false,
  error: null,
  onLogin: () => null,
  onRegister: () => null,
});

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AuthError | null | undefined>(null);
  const auth = getAuth();

  const onLogin = (email: string, password: string) => {
    setIsLoading(true);
    loginRequest({ auth, email, password })
      .then((res) => setUser(res.user))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  const onRegister = (email: string, password: string) => {
    setIsLoading(true);
    registerRequest({ auth, email, password })
      .then((res) => setUser(res.user))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  //clear error state after a few seconds
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (error) {
      timeout = setTimeout(() => {
        setError(null);
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext(): AuthContext {
  return useContext(AuthContext);
}
