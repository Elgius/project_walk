import { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

type Achievement = {
  id: string;
  title: string;
  description: string;
  requirement: number;
  type: 'steps' | 'distance';
  unlocked: boolean;
  progress: number;
  icon: MaterialIconName;
  reward: string;
  tip: string;
};

export default function AchievementsScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Mock user progress
  const userProgress = {
    totalSteps: 45000,
    totalDistance: 35, // km
  };

  // Achievement definitions with unique icons
  const achievements: Achievement[] = [
    // Steps-based achievements
    {
      id: 'steps-1k',
      title: 'First Steps',
      description: 'Walk your first 1,000 steps',
      requirement: 1000,
      type: 'steps',
      unlocked: userProgress.totalSteps >= 1000,
      progress: Math.min(userProgress.totalSteps / 1000, 1),
      icon: 'directions-walk',
      reward: '10 bonus points',
      tip: 'Every journey begins with a single step!',
    },
    {
      id: 'steps-5k',
      title: 'Getting Started',
      description: 'Walk 5,000 steps total',
      requirement: 5000,
      type: 'steps',
      unlocked: userProgress.totalSteps >= 5000,
      progress: Math.min(userProgress.totalSteps / 5000, 1),
      icon: 'trending-up',
      reward: '25 bonus points',
      tip: 'You\'re building a healthy habit!',
    },
    {
      id: 'steps-10k',
      title: 'Daily Walker',
      description: 'Walk 10,000 steps total',
      requirement: 10000,
      type: 'steps',
      unlocked: userProgress.totalSteps >= 10000,
      progress: Math.min(userProgress.totalSteps / 10000, 1),
      icon: 'directions-run',
      reward: '50 bonus points',
      tip: '10,000 steps is the golden standard for daily activity!',
    },
    {
      id: 'steps-50k',
      title: 'Week Warrior',
      description: 'Walk 50,000 steps total',
      requirement: 50000,
      type: 'steps',
      unlocked: userProgress.totalSteps >= 50000,
      progress: Math.min(userProgress.totalSteps / 50000, 1),
      icon: 'whatshot',
      reward: '100 bonus points',
      tip: 'Consistency is key to reaching your goals!',
    },
    {
      id: 'steps-100k',
      title: 'Step Master',
      description: 'Walk 100,000 steps total',
      requirement: 100000,
      type: 'steps',
      unlocked: userProgress.totalSteps >= 100000,
      progress: Math.min(userProgress.totalSteps / 100000, 1),
      icon: 'star',
      reward: '250 bonus points',
      tip: 'You\'re a true walking champion!',
    },
    // Distance-based achievements
    {
      id: 'dist-1km',
      title: 'First Kilometer',
      description: 'Walk your first kilometer',
      requirement: 1,
      type: 'distance',
      unlocked: userProgress.totalDistance >= 1,
      progress: Math.min(userProgress.totalDistance / 1, 1),
      icon: 'place',
      reward: '10 bonus points',
      tip: 'The first kilometer is always the hardest!',
    },
    {
      id: 'dist-5km',
      title: 'Park Explorer',
      description: 'Walk 5 kilometers total',
      requirement: 5,
      type: 'distance',
      unlocked: userProgress.totalDistance >= 5,
      progress: Math.min(userProgress.totalDistance / 5, 1),
      icon: 'nature-people',
      reward: '25 bonus points',
      tip: 'Explore your local parks and nature trails!',
    },
    {
      id: 'dist-10km',
      title: 'City Walker',
      description: 'Walk 10 kilometers total',
      requirement: 10,
      type: 'distance',
      unlocked: userProgress.totalDistance >= 10,
      progress: Math.min(userProgress.totalDistance / 10, 1),
      icon: 'location-city',
      reward: '50 bonus points',
      tip: 'Discover hidden gems in your city!',
    },
    {
      id: 'dist-50km',
      title: 'Marathon Ready',
      description: 'Walk 50 kilometers total',
      requirement: 50,
      type: 'distance',
      unlocked: userProgress.totalDistance >= 50,
      progress: Math.min(userProgress.totalDistance / 50, 1),
      icon: 'flag',
      reward: '100 bonus points',
      tip: 'You\'ve walked more than a marathon distance!',
    },
    {
      id: 'dist-100km',
      title: 'Distance Champion',
      description: 'Walk 100 kilometers total',
      requirement: 100,
      type: 'distance',
      unlocked: userProgress.totalDistance >= 100,
      progress: Math.min(userProgress.totalDistance / 100, 1),
      icon: 'emoji-events',
      reward: '250 bonus points',
      tip: 'You\'re an unstoppable force!',
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  const formatRequirement = (achievement: Achievement) => {
    if (achievement.type === 'steps') {
      return `${achievement.requirement.toLocaleString()} steps`;
    }
    return `${achievement.requirement} km`;
  };

  const getProgressText = (achievement: Achievement) => {
    if (achievement.unlocked) return 'Completed';
    if (achievement.type === 'steps') {
      return `${userProgress.totalSteps.toLocaleString()} / ${achievement.requirement.toLocaleString()}`;
    }
    return `${userProgress.totalDistance} / ${achievement.requirement} km`;
  };

  const getProgressValue = (achievement: Achievement) => {
    if (achievement.type === 'steps') {
      return userProgress.totalSteps;
    }
    return userProgress.totalDistance;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={[styles.backButton, { backgroundColor: colors.card }]}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <ThemedText style={[styles.title, { color: colors.text }]}>Achievements</ThemedText>
          <View style={styles.placeholder} />
        </View>

        {/* Progress Summary */}
        <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <MaterialIcons name="emoji-events" size={40} color={colors.primary} />
          <View style={styles.summaryText}>
            <ThemedText style={[styles.summaryCount, { color: colors.text }]}>
              {unlockedCount} / {achievements.length}
            </ThemedText>
            <ThemedText style={[styles.summaryLabel, { color: colors.muted }]}>
              Achievements Unlocked
            </ThemedText>
          </View>
        </View>

        {/* Achievements List */}
        <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
          All Achievements
        </ThemedText>

        {achievements.map((achievement) => (
          <Pressable
            key={achievement.id}
            style={({ pressed }) => [
              styles.achievementCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              !achievement.unlocked && styles.lockedCard,
              pressed && styles.cardPressed,
            ]}
            onPress={() => setSelectedAchievement(achievement)}
          >
            <View style={styles.achievementContent}>
              <View style={styles.achievementHeader}>
                <ThemedText
                  style={[
                    styles.achievementTitle,
                    { color: achievement.unlocked ? colors.text : colors.muted },
                  ]}
                >
                  {achievement.title}
                </ThemedText>
                {achievement.unlocked && (
                  <MaterialIcons name="check-circle" size={20} color={colors.success} />
                )}
              </View>

              <ThemedText style={[styles.achievementDesc, { color: colors.muted }]}>
                {formatRequirement(achievement)}
              </ThemedText>

              {!achievement.unlocked && (
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          backgroundColor: colors.secondary,
                          width: `${achievement.progress * 100}%`,
                        },
                      ]}
                    />
                  </View>
                  <ThemedText style={[styles.progressText, { color: colors.muted }]}>
                    {getProgressText(achievement)}
                  </ThemedText>
                </View>
              )}
            </View>
          </Pressable>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Achievement Detail Modal */}
      <Modal
        visible={selectedAchievement !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedAchievement(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSelectedAchievement(null)}
        >
          <Pressable
            style={[styles.modalContent, { backgroundColor: colors.card }]}
            onPress={(e) => e.stopPropagation()}
          >
            {selectedAchievement && (
              <>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <View
                    style={[
                      styles.modalIconContainer,
                      {
                        backgroundColor: selectedAchievement.unlocked
                          ? 'rgba(76, 175, 80, 0.15)'
                          : 'rgba(114, 113, 105, 0.15)',
                      },
                    ]}
                  >
                    <MaterialIcons
                      name={selectedAchievement.icon}
                      size={48}
                      color={selectedAchievement.unlocked ? colors.success : colors.muted}
                    />
                  </View>
                  <Pressable
                    style={[styles.closeButton, { backgroundColor: colors.border }]}
                    onPress={() => setSelectedAchievement(null)}
                  >
                    <MaterialIcons name="close" size={20} color={colors.text} />
                  </Pressable>
                </View>

                {/* Achievement Title & Status */}
                <ThemedText style={[styles.modalTitle, { color: colors.text }]}>
                  {selectedAchievement.title}
                </ThemedText>

                <View style={[
                  styles.statusBadge,
                  { backgroundColor: selectedAchievement.unlocked ? 'rgba(76, 175, 80, 0.15)' : 'rgba(114, 113, 105, 0.15)' }
                ]}>
                  <MaterialIcons
                    name={selectedAchievement.unlocked ? 'check-circle' : 'lock'}
                    size={16}
                    color={selectedAchievement.unlocked ? colors.success : colors.muted}
                  />
                  <ThemedText style={[
                    styles.statusText,
                    { color: selectedAchievement.unlocked ? colors.success : colors.muted }
                  ]}>
                    {selectedAchievement.unlocked ? 'Unlocked' : 'Locked'}
                  </ThemedText>
                </View>

                {/* Description */}
                <ThemedText style={[styles.modalDescription, { color: colors.muted }]}>
                  {selectedAchievement.description}
                </ThemedText>

                {/* Progress Section */}
                <View style={[styles.modalSection, { borderColor: colors.border }]}>
                  <ThemedText style={[styles.modalSectionTitle, { color: colors.text }]}>
                    Progress
                  </ThemedText>
                  <View style={styles.modalProgressContainer}>
                    <View style={[styles.modalProgressBar, { backgroundColor: colors.border }]}>
                      <View
                        style={[
                          styles.modalProgressFill,
                          {
                            backgroundColor: selectedAchievement.unlocked ? colors.success : colors.secondary,
                            width: `${selectedAchievement.progress * 100}%`,
                          },
                        ]}
                      />
                    </View>
                    <ThemedText style={[styles.modalProgressText, { color: colors.text }]}>
                      {getProgressValue(selectedAchievement).toLocaleString()} / {formatRequirement(selectedAchievement)}
                    </ThemedText>
                  </View>
                </View>

                {/* Reward Section */}
                <View style={[styles.modalSection, { borderColor: colors.border }]}>
                  <ThemedText style={[styles.modalSectionTitle, { color: colors.text }]}>
                    Reward
                  </ThemedText>
                  <View style={styles.rewardRow}>
                    <MaterialIcons name="card-giftcard" size={20} color={colors.primary} />
                    <ThemedText style={[styles.rewardText, { color: colors.text }]}>
                      {selectedAchievement.reward}
                    </ThemedText>
                  </View>
                </View>

                {/* Tip Section */}
                <View style={[styles.tipContainer, { backgroundColor: 'rgba(91, 127, 255, 0.1)' }]}>
                  <MaterialIcons name="lightbulb" size={20} color={colors.secondary} />
                  <ThemedText style={[styles.tipText, { color: colors.text }]}>
                    {selectedAchievement.tip}
                  </ThemedText>
                </View>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
    gap: 16,
  },
  summaryText: {
    flex: 1,
  },
  summaryCount: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  summaryLabel: {
    fontSize: 14,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  achievementCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 8,
    gap: 12,
  },
  lockedCard: {
    opacity: 0.7,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementContent: {
    flex: 1,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  achievementDesc: {
    fontSize: 13,
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    marginTop: 4,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 20,
    padding: 24,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  modalDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalSection: {
    borderTopWidth: 1,
    paddingTop: 16,
    marginBottom: 16,
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  modalProgressContainer: {
    gap: 8,
  },
  modalProgressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  modalProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  modalProgressText: {
    fontSize: 13,
    textAlign: 'center',
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rewardText: {
    fontSize: 14,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 12,
    gap: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
});
