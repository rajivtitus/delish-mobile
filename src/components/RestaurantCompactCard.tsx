import React from "react";
import { StyleSheet, Image, View, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import WebView from "react-native-webview";

import { Theme } from "../ts/types/theme";
import { Restaurant } from "../ts/interfaces/restaurant";
import Typography from "../components/Typography";

interface Props {
  restaurant: Restaurant;
  isMap?: boolean;
}

const RestaurantCompactCard = ({ restaurant, isMap }: Props) => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);
  // Redering webview on android as image is not displayed
  // when using regular Image component
  const isAndroid = Platform.OS === "android";

  return (
    <View style={styles.container}>
      {/*Display webview only for Google maps*/}
      {isAndroid && isMap ? (
        <View style={[styles.webView, styles.image]}>
          <WebView resizeMode="cover" source={{ uri: restaurant.photos[0] }} />
        </View>
      ) : (
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: restaurant.photos[0] }}
        />
      )}
      <Typography style={styles.title}>{restaurant.name}</Typography>
    </View>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: 135,
      alignItems: "center",
    },
    image: {
      height: 100,
      width: 125,
      borderRadius: 5,
    },
    webView: {
      paddingTop: theme.spacing.sm,
    },
    title: {
      fontWeight: "700",
      textAlign: "center",
      padding: theme.spacing.sm,
    },
  });

export default RestaurantCompactCard;
