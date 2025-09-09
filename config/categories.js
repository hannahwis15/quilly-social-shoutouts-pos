// Global Categories Configuration
// These categories are used throughout the application
// Each category has a unique ID, label, emoji/icon, and color

export const CATEGORY_GROUPS = {
  SOCIAL_PERSONAL: {
    id: 'social_personal',
    label: 'Social & Personal',
    categories: [
      { id: 'rant', label: 'Rant', emoji: '😤', color: '#FFE5E5' },
      { id: 'girl_talk', label: 'Girl Talk', emoji: '💅', color: '#FFE5FF' },
      { id: 'questions', label: 'Questions', emoji: '❓', color: '#E5F0FF' },
      { id: 'advice', label: 'Advice', emoji: '💡', color: '#FFF5E5' },
      { id: 'mental_health', label: 'Mental Health', emoji: '🧠', color: '#E5FFE5' },
      { id: 'dating', label: 'Dating', emoji: '💕', color: '#FFE5F5', selected: true },
      { id: 'roommate_drama', label: 'Roommate Drama', emoji: '🏠', color: '#F5E5FF' },
      { id: 'relationships', label: 'Relationships', emoji: '❤️', color: '#FFE5E5' },
      { id: 'humor', label: 'Humor', emoji: '😂', color: '#FFF5E5' },
      { id: 'motivation', label: 'Motivation', emoji: '💪', color: '#E5F5FF' },
      { id: 'self_care', label: 'Self-Care', emoji: '🧘', color: '#E5FFE5' },
    ],
  },
  COLLEGE_LIFE: {
    id: 'college_life',
    label: 'College Life',
    categories: [
      { id: 'college_things', label: 'College Things', emoji: '🎓', color: '#E5E5FF' },
      { id: 'study_hacks', label: 'Study Hacks', emoji: '📚', color: '#E5F5FF' },
      { id: 'dorm_life', label: 'Dorm Life', emoji: '🏢', color: '#F5E5FF' },
      { id: 'study_abroad', label: 'Study Abroad', emoji: '✈️', color: '#FFE5E5' },
      { id: 'housing', label: 'Housing', emoji: '🏠', color: '#C8FFD4', selected: true },
      { id: 'events', label: 'Events', emoji: '🎉', color: '#FFE5FF' },
    ],
  },
  LIFESTYLE_INTERESTS: {
    id: 'lifestyle_interests',
    label: 'Lifestyle & Interests',
    categories: [
      { id: 'foodie', label: 'Foodie', emoji: '🍕', color: '#FFE5E5' },
      { id: 'entertainment', label: 'Entertainment', emoji: '🎬', color: '#E5E5FF' },
      { id: 'sustainability', label: 'Sustainability', emoji: '♻️', color: '#E5FFE5' },
      { id: 'sports', label: 'Sports', emoji: '⚽', color: '#E5F5FF' },
      { id: 'recipes', label: 'Recipes', emoji: '👨‍🍳', color: '#FFF5E5' },
      { id: 'travel', label: 'Travel', emoji: '✈️', color: '#F5E5FF' },
      { id: 'wellness', label: 'Wellness', emoji: '🧘', color: '#E8E5FF', selected: true },
      { id: 'fashion', label: 'Fashion', emoji: '👗', color: '#FFE5FF' },
      { id: 'fitness', label: 'Fitness', emoji: '💪', color: '#E5FFE5' },
      { id: 'arts_crafts', label: 'Arts & Crafts', emoji: '🎨', color: '#FFE5E5' },
      { id: 'music', label: 'Music', emoji: '🎵', color: '#E5E5FF' },
    ],
  },
  CAREER_ACTIVISM: {
    id: 'career_activism',
    label: 'Career & Activism',
    categories: [
      { id: 'career', label: 'Career', emoji: '💼', color: '#E5E5FF' },
      { id: 'activism', label: 'Activism', emoji: '✊', color: '#FFE5E5' },
      { id: 'news', label: 'News', emoji: '📰', color: '#FFFFE5', selected: true },
    ],
  },
  MISCELLANEOUS: {
    id: 'miscellaneous',
    label: 'Miscellaneous',
    categories: [
      { id: 'other', label: 'Other', emoji: '📝', color: '#F0F0F0' },
    ],
  },
};

// Helper function to get all categories as a flat array
export const getAllCategories = () => {
  const allCategories = [];
  Object.values(CATEGORY_GROUPS).forEach(group => {
    allCategories.push(...group.categories);
  });
  return allCategories;
};

// Helper function to get a category by ID
export const getCategoryById = (categoryId) => {
  const allCategories = getAllCategories();
  return allCategories.find(cat => cat.id === categoryId);
};

// Helper function to get category color
export const getCategoryColor = (categoryId) => {
  const category = getCategoryById(categoryId);
  return category ? category.color : '#E5E5E5';
};

// Helper function to get category emoji
export const getCategoryEmoji = (categoryId) => {
  const category = getCategoryById(categoryId);
  return category ? category.emoji : '📝';
};

// Default category for new posts
export const DEFAULT_CATEGORY = 'other';