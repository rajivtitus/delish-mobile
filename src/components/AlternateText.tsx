import React from "react";
import { StyleSheet, View } from "react-native";

import Typography from "./Typography";

interface Props {
  title: string;
}

const AlternateText = ({ title }: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Typography variant="subtitle">{title}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AlternateText;
