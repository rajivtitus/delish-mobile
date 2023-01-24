import React from "react";
import { FlatList, ListRenderItem, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";

import { useRestaurantsContext } from "../../../context/RestaurantsContext";
import { Restaurant } from "../../../ts/interfaces/restaurant";
import { RestaurantsStackScreenProps } from "../../../ts/types/navigation";
import Layout from "../../../components/Layout";
import RestaurantInfoCard from "../components/RestaurantInfoCard";
import Search from "../components/Search";
import Loading from "../../../components/Loading";

const renderDivider = () => <Divider bold />;

const RestaurantsScreen = ({
  navigation,
}: RestaurantsStackScreenProps): JSX.Element => {
  const { restaurants, isLoading } = useRestaurantsContext();

  const renderItems: ListRenderItem<Restaurant> = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("RestaurantDetail", { restaurant: item })
      }
    >
      <RestaurantInfoCard restaurant={item} />
    </TouchableOpacity>
  );

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
          initialNumToRender={5}
        />
      )}
    </Layout>
  );
};

export default RestaurantsScreen;
