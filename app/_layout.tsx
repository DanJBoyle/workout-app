import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";


export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  //   useEffect( () => {
  //       initDB();
  //       }, []);

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
