import React, { ReactNode } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import { Theme } from "../ts/types/theme";

interface Props {
  children: ReactNode;
  style?: {};
}

const Layout = ({ children, style }: Props) => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  return (
    <SafeAreaView style={[styles.container, { ...style }]}>
      {children}
    </SafeAreaView>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.bg.primary,
    },
  });

export default Layout;
