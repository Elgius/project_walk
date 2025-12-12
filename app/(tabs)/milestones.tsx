import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type MilestoneStatus = 'completed' | 'in_progress' | 'locked';

type Milestone = {
  id: string;
  targetSteps: number;
  currentSteps: number;
  points: number;
  status: MilestoneStatus;
};

const milestones: Milestone[] = [
  { id: '1', targetSteps: 20000, currentSteps: 20000, points: 100, status: 'completed' },
  { id: '2', targetSteps: 10000, currentSteps: 6000, points: 50, status: 'in_progress' },
  { id: '3', targetSteps: 5000, currentSteps: 0, points: 25, status: 'locked' },
];

export default function MilestonesScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const getIconForStatus = (status: MilestoneStatus) => {
    switch (status) {
      case 'completed':
        return { name: 'check-circle' as const, color: colors.success };
      case 'in_progress':
        return { name: 'directions-walk' as const, color: colors.primary };
      case 'locked':
        return { name: 'lock' as const, color: colors.muted };
    }
  };

  const getStepsText = (milestone: Milestone) => {
    if (milestone.status === 'completed') {
      return `${milestone.targetSteps.toLocaleString()} steps`;
    }
    if (milestone.status === 'in_progress') {
      return `${milestone.currentSteps.toLocaleString()}/${milestone.targetSteps.toLocaleString()} steps`;
    }
    return `${milestone.currentSteps} steps`;
  };

  const getCardOpacity = (status: MilestoneStatus) => {
    return status === 'locked' ? 0.6 : 1;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedText style={[styles.title, { color: colors.text }]}>Milestones</ThemedText>

        {milestones.map((milestone) => {
          const icon = getIconForStatus(milestone.status);
          const opacity = getCardOpacity(milestone.status);
          const progress = milestone.targetSteps > 0
            ? (milestone.currentSteps / milestone.targetSteps) * 100
            : 0;
          const progressColor =
            milestone.status === 'completed'
              ? colors.success
              : milestone.status === 'in_progress'
              ? colors.primary
              : colors.muted;

          return (
            <View
              key={milestone.id}
              style={[
                styles.card,
                { backgroundColor: colors.card, opacity },
              ]}
            >
              <View style={styles.cardContent}>
                <View style={styles.textContainer}>
                  <ThemedText
                    style={[
                      styles.stepsText,
                      {
                        color:
                          milestone.status === 'in_progress'
                            ? colors.primary
                            : colors.text,
                      },
                    ]}
                  >
                    {getStepsText(milestone)}
                  </ThemedText>
                  <ThemedText
                    style={[
                      styles.pointsText,
                      {
                        color:
                          milestone.status === 'in_progress'
                            ? colors.primary
                            : colors.muted,
                      },
                    ]}
                  >
                    ({milestone.points} points)
                  </ThemedText>
                </View>

                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor:
                        milestone.status === 'completed'
                          ? 'rgba(76, 175, 80, 0.15)'
                          : milestone.status === 'in_progress'
                          ? 'rgba(245, 169, 98, 0.15)'
                          : 'rgba(142, 142, 147, 0.15)',
                    },
                  ]}
                >
                  <MaterialIcons name={icon.name} size={28} color={icon.color} />
                </View>
              </View>

              <View style={[styles.progressBarContainer, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${Math.min(progress, 100)}%`,
                      backgroundColor: progressColor,
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    // textAlign: 'center',
    marginTop: 20,
    marginBottom: 24,
    marginLeft: 10,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingRight: 8,
  },
  stepsText: {
    fontSize: 18,
    fontWeight: '600',
  },
  pointsText: {
    fontSize: 14,
    marginTop: 4,
  },
  progressBarContainer: {
    height: 6,
    borderRadius: 3,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
});
