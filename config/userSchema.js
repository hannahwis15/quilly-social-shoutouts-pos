// Comprehensive User Object Schema
// This file documents all fields in the user object for reference

export const userSchema = {
  // Core Identity
  id: 'string', // Unique user identifier
  username: 'string', // Unique username for login/display
  email: 'string', // User email address
  phoneNumber: 'string', // User phone number (optional)
  
  // Profile Information
  firstName: 'string',
  lastName: 'string',
  fullName: 'string', // Combined first and last name
  pronouns: 'string', // User's preferred pronouns (e.g., 'She/Her', 'He/Him', 'They/Them')
  bio: 'string', // User biography/description
  avatar: 'ImageSource', // User profile picture
  coverPhoto: 'ImageSource|null', // Optional cover photo
  
  // Location & Education
  location: {
    city: 'string',
    state: 'string',
    country: 'string',
    formatted: 'string' // Display format: "City, State"
  },
  
  education: {
    school: 'string', // University/College name
    graduationYear: 'string', // e.g., '26' for 2026
    major: 'string',
    minor: 'string|null',
    formatted: 'string' // Display format: "School 'YY"
  },
  
  // House/Community
  house: {
    id: 'string',
    name: 'string', // e.g., 'KAHLO HOUSE'
    role: 'string', // 'member' | 'admin' | 'moderator'
    joinedDate: 'Date',
  },
  
  // Gamification System
  points: {
    total: 'number', // Total points earned
    thisWeek: 'number', // Points earned this week
    thisMonth: 'number', // Points earned this month
    level: 'number', // Current level
    nextLevelPoints: 'number', // Points needed for next level
    rank: 'number', // Rank within house
  },
  
  // Interests & Preferences
  interests: [
    {
      id: 'string',
      name: 'string', // Interest name
      emoji: 'string', // Display emoji
      category: 'string' // 'entertainment' | 'hobbies' | 'lifestyle' | 'personal'
    }
  ],
  
  // Media Content
  media: {
    introVideo: 'string|null', // URL to introduction video
    photos: ['string'], // Array of photo URLs
  },
  
  // Activity Statistics
  stats: {
    totalShoutouts: 'number',
    totalDiscussions: 'number',
    totalEvents: 'number',
    totalComments: 'number',
    totalReactions: 'number',
    joinedDate: 'Date',
    lastActive: 'Date',
  },
  
  // Privacy Settings
  privacy: {
    profileVisibility: 'string', // 'public' | 'house' | 'private'
    showEmail: 'boolean',
    showPhone: 'boolean',
    showLocation: 'boolean',
  },
  
  // Notification Preferences
  notifications: {
    push: 'boolean',
    email: 'boolean',
    discussions: 'boolean',
    events: 'boolean',
    shoutouts: 'boolean',
  },
  
  // Lazy-Loaded Lists (loaded on demand)
  myEvents: 'Array|null', // User's created/attended events
  myDiscussions: 'Array|null', // User's discussions
  myShoutouts: 'Array|null', // User's shoutouts given/received
  savedItems: 'Array|null', // Bookmarked content
  activityHistory: 'Array|null', // Full activity log
  
  // Recent Activity (for points display)
  recentActivity: [
    {
      id: 'string',
      type: 'string', // 'discussion' | 'reaction' | 'event' | 'shoutout'
      description: 'string',
      timestamp: 'Date',
      points: 'number',
      icon: 'string', // Icon name for display
    }
  ],
};

// Sample user object factory
export const createUser = (data = {}) => ({
  // Core Identity
  id: data.id || '',
  username: data.username || '',
  email: data.email || '',
  phoneNumber: data.phoneNumber || '',
  
  // Profile Information
  firstName: data.firstName || '',
  lastName: data.lastName || '',
  fullName: data.fullName || `${data.firstName} ${data.lastName}`.trim(),
  pronouns: data.pronouns || '',
  bio: data.bio || '',
  avatar: data.avatar || null,
  coverPhoto: data.coverPhoto || null,
  
  // Location & Education
  location: {
    city: data.location?.city || '',
    state: data.location?.state || '',
    country: data.location?.country || 'USA',
    formatted: data.location?.formatted || `${data.location?.city}, ${data.location?.state}`.replace(', ,', ''),
  },
  
  education: {
    school: data.education?.school || '',
    graduationYear: data.education?.graduationYear || '',
    major: data.education?.major || '',
    minor: data.education?.minor || null,
    formatted: data.education?.formatted || `${data.education?.school} '${data.education?.graduationYear}`.replace(' \'', ''),
  },
  
  // House/Community
  house: {
    id: data.house?.id || '',
    name: data.house?.name || '',
    role: data.house?.role || 'member',
    joinedDate: data.house?.joinedDate || new Date(),
  },
  
  // Gamification
  points: {
    total: data.points?.total || 0,
    thisWeek: data.points?.thisWeek || 0,
    thisMonth: data.points?.thisMonth || 0,
    level: data.points?.level || 1,
    nextLevelPoints: data.points?.nextLevelPoints || 100,
    rank: data.points?.rank || null,
  },
  
  // Interests
  interests: data.interests || [],
  
  // Media
  media: {
    introVideo: data.media?.introVideo || null,
    photos: data.media?.photos || [],
  },
  
  // Stats
  stats: {
    totalShoutouts: data.stats?.totalShoutouts || 0,
    totalDiscussions: data.stats?.totalDiscussions || 0,
    totalEvents: data.stats?.totalEvents || 0,
    totalComments: data.stats?.totalComments || 0,
    totalReactions: data.stats?.totalReactions || 0,
    joinedDate: data.stats?.joinedDate || new Date(),
    lastActive: data.stats?.lastActive || new Date(),
  },
  
  // Privacy
  privacy: {
    profileVisibility: data.privacy?.profileVisibility || 'public',
    showEmail: data.privacy?.showEmail ?? false,
    showPhone: data.privacy?.showPhone ?? false,
    showLocation: data.privacy?.showLocation ?? true,
  },
  
  // Notifications
  notifications: {
    push: data.notifications?.push ?? true,
    email: data.notifications?.email ?? true,
    discussions: data.notifications?.discussions ?? true,
    events: data.notifications?.events ?? true,
    shoutouts: data.notifications?.shoutouts ?? true,
  },
  
  // Lazy-loaded lists
  myEvents: data.myEvents || null,
  myDiscussions: data.myDiscussions || null,
  myShoutouts: data.myShoutouts || null,
  savedItems: data.savedItems || null,
  activityHistory: data.activityHistory || null,
  
  // Recent activity
  recentActivity: data.recentActivity || [],
});

// Lazy loading helpers
export const lazyLoadUserContent = {
  loadEvents: async (userId) => {
    // Simulated API call
    // In production: return await api.get(`/users/${userId}/events`)
    return [];
  },
  
  loadDiscussions: async (userId) => {
    // Simulated API call
    // In production: return await api.get(`/users/${userId}/discussions`)
    return [];
  },
  
  loadShoutouts: async (userId) => {
    // Simulated API call
    // In production: return await api.get(`/users/${userId}/shoutouts`)
    return [];
  },
  
  loadSavedItems: async (userId) => {
    // Simulated API call
    // In production: return await api.get(`/users/${userId}/saved`)
    return [];
  },
  
  loadActivityHistory: async (userId, limit = 50) => {
    // Simulated API call
    // In production: return await api.get(`/users/${userId}/activity?limit=${limit}`)
    return [];
  },
};