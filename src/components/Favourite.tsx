import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { useFavouritesContext } from "../services/context/FavouritesContext";
import { Restaurant } from "../ts/interfaces/restaurant";

interface Props {
  restaurant: Restaurant;
}

const favIcon = {
  filled: {
    name: "heart",
    color: "red",
  },
  outlined: {
    name: "hearto",
    color: "white",
  },
};

const Favourite = ({ restaurant }: Props) => {
  const { favourites, removeFavourite, addFavourite } = useFavouritesContext();
  const isFavourite = favourites.find((f) => f.placeId === restaurant.placeId);
  const icon = isFavourite ? favIcon.filled : favIcon.outlined;

  const handleOnPress = () => {
    isFavourite ? removeFavourite(restaurant) : addFavourite(restaurant);
  };

  return (
    <TouchableOpacity style={styles.favourite} onPress={handleOnPress}>
      <AntDesign name={icon.name} size={24} color={icon.color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favourite: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 9,
  },
});

export default Favourite;
