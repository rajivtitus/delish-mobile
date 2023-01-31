import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, Button, TextInput, HelperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { Theme } from "../../ts/types/theme";
import { AccountStackNavigationProps } from "../../ts/types/navigation";
import { useAuthContext } from "../../services/context/AuthContext";
import AccountWrapper from "../../components/account/AccountWrapper";
import Typography from "../../components/Typography";
import Spacer from "../../components/Spacer";

const RegisterScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const { onRegister, isLoading, error } = useAuthContext();

  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);
  const navigation = useNavigation<AccountStackNavigationProps>();

  const handleRegister = () => {
    if (email && password && repeatedPassword) {
      onRegister(email, password, repeatedPassword);
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
          onChangeText={(text) => setPassword(text)}
        />
      </Spacer>
      <Spacer position="bottom" size="lg">
        <TextInput
          label="Repeat Password"
          value={repeatedPassword}
          textContentType="password"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={(text) => setRepeatedPassword(text)}
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
          buttonColor={theme.colors.brand.primary}
          style={styles.button}
          onPress={handleRegister}
          loading={isLoading}
          uppercase
        >
          Register
        </Button>
      </Spacer>
      <View style={styles.formFooter}>
        <Typography>Already have an account?</Typography>
        <Button
          labelStyle={styles.link}
          onPress={() => navigation.navigate("Login")}
        >
          Login here
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

export default RegisterScreen;
