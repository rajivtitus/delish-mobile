import React, { ReactNode, useState } from "react";
import { useContext, createContext } from "react";
import { useStripe } from "@stripe/stripe-react-native";

import { MenuItem, Restaurant } from "../../ts/interfaces/restaurant";
import { Cart } from "../../ts/interfaces/checkout";
import { paymentSheetParamsRequest } from "../api/checkout";

interface CheckoutContext {
  cart: Cart | null | undefined;
  isLoading: boolean;
  error: string | null | undefined;
  addToCart: (restaurant: Restaurant, item: MenuItem, quantity: number) => void;
  removeFromCart: (menuItemId: number) => void;
  clearCart: () => void;
  checkout: (amount: number) => void;
}

interface Props {
  children: ReactNode;
}

export const CheckoutContext = createContext<CheckoutContext>({
  cart: null,
  isLoading: false,
  error: null,
  addToCart: () => null,
  removeFromCart: () => null,
  clearCart: () => null,
  checkout: () => null,
});

export const CheckoutProvider = ({ children }: Props): JSX.Element => {
  const [cart, setCart] = useState<Cart | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | undefined>(null);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const addToCart = (
    restaurant: Restaurant,
    menuItem: MenuItem,
    quantity: number
  ) => {
    if (!cart) {
      const newCart = { restaurant, items: [{ ...menuItem, quantity }] };
      setCart(newCart);
      return;
    }

    if (cart && cart.restaurant.placeId !== restaurant.placeId) {
      console.log("Resto already in cart");
      return;
    }

    if (cart) {
      const itemInCart = cart.items.find((item) => item.id === menuItem.id);

      if (itemInCart) {
        itemInCart.quantity += quantity;
        const newItems = cart.items.map((item) => {
          return item.id === itemInCart.id ? itemInCart : item;
        });
        setCart({ ...cart, items: newItems });
      } else {
        const newItem = { ...menuItem, quantity };
        setCart({ ...cart, items: [...cart.items, newItem] });
      }
    }
  };

  const removeFromCart = (menuItemId: number) => {
    if (cart && cart.items[0].quantity === 1) {
      setCart(null);
      return;
    }

    if (cart) {
      const itemInCart = cart.items.find((item) => item.id === menuItemId);

      if (itemInCart && itemInCart.quantity > 1) {
        itemInCart.quantity--;
        const newItems = cart.items.map((item) => {
          return item.id === itemInCart.id ? itemInCart : item;
        });
        setCart({ ...cart, items: newItems });
      } else {
        const newItems = cart.items.filter((item) => item.id !== menuItemId);
        setCart({ ...cart, items: newItems });
      }
    }
  };

  const clearCart = () => {
    setCart(null);
  };

  const checkout = async (amount: number) => {
    setIsLoading(true);
    paymentSheetParamsRequest(amount)
      .then((res) => {
        return initPaymentSheet({
          merchantDisplayName: "Delish",
          customerId: res.customer,
          customerEphemeralKeySecret: res.ephemeralKey,
          paymentIntentClientSecret: res.paymentIntent,
        });
      })
      .then(() => presentPaymentSheet())
      .then((res) => {
        if (res.error) {
          throw Error("Payment failed, please try again later!");
        } else {
          console.log("Payment Successfull");
          setCart(null);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <CheckoutContext.Provider
      value={{
        cart,
        isLoading,
        error,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export function useCheckoutContext(): CheckoutContext {
  return useContext(CheckoutContext);
}
