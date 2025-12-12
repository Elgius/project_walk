import { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Period = 'today' | 'week' | 'month' | 'all';

interface PeriodData {
  redemptions: number;
  customers: number;
  pointsGiven: number;
  revenue: number;
}

export default function BusinessAnalyticsScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('week');

  // Mock data
  const periodData: Record<Period, PeriodData> = {
    today: { redemptions: 12, customers: 8, pointsGiven: 1200, revenue: 45 },
    week: { redemptions: 67, customers: 42, pointsGiven: 8450, revenue: 320 },
    month: { redemptions: 245, customers: 156, pointsGiven: 32000, revenue: 1250 },
    all: { redemptions: 890, customers: 412, pointsGiven: 125000, revenue: 4800 },
  };

  const weeklyComparison = {
    current: 67,
    previous: 52,
    changePercent: 28.8,
    trend: 'up' as const,
  };

  const weeklyPattern: Record<string, number> = {
    Mon: 12,
    Tue: 8,
    Wed: 15,
    Thu: 10,
    Fri: 14,
    Sat: 5,
    Sun: 3,
  };

  const topRewards = [
    { title: 'Free Pastry', redemptions: 123, icon: '🥐' },
    { title: '10% Discount', redemptions: 89, icon: '🛍️' },
    { title: '$5 Voucher', redemptions: 45, icon: '☕' },
  ];

  const periods: { key: Period; label: string }[] = [
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
    { key: 'all', label: 'All Time' },
  ];

  const data = periodData[selectedPeriod];
  const maxSteps = Math.max(...Object.values(weeklyPattern));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <ThemedText style={[styles.title, { color: colors.text }]}>Analytics</ThemedText>
          <View style={styles.placeholder} />
        </View>

        {/* Period Tabs */}
        <View style={[styles.tabsContainer, { backgroundColor: colors.card }]}>
          {periods.map((period) => (
            <Pressable
              key={period.key}
              style={[
                styles.tab,
                selectedPeriod === period.key && { backgroundColor: colors.primary },
              ]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  { color: selectedPeriod === period.key ? colors.background : colors.muted },
                ]}
              >
                {period.label}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={[styles.statIconContainer, { backgroundColor: 'rgba(91, 127, 255, 0.15)' }]}>
              <MaterialIcons name="redeem" size={24} color={colors.secondary} />
            </View>
            <ThemedText style={[styles.statValue, { color: colors.text }]}>
              {data.redemptions}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.muted }]}>
              Redemptions
            </ThemedText>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={[styles.statIconContainer, { backgroundColor: 'rgba(245, 169, 98, 0.15)' }]}>
              <MaterialIcons name="people" size={24} color={colors.primary} />
            </View>
            <ThemedText style={[styles.statValue, { color: colors.text }]}>
              {data.customers}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.muted }]}>
              Customers
            </ThemedText>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={[styles.statIconContainer, { backgroundColor: 'rgba(91, 127, 255, 0.15)' }]}>
              <MaterialIcons name="stars" size={24} color={colors.accent} />
            </View>
            <ThemedText style={[styles.statValue, { color: colors.text }]}>
              {data.pointsGiven.toLocaleString()}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.muted }]}>
              Points Given
            </ThemedText>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={[styles.statIconContainer, { backgroundColor: 'rgba(76, 175, 80, 0.15)' }]}>
              <MaterialIcons name="attach-money" size={24} color={colors.success} />
            </View>
            <ThemedText style={[styles.statValue, { color: colors.text }]}>
              ${data.revenue}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.muted }]}>
              Revenue
            </ThemedText>
          </View>
        </View>

        {/* Weekly Comparison */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <ThemedText style={[styles.cardTitle, { color: colors.text }]}>
            Weekly Progress
          </ThemedText>
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonItem}>
              <ThemedText style={[styles.comparisonLabel, { color: colors.muted }]}>
                This Week
              </ThemedText>
              <ThemedText style={[styles.comparisonValue, { color: colors.text }]}>
                {weeklyComparison.current}
              </ThemedText>
            </View>
            <View style={styles.comparisonArrow}>
              <MaterialIcons
                name={weeklyComparison.trend === 'up' ? 'trending-up' : 'trending-down'}
                size={32}
                color={weeklyComparison.trend === 'up' ? colors.success : colors.error}
              />
              <ThemedText
                style={[
                  styles.changePercent,
                  { color: weeklyComparison.trend === 'up' ? colors.success : colors.error },
                ]}
              >
                {weeklyComparison.trend === 'up' ? '+' : '-'}
                {weeklyComparison.changePercent}%
              </ThemedText>
            </View>
            <View style={styles.comparisonItem}>
              <ThemedText style={[styles.comparisonLabel, { color: colors.muted }]}>
                Last Week
              </ThemedText>
              <ThemedText style={[styles.comparisonValue, { color: colors.muted }]}>
                {weeklyComparison.previous}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Weekly Activity */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <ThemedText style={[styles.cardTitle, { color: colors.text }]}>
            Weekly Activity
          </ThemedText>
          <View style={styles.patternContainer}>
            {Object.entries(weeklyPattern).map(([day, count]) => (
              <View key={day} style={styles.patternRow}>
                <ThemedText style={[styles.patternDay, { color: colors.muted }]}>
                  {day}
                </ThemedText>
                <View style={[styles.patternBarContainer, { backgroundColor: `${colors.secondary}20` }]}>
                  <View
                    style={[
                      styles.patternBar,
                      { width: `${(count / maxSteps) * 100}%`, backgroundColor: colors.secondary },
                    ]}
                  />
                </View>
                <ThemedText style={[styles.patternCount, { color: colors.muted }]}>
                  {count}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Top Rewards */}
        <View style={[styles.card, { backgroundColor: colors.card, marginBottom: 30 }]}>
          <ThemedText style={[styles.cardTitle, { color: colors.text }]}>
            Top Rewards
          </ThemedText>
          {topRewards.map((reward, index) => (
            <View
              key={reward.title}
              style={[
                styles.topRewardRow,
                index < topRewards.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
              ]}
            >
              <View style={styles.topRewardLeft}>
                <ThemedText style={styles.topRewardRank}>#{index + 1}</ThemedText>
                <ThemedText style={styles.topRewardIcon}>{reward.icon}</ThemedText>
                <ThemedText style={[styles.topRewardTitle, { color: colors.text }]}>
                  {reward.title}
                </ThemedText>
              </View>
              <View style={[styles.topRewardBadge, { backgroundColor: `${colors.primary}20` }]}>
                <ThemedText style={[styles.topRewardCount, { color: colors.primary }]}>
                  {reward.redemptions}
                </ThemedText>
              </View>
            </View>
          ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
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
  tabsContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
  },
  statLabel: {
    fontSize: 13,
    marginTop: 2,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
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
    marginBottom: 4,
  },
  comparisonValue: {
    fontSize: 24,
    fontWeight: 'bold',
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
  },
  patternBarContainer: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  patternBar: {
    height: '100%',
    borderRadius: 4,
  },
  patternCount: {
    width: 30,
    fontSize: 12,
    textAlign: 'right',
  },
  topRewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  topRewardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  topRewardRank: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    width: 24,
  },
  topRewardIcon: {
    fontSize: 20,
  },
  topRewardTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  topRewardBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  topRewardCount: {
    fontSize: 14,
    fontWeight: '600',
  },
});
