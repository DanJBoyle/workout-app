import SaveTemplateModal from "@/components/modals/saveTemplateModal";
import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import Typography from "@/components/UI/Typography";
import { router } from "expo-router";
import { useState } from "react";

export default function CompletionScreen() {
  const [showSaveTemplate, setShowSaveTemplate] = useState(true);

  return (
    <Container>
      <Typography variant="title">Completion Screen</Typography>
      <Typography>Congratulations on completing your workout!</Typography>
      <SaveTemplateModal
        visible={showSaveTemplate}
        onClose={() => setShowSaveTemplate(false)}
      />
      <Button
        title="Back to Dashboard"
        onPress={() => router.push("/dashboard")}
      />
    </Container>
  );
}
