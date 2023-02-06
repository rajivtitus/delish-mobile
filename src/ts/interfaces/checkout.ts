import { MenuItem, RestaurantSummary } from "./restaurant";

interface CartItem extends MenuItem {
  quantity: number;
}

export interface Cart {
  restaurant: RestaurantSummary;
  items: CartItem[];
}
