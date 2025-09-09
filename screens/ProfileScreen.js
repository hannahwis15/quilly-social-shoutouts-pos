import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Borders } from '../config/styles';

const ProfileScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'points'
  const [myEventsLoaded, setMyEventsLoaded] = useState(false);
  const [myDiscussionsLoaded, setMyDiscussionsLoaded] = useState(false);
  
  // Helper function to get point history
  const getPointHistory = () => {
    return [
      {
        id: 'ph1',
        description: 'Attended 2 Shoutouts and 1 Hangout this week!',
        points: 7,
        date: 'this week',
      },
      {
        id: 'ph2',
        description: 'Created a Hangout!',
        points: 5,
        date: 'Jan 17',
      },
      {
        id: 'ph3',
        description: 'Cancelled planned events 5 times.',
        points: -5,
        date: 'Jan 5-10',
      },
      {
        id: 'ph4',
        description: 'Created a Shoutout!',
        points: 3,
        date: 'Jan 4',
      },
      {
        id: 'ph5',
        description: 'Posted a Discussion!',
        points: 2,
        date: 'Jan 4',
      },
    ];
  };
  
  // Comprehensive user object structure - in production this would come from context/state/API
  const user = {
    // Basic Information
    id: 'user123',
    username: 'elliesmith',
    email: 'ellie.smith@email.com',
    phoneNumber: '+1234567890',
    
    // Profile Information
    firstName: 'Ellie',
    lastName: 'Smith',
    fullName: 'Ellie Smith',
    pronouns: 'She/Her',
    bio: 'Political Science student passionate about social change and community building.',
    avatar: require('../assets/images/Avatar.png'),
    coverPhoto: null,
    
    // Location & Education
    location: {
      city: 'Redwood City',
      state: 'CA',
      country: 'USA',
      formatted: 'Redwood City, CA'
    },
    education: {
      school: 'UCLA',
      graduationYear: '26',
      major: 'Political Science',
      minor: 'Public Policy',
      formatted: 'UCLA \'26'
    },
    
    // House/Community Information
    house: {
      id: 'house123',
      name: 'KAHLO HOUSE',
      role: 'member', // 'member', 'admin', 'moderator'
      joinedDate: new Date('2024-01-15'),
      totalPoints: 3580,
    },
    
    // Gamification
    points: {
      total: 1080,
      thisWeek: 45,
      thisMonth: 155, // Current points for this month
      level: 5,
      nextLevelPoints: 1200,
      rank: 12, // rank in house
    },
    
    // Interests & Preferences
    interests: [
      { id: 'int1', name: 'Film & TV', emoji: '🎬', category: 'entertainment' },
      { id: 'int2', name: 'Reading', emoji: '📚', category: 'hobbies' },
      { id: 'int3', name: 'Skincare/ Makeup', emoji: '💄', category: 'lifestyle' },
      { id: 'int4', name: 'Creativity', emoji: '🎨', category: 'personal' },
      { id: 'int5', name: 'Self improvement', emoji: '🌱', category: 'personal' },
    ],
    
    // Media
    media: {
      introVideo: null, // URL to intro video
      photos: [], // Array of photo URLs
    },
    
    // Activity Statistics
    stats: {
      totalShoutouts: 24,
      totalDiscussions: 18,
      totalEvents: 7,
      totalComments: 156,
      totalReactions: 89,
      joinedDate: new Date('2024-01-15'),
      lastActive: new Date(),
    },
    
    // Privacy Settings
    privacy: {
      profileVisibility: 'public', // 'public', 'house', 'private'
      showEmail: false,
      showPhone: false,
      showLocation: true,
    },
    
    // Notification Settings
    notifications: {
      push: true,
      email: true,
      discussions: true,
      events: true,
      shoutouts: true,
    },
    
    // Lists (Lazy Loaded)
    myEvents: null, // Will be loaded when needed
    myDiscussions: null, // Will be loaded when needed
    myShoutouts: null, // Will be loaded when needed
    savedItems: null, // Will be loaded when needed
    activityHistory: null, // Will be loaded when needed
    
    // Recent Activity for Points Tab
    recentActivity: [
      {
        id: 'act1',
        type: 'discussion',
        description: 'Posted in discussion',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        points: 10,
        icon: 'chatbubble-outline',
      },
      {
        id: 'act2',
        type: 'reaction',
        description: 'Received likes',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        points: 5,
        icon: 'heart-outline',
      },
      {
        id: 'act3',
        type: 'event',
        description: 'Attended event',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        points: 20,
        icon: 'calendar-outline',
      },
    ],
  };
  
  // Lazy load functions
  const loadMyEvents = async () => {
    if (!myEventsLoaded) {
      // Simulate API call
      console.log('Loading user events...');
      // In production: const events = await api.getUserEvents(user.id);
      setMyEventsLoaded(true);
    }
  };
  
  const loadMyDiscussions = async () => {
    if (!myDiscussionsLoaded) {
      // Simulate API call
      console.log('Loading user discussions...');
      // In production: const discussions = await api.getUserDiscussions(user.id);
      setMyDiscussionsLoaded(true);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image source={user.avatar} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{user.fullName}</Text>
              <Text style={styles.pronouns}> ({user.pronouns})</Text>
            </View>
            <View style={styles.statsRow}>
              <MaterialCommunityIcons name="star-four-points" size={14} color={Colors.primaryMedium} />
              <Text style={styles.points}>{user.points.total} points</Text>
            </View>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color={Colors.primaryMedium} />
              <Text style={styles.location}>{user.location.formatted}</Text>
              <Text style={styles.separator}>|</Text>
              <Text style={styles.school}>{user.education.formatted}</Text>
              <Text style={styles.separator}>|</Text>
              <Text style={styles.major}>{user.education.major}</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Settings', { user })}
            >
              <Feather name="edit-2" size={18} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Settings', { user })}
            >
              <Ionicons name="settings-outline" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
            onPress={() => setActiveTab('profile')}
          >
            <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>
              My Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'points' && styles.activeTab]}
            onPress={() => setActiveTab('points')}
          >
            <Text style={[styles.tabText, activeTab === 'points' && styles.activeTabText]}>
              My Points
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'profile' ? (
          <>
            {/* User Bio */}
            {user.bio && (
              <View style={styles.bioSection}>
                <Text style={styles.bio}>{user.bio}</Text>
              </View>
            )}
            
            {/* User Video Section */}
            <View style={styles.videoSection}>
              {user.media.introVideo ? (
                <View style={styles.videoPlayer}>
                  {/* Video player would go here */}
                </View>
              ) : (
                <View style={styles.videoPlaceholder}>
                  <Text style={styles.videoPlaceholderText}>user video</Text>
                </View>
              )}
            </View>
            
            {/* Interests Section */}
            <View style={styles.interestsSection}>
              <View style={styles.interestsRow}>
                {user.interests.slice(0, 3).map((interest) => (
                  <View key={interest.id} style={styles.interestPill}>
                    <Text style={styles.interestIcon}>
                      {interest.emoji}
                    </Text>
                    <Text style={styles.interestText}>{interest.name}</Text>
                  </View>
                ))}
              </View>
              {user.interests.length > 3 && (
                <View style={styles.interestsRow}>
                  {user.interests.slice(3).map((interest) => (
                    <View key={interest.id} style={styles.interestPill}>
                      <Text style={styles.interestIcon}>
                        {interest.emoji}
                      </Text>
                      <Text style={styles.interestText}>{interest.name}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
            
            {/* Profile Sections with Stats */}
            <View style={styles.sectionsContainer}>
              <TouchableOpacity 
                style={styles.sectionButton}
                onPress={() => navigation.navigate('MyEvents', { userId: user.id })}
              >
                <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
                <Text style={styles.sectionButtonText}>My Events</Text>
                <View style={styles.sectionBadge}>
                  <Text style={styles.sectionBadgeText}>{user.stats.totalEvents}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.primaryMedium} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.sectionButton}
                onPress={() => navigation.navigate('MyDiscussions', { userId: user.id })}
              >
                <Ionicons name="chatbubbles-outline" size={20} color={Colors.primary} />
                <Text style={styles.sectionButtonText}>My Discussions</Text>
                <View style={styles.sectionBadge}>
                  <Text style={styles.sectionBadgeText}>{user.stats.totalDiscussions}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.primaryMedium} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.sectionButton}
                onPress={() => navigation.navigate('MyShoutouts', { userId: user.id })}
              >
                <Ionicons name="megaphone-outline" size={20} color={Colors.primary} />
                <Text style={styles.sectionButtonText}>My Shoutouts</Text>
                <View style={styles.sectionBadge}>
                  <Text style={styles.sectionBadgeText}>{user.stats.totalShoutouts}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.primaryMedium} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sectionButton}>
                <Ionicons name="bookmark-outline" size={20} color={Colors.primary} />
                <Text style={styles.sectionButtonText}>Saved</Text>
                <Ionicons name="chevron-forward" size={18} color={Colors.primaryMedium} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sectionButton}>
                <Ionicons name="time-outline" size={20} color={Colors.primary} />
                <Text style={styles.sectionButtonText}>Activity</Text>
                <Ionicons name="chevron-forward" size={18} color={Colors.primaryMedium} />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          /* Points Tab Content */
          <View style={styles.pointsContent}>
            {/* Your Points Card */}
            <View style={styles.pointsCard}>
              <View style={styles.pointsCardRow}>
                <View style={styles.pointsCardLeft}>
                  <Ionicons name="person-outline" size={16} color={Colors.primary} />
                  <Text style={styles.pointsCardLabel}>Your Points</Text>
                </View>
                <Text style={styles.pointsCardValue}>{user.points.thisMonth}</Text>
              </View>
            </View>
            
            {/* House Points Card */}
            <View style={styles.pointsCard}>
              <View style={styles.pointsCardRow}>
                <View style={styles.pointsCardLeft}>
                  <Ionicons name="home-outline" size={14} color={Colors.primary} />
                  <Text style={styles.pointsCardLabel}>House Points</Text>
                </View>
                <Text style={styles.pointsCardValue}>{user.house.totalPoints || 3580}</Text>
              </View>
            </View>
            
            {/* Point History Section */}
            <View style={styles.pointsHistorySection}>
              <Text style={styles.pointsHistoryTitle}>Point History</Text>
              <View style={styles.monthSelector}>
                <Text style={styles.monthSelectorText}>January 2025</Text>
                <Ionicons name="chevron-down" size={16} color={Colors.primary} />
              </View>
            </View>
            
            {/* Point History Items */}
            <View style={styles.pointsHistoryList}>
              {getPointHistory().map((item) => (
                <View key={item.id} style={styles.pointHistoryItem}>
                  <View style={[
                    styles.pointHistoryBadge,
                    { backgroundColor: item.points > 0 ? '#E9EEA8' : '#FFCFD6' }
                  ]}>
                    <View style={styles.pointHistoryBadgeContent}>
                      <Text style={styles.pointHistorySign}>{item.points > 0 ? '+' : '-'}</Text>
                      <Text style={styles.pointHistoryValue}>{Math.abs(item.points)}</Text>
                    </View>
                  </View>
                  <View style={styles.pointHistoryInfo}>
                    <Text style={styles.pointHistoryText}>{item.description}</Text>
                  </View>
                  <Text style={styles.pointHistoryDate}>{item.date}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper function to format time ago
const formatTimeAgo = (date) => {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
  },
  profileSection: {
    flexDirection: 'row',
    padding: Spacing.xl,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    marginRight: Spacing.md,
  },
  bioSection: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
  },
  bio: {
    ...Typography.body,
    fontSize: 14,
    color: Colors.primaryMedium,
    lineHeight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  name: {
    ...Typography.h2,
    fontSize: 18,
    fontWeight: '500',
  },
  pronouns: {
    ...Typography.body,
    color: Colors.primaryMedium,
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  points: {
    ...Typography.body,
    fontSize: 14,
    color: Colors.primary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  location: {
    ...Typography.caption,
    fontSize: 12,
    color: Colors.primaryMedium,
  },
  separator: {
    ...Typography.caption,
    fontSize: 12,
    color: Colors.primaryLight,
    marginHorizontal: 2,
  },
  school: {
    ...Typography.caption,
    fontSize: 12,
    color: Colors.primaryMedium,
  },
  major: {
    ...Typography.caption,
    fontSize: 12,
    color: Colors.primaryMedium,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.grayVeryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: Colors.primaryLight,
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: Spacing.xl,
  },
  videoSection: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  videoPlaceholder: {
    height: 320,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoPlaceholderText: {
    ...Typography.body,
    color: Colors.primaryLight,
  },
  interestsSection: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  interestsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  interestPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    gap: 6,
  },
  interestIcon: {
    fontSize: 14,
  },
  interestText: {
    fontSize: 12,
    color: Colors.primary,
  },
  sectionsContainer: {
    paddingHorizontal: Spacing.xl,
  },
  sectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
  },
  sectionButtonText: {
    flex: 1,
    ...Typography.body,
    fontSize: 16,
    marginLeft: Spacing.md,
  },
  sectionBadge: {
    backgroundColor: Colors.purpleLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: Spacing.sm,
  },
  sectionBadgeText: {
    fontSize: 12,
    color: Colors.purple,
    fontWeight: '500',
  },
  pointsContent: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
  },
  pointsCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.xl,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  pointsCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pointsCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pointsCardLabel: {
    fontSize: 14,
    color: Colors.primary,
  },
  pointsCardValue: {
    fontSize: 36,
    fontWeight: '500',
    color: Colors.primary,
    letterSpacing: -1.44,
  },
  pointsHistorySection: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  pointsHistoryTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.primary,
    letterSpacing: -0.8,
    marginBottom: Spacing.sm,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  monthSelectorText: {
    fontSize: 14,
    color: Colors.primary,
    letterSpacing: -0.42,
  },
  pointsHistoryList: {
    gap: 10,
  },
  pointHistoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    height: 66,
    marginBottom: 10,
  },
  pointHistoryBadge: {
    width: 43,
    height: 52,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  pointHistoryBadgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointHistorySign: {
    fontSize: 24,
    color: Colors.primary,
    marginRight: 2,
  },
  pointHistoryValue: {
    fontSize: 24,
    color: Colors.primary,
    letterSpacing: -0.24,
  },
  pointHistoryInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  pointHistoryText: {
    fontSize: 12,
    color: Colors.primary,
    letterSpacing: -0.18,
    lineHeight: 13,
  },
  pointHistoryDate: {
    fontSize: 10,
    color: Colors.primary,
    position: 'absolute',
    right: 15,
    top: 16,
  },
});

export default ProfileScreen;