import React, { ReactElement } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { useTheme } from "react-native-paper";

import { Theme } from "../ts/types/theme";

interface Props {
  children: ReactElement | ReactElement[];
}

const Layout = ({ children }: Props) => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      backgroundColor: theme.colors.bg.primary,
    },
  });

export default Layout;
