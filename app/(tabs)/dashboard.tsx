import Button from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { router } from "expo-router";

export default function DashboardScreen() {
  return (
    <Container>
      <Typography variant="title">Dashboard</Typography>
      <Typography>Welcome to the Dashboard</Typography>
      <Button title="Start Workout" onPress={() => router.push("/workout")} />
    </Container>
  );
}
