import { Colors } from "@/constants/theme";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Button from "../UI/Button";
import Container from "../UI/Container";
import Typography from "../UI/Typography";
import BaseModal from "./baseModal";

type WeightUnit = "kg" | "lbs";

type Props = {
  visible: boolean;
  onClose: () => void;
  weightUnit?: WeightUnit;
  onWeightUnitChange?: (unit: WeightUnit) => void;
};

export default function SettingsModal({
  visible,
  onClose,
  weightUnit = "kg",
  onWeightUnitChange,
}: Props) {
  const [localUnit, setLocalUnit] = useState<WeightUnit>(weightUnit);

  const handleUnitToggle = (unit: WeightUnit) => {
    setLocalUnit(unit);
    onWeightUnitChange?.(unit);
  };

  return (
    <BaseModal visible={visible} onClose={onClose}>
      <Container>
        <Typography variant="title">Settings</Typography>

        {/* Weight Unit Toggle */}
        <View style={styles.settingRow}>
          <Typography variant="body">Weight Unit</Typography>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleOption,
                localUnit === "kg" && styles.toggleOptionActive,
              ]}
              onPress={() => handleUnitToggle("kg")}
              activeOpacity={0.7}
            >
              <Typography
                variant="body"
                style={
                  localUnit === "kg" ? styles.activeText : styles.inactiveText
                }
              >
                kg
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleOption,
                localUnit === "lbs" && styles.toggleOptionActive,
              ]}
              onPress={() => handleUnitToggle("lbs")}
              activeOpacity={0.7}
            >
              <Typography
                variant="body"
                style={
                  localUnit === "lbs" ? styles.activeText : styles.inactiveText
                }
              >
                lbs
              </Typography>
            </TouchableOpacity>
          </View>
        </View>

        <Button title="logout" onPress={() => router.push("/")} />
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
