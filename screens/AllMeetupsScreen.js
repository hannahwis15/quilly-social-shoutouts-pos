import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../config/styles';
import MeetupCard from '../components/MeetupCard';

const AllMeetupsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('my_meetups');
  const [attendingMeetups, setAttendingMeetups] = useState(['1', '3']); // Track which meetups user is attending

  // Mock meetup data - ALL meetups
  const allMeetups = [
    {
      id: '1',
      title: "let's grab coffee!",
      host: { 
        id: 'h1', 
        name: 'Hannah',
        avatar: require('../assets/images/Avatar.png')
      },
      attendees: [
        { id: 'a1', name: 'John', avatar: require('../assets/images/Avatar.png') },
        { id: 'a2', name: 'Sarah', avatar: require('../assets/images/Avatar.png') },
        { id: 'a3', name: 'Mike', avatar: require('../assets/images/Avatar.png') },
        { id: 'a4', name: 'Emma', avatar: require('../assets/images/Avatar.png') },
        { id: 'a5', name: 'Chris', avatar: require('../assets/images/Avatar.png') },
      ],
      time: '11am',
      location: 'Glade',
      status: 'just_posted',
      postedTime: '21 min ago',
    },
    {
      id: '2',
      title: "Basketball pickup game",
      host: { 
        id: 'h2', 
        name: 'Alex',
        avatar: require('../assets/images/Avatar.png')
      },
      attendees: [
        { id: 'b1', name: 'David', avatar: require('../assets/images/Avatar.png') },
        { id: 'b2', name: 'Lisa', avatar: require('../assets/images/Avatar.png') },
      ],
      time: '3pm',
      location: 'Main Gym',
      status: 'starting_soon',
      postedTime: '1 hour ago',
    },
    {
      id: '3',
      title: 'Morning Hike',
      host: { 
        id: 'h3', 
        name: 'Jane D.',
        avatar: require('../assets/images/Avatar.png')
      },
      coHosts: [
        { id: 'c1', name: 'Lily C.', avatar: require('../assets/images/Avatar.png') }
      ],
      attendees: [
        { id: 'd1', name: 'Tom', avatar: require('../assets/images/Avatar.png') },
        { id: 'd2', name: 'Kate', avatar: require('../assets/images/Avatar.png') },
        { id: 'd3', name: 'Ben', avatar: require('../assets/images/Avatar.png') },
        { id: 'd4', name: 'Amy', avatar: require('../assets/images/Avatar.png') },
        { id: 'd5', name: 'Paul', avatar: require('../assets/images/Avatar.png') },
        { id: 'd6', name: 'Lucy', avatar: require('../assets/images/Avatar.png') },
      ],
      time: '8-11am',
      date: 'Aug 23',
      location: 'Big C',
      status: 'starting_soon',
      category: 'Outdoors',
      tags: [
        { name: 'Outdoors', emoji: '🥾' },
        { name: 'All Houses', emoji: '🏠' }
      ],
      description: 'Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed',
      image: require('../assets/images/Avatar.png'),
      hasComments: true,
    },
    {
      id: '4',
      title: 'Movie Night',
      host: { 
        id: 'h4', 
        name: 'Julia S.',
        avatar: require('../assets/images/Avatar.png')
      },
      attendees: [
        { id: 'e1', name: 'Mark', avatar: require('../assets/images/Avatar.png') },
        { id: 'e2', name: 'Nina', avatar: require('../assets/images/Avatar.png') },
        { id: 'e3', name: 'Oscar', avatar: require('../assets/images/Avatar.png') },
      ],
      time: '9pm-1am',
      date: 'Oct 5',
      location: '32 Cherry St.',
      status: 'coming_up',
      category: 'Film & TV',
      tags: [
        { name: 'Film & TV', emoji: '🎬' }
      ],
      description: 'some text here.',
      image: require('../assets/images/Avatar.png'),
      hasComments: false,
    },
  ];

  // Filter meetups based on active tab
  const getMeetupsForTab = () => {
    if (activeTab === 'my_meetups') {
      // Show only meetups user is attending
      return allMeetups.filter(meetup => attendingMeetups.includes(meetup.id));
    } else {
      // Show all meetups happening now
      return allMeetups.filter(meetup => 
        meetup.status === 'starting_soon' || 
        meetup.status === 'happening_now' || 
        meetup.status === 'just_posted'
      );
    }
  };

  const handleMeetupPress = (meetup) => {
    navigation.navigate('MeetupDetails', { meetup });
  };

  const handleJoinMeetup = (meetupId) => {
    if (attendingMeetups.includes(meetupId)) {
      // Remove from attending
      setAttendingMeetups(attendingMeetups.filter(id => id !== meetupId));
    } else {
      // Add to attending
      setAttendingMeetups([...attendingMeetups, meetupId]);
    }
  };

  const handleChatMeetup = (meetupId) => {
    console.log('Chat meetup:', meetupId);
    // Navigate to chat or open chat modal
  };

  const handleLikeMeetup = (meetupId) => {
    console.log('Like meetup:', meetupId);
    // Handle like logic
  };

  const renderMeetup = ({ item, index }) => {
    const isAttending = attendingMeetups.includes(item.id);
    
    return (
      <View style={styles.meetupCardWrapper}>
        <MeetupCard
          meetup={{...item, isJoined: isAttending}}
          isCompact={true}
          onPress={() => handleMeetupPress(item)}
          onJoin={() => handleJoinMeetup(item.id)}
          onChat={() => handleChatMeetup(item.id)}
          onLike={() => handleLikeMeetup(item.id)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Meetups</Text>
        
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={22} color={Colors.primary} />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => setActiveTab('happening_now')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'happening_now' && styles.activeTabText
          ]}>
            Happening Now
          </Text>
          {activeTab === 'happening_now' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => setActiveTab('my_meetups')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'my_meetups' && styles.activeTabText
          ]}>
            My Meetups
          </Text>
          {activeTab === 'my_meetups' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Content */}
      <FlatList
        data={getMeetupsForTab()}
        renderItem={renderMeetup}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {activeTab === 'my_meetups' 
                ? "You haven't joined any meetups yet" 
                : "No meetups happening now"}
            </Text>
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
    paddingHorizontal: 26,
    paddingVertical: 15,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.primary,
  },
  notificationButton: {
    position: 'relative',
    padding: 5,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    width: 11,
    height: 11,
    borderRadius: 5.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    fontSize: 8,
    color: Colors.white,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 43,
    marginTop: 10,
  },
  tab: {
    marginRight: 40,
    paddingBottom: 8,
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
    color: Colors.primaryLight,
    letterSpacing: -0.18,
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.grayBorder,
    marginHorizontal: 26,
  },
  listContent: {
    paddingTop: 20,
    paddingBottom: 100,
  },
  meetupCardWrapper: {
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.primaryLight,
  },
});

export default AllMeetupsScreen;