import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../config/styles';

const NotificationsScreen = ({ navigation }) => {
  // Sample notifications data - replace with actual data from API
  const [notifications, setNotifications] = useState({
    new: [
      {
        id: 1,
        type: 'post',
        title: 'Your post is going well! Make it an irl meetup?',
        action: null,
        actionType: null,
        time: '12 MINS AGO',
        isNew: true,
        postInfo: {
          group: 'Study group @ Trudy\'s Cafe?',
          status: 'Create',
          statusColor: '#4CAF50',
        }
      },
      {
        id: 2,
        type: 'like',
        user: {
          name: 'Kate M.',
          avatar: require('../assets/images/Avatar.png'),
        },
        message: 'liked your post!',
        time: '15 MINS AGO',
        isNew: true,
        postImage: require('../assets/images/Avatar.png'),
      },
      {
        id: 3,
        type: 'comment',
        user: {
          name: 'Kate M.',
          avatar: require('../assets/images/Avatar.png'),
        },
        message: 'commented: Can\'t wait! I\'ve been wanting to d...',
        time: '18 MINS AGO',
        isNew: true,
        postImage: require('../assets/images/Avatar.png'),
      },
    ],
    past: [
      {
        id: 4,
        type: 'discussion',
        user: {
          name: 'Kate M.',
          avatar: require('../assets/images/Avatar.png'),
        },
        message: 'sent you a discussion post:',
        time: '2 DAYS AGO',
        isNew: false,
      },
      {
        id: 5,
        type: 'meetup',
        user: {
          name: 'Kate M.',
          avatar: require('../assets/images/Avatar.png'),
        },
        message: 'sent you a meetup post: We should do this!',
        time: '1 WEEK AGO',
        isNew: false,
      },
      {
        id: 6,
        type: 'post',
        title: 'Study group @ Trudy\'s Cafe?',
        action: 'Coming?',
        actionType: 'coming',
        actionColor: '#E6E6FA',
        time: '3 WEEKS AGO',
        isNew: false,
      },
      {
        id: 7,
        type: 'points',
        title: 'points for attending a meetup!',
        points: '+3',
        time: '3 WEEKS AGO',
        isNew: false,
      },
      {
        id: 8,
        type: 'signup',
        title: 'You signed-up for a meetup!',
        time: '3 WEEKS AGO',
        isNew: false,
      },
      {
        id: 9,
        type: 'post',
        title: 'Study group @ Trudy\'s Cafe?',
        action: 'Attending',
        actionType: 'attending',
        actionColor: '#FFFACD',
        time: '3 WEEKS AGO',
        isNew: false,
      },
      {
        id: 10,
        type: 'comment',
        user: {
          name: 'Kate M.',
          avatar: require('../assets/images/Avatar.png'),
        },
        message: 'liked your comment!',
        time: '15 MINS AGO',
        isNew: false,
      },
      {
        id: 11,
        type: 'meetup',
        user: {
          name: 'Kate M.',
          avatar: require('../assets/images/Avatar.png'),
        },
        message: 'liked your meetup!',
        time: '12 MINS AGO',
        isNew: false,
      },
      {
        id: 12,
        type: 'discussion',
        user: {
          name: 'Kate M.',
          avatar: require('../assets/images/Avatar.png'),
        },
        message: 'sent you a discussion post: this reminds me of you lol',
        time: '5 DAYS AGO',
        isNew: false,
      },
      {
        id: 13,
        type: 'rant',
        title: 'LOVE ISLAND RANT lol',
        time: '1 WEEK AGO',
        isNew: false,
      },
    ]
  });

  const renderNotificationItem = (notification) => {
    // Render different notification types
    if (notification.type === 'post' && notification.postInfo) {
      return (
        <View style={styles.notificationItem}>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <View style={styles.postInfoContainer}>
              <Text style={styles.postGroupText}>{notification.postInfo.group}</Text>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: notification.postInfo.statusColor }]}>
                <Text style={styles.actionButtonText}>{notification.postInfo.status}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.timeText}>{notification.time}</Text>
        </View>
      );
    }

    if (notification.type === 'like' || notification.type === 'comment') {
      return (
        <View style={styles.notificationItem}>
          <Image source={notification.user.avatar} style={styles.userAvatar} />
          <View style={styles.notificationContent}>
            <Text style={styles.notificationText}>
              <Text style={styles.userName}>{notification.user.name}</Text> {notification.message}
            </Text>
          </View>
          {notification.postImage && (
            <Image source={notification.postImage} style={styles.postThumbnail} />
          )}
          <Text style={styles.timeText}>{notification.time}</Text>
        </View>
      );
    }

    if (notification.type === 'discussion' || notification.type === 'meetup') {
      return (
        <View style={styles.notificationItem}>
          <Image source={notification.user.avatar} style={styles.userAvatar} />
          <View style={styles.notificationContent}>
            <Text style={styles.notificationText}>
              <Text style={styles.userName}>{notification.user.name}</Text> {notification.message}
            </Text>
          </View>
          <Text style={styles.timeText}>{notification.time}</Text>
        </View>
      );
    }

    if (notification.type === 'points') {
      return (
        <View style={styles.notificationItem}>
          <View style={styles.pointsIcon}>
            <Text style={styles.pointsText}>{notification.points}</Text>
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
          </View>
          <Text style={styles.timeText}>{notification.time}</Text>
        </View>
      );
    }

    if (notification.type === 'signup') {
      return (
        <View style={styles.notificationItem}>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
          </View>
          <Text style={styles.timeText}>{notification.time}</Text>
        </View>
      );
    }

    if (notification.type === 'rant') {
      return (
        <View style={styles.notificationItem}>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
          </View>
          <Text style={styles.timeText}>{notification.time}</Text>
        </View>
      );
    }

    if (notification.action) {
      return (
        <View style={styles.notificationItem}>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <TouchableOpacity 
              style={[
                styles.actionButton, 
                { backgroundColor: notification.actionColor || '#E6E6FA' }
              ]}
            >
              <Text style={styles.actionButtonText}>{notification.action}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.timeText}>{notification.time}</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#35303D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* New Notifications */}
        {notifications.new.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>New</Text>
            {notifications.new.map((notification) => (
              <View key={notification.id}>
                {renderNotificationItem(notification)}
              </View>
            ))}
          </View>
        )}

        {/* Past Notifications */}
        {notifications.past.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Past</Text>
            {notifications.past.map((notification) => (
              <View key={notification.id}>
                {renderNotificationItem(notification)}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#35303D',
  },
  headerSpacer: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#35303D',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    marginRight: 12,
  },
  notificationText: {
    fontSize: 14,
    color: '#35303D',
    lineHeight: 20,
  },
  notificationTitle: {
    fontSize: 14,
    color: '#35303D',
    lineHeight: 20,
  },
  userName: {
    fontWeight: '600',
  },
  postThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginLeft: 'auto',
    marginRight: 8,
  },
  timeText: {
    fontSize: 10,
    color: '#999999',
    textTransform: 'uppercase',
    position: 'absolute',
    top: 12,
    right: 20,
  },
  postInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  postGroupText: {
    fontSize: 13,
    color: '#666666',
    flex: 1,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#35303D',
  },
  pointsIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFE4B5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B00',
  },
});

export default NotificationsScreen;