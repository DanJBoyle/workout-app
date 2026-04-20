import SettingsModal from "@/components/modals/settingsModal";
import Container from "@/components/UI/Container";
import IconButton from "@/components/UI/IconButton";
import Typography from "@/components/UI/Typography";
import { Colors, Spacing } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <IconButton icon="settings" onPress={() => setShowSettings(true)} />
          ),
        }}
      />
      <Container style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Typography variant="title" color="light">T</Typography>
          </View>
          <Typography variant="subtitle">Taylor</Typography>
          <Typography color="muted">Lifting Noob</Typography>
        </View>
        <View style={styles.stats}>
          <View style={styles.row}><MaterialIcons name="local-fire-department" size={20} color="#f97316" /><Typography> Current Streak: 12 Days</Typography></View>
          <View style={styles.row}><MaterialIcons name="emoji-events" size={20} color="#eab308" /><Typography> Total Workouts: 48</Typography></View>
          <View style={styles.row}><MaterialIcons name="calendar-today" size={20} color="#eab308" /><Typography> Member Since: April 2026</Typography></View>
        </View>
        <Typography color="muted" style={styles.hint}>
          Click the gear icon in the top right to adjust your app settings or log out.
        </Typography>
        <SettingsModal visible={showSettings} onClose={() => setShowSettings(false)} />
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  avatarContainer: { alignItems: "center", marginVertical: Spacing.lg },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center", marginBottom: Spacing.sm },
  stats: { width: "100%", gap: Spacing.sm, marginBottom: Spacing.lg },
  row: { flexDirection: "row", alignItems: "center" },
  hint: { textAlign: "center" },
});