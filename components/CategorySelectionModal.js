import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORY_GROUPS } from '../config/categories';

const CategorySelectionModal = ({ visible, onClose, selectedCategory, onSelectCategory }) => {
  const [tempSelected, setTempSelected] = useState(selectedCategory);

  const handleSave = () => {
    if (tempSelected) {
      onSelectCategory(tempSelected);
    }
    onClose();
  };

  const handleCategoryPress = (categoryId) => {
    setTempSelected(categoryId);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Discussion Category</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#666666" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Categories ScrollView */}
          <ScrollView 
            style={styles.scrollView} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {Object.values(CATEGORY_GROUPS).map((group) => (
              <View key={group.id} style={styles.categoryGroup}>
                <Text style={styles.groupTitle}>{group.label}</Text>
                <View style={styles.categoriesContainer}>
                  {group.categories.map((category) => {
                    const isSelected = tempSelected === category.id;
                    const backgroundColor = isSelected ? category.color : 'rgba(255,255,255,0.8)';
                    const borderColor = isSelected ? 'rgba(53,48,61,0.8)' : 'rgba(53,48,61,0.3)';
                    
                    return (
                      <TouchableOpacity
                        key={category.id}
                        style={[
                          styles.categoryButton,
                          { 
                            backgroundColor,
                            borderColor,
                            borderWidth: 0.5,
                          }
                        ]}
                        onPress={() => handleCategoryPress(category.id)}
                      >
                        <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                        <Text style={styles.categoryLabel}>
                          {category.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Footer with Save Button */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.saveButton, !tempSelected && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={!tempSelected}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Indicator */}
          <View style={styles.bottomIndicatorContainer}>
            <View style={styles.bottomIndicator} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 44 : 0, // Account for iOS status bar
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  header: {
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerTitleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#35303D',
    letterSpacing: -0.32,
  },
  closeButton: {
    padding: 5,
    position: 'absolute',
    right: 20,
    zIndex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20,
  },
  categoryGroup: {
    marginBottom: 28,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#35303D',
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 30,
    marginBottom: 5,
    marginRight: 5,
    minHeight: 32,
  },
  categoryEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#35303D',
  },
  footer: {
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#E8E8E8',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'flex-end',
    minWidth: 80,
  },
  saveButtonDisabled: {
    backgroundColor: '#F5F5F5',
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#35303D',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  bottomIndicatorContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 8,
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 100,
  },
});

export default CategorySelectionModal;