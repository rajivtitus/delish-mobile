import { MenuItem } from "./restaurant";

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface PaymentSheetApiData {
  paymentIntent: string;
}
