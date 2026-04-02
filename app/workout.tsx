import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import Typography from "@/components/UI/Typography";
import { router } from "expo-router";

export default function WorkoutScreen() {
  return (
    <Container>
      <Typography variant="title">Workout Screen</Typography>
      <Typography>Welcome to the Workout Screen</Typography>
      <Button title="Add Exercise" onPress={() => router.push("/exercise")} />
      <Button
        title="Complete Workout"
        onPress={() => router.push("/completion")}
      />
    </Container>
  );
}
