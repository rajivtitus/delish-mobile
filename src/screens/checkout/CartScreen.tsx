import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import { Theme } from "../../ts/types/theme";
import { useCheckoutContext } from "../../services/context/CheckoutContext";
import Layout from "../../components/Layout";
import Spacer from "../../components/Spacer";
import Typography from "../../components/Typography";
import AlternateText from "../../components/AlternateText";
import Quantity from "../../components/Quantity";

const CartScreen = () => {
  const { cart, addToCart, removeFromCart } = useCheckoutContext();
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  return (
    <Layout>
      <View style={styles.container}>
        {cart && cart.items.length ? (
          cart.items.map((item) => {
            return (
              <View key={item.id} style={styles.row}>
                <View>
                  <Typography>{item.name}</Typography>
                  <Spacer position="top" size="xs">
                    <Typography variant="caption">{`$${item.price}`}</Typography>
                  </Spacer>
                </View>
                <Quantity
                  quantity={item.quantity}
                  onIncrement={() => addToCart(cart.restaurant, item, 1)}
                  onDecrement={() => removeFromCart(item.id)}
                />
              </View>
            );
          })
        ) : (
          <AlternateText title="There are no items in your cart" />
        )}
      </View>
    </Layout>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.xl,
    },
    title: {
      textAlign: "center",
      paddingVertical: theme.spacing.lg,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: theme.spacing.md,
    },
  });

export default CartScreen;
