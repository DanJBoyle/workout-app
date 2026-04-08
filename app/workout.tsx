import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

// Importing UI components
import Typography from '@/components/UI/Typography';
import Container from '@/components/UI/Container';
import Button from '@/components/UI/Button';
import InputField from '@/components/UI/InputField';

// Importing BOTH Auth and Settings Contexts
import { useAuth } from '@/context/AuthContext';
import { SettingsProvider, useSettings } from '@/context/SettingsContext';

const MOCK_EXERCISE = { id: '1', name: 'Bench Press' };

function WorkoutContent() {
  const { templateId } = useLocalSearchParams();
  const { weightUnit } = useSettings(); // Safely grabs weight unit now!

  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  return (
    <Container style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <Button
          title="Add Exercise"
          onPress={() => router.push('/exercise')}
          style={styles.addButton}
        />

        <View style={styles.exerciseCard}>
          <Typography variant="title" style={styles.exerciseName}>
            {MOCK_EXERCISE.name}
          </Typography>

          <View style={styles.inputRow}>
            <View style={styles.inputWrapper}>
              <InputField label="Sets" value={sets} onChangeText={setSets} keyboardType="numeric" placeholder="0" />
            </View>
            <View style={styles.inputWrapper}>
              <InputField label="Reps" value={reps} onChangeText={setReps} keyboardType="numeric" placeholder="0" />
            </View>
            <View style={styles.inputWrapper}>
              <InputField
                label={`Weight (${weightUnit})`}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>
          </View>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <Button title="Finish Workout" onPress={() => router.push('/completion')} />
      </View>
    </Container>
  );
}

export default function WorkoutScreen() {
  const { currentUser } = useAuth();

  // Safety check: prevents rendering if the user state hasn't loaded
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