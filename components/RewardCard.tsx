import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "@/app/Theme/colors";

interface RewardCardProps {
  image: any;               // requires the ("img.png")
  title: string;
  points: number;
  featured?: boolean;
  onRedeem: () => void;
}

const RewardCard: React.FC<RewardCardProps> = ({
  image,
  title,
  points,
  featured = false,
  onRedeem,
}) => {
  return (
    <View style={styles.card}>
      {featured && <Text style={styles.featured}>FEATURED</Text>}

      <View style={styles.header}>
        <Image source={image} style={styles.logo} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <Text style={styles.points}>{points} points</Text>

      <TouchableOpacity style={styles.btn} onPress={onRedeem} activeOpacity={0.7}>
        <Text style={styles.btnText}>Redeem</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RewardCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  featured: {
    color: colors.accent,
    fontSize: 12,
    marginBottom: 6,
    fontWeight: "700",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  logo: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },

  title: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: "600",
  },

  points: {
    marginTop: 8,
    fontSize: 14,
    color: colors.textSecondary,
  },

  btn: {
    marginTop: 12,
    backgroundColor: colors.accentBlue,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 12,
  },

  btnText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.bg,
  },
});
