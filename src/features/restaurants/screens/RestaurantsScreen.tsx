import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Searchbar, Divider, useTheme } from "react-native-paper";

import Layout from "../../../components/Layout";
import { Theme } from "../../../ts/types/theme";
import RestaurantInfoCard from "../components/RestaurantInfoCard";
import { useRestaurantsContext } from "../../../context/RestaurantsContext";
import Loading from "../../../components/Loading";

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

const renderDivider = () => <Divider bold />;

const RestaurantsScreen = (): JSX.Element => {
  const { isLoading } = useRestaurantsContext();
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <View style={styles.search}>
        <Searchbar value="Boom" />
      </View>
      <FlatList
        data={[{ name: "1" }, { name: "2" }, { name: "3" }]}
        renderItem={() => <RestaurantInfoCard restaurant={restaurant} />}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={renderDivider}
      />
    </Layout>
  );
};

const makeStyles = ({ spacing }: Theme) =>
  StyleSheet.create({
    search: {
      padding: spacing.lg,
    },
  });

export default RestaurantsScreen;
