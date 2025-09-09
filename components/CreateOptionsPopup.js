import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';

const CreateOptionsPopup = ({ visible, onClose, onSelectOption }) => {
  const handleOptionPress = (option) => {
    onSelectOption(option);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.blurSection}>
            <BlurView intensity={20} style={styles.blurContainer}>
              <View style={styles.overlay} />
            </BlurView>
          </View>
        </TouchableWithoutFeedback>
        
        <View style={styles.bottomSection}>
          <TouchableWithoutFeedback>
            <View style={styles.popupContainer}>
              <TouchableOpacity 
                style={styles.optionButton}
                onPress={() => handleOptionPress('meetup')}
                activeOpacity={0.8}
              >
                <Text style={styles.optionText}>Create Meetup</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.optionButton}
                onPress={() => handleOptionPress('discussion')}
                activeOpacity={0.8}
              >
                <Text style={styles.optionText}>Create Discussion</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurSection: {
    flex: 1,
    marginBottom: Platform.OS === 'ios' ? 85 : 70, // Stop blur above tab bar
  },
  blurContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(78, 78, 78, 0.2)',
  },
  bottomSection: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 115 : 100, // Position above tab bar
    left: 0,
    right: 0,
  },
  popupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 14,
    gap: 10,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: 94,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4.67,
    elevation: 5,
  },
  optionText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default CreateOptionsPopup;