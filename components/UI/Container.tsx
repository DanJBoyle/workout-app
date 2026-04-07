import { Spacing } from "@/constants/theme";
import { StyleSheet, View, ViewProps } from "react-native";

export default function Container({ style, ...props }: ViewProps) {
  return <View style={[styles.container, style]} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
    padding: Spacing.md,
  },
});
