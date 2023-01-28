import React from "react";

import RestaurantCompactCard from "../../components/RestaurantCompactCard";

import { Restaurant } from "../../ts/interfaces/restaurant";

interface Props {
  restaurant: Restaurant;
}

const Callout = ({ restaurant }: Props) => {
  return <RestaurantCompactCard restaurant={restaurant} isMap />;
};

export default Callout;
