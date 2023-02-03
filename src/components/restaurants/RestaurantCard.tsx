import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { SvgXml } from "react-native-svg";

import { Theme } from "../../ts/types/theme";
import { Restaurant } from "../../ts/interfaces/restaurant";
import star from "../../../assets/svg/star";
import open from "../../../assets/svg/open";
import Spacer from "../../components/Spacer";
import Typography from "../../components/Typography";
import Favourite from "../../components/Favourite";

interface Props {
  restaurant: Restaurant;
}

const calculateStars = (num: number) => {
  return Array.from(new Array(Math.ceil(num)));
};

const RestaurantCard = ({ restaurant }: Props): JSX.Element => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);
  const {
    placeId,
    name,
    icon,
    address,
    isOpenNow,
    photos,
    rating,
    isClosedTemporarily,
  } = restaurant;
  const ratingStars = (rating && calculateStars(rating)) || [];

  return (
    <Card mode="contained" style={styles.card}>
      <Favourite restaurant={restaurant} />
      <Card.Cover
        key={name}
        borderTopLeftRadius={5}
        borderTopRightRadius={5}
        borderBottomLeftRadius={5}
        borderBottomRightRadius={5}
        style={styles.cover}
        source={{ uri: photos[0] }}
      />
      <View style={styles.cardDetails}>
        <Typography variant="title">{name}</Typography>
        <Spacer position="vertical" size="sm">
          <View style={styles.status}>
            <View style={styles.status}>
              {ratingStars.map((_, index) => (
                <SvgXml
                  xml={star}
                  key={`star-${placeId}-${index}`}
                  height={20}
                  width={20}
                />
              ))}
            </View>
            <View style={styles.status}>
              {isClosedTemporarily && (
                <Typography variant="subtitle" style={styles.closedText}>
                  Closed
                </Typography>
              )}
              {isOpenNow && <SvgXml xml={open} height={25} width={25} />}
              <Spacer position="left" size="md">
                <Image style={styles.icon} source={{ uri: icon }} />
              </Spacer>
            </View>
          </View>
        </Spacer>
        <Typography variant="caption">{address}</Typography>
      </View>
    </Card>
  );
};

const makeStyles = ({ colors, spacing }: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.bg.primary,
      padding: spacing.md,
      borderRadius: 0,
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
      color: colors.error,
    },
    icon: {
      width: 15,
      height: 15,
    },
  });

export default RestaurantCard;
