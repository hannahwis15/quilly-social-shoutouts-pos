import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../config/styles';

const PronounsSelectionScreen = ({ navigation, route }) => {
  const { onSelect, currentPronouns } = route.params || {};
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPronouns, setSelectedPronouns] = useState(
    currentPronouns ? currentPronouns.split('/').map(p => p.trim()) : []
  );
  
  const allPronouns = [
    'she', 'her', 'hers',
    'he', 'him', 'his',
    'they', 'them', 'theirs',
    've', 'ver', 'vis',
    'ze', 'hir', 'hirs',
    'ae', 'aer', 'aers',
    'ey', 'em', 'eirs',
    'fae', 'faer', 'faers',
    'xe', 'xem', 'xyrs',
    'zir', 'zirs',
    'not listed'
  ];
  
  const filteredPronouns = allPronouns.filter(pronoun =>
    pronoun.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const togglePronoun = (pronoun) => {
    if (selectedPronouns.includes(pronoun)) {
      setSelectedPronouns(selectedPronouns.filter(p => p !== pronoun));
    } else {
      if (selectedPronouns.length < 4) {
        setSelectedPronouns([...selectedPronouns, pronoun]);
      } else {
        Alert.alert('Maximum Selection', 'You can select up to 4 pronouns');
      }
    }
  };
  
  const handleDone = () => {
    const formattedPronouns = selectedPronouns.join('/');
    if (onSelect) {
      onSelect(formattedPronouns);
    }
    navigation.goBack();
  };
  
  const handleCancel = () => {
    navigation.goBack();
  };
  
  const removeSelectedPronoun = (pronoun) => {
    setSelectedPronouns(selectedPronouns.filter(p => p !== pronoun));
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Ionicons name="chevron-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Pronouns</Text>
        
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
        {/* Selected Pronouns Display */}
        {selectedPronouns.length > 0 && (
          <View style={styles.selectedContainer}>
            <Text style={styles.selectedText}>
              {selectedPronouns.join(', ')}
            </Text>
            <TouchableOpacity onPress={() => setSelectedPronouns([])}>
              <Ionicons name="close" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        )}
        
        {/* Info Text */}
        <Text style={styles.infoText}>
          Select up to 4 pronouns so people know how to refer to you. You can edit or remove them at any time.
        </Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.primaryLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={Colors.primaryLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        {/* Pronouns List */}
        <View style={styles.pronounsList}>
          {filteredPronouns.map((pronoun) => (
            <TouchableOpacity
              key={pronoun}
              style={styles.pronounItem}
              onPress={() => togglePronoun(pronoun)}
            >
              <View style={[
                styles.checkbox,
                selectedPronouns.includes(pronoun) && styles.checkboxSelected
              ]}>
                {selectedPronouns.includes(pronoun) && (
                  <Ionicons name="checkmark" size={12} color={Colors.white} />
                )}
              </View>
              <Text style={styles.pronounText}>{pronoun}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
      
      {/* Gradient overlay at bottom */}
      <View style={styles.bottomGradient} pointerEvents="none" />
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
    paddingTop: 20,
  },
  selectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F4',
    marginHorizontal: 26,
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  selectedText: {
    fontSize: 14,
    color: Colors.primary,
    flex: 1,
  },
  infoText: {
    fontSize: 12,
    color: 'rgba(53, 48, 61, 0.8)',
    textAlign: 'center',
    marginHorizontal: 44,
    marginBottom: 20,
    lineHeight: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
    marginHorizontal: 25,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 30,
    marginBottom: 30,
    gap: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.primary,
    padding: 0,
  },
  pronounsList: {
    paddingHorizontal: 43,
    gap: 25,
  },
  pronounItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 25,
  },
  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: 'rgba(53, 48, 61, 0.8)',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.purple,
    borderColor: Colors.purple,
  },
  pronounText: {
    fontSize: 14,
    color: Colors.primary,
    letterSpacing: -0.24,
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
  },
});

export default PronounsSelectionScreen;