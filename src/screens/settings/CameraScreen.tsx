import React, { useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import { View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Theme } from "../../ts/types/theme";
import { useAuthContext } from "../../services/context/AuthContext";
import { SettingsStackNavigationProps } from "../../ts/types/navigation";
import Typography from "../../components/Typography";
import Layout from "../../components/Layout";
import Spacer from "../../components/Spacer";

const CameraScreen = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera | null>(null);
  const { user } = useAuthContext();
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);
  const navigation = useNavigation<SettingsStackNavigationProps>();

  const clickPicture = async () => {
    if (cameraRef && cameraRef.current && user) {
      const photo = await cameraRef.current.takePictureAsync();
      await AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Typography variant="subtitle" style={styles.title}>
          No access to camera
        </Typography>
        <Spacer position="top" size="sm">
          <Button onPress={requestPermission} title="Grant permission" />
        </Spacer>
      </View>
    );
  }

  return (
    <Layout>
      <Camera
        ref={(camera) => (cameraRef.current = camera)}
        type={CameraType.front}
        ratio={"16:9"}
        style={styles.camera}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={clickPicture}>
            <AntDesign name="camera" size={52} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </Layout>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: theme.spacing.lg,
    },
    title: {
      textAlign: "center",
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      alignSelf: "center",
      justifyContent: "flex-end",
      margin: 64,
    },
  });

export default CameraScreen;
