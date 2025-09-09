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
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 100 : 80;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const HomescreenHomeScreen = () => {
  const [shoutoutText, setShoutoutText] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const houseName = "KAHLO HOUSE";
  const points = 100;
  const housematesCount = "meet my housemates";
  
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
    outputRange: [0, -HEADER_SCROLL_DISTANCE + 60],
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
        {/* House Name - Centered and will fade out */}
        <Animated.View style={[styles.houseNameContainer, { opacity: headerOpacity }]}>
          <Text style={styles.houseName}>{houseName}</Text>
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
            <Feather name="bell" size={20} color="#35303D" />
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
          <View style={styles.shareInputContainer}>
            <TextInput
              style={styles.shareInput}
              placeholder="Share with your housemates!"
              placeholderTextColor="#35303D"
              value={shoutoutText}
              onChangeText={setShoutoutText}
            />
            <TouchableOpacity style={styles.sendButton}>
              <MaterialCommunityIcons name="send" size={20} color="#35303D" />
            </TouchableOpacity>
          </View>
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
        <View style={{ height: HEADER_MAX_HEIGHT + 90 }} />
        
        {/* White background container for content */}
        <View style={styles.contentContainer}>
        
        {/* Happening Now Section */}
        <View style={styles.happeningSection}>
          <Text style={styles.sectionTitle}>Happening Now</Text>
          
          <View style={styles.noMeetupsContainer}>
            {/* Sleep Icon Placeholder - Replace with actual icon */}
            <View style={[styles.sleepIcon, {backgroundColor: '#E5CFFF', borderRadius: 22}]} />
            <Text style={styles.noMeetupsText}>No Meetups Yet!</Text>
            <Text style={styles.noMeetupsSubtext}>
              Not sure what to shout-out? Try out one of these:
            </Text>
          </View>
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
    backgroundColor: '#FFFFFF',
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
    marginBottom: 10,
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
    top: Platform.OS === 'ios' ? 48 : 18,
    right: 20,
    zIndex: 10,
  },
  notificationButton: {
    padding: 5,
  },
  notificationIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF4444',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
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
    top: HEADER_MAX_HEIGHT - 30,  // Overlap with purple header
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
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  shareInput: {
    flex: 1,
    fontSize: 12,
    color: '#35303D',
  },
  sendButton: {
    padding: 5,
  },
  happeningSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#35303D',
    marginBottom: 20,
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