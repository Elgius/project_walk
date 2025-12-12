import { StyleSheet, View, ScrollView, Pressable, ImageBackground, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

import { ThemedText } from "@/components/themed-text";
import { CircularProgress } from "@/components/circular-progress";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import colors from "@/app/Theme/colors";

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "dark";
  const colors = Colors[colorScheme];
  const router = useRouter();

  // Static data matching the design
  const greeting = "Good Morning,";
  const userName = "Aminath Axwa Moosa!";
  const points = 100;
  const steps = 10000;
  const goal = 10000;
  const percentage = Math.round((steps / goal) * 100);
  const distance = "10.1 KM";
  const time = "70 Mins";

  // Random weather background image for progress card
  const weatherImages = [
    require('@/assets/images/weather/rain.jpg'),
    require('@/assets/images/weather/sunny.jpg'),
  ];
  const randomImage = weatherImages[Math.floor(Math.random() * weatherImages.length)];

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
        <ImageBackground
          source={randomImage}
          style={[styles.progressCard, { backgroundColor: colors.card }]}
          imageStyle={styles.progressCardImage}
          resizeMode="cover"
        >
          <View style={styles.progressCardOverlay}>
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
        </ImageBackground>

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

        {/* Leaderboard Banner */}
        <Pressable style={styles.leaderboardsBanner} onPress={() => router.push("/user/(tabs)/Onboarding1")}>
          <View style={styles.rewardsContent}>
            <View style={styles.rewardsTextContainer}>
              <View style={styles.rewardsTitleRow}>
                <ThemedText style={styles.rewardsTitle}>Leaderboards</ThemedText>
                <MaterialIcons name="arrow-forward" size={20} color="#fff" style={styles.rewardsArrow} />
              </View>
              <ThemedText style={styles.rewardsSubtitle}>
                Where rewards come to life
              </ThemedText>
            </View>
            <View style={styles.rewardsImageContainer}>
              <Image
                source={require('@/assets/images/leaderboard.png')}
                style={styles.leaderboardImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </Pressable>

        {/* Rewards Banner */}
        <Pressable style={styles.rewardsBanner} onPress={() => router.push("/user/(tabs)/rewards")}>
          <View style={styles.rewardsContent}>
            <View style={styles.rewardsTextContainer}>
              <View style={styles.rewardsTitleRow}>
                <ThemedText style={styles.rewardsTitle}>Rewards</ThemedText>
                <MaterialIcons name="arrow-forward" size={20} color={"#fff"} style={styles.rewardsArrow} />
              </View>
              <ThemedText style={styles.rewardsSubtitle}>
                Where rewards come to life
              </ThemedText>
            </View>
            <View style={styles.rewardsImageContainer}>
              <Image
                source={require('@/assets/images/market.png')}
                style={styles.marketplaceImage}
                resizeMode="contain"
              />
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
    marginTop: 40,
    marginBottom: 24,
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
    alignItems: "center",
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressCardImage: {
    borderRadius: 20,
    width: '100%',
    height: '100%',
  },
  progressCardOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    zIndex: 1,
    width: '100%',
    borderRadius: 20,
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
  leaderboardsBanner: {
    backgroundColor: colors.accentBlue,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Android shadow
    elevation: 8,
  },
  rewardsBanner: {
    backgroundColor: "#F5A962",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Android shadow
    elevation: 8,
  },
  rewardsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  rewardsTextContainer: {
    flex: 1,
    color: colors.textDisabled,
  },
  rewardsTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rewardsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  rewardsArrow: {
    marginLeft: 8,
  },
  rewardsSubtitle: {
    fontSize: 13,
    color: "#fff",
    opacity: 0.7,
    marginTop: 4,
  },
  rewardsImageContainer: {
    width: 100,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  marketplaceImage: {
    width: 500,
    height: 200,
    transform: [{ translateY: 20 }],
    opacity: 0.7
  },
  leaderboardImage: {
    width: 220,
    height: 200,
    transform: [{ translateY: 20 }, { translateX: -20 }],
    opacity: 0.7
  },
});
