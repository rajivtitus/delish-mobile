import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Button, Divider, useTheme } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

import { Theme } from "../../ts/types/theme";
import { useCheckoutContext } from "../../services/context/CheckoutContext";
import { calcCartTotal } from "../../utils/helpers";
import Layout from "../../components/Layout";
import Spacer from "../../components/Spacer";
import Typography from "../../components/Typography";
import AlternateText from "../../components/AlternateText";
import Quantity from "../../components/Quantity";
import RestaurantCard from "../../components/restaurants/RestaurantCard";

const CartScreen = () => {
  const { cart, addToCart, removeFromCart, clearCart, checkout, isLoading } =
    useCheckoutContext();
  const cartTotal = cart?.items && calcCartTotal(cart.items);
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  return (
    <Layout>
      {cart ? (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <RestaurantCard restaurant={cart.restaurant} />
          <Divider bold />
          <View style={styles.itemsContainer}>
            <Spacer position="bottom" size="lg">
              <Typography variant="title">Order Summary</Typography>
            </Spacer>

            {cart.items.map((item) => {
              return (
                <Spacer
                  key={item.id}
                  position="bottom"
                  size="lg"
                  style={styles.row}
                >
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
                </Spacer>
              );
            })}
            <Typography variant="subtitle" style={styles.total}>
              Total: ${cartTotal?.toFixed(2)}
            </Typography>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                icon="cart"
                loading={isLoading}
                disabled={isLoading}
                onPress={() => cartTotal && checkout(cartTotal)}
                style={styles.button}
              >
                Checkout
              </Button>
              <Spacer position="bottom" size="lg" />
              <Button
                mode="outlined"
                icon="close"
                onPress={clearCart}
                style={styles.button}
              >
                Clear Cart
              </Button>
            </View>
          </View>
        </ScrollView>
      ) : (
        <AlternateText title="There are no items in your cart">
          <Spacer position="bottom" size="lg">
            <Avatar.Icon icon="cart-off" size={96} />
          </Spacer>
        </AlternateText>
      )}
    </Layout>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    scrollView: {
      flexGrow: 1,
    },
    itemsContainer: {
      flex: 1,
      padding: theme.spacing.lg,
    },
    title: {
      textAlign: "center",
      paddingVertical: theme.spacing.lg,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    total: {
      textAlign: "right",
      paddingVertical: theme.spacing.lg,
    },
    buttonContainer: {
      flex: 1,
      justifyContent: "flex-end",
      paddingBottom: theme.spacing.lg,
    },
    button: {
      borderRadius: 5,
    },
  });

export default CartScreen;
