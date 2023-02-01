import { DefaultTheme, configureFonts } from "react-native-paper";

const fontConfig = {
  fontFamily: "Lato_400Regular",
};

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2182BD",
    secondary: "#757575",
    tertiary: "#F1F1F1",
    error: "#D0421B",
    success: "#138000",
    bg: {
      primary: "#FFFFFF",
      secondary: "#F1F1F1",
    },
    text: {
      primary: "#262626",
      secondary: "#757575",
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },
  fontSizes: {
    title: 22,
    subtitle: 18,
    button: 18,
    body: 16,
    caption: 14,
  },
  fontWeights: {
    regular: "400",
    medium: "500",
    bold: "700",
  },
  fonts: configureFonts({ config: fontConfig }),
};

export default theme;
