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

const CategorySelectionModal = ({ visible, onClose, selectedCategories = [], onSelectCategory, maxSelections = 2 }) => {
  const [tempSelected, setTempSelected] = useState(selectedCategories);

  React.useEffect(() => {
    setTempSelected(selectedCategories);
  }, [selectedCategories]);

  const handleSave = () => {
    // Apply all selected categories
    tempSelected.forEach(categoryId => {
      if (!selectedCategories.includes(categoryId)) {
        onSelectCategory(categoryId);
      }
    });
    // Remove deselected categories
    selectedCategories.forEach(categoryId => {
      if (!tempSelected.includes(categoryId)) {
        onSelectCategory(categoryId); // This will toggle it off
      }
    });
    onClose();
  };

  const handleCategoryPress = (categoryId) => {
    setTempSelected(prev => {
      if (prev.includes(categoryId)) {
        // Remove if already selected
        return prev.filter(id => id !== categoryId);
      }
      // Add if not selected and under limit
      if (prev.length >= maxSelections) {
        // Can't add more, reached limit
        return prev;
      }
      return [...prev, categoryId];
    });
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
              <Text style={styles.headerTitle}>Discussion Categories</Text>
              <Text style={styles.headerSubtitle}>(Select up to 2)</Text>
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
                    const isSelected = tempSelected.includes(category.id);
                    const isDisabled = !isSelected && tempSelected.length >= maxSelections;
                    const backgroundColor = isSelected ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.8)';
                    const borderColor = isSelected ? 'rgba(53,48,61,0.8)' : 'rgba(53,48,61,0.3)';
                    const opacity = isDisabled ? 0.5 : 1;
                    
                    return (
                      <TouchableOpacity
                        key={category.id}
                        style={[
                          styles.categoryButton,
                          { 
                            backgroundColor,
                            borderColor,
                            borderWidth: 0.5,
                            opacity,
                          }
                        ]}
                        onPress={() => !isDisabled && handleCategoryPress(category.id)}
                        disabled={isDisabled}
                      >
                        <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                        <Text style={styles.categoryLabel}>
                          {category.label}
                        </Text>
                        {isSelected && (
                          <View style={styles.checkContainer}>
                            <View style={styles.checkCircle}>
                              <Ionicons name="close" size={10} color="#FFFFFF" />
                            </View>
                          </View>
                        )}
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
              style={[styles.saveButton, tempSelected.length === 0 && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={tempSelected.length === 0}
            >
              <Text style={styles.saveButtonText}>Save ({tempSelected.length}/2)</Text>
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
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(53,48,61,0.6)',
    marginTop: 2,
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
  checkContainer: {
    marginLeft: 4,
  },
  checkCircle: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: 'rgba(53,48,61,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
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