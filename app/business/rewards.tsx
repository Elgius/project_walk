import { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Reward = {
  id: string;
  title: string;
  description: string;
  points: number;
  redemptions: number;
  active: boolean;
  icon: string;
};

export default function BusinessRewardsScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active');

  // Mock rewards data
  const allRewards: Reward[] = [
    { id: '1', title: '$5 Coffee Voucher', description: 'Valid for any drink', points: 500, redemptions: 45, active: true, icon: '☕' },
    { id: '2', title: '10% Store Discount', description: 'Any item in store', points: 300, redemptions: 89, active: true, icon: '🛍️' },
    { id: '3', title: 'Free Pastry', description: 'Choice of pastry', points: 200, redemptions: 123, active: true, icon: '🥐' },
    { id: '4', title: 'Buy 1 Get 1 Free', description: 'On select drinks', points: 400, redemptions: 12, active: false, icon: '🎁' },
    { id: '5', title: 'Free Size Upgrade', description: 'Any drink size up', points: 150, redemptions: 67, active: true, icon: '⬆️' },
    { id: '6', title: 'Loyalty Mug', description: 'Exclusive branded mug', points: 800, redemptions: 8, active: false, icon: '🍵' },
  ];

  const activeRewards = allRewards.filter((r) => r.active);
  const inactiveRewards = allRewards.filter((r) => !r.active);
  const displayedRewards = activeTab === 'active' ? activeRewards : inactiveRewards;

  const totalRedemptions = allRewards.reduce((sum, r) => sum + r.redemptions, 0);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <ThemedText style={[styles.title, { color: colors.text }]}>Manage Rewards</ThemedText>
          <View style={styles.placeholder} />
        </View>

        {/* Summary Card */}
        <View style={[styles.summaryCard, { backgroundColor: colors.primary }]}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <ThemedText style={styles.summaryValue}>{activeRewards.length}</ThemedText>
              <ThemedText style={styles.summaryLabel}>Active</ThemedText>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <ThemedText style={styles.summaryValue}>{totalRedemptions}</ThemedText>
              <ThemedText style={styles.summaryLabel}>Total Redeemed</ThemedText>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={[styles.tabsContainer, { backgroundColor: colors.card }]}>
          <Pressable
            style={[
              styles.tab,
              activeTab === 'active' && { backgroundColor: colors.primary },
            ]}
            onPress={() => setActiveTab('active')}
          >
            <ThemedText
              style={[
                styles.tabText,
                { color: activeTab === 'active' ? colors.background : colors.muted },
              ]}
            >
              Active ({activeRewards.length})
            </ThemedText>
          </Pressable>
          <Pressable
            style={[
              styles.tab,
              activeTab === 'inactive' && { backgroundColor: colors.primary },
            ]}
            onPress={() => setActiveTab('inactive')}
          >
            <ThemedText
              style={[
                styles.tabText,
                { color: activeTab === 'inactive' ? colors.background : colors.muted },
              ]}
            >
              Inactive ({inactiveRewards.length})
            </ThemedText>
          </Pressable>
        </View>

        {/* Rewards List */}
        {displayedRewards.length === 0 ? (
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyIcon}>📭</ThemedText>
            <ThemedText style={{ color: colors.muted }}>
              No {activeTab} rewards
            </ThemedText>
          </View>
        ) : (
          displayedRewards.map((reward) => (
            <View
              key={reward.id}
              style={[styles.rewardCard, { backgroundColor: colors.card }]}
            >
              <View style={styles.rewardIcon}>
                <ThemedText style={styles.rewardIconText}>{reward.icon}</ThemedText>
              </View>
              <View style={styles.rewardInfo}>
                <ThemedText style={[styles.rewardTitle, { color: colors.text }]}>
                  {reward.title}
                </ThemedText>
                <ThemedText style={[styles.rewardDesc, { color: colors.muted }]}>
                  {reward.description}
                </ThemedText>
                <View style={styles.rewardMeta}>
                  <View style={[styles.pointsBadge, { backgroundColor: `${colors.primary}20` }]}>
                    <ThemedText style={[styles.pointsText, { color: colors.primary }]}>
                      {reward.points} pts
                    </ThemedText>
                  </View>
                  <View style={styles.redemptionsBadge}>
                    <MaterialIcons name="redeem" size={14} color={colors.muted} />
                    <ThemedText style={[styles.redemptionsText, { color: colors.muted }]}>
                      {reward.redemptions} redeemed
                    </ThemedText>
                  </View>
                </View>
              </View>
              <Pressable style={[styles.editButton, { backgroundColor: colors.border }]}>
                <MaterialIcons name="edit" size={18} color={colors.text} />
              </Pressable>
            </View>
          ))
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Add Button */}
      <Pressable
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => {
          // Placeholder for add reward action
        }}
      >
        <MaterialIcons name="add" size={28} color="#fff" />
      </Pressable>
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
  summaryCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
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
    fontSize: 14,
    fontWeight: '600',
  },
  rewardCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  rewardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardIconText: {
    fontSize: 28,
  },
  rewardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  rewardDesc: {
    fontSize: 13,
    marginTop: 2,
  },
  rewardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 10,
  },
  pointsBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '600',
  },
  redemptionsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  redemptionsText: {
    fontSize: 12,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
