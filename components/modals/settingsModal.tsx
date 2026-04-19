// components/modals/SettingsModal.tsx
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useSettings } from "@/context/SettingsContext";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Button from "../UI/Button";
import Container from "../UI/Container";
import Typography from "../UI/Typography";
import BaseModal from "./baseModal";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function SettingsModal({ visible, onClose }: Props) {
  const { weightUnit, setWeightUnit } = useSettings();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
    router.replace("/");
  };

  return (
    <BaseModal visible={visible} onClose={onClose}>
      <Container>
        <Typography variant="title">Settings</Typography>

        <View style={styles.settingRow}>
          <Typography variant="body">Weight Unit</Typography>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleOption,
                weightUnit === "kg" && styles.toggleOptionActive,
              ]}
              onPress={() => setWeightUnit("kg")}
              activeOpacity={0.7}
            >
              <Typography
                variant="body"
                style={
                  weightUnit === "kg" ? styles.activeText : styles.inactiveText
                }
              >
                kg
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleOption,
                weightUnit === "lbs" && styles.toggleOptionActive,
              ]}
              onPress={() => setWeightUnit("lbs")}
              activeOpacity={0.7}
            >
              <Typography
                variant="body"
                style={
                  weightUnit === "lbs" ? styles.activeText : styles.inactiveText
                }
              >
                lbs
              </Typography>
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title="Logout"
          onPress={handleLogout}
        />
      </Container>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  toggleContainer: {
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
  },
  toggleOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "transparent",
  },
  toggleOptionActive: {
    backgroundColor: Colors.primary,
  },
  activeText: {
    color: "#fff",
  },
  inactiveText: {
    color: "#888",
  },
});
