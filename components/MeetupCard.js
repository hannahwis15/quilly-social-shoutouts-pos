import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../config/styles';

const MeetupCard = ({ 
  meetup, 
  onPress, 
  onJoin, 
  onChat,
  onLike,
  isCompact = false,
  showActions = true 
}) => {
  const {
    id,
    title,
    host,
    attendees = [],
    time,
    location,
    status,
    category,
    description,
    image,
    tags = [],
    maxAttendees,
    isJoined = false,
    postedTime,
  } = meetup;

  const renderAttendees = () => {
    const displayCount = 3;
    const displayAttendees = attendees.slice(0, displayCount);
    const remainingCount = attendees.length - displayCount;

    return (
      <View style={styles.attendeesContainer}>
        {displayAttendees.map((attendee, index) => (
          <View 
            key={attendee.id || index} 
            style={[styles.attendeeAvatar, { marginLeft: index > 0 ? -11 : 0 }]}
          >
            <Image 
              source={attendee.avatar || require('../assets/images/Avatar.png')} 
              style={styles.attendeeImage}
            />
          </View>
        ))}
        {remainingCount > 0 && (
          <Text style={styles.attendeeCount}>+{remainingCount} others</Text>
        )}
      </View>
    );
  };

  const getStatusColor = () => {
    switch(status) {
      case 'starting_soon':
        return '#CDDEFF';
      case 'happening_now':
        return '#CDDEFF';
      case 'coming_up':
        return 'rgba(200, 207, 148, 0.8)';
      case 'just_posted':
        return '#00BE33';
      default:
        return Colors.grayLight;
    }
  };

  const getStatusText = () => {
    switch(status) {
      case 'starting_soon':
        return 'Starting soon';
      case 'happening_now':
        return 'Happening now';
      case 'coming_up':
        return 'Coming Up';
      case 'just_posted':
        return 'just posted';
      default:
        return '';
    }
  };

  if (isCompact) {
    // Compact card view (for lists)
    return (
      <TouchableOpacity style={styles.compactCard} onPress={onPress}>
        <View style={styles.compactHeader}>
          <View style={styles.hostInfo}>
            <View style={styles.hostAvatar}>
              <Image 
                source={host.avatar || require('../assets/images/Avatar.png')} 
                style={styles.hostImage}
              />
            </View>
            <View style={styles.hostDetails}>
              <Text style={styles.hostName}>{host.name}</Text>
              <Text style={styles.postedTime}>{postedTime || '21 min ago'}</Text>
              {status === 'just_posted' && (
                <Text style={styles.justPosted}>just posted</Text>
              )}
            </View>
          </View>
          <View style={styles.meetupIcon}>
            <MaterialIcons name="people" size={20} color={Colors.primary} />
          </View>
        </View>

        <Text style={styles.compactTitle}>{title}</Text>

        <View style={styles.compactDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={12} color={Colors.primaryLight} />
            <Text style={styles.detailText}>{time}</Text>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={10} color={Colors.primaryLight} />
            <Text style={styles.detailText}>{location}</Text>
          </View>
        </View>

        <View style={styles.compactFooter}>
          <View style={styles.attendeesSection}>
            {renderAttendees()}
          </View>
          {showActions && (
            <View style={styles.actions}>
              <TouchableOpacity 
                style={[styles.actionButton, isJoined && styles.attendingButton]} 
                onPress={onJoin}
              >
                {isJoined && (
                  <Ionicons name="checkmark" size={16} color={Colors.primaryLight} style={styles.checkIcon} />
                )}
                <Text style={[styles.actionButtonText, isJoined && styles.attendingButtonText]}>
                  {isJoined ? 'Attending' : 'Coming?'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onLike} style={styles.likeButton}>
                <Ionicons name="heart-outline" size={24} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  // Expanded card view (with image)
  return (
    <TouchableOpacity style={styles.expandedCard} onPress={onPress}>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.meetupImage} />
          {status && (
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
              <Ionicons name="time-outline" size={9} color={Colors.primary} />
              <Text style={styles.statusText}>{getStatusText()}</Text>
            </View>
          )}
          {tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagEmoji}>{tag.emoji}</Text>
                  <Text style={styles.tagText}>{tag.name}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      <View style={styles.expandedContent}>
        <View style={styles.expandedHeader}>
          <Text style={styles.expandedTitle}>{title}</Text>
          {renderAttendees()}
        </View>

        <Text style={styles.hostedBy}>
          <Text style={styles.hostedByLabel}>Hosted by </Text>
          <Text style={styles.hostNameExpanded}>{host.name}</Text>
        </Text>

        <View style={styles.expandedDetails}>
          <View style={styles.detailItem}>
            <MaterialIcons name="calendar-today" size={12} color={Colors.primaryLight} />
            <Text style={styles.detailText}>{meetup.date || 'Aug 23'}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={12} color={Colors.primaryLight} />
            <Text style={styles.detailText}>{time}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={10} color={Colors.primaryLight} />
            <Text style={styles.detailText}>{location}</Text>
          </View>
        </View>

        {description && (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        )}

        <View style={styles.expandedFooter}>
          {meetup.hasComments && (
            <TouchableOpacity style={styles.viewComments}>
              <Text style={styles.viewCommentsText}>view comments</Text>
              <Ionicons name="chevron-forward" size={12} color="#00BE33" />
            </TouchableOpacity>
          )}
          
          {showActions && (
            <View style={styles.expandedActions}>
              <TouchableOpacity style={styles.chatButton} onPress={onChat}>
                <Feather name="message-circle" size={10} color={Colors.primaryLight} />
                <Text style={styles.chatButtonText}>Send a Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onLike} style={styles.likeButtonExpanded}>
                <Ionicons name="heart-outline" size={24} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Compact Card Styles
  compactCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 25,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  hostAvatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    overflow: 'hidden',
    marginRight: 10,
  },
  hostImage: {
    width: '100%',
    height: '100%',
  },
  hostDetails: {
    justifyContent: 'center',
  },
  hostName: {
    fontSize: 14,
    color: Colors.primaryLight,
  },
  postedTime: {
    fontSize: 10,
    color: Colors.primary,
    opacity: 0.7,
    marginTop: 2,
  },
  justPosted: {
    fontSize: 10,
    color: '#00BE33',
    opacity: 0.7,
  },
  meetupIcon: {
    padding: 5,
  },
  compactTitle: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 8,
  },
  compactDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.25,
    borderColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailText: {
    fontSize: 10,
    color: Colors.primaryLight,
  },
  detailDivider: {
    width: 1,
    height: 21,
    backgroundColor: Colors.grayBorder,
    marginHorizontal: 10,
  },
  compactFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendeesSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeAvatar: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    borderWidth: 0.8,
    borderColor: Colors.white,
    overflow: 'hidden',
  },
  attendeeImage: {
    width: '100%',
    height: '100%',
  },
  attendeeCount: {
    fontSize: 10,
    color: Colors.primary,
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    backgroundColor: '#CACDFF',
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  actionButtonText: {
    fontSize: 11,
    color: Colors.primaryLight,
  },
  attendingButton: {
    backgroundColor: '#E9EEA8',
  },
  attendingButtonText: {
    color: Colors.primaryLight,
  },
  checkIcon: {
    marginRight: -3,
  },
  likeButton: {
    padding: 5,
  },

  // Expanded Card Styles
  expandedCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginHorizontal: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 164,
    backgroundColor: '#D9D9D9',
    position: 'relative',
  },
  meetupImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  statusBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    gap: 5,
  },
  statusText: {
    fontSize: 10,
    color: Colors.primary,
  },
  tagsContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'column',
    gap: 5,
    alignItems: 'flex-end',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 30,
    gap: 6,
  },
  tagEmoji: {
    fontSize: 10,
  },
  tagText: {
    fontSize: 10,
    color: Colors.primary,
  },
  expandedContent: {
    padding: 14,
  },
  expandedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  expandedTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
  hostedBy: {
    fontSize: 12,
    marginBottom: 12,
  },
  hostedByLabel: {
    color: Colors.primaryLight,
  },
  hostNameExpanded: {
    color: Colors.primary,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  expandedDetails: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  description: {
    fontSize: 11,
    color: '#7F7F7F',
    lineHeight: 16,
    marginBottom: 12,
  },
  expandedFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewComments: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  viewCommentsText: {
    fontSize: 10,
    color: '#00BE33',
  },
  expandedActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 27,
    paddingVertical: 8,
    borderRadius: 30,
    gap: 7,
  },
  chatButtonText: {
    fontSize: 10,
    color: Colors.primaryLight,
  },
  likeButtonExpanded: {
    padding: 5,
  },
});

export default MeetupCard;