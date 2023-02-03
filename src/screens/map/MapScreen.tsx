import React, { useEffect, useState } from "react";
import MapView, { MapMarker, MapCallout } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { RestaurantsStackNavigationProps } from "../../ts/types/navigation";
import { useRestaurantsContext } from "../../services/context/RestaurantsContext";
import { useLocationContext } from "../../services/context/LocationContext";
import Search from "../../components/Search";
import Callout from "../../components/map/Callout";

const MapScreen = () => {
  const [latDelta, setLatDelta] = useState(0);
  const { restaurants } = useRestaurantsContext();
  const { location } = useLocationContext();
  const navigation = useNavigation<RestaurantsStackNavigationProps>();

  useEffect(() => {
    if (location) {
      const northEastLat = location.viewport.northeast.lat;
      const southWestLat = location.viewport.southwest.lat;
      setLatDelta(northEastLat - southWestLat);
    }
  }, [location]);

  return (
    <>
      <View style={styles.search}>
        <Search icon="map" />
      </View>
      <MapView
        style={styles.mapView}
        region={{
          latitude: location?.lat ?? 0,
          longitude: location?.lng ?? 0,
          latitudeDelta: latDelta,
          longitudeDelta: 0.01,
        }}
      >
        {restaurants.map((restaurant) => (
          <MapMarker
            key={restaurant.placeId}
            title={restaurant.name}
            coordinate={{
              longitude: restaurant.geometry.location.lng,
              latitude: restaurant.geometry.location.lat,
            }}
          >
            <MapCallout
              onPress={() =>
                navigation.navigate("Restaurant Details", { restaurant })
              }
            >
              <Callout restaurant={restaurant} />
            </MapCallout>
          </MapMarker>
        ))}
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
  search: {
    position: "absolute",
    top: 60,
    left: 0,
    width: "100%",
    zIndex: 99,
  },
});

export default MapScreen;
