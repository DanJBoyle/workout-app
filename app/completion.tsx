import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

// Importing Daniel's UI components
import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import InputField from "@/components/UI/InputField";
import Typography from "@/components/UI/Typography";

// Importing Contexts for the wrapper
import { useAuth } from "@/context/AuthContext";
import { SettingsProvider } from "@/context/SettingsContext";

// 1. The main content of the screen
function CompletionContent() {
  const [templateName, setTemplateName] = useState("");

  const handleSaveTemplate = () => {
    if (!templateName) {
      Alert.alert("Missing Name", "Please enter a name for this template.");
      return;
    }
    // Austen's DB save function will go here later
    Alert.alert("Success", `Template "${templateName}" saved!`);
    setTemplateName("");
  };

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h1">Workout Saved</Typography>
      </View>

      {/* Save Template Section */}
      <View style={styles.sectionCard}>
        <InputField
          label="Template Name"
          placeholder="e.g., Killer Leg Day"
          value={templateName}
          onChangeText={setTemplateName}
        />
        <Button
          title="Save as Template"
          onPress={handleSaveTemplate}
          style={styles.saveButton}
        />
      </View>

      {/* Non-Functional Records Area */}
      <View style={styles.sectionCard}>
        <Typography variant="title" style={styles.summaryTitle}>
          Workout Summary
        </Typography>

        <View style={styles.statRow}>
          <Typography variant="body" style={styles.statLabel}>
            Duration:
          </Typography>
          <Typography variant="body" style={styles.statValue}>
            45 min
          </Typography>
        </View>
        <View style={styles.statRow}>
          <Typography variant="body" style={styles.statLabel}>
            Exercises:
          </Typography>
          <Typography variant="body" style={styles.statValue}>
            5
          </Typography>
        </View>
        <View style={styles.statRow}>
          <Typography variant="body" style={styles.statLabel}>
            Total Sets:
          </Typography>
          <Typography variant="body" style={styles.statValue}>
            15
          </Typography>
        </View>
        <View style={styles.statRow}>
          <Typography variant="body" style={styles.statLabel}>
            Total Volume:
          </Typography>
          <Typography variant="body" style={styles.statValue}>
            2,450 lbs
          </Typography>
        </View>
      </View>

      {/* Spacer to push the return button to the bottom */}
      <View style={{ flex: 1 }} />

      <Button
        title="Return to Dashboard"
        onPress={() => router.replace("/(tabs)/dashboard")}
      />
    </Container>
  );
}

// 2. The safety wrapper
export default function CompletionScreen() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <SettingsProvider userId={currentUser.id.toString()}>
      <CompletionContent />
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  sectionCard: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
    marginBottom: 20,
  },
  saveButton: {
    marginTop: 10,
  },
  summaryTitle: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
    paddingBottom: 10,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statLabel: {
    color: "#6c757d",
  },
  statValue: {
    fontWeight: "bold",
  },
});
