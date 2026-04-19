import Button from '@/components/UI/Button';
import InputField from '@/components/UI/InputField';
import Typography from '@/components/UI/Typography';
import { useAuth } from '@/context/AuthContext';
import { createTemplate } from '@/database/db';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BaseModal from './baseModal';

type SaveTemplateModalProps = {
  visible: boolean;
  onClose: () => void;
  templateName?: string;
};

export default function SaveTemplateModal({
  visible,
  onClose,
  templateName = 'My Workout',
}: SaveTemplateModalProps) {
  const [name, setName] = useState(templateName);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleSave = () => {
    setError('');

    if (!name.trim()) {
      setError('Please enter a template name');
      return;
    }

    if (!user) {
      setError('User not logged in');
      return;
    }

    try {
      createTemplate(name, user.id);
      setName(templateName);
      onClose();
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to save template');
    }
  };

  const handleClose = () => {
    setName(templateName);
    setError('');
    onClose();
  };

  return (
    <BaseModal visible={visible} onClose={handleClose}>
      <View style={styles.content}>
        <Typography variant="title" style={styles.title}>
          Save Workout
        </Typography>

        <InputField
          placeholder="Enter template name"
          value={name}
          onChangeText={setName}
        />

        {error ? (
          <Typography style={styles.error}>{error}</Typography>
        ) : null}

        <View style={styles.buttonContainer}>
          <Button
            title="Save"
            onPress={handleSave}
            style={styles.button}
          />
          <Button
            title="Cancel"
            onPress={handleClose}
            style={styles.cancelButton}
          />
        </View>
      </View>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 15,
  },
  title: {
    marginBottom: 10,
  },
  error: {
    color: '#dc3545',
    fontSize: 12,
    marginTop: -10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
});
