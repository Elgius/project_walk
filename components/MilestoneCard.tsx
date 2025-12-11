import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "@/app/Theme/colors";
import { LucideIcon, Trophy, Footprints } from "lucide-react-native";

export type MilestoneStatus = "achieved" | "locked" | "missed";

interface MilestoneCardProps {
  icon?: LucideIcon;
  steps: number;
  points: number;
  status: MilestoneStatus;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({
  icon: Icon = Footprints,
  steps,
  points,
  status,
}) => {
  const getStatusColor = () => {
    if (status === "achieved") return colors.success;
    if (status === "missed") return colors.warning;
    return colors.textDisabled;
  };

  return (
    <View style={[styles.card, { opacity: status === "locked" ? 0.5 : 1 }]}>
      <Icon size={26} color={getStatusColor()} strokeWidth={2} />

      <View style={styles.textBox}>
        <Text style={styles.steps}>{steps.toLocaleString()} steps</Text>
        <Text style={styles.points}>+{points} points</Text>
      </View>

      <Trophy size={22} color={getStatusColor()} />
    </View>
  );
};

export default MilestoneCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  textBox: {
    flex: 1,
  },
  steps: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  points: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
