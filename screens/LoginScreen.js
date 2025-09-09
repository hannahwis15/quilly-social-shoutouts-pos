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
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../config/styles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = () => {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }
    
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to main app - replacing the entire stack
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }, 1000);
  };
  
  const handleSignup = () => {
    // Navigate to signup screen
    alert('Signup flow coming soon!');
  };
  
  const handleForgotPassword = () => {
    alert('Password reset flow coming soon!');
  };
  
  const handleNotBerkeleyStudent = () => {
    alert('Alternative login coming soon!');
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
            {/* Hands Illustration */}
            <View style={styles.illustrationContainer}>
              <View style={styles.handsIllustration}>
                {/* Decorative elements */}
                <View style={styles.decorativeElements}>
                  <Text style={[styles.decorativeIcon, styles.iconHeart]}>❤️</Text>
                  <Text style={[styles.decorativeIcon, styles.iconStar]}>⭐</Text>
                  <Text style={[styles.decorativeIcon, styles.iconParty]}>🎉</Text>
                  <Text style={[styles.decorativeIcon, styles.iconClap]}>👏</Text>
                  <Text style={[styles.decorativeIcon, styles.iconSparkle]}>✨</Text>
                  <View style={[styles.decorativeDot, styles.dotOrange]} />
                  <View style={[styles.decorativeDot, styles.dotRed]} />
                </View>
                {/* Hands forming heart */}
                <View style={styles.handsContainer}>
                  <Text style={styles.handsEmoji}>🫶</Text>
                </View>
              </View>
            </View>
            
            {/* Welcome Text */}
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            
            {/* Form Section */}
            <View style={styles.formSection}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Your UC Berkeley e-mail</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="rgba(0, 0, 0, 0.3)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="rgba(0, 0, 0, 0.3)"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              
              <View style={styles.linksContainer}>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNotBerkeleyStudent}>
                  <Text style={styles.linkText}>Not a UC Berkeley student?</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Signing in...' : 'Log-in'}
              </Text>
            </TouchableOpacity>
            
            {/* Sign Up Section */}
            <View style={styles.signUpSection}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleSignup}>
                <Text style={styles.signUpLink}>Signup</Text>
              </TouchableOpacity>
            </View>
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
    height: 140,
  },
  handsIllustration: {
    width: 200,
    height: 127,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorativeElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  decorativeIcon: {
    position: 'absolute',
    fontSize: 20,
  },
  iconHeart: {
    top: 10,
    left: '50%',
    marginLeft: -10,
  },
  iconStar: {
    top: 25,
    right: 30,
  },
  iconParty: {
    bottom: 35,
    right: 25,
  },
  iconClap: {
    bottom: 30,
    left: 20,
  },
  iconSparkle: {
    top: 30,
    left: 25,
  },
  decorativeDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotOrange: {
    backgroundColor: '#FF9500',
    bottom: 45,
    left: 60,
  },
  dotRed: {
    backgroundColor: '#FF3B30',
    bottom: 35,
    right: 65,
  },
  handsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  handsEmoji: {
    fontSize: 80,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: '500',
    color: '#35303D',
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: -1.44,
  },
  formSection: {
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 25,
    position: 'relative',
  },
  inputLabel: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)',
    marginBottom: 8,
    letterSpacing: -0.48,
  },
  input: {
    fontSize: 14,
    color: Colors.black,
    paddingVertical: 8,
    paddingBottom: 12,
    letterSpacing: -0.42,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
  },
  linksContainer: {
    alignItems: 'flex-end',
    marginTop: 20,
    gap: 9,
  },
  linkText: {
    fontSize: 12,
    color: Colors.black,
    letterSpacing: -0.48,
  },
  loginButton: {
    backgroundColor: '#E9EEA8',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 54,
    alignItems: 'center',
    marginBottom: 30,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#35303D',
  },
  signUpSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  signUpText: {
    fontSize: 12,
    color: Colors.black,
    letterSpacing: -0.48,
  },
  signUpLink: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '500',
    textDecorationLine: 'underline',
    letterSpacing: -0.48,
  },
});

export default LoginScreen;