import React, { ReactElement } from "react";
import { StyleSheet, ImageBackground, Image, View } from "react-native";
import { useTheme } from "react-native-paper";

import { Theme } from "../../ts/types/theme";
import Spacer from "../Spacer";
import Typography from "../Typography";

const home = require("../../../assets/images/home.jpg");
const homeUri = Image.resolveAssetSource(home).uri;

interface Props {
  children: ReactElement | ReactElement[];
}

const AccountWrapper = ({ children }: Props) => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  return (
    <ImageBackground
      source={{ uri: homeUri }}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.overlay} />
      <Spacer position="bottom" size="xl">
        <Typography variant="title" style={styles.title}>
          Delish
        </Typography>
      </Spacer>
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
    title: {
      fontSize: 42,
      color: theme.colors.brand.primary,
    },
    formContainer: {
      maxWidth: 325,
      borderRadius: 5,
      padding: theme.spacing.xl,
      backgroundColor: "rgba(255,255,255,0.85)",
    },
  });

export default AccountWrapper;
