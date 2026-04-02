import Button from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { router } from "expo-router";

export default function CompletionScreen() {
  return (
    <Container>
      <Typography variant="title">Completion Screen</Typography>
      <Typography>Congratulations on completing your workout!</Typography>
      <Button title="Save Template" onPress={() => router.push("/dashboard")} />
      <Button
        title="Back to Dashboard"
        onPress={() => router.push("/dashboard")}
      />
    </Container>
  );
}
