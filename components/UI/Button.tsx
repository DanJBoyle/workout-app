import { Colors } from "@/constants/theme";
import React from "react";
import { Pressable, StyleSheet, TextStyle, ViewStyle } from "react-native";
import Typography from "./Typography";

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function Button({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Typography color="light" variant="body" style={[styles.text, textStyle]}>
        {title}
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    backgroundColor: "#9CA3AF",
  },
  text: {
    fontWeight: "600",
  },
});
