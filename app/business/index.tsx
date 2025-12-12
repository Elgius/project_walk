import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';

export default function BusinessHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to WalkPoints Business</Text>
        <Text style={styles.description}>
          Manage your rewards, track customer engagement, and grow your business.
        </Text>

        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonText}>More features coming soon</Text>
          <Text style={styles.comingSoonDescription}>
            Points management, redemption tracking, and analytics
          </Text>
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
    paddingTop: 32,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    lineHeight: 24,
    marginBottom: 32,
  },
  comingSoon: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  comingSoonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.secondary,
    marginBottom: 4,
  },
  comingSoonDescription: {
    fontSize: 14,
    color: Colors.dark.muted,
    textAlign: 'center',
  },
});
