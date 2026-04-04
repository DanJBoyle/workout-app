import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import Typography from "@/components/UI/Typography";
import { router } from "expo-router";

export default function ExerciseScreen() {
  return (
    <Container>
      <Container
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Typography variant="title">Exercise Screen</Typography>
        <Button
          title="Add"
          onPress={() => {
            router.push("/workout");
          }}
          disabled
        />
      </Container>
      <Typography>Welcome to the Exercise Screen</Typography>
    </Container>
  );
}
