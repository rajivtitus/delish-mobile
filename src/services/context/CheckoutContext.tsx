import React, { ReactNode, useState } from "react";
import { useContext, createContext } from "react";

import { MenuItem, Restaurant } from "../../ts/interfaces/restaurant";
import { Cart } from "../../ts/interfaces/checkout";
interface CheckoutContext {
  cart: Cart | null | undefined;
  addToCart: (restaurant: Restaurant, item: MenuItem, quantity: number) => void;
  removeFromCart: (menuItemId: number) => void;
  clearCart: () => void;
}

interface Props {
  children: ReactNode;
}

export const CheckoutContext = createContext<CheckoutContext>({
  cart: null,
  addToCart: () => null,
  removeFromCart: () => null,
  clearCart: () => null,
});

export const CheckoutProvider = ({ children }: Props): JSX.Element => {
  const [cart, setCart] = useState<Cart | null | undefined>(null);

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

  return (
    <CheckoutContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export function useCheckoutContext(): CheckoutContext {
  return useContext(CheckoutContext);
}
