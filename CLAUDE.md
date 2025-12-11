# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WalkPoints is a React Native/Expo walking app that rewards users with points for walking. Users earn points based on steps taken (1 point per 100 steps) and can redeem them for rewards.

## Commands

```bash
npm start          # Start Expo dev server
npm run android    # Start on Android
npm run ios        # Start on iOS
npm run web        # Start on web
npm run lint       # Run ESLint
```

## Architecture

### Tech Stack
- Expo SDK 54 with expo-router for file-based routing
- React Native 0.81 with New Architecture enabled
- React 19 with React Compiler experiment enabled
- TypeScript with strict mode

### Routing Structure
Uses expo-router file-based routing with the following structure:
- `app/_layout.tsx` - Root layout with ThemeProvider
- `app/(tabs)/_layout.tsx` - Tab navigator with 4 tabs: Home, Activity, Rewards, Profile
- `app/modal.tsx` - Modal screen

### Theming System
- `constants/theme.ts` - Centralized color definitions for light/dark modes with semantic colors (primary, secondary, accent, success, warning, error, card, border, muted)
- `hooks/use-color-scheme.ts` - Re-exports React Native's useColorScheme
- `hooks/use-theme-color.ts` - Hook to get theme-aware colors
- Components use `Colors[colorScheme]` pattern for theme-aware styling

### Component Patterns
- `ThemedText` and `ThemedView` - Base themed components in `components/`
- Tab screens use `SafeAreaView` from react-native-safe-area-context
- `HapticTab` component provides haptic feedback on tab press
- `IconSymbol` uses SF Symbols on iOS with fallback

### Path Aliases
`@/*` maps to project root (configured in tsconfig.json)
