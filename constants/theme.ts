/**
 * Theme colors for the walking app
 */

import { Platform } from 'react-native';

const tintColorLight = '#4CAF50'; // Green for walking/health theme
const tintColorDark = '#F5A962'; // Orange/peach for dark theme

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#4CAF50',
    secondary: '#FF9800',
    accent: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    card: '#F5F5F5',
    border: '#E0E0E0',
    muted: '#9E9E9E',
  },
  dark: {
    text: '#DCD7BA',
    textSecondary: '#C8C093',
    background: '#1C1E2D',
    tint: tintColorDark,
    icon: '#8E8E93',
    tabIconDefault: '#8E8E93',
    tabIconSelected: tintColorDark,
    primary: '#F5A962',
    secondary: '#5B7FFF',
    accent: '#5B7FFF',
    success: '#4CAF50',
    warning: '#F5A962',
    error: '#E57373',
    card: '#252836',
    border: '#3A3D4A',
    muted: '#727169',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
