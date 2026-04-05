import { Colors, FontSizes } from "@/constants/theme";
import { StyleSheet, Text, TextProps } from "react-native";

type Variant = "body" | "title" | "subtitle" | "caption";
type ColorVariant = "default" | "light" | "muted";

interface Props extends TextProps {
  variant?: Variant;
  color?: ColorVariant;
}

export default function Typography({
  variant = "body",
  color = "default",
  style,
  ...props
}: Props) {
  return (
    <Text
      style={[styles.base, styles[variant], styles[color], style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    color: Colors.text,
  },

  body: {
    fontSize: FontSizes.md,
  },

  title: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },

  caption: {
    fontSize: FontSizes.sm,
  },

  default: {
    color: Colors.text,
  },

  light: {
    color: Colors.textLight,
  },

  muted: {
    color: Colors.muted,
  },
});
