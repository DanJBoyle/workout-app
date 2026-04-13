import { useState } from "react";
import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import Container from "@/components/UI/Container";
import Typography from "@/components/UI/Typography";
import InputField from "@/components/UI/InputField";
import Button from "@/components/UI/Button";

import ExerciseModal from "@/components/modals/ExerciseModal";
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

  const handleAdd = (exercise: any) => {
    router.replace({
      pathname: "/workout",
      params: {
        templateId,
        newExercise: JSON.stringify({...exercise, bodyPart})
        }
      }
    );
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