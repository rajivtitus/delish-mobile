import React from "react";
import { View, Text } from "react-native";
import { initPaymentSheet } from "@stripe/stripe-react-native";

import Layout from "../../components/Layout";
import MenuItem from "../../components/restaurants/MenuItem";
import { useCheckoutContext } from "../../services/context/CheckoutContext";

const CartScreen = () => {
  const { cart } = useCheckoutContext();

  return (
    <Layout>
      {cart.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </Layout>
  );
};

export default CartScreen;
