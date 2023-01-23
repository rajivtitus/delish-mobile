import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { Divider } from "react-native-paper";

import Layout from "../../../components/Layout";
import { useRestaurantsContext } from "../../../context/RestaurantsContext";
import { Restaurant } from "../../../ts/interfaces/restaurant";
import RestaurantInfoCard from "../components/RestaurantInfoCard";
import Search from "../components/Search";
import Loading from "../../../components/Loading";

const renderItems: ListRenderItem<Restaurant> = ({ item }) => (
  <RestaurantInfoCard restaurant={item} />
);

const renderDivider = () => <Divider bold />;

const RestaurantsScreen = (): JSX.Element => {
  const { restaurants, isLoading } = useRestaurantsContext();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Search />
      <FlatList
        data={restaurants}
        renderItem={renderItems}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={renderDivider}
      />
    </Layout>
  );
};

export default RestaurantsScreen;
