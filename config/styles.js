import { Platform } from 'react-native';

// Color Palette
export const Colors = {
  // Primary colors
  primary: '#35303D',
  primaryLight: 'rgba(53, 48, 61, 0.8)',
  primaryMedium: 'rgba(53, 48, 61, 0.6)',
  primaryLightOpacity: 'rgba(53, 48, 61, 0.5)',
  primaryVeryLight: 'rgba(53, 48, 61, 0.3)',
  
  // Purple theme
  purple: '#9599FF',
  purpleLight: '#E5CFFF',
  purpleVeryLight: '#F1E6FF',
  purpleButton: '#CACDFF',
  
  // Base colors
  white: '#FFFFFF',
  whiteOpacity: 'rgba(255, 255, 255, 0.8)',
  whiteHighOpacity: 'rgba(255, 255, 255, 0.95)',
  
  // Accent colors
  red: '#FF4444',
  gray: '#666666',
  grayLight: '#E8E8E8',
  grayVeryLight: '#F5F5F5',
  grayBorder: '#F0F0F0',
  grayText: '#6B6B6B',
  
  // Category colors
  categoryPink: '#FFD6E0',
  categoryBlue: '#E8F4FD',
  categoryYellow: '#FFF4E6',
  categoryPurple: '#F0E6FF',
};

// Typography styles
export const Typography = {
  // Headers
  h1: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.primary,
  },
  h2: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary,
  },
  h3: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
  
  // Body text
  body: {
    fontSize: 14,
    color: Colors.primary,
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    color: Colors.primary,
  },
  
  // Captions
  caption: {
    fontSize: 11,
    color: Colors.primaryMedium,
  },
  captionSmall: {
    fontSize: 10,
    color: Colors.primaryMedium,
  },
  
  // Labels
  label: {
    fontSize: 12,
    color: Colors.primaryLight,
  },
  labelSmall: {
    fontSize: 8,
    color: Colors.primary,
  },
};

// Common shadows
export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardStrong: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  purple: {
    shadowColor: '#E5CFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4.67,
    elevation: 3,
  },
  header: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 8,
  },
};

// Border styles
export const Borders = {
  card: {
    borderRadius: 10,
  },
  cardLarge: {
    borderRadius: 12,
  },
  pill: {
    borderRadius: 30,
  },
  button: {
    borderRadius: 25,
  },
  small: {
    borderRadius: 5,
  },
  tag: {
    borderRadius: 21,
  },
  thin: {
    borderWidth: 0.5,
    borderColor: Colors.primaryLight,
  },
  veryThin: {
    borderWidth: 0.35,
    borderColor: Colors.primaryLight,
  },
  light: {
    borderWidth: 0.5,
    borderColor: Colors.primaryVeryLight,
  },
  solid: {
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 30,
};

// Common component styles
export const CommonStyles = {
  // Containers
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  
  // Cards
  card: {
    backgroundColor: Colors.white,
    borderRadius: Borders.card.borderRadius,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  
  // Buttons
  primaryButton: {
    backgroundColor: Colors.purple,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Borders.button.borderRadius,
    alignItems: 'center',
  },
  
  secondaryButton: {
    backgroundColor: Colors.purpleLight,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Borders.button.borderRadius,
    alignItems: 'center',
  },
  
  // Pills
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 7,
    borderRadius: Borders.pill.borderRadius,
    ...Borders.thin,
  },
  
  // Platform specific
  headerHeight: Platform.OS === 'ios' ? 164 : 144,
  tabBarHeight: Platform.OS === 'ios' ? 85 : 70,
  statusBarPadding: Platform.OS === 'ios' ? 50 : 20,
};

export default {
  Colors,
  Typography,
  Shadows,
  Borders,
  Spacing,
  CommonStyles,
};