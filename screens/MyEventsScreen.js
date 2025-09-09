import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../config/styles';
import { lazyLoadUserContent } from '../config/userSchema';

const MyEventsScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockEvents = [
        {
          id: 'evt1',
          title: 'Coffee & Code Study Session',
          type: 'meetup',
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          location: 'Student Union Room 204',
          attendees: 12,
          maxAttendees: 20,
          isHost: true,
          image: null,
          description: 'Weekly study session for CS students',
        },
        {
          id: 'evt2',
          title: 'Movie Night: Inception',
          type: 'event',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          location: 'Common Room',
          attendees: 25,
          maxAttendees: 30,
          isHost: false,
          image: null,
          description: 'Join us for a mind-bending movie night!',
        },
        {
          id: 'evt3',
          title: 'Beach Cleanup Volunteer Day',
          type: 'volunteer',
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          location: 'Ocean Beach',
          attendees: 8,
          maxAttendees: 50,
          isHost: false,
          image: null,
          description: 'Help us keep our beaches clean!',
        },
      ];
      
      setEvents(mockEvents);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadEvents();
  };

  const formatDate = (date) => {
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const renderEvent = ({ item }) => (
    <TouchableOpacity style={styles.eventCard}>
      <View style={styles.eventHeader}>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <View style={styles.eventMeta}>
            <Ionicons name="calendar-outline" size={14} color={Colors.primaryMedium} />
            <Text style={styles.eventDate}>{formatDate(item.date)}</Text>
          </View>
          <View style={styles.eventMeta}>
            <Ionicons name="location-outline" size={14} color={Colors.primaryMedium} />
            <Text style={styles.eventLocation}>{item.location}</Text>
          </View>
        </View>
        {item.isHost && (
          <View style={styles.hostBadge}>
            <Text style={styles.hostBadgeText}>Host</Text>
          </View>
        )}
      </View>
      <View style={styles.eventFooter}>
        <View style={styles.attendeesInfo}>
          <Ionicons name="people-outline" size={16} color={Colors.primary} />
          <Text style={styles.attendeesText}>
            {item.attendees}/{item.maxAttendees} attending
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={Colors.primaryMedium} />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.purple} />
        <Text style={styles.loadingText}>Loading your events...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Events</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={48} color={Colors.primaryLight} />
            <Text style={styles.emptyText}>No events yet</Text>
            <Text style={styles.emptySubtext}>Create or join events to see them here</Text>
          </View>
        }
      />
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
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
  },
  headerTitle: {
    ...Typography.h2,
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...Typography.body,
    marginTop: Spacing.md,
    color: Colors.primaryMedium,
  },
  listContent: {
    padding: Spacing.xl,
  },
  eventCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    ...Typography.h3,
    marginBottom: Spacing.sm,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: 4,
  },
  eventDate: {
    ...Typography.caption,
    color: Colors.primaryMedium,
  },
  eventLocation: {
    ...Typography.caption,
    color: Colors.primaryMedium,
  },
  hostBadge: {
    backgroundColor: Colors.purpleLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    height: 24,
  },
  hostBadgeText: {
    fontSize: 11,
    color: Colors.purple,
    fontWeight: '500',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.grayBorder,
  },
  attendeesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  attendeesText: {
    ...Typography.bodySmall,
    color: Colors.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl * 2,
  },
  emptyText: {
    ...Typography.h3,
    marginTop: Spacing.md,
    color: Colors.primaryMedium,
  },
  emptySubtext: {
    ...Typography.body,
    marginTop: Spacing.xs,
    color: Colors.primaryLight,
  },
});

export default MyEventsScreen;