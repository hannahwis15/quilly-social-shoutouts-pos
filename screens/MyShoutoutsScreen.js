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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../config/styles';

const MyShoutoutsScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [shoutouts, setShoutouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('received'); // 'received' or 'given'

  useEffect(() => {
    loadShoutouts();
  }, [activeTab]);

  const loadShoutouts = async () => {
    try {
      setLoading(true);
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockShoutoutsReceived = [
        {
          id: 'shout1',
          from: {
            id: 'user456',
            name: 'Alex Chen',
            avatar: null, // Will use default avatar
          },
          message: 'Big shoutout to Ellie for organizing the amazing study session! You rock! 🎉',
          created_at: new Date(Date.now() - 3 * 60 * 60 * 1000),
          category: 'leadership',
          points: 15,
          reactions: 8,
        },
        {
          id: 'shout2',
          from: {
            id: 'user789',
            name: 'Maya Patel',
            avatar: null, // Will use default avatar
          },
          message: 'Thanks for always being so helpful and supportive in our discussions!',
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000),
          category: 'kindness',
          points: 10,
          reactions: 5,
        },
        {
          id: 'shout3',
          from: {
            id: 'user101',
            name: 'Jordan Lee',
            avatar: null, // Will use default avatar
          },
          message: 'Your presentation on climate change was incredible! So well researched!',
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          category: 'excellence',
          points: 20,
          reactions: 12,
        },
      ];
      
      const mockShoutoutsGiven = [
        {
          id: 'shout4',
          to: {
            id: 'user202',
            name: 'Sam Wilson',
            avatar: null, // Will use default avatar
          },
          message: 'Huge thanks to Sam for staying late to help me with the project!',
          created_at: new Date(Date.now() - 5 * 60 * 60 * 1000),
          category: 'helpfulness',
          points: 10,
          reactions: 6,
        },
        {
          id: 'shout5',
          to: {
            id: 'user303',
            name: 'Riley Martinez',
            avatar: null, // Will use default avatar
          },
          message: 'Riley absolutely killed it at the talent show! Amazing performance!',
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          category: 'talent',
          points: 15,
          reactions: 18,
        },
      ];
      
      setShoutouts(activeTab === 'received' ? mockShoutoutsReceived : mockShoutoutsGiven);
    } catch (error) {
      console.error('Error loading shoutouts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadShoutouts();
  };

  const getTimeAgo = (date) => {
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

  const getCategoryColor = (category) => {
    const colors = {
      leadership: '#FF6B6B',
      kindness: '#4ECDC4',
      excellence: '#45B7D1',
      helpfulness: '#96CEB4',
      talent: '#FFEAA7',
    };
    return colors[category] || Colors.purple;
  };

  const renderShoutout = ({ item }) => {
    const isReceived = activeTab === 'received';
    const person = isReceived ? item.from : item.to;
    
    return (
      <View style={styles.shoutoutCard}>
        <View style={styles.shoutoutHeader}>
          <Image 
            source={person.avatar || require('../assets/images/Avatar.png')} 
            style={styles.avatar} 
          />
          <View style={styles.shoutoutInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.personName}>
                {isReceived ? `From ${person.name}` : `To ${person.name}`}
              </Text>
              <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
                <Text style={styles.categoryText}>{item.category}</Text>
              </View>
            </View>
            <Text style={styles.timeAgo}>{getTimeAgo(item.created_at)}</Text>
          </View>
          <View style={styles.pointsBadge}>
            <MaterialCommunityIcons name="star-four-points" size={14} color={Colors.purple} />
            <Text style={styles.pointsText}>+{item.points}</Text>
          </View>
        </View>
        
        <Text style={styles.shoutoutMessage}>{item.message}</Text>
        
        <View style={styles.shoutoutFooter}>
          <TouchableOpacity style={styles.reactionButton}>
            <Ionicons name="heart-outline" size={18} color={Colors.primary} />
            <Text style={styles.reactionCount}>{item.reactions}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={18} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.purple} />
        <Text style={styles.loadingText}>Loading shoutouts...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Shoutouts</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'received' && styles.activeTab]}
          onPress={() => setActiveTab('received')}
        >
          <Text style={[styles.tabText, activeTab === 'received' && styles.activeTabText]}>
            Received ({activeTab === 'received' ? shoutouts.length : 0})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'given' && styles.activeTab]}
          onPress={() => setActiveTab('given')}
        >
          <Text style={[styles.tabText, activeTab === 'given' && styles.activeTabText]}>
            Given ({activeTab === 'given' ? shoutouts.length : 0})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={shoutouts}
        renderItem={renderShoutout}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="megaphone-outline" size={48} color={Colors.primaryLight} />
            <Text style={styles.emptyText}>
              {activeTab === 'received' ? 'No shoutouts received yet' : 'No shoutouts given yet'}
            </Text>
            <Text style={styles.emptySubtext}>
              {activeTab === 'received' 
                ? 'Keep being awesome and they\'ll come!' 
                : 'Give someone a shoutout to brighten their day!'}
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
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
  },
  headerTitle: {
    ...Typography.h2,
    fontSize: 18,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.purple,
  },
  tabText: {
    fontSize: 14,
    color: Colors.primaryLight,
  },
  activeTabText: {
    color: Colors.purple,
    fontWeight: '500',
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
  shoutoutCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  shoutoutHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Spacing.sm,
  },
  shoutoutInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: 4,
  },
  personName: {
    ...Typography.h3,
    fontSize: 14,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 10,
    color: Colors.white,
    fontWeight: '500',
  },
  timeAgo: {
    ...Typography.caption,
    color: Colors.primaryMedium,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.purpleLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  pointsText: {
    fontSize: 12,
    color: Colors.purple,
    fontWeight: '500',
  },
  shoutoutMessage: {
    ...Typography.body,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  shoutoutFooter: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.grayBorder,
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reactionCount: {
    ...Typography.bodySmall,
    color: Colors.primary,
  },
  shareButton: {
    padding: 2,
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
    textAlign: 'center',
  },
});

export default MyShoutoutsScreen;