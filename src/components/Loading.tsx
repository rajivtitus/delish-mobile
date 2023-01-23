import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

import { Theme } from "../ts/types/theme";

const Loading = () => {
  const { colors } = useTheme<Theme>();

  return (
    <View style={styles.loading}>
      <ActivityIndicator
        style={styles.loading}
        size={50}
        animating={true}
        color={colors.brand.primary}
      />
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
