import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { Divider } from "react-native-paper";

import { useRestaurantsContext } from "../../../context/RestaurantsContext";
import { Restaurant } from "../../../ts/interfaces/restaurant";
import Layout from "../../../components/Layout";
import Search from "../components/Search";
import Loading from "../../../components/Loading";
import FlatListItem from "../components/FlatListItem";

const renderDivider = () => <Divider bold />;

const renderItems: ListRenderItem<Restaurant> = ({ item }) => (
  <FlatListItem item={item} />
);

const RestaurantsScreen = (): JSX.Element => {
  const { restaurants, isLoading } = useRestaurantsContext();

  return (
    <Layout>
      <Search />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={restaurants}
          renderItem={renderItems}
          keyExtractor={(item) => item.placeId}
          ItemSeparatorComponent={renderDivider}
          initialNumToRender={4}
        />
      )}
    </Layout>
  );
};

export default RestaurantsScreen;
