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
  Linking,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import PostCreationModal from '../components/PostCreationModal';
import AttendingConfirmationModal from '../components/AttendingConfirmationModal';
import CategorySelectionModal from '../components/CategorySelectionModal';
import DiscussionCard from '../components/DiscussionCard';
import { CATEGORY_GROUPS } from '../config/categories';

const { width: screenWidth } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 311;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 164 : 144;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const HomescreenHomeScreen = () => {
  const [shoutoutText, setShoutoutText] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);
  const [showAttendingModal, setShowAttendingModal] = useState(false);
  const [selectedShoutoutOwner, setSelectedShoutoutOwner] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const houseName = "KAHLO HOUSE";
  const points = 100;
  const housematesCount = "meet my housemates";
  
  // Sample shoutouts data - replace with actual data from API/state
  const currentUserId = 'user123'; // Replace with actual current user ID
  
  const [shoutouts, setShoutouts] = useState([
    {
      id: 1,
      owner: {
        id: 'user123',
        name: 'John Doe',
        avatar: require('../assets/images/Avatar.png')
      },
      title: 'study date anyone?',
      created_at: new Date(Date.now() - 21 * 60 * 1000), // 21 minutes ago
      time: '11am',
      location: 'Glade',
      locationGps: 'https://maps.google.com/?q=37.8719,-122.2585',
      attending: false,
      participants: [
        { id: 'user2', avatar: require('../assets/images/Avatar.png') },
        { id: 'user3', avatar: require('../assets/images/Avatar.png') },
        { id: 'user4', avatar: require('../assets/images/Avatar.png') }
      ]
    },
    {
      id: 2,
      owner: {
        id: 'user456',
        name: 'Hannah',
        avatar: require('../assets/images/Avatar.png')
      },
      title: "let's grab coffee!",
      created_at: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      time: '2pm',
      location: 'Campus Cafe',
      locationGps: 'https://maps.google.com/?q=37.8720,-122.2590',
      attending: false,
      participants: [
        { id: 'user5', avatar: require('../assets/images/Avatar.png') },
        { id: 'user6', avatar: require('../assets/images/Avatar.png') }
      ]
    },
    {
      id: 3,
      owner: {
        id: 'user789',
        name: 'Lily',
        avatar: require('../assets/images/Avatar.png')
      },
      title: 'need more players for volleyball!',
      created_at: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      time: '12pm',
      location: 'Main Gym',
      locationGps: 'https://maps.google.com/?q=37.8715,-122.2580',
      attending: true,
      participants: [
        { id: 'user7', avatar: require('../assets/images/Avatar.png') }
      ]
    }
  ]);
  
  // Helper function to calculate time ago
  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    return 'just now';
  };
  
  const handleAttendToggle = (shoutoutId, ownerName) => {
    setShoutouts(prevShoutouts => 
      prevShoutouts.map(shoutout => {
        if (shoutout.id === shoutoutId) {
          if (!shoutout.attending) {
            // Show confirmation modal when attending
            setSelectedShoutoutOwner(ownerName);
            setShowAttendingModal(true);
          }
          return { ...shoutout, attending: !shoutout.attending };
        }
        return shoutout;
      })
    );
  };
  
  // Sample discussions data
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      owner: {
        id: 'user456',
        name: 'Lily A.',
        avatar: require('../assets/images/Avatar.png')
      },
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      description: "Anybody know any quiet places to study and allows drinks?",
      category: 'dating',
      image: null,
      reactions: [
        { id: 1, user_id: 'user123', type: 'heart' },
        { id: 2, user_id: 'user789', type: 'heart' },
        { id: 3, user_id: 'user101', type: 'heart' },
        { id: 4, user_id: 'user102', type: 'heart' },
        { id: 5, user_id: 'user103', type: 'heart' },
        { id: 6, user_id: 'user104', type: 'heart' },
        { id: 7, user_id: 'user105', type: 'heart' },
        { id: 8, user_id: 'user106', type: 'heart' },
        { id: 9, user_id: 'user107', type: 'heart' },
        { id: 10, user_id: 'user108', type: 'heart' },
        { id: 11, user_id: 'user109', type: 'heart' },
        { id: 12, user_id: 'user110', type: 'heart' }
      ],
      comments: [
        { id: 1, user_id: 'user201', text: 'Try the library cafe!' },
        { id: 2, user_id: 'user202', text: 'Starbucks on 5th is quiet' },
        { id: 3, user_id: 'user203', text: 'The study lounge is great' },
        { id: 4, user_id: 'user204', text: 'Coffee Bean has good spots' },
        { id: 5, user_id: 'user205', text: 'Try the quiet floor in the library' },
        { id: 6, user_id: 'user206', text: 'There is a nice cafe near campus' },
        { id: 7, user_id: 'user207', text: 'I know a good place!' },
        { id: 8, user_id: 'user208', text: 'The student center has quiet areas' },
        { id: 9, user_id: 'user209', text: 'Try the bookstore cafe' },
        { id: 10, user_id: 'user210', text: 'The park nearby is peaceful' },
        { id: 11, user_id: 'user211', text: 'Second floor of the science building' },
        { id: 12, user_id: 'user212', text: 'The courtyard is nice' },
        { id: 13, user_id: 'user213', text: 'Try early mornings at any cafe' },
        { id: 14, user_id: 'user214', text: 'The east wing is usually empty' },
        { id: 15, user_id: 'user215', text: 'I study at home' },
        { id: 16, user_id: 'user216', text: 'The music building has quiet rooms' },
        { id: 17, user_id: 'user217', text: 'Try the graduate lounge' },
        { id: 18, user_id: 'user218', text: 'The rooftop garden is amazing' },
        { id: 19, user_id: 'user219', text: 'Near the fountain is quiet' },
        { id: 20, user_id: 'user220', text: 'The old library building' },
        { id: 21, user_id: 'user221', text: 'Study rooms can be booked' },
        { id: 22, user_id: 'user222', text: 'The basement level is quiet' },
        { id: 23, user_id: 'user223', text: 'Try the medical library' },
        { id: 24, user_id: 'user224', text: 'The law library allows guests' },
        { id: 25, user_id: 'user225', text: 'Art building has nice spaces' },
        { id: 26, user_id: 'user226', text: 'The chapel is peaceful' },
        { id: 27, user_id: 'user227', text: 'Computer lab after hours' },
        { id: 28, user_id: 'user228', text: 'The archives room' },
        { id: 29, user_id: 'user229', text: 'Faculty lounge if you have access' },
        { id: 30, user_id: 'user230', text: 'Great suggestions everyone!' }
      ],
      shares: [
        { id: 1, user_id: 'user301', shared_at: new Date() },
        { id: 2, user_id: 'user302', shared_at: new Date() }
      ]
    },
    {
      id: 2,
      owner: {
        id: 'user123',
        name: 'John Doe',
        avatar: require('../assets/images/Avatar(1).png')
      },
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      description: "Looking for recommendations on the best coffee shops around campus!",
      category: 'food',
      image: require('../assets/images/Rectangle200.png'),
      reactions: [
        { id: 1, user_id: 'user401', type: 'heart' },
        { id: 2, user_id: 'user402', type: 'heart' },
        { id: 3, user_id: 'user403', type: 'heart' },
        { id: 4, user_id: 'user404', type: 'heart' },
        { id: 5, user_id: 'user405', type: 'heart' },
        { id: 6, user_id: 'user406', type: 'heart' },
        { id: 7, user_id: 'user407', type: 'heart' },
        { id: 8, user_id: 'user408', type: 'heart' }
      ],
      comments: [
        { id: 1, user_id: 'user501', text: 'Blue Bottle is the best!' },
        { id: 2, user_id: 'user502', text: 'Try Philz Coffee' },
        { id: 3, user_id: 'user503', text: 'Peets has good wifi' },
        { id: 4, user_id: 'user504', text: 'The campus cafe is actually decent' },
        { id: 5, user_id: 'user505', text: 'Local Grounds is my favorite' },
        { id: 6, user_id: 'user506', text: 'Ritual Coffee Roasters' },
        { id: 7, user_id: 'user507', text: 'Four Barrel Coffee' },
        { id: 8, user_id: 'user508', text: 'Verve Coffee' },
        { id: 9, user_id: 'user509', text: 'Sightglass Coffee' },
        { id: 10, user_id: 'user510', text: 'Equator Coffees' },
        { id: 11, user_id: 'user511', text: 'Saint Frank Coffee' },
        { id: 12, user_id: 'user512', text: 'Andytown Coffee' },
        { id: 13, user_id: 'user513', text: 'Flywheel Coffee' },
        { id: 14, user_id: 'user514', text: 'Wrecking Ball Coffee' },
        { id: 15, user_id: 'user515', text: 'Thanks for all the suggestions!' }
      ],
      shares: [
        { id: 1, user_id: 'user601', shared_at: new Date() }
      ]
    },
    {
      id: 3,
      owner: {
        id: 'user789',
        name: 'Sarah M.',
        avatar: require('../assets/images/Avatar(1).png')
      },
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      description: "Anyone interested in starting a book club? Let's discuss our favorite reads!",
      category: 'hobbies',
      image: null,
      reactions: [
        { id: 1, user_id: 'user701', type: 'heart' },
        { id: 2, user_id: 'user702', type: 'heart' },
        { id: 3, user_id: 'user703', type: 'heart' },
        { id: 4, user_id: 'user704', type: 'heart' },
        { id: 5, user_id: 'user705', type: 'heart' },
        { id: 6, user_id: 'user706', type: 'heart' },
        { id: 7, user_id: 'user707', type: 'heart' },
        { id: 8, user_id: 'user708', type: 'heart' },
        { id: 9, user_id: 'user709', type: 'heart' },
        { id: 10, user_id: 'user710', type: 'heart' },
        { id: 11, user_id: 'user711', type: 'heart' },
        { id: 12, user_id: 'user712', type: 'heart' },
        { id: 13, user_id: 'user713', type: 'heart' },
        { id: 14, user_id: 'user714', type: 'heart' },
        { id: 15, user_id: 'user715', type: 'heart' },
        { id: 16, user_id: 'user716', type: 'heart' },
        { id: 17, user_id: 'user717', type: 'heart' },
        { id: 18, user_id: 'user718', type: 'heart' },
        { id: 19, user_id: 'user719', type: 'heart' },
        { id: 20, user_id: 'user720', type: 'heart' },
        { id: 21, user_id: 'user721', type: 'heart' },
        { id: 22, user_id: 'user722', type: 'heart' },
        { id: 23, user_id: 'user723', type: 'heart' },
        { id: 24, user_id: 'user724', type: 'heart' }
      ],
      comments: [
        { id: 1, user_id: 'user801', text: "I'm interested!" },
        { id: 2, user_id: 'user802', text: 'Count me in!' },
        { id: 3, user_id: 'user803', text: 'What genres are you thinking?' },
        { id: 4, user_id: 'user804', text: 'Fiction or non-fiction?' },
        { id: 5, user_id: 'user805', text: 'I love mystery novels' },
        { id: 6, user_id: 'user806', text: 'Sci-fi fan here!' },
        { id: 7, user_id: 'user807', text: 'Historical fiction is my favorite' },
        { id: 8, user_id: 'user808', text: 'Can we do classics?' },
        { id: 9, user_id: 'user809', text: 'Modern literature would be cool' },
        { id: 10, user_id: 'user810', text: 'How about monthly meetings?' },
        { id: 11, user_id: 'user811', text: 'Weekly would be better' },
        { id: 12, user_id: 'user812', text: 'Bi-weekly works for me' },
        { id: 13, user_id: 'user813', text: 'Where would we meet?' },
        { id: 14, user_id: 'user814', text: 'Library has meeting rooms' },
        { id: 15, user_id: 'user815', text: 'Coffee shop meetings?' },
        { id: 16, user_id: 'user816', text: 'Virtual meetings too?' },
        { id: 17, user_id: 'user817', text: 'I can help organize' },
        { id: 18, user_id: 'user818', text: 'Should we create a group chat?' },
        { id: 19, user_id: 'user819', text: 'Discord server?' },
        { id: 20, user_id: 'user820', text: 'WhatsApp group?' },
        { id: 21, user_id: 'user821', text: 'Email list would work' },
        { id: 22, user_id: 'user822', text: 'When do we start?' },
        { id: 23, user_id: 'user823', text: 'Next week?' },
        { id: 24, user_id: 'user824', text: 'Excited to join!' },
        { id: 25, user_id: 'user825', text: 'Book recommendations?' },
        { id: 26, user_id: 'user826', text: 'The Midnight Library' },
        { id: 27, user_id: 'user827', text: 'Project Hail Mary' },
        { id: 28, user_id: 'user828', text: 'Klara and the Sun' },
        { id: 29, user_id: 'user829', text: 'The Vanishing Half' },
        { id: 30, user_id: 'user830', text: 'Anxious People' },
        { id: 31, user_id: 'user831', text: 'The Seven Husbands of Evelyn Hugo' },
        { id: 32, user_id: 'user832', text: 'Circe' },
        { id: 33, user_id: 'user833', text: 'Where the Crawdads Sing' },
        { id: 34, user_id: 'user834', text: 'The Silent Patient' },
        { id: 35, user_id: 'user835', text: 'Atomic Habits' },
        { id: 36, user_id: 'user836', text: 'Educated' },
        { id: 37, user_id: 'user837', text: 'Becoming' },
        { id: 38, user_id: 'user838', text: 'Sapiens' },
        { id: 39, user_id: 'user839', text: 'The Body Keeps the Score' },
        { id: 40, user_id: 'user840', text: 'Thinking, Fast and Slow' },
        { id: 41, user_id: 'user841', text: 'Great suggestions!' },
        { id: 42, user_id: 'user842', text: "Let's vote on the first book" }
      ],
      shares: [
        { id: 1, user_id: 'user901', shared_at: new Date() },
        { id: 2, user_id: 'user902', shared_at: new Date() },
        { id: 3, user_id: 'user903', shared_at: new Date() },
        { id: 4, user_id: 'user904', shared_at: new Date() },
        { id: 5, user_id: 'user905', shared_at: new Date() }
      ]
    }
  ]);
  
  // Get all categories flattened
  const allCategories = Object.values(CATEGORY_GROUPS).flatMap(group => group.categories);
  
  // Get category info by ID
  const getCategoryById = (categoryId) => {
    return allCategories.find(cat => cat.id === categoryId);
  };
  
  // Handle dropdown action
  const handleDropdownAction = (action, discussionId) => {
    const discussion = discussions.find(d => d.id === discussionId);
    
    if (action === 'delete' && discussion.owner.id === currentUserId) {
      setDiscussions(prev => prev.filter(d => d.id !== discussionId));
    } else if (action === 'edit' && discussion.owner.id === currentUserId) {
      // Handle edit
      console.log('Edit discussion:', discussionId);
    } else if (action === 'share') {
      // Handle share
      console.log('Share discussion:', discussionId);
    }
    
    // Close dropdown
    setDropdownMenus(prev => ({ ...prev, [discussionId]: false }));
  };
  
  // Handle category selection (max 2 categories)
  const handleCategorySelect = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        // Remove if already selected
        return prev.filter(id => id !== categoryId);
      }
      // Add new category, but limit to 2 max
      if (prev.length >= 2) {
        // Replace the oldest category with the new one
        return [prev[1], categoryId];
      }
      return [...prev, categoryId];
    });
  };
  
  // Remove category filter
  const removeCategoryFilter = (categoryId) => {
    setSelectedCategories(prev => prev.filter(id => id !== categoryId));
  };
  
  // Handle reaction toggle
  const handleReactionToggle = (discussionId) => {
    setDiscussions(prev => prev.map(discussion => {
      if (discussion.id === discussionId) {
        const userReaction = discussion.reactions?.find(r => r.user_id === currentUserId);
        
        if (userReaction) {
          // Remove user's reaction
          return {
            ...discussion,
            reactions: discussion.reactions.filter(r => r.user_id !== currentUserId)
          };
        } else {
          // Add user's reaction
          return {
            ...discussion,
            reactions: [...(discussion.reactions || []), {
              id: Date.now(),
              user_id: currentUserId,
              type: 'heart'
            }]
          };
        }
      }
      return discussion;
    }));
  };

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
                      source={shoutout.owner.avatar}
                      style={styles.shoutoutAvatar}
                    />
                    <View style={styles.shoutoutUserInfo}>
                      <Text style={styles.shoutoutUserName}>
                        {shoutout.owner.id === currentUserId ? 'You' : shoutout.owner.name}
                      </Text>
                      <Text style={styles.shoutoutTime}>{getTimeAgo(shoutout.created_at)}</Text>
                    </View>
                    {/* Participants avatars */}
                    {shoutout.participants && shoutout.participants.length > 0 && (
                      <View style={styles.attendeesContainer}>
                        {shoutout.participants.slice(0, 3).map((participant, idx) => (
                          <Image 
                            key={idx}
                            source={participant.avatar}
                            style={[styles.attendeeAvatar, { marginLeft: idx > 0 ? -8 : 0 }]}
                          />
                        ))}
                      </View>
                    )}
                  </View>
                  
                  {/* Shoutout title */}
                  <Text style={styles.shoutoutContent}>{shoutout.title}</Text>
                  
                  {/* Time and location info */}
                  <View style={styles.shoutoutInfoBox}>
                    <View style={styles.shoutoutInfoRow}>
                      <View style={styles.shoutoutInfoItem}>
                        <Ionicons name="time-outline" size={10} color="rgba(53,48,61,0.8)" />
                        <Text style={styles.shoutoutInfoText}>{shoutout.time}</Text>
                      </View>
                      <View style={styles.shoutoutInfoDivider} />
                      <TouchableOpacity 
                        style={styles.shoutoutInfoItem}
                        onPress={() => {
                          if (shoutout.locationGps) {
                            Linking.openURL(shoutout.locationGps);
                          }
                        }}
                      >
                        <Ionicons name="location-outline" size={10} color="rgba(53,48,61,0.8)" />
                        <Text style={styles.shoutoutInfoText}>{shoutout.location}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  {/* Action buttons - conditional based on ownership */}
                  <View style={styles.shoutoutActions}>
                    {shoutout.owner.id === currentUserId ? (
                      <>
                        <TouchableOpacity style={styles.shoutoutActionButton}>
                          <Ionicons name="trash-outline" size={10} color="rgba(53,48,61,0.8)" />
                          <Text style={styles.shoutoutActionText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shoutoutEditButton}>
                          <Ionicons name="pencil-outline" size={10} color="rgba(53,48,61,0.8)" />
                          <Text style={styles.shoutoutActionText}>Edit</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <TouchableOpacity 
                          style={[
                            styles.shoutoutComingButton,
                            shoutout.attending && styles.shoutoutAttendingButton
                          ]}
                          onPress={() => handleAttendToggle(shoutout.id, shoutout.owner.name)}
                        >
                          {!shoutout.attending && (
                            <Text style={styles.shoutoutActionText}>Coming?</Text>
                          )}
                          {shoutout.attending && (
                            <>
                              <Ionicons 
                                name="checkmark-circle-outline" 
                                size={8} 
                                color="rgba(53,48,61,0.8)" 
                              />
                              <Text style={styles.shoutoutActionText}>Attending</Text>
                            </>
                          )}
                        </TouchableOpacity>
                        {!shoutout.attending && (
                          <TouchableOpacity style={styles.shoutoutSendButton}>
                            <Ionicons name="send-outline" size={14} color="#35303D" />
                          </TouchableOpacity>
                        )}
                      </>
                    )}
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
        
        {/* Discussions Section */}
        <View style={styles.discussionSection}>
          {/* Section Header */}
          <View style={styles.discussionSectionHeader}>
            <Text style={styles.discussionSectionTitle}>Community</Text>
            <TouchableOpacity 
              style={styles.categoriesButton}
              onPress={() => setShowCategoryModal(true)}
            >
              <Feather name="filter" size={14} color="#35303D" />
              <Text style={styles.categoriesButtonText}>Categories</Text>
            </TouchableOpacity>
          </View>
          
          {/* Category Filter Pills */}
          {selectedCategories.length > 0 && (
            <View style={styles.categoryPillsContainer}>
              {selectedCategories.slice(0, 2).map(categoryId => {
                const category = getCategoryById(categoryId);
                if (!category) return null;
                
                return (
                  <View
                    key={categoryId}
                    style={[
                      styles.categoryPill,
                      { backgroundColor: 'rgba(255,255,255,0.8)' }
                    ]}
                  >
                    <Text style={styles.categoryPillEmoji}>{category.emoji}</Text>
                    <Text style={styles.categoryPillText}>{category.label}</Text>
                    <TouchableOpacity
                      style={styles.categoryPillCloseButton}
                      onPress={() => removeCategoryFilter(categoryId)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <View style={styles.categoryPillCloseCircle}>
                        <Ionicons name="close" size={10} color="#FFFFFF" />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
          
          {/* Discussion Cards */}
          {discussions
            .filter(discussion => 
              selectedCategories.length === 0 || 
              selectedCategories.includes(discussion.category)
            )
            .map((discussion) => {
              const category = getCategoryById(discussion.category);
              const isOwner = discussion.owner.id === currentUserId;
              
              return (
                <DiscussionCard
                  key={discussion.id}
                  discussion={discussion}
                  category={category}
                  isOwner={isOwner}
                  currentUserId={currentUserId}
                  onDropdownAction={handleDropdownAction}
                  onReactionToggle={handleReactionToggle}
                />
              );
            })}
        </View>
        
        </View>
      </Animated.ScrollView>
      
      {/* Post Creation Modal */}
      <PostCreationModal
        visible={showPostModal}
        onClose={() => setShowPostModal(false)}
        userAvatar={require('../assets/images/Avatar.png')}
      />
      
      {/* Attending Confirmation Modal */}
      <AttendingConfirmationModal
        visible={showAttendingModal}
        onClose={() => setShowAttendingModal(false)}
        ownerName={selectedShoutoutOwner}
      />
      
      {/* Category Selection Modal */}
      <CategorySelectionModal
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        selectedCategories={selectedCategories}
        onSelectCategory={handleCategorySelect}
        maxSelections={2}
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
  shoutoutComingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CACDFF',
    paddingHorizontal: 17,
    paddingVertical: 8,
    borderRadius: 30,
    gap: 8,
    justifyContent: 'center',
    minWidth: 123,
  },
  shoutoutAttendingButton: {
    backgroundColor: '#E9EEA8',
  },
  shoutoutSendButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  discussionSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  discussionSectionTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#35303D',
  },
  categoriesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(53,48,61,0.8)',
    gap: 9,
  },
  categoriesButtonText: {
    fontSize: 14,
    color: '#35303D',
  },
  categoryPillsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
    gap: 10,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 4,
    paddingVertical: 7,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: 'rgba(53,48,61,0.8)',
    minHeight: 30,
    maxHeight: 30,
  },
  categoryPillEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  categoryPillText: {
    fontSize: 12,
    color: '#35303D',
    marginRight: 6,
  },
  categoryPillCloseButton: {
    padding: 2,
  },
  categoryPillCloseCircle: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: 'rgba(53,48,61,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomescreenHomeScreen;