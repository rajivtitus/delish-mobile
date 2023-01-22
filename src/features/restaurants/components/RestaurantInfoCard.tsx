import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { SvgXml } from "react-native-svg";

import { Theme } from "../../../ts/types/theme";
import { Restaurant } from "../../../ts/interfaces/restaurant";
import star from "../../../../assets/star";
import open from "../../../../assets/open";
import Spacer from "../../../components/Spacer";
import Typography from "../../../components/Typography";

interface Props {
  restaurant: any;
}

const calculateStars = (num: number) => {
  return Array.from(new Array(Math.round(num)));
};

const RestaurantInfoCard = ({ restaurant }: Props): JSX.Element => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);
  const {
    name,
    icon,
    photos,
    address,
    isOpenNow,
    rating,
    isClosedTemporarily,
  } = restaurant;
  const ratingStars = calculateStars(rating);

  return (
    <Card mode="contained" style={styles.card}>
      <Card.Cover
        key={name}
        borderTopLeftRadius={0}
        borderTopRightRadius={0}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        style={styles.cover}
        source={{ uri: photos }}
      />
      <View style={styles.cardDetails}>
        <Typography variant="title">{name}</Typography>
        <Spacer position="vertical" size="sm">
          <View style={styles.status}>
            <View style={styles.status}>
              {ratingStars.map((_, index) => (
                <SvgXml xml={star} key={index} height={20} width={20} />
              ))}
            </View>
            <View style={styles.status}>
              {!isClosedTemporarily && (
                <Typography variant="subtitle" style={styles.closedText}>
                  Closed
                </Typography>
              )}
              <Spacer position="left" size="sm" />
              {isOpenNow && <SvgXml xml={open} height={20} width={20} />}
            </View>
          </View>
        </Spacer>
        <Typography variant="body">{address}</Typography>
      </View>
    </Card>
  );
};

const makeStyles = ({ colors, spacing }: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.bg.primary,
      padding: spacing.md,
    },
    cover: {
      backgroundColor: colors.bg.primary,
      padding: spacing.sm,
    },
    cardDetails: {
      padding: spacing.sm,
    },
    status: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    closedText: {
      textTransform: "uppercase",
      color: colors.text.error,
    },
  });

export default RestaurantInfoCard;
