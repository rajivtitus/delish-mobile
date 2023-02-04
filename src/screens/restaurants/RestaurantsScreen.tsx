import React from "react";
import { FlatList, View, ListRenderItem, StyleSheet } from "react-native";
import { Divider, useTheme } from "react-native-paper";

import { useRestaurantsContext } from "../../services/context/RestaurantsContext";
import { useFavouritesContext } from "../../services/context/FavouritesContext";
import { useLocationContext } from "../../services/context/LocationContext";
import { Theme } from "../../ts/types/theme";
import { Restaurant } from "../../ts/interfaces/restaurant";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import Search from "../../components/Search";
import FadeInView from "../../components/animations/FadeInView";
import FlatListItem from "../../components/restaurants/FlatListItem";
import FavouritesBar from "../../components/FavouritesBar";
import AlternateText from "../../components/AlternateText";

const renderDivider = () => <Divider bold />;

const renderHeader = (favourites: Restaurant[]) => {
  return favourites.length ? <FavouritesBar favourites={favourites} /> : null;
};

const renderItems: ListRenderItem<Restaurant> = ({ item }) => (
  <FadeInView>
    <FlatListItem item={item} />
  </FadeInView>
);

const RestaurantsScreen = (): JSX.Element => {
  const { restaurants, isLoading } = useRestaurantsContext();
  const { error } = useLocationContext();
  const { favourites } = useFavouritesContext();
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  if (isLoading) {
    return (
      <Layout>
        <Search />
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <Search />
      {restaurants.length && !error ? (
        <FlatList
          data={restaurants}
          renderItem={renderItems}
          keyExtractor={(item) => item.placeId}
          ListHeaderComponent={() => renderHeader(favourites)}
          ItemSeparatorComponent={renderDivider}
          initialNumToRender={4}
        />
      ) : (
        <></>
      )}
      <View style={styles.textContainer}>
        {error && <AlternateText title={error} textStyle={styles.errorText} />}
      </View>
    </Layout>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    textContainer: {
      flex: 1,
      padding: theme.spacing.lg,
    },
    errorText: {
      color: theme.colors.error,
    },
  });

export default RestaurantsScreen;
