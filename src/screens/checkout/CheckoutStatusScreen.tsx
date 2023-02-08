import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, useTheme } from "react-native-paper";

import { Theme } from "../../ts/types/theme";
import { CheckoutStackScreenProps } from "../../ts/types/navigation";
import Layout from "../../components/Layout";
import Spacer from "../../components/Spacer";
import AlternateText from "../../components/AlternateText";

const CheckoutStatusScreen = ({ route }: CheckoutStackScreenProps) => {
  const error = route.params?.error || "";
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  return (
    <Layout>
      {!error ? (
        <AlternateText title="Payment Success">
          <Spacer position="bottom" size="lg">
            <Avatar.Icon icon="check-bold" style={styles.success} size={96} />
          </Spacer>
        </AlternateText>
      ) : (
        <AlternateText title={error}>
          <Spacer position="bottom" size="lg">
            <Avatar.Icon
              icon="alert-circle-outline"
              style={styles.failure}
              size={96}
            />
          </Spacer>
        </AlternateText>
      )}
    </Layout>
  );
};

export default CheckoutStatusScreen;

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    success: {
      backgroundColor: theme.colors.success,
    },
    failure: {
      backgroundColor: theme.colors.error,
    },
  });
