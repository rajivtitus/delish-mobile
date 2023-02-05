import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Button } from "react-native-paper";

import { Theme } from "../../ts/types/theme";
import { MenuItem as Item } from "../../ts/interfaces/restaurant";
import Spacer from "../Spacer";
import Typography from "../Typography";

interface Props {
  item: Item;
}

const MenuItem = ({ item }: Props) => {
  const [quantity, setQuantity] = useState(0);
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  const onIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const onDecrement = () => {
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  return (
    <View style={styles.container}>
      <View>
        <Typography>{item.name}</Typography>
        <Spacer position="top" size="xs">
          <Typography variant="caption">{`$${item.price}`}</Typography>
        </Spacer>
      </View>
      <View style={styles.buttonContainer}>
        {quantity ? (
          <>
            <Button
              mode="outlined"
              onPress={onDecrement}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              compact
            >
              -
            </Button>
            <Typography style={styles.quantity}>{quantity}</Typography>
            <Button
              mode="outlined"
              onPress={onIncrement}
              disabled={quantity === 99}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              compact
            >
              +
            </Button>
          </>
        ) : (
          <Button
            mode="outlined"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={onIncrement}
          >
            Add
          </Button>
        )}
      </View>
    </View>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    button: {
      borderRadius: 5,
    },
    buttonLabel: {
      marginVertical: theme.spacing.xs,
      marginHorizontal: theme.spacing.md,
    },
    quantity: {
      paddingHorizontal: theme.spacing.md,
    },
  });

export default MenuItem;
