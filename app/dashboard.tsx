import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import Container from "@/components/UI/Container";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";

import { useAuth } from "@/context/AuthContext";
import { getTemplatesByUser } from "@/database/db";
import TemplateModal from "@/components/modals/templateModal";
import SaveTemplateModal from "@/components/modals/saveTemplateModal";

export default function DashboardScreen() {
    const { user } = useAuth();
    const [templates, setTemplates] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const loadTemplates = () => {
        if (!user) return;
        const data = getTemplatesByUser(user.id);
        setTemplates(data);
      };

      useEffect(() => {
        loadTemplates();
    }, [user]);

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
            onPress={() => router.push("/create-template")}
        />
        <TemplateModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onCreated={loadTemplates}
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