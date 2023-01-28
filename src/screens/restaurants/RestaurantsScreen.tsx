import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { Divider } from "react-native-paper";

import { useRestaurantsContext } from "../../services/context/RestaurantsContext";
import { useFavouritesContext } from "../../services/context/FavouritesContext";
import { Restaurant } from "../../ts/interfaces/restaurant";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import Search from "../../components/Search";
import FlatListItem from "../../components/restaurants/FlatListItem";
import FavouritesBar from "../../components/FavouritesBar";

const renderDivider = () => <Divider bold />;

const renderItems: ListRenderItem<Restaurant> = ({ item }) => (
  <FlatListItem item={item} />
);

const renderHeader = (favourites: Restaurant[]) => {
  return favourites.length ? <FavouritesBar favourites={favourites} /> : null;
};

const RestaurantsScreen = (): JSX.Element => {
  const { restaurants, isLoading } = useRestaurantsContext();
  const { favourites } = useFavouritesContext();

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
          ListHeaderComponent={() => renderHeader(favourites)}
          ItemSeparatorComponent={renderDivider}
          initialNumToRender={4}
        />
      )}
    </Layout>
  );
};

export default RestaurantsScreen;
