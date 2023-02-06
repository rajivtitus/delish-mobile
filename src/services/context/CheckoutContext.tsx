import React, { ReactNode, useState } from "react";
import { useContext, createContext } from "react";

import { MenuItem, RestaurantSummary } from "../../ts/interfaces/restaurant";
import { Cart } from "../../ts/interfaces/checkout";
interface CheckoutContext {
  cart: Cart | null | undefined;
  addToCart: (
    restaurant: RestaurantSummary,
    item: MenuItem,
    quantity: number
  ) => void;
  removeFromCart: (menuItemId: number) => void;
}

interface Props {
  children: ReactNode;
}

export const CheckoutContext = createContext<CheckoutContext>({
  cart: null,
  addToCart: () => null,
  removeFromCart: () => null,
});

export const CheckoutProvider = ({ children }: Props): JSX.Element => {
  const [cart, setCart] = useState<Cart | null | undefined>(null);

  const addToCart = (
    restaurant: RestaurantSummary,
    menuItem: MenuItem,
    quantity: number
  ) => {
    if (!cart) {
      const newCart = { restaurant, items: [{ ...menuItem, quantity }] };
      setCart(newCart);
    }

    if (cart && cart.restaurant.placeId !== restaurant.placeId) {
      console.log("Resto already in cart");
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
    if (cart && cart.items.length === 1) {
      setCart(null);
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

  return (
    <CheckoutContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export function useCheckoutContext(): CheckoutContext {
  return useContext(CheckoutContext);
}
