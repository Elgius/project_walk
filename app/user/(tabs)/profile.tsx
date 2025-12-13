import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  // Mock user data
  const user = {
    name: 'Alex Walker',
    level: 12,
    totalPoints: 12450,
    totalSteps: 1245000,
    totalDistance: 920.5,
    streakDays: 7,
    joinDate: 'Nov 2024',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={[styles.title, { color: colors.text }]}>Profile</ThemedText>
          <Pressable style={[styles.settingsButton, { backgroundColor: colors.card }]}>
            <ThemedText>⚙️</ThemedText>
          </Pressable>
        </View>

        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <ThemedText style={styles.avatarText}>
              {user.name.split(' ').map((n) => n[0]).join('')}
            </ThemedText>
          </View>
          <ThemedText type="subtitle" style={{ marginTop: 12 }}>{user.name}</ThemedText>
          <View style={[styles.levelBadge, { backgroundColor: colors.secondary }]}>
            <ThemedText style={styles.levelText}>Level {user.level}</ThemedText>
          </View>
          <ThemedText style={[styles.joinDate, { color: colors.muted }]}>
            Member since {user.joinDate}
          </ThemedText>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <ThemedText style={[styles.statBoxValue, { color: colors.secondary }]}>
              {user.totalPoints.toLocaleString()}
            </ThemedText>
            <ThemedText style={[styles.statBoxLabel, { color: colors.muted }]}>Total Points</ThemedText>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <ThemedText style={[styles.statBoxValue, { color: colors.primary }]}>
              {(user.totalSteps / 1000).toFixed(0)}k
            </ThemedText>
            <ThemedText style={[styles.statBoxLabel, { color: colors.muted }]}>Total Steps</ThemedText>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <ThemedText style={[styles.statBoxValue, { color: colors.accent }]}>
              {user.totalDistance.toFixed(0)}
            </ThemedText>
            <ThemedText style={[styles.statBoxLabel, { color: colors.muted }]}>km Walked</ThemedText>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <ThemedText style={[styles.statBoxValue, { color: colors.warning }]}>
              {user.streakDays}
            </ThemedText>
            <ThemedText style={[styles.statBoxLabel, { color: colors.muted }]}>Day Streak</ThemedText>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  levelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  joinDate: {
    marginTop: 8,
    fontSize: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  statBox: {
    width: '46%',
    margin: '2%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  statBoxValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  statBoxLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});
