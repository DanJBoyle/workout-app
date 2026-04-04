import { router } from "expo-router";
import Button from "../UI/Button";
import Container from "../UI/Container";
import InputField from "../UI/InputField";
import Typography from "../UI/Typography";
import BaseModal from "./baseModal";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function TemplateModal({ visible, onClose }: Props) {
  return (
    <BaseModal visible={visible} onClose={onClose}>
      <Container>
        <Typography variant="title">Save Template</Typography>
        <Typography>Save this workout as a template for future use.</Typography>
        <InputField placeholder="Template Name" />
        <Button
          title="Save Template"
          onPress={() => {
            onClose();
            router.push("/dashboard");
          }}
        />
      </Container>
    </BaseModal>
  );
}
