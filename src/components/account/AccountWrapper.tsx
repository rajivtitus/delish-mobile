import React, { ReactElement } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { useTheme } from "react-native-paper";

import { Theme } from "../../ts/types/theme";

interface Props {
  children: ReactElement | ReactElement[];
}

const AccountWrapper = ({ children }: Props) => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  return (
    <ImageBackground
      source={{ uri: "https://source.unsplash.com/random" }}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.formContainer}>{children}</View>
    </ImageBackground>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    background: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    overlay: {
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(255,255,255,0.25)",
    },
    formContainer: {
      maxWidth: 325,
      borderRadius: 5,
      padding: theme.spacing.xl,
      backgroundColor: "rgba(255,255,255,0.75)",
    },
  });

export default AccountWrapper;
