import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import InputField from "@/components/UI/InputField";
import Typography from "@/components/UI/Typography";

import ExerciseModal from "@/components/modals/exerciseModal";
import { addExercisesToTemplate, createOrGetExercise } from "@/database/db";
import { getExercisesSmart } from "@/database/exerciseService";

export default function ExerciseScreen() {
  const [bodyPart, setBodyPart] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { templateId } = useLocalSearchParams();

const search = async () => {
  const data = await getExercisesSmart(bodyPart);
  setResults(data);
};

  const handleSelect = (exercise: any) => {
    setSelected(exercise);
    setModalVisible(true);
  };

  const handleAdd = async (exercise: any) => {
    try {
      // Create/get exercise in database using bodyPart from search
      const localExerciseId = createOrGetExercise(
        exercise.name,
        bodyPart,  // Use the search bodyPart, not exercise.bodyPart
        exercise.id
      );

      // Add exercise to template immediately with default values
      addExercisesToTemplate(
        Number(templateId),
        localExerciseId,
        0,  // default sets
        0,  // default reps
        undefined  // default weight
      );

      // Return to workout screen
      router.back();
    } catch (error) {
      console.error("Failed to add exercise:", error);
    }
  };

  return (
    <Container>
      <Typography variant="title">Find Exercises</Typography>

      <InputField
        placeholder="e.g. chest, back, legs"
        value={bodyPart}
        onChangeText={setBodyPart}
      />

      <Button title="Search" onPress={search} />

      {results.map((ex) => (
        <View key={ex.id} style={{ marginVertical: 8 }}>
          <Button
            title={ex.name}
            onPress={() => handleSelect(ex)}
          />
        </View>
      ))}

      <ExerciseModal
        visible={modalVisible}
        exercise={selected}
        onClose={() => setModalVisible(false)}
        onAdd={handleAdd}
      />
    </Container>
  );
}