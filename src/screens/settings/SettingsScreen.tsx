import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

import { useAuthContext } from "../../services/context/AuthContext";
import Layout from "../../components/Layout";

export default function SettingsScreen() {
  const { onLogout } = useAuthContext();

  return (
    <Layout>
      <Text>SettingsScreen</Text>
      <Button mode="contained" onPress={() => onLogout()}>
        Logout
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({});
