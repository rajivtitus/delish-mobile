import React, { ReactElement } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Portal, Modal, useTheme } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

import { Theme } from "../ts/types/theme";

interface Props {
  isToggled: boolean;
  handleModalToggle: () => void;
  children: ReactElement | ReactElement[];
}

const HalfModal = ({ isToggled, handleModalToggle, children }: Props) => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  return (
    <Portal>
      <Modal visible={isToggled}>
        <View style={styles.container}>
          {children}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleModalToggle}
          >
            <AntDesign name="close" size={24} />
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: "100%",
      top: "65%",
    },
    closeButton: {
      position: "absolute",
      right: 5,
      padding: theme.spacing.sm,
    },
  });

export default HalfModal;
