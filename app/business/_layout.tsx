import { Stack } from 'expo-router';
import { Colors } from '@/constants/theme';

export default function BusinessLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.dark.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="rewards" />
      <Stack.Screen name="analytics" />
    </Stack>
  );
}
