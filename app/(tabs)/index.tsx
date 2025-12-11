import { StyleSheet, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  // Mock data - replace with real data later
  const steps = 6842;
  const goal = 10000;
  const points = 1250;
  const distance = 4.2; // km
  const calories = 312;

  const progress = Math.min((steps / goal) * 100, 100);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ThemedView style={styles.header}>
        <ThemedText type="title">WalkPoints</ThemedText>
        <View
          style={[styles.pointsBadge, { backgroundColor: colors.secondary }]}
        >
          <ThemedText style={styles.pointsText}>{points} pts</ThemedText>
        </View>
      </ThemedView>

      <ThemedView style={styles.content}>
        {/* Main Step Counter */}
        <View
          style={[
            styles.stepCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <ThemedText style={[styles.stepsLabel, { color: colors.muted }]}>
            Today's Steps
          </ThemedText>
          <ThemedText style={[styles.stepsCount, { color: colors.primary }]}>
            {steps.toLocaleString()}
          </ThemedText>
          <ThemedText style={[styles.goalText, { color: colors.muted }]}>
            Goal: {goal.toLocaleString()}
          </ThemedText>

          {/* Progress Bar */}
          <View
            style={[styles.progressBar, { backgroundColor: colors.border }]}
          >
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%`, backgroundColor: colors.primary },
              ]}
            />
          </View>
          <ThemedText style={[styles.progressText, { color: colors.muted }]}>
            {progress.toFixed(0)}% of daily goal
          </ThemedText>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <ThemedText style={[styles.statValue, { color: colors.accent }]}>
              {distance}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.muted }]}>
              km
            </ThemedText>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <ThemedText style={[styles.statValue, { color: colors.warning }]}>
              {calories}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.muted }]}>
              kcal
            </ThemedText>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <ThemedText style={[styles.statValue, { color: colors.secondary }]}>
              +{Math.floor(steps / 100)}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.muted }]}>
              pts today
            </ThemedText>
          </View>
        </View>

        {/* Start Walk Button */}
        <Pressable
          style={[styles.startButton, { backgroundColor: colors.primary }]}
          onPress={() => console.log("Start walk")}
        >
          <ThemedText style={styles.startButtonText}>Start Walking</ThemedText>
        </Pressable>

        {/* Quick Info */}
        <View
          style={[
            styles.infoCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <ThemedText type="subtitle">How it works</ThemedText>
          <ThemedText style={{ color: colors.muted, marginTop: 8 }}>
            Walk to earn points! Every 100 steps = 1 point. Redeem your points
            for rewards in the Rewards tab.
          </ThemedText>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  pointsBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pointsText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 16,
  },
  stepsLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  stepsCount: {
    fontSize: 56,
    fontWeight: "bold",
  },
  goalText: {
    fontSize: 14,
    marginTop: 4,
  },
  progressBar: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    marginTop: 16,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    marginTop: 8,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  startButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
});
