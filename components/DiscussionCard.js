import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { Colors, Typography, Shadows, Borders, Spacing } from '../config/styles';

const DiscussionCard = ({ 
  discussion, 
  category, 
  isOwner, 
  onDropdownAction,
  currentUserId,
  onReactionToggle,
  navigation 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  
  // Check if current user has reacted
  const hasUserReacted = discussion.reactions?.some(reaction => reaction.user_id === currentUserId);

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

  const handleDropdownAction = (action) => {
    onDropdownAction(action, discussion.id);
    setShowDropdown(false);
  };

  // Toggle comment expansion
  const toggleCommentExpansion = (commentId) => {
    setExpandedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  // Navigate to discussion details with serializable data
  const navigateToDetails = () => {
    if (navigation) {
      // Create a serializable version of the discussion object
      const serializableDiscussion = {
        ...discussion,
        owner: {
          id: discussion.owner?.id,
          name: discussion.owner?.name,
          avatar: null // Will be required in DiscussionDetailsScreen
        },
        comments: discussion.comments?.map(comment => ({
          ...comment,
          owner: comment.owner ? {
            id: comment.owner.id,
            name: comment.owner.name,
            avatar: null
          } : null,
          comments: comment.comments?.map(reply => ({
            ...reply,
            owner: reply.owner ? {
              id: reply.owner.id,
              name: reply.owner.name,
              avatar: null
            } : null
          })) || []
        })) || [],
        discussionId: discussion.id // Pass the ID so we can look up the full object if needed
      };
      navigation.navigate('DiscussionDetails', { discussion: serializableDiscussion });
    }
  };

  return (
    <View style={styles.discussionCard}>
      <View style={styles.discussionHeader}>
        <Image source={discussion.owner.avatar} style={styles.discussionAvatar} />
        <View style={styles.discussionInfo}>
          <Text style={styles.discussionAuthor}>
            {isOwner ? 'You' : discussion.owner.name}
          </Text>
          <Text style={styles.discussionTime}>{getTimeAgo(discussion.created_at)}</Text>
        </View>
        
        {/* 3-dot menu */}
        <TouchableOpacity 
          style={styles.discussionMenuButton}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Entypo name="dots-three-horizontal" size={16} color="#666" />
        </TouchableOpacity>
        
        {/* Dropdown Menu */}
        {showDropdown && (
          <View style={styles.dropdownMenu}>
            {isOwner && (
              <>
                <TouchableOpacity 
                  style={styles.dropdownItem}
                  onPress={() => handleDropdownAction('delete')}
                >
                  <Text style={styles.dropdownItemText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dropdownItem}
                  onPress={() => handleDropdownAction('edit')}
                >
                  <Text style={styles.dropdownItemText}>Edit</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity 
              style={styles.dropdownItem}
              onPress={() => handleDropdownAction('share')}
            >
              <Text style={styles.dropdownItemText}>Share</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <TouchableOpacity 
        onPress={() => navigation && navigation.navigate('DiscussionDetails', { discussion })}
      >
        <Text style={styles.discussionDescription}>{discussion.description}</Text>
      </TouchableOpacity>
      
      {discussion.image && (
        <Image source={discussion.image} style={styles.discussionImage} />
      )}
      
      {/* Interaction counts and category tag */}
      <View style={styles.discussionFooter}>
        <View style={styles.discussionStats}>
          <View style={styles.discussionStat}>
            <Ionicons name="chatbubble-outline" size={12} color="#35303D" />
            <Text style={styles.discussionStatText}>{discussion.comments?.length || 0}</Text>
          </View>
          <TouchableOpacity 
            style={styles.discussionStat}
            onPress={() => onReactionToggle && onReactionToggle(discussion.id)}
          >
            <Ionicons 
              name={hasUserReacted ? "heart" : "heart-outline"} 
              size={12} 
              color={hasUserReacted ? "#FF4444" : "#35303D"} 
            />
            <Text style={[styles.discussionStatText, hasUserReacted && styles.discussionStatTextActive]}>
              {discussion.reactions?.length || 0}
            </Text>
          </TouchableOpacity>
          <View style={styles.discussionStat}>
            <Ionicons name="share-outline" size={12} color="#35303D" />
            <Text style={styles.discussionStatText}>{discussion.shares?.length || 0}</Text>
          </View>
        </View>
        
        {category && (
          <View style={[
            styles.discussionTag,
            { backgroundColor: category.color || 'rgba(255,255,255,0.8)' }
          ]}>
            <Text style={styles.discussionTagEmoji}>{category.emoji}</Text>
            <Text style={styles.discussionTagText}>{category.label}</Text>
          </View>
        )}
      </View>
      
      {/* Comments Preview Section */}
      {discussion.comments && discussion.comments.length > 0 && (() => {
        // Check if any comments have replies
        const hasAnyReplies = discussion.comments.some(comment => 
          comment.comments && comment.comments.length > 0
        );
        
        return (
          <View style={styles.commentsSection}>
            {discussion.comments.slice(0, 3).map((comment, index) => {
              // Skip if comment doesn't have proper structure
              if (!comment.owner || !comment.description) return null;
              
              const hasReplies = comment.comments && comment.comments.length > 0;
              
              return (
                <View key={comment.id}>
                  <View style={styles.commentPreview}>
                    {/* Thread line for first comment with replies */}
                    {index === 0 && hasReplies && <View style={styles.threadLine} />}
                    
                    <Image 
                      source={comment.owner.avatar || require('../assets/images/Avatar.png')} 
                      style={styles.commentAvatar} 
                    />
                    <View style={styles.commentContent}>
                      <View style={styles.commentHeader}>
                        <Text style={styles.commentAuthor}>{comment.owner.name}</Text>
                        {comment.owner.id === discussion.owner.id && (
                          <View style={styles.authorBadge}>
                            <Text style={styles.authorBadgeText}>Author</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.commentText} numberOfLines={2}>
                        {comment.description}
                      </Text>
                      
                      {/* Comment Stats */}
                      <View style={styles.commentStats}>
                        <View style={styles.commentStat}>
                          <Ionicons name="chatbubble-outline" size={9} color={Colors.primary} />
                          <Text style={styles.commentStatText}>{comment.comments?.length || 0}</Text>
                        </View>
                        <View style={styles.commentStat}>
                          <Ionicons name="heart-outline" size={9} color={Colors.primary} />
                          <Text style={styles.commentStatText}>{comment.reactions?.length || 0}</Text>
                        </View>
                        {comment.shares && comment.shares.length > 0 && (
                          <View style={styles.commentStat}>
                            <Ionicons name="share-outline" size={9} color={Colors.primary} />
                            <Text style={styles.commentStatText}>{comment.shares.length}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                    <TouchableOpacity style={styles.commentMenuButton}>
                      <Entypo name="dots-three-horizontal" size={14} color="#666" />
                    </TouchableOpacity>
                  </View>
                  
                  {/* Show first reply if this is the first comment and it has replies */}
                  {index === 0 && hasReplies && comment.comments[0] && (
                    <View style={styles.repliesContainer}>
                      <View style={styles.replyPreview}>
                        <View style={styles.replyConnector} />
                        <Image 
                          source={comment.comments[0].owner?.avatar || require('../assets/images/Avatar.png')} 
                          style={styles.replyAvatar} 
                        />
                        <View style={styles.replyContent}>
                          <View style={styles.commentHeader}>
                            <Text style={styles.replyAuthor}>
                              {comment.comments[0].owner?.name || 'User'}
                            </Text>
                            {comment.comments[0].owner?.id === discussion.owner.id && (
                              <View style={styles.authorBadge}>
                                <Text style={styles.authorBadgeText}>Author</Text>
                              </View>
                            )}
                          </View>
                          <Text style={styles.replyText} numberOfLines={1}>
                            {comment.comments[0].description}
                          </Text>
                          <View style={styles.commentStats}>
                            <View style={styles.commentStat}>
                              <Ionicons name="chatbubble-outline" size={9} color={Colors.primary} />
                              <Text style={styles.commentStatText}>
                                {comment.comments[0].comments?.length || 0}
                              </Text>
                            </View>
                            <View style={styles.commentStat}>
                              <Ionicons name="heart-outline" size={9} color={Colors.primary} />
                              <Text style={styles.commentStatText}>
                                {comment.comments[0].reactions?.length || 0}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
            
            {/* Show replies link at the bottom */}
            {hasAnyReplies && (
              <TouchableOpacity 
                style={styles.showRepliesButton}
                onPress={navigateToDetails}
              >
                <Text style={styles.showRepliesText}>Show replies</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })()}
    </View>
  );
};

const styles = StyleSheet.create({
  discussionCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grayLight,
    padding: Spacing.lg - 1,
    marginBottom: Spacing.lg - 1,
    marginHorizontal: Spacing.xl,
  },
  discussionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    position: 'relative',
  },
  discussionAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    marginRight: Spacing.sm + 2,
  },
  discussionInfo: {
    flex: 1,
  },
  discussionAuthor: {
    ...Typography.h3,
    fontSize: 13,
    marginBottom: 2,
  },
  discussionTime: {
    ...Typography.caption,
  },
  discussionMenuButton: {
    padding: 5,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  dropdownMenu: {
    position: 'absolute',
    right: 0,
    top: 25,
    backgroundColor: Colors.white,
    borderRadius: Spacing.sm,
    minWidth: 120,
    zIndex: 1000,
    borderWidth: 1,
    borderColor: Colors.grayLight,
  },
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#35303D',
  },
  discussionDescription: {
    ...Typography.body,
    marginBottom: Spacing.sm + 2,
  },
  discussionImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  discussionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  discussionStats: {
    flexDirection: 'row',
    gap: 20,
  },
  discussionStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  discussionStatText: {
    ...Typography.bodySmall,
    letterSpacing: -0.24,
  },
  discussionStatTextActive: {
    color: Colors.red,
  },
  discussionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 21,
    borderWidth: 0.35,
    borderColor: 'rgba(53, 48, 61, 0.8)',
    maxHeight: 21,
  },
  discussionTagEmoji: {
    fontSize: 10,
    marginRight: 2,
  },
  discussionTagText: {
    fontSize: 8,
    color: '#35303D',
  },
  commentsSection: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.grayBorder,
  },
  commentPreview: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    position: 'relative',
  },
  threadLine: {
    position: 'absolute',
    left: 16,
    top: 38,
    height: 70,
    width: 1,
    backgroundColor: '#D8D8D8',
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    marginRight: Spacing.sm,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: 2,
  },
  commentAuthor: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.primaryLight,
  },
  authorBadge: {
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 15,
  },
  authorBadgeText: {
    fontSize: 10,
    color: Colors.primaryLight,
  },
  commentText: {
    fontSize: 12,
    color: Colors.primaryLight,
    lineHeight: 14,
    marginBottom: 4,
  },
  commentStats: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginTop: 4,
  },
  commentStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  commentStatText: {
    fontSize: 10,
    color: Colors.primary,
  },
  commentMenuButton: {
    padding: 4,
  },
  repliesContainer: {
    marginLeft: 40,
    marginBottom: Spacing.sm,
  },
  replyPreview: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
    position: 'relative',
  },
  replyConnector: {
    position: 'absolute',
    left: -24,
    top: 16,
    width: 20,
    height: 1,
    backgroundColor: Colors.grayBorder,
  },
  replyAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    marginRight: Spacing.xs,
  },
  replyContent: {
    flex: 1,
  },
  replyAuthor: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.primaryLight,
  },
  replyText: {
    fontSize: 11,
    color: Colors.primaryLight,
    lineHeight: 13,
    marginBottom: 2,
  },
  showRepliesButton: {
    marginLeft: 40,
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  showRepliesText: {
    fontSize: 12,
    color: '#A68CD1',
    textDecorationLine: 'underline',
  },
});

export default DiscussionCard;