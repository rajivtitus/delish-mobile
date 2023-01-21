import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

import { useTheme } from "react-native-paper";
import { Theme } from "../../../ts/types/theme";
import { Restaurant } from "../../../ts/interfaces/restaurant";

interface Props {
  restaurant: any;
}

const RestaurantInfoCard = ({ restaurant }: Props): JSX.Element => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  const {
    name,
    icon,
    photos,
    address,
    openingHours,
    rating,
    isClosedTemporarily,
  } = restaurant;

  return (
    <Card elevation={5} style={styles.card}>
      <Card.Cover key={name} style={styles.cover} source={{ uri: photos }} />
      <Text variant="titleMedium" style={styles.title}>
        {name}
      </Text>
    </Card>
  );
};

const makeStyles = ({ colors, spacing }: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.bg.primary,
      borderRadius: 5,
    },
    cover: {
      backgroundColor: colors.bg.primary,
      borderRadius: 0,
      padding: spacing.md,
    },
    title: {
      padding: spacing.md,
    },
  });

export default RestaurantInfoCard;
