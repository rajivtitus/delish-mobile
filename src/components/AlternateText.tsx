import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import Typography from "./Typography";

interface Props {
  title: string;
  textStyle?: {};
  children?: ReactNode;
}

const AlternateText = ({ title, textStyle, children }: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      {children}
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
