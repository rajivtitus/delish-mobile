import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

import { Theme } from "../../ts/types/theme";
import { MenuItem } from "../../ts/interfaces/restaurant";
import HalfModal from "../HalfModal";
import Typography from "../Typography";
import Spacer from "../Spacer";
import Quantity from "../Quantity";
import { useCheckoutContext } from "../../services/context/CheckoutContext";

interface Props {
  item: MenuItem;
  isToggled: boolean;
  handleModalToggle: () => void;
}

const ItemDetailsModal = ({ item, isToggled, handleModalToggle }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCheckoutContext();
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  const onIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const onDecrement = () => {
    setQuantity((prevQuantity) => {
      return prevQuantity === 1 ? 1 : prevQuantity - 1;
    });
  };

  return (
    <HalfModal isToggled={isToggled} handleModalToggle={handleModalToggle}>
      <ScrollView style={styles.container}>
        <Spacer position="bottom" size="lg">
          <Typography variant="title">{item.name}</Typography>
          <Spacer position="bottom" size="sm" />
          <Typography variant="subtitle">{`$${item.price}`}</Typography>
        </Spacer>
        <Spacer position="bottom" size="xl" style={styles.quantity}>
          <Quantity
            quantity={quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        </Spacer>
        <Button
          mode="contained"
          icon="cart"
          onPress={() => addToCart(item, quantity)}
          style={styles.button}
        >
          Add To Cart
        </Button>
      </ScrollView>
    </HalfModal>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.bg.primary,
      padding: theme.spacing.lg,
    },
    quantity: {
      alignItems: "center",
    },
    button: {
      borderRadius: 5,
    },
  });

export default ItemDetailsModal;
