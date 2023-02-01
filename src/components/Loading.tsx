import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator style={styles.loading} size={50} animating={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

export default Loading;
