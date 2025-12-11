import { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Reward = {
  id: string;
  title: string;
  description: string;
  points: number;
  category: string;
  icon: string;
};

type RedeemedReward = {
  id: string;
  title: string;
  redeemedAt: string;
  code: string;
};

export default function RewardsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [activeTab, setActiveTab] = useState<'available' | 'redeemed'>('available');

  const userPoints = 1250;

  // Mock rewards data
  const availableRewards: Reward[] = [
    { id: '1', title: '$5 Coffee Voucher', description: 'Valid at partner cafes', points: 500, category: 'Food & Drink', icon: '☕' },
    { id: '2', title: '10% Store Discount', description: 'Any item at SportMart', points: 300, category: 'Shopping', icon: '🛍️' },
    { id: '3', title: 'Free Smoothie', description: 'At Juice Bar locations', points: 400, category: 'Food & Drink', icon: '🥤' },
    { id: '4', title: '$10 Gift Card', description: 'Amazon digital gift card', points: 1000, category: 'Shopping', icon: '🎁' },
    { id: '5', title: 'Movie Ticket', description: 'Any standard showing', points: 800, category: 'Entertainment', icon: '🎬' },
    { id: '6', title: 'Plant a Tree', description: 'We plant a tree in your name', points: 200, category: 'Charity', icon: '🌳' },
    { id: '7', title: 'Premium Week', description: '7 days of premium features', points: 600, category: 'App', icon: '⭐' },
    { id: '8', title: '$25 Running Shoes', description: 'Discount at ShoeWorld', points: 2000, category: 'Shopping', icon: '👟' },
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
      <ThemedView style={styles.header}>
        <ThemedText type="title">Rewards</ThemedText>
      </ThemedView>

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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'available' ? (
          <>
            {availableRewards.map((reward) => {
              const canAfford = userPoints >= reward.points;
              return (
                <Pressable
                  key={reward.id}
                  style={[styles.rewardCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => handleRedeem(reward)}
                >
                  <View style={styles.rewardIcon}>
                    <ThemedText style={styles.rewardIconText}>{reward.icon}</ThemedText>
                  </View>
                  <View style={styles.rewardInfo}>
                    <ThemedText style={styles.rewardTitle}>{reward.title}</ThemedText>
                    <ThemedText style={[styles.rewardDesc, { color: colors.muted }]}>
                      {reward.description}
                    </ThemedText>
                    <ThemedText style={[styles.rewardCategory, { color: colors.accent }]}>
                      {reward.category}
                    </ThemedText>
                  </View>
                  <View style={styles.rewardPoints}>
                    <ThemedText
                      style={[styles.rewardPointsValue, { color: canAfford ? colors.primary : colors.error }]}
                    >
                      {reward.points}
                    </ThemedText>
                    <ThemedText style={[styles.rewardPointsLabel, { color: colors.muted }]}>pts</ThemedText>
                  </View>
                </Pressable>
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  balanceCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#fff',
    opacity: 0.9,
    fontSize: 14,
  },
  balanceValue: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 16,
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
  rewardCategory: {
    fontSize: 11,
    marginTop: 4,
  },
  rewardPoints: {
    alignItems: 'center',
  },
  rewardPointsValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rewardPointsLabel: {
    fontSize: 11,
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
