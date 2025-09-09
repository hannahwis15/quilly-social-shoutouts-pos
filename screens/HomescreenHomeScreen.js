import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  Platform,
  Pressable,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import PostCreationModal from '../components/PostCreationModal';

const { width: screenWidth } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 311;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 164 : 144;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const HomescreenHomeScreen = () => {
  const [shoutoutText, setShoutoutText] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const houseName = "KAHLO HOUSE";
  const points = 100;
  const housematesCount = "meet my housemates";
  
  // Sample shoutouts data - replace with actual data from API/state
  const [shoutouts, setShoutouts] = useState([
    {
      id: 1,
      userName: 'You',
      userAvatar: require('../assets/images/Avatar.png'),
      content: 'study date anyone?',
      timeAgo: '21 min ago',
      time: '11am',
      location: 'Glade',
      attendees: [
        { avatar: require('../assets/images/Avatar.png') },
        { avatar: require('../assets/images/Avatar.png') },
        { avatar: require('../assets/images/Avatar.png') }
      ]
    },
    {
      id: 2,
      userName: 'Hannah',
      userAvatar: require('../assets/images/Avatar.png'),
      content: "let's grab coffee!",
      timeAgo: '45 min ago',
      time: '2pm',
      location: 'Campus Cafe',
      attendees: [
        { avatar: require('../assets/images/Avatar.png') },
        { avatar: require('../assets/images/Avatar.png') }
      ]
    },
    {
      id: 3,
      userName: 'Lily',
      userAvatar: require('../assets/images/Avatar.png'),
      content: 'need more players for volleyball!',
      timeAgo: '1 hr ago',
      time: '12pm',
      location: 'Main Gym',
      attendees: [
        { avatar: require('../assets/images/Avatar.png') }
      ]
    }
  ]);
  
  const discussions = [
    {
      id: 1,
      author: "Lily A.",
      avatar: require('../assets/images/Avatar.png'),
      message: "Anybody know any quiet places to study and allows drinks?",
      tag: "Dating",
      timeAgo: "2h",
    },
    {
      id: 2,
      author: "Lily A.",
      avatar: require('../assets/images/Avatar(1).png'),
      message: "Anybody know any quiet places to study and allows drinks?",
      tag: "Dating",
      timeAgo: "4h",
    },
  ];

  // Animation interpolations
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const shareCardTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE - 10],
    extrapolate: 'clamp',
  });

  const shareCardScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F1E6FF" />
      
      {/* Fixed Background Header */}
      <View style={styles.headerBackground} />
      
      {/* Collapsing Header Content */}
      <Animated.View 
        style={[
          styles.headerSection,
          {
            transform: [{ translateY: headerTranslate }],
          }
        ]}
      >
        {/* House Name - Centered and aligned with notification */}
        <Animated.View style={[styles.houseNameContainer, { opacity: headerOpacity }]}>
          <View style={styles.headerRow}>
            <Text style={styles.houseName}>{houseName}</Text>
          </View>
        </Animated.View>
        
        {/* Points and Housemates - These will fade out */}
        <Animated.View style={[styles.pointsRow, { opacity: headerOpacity }]}>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>{points} pts</Text>
          </View>
          <TouchableOpacity style={styles.housematesLink}>
            <Ionicons name="people-outline" size={16} color="#35303D" />
            <Text style={styles.housematesText}>{housematesCount}</Text>
            <Ionicons name="chevron-forward" size={16} color="#35303D" />
          </TouchableOpacity>
        </Animated.View>
        
        {/* House Illustration - This will fade out */}
        <Animated.Image 
          source={require('../assets/images/KAHLOHouse.png')}
          style={[styles.houseIllustration, { opacity: headerOpacity }]}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Fixed Notification Bell - Always visible */}
      <View style={styles.fixedNotification}>
        <TouchableOpacity style={styles.notificationButton}>
          <View style={styles.notificationIcon}>
            <Feather name="bell" size={18} color="#35303D" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Share Section - This moves up as you scroll */}
      <Animated.View 
        style={[
          styles.shareSection,
          {
            transform: [
              { translateY: shareCardTranslate },
              { scale: shareCardScale }
            ],
          }
        ]}
      >
        <View style={styles.shareHeader}>
          <Image 
            source={require('../assets/images/NewPaperPlane.png')}
            style={styles.shareIcon}
            resizeMode="contain"
          />
          <View style={styles.shareTextContainer}>
            <Text style={styles.shareTitle}>Anything on your mind?</Text>
            <Text style={styles.shareSubtitle}>something something something text</Text>
          </View>
        </View>
        
        <View style={styles.shareInputRow}>
          <Image 
            source={require('../assets/images/Avatar.png')}
            style={styles.userAvatar}
          />
          <Pressable 
            style={styles.shareInputContainer}
            onPress={() => setShowPostModal(true)}
          >
            <Text style={styles.shareInputPlaceholder}>
              Share with your housemates!
            </Text>
            <View style={styles.sendButtonCircle}>
              <MaterialCommunityIcons name="send" size={16} color="#9599FF" />
            </View>
          </Pressable>
        </View>
      </Animated.View>
      
      {/* Scrollable Content */}
      <Animated.ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Spacer for header and share card */}
        <View style={{ height: HEADER_MAX_HEIGHT + 80 }} />
        
        {/* White background container for content */}
        <View style={styles.contentContainer}>
        
        {/* Happening Now Section */}
        <View style={styles.happeningSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Happening Now</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllLink}>view all</Text>
            </TouchableOpacity>
          </View>
          
          {/* Conditional rendering based on shoutouts */}
          {shoutouts && shoutouts.length > 0 ? (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.shoutoutsScrollContainer}
            >
              {shoutouts.map((shoutout, index) => (
                <View key={index} style={styles.shoutoutCard}>
                  {/* Profile section */}
                  <View style={styles.shoutoutHeader}>
                    <Image 
                      source={shoutout.userAvatar || require('../assets/images/Avatar.png')}
                      style={styles.shoutoutAvatar}
                    />
                    <View style={styles.shoutoutUserInfo}>
                      <Text style={styles.shoutoutUserName}>{shoutout.userName || 'You'}</Text>
                      <Text style={styles.shoutoutTime}>{shoutout.timeAgo || '21 min ago'}</Text>
                    </View>
                    {/* Attendees avatars */}
                    {shoutout.attendees && shoutout.attendees.length > 0 && (
                      <View style={styles.attendeesContainer}>
                        {shoutout.attendees.slice(0, 3).map((attendee, idx) => (
                          <Image 
                            key={idx}
                            source={attendee.avatar}
                            style={[styles.attendeeAvatar, { marginLeft: idx > 0 ? -8 : 0 }]}
                          />
                        ))}
                      </View>
                    )}
                  </View>
                  
                  {/* Shoutout content */}
                  <Text style={styles.shoutoutContent}>{shoutout.content}</Text>
                  
                  {/* Time and location info */}
                  <View style={styles.shoutoutInfoBox}>
                    <View style={styles.shoutoutInfoRow}>
                      <View style={styles.shoutoutInfoItem}>
                        <Ionicons name="time-outline" size={10} color="rgba(53,48,61,0.8)" />
                        <Text style={styles.shoutoutInfoText}>{shoutout.time || '11am'}</Text>
                      </View>
                      <View style={styles.shoutoutInfoDivider} />
                      <View style={styles.shoutoutInfoItem}>
                        <Ionicons name="location-outline" size={10} color="rgba(53,48,61,0.8)" />
                        <Text style={styles.shoutoutInfoText}>{shoutout.location || 'Glade'}</Text>
                      </View>
                    </View>
                  </View>
                  
                  {/* Action buttons */}
                  <View style={styles.shoutoutActions}>
                    <TouchableOpacity style={styles.shoutoutActionButton}>
                      <Ionicons name="trash-outline" size={10} color="rgba(53,48,61,0.8)" />
                      <Text style={styles.shoutoutActionText}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shoutoutEditButton}>
                      <Ionicons name="pencil-outline" size={10} color="rgba(53,48,61,0.8)" />
                      <Text style={styles.shoutoutActionText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.noMeetupsContainer}>
              {/* Sleep Icon Placeholder - Replace with actual icon */}
              <View style={[styles.sleepIcon, {backgroundColor: '#E5CFFF', borderRadius: 22}]} />
              <Text style={styles.noMeetupsText}>No Shoutouts Yet!</Text>
              <Text style={styles.noMeetupsSubtext}>
                Not sure what to shout-out? Try out one of these:
              </Text>
            </View>
          )}
        </View>
        
        {/* Discussion Posts */}
        <View style={styles.discussionSection}>
          {discussions.map((discussion) => (
            <View key={discussion.id} style={styles.discussionCard}>
              <View style={styles.discussionHeader}>
                <Image source={discussion.avatar} style={styles.discussionAvatar} />
                <Text style={styles.discussionAuthor}>{discussion.author}</Text>
                <View style={styles.discussionTag}>
                  {/* Tag Icon */}
                  <View style={[styles.tagIcon, {backgroundColor: '#FF69B4', borderRadius: 4}]} />
                  <Text style={styles.tagText}>{discussion.tag}</Text>
                </View>
              </View>
              
              <Text style={styles.discussionMessage}>{discussion.message}</Text>
              
              <TouchableOpacity style={styles.postButton}>
                <Text style={styles.postButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          ))}
          
          {/* Add more dummy posts to demonstrate scrolling */}
          {[...Array(3)].map((_, index) => (
            <View key={`dummy-${index}`} style={styles.discussionCard}>
              <View style={styles.discussionHeader}>
                <Image source={require('../assets/images/Avatar.png')} style={styles.discussionAvatar} />
                <Text style={styles.discussionAuthor}>User {index + 3}</Text>
                <View style={styles.discussionTag}>
                  <View style={[styles.tagIcon, {backgroundColor: '#FF69B4', borderRadius: 4}]} />
                  <Text style={styles.tagText}>General</Text>
                </View>
              </View>
              
              <Text style={styles.discussionMessage}>
                This is a sample discussion post to demonstrate the scrolling behavior.
              </Text>
              
              <TouchableOpacity style={styles.postButton}>
                <Text style={styles.postButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        </View>
      </Animated.ScrollView>
      
      {/* Post Creation Modal */}
      <PostCreationModal
        visible={showPostModal}
        onClose={() => setShowPostModal(false)}
        userAvatar={require('../assets/images/Avatar.png')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: -20,
    paddingTop: 20,
    minHeight: 800,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MIN_HEIGHT,
    backgroundColor: '#F1E6FF',
    zIndex: 1,
  },
  headerSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F1E6FF',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: HEADER_MAX_HEIGHT,
    zIndex: 2,
  },
  houseNameContainer: {
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  houseName: {
    fontSize: 20,
    fontWeight: '500',
    color: '#35303D',
    textTransform: 'uppercase',
    letterSpacing: -0.8,
    textAlign: 'center',
  },
  fixedNotification: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 58 : 28,
    right: 30,
    zIndex: 10,
  },
  notificationButton: {
    padding: 5,
  },
  notificationIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: '#FF4444',
    width: 12,
    height: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 15,
  },
  pointsBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 25,
  },
  pointsText: {
    fontSize: 14,
    color: '#35303D',
  },
  housematesLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  housematesText: {
    fontSize: 14,
    color: '#35303D',
  },
  houseIllustration: {
    width: 169,
    height: 159,
    alignSelf: 'center',
  },
  shareSection: {
    position: 'absolute',
    top: HEADER_MAX_HEIGHT - 38,  // Overlap with purple header at 273px (311-38)
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 5,
  },
  shareHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  shareIcon: {
    width: 32,
    height: 33,
    marginRight: 10,
  },
  shareTextContainer: {
    flex: 1,
  },
  shareTitle: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 2,
  },
  shareSubtitle: {
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.37)',
  },
  shareInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  userAvatar: {
    width: 39,
    height: 39,
    borderRadius: 20,
    backgroundColor: '#35303D',
  },
  shareInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 0.8,
    borderColor: '#B2B2B2',
    borderRadius: 25,
    paddingLeft: 22,
    paddingRight: 8,
    paddingVertical: 8,
  },
  shareInputPlaceholder: {
    flex: 1,
    fontSize: 12,
    color: '#35303D',
  },
  sendButtonCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5CFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  happeningSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#35303D',
  },
  viewAllLink: {
    fontSize: 14,
    color: 'rgba(53, 48, 61, 0.5)',
    textDecorationLine: 'underline',
  },
  shoutoutsScrollContainer: {
    paddingRight: 20,
  },
  shoutoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E8E2ED',
    width: 182,
    height: 196,
    marginRight: 15,
    padding: 14,
    shadowColor: '#E5CFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4.67,
    elevation: 3,
  },
  shoutoutHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  shoutoutAvatar: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
    backgroundColor: '#35303D',
  },
  shoutoutUserInfo: {
    marginLeft: 8,
    flex: 1,
  },
  shoutoutUserName: {
    fontSize: 12,
    color: '#35303D',
    fontWeight: '400',
  },
  shoutoutTime: {
    fontSize: 9,
    color: '#35303D',
    opacity: 0.7,
    marginTop: 2,
  },
  attendeesContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  attendeeAvatar: {
    width: 16.5,
    height: 16.5,
    borderRadius: 8.25,
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
  },
  shoutoutContent: {
    fontSize: 14,
    color: '#35303D',
    marginBottom: 12,
    lineHeight: 18,
  },
  shoutoutInfoBox: {
    borderWidth: 0.25,
    borderColor: '#35303D',
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  shoutoutInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  shoutoutInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shoutoutInfoText: {
    fontSize: 10,
    color: 'rgba(53,48,61,0.8)',
  },
  shoutoutInfoDivider: {
    width: 1,
    height: 19,
    backgroundColor: '#35303D',
    opacity: 0.2,
  },
  shoutoutActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 14,
    left: 14,
    right: 14,
  },
  shoutoutActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 19,
    paddingVertical: 8,
    borderRadius: 30,
    gap: 7,
  },
  shoutoutEditButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 30,
    gap: 4,
  },
  shoutoutActionText: {
    fontSize: 12,
    color: 'rgba(53,48,61,0.8)',
  },
  noMeetupsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(53, 48, 61, 0.8)',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sleepIcon: {
    width: 43,
    height: 43,
    marginBottom: 15,
  },
  noMeetupsText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(53, 48, 61, 0.8)',
    marginBottom: 10,
  },
  noMeetupsSubtext: {
    fontSize: 14,
    color: '#6B6B6B',
    textAlign: 'center',
    maxWidth: 195,
  },
  discussionSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
  },
  discussionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 15,
  },
  discussionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  discussionAvatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#35303D',
    marginRight: 10,
  },
  discussionAuthor: {
    fontSize: 12,
    color: 'rgba(53, 48, 61, 0.8)',
    flex: 1,
  },
  discussionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 17,
    borderWidth: 0.3,
    borderColor: 'rgba(53, 48, 61, 0.8)',
    gap: 3,
  },
  tagIcon: {
    width: 8,
    height: 8,
  },
  tagText: {
    fontSize: 7,
    color: '#35303D',
  },
  discussionMessage: {
    fontSize: 14,
    color: '#35303D',
    lineHeight: 18,
    marginBottom: 15,
  },
  postButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#CACDFF',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 30,
  },
  postButtonText: {
    fontSize: 12,
    color: 'rgba(53, 48, 61, 0.8)',
  },
});

export default HomescreenHomeScreen;