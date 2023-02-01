import React, { useCallback, useState } from "react";
import { User } from "firebase/auth";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Avatar, List, ListItemProps, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Theme } from "../../ts/types/theme";
import { SettingsStackNavigationProps } from "../../ts/types/navigation";
import { useAuthContext } from "../../services/context/AuthContext";
import Layout from "../../components/Layout";
import Spacer from "../../components/Spacer";
import Typography from "../../components/Typography";

const renderFavouritesItem: ListItemProps["left"] = (props) => (
  <List.Icon {...props} icon="heart" />
);

const renderLogoutItem: ListItemProps["left"] = (props) => (
  <List.Icon {...props} icon="door" />
);

export default function SettingsScreen() {
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const { user, onLogout } = useAuthContext();
  const navigation = useNavigation<SettingsStackNavigationProps>();
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  const getProfilePhoto = async (currentUser: User) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    photoUri && setProfilePhoto(photoUri);
  };

  useFocusEffect(
    useCallback(() => {
      if (user) {
        getProfilePhoto(user);
      }
    }, [user])
  );

  return (
    <Layout>
      <View style={styles.userInfo}>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          {profilePhoto ? (
            <Avatar.Image size={165} source={{ uri: profilePhoto }} />
          ) : (
            <Avatar.Icon size={165} icon="human" />
          )}
        </TouchableOpacity>
        <Spacer position="bottom" size="lg" />
        <Typography>{user?.email || ""}</Typography>
      </View>

      <List.Section>
        <List.Item
          title="Favourites"
          left={renderFavouritesItem}
          description="View your favourites"
          onPress={() => navigation.navigate("Favourites")}
        />
        <List.Item title="Logout" left={renderLogoutItem} onPress={onLogout} />
      </List.Section>
    </Layout>
  );
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    userInfo: {
      alignItems: "center",
      padding: theme.spacing.lg,
    },
  });
