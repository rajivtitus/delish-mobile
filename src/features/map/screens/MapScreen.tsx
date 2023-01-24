import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";

import Search from "../../../components/Search";

const MapScreen = () => {
  return (
    <>
      <View style={styles.search}>
        <Search icon="map" />
      </View>
      <MapView style={styles.mapView} />
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
