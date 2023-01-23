import React from "react";
import { Image, StyleSheet, View } from "react-native";
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
  restaurant: Restaurant;
}

const calculateStars = (num: number) => {
  return Array.from(new Array(Math.round(num)));
};

const RestaurantInfoCard = ({ restaurant }: Props): JSX.Element => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);
  const { name, icon, address, isOpenNow, rating, isClosedTemporarily } =
    restaurant;
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
        source={{ uri: "https://source.unsplash.com/random" }}
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
              {isClosedTemporarily && (
                <Typography variant="subtitle" style={styles.closedText}>
                  Closed
                </Typography>
              )}
              <Spacer position="left" size="sm" />
              {isOpenNow && <SvgXml xml={open} height={25} width={25} />}
              <Spacer position="left" size="md">
                <Image style={styles.icon} source={{ uri: icon }} />
              </Spacer>
            </View>
          </View>
        </Spacer>
        <Typography variant="body">Chicago</Typography>
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
      color: colors.text.error,
    },
    icon: {
      width: 15,
      height: 15,
    },
  });

export default RestaurantInfoCard;
