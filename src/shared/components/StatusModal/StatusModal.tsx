import React, { useEffect } from 'react';
import { Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { useStatusStore } from '@/shared/store/status.store';
import { styles } from './StatusModal.styles';

const AUTO_HIDE_MS = 2000;
const ERROR_COLOR = '#E5484D';

const StatusModal = () => {
  const { colors } = useTheme();
  const { visible, type, message, hide } = useStatusStore();

  useEffect(() => {
    if (!visible) {
      return;
    }
    const timeout = setTimeout(hide, AUTO_HIDE_MS);
    return () => clearTimeout(timeout);
  }, [visible, hide]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={hide}
    >
      <TouchableWithoutFeedback onPress={hide}>
        <View style={styles.backdrop}>
          <View
            style={[
              styles.card,
              { backgroundColor: type === 'error' ? ERROR_COLOR : colors.primary },
            ]}
          >
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default StatusModal;
