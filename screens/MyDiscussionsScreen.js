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

const MyDiscussionsScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDiscussions();
  }, []);

  const loadDiscussions = async () => {
    try {
      setLoading(true);
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockDiscussions = [
        {
          id: 'disc1',
          title: 'Best study spots on campus?',
          description: 'Looking for quiet places to study. The library is always packed!',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
          comments_count: 15,
          reactions_count: 23,
          last_activity: new Date(Date.now() - 30 * 60 * 1000),
          category: { emoji: '📚', label: 'Study' },
        },
        {
          id: 'disc2',
          title: 'Thoughts on the new dining hall menu?',
          description: 'They added some new vegan options but removed the pasta bar...',
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000),
          comments_count: 32,
          reactions_count: 45,
          last_activity: new Date(Date.now() - 2 * 60 * 60 * 1000),
          category: { emoji: '🍕', label: 'Food' },
        },
        {
          id: 'disc3',
          title: 'Anyone interested in starting a book club?',
          description: 'Would love to read and discuss books with fellow house members!',
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          comments_count: 8,
          reactions_count: 12,
          last_activity: new Date(Date.now() - 12 * 60 * 60 * 1000),
          category: { emoji: '📖', label: 'Hobbies' },
        },
      ];
      
      setDiscussions(mockDiscussions);
    } catch (error) {
      console.error('Error loading discussions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadDiscussions();
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

  const renderDiscussion = ({ item }) => (
    <TouchableOpacity 
      style={styles.discussionCard}
      onPress={() => navigation.navigate('DiscussionDetails', { discussion: item })}
    >
      <View style={styles.discussionHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryEmoji}>{item.category.emoji}</Text>
          <Text style={styles.categoryLabel}>{item.category.label}</Text>
        </View>
        <Text style={styles.timeAgo}>{getTimeAgo(item.created_at)}</Text>
      </View>
      
      <Text style={styles.discussionTitle}>{item.title}</Text>
      <Text style={styles.discussionDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.discussionFooter}>
        <View style={styles.discussionStats}>
          <View style={styles.stat}>
            <Ionicons name="chatbubble-outline" size={14} color={Colors.primary} />
            <Text style={styles.statText}>{item.comments_count}</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="heart-outline" size={14} color={Colors.primary} />
            <Text style={styles.statText}>{item.reactions_count}</Text>
          </View>
        </View>
        <Text style={styles.lastActivity}>
          Active {getTimeAgo(item.last_activity)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.purple} />
        <Text style={styles.loadingText}>Loading your discussions...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Discussions</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={discussions}
        renderItem={renderDiscussion}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={48} color={Colors.primaryLight} />
            <Text style={styles.emptyText}>No discussions yet</Text>
            <Text style={styles.emptySubtext}>Start a discussion to see it here</Text>
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
  discussionCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  discussionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grayVeryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  categoryEmoji: {
    fontSize: 12,
  },
  categoryLabel: {
    fontSize: 11,
    color: Colors.primary,
  },
  timeAgo: {
    ...Typography.caption,
    color: Colors.primaryMedium,
  },
  discussionTitle: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  discussionDescription: {
    ...Typography.body,
    color: Colors.primaryMedium,
    marginBottom: Spacing.md,
  },
  discussionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.grayBorder,
  },
  discussionStats: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    ...Typography.bodySmall,
    color: Colors.primary,
  },
  lastActivity: {
    ...Typography.caption,
    color: Colors.primaryLight,
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

export default MyDiscussionsScreen;