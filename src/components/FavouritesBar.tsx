import React from "react";
import { Divider, useTheme } from "react-native-paper";
import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RestaurantsStackNavigationProps } from "../ts/types/navigation";

import { Theme } from "../ts/types/theme";
import { Restaurant } from "../ts/interfaces/restaurant";
import Typography from "./Typography";
import Spacer from "./Spacer";
import RestaurantCompactCard from "./RestaurantCompactCard";

interface Props {
  favourites: Restaurant[];
}

export default function FavouritesBar({ favourites }: Props) {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);
  const navigation = useNavigation<RestaurantsStackNavigationProps>();

  return (
    <View style={styles.container}>
      <Spacer position="vertical" size="md">
        <Typography variant="title">Your Favourites</Typography>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((favourite) => (
          <Spacer key={favourite.placeId} position="right" size="sm">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("RestaurantDetail", {
                  restaurant: favourite,
                });
              }}
            >
              <RestaurantCompactCard restaurant={favourite} />
            </TouchableOpacity>
          </Spacer>
        ))}
      </ScrollView>
      <Divider bold />
    </View>
  );
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: theme.spacing.lg,
    },
  });
