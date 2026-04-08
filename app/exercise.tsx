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