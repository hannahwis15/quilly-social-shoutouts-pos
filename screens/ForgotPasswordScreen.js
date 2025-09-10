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
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../config/styles';
import * as AuthenticationApi from '../apis/AuthenticationApi';
import * as GlobalVariables from '../config/GlobalVariableContext';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const Constants = GlobalVariables.useValues();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendEmail = async () => {
    // Clear previous messages
    setErrorMessage('');
    setSuccessMessage('');

    // Validate email
    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await AuthenticationApi.passwordRecoveryPOST(
        Constants,
        { email },
        {},
        10000
      );

      if (response) {
        setSuccessMessage('Instructions have been sent to your email!');
        // Optionally navigate back after a delay
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      } else {
        setErrorMessage('Email not found. Please check and try again.');
      }
    } catch (error) {
      console.error('Password recovery error:', error);
      if (error?.status === 404) {
        setErrorMessage('Email not found. Please check and try again.');
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Back Arrow */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={30} color={Colors.primary} />
        </TouchableOpacity>
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Letter Illustration */}
            <View style={styles.illustrationContainer}>
              <View style={styles.letterIllustration}>
                {/* Pink envelope */}
                <View style={styles.envelope}>
                  <View style={styles.envelopeTop} />
                  <View style={styles.envelopeBody} />
                </View>
                {/* Heart */}
                <Text style={styles.heartIcon}>💌</Text>
              </View>
            </View>
            
            {/* Title */}
            <Text style={styles.title}>Forgot your password?</Text>
            
            {/* Subtitle */}
            <Text style={styles.subtitle}>
              Enter your email and we'll send instructions on what to do next!
            </Text>
            
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errorMessage) setErrorMessage('');
                  if (successMessage) setSuccessMessage('');
                }}
                placeholder="Enter Email Here"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={true}
              />
            </View>
            
            {/* Error Message */}
            {errorMessage ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}
            
            {/* Success Message */}
            {successMessage ? (
              <View style={styles.successContainer}>
                <Text style={styles.successText}>{successMessage}</Text>
              </View>
            ) : null}
            
            {/* Send Email Button */}
            <TouchableOpacity 
              style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
              onPress={handleSendEmail}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#35303D" />
              ) : (
                <Text style={styles.sendButtonText}>Send Email</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFCFD',
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingTop: 20,
    paddingBottom: 30,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    zIndex: 10,
    padding: 5,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
    height: 120,
  },
  letterIllustration: {
    width: 120,
    height: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  envelope: {
    width: 100,
    height: 70,
    position: 'relative',
  },
  envelopeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 35,
    backgroundColor: '#FFB6C1',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    transform: [{ skewY: '-10deg' }],
  },
  envelopeBody: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#FFC0CB',
    borderRadius: 8,
  },
  heartIcon: {
    position: 'absolute',
    fontSize: 80,
    top: -10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#35303D',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: -0.96,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    marginBottom: 60,
    paddingHorizontal: 20,
    lineHeight: 20,
    letterSpacing: -0.48,
  },
  inputContainer: {
    marginBottom: 40,
    position: 'relative',
  },
  input: {
    fontSize: 14,
    color: Colors.black,
    paddingVertical: 8,
    paddingBottom: 12,
    letterSpacing: -0.42,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#FF6C1F',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.white,
    lineHeight: 16,
  },
  successContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  successText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.white,
    lineHeight: 16,
  },
  sendButton: {
    backgroundColor: '#E9EEA8',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 54,
    alignItems: 'center',
    marginTop: 20,
  },
  sendButtonDisabled: {
    opacity: 0.7,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#35303D',
  },
});

export default ForgotPasswordScreen;