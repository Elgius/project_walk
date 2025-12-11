import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ThemedText } from "@/components/themed-text";
import { CircularProgress } from "@/components/circular-progress";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "dark";
  const colors = Colors[colorScheme];

  // Static data matching the design
  const greeting = "Good Morning,";
  const userName = "Aminath Axwa Moosa!";
  const points = 100;
  const steps = 10000;
  const goal = 10000;
  const percentage = Math.round((steps / goal) * 100);
  const distance = "10.1 KM";
  const time = "70 Mins";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={[styles.avatar, { borderColor: colors.muted }]}>
              <MaterialIcons name="person-outline" size={32} color={colors.muted} />
            </View>
            <View style={styles.greetingContainer}>
              <ThemedText style={[styles.greetingText, { color: colors.text }]}>
                {greeting}
              </ThemedText>
              <ThemedText style={[styles.userName, { color: colors.text }]}>
                {userName}
              </ThemedText>
            </View>
          </View>
          <View style={[styles.pointsBadge, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <MaterialIcons name="directions-run" size={20} color="#D4A04A" />
            <ThemedText style={[styles.pointsText, { color: colors.text }]}>
              {points}
            </ThemedText>
          </View>
        </View>

        {/* Daily Summary Title */}
        <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
          Daily Summary
        </ThemedText>

        {/* Progress Ring Card */}
        <View style={[styles.progressCard, { backgroundColor: colors.card }]}>
          <CircularProgress
            size={220}
            strokeWidth={13}
            progress={percentage}
            progressColor={colors.primary}
            backgroundColor={colors.border}
          >
            <ThemedText style={[styles.stepsCount, { color: colors.text }]}>
              {steps.toLocaleString()}
            </ThemedText>
            <ThemedText style={[styles.goalText, { color: colors.muted }]}>
              {goal.toLocaleString()} Goal
            </ThemedText>
            <View style={[styles.percentageBadge, { backgroundColor: 'rgba(245, 169, 98, 0.2)' }]}>
              <ThemedText style={[styles.percentageText, { color: colors.primary }]}>
                {percentage}%
              </ThemedText>
            </View>
          </CircularProgress>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {/* Distance Card */}
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={[styles.statIconContainer, { backgroundColor: 'rgba(245, 169, 98, 0.15)' }]}>
              <MaterialIcons name="location-on" size={24} color={colors.primary} />
            </View>
            <ThemedText style={[styles.statValue, { color: colors.text }]}>
              {distance}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.muted }]}>
              Distance
            </ThemedText>
          </View>

          {/* Time Card */}
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={[styles.statIconContainer, { backgroundColor: 'rgba(91, 127, 255, 0.15)' }]}>
              <MaterialIcons name="access-time" size={24} color={colors.secondary} />
            </View>
            <ThemedText style={[styles.statValue, { color: colors.text }]}>
              {time}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.muted }]}>
              Time
            </ThemedText>
          </View>
        </View>

        {/* Rewards Banner */}
        <Pressable style={styles.rewardsBanner}>
          <View style={styles.rewardsContent}>
            <View style={styles.rewardsTextContainer}>
              <View style={styles.rewardsTitleRow}>
                <ThemedText style={styles.rewardsTitle}>Rewards</ThemedText>
                <MaterialIcons name="arrow-forward" size={20} color="#1C1E2D" style={styles.rewardsArrow} />
              </View>
              <ThemedText style={styles.rewardsSubtitle}>
                Where rewards come to life
              </ThemedText>
            </View>
            <View style={styles.rewardsImageContainer}>
              {/* Placeholder for marketplace illustration */}
              <View style={styles.illustrationPlaceholder}>
                <MaterialIcons name="storefront" size={60} color="rgba(28, 30, 45, 0.3)" />
              </View>
            </View>
          </View>
        </Pressable>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  greetingContainer: {
    marginLeft: 12,
  },
  greetingText: {
    fontSize: 14,
    opacity: 0.8,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
  },
  pointsBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 16,
  },
  progressCard: {
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    marginBottom: 16,
  },
  stepsCount: {
    fontSize: 36,
    fontWeight: "bold",
  },
  goalText: {
    fontSize: 14,
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
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    marginTop: 2,
  },
  rewardsBanner: {
    backgroundColor: "#F5A962",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },
  rewardsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  rewardsTextContainer: {
    flex: 1,
  },
  rewardsTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rewardsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C1E2D",
  },
  rewardsArrow: {
    marginLeft: 8,
  },
  rewardsSubtitle: {
    fontSize: 13,
    color: "#1C1E2D",
    opacity: 0.7,
    marginTop: 4,
  },
  rewardsImageContainer: {
    width: 100,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  illustrationPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
