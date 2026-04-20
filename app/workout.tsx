import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import Button from '@/components/UI/Button';
import Container from '@/components/UI/Container';
import InputField from '@/components/UI/InputField';
import Typography from '@/components/UI/Typography';
import { useAuth } from "@/context/AuthContext";
import { SettingsProvider, useSettings } from '@/context/SettingsContext';
import { deleteTemplateExercise, getExercisesForTemplate, updateTemplateExercise } from '@/database/db';

function WorkoutContent() {
  const [exercises, setExercises] = useState<any[]>([]);
  const { templateId } = useLocalSearchParams();
  const { weightUnit } = useSettings();

  const [exerciseInputs, setExerciseInputs] = useState<{
    [key: string]: { sets: string; reps: string; weight: string };
  }>({});

  const [exerciseComplete, setExerciseComplete] = useState<{ [key: string]: boolean }>({});

  // load template exercises
  const loadExercises = useCallback(() => {
    if (!templateId) return;

    const data = getExercisesForTemplate(Number(templateId));
    setExercises(data);

    const initialState: any = {};

    data.forEach((ex: any) => {
      const key = ex.template_exercise_id;

      initialState[key] = {
        sets: ex.sets?.toString() || "",
        reps: ex.reps?.toString() || "",
        weight: ex.weight?.toString() || "",
      };
    });

    setExerciseInputs(initialState);

    const completionState: { [key: string]: boolean } = {};
    data.forEach((ex: any) => {
      completionState[ex.template_exercise_id] = false;
    });
    setExerciseComplete(completionState);
  }, [templateId]);

  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  useFocusEffect(
    useCallback(() => {
      loadExercises();
    }, [loadExercises])
  );

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

  const toggleComplete = (key: string) => {
    setExerciseComplete((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allComplete =
    exercises.length > 0 &&
    exercises.every((ex) => exerciseComplete[ex.template_exercise_id]);

  const deleteExercise = (templateExerciseId: number) => {
    try {
      deleteTemplateExercise(templateExerciseId);
      // Reload exercises after deletion
      loadExercises();
    } catch (error) {
      console.error("Failed to delete exercise:", error);
    }
  };

  const saveAllExercises = () => {
    exercises.forEach((exercise) => {
      const key = exercise.template_exercise_id;
      const input = exerciseInputs[key];

      if (!input || !exercise.template_exercise_id) return;

      const weight = input.weight ? Number(input.weight) : undefined;

      updateTemplateExercise(
        exercise.template_exercise_id,
        Number(input.sets) || 0,
        Number(input.reps) || 0,
        weight
      );
    });
  };

  const handleSaveTemplate = () => {
    saveAllExercises();
    router.back();
  };

  const handleCompleteWorkout = () => {
    saveAllExercises();
    router.push({ pathname: '/completion', params: { templateId } });
  };

  return (
    <Container style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <Button
          title="Add Exercise"
          onPress={() => router.push({
              pathname: "/exercise",
              params: {templateId}
              })}
          style={styles.addButton}
        />

        {exercises.length === 0 && (
          <Typography>No exercises yet. Add one!</Typography>
        )}

        {exercises.map((exercise) => {
          const key = exercise.template_exercise_id;
          const input = exerciseInputs[key] || {};

          return (
            <View key={key} style={styles.exerciseCard}>
              <View style={styles.exerciseHeader}>
                <Pressable
                  onPress={() => toggleComplete(key)}
                  style={[styles.checkbox, exerciseComplete[key] && styles.checkboxChecked]}
                >
                  {exerciseComplete[key] && (
                    <Typography style={styles.checkmark}>✓</Typography>
                  )}
                </Pressable>
                <Typography variant="title" style={styles.exerciseName}>
                  {exercise.name}
                </Typography>
                <Button
                  title="×"
                  onPress={() => deleteExercise(key)}
                  style={styles.deleteButton}
                />
              </View>

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
        <Pressable
          onPress={handleCompleteWorkout}
          style={[styles.completeButton, !allComplete && styles.completeButtonDisabled]}
          pointerEvents={allComplete ? 'auto' : 'none'}
        >
          <Typography style={styles.completeButtonText}>Complete Workout</Typography>
        </Pressable>
      </View>
    </Container>
  );
}

export default function WorkoutScreen() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <SettingsProvider>
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
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  exerciseName: {
    fontSize: 18,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 40,
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
    gap: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#6A3DE8',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#6A3DE8',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButtonDisabled: {
    opacity: 0.4,
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
