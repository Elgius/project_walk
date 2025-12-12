import { useState } from 'react';
import { StyleSheet, View, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type WalkHistory = {
  id: string;
  date: string;
  steps: number;
  distance: number;
  duration: string;
  points: number;
};

export default function ActivityScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const [isWalking, setIsWalking] = useState(false);

  // Mock walk state
  const currentWalk = {
    steps: 1234,
    distance: 0.9,
    duration: '00:15:32',
    points: 12,
  };

  // Mock history
  const walkHistory: WalkHistory[] = [
    { id: '1', date: 'Today, 8:30 AM', steps: 3420, distance: 2.5, duration: '32 min', points: 34 },
    { id: '2', date: 'Yesterday, 6:00 PM', steps: 5120, distance: 3.8, duration: '48 min', points: 51 },
    { id: '3', date: 'Dec 9, 7:00 AM', steps: 8240, distance: 6.1, duration: '1h 15min', points: 82 },
    { id: '4', date: 'Dec 8, 5:30 PM', steps: 2100, distance: 1.5, duration: '20 min', points: 21 },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Activity</ThemedText>
      </ThemedView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Active Walk Card */}
        {isWalking ? (
          <View style={[styles.activeWalkCard, { backgroundColor: colors.primary }]}>
            <ThemedText style={styles.activeWalkLabel}>Walk in Progress</ThemedText>
            <View style={styles.activeWalkStats}>
              <View style={styles.activeWalkStat}>
                <ThemedText style={styles.activeWalkValue}>{currentWalk.steps}</ThemedText>
                <ThemedText style={styles.activeWalkStatLabel}>steps</ThemedText>
              </View>
              <View style={styles.activeWalkStat}>
                <ThemedText style={styles.activeWalkValue}>{currentWalk.distance}</ThemedText>
                <ThemedText style={styles.activeWalkStatLabel}>km</ThemedText>
              </View>
              <View style={styles.activeWalkStat}>
                <ThemedText style={styles.activeWalkValue}>{currentWalk.duration}</ThemedText>
                <ThemedText style={styles.activeWalkStatLabel}>time</ThemedText>
              </View>
            </View>
            <ThemedText style={styles.earnedPoints}>+{currentWalk.points} points earned</ThemedText>
            <Pressable
              style={[styles.stopButton, { backgroundColor: colors.error }]}
              onPress={() => setIsWalking(false)}
            >
              <ThemedText style={styles.buttonText}>Stop Walk</ThemedText>
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={[styles.startWalkCard, { backgroundColor: colors.card, borderColor: colors.primary }]}
            onPress={() => setIsWalking(true)}
          >
            <View style={[styles.playIcon, { backgroundColor: colors.primary }]}>
              <ThemedText style={styles.playIconText}>{'>'}</ThemedText>
            </View>
            <ThemedText type="subtitle" style={{ color: colors.primary }}>
              Start a Walk
            </ThemedText>
            <ThemedText style={{ color: colors.muted }}>
              Tap to begin tracking your walk
            </ThemedText>
          </Pressable>
        )}

        {/* Weekly Summary */}
        <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <ThemedText type="subtitle">This Week</ThemedText>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <ThemedText style={[styles.summaryValue, { color: colors.primary }]}>42,580</ThemedText>
              <ThemedText style={[styles.summaryLabel, { color: colors.muted }]}>steps</ThemedText>
            </View>
            <View style={styles.summaryItem}>
              <ThemedText style={[styles.summaryValue, { color: colors.accent }]}>31.2</ThemedText>
              <ThemedText style={[styles.summaryLabel, { color: colors.muted }]}>km</ThemedText>
            </View>
            <View style={styles.summaryItem}>
              <ThemedText style={[styles.summaryValue, { color: colors.secondary }]}>425</ThemedText>
              <ThemedText style={[styles.summaryLabel, { color: colors.muted }]}>points</ThemedText>
            </View>
          </View>
        </View>

        {/* Walk History */}
        <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Walks</ThemedText>
        {walkHistory.map((walk) => (
          <View
            key={walk.id}
            style={[styles.historyCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.historyHeader}>
              <ThemedText style={{ fontWeight: '600' }}>{walk.date}</ThemedText>
              <ThemedText style={[styles.historyPoints, { color: colors.secondary }]}>
                +{walk.points} pts
              </ThemedText>
            </View>
            <View style={styles.historyStats}>
              <ThemedText style={{ color: colors.muted }}>
                {walk.steps.toLocaleString()} steps
              </ThemedText>
              <ThemedText style={{ color: colors.muted }}>{walk.distance} km</ThemedText>
              <ThemedText style={{ color: colors.muted }}>{walk.duration}</ThemedText>
            </View>
          </View>
        ))}

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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  activeWalkCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
  },
  activeWalkLabel: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
    textAlign: 'center',
  },
  activeWalkStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  activeWalkStat: {
    alignItems: 'center',
  },
  activeWalkValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  activeWalkStatLabel: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 12,
  },
  earnedPoints: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
  },
  stopButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  startWalkCard: {
    padding: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    marginBottom: 16,
  },
  playIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  playIconText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  summaryCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  summaryLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  historyCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  historyPoints: {
    fontWeight: '600',
  },
  historyStats: {
    flexDirection: 'row',
    gap: 16,
  },
});
