import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../config/styles';
import LogoutModal from '../components/LogoutModal';

const SettingsScreen = ({ navigation, route }) => {
  const { user } = route.params || {};
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const handleLogout = () => {
    setShowLogoutModal(true);
  };
  
  const confirmLogout = () => {
    setShowLogoutModal(false);
    // Navigate to login screen and reset the stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
  
  const handleEditAccountInfo = (field) => {
    // Navigate to edit profile screen
    navigation.navigate('EditProfile', { user, field });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <View style={styles.divider} />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* My Activity Section */}
        <TouchableOpacity style={styles.sectionCard}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>My Activity</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>
        
        {/* Account Information Section */}
        <View style={[styles.sectionCard, styles.accountCard]}>
          <View style={styles.accountHeader}>
            <Text style={styles.accountTitle}>Account Information</Text>
            <TouchableOpacity onPress={() => handleEditAccountInfo('all')}>
              <Feather name="edit-2" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.accountInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>
                {user?.phoneNumber || '(123) 456-7890'}
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue} numberOfLines={1}>
                {user?.email || 'janedoe@berkeley.edu'}
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Password</Text>
              <Text style={styles.infoValue}>**********</Text>
            </View>
          </View>
        </View>
        
        {/* Additional Settings (optional) */}
        <View style={styles.additionalSettings}>
          {/* Notifications */}
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={20} color={Colors.primary} />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.primaryLight} />
          </TouchableOpacity>
          
          {/* Privacy */}
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="lock-closed-outline" size={20} color={Colors.primary} />
              <Text style={styles.settingText}>Privacy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.primaryLight} />
          </TouchableOpacity>
          
          {/* Help & Support */}
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="help-circle-outline" size={20} color={Colors.primary} />
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.primaryLight} />
          </TouchableOpacity>
          
          {/* About */}
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="information-circle-outline" size={20} color={Colors.primary} />
              <Text style={styles.settingText}>About</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.primaryLight} />
          </TouchableOpacity>
        </View>
        
        {/* Log Out Button */}
        <TouchableOpacity 
          style={styles.logoutCard}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
        
        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
      
      {/* Gradient overlay at bottom */}
      <View style={styles.bottomGradient} pointerEvents="none" />
      
      {/* Logout Modal */}
      <LogoutModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={confirmLogout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    paddingVertical: 20,
    backgroundColor: Colors.white,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.primary,
    letterSpacing: -0.8,
  },
  headerSpacer: {
    width: 32,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 26,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 18,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 26,
    marginBottom: 16,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
    letterSpacing: -0.42,
  },
  accountCard: {
    paddingBottom: 20,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  accountTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.primary,
    letterSpacing: -0.8,
  },
  accountInfo: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 34,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
    letterSpacing: -0.42,
    width: 72,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.primary,
    letterSpacing: -0.24,
    flex: 1,
  },
  additionalSettings: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginHorizontal: 26,
    marginBottom: 16,
    paddingVertical: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 14,
    color: Colors.primary,
    letterSpacing: -0.42,
  },
  logoutCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 26,
    marginBottom: 16,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#C01717',
    letterSpacing: -0.42,
  },
  bottomSpacer: {
    height: 100,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 262,
    backgroundColor: 'transparent',
    // This creates a gradient from transparent to white
    // In React Native, we'd need LinearGradient from expo-linear-gradient
    // For now, using a semi-transparent white
  },
});

export default SettingsScreen;