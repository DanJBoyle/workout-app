import { Colors } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

type IconButtonProps = {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  size?: number;
  color?: string;
  onPress?: () => void;
};

export default function IconButton({
  icon,
  size = 24,
  color = Colors.background,
  onPress,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <MaterialIcons name={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.6,
  },
});
