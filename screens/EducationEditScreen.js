import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../config/styles';

const EducationEditScreen = ({ navigation, route }) => {
  const { onSave, currentEducation } = route.params || {};
  
  // Parse current education data
  const parseEducation = (edu) => {
    if (!edu) return { school: '', graduationYear: '', major: '' };
    
    // If it's already an object
    if (typeof edu === 'object') {
      return {
        school: edu.school || '',
        graduationYear: edu.graduationYear || '',
        major: edu.major || ''
      };
    }
    
    // If it's a formatted string like "UCLA '26 | Political Science"
    const parts = edu.split(' | ');
    const schoolAndYear = parts[0] || '';
    const major = parts[1] || '';
    
    const schoolMatch = schoolAndYear.match(/(.+)\s+'(\d+)/);
    return {
      school: schoolMatch ? schoolMatch[1].trim() : schoolAndYear,
      graduationYear: schoolMatch ? schoolMatch[2] : '',
      major: major.trim()
    };
  };
  
  const initialData = parseEducation(currentEducation);
  
  const [school, setSchool] = useState(initialData.school);
  const [graduationYear, setGraduationYear] = useState(initialData.graduationYear);
  const [major, setMajor] = useState(initialData.major);
  
  const handleDone = () => {
    const formattedEducation = `${school} '${graduationYear} | ${major}`;
    if (onSave) {
      onSave(formattedEducation);
    }
    navigation.goBack();
  };
  
  const handleCancel = () => {
    navigation.goBack();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel}>
            <Ionicons name="chevron-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Education</Text>
          
          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.divider} />
        
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Input Fields */}
          <View style={styles.inputContainer}>
            {/* School Name Input */}
            <View style={styles.inputWrapper}>
              <View style={styles.inputIconContainer}>
                <FontAwesome5 name="school" size={13} color={Colors.primaryLight} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Your School Name"
                placeholderTextColor="#A6A6A6"
                value={school}
                onChangeText={setSchool}
                autoCapitalize="words"
              />
            </View>
            
            {/* Graduation Year Input */}
            <View style={styles.inputWrapper}>
              <View style={styles.inputIconContainer}>
                <FontAwesome5 name="graduation-cap" size={12} color={Colors.primaryLight} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Your Graduation Year"
                placeholderTextColor="#A6A6A6"
                value={graduationYear}
                onChangeText={setGraduationYear}
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
            
            {/* Major Input */}
            <View style={styles.inputWrapper}>
              <View style={styles.inputIconContainer}>
                <MaterialIcons name="book" size={13} color={Colors.primaryLight} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Your Major"
                placeholderTextColor="#A6A6A6"
                value={major}
                onChangeText={setMajor}
                autoCapitalize="words"
              />
            </View>
          </View>
          
          {/* Info Text */}
          <Text style={styles.infoText}>
            Fill out the following information so your peers can get to know you better.
          </Text>
          
          {/* Preview Section */}
          {(school || graduationYear || major) && (
            <View style={styles.previewSection}>
              <Text style={styles.previewLabel}>Preview:</Text>
              <Text style={styles.previewText}>
                {school || '[School]'} '{graduationYear || '[YY]'} | {major || '[Major]'}
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.primary,
    letterSpacing: -0.8,
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
  divider: {
    height: 1,
    backgroundColor: Colors.grayBorder,
    marginHorizontal: 26,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 100,
  },
  inputContainer: {
    paddingHorizontal: 48,
    gap: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(53, 48, 61, 0.8)',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 5,
  },
  inputIconContainer: {
    width: 13,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Colors.primary,
    padding: 0,
    letterSpacing: -0.24,
  },
  infoText: {
    fontSize: 12,
    color: 'rgba(53, 48, 61, 0.8)',
    textAlign: 'left',
    marginHorizontal: 48,
    marginTop: 20,
    lineHeight: 16,
  },
  previewSection: {
    marginTop: 40,
    marginHorizontal: 48,
    padding: 15,
    backgroundColor: '#F8F8F4',
    borderRadius: 10,
  },
  previewLabel: {
    fontSize: 12,
    color: Colors.primaryLight,
    marginBottom: 8,
    fontWeight: '500',
  },
  previewText: {
    fontSize: 14,
    color: Colors.primary,
    lineHeight: 20,
  },
});

export default EducationEditScreen;