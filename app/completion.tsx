import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import Typography from "@/components/UI/Typography";
import { router } from "expo-router";

export default function CompletionScreen() {
  return (
    <Container>
      <Typography variant="title">Workout Complete!</Typography>
      <Typography>Congratulations on completing your workout!</Typography>
      <Button
        title="Back to Dashboard"
        onPress={() => router.push("/dashboard")}
      />
    </Container>
  );
}
