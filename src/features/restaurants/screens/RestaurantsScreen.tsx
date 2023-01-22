import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  FlatList,
} from "react-native";
import { Searchbar, Divider, useTheme } from "react-native-paper";

import { Theme } from "../../../ts/types/theme";
import RestaurantInfoCard from "../components/RestaurantInfoCard";

const restaurant = {
  name: "Some Resto",
  icon: "",
  photos:
    "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400",
  address: "Chicago",
  isOpenNow: "12",
  rating: 4,
  isClosedTemporarily: false,
};
const RestaurantsScreen = (): JSX.Element => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <Searchbar value="Boom" />
      </View>
      <FlatList
        data={[{ name: "1" }, { name: "2" }, { name: "3" }]}
        renderItem={() => <RestaurantInfoCard restaurant={restaurant} />}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={<Divider bold />}
      />
    </SafeAreaView>
  );
};

const makeStyles = ({ spacing }: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    search: {
      padding: spacing.lg,
    },
  });

export default RestaurantsScreen;
