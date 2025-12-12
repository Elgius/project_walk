import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { CircularProgress } from '@/components/circular-progress';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function BusinessProfileScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const router = useRouter();

  // Mock business data
  const business = {
    business_name: 'Coffee Corner',
    description: 'A cozy neighborhood coffee shop',
  };

  // Mock stats
  const stats = {
    redemptionsToday: 12,
    redemptionGoal: 20,
    totalCustomers: 142,
    pointsGiven: 8450,
    activeRewards: 5,
    monthlyRedemptions: 67,
  };

  const redemptionPercentage = Math.round((stats.redemptionsToday / stats.redemptionGoal) * 100);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={[styles.logo, { backgroundColor: colors.secondary }]}>
              <ThemedText style={styles.logoText}>
                {getInitials(business.business_name)}
              </ThemedText>
            </View>
            <View style={styles.greetingContainer}>
              <ThemedText style={[styles.greetingText, { color: colors.muted }]}>
                Welcome back,
              </ThemedText>
              <ThemedText style={[styles.businessName, { color: colors.text }]}>
                {business.business_name}
              </ThemedText>
            </View>
          </View>
          <View style={[styles.rewardsBadge, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <MaterialIcons name="card-giftcard" size={20} color={colors.primary} />
            <ThemedText style={[styles.rewardsCount, { color: colors.text }]}>
              {stats.activeRewards}
            </ThemedText>
          </View>
        </View>

        {/* Today's Activity Title */}
        <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
          Today's Activity
        </ThemedText>

        {/* Hero Progress Ring */}
        <View style={[styles.progressCard, { backgroundColor: colors.card }]}>
          <CircularProgress
            size={200}
            strokeWidth={12}
            progress={redemptionPercentage}
            progressColor={colors.secondary}
            backgroundColor={colors.border}
          >
            <ThemedText style={[styles.heroNumber, { color: colors.text }]}>
              {stats.redemptionsToday}
            </ThemedText>
            <ThemedText style={[styles.heroLabel, { color: colors.muted }]}>
              Redemptions Today
            </ThemedText>
            <View style={[styles.percentageBadge, { backgroundColor: 'rgba(91, 127, 255, 0.2)' }]}>
              <ThemedText style={[styles.percentageText, { color: colors.secondary }]}>
                {redemptionPercentage}% of goal
              </ThemedText>
            </View>
          </CircularProgress>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={[styles.statIconContainer, { backgroundColor: 'rgba(245, 169, 98, 0.15)' }]}>
              <MaterialIcons name="people" size={24} color={colors.primary} />
            </View>
            <ThemedText style={[styles.statValue, { color: colors.text }]}>
              {stats.totalCustomers}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.muted }]}>
              Customers
            </ThemedText>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={[styles.statIconContainer, { backgroundColor: 'rgba(91, 127, 255, 0.15)' }]}>
              <MaterialIcons name="trending-up" size={24} color={colors.secondary} />
            </View>
            <ThemedText style={[styles.statValue, { color: colors.text }]}>
              {stats.pointsGiven.toLocaleString()}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.muted }]}>
              Points Given
            </ThemedText>
          </View>
        </View>

        {/* Scan QR Banner */}
        <Pressable style={styles.scanBanner}>
          <View style={styles.bannerContent}>
            <View style={styles.bannerTextContainer}>
              <View style={styles.bannerTitleRow}>
                <ThemedText style={styles.bannerTitle}>Scan QR</ThemedText>
                <MaterialIcons name="arrow-forward" size={20} color="#1C1E2D" style={styles.bannerArrow} />
              </View>
              <ThemedText style={styles.bannerSubtitle}>
                Validate customer redemptions
              </ThemedText>
            </View>
            <View style={styles.bannerIconContainer}>
              <View style={styles.bannerIconBg}>
                <MaterialIcons name="qr-code-scanner" size={50} color="rgba(28, 30, 45, 0.4)" />
              </View>
            </View>
          </View>
        </Pressable>

        {/* Quick Actions */}
        <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
          Quick Actions
        </ThemedText>

        <View style={styles.actionsRow}>
          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              { backgroundColor: colors.card },
              pressed && styles.actionPressed
            ]}
            onPress={() => router.push('/business/rewards')}
          >
            <View style={[styles.actionIconContainer, { backgroundColor: 'rgba(76, 175, 80, 0.15)' }]}>
              <MaterialIcons name="add-circle-outline" size={28} color={colors.success} />
            </View>
            <ThemedText style={[styles.actionLabel, { color: colors.text }]}>
              Add Reward
            </ThemedText>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              { backgroundColor: colors.card },
              pressed && styles.actionPressed
            ]}
            onPress={() => router.push('/business/analytics')}
          >
            <View style={[styles.actionIconContainer, { backgroundColor: 'rgba(245, 169, 98, 0.15)' }]}>
              <MaterialIcons name="bar-chart" size={28} color={colors.primary} />
            </View>
            <ThemedText style={[styles.actionLabel, { color: colors.text }]}>
              Analytics
            </ThemedText>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              { backgroundColor: colors.card },
              pressed && styles.actionPressed
            ]}
          >
            <View style={[styles.actionIconContainer, { backgroundColor: 'rgba(91, 127, 255, 0.15)' }]}>
              <MaterialIcons name="settings" size={28} color={colors.secondary} />
            </View>
            <ThemedText style={[styles.actionLabel, { color: colors.text }]}>
              Settings
            </ThemedText>
          </Pressable>
        </View>

        <View style={{ height: 30 }} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  greetingContainer: {
    marginLeft: 12,
  },
  greetingText: {
    fontSize: 14,
    opacity: 0.8,
  },
  businessName: {
    fontSize: 16,
    fontWeight: '600',
  },
  rewardsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  rewardsCount: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 16,
  },
  progressCard: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 16,
  },
  heroNumber: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  heroLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  percentageBadge: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10,
  },
  percentageText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
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
  },
  statLabel: {
    fontSize: 14,
    marginTop: 2,
  },
  scanBanner: {
    backgroundColor: '#5B7FFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bannerArrow: {
    marginLeft: 8,
    color: '#FFFFFF',
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 4,
  },
  bannerIconContainer: {
    width: 80,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerIconBg: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  actionPressed: {
    opacity: 0.7,
  },
  actionIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
