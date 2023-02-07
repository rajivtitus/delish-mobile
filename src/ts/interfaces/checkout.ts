import { MenuItem, Restaurant } from "./restaurant";

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Cart {
  restaurant: Restaurant;
  items: CartItem[];
}
