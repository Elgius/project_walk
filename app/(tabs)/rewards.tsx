import { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Reward = {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
};

type RedeemedReward = {
  id: string;
  title: string;
  redeemedAt: string;
  code: string;
};

export default function RewardsScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const [activeTab, setActiveTab] = useState<'available' | 'redeemed'>('available');

  const userPoints = 1250;

  // Mock rewards data
  const availableRewards: Reward[] = [
    { id: '1', title: '$5 Coffee Voucher', description: 'Valid at partner cafes', points: 500, icon: '☕' },
    { id: '2', title: '10% Store Discount', description: 'Any item at SportMart', points: 300, icon: '🛍️' },
    { id: '3', title: 'Free Smoothie', description: 'At Juice Bar locations', points: 400, icon: '🥤' },
    { id: '4', title: '$10 Gift Card', description: 'Amazon digital gift card', points: 1000, icon: '🎁' },
    { id: '5', title: 'Movie Ticket', description: 'Any standard showing', points: 800, icon: '🎬' },
    { id: '6', title: 'Plant a Tree', description: 'We plant a tree in your name', points: 200, icon: '🌳' },
    { id: '7', title: 'Premium Week', description: '7 days of premium features', points: 600, icon: '⭐' },
    { id: '8', title: '$25 Running Shoes', description: 'Discount at ShoeWorld', points: 2000, icon: '👟' },
  ];

  const redeemedRewards: RedeemedReward[] = [
    { id: '1', title: 'Free Smoothie', redeemedAt: 'Dec 8, 2024', code: 'WALK-SMT-4829' },
    { id: '2', title: 'Plant a Tree', redeemedAt: 'Dec 1, 2024', code: 'TREE-PLT-1023' },
  ];

  const handleRedeem = (reward: Reward) => {
    if (userPoints < reward.points) {
      Alert.alert('Not enough points', `You need ${reward.points - userPoints} more points to redeem this reward.`);
    } else {
      Alert.alert('Redeem Reward', `Redeem ${reward.title} for ${reward.points} points?`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Redeem', onPress: () => console.log('Redeemed:', reward.title) },
      ]);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedText style={[styles.title, { color: colors.text }]}>Rewards</ThemedText>

        {/* Points Balance */}
        <View style={[styles.balanceCard, { backgroundColor: colors.secondary }]}>
          <ThemedText style={styles.balanceLabel}>Your Balance</ThemedText>
          <ThemedText style={styles.balanceValue}>{userPoints.toLocaleString()}</ThemedText>
          <ThemedText style={styles.balanceLabel}>points</ThemedText>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <Pressable
            style={[
              styles.tab,
              activeTab === 'available' && { borderBottomColor: colors.primary, borderBottomWidth: 2 },
            ]}
            onPress={() => setActiveTab('available')}
          >
            <ThemedText
              style={[styles.tabText, { color: activeTab === 'available' ? colors.primary : colors.muted }]}
            >
              Available
            </ThemedText>
          </Pressable>
          <Pressable
            style={[
              styles.tab,
              activeTab === 'redeemed' && { borderBottomColor: colors.primary, borderBottomWidth: 2 },
            ]}
            onPress={() => setActiveTab('redeemed')}
          >
            <ThemedText
              style={[styles.tabText, { color: activeTab === 'redeemed' ? colors.primary : colors.muted }]}
            >
              Redeemed
            </ThemedText>
          </Pressable>
        </View>

        {/* Content */}
        {activeTab === 'available' ? (
          <>
            {availableRewards.map((reward) => {
              const canAfford = userPoints >= reward.points;
              return (
                <View
                  key={reward.id}
                  style={[styles.rewardCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                  <View style={styles.rewardIcon}>
                    <ThemedText style={styles.rewardIconText}>{reward.icon}</ThemedText>
                  </View>
                  <View style={styles.rewardInfo}>
                    <ThemedText style={styles.rewardTitle}>{reward.title}</ThemedText>
                    <ThemedText style={[styles.rewardDesc, { color: colors.muted }]}>
                      {reward.description}
                    </ThemedText>
                    <View style={styles.rewardPointsRow}>
                      <ThemedText
                        style={[styles.rewardPointsValue, { color: canAfford ? colors.primary : colors.error }]}
                      >
                        {reward.points}
                      </ThemedText>
                      <ThemedText style={[styles.rewardPointsLabel, { color: colors.muted }]}> pts</ThemedText>
                    </View>
                  </View>
                  <Pressable
                    style={[
                      styles.redeemButton,
                      {
                        backgroundColor: canAfford ? colors.primary : colors.border,
                        opacity: canAfford ? 1 : 0.5,
                      },
                    ]}
                    onPress={() => handleRedeem(reward)}
                    disabled={!canAfford}
                  >
                    <ThemedText style={[styles.redeemButtonText, { color: canAfford ? '#fff' : colors.muted }]}>
                      Redeem
                    </ThemedText>
                  </Pressable>
                </View>
              );
            })}
          </>
        ) : (
          <>
            {redeemedRewards.length === 0 ? (
              <View style={styles.emptyState}>
                <ThemedText style={styles.emptyIcon}>🎁</ThemedText>
                <ThemedText style={{ color: colors.muted }}>No redeemed rewards yet</ThemedText>
              </View>
            ) : (
              redeemedRewards.map((reward) => (
                <View
                  key={reward.id}
                  style={[styles.redeemedCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                  <View style={styles.redeemedInfo}>
                    <ThemedText style={styles.rewardTitle}>{reward.title}</ThemedText>
                    <ThemedText style={[styles.rewardDesc, { color: colors.muted }]}>
                      {reward.redeemedAt}
                    </ThemedText>
                  </View>
                  <View style={[styles.codeBox, { backgroundColor: colors.background }]}>
                    <ThemedText style={[styles.codeText, { color: colors.primary }]}>{reward.code}</ThemedText>
                  </View>
                </View>
              ))
            )}
          </>
        )}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 24,
    marginLeft: 10,
  },
  balanceCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  balanceLabel: {
    color: '#fff',
    opacity: 0.9,
    fontSize: 14,
    paddingVertical: 8,
  },
  balanceValue: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  rewardCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
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
    fontSize: 12,
    marginTop: 2,
  },
  rewardPointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rewardPointsValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rewardPointsLabel: {
    fontSize: 12,
  },
  redeemButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redeemButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  redeemedCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  redeemedInfo: {
    marginBottom: 12,
  },
  codeBox: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  codeText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
});
