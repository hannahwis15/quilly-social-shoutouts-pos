import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import HomescreenHomeScreen from './screens/HomescreenHomeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Create Shoutout Screen
function CreateScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Shoutout</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            // Add creation logic here
            alert('Shoutout created!');
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.buttonText}>Send Shoutout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Profile Screen
function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.subtitle}>Your Shoutouts: 12</Text>
        <Text style={styles.subtitle}>Received: 8</Text>
      </View>
    </View>
  );
}

// Shoutout Detail Screen
function ShoutoutDetailScreen({ route, navigation }) {
  const { id } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Shoutout Details</Text>
        <Text style={styles.subtitle}>Shoutout ID: {id}</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Home Stack Navigator
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomescreenHomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ShoutoutDetail" 
        component={ShoutoutDetailScreen} 
        options={{ title: 'Details' }}
      />
    </Stack.Navigator>
  );
}

// Custom Tab Bar Component
function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const isCenter = index === 2; // Center button (Create)

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getIcon = () => {
          if (route.name === 'Home') {
            return <Ionicons name="home" size={24} color={isFocused ? '#000' : '#666'} />;
          } else if (route.name === 'Messages') {
            return <MaterialCommunityIcons name="message-text-outline" size={24} color={isFocused ? '#000' : '#666'} />;
          } else if (route.name === 'Create') {
            return <Feather name="plus" size={28} color="#fff" />;
          } else if (route.name === 'Calendar') {
            return <MaterialCommunityIcons name="calendar-blank-outline" size={24} color={isFocused ? '#000' : '#666'} />;
          } else if (route.name === 'Profile') {
            return <FontAwesome name="user-o" size={22} color={isFocused ? '#000' : '#666'} />;
          }
        };

        if (isCenter) {
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.centerTabButton}
            >
              <View style={styles.centerButton}>
                {getIcon()}
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabButton}
          >
            {getIcon()}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// Main Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
      />
      <Tab.Screen 
        name="Messages" 
        component={CreateScreen} // Placeholder - replace with Messages screen
      />
      <Tab.Screen 
        name="Create" 
        component={CreateScreen}
      />
      <Tab.Screen 
        name="Calendar" 
        component={ProfileScreen} // Placeholder - replace with Calendar screen
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <TabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  cardAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  cardTime: {
    fontSize: 12,
    color: '#999',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // Custom Tab Bar Styles
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: Platform.OS === 'ios' ? 85 : 70,
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  centerTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9599FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#9599FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
