import TemplateModal from "@/components/modals/templateModal";
import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import Typography from "@/components/UI/Typography";
import { useAuth } from "@/context/AuthContext";
import { getTemplatesByUser } from "@/database/db";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

export default function DashboardScreen() {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Load templates when screen is focused
  useFocusEffect(
    useCallback(() => {
      if (user) {
        const data = getTemplatesByUser(user.id);
        setTemplates(data);
      }
    }, [user])
  );

  const handleTemplateCreate = () => {
    setModalVisible(false);
    // Reload templates
    if (user) {
      const data = getTemplatesByUser(user.id);
      setTemplates(data);
    }
  };

  if (!user) {
    return (
      <Container>
        <Typography variant="title">Dashboard</Typography>
        <Typography>Please log in first</Typography>
      </Container>
    );
  }

  return (
    <Container style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Typography variant="title" style={styles.title}>
          My Templates
        </Typography>

        <Button
          title="+ Create New Template"
          onPress={() => setModalVisible(true)}
          style={styles.createButton}
        />

        {templates.length === 0 ? (
          <Typography style={styles.emptyText}>
            No templates yet. Create one to get started!
          </Typography>
        ) : (
          templates.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={styles.templateCard}
              onPress={() =>
                router.push({
                  pathname: "/workout",
                  params: { templateId: template.id },
                })
              }
            >
              <Typography variant="title" style={styles.templateName}>
                {template.name}
              </Typography>
              <Typography style={styles.tapText}>Tap to start workout</Typography>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <TemplateModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onTemplateCreated={handleTemplateCreate}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
  },
  createButton: {
    marginBottom: 20,
    backgroundColor: '#007AFF',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
  templateCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 15,
  },
  templateName: {
    fontSize: 18,
    marginBottom: 8,
  },
  tapText: {
    fontSize: 12,
    color: '#007AFF',
  },
});
