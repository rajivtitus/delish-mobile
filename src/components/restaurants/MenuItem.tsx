import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Button } from "react-native-paper";

import { Theme } from "../../ts/types/theme";
import { MenuItem as Item, Restaurant } from "../../ts/interfaces/restaurant";
import Typography from "../Typography";
import Spacer from "../Spacer";
import ItemDetailsModal from "./ItemDetailsModal";

interface Props {
  restaurant: Restaurant;
  item: Item;
}

const MenuItem = ({ restaurant, item }: Props) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  const handleModalToggle = () => {
    setIsToggled((prevIsToggled) => !prevIsToggled);
  };

  return (
    <View style={styles.container}>
      <View>
        <Typography>{item.name}</Typography>
        <Spacer position="top" size="xs">
          <Typography variant="caption">{`$${item.price.toFixed(
            2
          )}`}</Typography>
        </Spacer>
      </View>
      <Button
        mode="outlined"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={handleModalToggle}
        compact
      >
        +
      </Button>
      <ItemDetailsModal
        item={item}
        isToggled={isToggled}
        handleModalToggle={handleModalToggle}
        restaurant={restaurant}
      />
    </View>
  );
};
const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    button: {
      borderRadius: 5,
    },
    buttonLabel: {
      marginVertical: theme.spacing.xs,
      marginHorizontal: theme.spacing.lg,
    },
  });

export default MenuItem;
