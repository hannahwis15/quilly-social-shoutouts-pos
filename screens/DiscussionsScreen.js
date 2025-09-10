import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import DiscussionCard from '../components/DiscussionCard';
import CategorySelectionModal from '../components/CategorySelectionModal';
import { CATEGORY_GROUPS } from '../config/categories';

const DiscussionsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('discussions'); // 'discussions' or 'myDiscussions'
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'popular', etc.
  
  const currentUserId = 'user123'; // Replace with actual current user ID
  
  // Sample discussions data - in production, this would come from a global state/context
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      owner: {
        id: 'user456',
        name: 'Lily A.',
        avatar: require('../assets/images/Avatar.png')
      },
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
      description: "Anybody know any quiet places to study and allows drinks?",
      category: 'dating',
      image: null,
      reactions: Array(12).fill({}).map((_, i) => ({ id: i, user_id: `user${i}`, type: 'heart' })),
      comments: Array(30).fill({}).map((_, i) => ({ id: i, user_id: `user${i}`, text: 'Comment' })),
      shares: Array(2).fill({}).map((_, i) => ({ id: i, user_id: `user${i}`, shared_at: new Date() }))
    },
    {
      id: 2,
      owner: {
        id: 'user123',
        name: 'John Doe',
        avatar: require('../assets/images/Avatar(1).png')
      },
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000),
      description: "Looking for recommendations on the best coffee shops around campus!",
      category: 'food',
      image: require('../assets/images/Rectangle200.png'),
      reactions: Array(8).fill({}).map((_, i) => ({ id: i, user_id: `user${i}`, type: 'heart' })),
      comments: Array(15).fill({}).map((_, i) => ({ id: i, user_id: `user${i}`, text: 'Comment' })),
      shares: Array(1).fill({}).map((_, i) => ({ id: i, user_id: `user${i}`, shared_at: new Date() }))
    },
    {
      id: 3,
      owner: {
        id: 'user789',
        name: 'Sarah M.',
        avatar: require('../assets/images/Avatar(1).png')
      },
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000),
      description: "Anyone interested in starting a book club? Let's discuss our favorite reads!",
      category: 'hobbies',
      image: null,
      reactions: Array(24).fill({}).map((_, i) => ({ id: i, user_id: `user${i}`, type: 'heart' })),
      comments: Array(42).fill({}).map((_, i) => ({ id: i, user_id: `user${i}`, text: 'Comment' })),
      shares: Array(5).fill({}).map((_, i) => ({ id: i, user_id: `user${i}`, shared_at: new Date() }))
    },
    {
      id: 4,
      owner: {
        id: 'user123',
        name: 'John Doe',
        avatar: require('../assets/images/Avatar(1).png')
      },
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000),
      description: "My thoughts on the latest campus events and activities.",
      category: 'general',
      image: null,
      reactions: Array(5).fill({}).map((_, i) => ({ id: i, user_id: `user${i}`, type: 'heart' })),
      comments: Array(10).fill({}).map((_, i) => ({ id: i, user_id: `user${i}`, text: 'Comment' })),
      shares: Array(2).fill({}).map((_, i) => ({ id: i, user_id: `user${i}`, shared_at: new Date() }))
    }
  ]);
  
  // Get all categories flattened
  const allCategories = Object.values(CATEGORY_GROUPS).flatMap(group => group.categories);
  
  // Get category info by ID
  const getCategoryById = (categoryId) => {
    return allCategories.find(cat => cat.id === categoryId);
  };
  
  // Filter discussions based on tab and selected categories
  const filteredDiscussions = discussions.filter(discussion => {
    // Filter by tab
    if (activeTab === 'myDiscussions' && discussion.owner.id !== currentUserId) {
      return false;
    }
    
    // Filter by categories
    if (selectedCategories.length > 0 && !selectedCategories.includes(discussion.category)) {
      return false;
    }
    
    return true;
  });
  
  // Handle category selection (max 2 categories)
  const handleCategorySelect = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      }
      if (prev.length >= 2) {
        return [prev[1], categoryId];
      }
      return [...prev, categoryId];
    });
  };
  
  // Remove category filter
  const removeCategoryFilter = (categoryId) => {
    setSelectedCategories(prev => prev.filter(id => id !== categoryId));
  };
  
  // Handle dropdown action
  const handleDropdownAction = (action, discussionId) => {
    const discussion = discussions.find(d => d.id === discussionId);
    
    if (action === 'delete' && discussion.owner.id === currentUserId) {
      // Handle delete
      console.log('Delete discussion:', discussionId);
    } else if (action === 'edit' && discussion.owner.id === currentUserId) {
      // Handle edit
      console.log('Edit discussion:', discussionId);
    } else if (action === 'share') {
      // Handle share
      console.log('Share discussion:', discussionId);
    }
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View />
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={24} color="#35303D" />
          </TouchableOpacity>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'discussions' && styles.activeTab]}
            onPress={() => setActiveTab('discussions')}
          >
            <Text style={[styles.tabText, activeTab === 'discussions' && styles.activeTabText]}>
              Discussions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'myDiscussions' && styles.activeTab]}
            onPress={() => setActiveTab('myDiscussions')}
          >
            <Text style={[styles.tabText, activeTab === 'myDiscussions' && styles.activeTabText]}>
              My Discussions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.sortButton}>
          <Ionicons name="swap-vertical" size={14} color="#35303D" />
          <Text style={styles.sortButtonText}>Sort</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowCategoryModal(true)}
        >
          <Feather name="filter" size={14} color="#35303D" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>
      
      {/* Category Pills */}
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
      
      {/* Discussions List */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredDiscussions.map(discussion => {
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
              navigation={navigation}
            />
          );
        })}
        
        {filteredDiscussions.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyState}>
              {/* Sad face icon */}
              <Text style={styles.emptyStateEmoji}>😔</Text>
              
              <Text style={styles.emptyStateTitle}>Oops! Nothing Yet!</Text>
              <Text style={styles.emptyStateSubtitle}>
                Not sure where to begin? Start{' '}
                with one of these:
              </Text>
              
              {/* Suggestion pills */}
              <View style={styles.suggestionContainer}>
                <TouchableOpacity style={styles.suggestionPill}>
                  <Text style={styles.suggestionText}>Favorite TV show rm...</Text>
                  <Text style={styles.suggestionPlus}>+</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.suggestionPill}>
                  <Text style={styles.suggestionText}>Study abroad tips/tricks...</Text>
                  <Text style={styles.suggestionPlus}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      
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
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  notificationButton: {
    padding: 5,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#35303D',
  },
  tabText: {
    fontSize: 14,
    color: 'rgba(53, 48, 61, 0.5)',
  },
  activeTabText: {
    color: '#35303D',
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(53,48,61,0.3)',
    gap: 5,
  },
  sortButtonText: {
    fontSize: 14,
    color: '#35303D',
  },
  filterButton: {
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
  filterButtonText: {
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 10,
  },
  emptyStateContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    height: 228,
    paddingHorizontal: 30,
  },
  emptyStateEmoji: {
    fontSize: 40,
    marginBottom: 15,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#35303D',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: 'rgba(53, 48, 61, 0.6)',
    textAlign: 'center',
    marginBottom: 15,
    maxWidth: 180,
    lineHeight: 18,
  },
  suggestionContainer: {
    alignItems: 'center',
    width: '100%',
    gap: 6,
  },
  suggestionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9EEA8',
    paddingLeft: 14,
    paddingRight: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  suggestionText: {
    fontSize: 13,
    color: '#35303D',
    marginRight: 10,
  },
  suggestionPlus: {
    fontSize: 20,
    color: '#35303D',
    fontWeight: '400',
    lineHeight: 20,
  },
});

export default DiscussionsScreen;