import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { Avatar, Divider } from "react-native-paper";

import { Restaurant } from "../../ts/interfaces/restaurant";
import { useFavouritesContext } from "../../services/context/FavouritesContext";
import Layout from "../../components/Layout";
import FlatListItem from "../../components/restaurants/FlatListItem";
import AlternateText from "../../components/AlternateText";
import Spacer from "../../components/Spacer";

const renderDivider = () => <Divider bold />;

const renderItems: ListRenderItem<Restaurant> = ({ item }) => (
  <FlatListItem item={item} />
);

export default function FavouritesScreen() {
  const { favourites } = useFavouritesContext();

  return (
    <Layout>
      {favourites.length ? (
        <FlatList
          data={favourites}
          renderItem={renderItems}
          keyExtractor={(item) => item.placeId}
          ItemSeparatorComponent={renderDivider}
          initialNumToRender={4}
        />
      ) : (
        <AlternateText title="You don't have any favourites at this time!">
          <Spacer position="bottom" size="lg">
            <Avatar.Icon icon="heart-off-outline" size={96} />
          </Spacer>
        </AlternateText>
      )}
    </Layout>
  );
}
