import Button from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { router } from "expo-router";

export default function ProfileScreen() {
  return (
    <Container>
      <Typography variant="title">Profile Screen</Typography>
      <Typography>Welcome to the Profile Screen</Typography>
      <Button title="Logout" onPress={() => router.replace("/")} />
    </Container>
  );
}
