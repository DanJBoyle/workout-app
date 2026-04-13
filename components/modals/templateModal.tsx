import { router } from "expo-router";
import Button from "../UI/Button";
import Container from "../UI/Container";
import InputField from "../UI/InputField";
import Typography from "../UI/Typography";
import BaseModal from "./baseModal";
import { useState } from "react";
import { createTemplate } from "@/database/db";
import { useAuth } from "@/context/AuthContext";

type Props = {
  visible: boolean;
  onCreated();
  onClose();
};

export default function TemplateModal({ visible, onClose }: Props) {
  const [name, setName] = useState("");
  const { user } = useAuth();

  return (
    <BaseModal visible={visible} onClose={onClose}>
      <Container>
        <Typography variant="title">Save Template</Typography>
        <Typography>Save this workout as a template for future use.</Typography>
        <InputField placeholder="Template Name" value={name} onChangeText={setName}/>
        <Button
          title="Save Template"
          onPress={ () => {
              if (!user || !name.trim()) return;
            createTemplate(name, user.id);
            setName("");
            onClose();
          }}
        />
      </Container>
    </BaseModal>
  );
}
