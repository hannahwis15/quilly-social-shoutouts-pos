import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Colors, Typography, Spacing } from '../config/styles';

const EditProfileScreen = ({ navigation, route }) => {
  const { user } = route.params || {};
  
  const [formData, setFormData] = useState({
    phone: user?.phoneNumber || '(123) 456-7890',
    email: user?.email || 'janedoe@berkeley.edu',
    password: '**********',
  });
  
  const [focusedField, setFocusedField] = useState(null);
  
  const handleSave = () => {
    // Validate and save changes
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
            // Save logic here
            console.log('Saving changes:', formData);
            navigation.goBack();
          },
        },
      ],
    );
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
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.doneButton} onPress={handleSave}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.divider} />
        
        {/* Title */}
        <Text style={styles.title}>Account Information</Text>
        
        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.formContent}>
            {/* Phone Field */}
            <View style={styles.fieldRow}>
              <Text style={[
                styles.fieldLabel,
                focusedField === 'phone' && styles.fieldLabelFocused
              ]}>
                Phone
              </Text>
              <TextInput
                style={[
                  styles.fieldInput,
                  focusedField === 'phone' && styles.fieldInputFocused
                ]}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter phone number"
                placeholderTextColor="#A6A6A6"
                keyboardType="phone-pad"
              />
            </View>
            
            {/* Email Field */}
            <View style={styles.fieldRow}>
              <Text style={[
                styles.fieldLabel,
                focusedField === 'email' && styles.fieldLabelFocused
              ]}>
                Email
              </Text>
              <TextInput
                style={[
                  styles.fieldInput,
                  focusedField === 'email' && styles.fieldInputFocused
                ]}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter email"
                placeholderTextColor="#A6A6A6"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            {/* Password Field */}
            <View style={styles.fieldRow}>
              <Text style={[
                styles.fieldLabel,
                focusedField === 'password' && styles.fieldLabelFocused
              ]}>
                Password
              </Text>
              <TextInput
                style={[
                  styles.fieldInput,
                  focusedField === 'password' && styles.fieldInputFocused
                ]}
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter password"
                placeholderTextColor="#A6A6A6"
                secureTextEntry
              />
            </View>
          </View>
        </View>
        
        <View style={styles.spacer} />
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
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  cancelButton: {
    fontSize: 14,
    color: 'rgba(53, 48, 61, 0.8)',
    letterSpacing: -0.32,
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
    backgroundColor: '#E0E0E0',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 45,
    letterSpacing: -0.32,
  },
  formContainer: {
    paddingHorizontal: 26,
  },
  formContent: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 14,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#A6A6A6',
    width: 65,
    letterSpacing: -0.32,
  },
  fieldLabelFocused: {
    color: Colors.primary,
  },
  fieldInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.primary,
    letterSpacing: -0.32,
    paddingVertical: 0,
    marginLeft: 10,
  },
  fieldInputFocused: {
    color: Colors.primary,
  },
  spacer: {
    flex: 1,
  },
});

export default EditProfileScreen;