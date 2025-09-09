import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../config/styles';

const LocationSelectionScreen = ({ navigation, route }) => {
  const { onSelect, currentLocation } = route.params || {};
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(currentLocation || 'Redwood City, CA');
  
  // Mock location suggestions - in production, this would come from a geocoding API
  const [suggestions, setSuggestions] = useState([
    { id: '1', city: 'Redwood City', state: 'CA', fullAddress: 'Redwood City, CA' },
    { id: '2', city: 'San Francisco', state: 'CA', fullAddress: 'San Francisco, CA' },
    { id: '3', city: 'Palo Alto', state: 'CA', fullAddress: 'Palo Alto, CA' },
    { id: '4', city: 'Mountain View', state: 'CA', fullAddress: 'Mountain View, CA' },
    { id: '5', city: 'San Jose', state: 'CA', fullAddress: 'San Jose, CA' },
  ]);
  
  const handleDone = () => {
    if (onSelect) {
      onSelect(selectedLocation);
    }
    navigation.goBack();
  };
  
  const handleCancel = () => {
    navigation.goBack();
  };
  
  const handleLocationSelect = (location) => {
    setSelectedLocation(location.fullAddress);
    setSearchQuery('');
  };
  
  const handleSearch = (text) => {
    setSearchQuery(text);
    // In production, this would trigger a geocoding API search
    // For now, we'll filter the mock suggestions
    if (text.length > 0) {
      const filtered = suggestions.filter(s => 
        s.fullAddress.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filtered.length > 0 ? filtered : suggestions);
    }
  };
  
  const handleCurrentLocation = () => {
    // In production, this would use device location services
    Alert.alert(
      'Location Services',
      'This would request your current location. For demo purposes, setting to Redwood City.',
      [
        {
          text: 'OK',
          onPress: () => setSelectedLocation('Redwood City, CA')
        }
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Ionicons name="chevron-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Location</Text>
        
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.divider} />
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.primaryLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for your city, zip code, or address"
          placeholderTextColor={Colors.primaryLight}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      
      {/* Info Text */}
      <Text style={styles.infoText}>
        Only your city name will be shown.
      </Text>
      
      {/* Search Suggestions or Map View */}
      {searchQuery.length > 0 ? (
        <ScrollView style={styles.suggestionsContainer}>
          {suggestions.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={styles.suggestionItem}
              onPress={() => handleLocationSelect(location)}
            >
              <Ionicons name="location-outline" size={20} color={Colors.primaryLight} />
              <View style={styles.suggestionText}>
                <Text style={styles.cityText}>{location.city}</Text>
                <Text style={styles.stateText}>{location.state}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.mapContainer}>
          {/* Map Placeholder */}
          <View style={styles.mapPlaceholder}>
            {/* Map background - in production this would be a real MapView */}
            <View style={styles.mapBackground}>
              <Text style={styles.mapPlaceholderText}>Map View</Text>
            </View>
            
            {/* Location Pin and Label */}
            <View style={styles.locationIndicator}>
              <View style={styles.locationLabel}>
                <Text style={styles.locationLabelText}>
                  {selectedLocation.split(',')[0]}
                </Text>
              </View>
              <View style={styles.locationPin}>
                <View style={styles.pinTriangle} />
              </View>
            </View>
            
            {/* Current Location Button */}
            <TouchableOpacity 
              style={styles.currentLocationButton}
              onPress={handleCurrentLocation}
            >
              <MaterialIcons name="my-location" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          
          {/* Selected Location Display */}
          <View style={styles.selectedLocationContainer}>
            <Text style={styles.selectedLocationLabel}>Selected Location:</Text>
            <Text style={styles.selectedLocationText}>{selectedLocation}</Text>
          </View>
        </View>
      )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
    marginHorizontal: 25,
    marginTop: 23,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 30,
    gap: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.primary,
    padding: 0,
  },
  infoText: {
    fontSize: 12,
    color: 'rgba(53, 48, 61, 0.8)',
    marginTop: 15,
    marginLeft: 26,
    marginBottom: 20,
  },
  mapContainer: {
    flex: 1,
    paddingHorizontal: 27,
  },
  mapPlaceholder: {
    height: 454,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  mapBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
  },
  mapPlaceholderText: {
    fontSize: 18,
    color: Colors.primaryLight,
    opacity: 0.5,
  },
  locationIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -52.5 }, { translateY: -22.5 }],
    alignItems: 'center',
  },
  locationLabel: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 2,
  },
  locationLabelText: {
    fontSize: 12,
    color: Colors.white,
    letterSpacing: -0.24,
  },
  locationPin: {
    alignItems: 'center',
  },
  pinTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 10.5,
    borderRightWidth: 10.5,
    borderTopWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.primary,
  },
  currentLocationButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 39,
    height: 39,
    borderRadius: 19.5,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedLocationContainer: {
    marginTop: 20,
    paddingVertical: 15,
  },
  selectedLocationLabel: {
    fontSize: 12,
    color: Colors.primaryLight,
    marginBottom: 5,
  },
  selectedLocationText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
  },
  suggestionsContainer: {
    flex: 1,
    paddingHorizontal: 26,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
    gap: 12,
  },
  suggestionText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  cityText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  stateText: {
    fontSize: 12,
    color: Colors.primaryLight,
  },
});

export default LocationSelectionScreen;