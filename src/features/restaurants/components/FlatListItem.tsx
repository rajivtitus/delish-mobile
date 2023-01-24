import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { RestaurantsStackNavigationProps } from "../../../ts/types/navigation";
import { Restaurant } from "../../../ts/interfaces/restaurant";
import RestaurantInfoCard from "../components/RestaurantInfoCard";

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
      <RestaurantInfoCard restaurant={item} />
    </TouchableOpacity>
  );
};

export default memo(FlatListItem);
