import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';

export default function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>WalkPoints</Text>
          <Text style={styles.subtitle}>Choose how you want to continue</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.userButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/user')}
          >
            <Text style={styles.buttonText}>I'm a User</Text>
            <Text style={styles.buttonDescription}>
              Track your walks and earn rewards
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.businessButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/business/profile')}
          >
            <Text style={styles.buttonText}>I'm a Business</Text>
            <Text style={styles.buttonDescription}>
              Manage rewards and engage customers
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.dark.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  userButton: {
    backgroundColor: Colors.dark.primary,
  },
  businessButton: {
    backgroundColor: Colors.dark.secondary,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  buttonDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
