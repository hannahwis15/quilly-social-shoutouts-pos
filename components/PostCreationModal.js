import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import CategorySelectionModal from './CategorySelectionModal';
import { getCategoryById, getCategoryEmoji } from '../config/categories';

const PostCreationModal = ({ visible, onClose, userAvatar }) => {
  const [postText, setPostText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handlePost = () => {
    if (postText.trim()) {
      // Handle post submission
      console.log('Posting:', postText, 'Categories:', selectedCategories);
      setPostText('');
      setSelectedCategories([]);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.headerLeft}>
                <Image 
                  source={require('../assets/images/NewPaperPlane.png')}
                  style={styles.headerIcon}
                  resizeMode="contain"
                />
                <View>
                  <Text style={styles.headerTitle}>Anything on your mind?</Text>
                  <Text style={styles.headerSubtitle}>something something something text</Text>
                </View>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#35303D" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Content Area */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <TextInput
              style={styles.textInput}
              placeholder="OMG I can't believe love island lol"
              placeholderTextColor="#999"
              multiline
              value={postText}
              onChangeText={setPostText}
              autoFocus
            />
          </ScrollView>

          {/* Bottom Actions */}
          <View style={styles.bottomContainer}>
            {/* User Avatar and Post Button */}
            <View style={styles.bottomRow}>
              <Image 
                source={userAvatar || require('../assets/images/Avatar.png')}
                style={styles.userAvatar}
              />
              
              <TouchableOpacity 
                style={[styles.postButton, !postText.trim() && styles.postButtonDisabled]}
                onPress={handlePost}
                disabled={!postText.trim()}
              >
                <Text style={styles.postButtonText}>Post</Text>
              </TouchableOpacity>
            </View>

            {/* Category Selector */}
            <View style={styles.categoryContainer}>
              <TouchableOpacity style={styles.categoryButton}>
                <Feather name="image" size={20} color="#35303D" />
              </TouchableOpacity>
              
              <View style={styles.spacer} />
              
              <TouchableOpacity 
                style={[
                  styles.categorySelector,
                  selectedCategories.length > 0 && styles.categorySelectorActive
                ]}
                onPress={() => setShowCategoryModal(true)}
              >
                {selectedCategories.length > 0 ? (
                  <>
                    {selectedCategories.slice(0, 2).map((categoryId, index) => (
                      <Text key={categoryId} style={styles.categoryEmoji}>
                        {getCategoryEmoji(categoryId)}
                      </Text>
                    ))}
                    <Text style={styles.categoryText}>
                      {selectedCategories.length === 1 
                        ? getCategoryById(selectedCategories[0])?.label
                        : `${selectedCategories.length} selected`}
                    </Text>
                  </>
                ) : (
                  <>
                    <Feather name="filter" size={16} color="#35303D" />
                    <Text style={styles.categoryText}>Category</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      
      {/* Category Selection Modal */}
      <CategorySelectionModal
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        selectedCategories={selectedCategories}
        onSelectCategories={setSelectedCategories}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1E6FF',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    width: 32,
    height: 33,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#35303D',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 11,
    color: 'rgba(0, 0, 0, 0.37)',
  },
  closeButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textInput: {
    fontSize: 16,
    color: '#35303D',
    minHeight: 200,
    textAlignVertical: 'top',
    lineHeight: 22,
  },
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#35303D',
  },
  postButton: {
    backgroundColor: '#9599FF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
  },
  postButtonDisabled: {
    backgroundColor: '#D0D0D0',
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  spacer: {
    flex: 1,
  },
  categoryButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#35303D',
  },
  categorySelectorActive: {
    backgroundColor: '#E5CFFF',
    borderWidth: 1,
    borderColor: '#9599FF',
  },
  categoryEmoji: {
    fontSize: 14,
  },
});

export default PostCreationModal;