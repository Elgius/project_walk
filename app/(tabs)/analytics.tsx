import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { CircularProgress } from '@/components/circular-progress';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AnalyticsScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  // Static data matching the design
  const steps = 20000;
  const stepsGoal = 10000;
  const stepsOverGoal = steps - stepsGoal;
  const percentage = Math.min(Math.round((steps / stepsGoal) * 100), 100);

  const activeMinutes = 60;
  const activeGoal = 90;
  const calories = 327;
  const caloriesGoal = 500;

  const totalSteps = 20000;
  const highestHourlySteps = 4200;
  const mostActiveMinutes = 60;
  const mostActiveTime = '5-6PM';

  const totalActiveMinutes = 60;
  const activeTimeGoal = 90;
  const activeMostActiveTime = '5-6PM';

  const totalBurned = 327;
  const restingCalories = 0;
  const activeCalories = 327;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedText style={[styles.title, { color: colors.text }]}>Analytics</ThemedText>

        {/* Main Progress Ring Card */}
        <View style={[styles.progressCard, { backgroundColor: colors.card }]}>
          <CircularProgress
            size={220}
            strokeWidth={13}
            progress={percentage}
            progressColor={colors.primary}
            backgroundColor={colors.border}
          >
            <ThemedText style={[styles.progressSteps, { color: colors.text }]}>
              {steps.toLocaleString()}
            </ThemedText>
            <ThemedText style={[styles.progressLabel, { color: colors.muted }]}>
              Steps completed
            </ThemedText>
            <View style={[styles.percentageBadge, { backgroundColor: 'rgba(245, 169, 98, 0.2)' }]}>
              <ThemedText style={[styles.percentageText, { color: colors.primary }]}>
                {percentage}%
              </ThemedText>
            </View>
          </CircularProgress>
        </View>

        {/* Stats Row - Steps, Active Time, Calories */}
        <View style={[styles.statsRow, { backgroundColor: colors.card }]}>
          <View style={styles.statItem}>
            <ThemedText style={[styles.statLabel, { color: colors.muted }]}>
              Steps
            </ThemedText>
            <ThemedText style={[styles.statValue, { color: colors.text }]}>
              {steps.toLocaleString()}
            </ThemedText>
            <ThemedText style={[styles.statSubtext, { color: colors.success }]}>
              +{stepsOverGoal.toLocaleString()} over goal
            </ThemedText>
          </View>

          <View style={styles.statItem}>
            <ThemedText style={[styles.statLabel, { color: colors.muted }]}>
              Active Time
            </ThemedText>
            <View style={styles.statValueRow}>
              <ThemedText style={[styles.statValue, { color: colors.text }]}>
                {activeMinutes}
              </ThemedText>
              <ThemedText style={[styles.statValueSmall, { color: colors.muted }]}>
                {' '}/ {activeGoal}
              </ThemedText>
              <ThemedText style={[styles.statUnit, { color: colors.muted }]}>
                {' '}mins
              </ThemedText>
            </View>
            <ThemedText style={[styles.statSubtext, { color: colors.primary }]}>
              Low activity
            </ThemedText>
          </View>

          <View style={styles.statItem}>
            <ThemedText style={[styles.statLabel, { color: colors.muted }]}>
              Calories
            </ThemedText>
            <View style={styles.statValueRow}>
              <ThemedText style={[styles.statValue, { color: colors.text }]}>
                {calories}
              </ThemedText>
              <ThemedText style={[styles.statValueSmall, { color: colors.muted }]}>
                {' '}/ {caloriesGoal}
              </ThemedText>
              <ThemedText style={[styles.statUnit, { color: colors.muted }]}>
                {' '}kcal
              </ThemedText>
            </View>
            <ThemedText style={[styles.statSubtext, { color: colors.primary }]}>
              Below target
            </ThemedText>
          </View>
        </View>

        {/* Steps (Hourly) Section */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
            Steps (Hourly)
          </ThemedText>
          <View style={styles.detailsGrid}>
            <View style={styles.detailRow}>
              <ThemedText style={[styles.detailLabel, { color: colors.muted }]}>
                Total steps
              </ThemedText>
              <ThemedText style={[styles.detailValue, { color: colors.text }]}>
                {totalSteps.toLocaleString()}
              </ThemedText>
            </View>
            <View style={styles.detailRow}>
              <ThemedText style={[styles.detailLabel, { color: colors.muted }]}>
                Highest hourly step c
              </ThemedText>
              <ThemedText style={[styles.detailValue, { color: colors.text }]}>
                {highestHourlySteps.toLocaleString()}
              </ThemedText>
            </View>
            <View style={styles.detailRow}>
              <ThemedText style={[styles.detailLabel, { color: colors.muted }]}>
                Most active minutes
              </ThemedText>
              <ThemedText style={[styles.detailValue, { color: colors.text }]}>
                {mostActiveMinutes} <ThemedText style={[styles.detailUnit, { color: colors.muted }]}>roo</ThemedText>
              </ThemedText>
            </View>
            <View style={styles.detailRow}>
              <ThemedText style={[styles.detailLabel, { color: colors.muted }]}>
                Most active time
              </ThemedText>
              <ThemedText style={[styles.detailValue, { color: colors.text }]}>
                {mostActiveTime}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Active Time & Calories Burned Section */}
        <View style={styles.bottomSections}>
          <View style={[styles.bottomCard, { backgroundColor: colors.card }]}>
            <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
              Active Time
            </ThemedText>
            <View style={styles.bottomDetails}>
              <View style={styles.bottomDetailRow}>
                <ThemedText style={[styles.detailLabel, { color: colors.muted }]}>
                  Total active minutes
                </ThemedText>
                <ThemedText style={[styles.detailValue, { color: colors.text }]}>
                  {totalActiveMinutes}
                </ThemedText>
              </View>
              <View style={styles.bottomDetailRow}>
                <ThemedText style={[styles.detailLabel, { color: colors.muted }]}>
                  Goal
                </ThemedText>
                <ThemedText style={[styles.detailValue, { color: colors.text }]}>
                  {activeTimeGoal} mins
                </ThemedText>
              </View>
              <View style={styles.bottomDetailRow}>
                <ThemedText style={[styles.detailLabel, { color: colors.muted }]}>
                  Most active time
                </ThemedText>
                <ThemedText style={[styles.detailValue, { color: colors.text }]}>
                  {activeMostActiveTime}
                </ThemedText>
              </View>
            </View>
          </View>

          <View style={[styles.bottomCard, { backgroundColor: colors.card }]}>
            <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
              Calories Burned
            </ThemedText>
            <View style={styles.bottomDetails}>
              <View style={styles.bottomDetailRow}>
                <ThemedText style={[styles.detailLabel, { color: colors.muted }]}>
                  Total burned
                </ThemedText>
                <ThemedText style={[styles.detailValue, { color: colors.text }]}>
                  {totalBurned} kcal
                </ThemedText>
              </View>
              <View style={styles.bottomDetailRow}>
                <ThemedText style={[styles.detailLabel, { color: colors.muted }]}>
                  Resting calories
                </ThemedText>
                <ThemedText style={[styles.detailValue, { color: colors.text }]}>
                  {restingCalories} kcal
                </ThemedText>
              </View>
              <View style={styles.bottomDetailRow}>
                <ThemedText style={[styles.detailLabel, { color: colors.muted }]}>
                  Active calories
                </ThemedText>
                <ThemedText style={[styles.detailValue, { color: colors.text }]}>
                  {activeCalories} kcal
                </ThemedText>
              </View>
            </View>
          </View>
        </View>
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
    marginTop: 40,
    marginBottom: 24,
    marginLeft: 10,
  },
  header: {
    paddingVertical: 16,
  },
  headerSteps: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerLabel: {
    fontSize: 14,
  },
  progressCard: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 16,
  },
  progressSteps: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  progressLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  percentageBadge: {
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 30,
    marginTop: 10,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statValueSmall: {
    fontSize: 14,
  },
  statUnit: {
    fontSize: 12,
  },
  statSubtext: {
    fontSize: 11,
    marginTop: 2,
  },
  sectionCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailRow: {
    width: '50%',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  detailUnit: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  bottomSections: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  bottomCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
  },
  bottomDetails: {
    gap: 12,
  },
  bottomDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
