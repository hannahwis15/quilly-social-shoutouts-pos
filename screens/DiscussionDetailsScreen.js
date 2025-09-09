import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../config/styles';

const DiscussionDetailsScreen = ({ route, navigation }) => {
  const { discussion } = route.params || {};
  const [commentText, setCommentText] = useState('');
  const [showReplies, setShowReplies] = useState({});
  const scrollViewRef = useRef(null);
  
  const currentUserId = 'user123'; // Replace with actual current user ID
  
  // Check if current user has reacted
  const hasUserReacted = discussion?.reactions?.some(reaction => reaction.user_id === currentUserId);
  
  // Format date
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear().toString().substr(-2)}`;
  };
  
  // Format time
  const formatTime = (date) => {
    const d = new Date(date);
    let hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };
  
  // Get category info
  const getCategoryById = (categoryId) => {
    // This would come from your global categories config
    const categories = {
      'dating': { emoji: '🌹', label: 'Dating', color: '#FFD6E0' },
      'housing': { emoji: '🏠', label: 'Housing', color: '#E8F4FD' },
      'food': { emoji: '🍔', label: 'Food', color: '#FFF4E6' },
      'hobbies': { emoji: '🎨', label: 'Hobbies', color: '#F0E6FF' },
    };
    return categories[categoryId];
  };
  
  const category = getCategoryById(discussion?.category);
  
  // Handle reaction toggle
  const handleReactionToggle = () => {
    // This would update the discussion reactions
    console.log('Toggle reaction');
  };
  
  // Handle comment submission
  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      // Add comment logic here
      console.log('Submit comment:', commentText);
      setCommentText('');
    }
  };
  
  // Use discussion.comments if available, otherwise use sample data
  const comments = discussion?.comments || [
    {
      id: 'comment1',
      owner: { 
        id: 'user456', 
        name: 'Cass P.', 
        avatar: require('../assets/images/Avatar.png') 
      },
      description: 'I heard something library allows drinks and no one is ever there!',
      created_at: new Date(Date.now() - 3 * 60 * 60 * 1000),
      reactions: [
        { id: 'r1', user_id: 'user789', type: 'heart' },
        { id: 'r2', user_id: 'user101', type: 'heart' },
        { id: 'r3', user_id: 'user102', type: 'heart' },
        { id: 'r4', user_id: 'user103', type: 'heart' },
        { id: 'r5', user_id: 'user104', type: 'heart' },
        { id: 'r6', user_id: 'user105', type: 'heart' },
        { id: 'r7', user_id: 'user106', type: 'heart' },
        { id: 'r8', user_id: 'user107', type: 'heart' },
        { id: 'r9', user_id: 'user108', type: 'heart' },
        { id: 'r10', user_id: 'user109', type: 'heart' },
        { id: 'r11', user_id: 'user110', type: 'heart' },
        { id: 'r12', user_id: 'user111', type: 'heart' },
        { id: 'r13', user_id: 'user112', type: 'heart' },
        { id: 'r14', user_id: 'user113', type: 'heart' },
      ],
      shares: [],
      comments: [
        {
          id: 'reply1',
          owner: { 
            id: 'user789', 
            name: 'Lily A.', 
            avatar: require('../assets/images/Avatar.png') 
          },
          description: 'Which library is this?',
          created_at: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
          reactions: [],
          comments: [],
          shares: [],
        },
        {
          id: 'reply2',
          owner: { 
            id: 'user456', 
            name: 'Cass P.', 
            avatar: require('../assets/images/Avatar.png') 
          },
          description: 'The one on 5th street!',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
          reactions: [
            { id: 'rr1', user_id: 'user789', type: 'heart' },
          ],
          comments: [],
          shares: [],
        },
      ],
    },
    {
      id: 'comment2',
      owner: { 
        id: 'user789', 
        name: 'Lily A.', 
        avatar: require('../assets/images/Avatar.png') 
      },
      description: 'Oooo Sounds good, I\'ll check it out! :)',
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
      reactions: [
        { id: 'r15', user_id: 'user456', type: 'heart' },
        { id: 'r16', user_id: 'user101', type: 'heart' },
      ],
      shares: [],
      comments: [
        {
          id: 'reply3',
          owner: { 
            id: 'user101', 
            name: 'Kim H.', 
            avatar: require('../assets/images/Avatar(1).png') 
          },
          description: 'Let me know how it goes!',
          created_at: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
          reactions: [],
          comments: [],
          shares: [],
        },
      ],
    },
    {
      id: 'comment3',
      owner: { 
        id: 'user101', 
        name: 'Kim H.', 
        avatar: require('../assets/images/Avatar(1).png') 
      },
      description: 'There\'s this one cafe near campus that\'s pretty new and quiet... I forget the name..',
      created_at: new Date(Date.now() - 1 * 60 * 60 * 1000),
      reactions: [
        { id: 'r17', user_id: 'user456', type: 'heart' },
        { id: 'r18', user_id: 'user789', type: 'heart' },
      ],
      shares: [
        { id: 's1', user_id: 'user456', shared_at: new Date() },
        { id: 's2', user_id: 'user789', shared_at: new Date() },
      ],
      comments: [
        {
          id: 'reply4',
          owner: { 
            id: 'user456', 
            name: 'Cass P.', 
            avatar: require('../assets/images/Avatar.png') 
          },
          description: 'Is it the Blue Bean cafe?',
          created_at: new Date(Date.now() - 45 * 60 * 1000),
          reactions: [],
          comments: [],
          shares: [],
        },
        {
          id: 'reply5',
          owner: { 
            id: 'user101', 
            name: 'Kim H.', 
            avatar: require('../assets/images/Avatar(1).png') 
          },
          description: 'Yes! That\'s the one!',
          created_at: new Date(Date.now() - 30 * 60 * 1000),
          reactions: [
            { id: 'rr2', user_id: 'user456', type: 'heart' },
          ],
          comments: [],
          shares: [],
        },
      ],
    },
  ];
  
  // Track which comments have expanded replies
  const [expandedComments, setExpandedComments] = useState({});
  // Track if all comments are shown
  const [showAllComments, setShowAllComments] = useState(false);
  
  // Handle comment reaction toggle
  const handleCommentReaction = (commentId) => {
    // This would update the comment reactions
    console.log('Toggle reaction for comment:', commentId);
  };
  
  // Toggle replies expansion
  const toggleReplies = (commentId) => {
    setExpandedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };
  
  // Check if there are any replies in the comments
  const hasAnyReplies = comments.some(comment => 
    comment.comments && comment.comments.length > 0
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Discussions</Text>
          <View style={styles.headerRight} />
        </View>
        
        <View style={styles.divider} />
        
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Discussion */}
          <View style={styles.mainDiscussion}>
            <View style={styles.discussionHeader}>
              <Image 
                source={discussion?.owner?.avatar || require('../assets/images/Avatar.png')} 
                style={styles.avatar} 
              />
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{discussion?.owner?.name}</Text>
                <View style={styles.timeInfo}>
                  <Text style={styles.timeText}>{formatTime(discussion?.created_at)}</Text>
                  <Text style={styles.dateText}>{formatDate(discussion?.created_at)}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.menuButton}>
                <Entypo name="dots-three-horizontal" size={16} color="#666" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.discussionText}>{discussion?.description}</Text>
            
            {discussion?.image && (
              <Image source={discussion.image} style={styles.discussionImage} />
            )}
            
            {/* Interaction Bar */}
            <View style={styles.interactionBar}>
              <View style={styles.interactionStats}>
                <View style={styles.stat}>
                  <Ionicons name="chatbubble-outline" size={14} color={Colors.primary} />
                  <Text style={styles.statText}>{discussion?.comments?.length || 0}</Text>
                </View>
                <TouchableOpacity style={styles.stat} onPress={handleReactionToggle}>
                  <Ionicons 
                    name={hasUserReacted ? "heart" : "heart-outline"} 
                    size={14} 
                    color={hasUserReacted ? Colors.red : Colors.primary} 
                  />
                  <Text style={[styles.statText, hasUserReacted && styles.statTextActive]}>
                    {discussion?.reactions?.length || 0}
                  </Text>
                </TouchableOpacity>
                <View style={styles.stat}>
                  <Ionicons name="share-outline" size={14} color={Colors.primary} />
                  <Text style={styles.statText}>{discussion?.shares?.length || 0}</Text>
                </View>
              </View>
              
              {category && (
                <View style={[styles.categoryTag, { backgroundColor: 'rgba(255,255,255,0.8)' }]}>
                  <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                  <Text style={styles.categoryText}>{category.label}</Text>
                </View>
              )}
            </View>
          </View>
          
          <View style={styles.commentsDivider} />
          
          {/* Comments Section */}
          <View style={styles.commentsSection}>
            {/* Show only first 2 comments initially, or all if expanded */}
            {(showAllComments ? comments : comments.slice(0, 2)).map((comment) => {
              const isAuthor = comment.owner.id === discussion?.owner?.id;
              const hasUserReacted = comment.reactions?.some(r => r.user_id === currentUserId);
              const hasReplies = comment.comments && comment.comments.length > 0;
              const isExpanded = expandedComments[comment.id];
              
              return (
                <View key={comment.id}>
                  <View style={styles.commentCard}>
                    <View style={styles.commentHeader}>
                      <Image 
                        source={comment.owner?.avatar || require('../assets/images/Avatar.png')} 
                        style={styles.commentAvatar} 
                      />
                      <View style={styles.commentInfo}>
                        <View style={styles.commentAuthorRow}>
                          <Text style={styles.commentAuthor}>{comment.owner.name}</Text>
                          {isAuthor && (
                            <View style={styles.authorBadge}>
                              <Text style={styles.authorBadgeText}>Author</Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.commentText}>{comment.description}</Text>
                      </View>
                      <TouchableOpacity style={styles.commentMenuButton}>
                        <Entypo name="dots-three-horizontal" size={14} color="#666" />
                      </TouchableOpacity>
                    </View>
                    
                    {/* Comment Actions */}
                    <View style={styles.commentActions}>
                      <TouchableOpacity 
                        style={styles.commentAction}
                        onPress={() => hasReplies && toggleReplies(comment.id)}
                      >
                        <Ionicons name="chatbubble-outline" size={12} color={Colors.primary} />
                        <Text style={styles.commentActionText}>{comment.comments?.length || 0}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.commentAction}
                        onPress={() => handleCommentReaction(comment.id)}
                      >
                        <Ionicons 
                          name={hasUserReacted ? "heart" : "heart-outline"} 
                          size={12} 
                          color={hasUserReacted ? Colors.red : Colors.primary} 
                        />
                        <Text style={[styles.commentActionText, hasUserReacted && styles.commentActionTextActive]}>
                          {comment.reactions?.length || 0}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  {/* Nested Replies - only show when all comments are shown AND this comment is expanded */}
                  {hasReplies && showAllComments && isExpanded && (
                    <View style={styles.repliesContainer}>
                      {comment.comments.map((reply) => {
                        const isReplyAuthor = reply.owner.id === discussion?.owner?.id;
                        const hasUserReactedToReply = reply.reactions?.some(r => r.user_id === currentUserId);
                        
                        return (
                          <View key={reply.id} style={styles.replyCard}>
                            <View style={styles.commentHeader}>
                              <Image 
                                source={reply.owner?.avatar || require('../assets/images/Avatar.png')} 
                                style={styles.replyAvatar} 
                              />
                              <View style={styles.commentInfo}>
                                <View style={styles.commentAuthorRow}>
                                  <Text style={styles.replyAuthor}>{reply.owner.name}</Text>
                                  {isReplyAuthor && (
                                    <View style={styles.authorBadge}>
                                      <Text style={styles.authorBadgeText}>Author</Text>
                                    </View>
                                  )}
                                </View>
                                <Text style={styles.replyText}>{reply.description}</Text>
                              </View>
                            </View>
                            
                            {/* Reply Actions */}
                            <View style={styles.replyActions}>
                              <TouchableOpacity 
                                style={styles.commentAction}
                                onPress={() => handleCommentReaction(reply.id)}
                              >
                                <Ionicons 
                                  name={hasUserReactedToReply ? "heart" : "heart-outline"} 
                                  size={10} 
                                  color={hasUserReactedToReply ? Colors.red : Colors.primary} 
                                />
                                <Text style={[styles.replyActionText, hasUserReactedToReply && styles.commentActionTextActive]}>
                                  {reply.reactions?.length || 0}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  )}
                  
                  {/* Show/Hide Replies Button for individual comment */}
                  {hasReplies && showAllComments && (
                    <TouchableOpacity 
                      style={styles.toggleRepliesButton}
                      onPress={() => toggleReplies(comment.id)}
                    >
                      <Text style={styles.toggleRepliesText}>
                        {isExpanded ? 'Hide replies' : `View ${comment.comments.length} ${comment.comments.length === 1 ? 'reply' : 'replies'}`}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
            
            {/* Show replies button at bottom to expand all comments */}
            {!showAllComments && (comments.length > 2 || hasAnyReplies) && (
              <TouchableOpacity 
                style={styles.showRepliesButton}
                onPress={() => setShowAllComments(true)}
              >
                <Text style={styles.showRepliesText}>Show replies</Text>
              </TouchableOpacity>
            )}
            
            {/* Hide replies button when expanded */}
            {showAllComments && (
              <TouchableOpacity 
                style={styles.showRepliesButton}
                onPress={() => {
                  setShowAllComments(false);
                  setExpandedComments({});
                }}
              >
                <Text style={styles.showRepliesText}>Hide replies</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        
        {/* Comment Input */}
        <View style={styles.commentInputContainer}>
          <Image 
            source={require('../assets/images/Avatar.png')} 
            style={styles.inputAvatar} 
          />
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.commentInput}
              placeholder="Reply to this discussion..."
              placeholderTextColor={Colors.primaryMedium}
              value={commentText}
              onChangeText={setCommentText}
              multiline
            />
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleCommentSubmit}
              disabled={!commentText.trim()}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={commentText.trim() ? Colors.purple : Colors.primaryLight} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    ...Typography.h2,
    fontSize: 16,
  },
  headerRight: {
    width: 32,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.grayBorder,
  },
  scrollView: {
    flex: 1,
  },
  mainDiscussion: {
    padding: Spacing.xl,
  },
  discussionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    marginRight: Spacing.sm,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    ...Typography.h3,
    marginBottom: 2,
  },
  timeInfo: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  timeText: {
    ...Typography.caption,
  },
  dateText: {
    ...Typography.caption,
  },
  menuButton: {
    padding: Spacing.xs,
  },
  discussionText: {
    ...Typography.body,
    marginBottom: Spacing.md,
  },
  discussionImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: Spacing.md,
    resizeMode: 'cover',
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
  },
  interactionStats: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statText: {
    ...Typography.bodySmall,
  },
  statTextActive: {
    color: Colors.red,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 21,
    borderWidth: 0.35,
    borderColor: Colors.primaryLight,
  },
  categoryEmoji: {
    fontSize: 10,
    marginRight: 3,
  },
  categoryText: {
    fontSize: 10,
    color: Colors.primary,
  },
  commentsDivider: {
    height: 1,
    backgroundColor: Colors.grayBorder,
    marginHorizontal: Spacing.xl,
    marginVertical: Spacing.md,
  },
  commentsSection: {
    paddingHorizontal: Spacing.xl,
  },
  commentCard: {
    marginBottom: Spacing.lg,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    marginRight: Spacing.sm,
  },
  commentInfo: {
    flex: 1,
  },
  commentAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: 4,
  },
  commentAuthor: {
    ...Typography.h3,
    fontSize: 13,
  },
  authorBadge: {
    backgroundColor: Colors.purpleLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  authorBadgeText: {
    fontSize: 10,
    color: Colors.primary,
  },
  commentText: {
    ...Typography.body,
    fontSize: 13,
  },
  commentMenuButton: {
    padding: Spacing.xs,
  },
  commentActions: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginLeft: 40,
    marginTop: Spacing.xs,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentActionText: {
    ...Typography.captionSmall,
    color: Colors.primary,
  },
  commentActionTextActive: {
    color: Colors.red,
  },
  repliesContainer: {
    marginLeft: 40,
    marginTop: Spacing.sm,
    borderLeftWidth: 1,
    borderLeftColor: Colors.grayBorder,
    paddingLeft: Spacing.sm,
  },
  replyCard: {
    marginBottom: Spacing.md,
  },
  replyAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    marginRight: Spacing.sm,
  },
  replyAuthor: {
    ...Typography.h3,
    fontSize: 12,
  },
  replyText: {
    ...Typography.body,
    fontSize: 12,
  },
  replyActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginLeft: 32,
    marginTop: Spacing.xs,
  },
  replyActionText: {
    ...Typography.captionSmall,
    fontSize: 9,
    color: Colors.primary,
  },
  showRepliesButton: {
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
    marginLeft: 40,
    alignItems: 'flex-start',
  },
  showRepliesText: {
    fontSize: 12,
    color: '#A68CD1',
    textDecorationLine: 'underline',
  },
  toggleRepliesButton: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.md,
    marginLeft: 40,
  },
  toggleRepliesText: {
    ...Typography.caption,
    color: Colors.primaryMedium,
    textDecorationLine: 'underline',
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.grayBorder,
    backgroundColor: Colors.white,
  },
  inputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    marginRight: Spacing.sm,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.grayVeryLight,
    borderRadius: 20,
    paddingLeft: Spacing.md,
    paddingRight: Spacing.xs,
    paddingVertical: Spacing.sm,
  },
  commentInput: {
    flex: 1,
    ...Typography.body,
    fontSize: 14,
    maxHeight: 100,
    minHeight: 20,
  },
  sendButton: {
    padding: Spacing.xs,
  },
});

export default DiscussionDetailsScreen;