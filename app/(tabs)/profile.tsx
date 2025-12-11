import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  target?: number;
};

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
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

  // Mock achievements
  const achievements: Achievement[] = [
    { id: '1', title: 'First Steps', description: 'Complete your first walk', icon: '🚶', unlocked: true },
    { id: '2', title: 'Marathon', description: 'Walk 42km total', icon: '🏃', unlocked: true },
    { id: '3', title: 'Early Bird', description: 'Start a walk before 7 AM', icon: '🌅', unlocked: true },
    { id: '4', title: 'Week Warrior', description: '7-day streak', icon: '🔥', unlocked: true },
    { id: '5', title: 'Point Master', description: 'Earn 10,000 points', icon: '⭐', unlocked: true },
    { id: '6', title: 'Explorer', description: 'Walk 100km total', icon: '🗺️', unlocked: false, progress: 92, target: 100 },
    { id: '7', title: 'Dedicated', description: '30-day streak', icon: '💪', unlocked: false, progress: 7, target: 30 },
    { id: '8', title: 'Legend', description: 'Walk 1000km total', icon: '🏆', unlocked: false, progress: 920, target: 1000 },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Profile</ThemedText>
          <Pressable style={[styles.settingsButton, { backgroundColor: colors.card }]}>
            <ThemedText>⚙️</ThemedText>
          </Pressable>
        </ThemedView>

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

        {/* Achievements Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">Achievements</ThemedText>
            <ThemedText style={{ color: colors.muted }}>
              {unlockedCount}/{achievements.length}
            </ThemedText>
          </View>

          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  {
                    backgroundColor: achievement.unlocked ? colors.card : colors.background,
                    borderColor: achievement.unlocked ? colors.primary : colors.border,
                    opacity: achievement.unlocked ? 1 : 0.6,
                  },
                ]}
              >
                <ThemedText style={styles.achievementIcon}>{achievement.icon}</ThemedText>
                <ThemedText style={[styles.achievementTitle, { fontWeight: '600' }]}>
                  {achievement.title}
                </ThemedText>
                <ThemedText style={[styles.achievementDesc, { color: colors.muted }]} numberOfLines={2}>
                  {achievement.description}
                </ThemedText>
                {!achievement.unlocked && achievement.progress !== undefined && (
                  <View style={styles.achievementProgress}>
                    <View style={[styles.progressBarSmall, { backgroundColor: colors.border }]}>
                      <View
                        style={[
                          styles.progressFillSmall,
                          {
                            width: `${(achievement.progress / (achievement.target || 1)) * 100}%`,
                            backgroundColor: colors.primary,
                          },
                        ]}
                      />
                    </View>
                    <ThemedText style={[styles.progressText, { color: colors.muted }]}>
                      {achievement.progress}/{achievement.target}
                    </ThemedText>
                  </View>
                )}
                {achievement.unlocked && (
                  <ThemedText style={[styles.unlockedText, { color: colors.success }]}>✓ Unlocked</ThemedText>
                )}
              </View>
            ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    marginHorizontal: 20,
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
    paddingHorizontal: 14,
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
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  achievementCard: {
    width: '46%',
    margin: '2%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  achievementDesc: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
  },
  achievementProgress: {
    width: '100%',
    marginTop: 8,
  },
  progressBarSmall: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFillSmall: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  },
  unlockedText: {
    fontSize: 11,
    marginTop: 8,
  },
});
