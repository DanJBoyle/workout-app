import SettingsModal from "@/components/modals/settingsModal";
import Container from "@/components/UI/Container";
import IconButton from "@/components/UI/IconButton";
import Typography from "@/components/UI/Typography";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          title: "My Profile",
          headerRight: () => (
            <IconButton icon="settings" onPress={() => setShowSettings(true)} />
          ),
        }}
      />
      <Container style={styles.container}>

        {/* Profile Info Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarPlaceholder}>
            {/* Just a generic initial for the avatar */}
            <Typography variant="title" style={styles.avatarText}>T</Typography>
          </View>
          <Typography variant="title" style={styles.nameText}>Taylor</Typography>
          <Typography variant="body" style={styles.emailText}>Lifting Noob</Typography>
        </View>

        {/* Static Polish for Screenshots */}
        <View style={styles.statsCard}>
          <Typography variant="body" style={styles.statLine}>🔥 Current Streak: 12 Days</Typography>
          <Typography variant="body" style={styles.statLine}>🏋️ Total Workouts: 48</Typography>
          <Typography variant="body" style={styles.statLine}>🏆 Member Since: April 2026</Typography>
        </View>

        <Typography variant="body" style={styles.hintText}>
          Click the gear icon in the top right to adjust your app settings or log out.
        </Typography>

        <SettingsModal
          visible={showSettings}
          onClose={() => setShowSettings(false)}
        />
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6b21a8', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 40,
  },
  nameText: {
    fontSize: 24,
    marginBottom: 5,
  },
  emailText: {
    color: '#6c757d',
  },
  statsCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    width: '100%',
    marginBottom: 30,
  },
  statLine: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500',
  },
  hintText: {
    color: '#9ca3af',
    textAlign: 'center',
    paddingHorizontal: 20,
  }
});