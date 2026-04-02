import Typography from "@/components/Typography";
import { Colors, FontSizes, Spacing } from "@/constants/theme";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface Props extends TextInputProps {
  label?: string;
}

export default function InputField({ label, style, ...props }: Props) {
  return (
    <View style={styles.container}>
      {label && (
        <Typography variant="caption" style={styles.label}>
          {label}
        </Typography>
      )}

      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={Colors.muted}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },

  label: {
    marginBottom: Spacing.sm,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.muted,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSizes.md,
    color: Colors.text,
    backgroundColor: Colors.background,
  },
});
