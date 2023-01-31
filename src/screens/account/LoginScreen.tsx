import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme, Button, TextInput, HelperText } from "react-native-paper";

import { Theme } from "../../ts/types/theme";
import { AccountStackNavigationProps } from "../../ts/types/navigation";
import { useAuthContext } from "../../services/context/AuthContext";
import AccountWrapper from "../../components/account/AccountWrapper";
import Typography from "../../components/Typography";
import Spacer from "../../components/Spacer";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { onLogin, isLoading, error } = useAuthContext();

  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);
  const { colors } = theme;
  const navigation = useNavigation<AccountStackNavigationProps>();

  const handleLogin = () => {
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <AccountWrapper>
      <Spacer position="bottom" size="lg">
        <TextInput
          label="Email"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
          activeUnderlineColor={colors.text.secondary}
          onChangeText={(text) => setEmail(text)}
        />
      </Spacer>
      <Spacer position="bottom" size="lg">
        <TextInput
          label="Password"
          value={password}
          textContentType="password"
          autoCapitalize="none"
          secureTextEntry
          activeUnderlineColor={colors.text.secondary}
          onChangeText={(text) => setPassword(text)}
        />
      </Spacer>

      {error ? (
        <Spacer position="bottom" size="lg">
          <HelperText
            style={styles.errorText}
            type="error"
            visible={Boolean(error)}
          >
            Error: {error}
          </HelperText>
        </Spacer>
      ) : (
        <></>
      )}

      <Spacer position="bottom" size="sm">
        <Button
          icon="mail"
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          loading={isLoading}
          uppercase
        >
          Login
        </Button>
      </Spacer>
      <View style={styles.formFooter}>
        <Typography>Don't have an account?</Typography>
        <Button
          labelStyle={styles.link}
          onPress={() => navigation.navigate("Register")}
          compact
        >
          Register here
        </Button>
      </View>
    </AccountWrapper>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      borderRadius: 5,
      padding: theme.spacing.sm,
    },
    formFooter: {
      flexDirection: "row",
      alignItems: "center",
    },
    link: {
      fontSize: theme.fontSizes.body,
    },
    errorText: {
      fontSize: theme.fontSizes.body,
    },
  });

export default LoginScreen;
