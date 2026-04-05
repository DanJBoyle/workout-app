import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import Typography from "@/components/UI/Typography";
import { useSettings } from "@/context/SettingsContext";
import { router } from "expo-router";

export default function WorkoutScreen() {
  const { weightUnit } = useSettings();

  return (
    <Container>
      <Typography variant="title">Workout Screen</Typography>
      <Typography>Welcome to the Workout Screen</Typography>
      <Typography variant="body">Current weight unit: {weightUnit}</Typography>
      <Button title="Add Exercise" onPress={() => router.push("/exercise")} />
      <Button
        title="Complete Workout"
        onPress={() => router.push("/completion")}
      />
    </Container>
  );
}
