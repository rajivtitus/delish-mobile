import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { RestaurantsStackNavigationProps } from "../../../ts/types/navigation";
import { Restaurant } from "../../../ts/interfaces/restaurant";
import RestaurantCard from "./RestaurantCard";

interface Props {
  item: Restaurant;
}

const FlatListItem = ({ item }: Props): JSX.Element => {
  const navigation = useNavigation<RestaurantsStackNavigationProps>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("RestaurantDetail", { restaurant: item })
      }
    >
      <RestaurantCard restaurant={item} />
    </TouchableOpacity>
  );
};

export default memo(FlatListItem);
