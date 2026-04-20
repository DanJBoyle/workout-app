import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import InputField from "@/components/UI/InputField";
import Typography from "@/components/UI/Typography";
import { Spacing } from "@/constants/theme";
import { getExercisesForTemplate, db } from "@/database/db";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function CompletionScreen() {
  const { templateId } = useLocalSearchParams<{ templateId?: string }>();
  const [templateName, setTemplateName] = useState("");

  const exercises = templateId ? getExercisesForTemplate(Number(templateId)) : [];
  const totalSets = exercises.reduce((sum: number, e: any) => sum + (e.sets ?? 0), 0);

  const handleSave = () => {
    if (templateName.trim() && templateId) {
      db.runSync("UPDATE templates SET name = ? WHERE id = ?", [templateName.trim(), Number(templateId)]);
    }
    router.replace("/(tabs)/dashboard");
  };

  return (
    <Container style={styles.container}>
      <Typography variant="title" style={styles.center}>Workout Saved</Typography>

      <InputField
        label="Template Name"
        value={templateName}
        onChangeText={setTemplateName}
        placeholder="e.g. Killer Leg Day"
      />
      <Button title="Save as Template" onPress={handleSave} />

      <View style={styles.summary}>
        <Typography variant="subtitle">Workout Summary</Typography>
        <View style={styles.row}>
          <Typography color="muted">Exercises</Typography>
          <Typography>{exercises.length}</Typography>
        </View>
        <View style={styles.row}>
          <Typography color="muted">Total Sets</Typography>
          <Typography>{totalSets}</Typography>
        </View>
      </View>

      <Button
        title="Return to Dashboard"
        onPress={() => router.replace("/(tabs)/dashboard")}
        style={styles.back}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "center" },
  center: { textAlign: "center", marginBottom: Spacing.md },
  summary: { marginTop: Spacing.lg, gap: Spacing.sm, width: "100%" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  back: { marginTop: Spacing.lg },
});