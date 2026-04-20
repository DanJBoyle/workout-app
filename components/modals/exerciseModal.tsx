import BaseModal from "./baseModal";
import Container from "../UI/Container";
import Typography from "../UI/Typography";
import Button from "../UI/Button";

type Props = {
  visible: boolean;
  exercise: any;
  onClose: () => void;
  onAdd: (exercise: any) => void;
};

export default function ExerciseModal({
  visible,
  exercise,
  onClose,
  onAdd,
}: Props) {
  if (!exercise) return null;

  return (
    <BaseModal visible={visible} onClose={onClose}>
      <Container>
        <Typography variant="title">Add Exercise</Typography>

        <Typography>{exercise.name}</Typography>

        <Button
          title="Add to Workout"
          onPress={() => {
            onAdd(exercise);
            onClose();
          }}
        />

        <Button title="Cancel" onPress={onClose} />
      </Container>
    </BaseModal>
  );
}