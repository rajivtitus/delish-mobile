import React, { ReactElement } from "react";
import { useContext, createContext } from "react";

interface CheckoutContext {}

interface Props {
  children: ReactElement | ReactElement[];
}

export const CheckoutContext = createContext<CheckoutContext>({});

export const CheckoutProvider = ({ children }: Props): JSX.Element => {
  return (
    <CheckoutContext.Provider value={{}}>{children}</CheckoutContext.Provider>
  );
};

export function useCheckoutContext(): CheckoutContext {
  return useContext(CheckoutContext);
}
