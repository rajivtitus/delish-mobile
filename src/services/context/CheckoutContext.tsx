import React, { ReactNode, useState } from "react";
import { useContext, createContext } from "react";

import { MenuItem } from "../../ts/interfaces/restaurant";
import { CartItem } from "../../ts/interfaces/checkout";
interface CheckoutContext {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity: number) => void;
  removeFromCart: (menuItemId: number) => void;
}

interface Props {
  children: ReactNode;
}

export const CheckoutContext = createContext<CheckoutContext>({
  cart: [],
  addToCart: () => null,
  removeFromCart: () => null,
});

export const CheckoutProvider = ({ children }: Props): JSX.Element => {
  const [cart, setCart] = useState<CartItem[]>([]);
  console.log(cart);

  const addToCart = (menuItem: MenuItem, quantity: number) => {
    const itemInCart = cart.find((item) => item.id === menuItem.id);
    if (itemInCart) {
      itemInCart.quantity += quantity;
      const newCart = cart.map((item) => {
        return item.id === itemInCart.id ? itemInCart : item;
      });
      setCart(newCart);
    } else {
      const newItem = { ...menuItem, quantity };
      setCart((prevCart) => [...prevCart, newItem]);
    }
  };

  const removeFromCart = (menuItemId: number) => {
    const itemInCart = cart.find((item) => item.id === menuItemId);
    if (itemInCart && itemInCart.quantity > 1) {
      itemInCart.quantity--;
      const newCart = cart.map((item) => {
        return item.id === itemInCart.id ? itemInCart : item;
      });
      setCart(newCart);
    } else {
      const newCart = cart.filter((item) => item.id !== menuItemId);
      setCart(newCart);
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
