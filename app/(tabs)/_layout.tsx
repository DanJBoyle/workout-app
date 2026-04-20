import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";

export default function TabsLayout() {
  const { currentUser } = useAuth();

  if (!currentUser) return <Redirect href="/" />;

  return (
    <SettingsProvider userId={currentUser.id.toString()}>
      <Tabs
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
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="dashboard" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </SettingsProvider>
  );
}