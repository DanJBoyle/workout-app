import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import Typography from '@/components/UI/Typography';
import Container from '@/components/UI/Container';
import Button from '@/components/UI/Button';
import InputField from '@/components/UI/InputField';
import { SettingsProvider, useSettings } from '@/context/SettingsContext';
import { getExercisesForTemplate, updateTemplateExercise, addExercisesToTemplate, createOrGetExercise} from '@/database/db';
import { useAuth } from "@/context/AuthContext";

function WorkoutContent() {
  const { newExercise } = useLocalSearchParams();
  const [exercises, setExercises] = useState<any[]>([]);
  const { templateId } = useLocalSearchParams();
  const { weightUnit } = useSettings();

  const [exerciseInputs, setExerciseInputs] = useState<{
    [key: string]: { sets: string; reps: string; weight: string };
  }>({});

  // load template exercises
  useEffect(() => {
    if (!templateId) return;

    const data = getExercisesForTemplate(Number(templateId));
    setExercises(data);

    const initialState: any = {};

    data.forEach((ex: any) => {
      const key = ex.template_exercise_id;

      initialState[key] = {
        sets: ex.sets?.toString() || "",
        reps: ex.reps?.toString() || "",
        weight: "",
      };
    });

    setExerciseInputs(initialState);
  }, [templateId]);


  // handle new exercise coming back
  useEffect(() => {
    if (!newExercise) return;

    const parsed = JSON.parse(newExercise as string);

    const localExerciseId = createOrGetExercise(
      parsed.name,
      parsed.bodyPart,
      parsed.id
    );

    const newItem = {
      template_exercise_id: null,
      exercise_id: localExerciseId,
      name: parsed.name,
      sets: "",
      reps: "",
    };

    setExercises((prev) => [...prev, newItem]);

    const key = `new-${localExerciseId}`;

    setExerciseInputs((prev) => ({
      ...prev,
      [key]: {
        sets: "",
        reps: "",
        weight: "",
      },
    }));
  }, [newExercise]);

  const updateExercise = (
    key: string,
    field: "sets" | "reps" | "weight",
    value: string
  ) => {
    setExerciseInputs((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const handleSaveTemplate = () => {
    exercises.forEach((exercise) => {
      const key = exercise.template_exercise_id ?? `new-${exercise.exercise_id}`;
      const input = exerciseInputs[key];

      if (!input) return;

      // UPDATE existing
      if (exercise.template_exercise_id) {
        updateTemplateExercise(
          exercise.template_exercise_id,
          Number(input.sets) || 0,
          Number(input.reps) || 0
        );
      }
      // INSERT new
      else {
        addExercisesToTemplate(
          Number(templateId),
          exercise.exercise_id,
          Number(input.sets) || 0,
          Number(input.reps) || 0
        );
      }
    });

    router.back();
  };

  return (
    <Container style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <Button
          title="Add Exercise"
          onPress={() => router.push({
              pathname: "/exercise",
              params: {templateId}
              });}
          style={styles.addButton}
        />

        {exercises.length === 0 && (
          <Typography>No exercises yet. Add one!</Typography>
        )}

        {exercises.map((exercise) => {
          const key = exercise.template_exercise_id ?? `new-${exercise.exercise_id}`;
          const input = exerciseInputs[key] || {};

          return (
            <View key={key} style={styles.exerciseCard}>
              <Typography variant="title" style={styles.exerciseName}>
                {exercise.name}
              </Typography>

              <View style={styles.inputRow}>
                <View style={styles.inputWrapper}>
                  <InputField
                    label="Sets"
                    value={input.sets || ""}
                    onChangeText={(val) =>
                      updateExercise(key, "sets", val)
                    }
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <InputField
                    label="Reps"
                    value={input.reps || ""}
                    onChangeText={(val) =>
                      updateExercise(key, "reps", val)
                    }
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <InputField
                    label={`Weight (${weightUnit})`}
                    value={input.weight || ""}
                    onChangeText={(val) =>
                      updateExercise(key, "weight", val)
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Save Template" onPress={handleSaveTemplate} />
      </View>
    </Container>
  );
}

export default function WorkoutScreen() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <SettingsProvider userId={currentUser.id.toString()}>
      <WorkoutContent />
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 0,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  addButton: {
    marginBottom: 20,
  },
  exerciseCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 15,
  },
  exerciseName: {
    marginBottom: 15,
    fontSize: 18,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    width: '30%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  }
});
