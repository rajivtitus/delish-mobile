import React, { ReactNode } from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import { Theme } from "../ts/types/theme";

type Variant = "title" | "subtitle" | "button" | "body" | "caption";

interface Props {
  variant?: Variant;
  children: ReactNode;
  style?: {};
}

const title = (theme: Theme) => ({
  fontSize: theme.fontSizes.title,
  fontWeight: theme.fontWeights.bold,
});

const subtitle = (theme: Theme) => ({
  fontSize: theme.fontSizes.subtitle,
  fontWeight: theme.fontWeights.medium,
});

const button = (theme: Theme) => ({
  fontSize: theme.fontSizes.button,
});

const body = (theme: Theme) => ({
  fontSize: theme.fontSizes.body,
});

const caption = (theme: Theme) => ({
  fontSize: theme.fontSizes.caption,
  color: theme.colors.text.secondary,
});

const variants = {
  title,
  subtitle,
  button,
  body,
  caption,
};

const Typography = ({ variant = "body", children, style }: Props) => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme, variant);
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const makeStyles = (theme: Theme, variant: Variant) =>
  StyleSheet.create({
    text: variants[variant](theme),
  });

export default Typography;
