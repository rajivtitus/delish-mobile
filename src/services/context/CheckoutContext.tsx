import React, { ReactNode, useState } from "react";
import { useContext, createContext } from "react";
import { useStripe } from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/native";

import { MenuItem, Restaurant } from "../../ts/interfaces/restaurant";
import { CartItem } from "../../ts/interfaces/checkout";
import { CheckoutStackNavigationProps } from "../../ts/types/navigation";
import { paymentSheetParamsRequest } from "../api/checkout";

interface CheckoutContext {
  currRestaurant: Restaurant | null | undefined;
  cart: CartItem[];
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
  currRestaurant: null,
  cart: [],
  isLoading: false,
  error: null,
  addToCart: () => null,
  removeFromCart: () => null,
  clearCart: () => null,
  checkout: () => null,
});

export const CheckoutProvider = ({ children }: Props): JSX.Element => {
  const [currRestaurant, setCurrRestaurant] = useState<
    Restaurant | null | undefined
  >(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | undefined>(null);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const navigation = useNavigation<CheckoutStackNavigationProps>();

  const addToCart = (
    restaurant: Restaurant,
    menuItem: MenuItem,
    quantity: number
  ) => {
    if (!currRestaurant) {
      const newCart = [{ ...menuItem, quantity }];
      setCurrRestaurant(restaurant);
      setCart(newCart);
      return;
    }

    if (currRestaurant.placeId !== restaurant.placeId) {
      console.log("You already have an order from another restaurant");
      return;
    }

    if (currRestaurant) {
      const itemInCart = cart.find((item) => item.id === menuItem.id);
      if (itemInCart) {
        itemInCart.quantity += quantity;
        const newItems = cart.map((item) => {
          return item.id === itemInCart.id ? itemInCart : item;
        });
        setCart(newItems);
      } else {
        const newItem = { ...menuItem, quantity };
        setCart([...cart, newItem]);
      }
    }
  };

  const removeFromCart = (menuItemId: number) => {
    if (currRestaurant && (cart.length && cart[0].quantity) === 1) {
      setCurrRestaurant(null);
      setCart([]);
      return;
    }

    if (currRestaurant) {
      const itemInCart = cart.find((item) => item.id === menuItemId);

      if (itemInCart && itemInCart.quantity > 1) {
        itemInCart.quantity--;
        const newItems = cart.map((item) => {
          return item.id === itemInCart.id ? itemInCart : item;
        });
        setCart(newItems);
      } else {
        const newItems = cart.filter((item) => item.id !== menuItemId);
        setCart(newItems);
      }
    }
  };

  const clearCart = () => {
    setCurrRestaurant(null);
    setCart([]);
  };

  const checkout = async (amount: number) => {
    setIsLoading(true);
    paymentSheetParamsRequest(amount)
      .then((res) => {
        return initPaymentSheet({
          merchantDisplayName: "Delish",
          paymentIntentClientSecret: res.paymentIntent,
        });
      })
      .then(() => presentPaymentSheet())
      .then((res) => {
        if (res.error) {
          navigation.navigate("Checkout Status", { error: res.error.message });
        } else {
          setCart([]);
          setCurrRestaurant(null);
          navigation.navigate("Checkout Status");
        }
      })
      .catch((err) => {
        setError(err.message);
        navigation.navigate("Checkout Status", { error: err.message });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <CheckoutContext.Provider
      value={{
        cart,
        currRestaurant,
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
