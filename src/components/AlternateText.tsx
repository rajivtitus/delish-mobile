import React from "react";
import { StyleSheet, View } from "react-native";

import Typography from "./Typography";

interface Props {
  title: string;
  textStyle?: {};
}

const AlternateText = ({ title, textStyle }: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Typography variant="subtitle" style={[styles.title, { ...textStyle }]}>
        {title}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
  },
});

export default AlternateText;
