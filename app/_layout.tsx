import { Colors } from "@/constants/theme";
import { AuthProvider } from "@/context/AuthContext";
import { initDB } from "@/database/db";
import { Stack } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  useEffect(() => {
    console.log("Initializing DB...");
    initDB();
  }, []);

  return (
    <AuthProvider>
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
      <Toast />
    </AuthProvider>
  );
}