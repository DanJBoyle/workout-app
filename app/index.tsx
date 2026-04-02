import Button from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { router } from "expo-router";

export default function LoginScreen() {
  return (
    <Container>
      <Typography variant="title">Login Screen</Typography>
      <Typography>Welcome to the Login Screen</Typography>
      <Button
        title="Go to Dashboard"
        onPress={() => router.replace("/dashboard")}
      />
    </Container>
  );
}
