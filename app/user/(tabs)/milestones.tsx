import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";

import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type MilestoneStatus = "completed" | "in_progress" | "locked";

type Milestone = {
  id: string;
  targetSteps: number;
  currentSteps: number;
  points: number;
  status: MilestoneStatus;
  dateAchieved?: Date;
};

const initialMilestones: Milestone[] = [
  {
    id: "1",
    targetSteps: 20000,
    currentSteps: 20000,
    points: 100,
    status: "completed",
    dateAchieved: new Date("2025-12-10"),
  },
  {
    id: "2",
    targetSteps: 10000,
    currentSteps: 6000,
    points: 50,
    status: "in_progress",
  },
  // { id: '3', targetSteps: 5000, currentSteps: 0, points: 25, status: 'locked' },
];

export default function MilestonesScreen() {
  const colorScheme = useColorScheme() ?? "dark";
  const colors = Colors[colorScheme];
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"ongoing" | "completed">(
    "ongoing",
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTargetSteps, setNewTargetSteps] = useState(5000);
  const [milestonesList, setMilestonesList] =
    useState<Milestone[]>(initialMilestones);

  // Handle adding a new milestone
  const handleAddMilestone = () => {
    if (newTargetSteps <= 0) return;

    // Auto-generate points (random 10-100)
    const randomPoints = Math.floor(Math.random() * 91) + 10;

    const newMilestone: Milestone = {
      id: Date.now().toString(),
      targetSteps: newTargetSteps,
      currentSteps: 0,
      points: randomPoints,
      status: "in_progress",
    };

    setMilestonesList((prev) => [...prev, newMilestone]);
    setNewTargetSteps(5000);
    setShowAddModal(false);
  };

  // Filter by search query
  const filteredMilestones = milestonesList.filter((milestone) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      milestone.targetSteps.toString().includes(query) ||
      milestone.points.toString().includes(query)
    );
  });

  // Split by tab
  const ongoingMilestones = filteredMilestones.filter(
    (m) => m.status !== "completed",
  );
  const completedMilestones = filteredMilestones.filter(
    (m) => m.status === "completed",
  );

  const getIconForStatus = (status: MilestoneStatus) => {
    switch (status) {
      case "completed":
        return { name: "check-circle" as const, color: colors.success };
      case "in_progress":
        return { name: "directions-walk" as const, color: colors.primary };
      case "locked":
        return { name: "lock" as const, color: colors.muted };
    }
  };

  const getStepsText = (milestone: Milestone) => {
    if (milestone.status === "completed") {
      return `${milestone.targetSteps.toLocaleString()} steps`;
    }
    if (milestone.status === "in_progress") {
      return `${milestone.currentSteps.toLocaleString()}/${milestone.targetSteps.toLocaleString()} steps`;
    }
    return `${milestone.currentSteps} steps`;
  };

  const getCardOpacity = (status: MilestoneStatus) => {
    return status === "locked" ? 0.6 : 1;
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Title and Add Button */}
        <View style={styles.header}>
          <ThemedText style={[styles.title, { color: colors.text }]}>
            Milestones
          </ThemedText>
          <Pressable
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={() => setShowAddModal(true)}
          >
            <ThemedText style={styles.addButtonText}>+ Add</ThemedText>
          </Pressable>
        </View>

        {/* Search Input */}
        <View
          style={[styles.searchContainer, { backgroundColor: colors.card }]}
        >
          <MaterialIcons name="search" size={20} color={colors.muted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search milestones..."
            placeholderTextColor={colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <Pressable
            style={[
              styles.tab,
              activeTab === "ongoing" && {
                borderBottomColor: colors.primary,
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setActiveTab("ongoing")}
          >
            <ThemedText
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === "ongoing" ? colors.primary : colors.muted,
                },
              ]}
            >
              Ongoing
            </ThemedText>
          </Pressable>
          <Pressable
            style={[
              styles.tab,
              activeTab === "completed" && {
                borderBottomColor: colors.primary,
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setActiveTab("completed")}
          >
            <ThemedText
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === "completed" ? colors.primary : colors.muted,
                },
              ]}
            >
              Completed
            </ThemedText>
          </Pressable>
        </View>

        {(activeTab === "ongoing"
          ? ongoingMilestones
          : completedMilestones
        ).map((milestone) => {
          const icon = getIconForStatus(milestone.status);
          const opacity = getCardOpacity(milestone.status);
          const progress =
            milestone.targetSteps > 0
              ? (milestone.currentSteps / milestone.targetSteps) * 100
              : 0;
          const progressColor =
            milestone.status === "completed"
              ? colors.success
              : milestone.status === "in_progress"
                ? colors.primary
                : colors.muted;

          return (
            <View
              key={milestone.id}
              style={[styles.card, { backgroundColor: colors.card, opacity }]}
            >
              <View style={styles.cardContent}>
                <View style={styles.textContainer}>
                  <ThemedText
                    style={[
                      styles.stepsText,
                      {
                        color:
                          milestone.status === "in_progress"
                            ? colors.primary
                            : colors.text,
                      },
                    ]}
                  >
                    {getStepsText(milestone)}
                  </ThemedText>
                  <ThemedText
                    style={[
                      styles.pointsText,
                      {
                        color:
                          milestone.status === "in_progress"
                            ? colors.primary
                            : colors.muted,
                      },
                    ]}
                  >
                    ({milestone.points} points)
                  </ThemedText>
                  {milestone.status === "completed" &&
                    milestone.dateAchieved && (
                      <ThemedText
                        style={[styles.dateText, { color: colors.muted }]}
                      >
                        Achieved{" "}
                        {milestone.dateAchieved.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </ThemedText>
                    )}
                </View>

                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor:
                        milestone.status === "completed"
                          ? "rgba(76, 175, 80, 0.15)"
                          : milestone.status === "in_progress"
                            ? "rgba(245, 169, 98, 0.15)"
                            : "rgba(142, 142, 147, 0.15)",
                    },
                  ]}
                >
                  <MaterialIcons
                    name={icon.name}
                    size={28}
                    color={icon.color}
                  />
                </View>
              </View>

              <View
                style={[
                  styles.progressBarContainer,
                  { backgroundColor: colors.border },
                ]}
              >
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${Math.min(progress, 100)}%`,
                      backgroundColor: progressColor,
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Add Milestone Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setShowAddModal(false)}
        >
          <Pressable
            style={[styles.modalCard, { backgroundColor: colors.card }]}
          >
            <ThemedText style={[styles.modalTitle, { color: colors.text }]}>
              Lets get walking!
            </ThemedText>
            <ThemedText style={[styles.modalSubtitle, { color: colors.muted }]}>
              add how many steps you want to take, so you can get out there
            </ThemedText>

            <ThemedText style={[styles.sliderValue, { color: colors.primary }]}>
              {newTargetSteps.toLocaleString()} steps
            </ThemedText>

            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={20000}
              step={100}
              value={newTargetSteps}
              onValueChange={setNewTargetSteps}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.border}
              thumbTintColor={colors.primary}
            />

            <View style={styles.sliderLabels}>
              <ThemedText style={[styles.sliderLabel, { color: colors.muted }]}>
                0
              </ThemedText>
              <ThemedText style={[styles.sliderLabel, { color: colors.muted }]}>
                20,000
              </ThemedText>
            </View>

            <ThemedText style={[styles.pointsNote, { color: colors.muted }]}>
              points are assigned from the system based on region and location
            </ThemedText>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: colors.border }]}
                onPress={() => setShowAddModal(false)}
              >
                <ThemedText style={{ color: colors.text }}>Cancel</ThemedText>
              </Pressable>
              <Pressable
                style={[
                  styles.modalButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={handleAddMilestone}
              >
                <ThemedText style={{ color: "#fff", fontWeight: "600" }}>
                  Create
                </ThemedText>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    alignItems: "flex-start",
    paddingRight: 8,
  },
  stepsText: {
    fontSize: 18,
    fontWeight: "600",
  },
  pointsText: {
    fontSize: 14,
    marginTop: 4,
  },
  progressBarContainer: {
    height: 6,
    borderRadius: 3,
    marginTop: 12,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    marginLeft: 8,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
  dateText: {
    fontSize: 12,
    marginTop: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "85%",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
  },
  sliderValue: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sliderLabel: {
    fontSize: 12,
  },
  pointsNote: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
});
