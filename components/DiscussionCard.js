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
  onReactionToggle 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
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
      
      <Text style={styles.discussionDescription}>{discussion.description}</Text>
      
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
});

export default DiscussionCard;