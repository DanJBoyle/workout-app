import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import IconButton from "../UI/IconButton";

type BaseModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function BaseModal({
  visible,
  onClose,
  children,
}: BaseModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        {/* Background press area */}
        <Pressable style={styles.background} onPress={onClose} />

        {/* Modal content */}
        <View style={styles.modal}>
          <View style={styles.closeButton}>
            <IconButton
              icon="close"
              size={24}
              color="#ff0000"
              onPress={onClose}
            />
          </View>

          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modal: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    position: "relative",
    alignSelf: "center",
  },

  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
