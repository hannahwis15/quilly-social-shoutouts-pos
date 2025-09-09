import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../config/styles';
import DiscussionCard from '../components/DiscussionCard';

const MyActivityScreen = ({ navigation, route }) => {
  const { user } = route.params || {};
  const [filter, setFilter] = useState('Recent');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, [filter]);

  const loadActivities = () => {
    // Mock data - in production this would come from API
    const mockActivities = [
      {
        id: 'act1',
        type: 'meetup',
        title: 'Morning Hike',
        hostedBy: 'Jane D.',
        hostFullName: 'Jane Davis',
        location: 'Big C',
        date: 'Aug 24',
        time: '5:11am',
        image: require('../assets/images/Avatar.png'),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed.',
        attendees: [
          { id: 'a1', avatar: require('../assets/images/Avatar.png') },
          { id: 'a2', avatar: require('../assets/images/Avatar.png') },
          { id: 'a3', avatar: require('../assets/images/Avatar.png') },
        ],
        commentsCount: 3,
        tags: ['Outdoors', 'All Houses'],
        status: 'Starting soon',
      },
      {
        id: 'act2',
        type: 'discussion',
        owner: {
          id: 'user456',
          name: 'Hannah',
          avatar: require('../assets/images/Avatar.png'),
        },
        description: "let's grab coffee!",
        created_at: new Date(Date.now() - 21 * 60 * 1000),
        comments: [],
        reactions: [],
        shares: [],
        category: { emoji: '☕', label: 'Social' },
        status: 'Attended',
      },
      {
        id: 'act3',
        type: 'shoutout',
        from: {
          id: 'user789',
          name: 'Sarah K.',
          avatar: require('../assets/images/Avatar.png'),
        },
        to: {
          id: user?.id || 'user123',
          name: 'You',
        },
        message: 'Amazing job organizing the study group session!',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        points: 10,
      },
    ];
    
    setActivities(mockActivities);
  };

  const renderMeetupCard = (item) => (
    <View style={styles.meetupCard}>
      <View style={styles.meetupHeader}>
        <View style={styles.meetupStatus}>
          <Text style={styles.meetupStatusText}>{item.status}</Text>
        </View>
        <View style={styles.meetupTags}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.meetupTag}>
              <Text style={styles.meetupTagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      
      {item.image && (
        <Image source={item.image} style={styles.meetupImage} />
      )}
      
      <View style={styles.meetupContent}>
        <Text style={styles.meetupTitle}>{item.title}</Text>
        <Text style={styles.meetupHost}>Hosted by {item.hostedBy}, {item.hostFullName}</Text>
        
        <View style={styles.meetupDetails}>
          <View style={styles.meetupDetail}>
            <Ionicons name="calendar-outline" size={14} color={Colors.primaryMedium} />
            <Text style={styles.meetupDetailText}>{item.date}</Text>
          </View>
          <View style={styles.meetupDetail}>
            <Ionicons name="time-outline" size={14} color={Colors.primaryMedium} />
            <Text style={styles.meetupDetailText}>{item.time}</Text>
          </View>
          <View style={styles.meetupDetail}>
            <Ionicons name="location-outline" size={14} color={Colors.primaryMedium} />
            <Text style={styles.meetupDetailText}>{item.location}</Text>
          </View>
        </View>
        
        <Text style={styles.meetupDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <TouchableOpacity style={styles.viewCommentsButton}>
          <Text style={styles.viewCommentsText}>view comments</Text>
          <Ionicons name="chevron-forward" size={14} color="#9599FF" />
        </TouchableOpacity>
        
        <View style={styles.meetupFooter}>
          <View style={styles.meetupActions}>
            <TouchableOpacity style={styles.meetupAction}>
              <Ionicons name="chatbubble-outline" size={18} color={Colors.primaryMedium} />
              <Text style={styles.meetupActionText}>Send a Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.meetupAction}>
              <Ionicons name="share-outline" size={18} color={Colors.primaryMedium} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.likeButton}>
            <Ionicons name="thumbs-up-outline" size={20} color={Colors.primaryMedium} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.attendeesSection}>
          <View style={styles.attendeesAvatars}>
            {item.attendees.map((attendee, index) => (
              <Image 
                key={attendee.id}
                source={attendee.avatar} 
                style={[styles.attendeeAvatar, { marginLeft: index > 0 ? -10 : 0 }]}
              />
            ))}
            <Text style={styles.attendeesCount}>+3 others</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.attendedSection}>
        <View style={styles.attendedButtons}>
          <TouchableOpacity style={styles.timeButton}>
            <Ionicons name="time-outline" size={16} color={Colors.primaryMedium} />
            <Text style={styles.timeButtonText}>11am</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationButton}>
            <Ionicons name="location-outline" size={16} color={Colors.primaryMedium} />
            <Text style={styles.locationButtonText}>Glade</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.attendedButton}>
            <Text style={styles.attendedButtonText}>Attended</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={18} color={Colors.primaryMedium} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderShoutoutCard = (item) => (
    <View style={styles.shoutoutCard}>
      <View style={styles.shoutoutHeader}>
        <Image source={item.from.avatar} style={styles.shoutoutAvatar} />
        <View style={styles.shoutoutInfo}>
          <Text style={styles.shoutoutFrom}>
            From {item.from.name} → {item.to.name}
          </Text>
          <Text style={styles.shoutoutTime}>
            {formatTimeAgo(item.created_at)}
          </Text>
        </View>
        <View style={styles.shoutoutPoints}>
          <MaterialCommunityIcons name="star-four-points" size={14} color={Colors.purple} />
          <Text style={styles.shoutoutPointsText}>+{item.points}</Text>
        </View>
      </View>
      <Text style={styles.shoutoutMessage}>{item.message}</Text>
    </View>
  );

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'just now';
  };

  const renderActivity = ({ item }) => {
    switch (item.type) {
      case 'meetup':
        return renderMeetupCard(item);
      case 'discussion':
        return (
          <DiscussionCard
            discussion={item}
            category={item.category}
            isOwner={item.owner.id === user?.id}
            currentUserId={user?.id || 'user123'}
            navigation={navigation}
          />
        );
      case 'shoutout':
        return renderShoutoutCard(item);
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Activity</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <View style={styles.divider} />
      
      {/* Filter Dropdown */}
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilterDropdown(!showFilterDropdown)}
        >
          <Text style={styles.filterText}>{filter}</Text>
          <Ionicons 
            name={showFilterDropdown ? "chevron-up" : "chevron-down"} 
            size={16} 
            color={Colors.primary} 
          />
        </TouchableOpacity>
        
        {showFilterDropdown && (
          <View style={styles.filterDropdown}>
            {['Recent', 'This Week', 'This Month', 'All Time'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.filterOption}
                onPress={() => {
                  setFilter(option);
                  setShowFilterDropdown(false);
                }}
              >
                <Text style={[
                  styles.filterOptionText,
                  filter === option && styles.filterOptionTextActive
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      
      {/* Activities List */}
      <FlatList
        data={activities}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.primary,
  },
  headerSpacer: {
    width: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  filterContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 26,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    position: 'relative',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  filterText: {
    fontSize: 14,
    color: Colors.primary,
  },
  filterDropdown: {
    position: 'absolute',
    top: 40,
    right: 26,
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 120,
    zIndex: 1000,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
  },
  filterOptionText: {
    fontSize: 14,
    color: Colors.primary,
  },
  filterOptionTextActive: {
    fontWeight: '500',
    color: Colors.purple,
  },
  listContent: {
    paddingVertical: 20,
  },
  
  // Meetup Card Styles
  meetupCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  meetupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  meetupStatus: {
    backgroundColor: '#E9EEA8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  meetupStatusText: {
    fontSize: 11,
    color: Colors.primary,
  },
  meetupTags: {
    flexDirection: 'row',
    gap: 6,
  },
  meetupTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 0.5,
    borderColor: Colors.grayBorder,
  },
  meetupTagText: {
    fontSize: 10,
    color: Colors.primary,
  },
  meetupImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  meetupContent: {
    padding: 16,
  },
  meetupTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 4,
  },
  meetupHost: {
    fontSize: 12,
    color: Colors.primaryMedium,
    marginBottom: 12,
  },
  meetupDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  meetupDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  meetupDetailText: {
    fontSize: 12,
    color: Colors.primaryMedium,
  },
  meetupDescription: {
    fontSize: 12,
    color: Colors.primaryMedium,
    lineHeight: 16,
    marginBottom: 12,
  },
  viewCommentsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  viewCommentsText: {
    fontSize: 12,
    color: '#9599FF',
  },
  meetupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.grayBorder,
  },
  meetupActions: {
    flexDirection: 'row',
    gap: 16,
  },
  meetupAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  meetupActionText: {
    fontSize: 12,
    color: Colors.primaryMedium,
  },
  likeButton: {
    padding: 4,
  },
  attendeesSection: {
    marginTop: 12,
  },
  attendeesAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  attendeesCount: {
    fontSize: 11,
    color: Colors.primaryMedium,
    marginLeft: 8,
  },
  attendedSection: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  attendedButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
  },
  timeButtonText: {
    fontSize: 11,
    color: Colors.primaryMedium,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
  },
  locationButtonText: {
    fontSize: 11,
    color: Colors.primaryMedium,
  },
  attendedButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: Colors.grayLight,
  },
  attendedButtonText: {
    fontSize: 11,
    color: Colors.primary,
  },
  shareButton: {
    padding: 4,
    marginLeft: 'auto',
  },
  
  // Shoutout Card Styles
  shoutoutCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  shoutoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  shoutoutAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  shoutoutInfo: {
    flex: 1,
  },
  shoutoutFrom: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.primary,
  },
  shoutoutTime: {
    fontSize: 11,
    color: Colors.primaryMedium,
    marginTop: 2,
  },
  shoutoutPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.purpleLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  shoutoutPointsText: {
    fontSize: 12,
    color: Colors.purple,
    fontWeight: '500',
  },
  shoutoutMessage: {
    fontSize: 14,
    color: Colors.primary,
    lineHeight: 20,
  },
});

export default MyActivityScreen;