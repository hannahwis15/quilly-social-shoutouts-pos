import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../config/styles';
import * as ImagePicker from 'expo-image-picker';

const EditProfileModeScreen = ({ navigation, route }) => {
  const { user } = route.params || {};
  
  const [profileData, setProfileData] = useState({
    name: user?.fullName || 'Ellie Smith',
    pronouns: user?.pronouns || 'She/her',
    location: user?.location?.formatted || 'Redwood City, CA',
    education: `${user?.education?.school || 'UCLA'} '${user?.education?.graduationYear || '26'} | ${user?.education?.major || 'Political Science'}`,
    bio: user?.bio || '',
    avatar: user?.avatar || null,
    interests: user?.interests || [
      { id: 'int1', name: 'Film & TV', emoji: '🎬' },
      { id: 'int2', name: 'Reading', emoji: '📚' },
      { id: 'int3', name: 'Skincare/ Makeup', emoji: '💄' },
      { id: 'int4', name: 'Creativity', emoji: '🎨' },
      { id: 'int5', name: 'Self improvement', emoji: '🌱' },
    ],
  });
  
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileData({ ...profileData, avatar: { uri: result.assets[0].uri } });
    }
  };
  
  const handleSave = () => {
    Alert.alert(
      'Save Changes',
      'Are you sure you want to save these changes?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Save',
          onPress: () => {
            console.log('Saving profile:', profileData);
            navigation.goBack();
          },
        },
      ],
    );
  };
  
  const handleCancel = () => {
    navigation.goBack();
  };
  
  const removeInterest = (interestId) => {
    setProfileData({
      ...profileData,
      interests: profileData.interests.filter(interest => interest.id !== interestId),
    });
  };
  
  const addInterest = () => {
    // Navigate to interest selection screen or show modal
    Alert.alert('Add Interest', 'Interest selection coming soon!');
  };
  
  const navigateToEdit = (field) => {
    // Navigate to specific edit screens for each field
    switch(field) {
      case 'pronouns':
        navigation.navigate('PronounsSelection', {
          currentPronouns: profileData.pronouns,
          onSelect: (pronouns) => {
            setProfileData({ ...profileData, pronouns });
          }
        });
        break;
      case 'location':
        navigation.navigate('LocationSelection', {
          currentLocation: profileData.location,
          onSelect: (location) => {
            setProfileData({ ...profileData, location });
          }
        });
        break;
      case 'education':
        Alert.alert('Edit Education', 'Education editing coming soon!');
        break;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>{profileData.name}</Text>
        
        <TouchableOpacity style={styles.doneButton} onPress={handleSave}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Picture */}
        <TouchableOpacity style={styles.avatarSection} onPress={pickImage}>
          <View style={styles.avatarContainer}>
            {profileData.avatar ? (
              <Image 
                source={profileData.avatar}
                style={styles.avatar}
              />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Ionicons name="person" size={40} color={Colors.white} />
              </View>
            )}
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={20} color={Colors.white} />
            </View>
          </View>
        </TouchableOpacity>
        
        {/* Profile Fields */}
        <View style={styles.fieldsContainer}>
          {/* Pronouns */}
          <TouchableOpacity 
            style={styles.fieldRow}
            onPress={() => navigateToEdit('pronouns')}
          >
            <Text style={styles.fieldLabel}>Pronouns</Text>
            <View style={styles.fieldValueContainer}>
              <Text style={styles.fieldValue}>{profileData.pronouns}</Text>
              <Ionicons name="chevron-forward" size={18} color={Colors.primaryLight} />
            </View>
          </TouchableOpacity>
          
          {/* Location */}
          <TouchableOpacity 
            style={styles.fieldRow}
            onPress={() => navigateToEdit('location')}
          >
            <Text style={styles.fieldLabel}>Location</Text>
            <View style={styles.fieldValueContainer}>
              <Text style={styles.fieldValue}>{profileData.location}</Text>
              <Ionicons name="chevron-forward" size={18} color={Colors.primaryLight} />
            </View>
          </TouchableOpacity>
          
          {/* Education */}
          <TouchableOpacity 
            style={styles.fieldRow}
            onPress={() => navigateToEdit('education')}
          >
            <Text style={styles.fieldLabel}>Education</Text>
            <View style={styles.fieldValueContainer}>
              <Text style={styles.fieldValue} numberOfLines={1}>
                {profileData.education}
              </Text>
              <Ionicons name="chevron-forward" size={18} color={Colors.primaryLight} />
            </View>
          </TouchableOpacity>
        </View>
        
        {/* User Video Section */}
        <View style={styles.videoSection}>
          <TouchableOpacity style={styles.videoContainer}>
            <Text style={styles.videoPlaceholderText}>user video</Text>
            <TouchableOpacity style={styles.editVideoIcon}>
              <Feather name="edit-2" size={16} color={Colors.primaryMedium} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        
        {/* Interests Section */}
        <View style={styles.interestsSection}>
          <Text style={styles.interestsLabel}>Interests</Text>
          <View style={styles.interestsList}>
            {profileData.interests.map((interest) => (
              <View key={interest.id} style={styles.interestPill}>
                <Text style={styles.interestEmoji}>{interest.emoji}</Text>
                <Text style={styles.interestText}>{interest.name}</Text>
                <TouchableOpacity onPress={() => removeInterest(interest.id)}>
                  <Ionicons name="close" size={16} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.addInterestButton} onPress={addInterest}>
              <Ionicons name="add" size={18} color={Colors.purple} />
              <Text style={styles.addInterestText}>add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
  },
  cancelButton: {
    fontSize: 14,
    color: 'rgba(53, 48, 61, 0.8)',
    letterSpacing: -0.32,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.primary,
  },
  doneButton: {
    backgroundColor: '#E5CFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 30,
  },
  doneButtonText: {
    fontSize: 14,
    color: Colors.black,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  fieldsContainer: {
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
  },
  fieldLabel: {
    fontSize: 14,
    color: Colors.primaryLight,
    width: 80,
  },
  fieldValueContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  fieldValue: {
    fontSize: 14,
    color: Colors.primary,
    marginRight: 8,
    flex: 1,
    textAlign: 'right',
  },
  videoSection: {
    paddingHorizontal: 25,
    marginBottom: 30,
  },
  videoContainer: {
    height: 200,
    backgroundColor: Colors.grayVeryLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  videoPlaceholderText: {
    fontSize: 14,
    color: Colors.primaryLight,
  },
  editVideoIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  interestsSection: {
    paddingHorizontal: 25,
    marginBottom: 30,
  },
  interestsLabel: {
    fontSize: 14,
    color: Colors.primaryLight,
    marginBottom: 12,
  },
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grayVeryLight,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    gap: 6,
    marginBottom: 8,
    marginRight: 8,
  },
  interestEmoji: {
    fontSize: 14,
  },
  interestText: {
    fontSize: 12,
    color: Colors.primary,
  },
  addInterestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.purple,
    borderStyle: 'dashed',
    gap: 4,
    marginBottom: 8,
  },
  addInterestText: {
    fontSize: 12,
    color: Colors.purple,
  },
});

export default EditProfileModeScreen;