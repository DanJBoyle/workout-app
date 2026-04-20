import SettingsModal from "@/components/modals/settingsModal";
import Container from "@/components/UI/Container";
import IconButton from "@/components/UI/IconButton";
import Typography from "@/components/UI/Typography";
import { Stack } from "expo-router";
import { useState } from "react";

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
      <Container>
        <Typography variant="title">Profile Screen</Typography>
        <Typography>Welcome to the Profile Screen</Typography>

        <SettingsModal
          visible={showSettings}
          onClose={() => setShowSettings(false)}
        />
      </Container>
    </>
  );
}
