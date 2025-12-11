import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "@/app/Theme/colors";
import { LucideIcon } from "lucide-react-native";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label }) => {
  return (
    <View style={styles.card}>
      <Icon size={22} color={colors.accentBlue} strokeWidth={2} />

      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default StatCard;

const styles = StyleSheet.create({
  card: {
    width: 110,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: colors.card,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  label: {
    marginTop: 2,
    fontSize: 14,
    color: colors.textSecondary,
  },
});
