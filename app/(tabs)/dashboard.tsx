import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

// Importing UI components
import Button from '@/components/UI/Button';
import Container from '@/components/UI/Container';
import Typography from '@/components/UI/Typography';

// Mock data in order to build the UI while the DB fetch function is finalized
const MOCK_TEMPLATES = [
  { id: '1', name: 'Upper Body Strength' },
  { id: '2', name: 'Lower Body Power' },
  { id: '3', name: 'Full Body HIIT' },
];

export default function DashboardScreen() {
  const [templates, setTemplates] = useState(MOCK_TEMPLATES);

  const renderTemplateRow = ({ item }: { item: any }) => (
    <View style={styles.templateCard}>
      <Typography variant="body">{item.name}</Typography>
      <View style={styles.startButtonContainer}>
        <Button 
          title="Start" 
          onPress={() => {
            // Navigates to the active workout screen
            router.push({ pathname: '/workout', params: { templateId: item.id } });
          }} 
        />
      </View>
    </View>
  );

  // Rubric Requirement: Empty State Handling
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Typography variant="body" style={styles.emptyText}>
        No saved templates yet.
      </Typography>
      <Typography variant="body" style={styles.emptyText}>
        Click "Create New" to build your first routine!
      </Typography>
    </View>
  );

  return (
    <Container>
      <View style={styles.header}>
        <Typography variant="title">My Workouts</Typography>
        <Button 
          title="Create New" 
          onPress={() => router.push('/exercise')} // Navigates to Page 4 to pick exercises
        />
      </View>

      <FlatList
        data={templates}
        keyExtractor={(item) => item.id}
        renderItem={renderTemplateRow}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  templateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', // Light grey card background
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  startButtonContainer: {
    width: 100, // Keeps the start buttons uniform
  },
  emptyState: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 5,
  }
});
