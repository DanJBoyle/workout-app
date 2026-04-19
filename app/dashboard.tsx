import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import Typography from "@/components/UI/Typography";

import TemplateModal from "@/components/modals/templateModal";
import { useAuth } from "@/context/AuthContext";
import { getTemplatesByUser } from "@/database/db";

export default function DashboardScreen() {
    const { user } = useAuth();
    const [templates, setTemplates] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    const loadTemplates = useCallback(() => {
        if (!user) return;
        const data = getTemplatesByUser(user.id);
        setTemplates(data);
      }, [user]);

      useEffect(() => {
        loadTemplates();
    }, [loadTemplates]);

    return (
        <Container>
            <Typography variant="title">Templates</Typography>
            {templates.map((template) => (
                <View key={template.id} style={styles.card}>
                    <Typography>{template.name}</Typography>

                    <Button title="Start Workout"
                        onPress={() => router.push({
                            pathname: "/workout",
                            params: { templateId: template.id },
                            })
                        }/>
                </View>
            ))}
        <Button title="Create Template"
            onPress={() => setModalVisible(true)}
        />
        <TemplateModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onTemplateCreated={loadTemplates}
              />
        </Container>
        );
    }

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
});