import { Colors } from "@/constants/theme";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { initDB } from "@/database/db";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootLayoutContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.textLight,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Workout App", headerShown: false }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="exercise" options={{ title: "Exercise" }} />
      <Stack.Screen name="workout" options={{ title: "Workout" }} />
      <Stack.Screen name="completion" options={{ title: "Completion" }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    console.log("Initializing DB...");
    initDB();
  }, []);

  return (
    <AuthProvider>
      <SettingsProvider>
        <RootLayoutContent />
      </SettingsProvider>
    </AuthProvider>
  );
}
