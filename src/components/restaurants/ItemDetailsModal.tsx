import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Portal, Modal, Button, useTheme } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

import { Theme } from "../../ts/types/theme";
import { MenuItem } from "../../ts/interfaces/restaurant";
import { useCheckoutContext } from "../../services/context/CheckoutContext";
import Typography from "../Typography";
import Spacer from "../Spacer";
import Quantity from "../Quantity";

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
    <Portal>
      <Modal visible={isToggled}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleModalToggle}
          >
            <AntDesign name="close" size={24} />
          </TouchableOpacity>
          <ScrollView style={styles.scrollContainer}>
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
        </View>
      </Modal>
    </Portal>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: "100%",
      top: "75%",
    },
    closeButton: {
      position: "absolute",
      right: 5,
      padding: theme.spacing.sm,
    },
    scrollContainer: {
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
