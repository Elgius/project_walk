import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from '@/app/Theme/colors';

// Types
type Period = 'today' | 'week' | 'month' | 'all';

interface PeriodData {
  total_steps: number;
  average_daily_steps: number;
  best_day_steps: number;
  best_day_date: string;
  active_days: number;
}

// Mock Data
const mockStepsByPeriod: Record<Period, PeriodData> = {
  today: {
    total_steps: 2300,
    average_daily_steps: 2300,
    best_day_steps: 2300,
    best_day_date: 'Today',
    active_days: 1,
  },
  week: {
    total_steps: 8500,
    average_daily_steps: 1214,
    best_day_steps: 3200,
    best_day_date: 'Monday',
    active_days: 5,
  },
  month: {
    total_steps: 45000,
    average_daily_steps: 1500,
    best_day_steps: 4200,
    best_day_date: 'Dec 5',
    active_days: 18,
  },
  all: {
    total_steps: 125000,
    average_daily_steps: 1650,
    best_day_steps: 5800,
    best_day_date: 'Nov 12',
    active_days: 150,
  },
};

const mockWeeklyComparison = {
  current_week_steps: 8500,
  previous_week_steps: 7200,
  change_percent: 18.1,
  trend: 'up' as const,
};

const mockWeeklyPattern = {
  Mon: 3200,
  Tue: 2800,
  Wed: 3100,
  Thu: 2500,
  Fri: 2900,
  Sat: 1800,
  Sun: 2100,
};

const mockEngagement = {
  current_streak: 5,
  longest_streak: 12,
  engagement_score: 75,
  consistency_percent: 60,
};

const mockPoints = {
  current_balance: 500,
  total_earned: 750,
  total_spent: 250,
};

const mockNextMilestone = {
  title: 'Marathon Walker',
  progress_percent: 83.3,
  steps_remaining: 25000,
};

export default function AnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('week');
  const periodData = mockStepsByPeriod[selectedPeriod];

  const periods: { key: Period; label: string }[] = [
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
    { key: 'all', label: 'All Time' },
  ];

  // Get max value for weekly pattern bar scaling
  const maxSteps = Math.max(...Object.values(mockWeeklyPattern));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
        </View>

        {/* Period Tabs */}
        <View style={styles.periodTabs}>
          {periods.map((period) => (
            <Pressable
              key={period.key}
              style={[
                styles.periodTab,
                selectedPeriod === period.key && styles.periodTabActive,
              ]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text
                style={[
                  styles.periodTabText,
                  selectedPeriod === period.key && styles.periodTabTextActive,
                ]}
              >
                {period.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: 'rgba(255, 160, 102, 0.15)' }]}>
              <MaterialIcons name="directions-walk" size={24} color={colors.accent} />
            </View>
            <Text style={styles.statValue}>{periodData.total_steps.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Steps</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: 'rgba(126, 156, 216, 0.15)' }]}>
              <MaterialIcons name="show-chart" size={24} color={colors.accentBlue} />
            </View>
            <Text style={styles.statValue}>{periodData.average_daily_steps.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Daily Average</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: 'rgba(118, 148, 106, 0.15)' }]}>
              <MaterialIcons name="emoji-events" size={24} color={colors.success} />
            </View>
            <Text style={styles.statValue}>{periodData.best_day_steps.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Best Day</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: 'rgba(255, 160, 102, 0.15)' }]}>
              <MaterialIcons name="calendar-today" size={24} color={colors.accent} />
            </View>
            <Text style={styles.statValue}>{periodData.active_days}</Text>
            <Text style={styles.statLabel}>Active Days</Text>
          </View>
        </View>

        {/* Weekly Comparison Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Progress</Text>
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonItem}>
              <Text style={styles.comparisonLabel}>This Week</Text>
              <Text style={styles.comparisonValue}>
                {mockWeeklyComparison.current_week_steps.toLocaleString()}
              </Text>
            </View>
            <View style={styles.comparisonArrow}>
              <MaterialIcons
                name={mockWeeklyComparison.trend === 'up' ? 'trending-up' : 'trending-down'}
                size={32}
                color={mockWeeklyComparison.trend === 'up' ? colors.success : colors.warning}
              />
              <Text
                style={[
                  styles.changePercent,
                  { color: mockWeeklyComparison.trend === 'up' ? colors.success : colors.warning },
                ]}
              >
                {mockWeeklyComparison.trend === 'up' ? '+' : '-'}
                {mockWeeklyComparison.change_percent}%
              </Text>
            </View>
            <View style={styles.comparisonItem}>
              <Text style={styles.comparisonLabel}>Last Week</Text>
              <Text style={[styles.comparisonValue, { color: colors.textSecondary }]}>
                {mockWeeklyComparison.previous_week_steps.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Weekly Activity Pattern */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Activity</Text>
          <View style={styles.patternContainer}>
            {Object.entries(mockWeeklyPattern).map(([day, steps]) => (
              <View key={day} style={styles.patternRow}>
                <Text style={styles.patternDay}>{day}</Text>
                <View style={styles.patternBarContainer}>
                  <View
                    style={[
                      styles.patternBar,
                      { width: `${(steps / maxSteps) * 100}%` },
                    ]}
                  />
                </View>
                <Text style={styles.patternSteps}>{(steps / 1000).toFixed(1)}k</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Streak & Engagement Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Engagement</Text>
          <View style={styles.engagementRow}>
            <View style={styles.engagementItem}>
              <View style={styles.streakIcon}>
                <MaterialIcons name="local-fire-department" size={28} color={colors.accent} />
              </View>
              <Text style={styles.engagementValue}>{mockEngagement.current_streak}</Text>
              <Text style={styles.engagementLabel}>Day Streak</Text>
            </View>
            <View style={styles.engagementDivider} />
            <View style={styles.engagementItem}>
              <View style={styles.streakIcon}>
                <MaterialIcons name="military-tech" size={28} color={colors.accentBlue} />
              </View>
              <Text style={styles.engagementValue}>{mockEngagement.longest_streak}</Text>
              <Text style={styles.engagementLabel}>Best Streak</Text>
            </View>
            <View style={styles.engagementDivider} />
            <View style={styles.engagementItem}>
              <View style={styles.streakIcon}>
                <MaterialIcons name="speed" size={28} color={colors.success} />
              </View>
              <Text style={styles.engagementValue}>{mockEngagement.engagement_score}%</Text>
              <Text style={styles.engagementLabel}>Score</Text>
            </View>
          </View>
        </View>

        {/* Points Summary Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Points</Text>
            <View style={styles.pointsBadge}>
              <MaterialIcons name="stars" size={16} color={colors.accent} />
              <Text style={styles.pointsBadgeText}>{mockPoints.current_balance}</Text>
            </View>
          </View>
          <View style={styles.pointsRow}>
            <View style={styles.pointsItem}>
              <Text style={[styles.pointsValue, { color: colors.success }]}>
                +{mockPoints.total_earned}
              </Text>
              <Text style={styles.pointsLabel}>Earned</Text>
            </View>
            <View style={styles.pointsItem}>
              <Text style={[styles.pointsValue, { color: colors.warning }]}>
                -{mockPoints.total_spent}
              </Text>
              <Text style={styles.pointsLabel}>Spent</Text>
            </View>
          </View>
        </View>

        {/* Next Milestone Card */}
        <View style={[styles.card, styles.lastCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Next Milestone</Text>
            <MaterialIcons name="flag" size={20} color={colors.accent} />
          </View>
          <Text style={styles.milestoneName}>{mockNextMilestone.title}</Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${mockNextMilestone.progress_percent}%` },
              ]}
            />
          </View>
          <View style={styles.milestoneFooter}>
            <Text style={styles.milestoneProgress}>
              {mockNextMilestone.progress_percent.toFixed(1)}% complete
            </Text>
            <Text style={styles.milestoneRemaining}>
              {mockNextMilestone.steps_remaining.toLocaleString()} steps to go
            </Text>
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
  header: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  periodTabs: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  periodTabActive: {
    backgroundColor: colors.accent,
  },
  periodTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  periodTabTextActive: {
    color: colors.bg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    width: '47%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  lastCard: {
    marginBottom: 30,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  comparisonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  comparisonItem: {
    alignItems: 'center',
  },
  comparisonLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  comparisonValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  comparisonArrow: {
    alignItems: 'center',
  },
  changePercent: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  patternContainer: {
    gap: 10,
  },
  patternRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  patternDay: {
    width: 35,
    fontSize: 13,
    color: colors.textSecondary,
  },
  patternBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 160, 102, 0.15)',
    borderRadius: 4,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  patternBar: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  patternSteps: {
    width: 40,
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  engagementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  engagementItem: {
    alignItems: 'center',
    flex: 1,
  },
  engagementDivider: {
    width: 1,
    height: 50,
    backgroundColor: colors.textDisabled,
    opacity: 0.3,
  },
  streakIcon: {
    marginBottom: 8,
  },
  engagementValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  engagementLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 160, 102, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  pointsBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
  },
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pointsItem: {
    alignItems: 'center',
  },
  pointsValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pointsLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  milestoneName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 160, 102, 0.15)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  milestoneFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  milestoneProgress: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: '600',
  },
  milestoneRemaining: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
