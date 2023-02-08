import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, Button } from "react-native-paper";

import { Theme } from "../ts/types/theme";
import Typography from "./Typography";

interface Props {
  quantity: number;
  onIncrement: any;
  onDecrement: any;
}

const Quantity = ({ quantity, onIncrement, onDecrement }: Props) => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  return (
    <View style={styles.buttonContainer}>
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
    </View>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
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

export default Quantity;
