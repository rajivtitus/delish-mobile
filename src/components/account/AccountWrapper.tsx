import React, { useState, ReactNode } from "react";
import { StyleSheet, ImageBackground, Image, View } from "react-native";
import { useTheme } from "react-native-paper";

import { Theme } from "../../ts/types/theme";
import FadeInView from "../animations/FadeInView";
import Spacer from "../Spacer";
import Typography from "../Typography";

const home = require("../../../assets/images/home.jpg");
const logo = require("../../../assets/icons/icon.png");
const homeUri = Image.resolveAssetSource(home).uri;
const logoUri = Image.resolveAssetSource(logo).uri;

interface Props {
  children: ReactNode;
}

const AccountWrapper = ({ children }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: homeUri }}
        resizeMode="cover"
        style={styles.background}
        onLoad={() => setIsImageLoaded(true)}
      >
        <View style={styles.overlay} />
        {isImageLoaded ? (
          <FadeInView>
            <Spacer position="bottom" size="lg" style={styles.header}>
              <Image
                resizeMode="contain"
                source={{ uri: logoUri }}
                style={styles.logo}
              />
              <Spacer position="left" size="sm" />
              <Typography variant="title" style={styles.title}>
                Delish
              </Typography>
            </Spacer>
            <View style={styles.formContainer}>{children}</View>
          </FadeInView>
        ) : (
          <></>
        )}
      </ImageBackground>
    </View>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.bg.primary,
    },
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
    header: {
      flexDirection: "row",
      justifyContent: "center",
    },
    logo: {
      width: 42,
      height: 42,
    },
    title: {
      fontSize: 42,
      color: theme.colors.primary,
    },
    formContainer: {
      maxWidth: 325,
      borderRadius: 5,
      padding: theme.spacing.xl,
      backgroundColor: "rgba(255,255,255,0.95)",
    },
  });

export default AccountWrapper;
