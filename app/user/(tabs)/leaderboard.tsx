import { useState } from "react";
import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import themeColors from "@/app/Theme/colors";

type Period = "today" | "yesterday" | "week" | "month";

type LeaderboardEntry = {
  id: string;
  name: string;
  rank: number;
};

export default function LeaderboardScreen() {
  const colorScheme = useColorScheme() ?? "dark";
  const colors = Colors[colorScheme];
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("today");

  const periods: { key: Period; label: string }[] = [
    { key: "today", label: "Today" },
    { key: "yesterday", label: "Yesterday" },
    { key: "week", label: "Week" },
    { key: "month", label: "Month" },
  ];

  // Mock data
  const stepsToday = 5127;
  const speed = "2km/hr";
  const groupName = "Womenintechmv";

  const leaderboardData: LeaderboardEntry[] = [
    { id: "1", name: "Aiesha Adnan", rank: 1 },
    { id: "2", name: "Ahmed Mahran Zameel", rank: 2 },
    { id: "3", name: "Aiesha Adnan", rank: 3 },
    { id: "4", name: "Aiesha Adnan", rank: 4 },
  ];

  const getMedalIcon = (rank: number) => {
    if (rank === 1) {
      return <MaterialIcons name="emoji-events" size={28} color="#FFD700" />;
    }
    if (rank === 2) {
      return <MaterialIcons name="emoji-events" size={28} color="#C0C0C0" />;
    }
    if (rank === 3) {
      return <MaterialIcons name="emoji-events" size={28} color="#CD7F32" />;
    }
    return (
      <ThemedText style={[styles.rankNumber, { color: colors.muted }]}>
        {rank}
      </ThemedText>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.card }]}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <ThemedText style={[styles.title, { color: colors.text }]}>
            Leaderboard
          </ThemedText>
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
              <ThemedText
                style={[
                  styles.periodTabText,
                  selectedPeriod === period.key && styles.periodTabTextActive,
                ]}
              >
                {period.label}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        {/* Stats Card */}
        <View style={[styles.statsCard, { backgroundColor: colors.card }]}>
          <ThemedText style={[styles.statsLabel, { color: colors.muted }]}>
            Steps today
          </ThemedText>
          <View style={styles.statsRow}>
            <MaterialIcons name="check" size={32} color={colors.muted} />
            <ThemedText style={[styles.stepsCount, { color: colors.text }]}>
              {stepsToday.toLocaleString()}
            </ThemedText>
            <MaterialIcons name="bolt" size={32} color={colors.secondary} />
          </View>
        </View>

        {/* Group Badge */}
        <View style={styles.badgeContainer}>
          <View style={[styles.groupBadge, { backgroundColor: colors.primary }]}>
            <ThemedText style={styles.groupBadgeText}>{groupName}</ThemedText>
          </View>
        </View>

        {/* Leaderboard List */}
        <View style={styles.leaderboardList}>
          {leaderboardData.map((entry) => (
            <View
              key={entry.id}
              style={[
                styles.leaderboardItem,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.rankContainer}>{getMedalIcon(entry.rank)}</View>
              <View style={[styles.avatar, { backgroundColor: colors.border }]}>
                <MaterialIcons name="person" size={28} color={colors.muted} />
              </View>
              <ThemedText style={[styles.userName, { color: colors.text }]}>
                {entry.name}
              </ThemedText>
            </View>
          ))}
        </View>

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
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 24,
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  periodTabs: {
    flexDirection: "row",
    backgroundColor: themeColors.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  periodTabActive: {
    backgroundColor: themeColors.accent,
  },
  periodTabText: {
    fontSize: 14,
    fontWeight: "600",
    color: themeColors.textSecondary,
  },
  periodTabTextActive: {
    color: themeColors.bg,
  },
  statsCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 50
  },
  statsLabel: {
    fontSize: 16,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  stepsCount: {
    fontSize: 56,
    fontWeight: "bold",
  },
  speedText: {
    fontSize: 16,
    marginTop: 10,
  },
  badgeContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  groupBadge: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  groupBadgeText: {
    color: "#1C1E2D",
    fontSize: 16,
    fontWeight: "600",
  },
  leaderboardList: {
    gap: 12,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  rankContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  medalIcon: {
    fontSize: 24,
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 16,
    flex: 1,
  },
});
