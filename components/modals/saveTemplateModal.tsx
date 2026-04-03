import { useState } from "react";
import Button from "../UI/Button";
import Container from "../UI/Container";
import Typography from "../UI/Typography";
import BaseModal from "./baseModal";
import TemplateModal from "./templateModal";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function SaveTemplateModal({ visible, onClose }: Props) {
  const [templateModalVisible, setTemplateModalVisible] = useState(false);

  return (
    <>
      <BaseModal visible={visible} onClose={onClose}>
        <Container>
          <Typography variant="title">Save Template?</Typography>
          <Button
            title="Save"
            onPress={() => {
              onClose();
              setTemplateModalVisible(true);
            }}
          />
          <Button title="Skip" onPress={onClose} />
        </Container>
      </BaseModal>

      <TemplateModal
        visible={templateModalVisible}
        onClose={() => setTemplateModalVisible(false)}
      />
    </>
  );
}
