import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import Typography from "@/components/UI/Typography";

import ExerciseModal from "@/components/modals/exerciseModal";
import { addExercisesToTemplate, createOrGetExercise } from "@/database/db";
import { getExercisesSmart } from "@/database/exerciseService";

const BODY_PARTS = [
  "BACK",
  "BICEPS",
  "CALVES",
  "CHEST",
  "FULL BODY",
  "HIPS",
  "QUADRICEPS",
  "SHOULDERS",
  "THIGHS",
  "TRICEPS",
  "UPPER ARMS",
  "WAIST",
];

export default function ExerciseScreen() {
  const [bodyPart, setBodyPart] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { templateId } = useLocalSearchParams();

  const search = async (part: string) => {
    setBodyPart(part);
    setDropdownOpen(false);
    const data = await getExercisesSmart(part);
    setResults(data);
  };

  const handleSelect = (exercise: any) => {
    setSelected(exercise);
    setModalVisible(true);
  };

  const handleAdd = async (exercise: any) => {
    try {
      const localExerciseId = createOrGetExercise(
        exercise.name,
        bodyPart,
        exercise.exerciseId
      );

      addExercisesToTemplate(
        Number(templateId),
        localExerciseId,
        0,
        0,
        undefined
      );

      router.back();
    } catch (error) {
      console.error("Failed to add exercise:", error);
    }
  };

  return (
    <Container style={styles.container}>
      <Typography variant="title">Find Exercises</Typography>
      <Typography style={styles.subtitle}>Select a muscle group to browse exercises</Typography>

      {/* Dropdown trigger */}
      <Pressable
        onPress={() => setDropdownOpen(true)}
        style={styles.dropdownTrigger}
      >
        <Typography style={styles.dropdownTriggerText}>
          {bodyPart || "Select muscle group…"}
        </Typography>
        <Typography style={styles.dropdownArrow}>▾</Typography>
      </Pressable>

      {/* Dropdown modal */}
      <Modal
        visible={dropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownOpen(false)}
        >
          <View style={styles.dropdownList}>
            {BODY_PARTS.map((part) => (
              <Pressable
                key={part}
                onPress={() => search(part)}
                style={[
                  styles.dropdownItem,
                  bodyPart === part && styles.dropdownItemSelected,
                ]}
              >
                <Typography
                  style={[
                    styles.dropdownItemText,
                    bodyPart === part && styles.dropdownItemTextSelected,
                  ]}
                >
                  {part}
                </Typography>
              </Pressable>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView style={styles.results} showsVerticalScrollIndicator={false}>
        {results.length === 0 && bodyPart !== "" && (
          <Typography style={styles.emptyText}>No exercises found.</Typography>
        )}
        {results.map((ex) => (
          <View key={ex.exerciseId} style={styles.resultItem}>
            <Button title={ex.name} onPress={() => handleSelect(ex)} />
          </View>
        ))}
      </ScrollView>

      <ExerciseModal
        visible={modalVisible}
        exercise={selected}
        onClose={() => setModalVisible(false)}
        onAdd={handleAdd}
      />
import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';

// Importing UI components
import Typography from '@/components/UI/Typography';
import Container from '@/components/UI/Container';
import Button from '@/components/UI/Button';
import InputField from '@/components/UI/InputField';

// Importing Contexts for the wrapper
import { useAuth } from '@/context/AuthContext';
import { SettingsProvider } from '@/context/SettingsContext';

// Mock data spanning different body groups for testing the search function
const MOCK_EXERCISES = [
  { id: '1', name: 'Barbell Squat', group: 'Legs' },
  { id: '2', name: 'Deadlift', group: 'Back' },
  { id: '3', name: 'Pull-ups', group: 'Back' },
  { id: '4', name: 'Lunges', group: 'Legs' },
  { id: '5', name: 'Bicep Curls', group: 'Arms' },
  { id: '6', name: 'Tricep Dips', group: 'Arms' },
  { id: '7', name: 'Bench Press', group: 'Chest' },
];

// 1. The main content of the screen
function ExerciseContent() {
  const [searchQuery, setSearchQuery] = useState('');

  // Automatically filters the list based on name OR body group
  const filteredExercises = MOCK_EXERCISES.filter(ex =>
    ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ex.group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderExerciseRow = ({ item }: { item: any }) => (
    <View style={styles.exerciseCard}>
      <View>
        <Typography variant="body" style={styles.exerciseName}>{item.name}</Typography>
        <Typography variant="body" style={styles.exerciseGroup}>{item.group}</Typography>
      </View>
      <View style={styles.addButtonContainer}>
        <Button
          title="Add"
          onPress={() => router.back()} // Snaps the user back to the Workout screen
        />
      </View>
    </View>
  );

  return (
    <Container>
      <InputField
        label="Search API"
        placeholder="Search by name or body group..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        renderItem={renderExerciseRow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: 12,
    marginTop: 4,
  },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: "#6A3DE8",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  dropdownTriggerText: {
    color: "#111827",
    fontSize: 15,
  },
  dropdownArrow: {
    color: "#6A3DE8",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  dropdownList: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  dropdownItem: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  dropdownItemSelected: {
    backgroundColor: "#ede9fb",
  },
  dropdownItemText: {
    fontSize: 15,
    color: "#111827",
  },
  dropdownItemTextSelected: {
    color: "#6A3DE8",
    fontWeight: "700",
  },
  results: {
    flex: 1,
  },
  resultItem: {
    marginVertical: 4,
  },
  emptyText: {
    color: "#6b7280",
    textAlign: "center",
    marginTop: 20,
  },
});
// 2. The safety wrapper
export default function ExerciseScreen() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <SettingsProvider userId={currentUser.id.toString()}>
      <ExerciseContent />
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
    marginTop: 10,
  },
  exerciseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  exerciseName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  exerciseGroup: {
    color: '#6c757d',
    marginTop: 4,
  },
  addButtonContainer: {
    width: 80,
  }
});