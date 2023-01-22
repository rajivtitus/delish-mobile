import React, { ReactElement } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import { Theme } from "../ts/types/theme";

type Position = "top" | "right" | "bottom" | "left" | "vertical" | "horizontal";

type Size = "xs" | "sm" | "md" | "lg";

interface Props {
  position: Position;
  size: Size;
  children?: ReactElement | ReactElement[];
  style?: {};
}

const positions = {
  top: "marginTop",
  right: "marginRight",
  bottom: "marginBottom",
  left: "marginLeft",
  vertical: "marginVertical",
  horizontal: "marginHorizontal",
};

const Spacer = ({ position, size, children, style }: Props) => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme, position, size);

  return <View style={[styles.margin, style]}>{children}</View>;
};

const makeStyles = (theme: Theme, position: Position, size: Size) =>
  StyleSheet.create({
    margin: {
      [positions[position]]: theme.spacing[size],
    },
  });

export default Spacer;
