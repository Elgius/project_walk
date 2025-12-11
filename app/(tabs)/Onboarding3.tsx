import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import PrimaryButton from "@/components/PrimaryButton";
import colors from "@/app/Theme/colors";

export default function Onboarding3({ navigation }: any) {
  return (
    <View style={styles.container}>
      
      {/* Illustration */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/reward.png")} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Text */}
      <View style={styles.textBox}>
        <Text style={styles.title}>Redeem Rewards</Text>
        <Text style={styles.subtitle}>
          Use your points for{'\n'}exclusive discounts.
        </Text>
      </View>

      {/* Pagination */}
      <View style={styles.dotsRow}>
        <View style={[styles.dot, styles.completedDot]} />
        <View style={[styles.dot, styles.completedDot]} />
        <View style={[styles.dot, styles.activeDot]} />
      </View>

      {/* Button */}
      <PrimaryButton
        title="Get Started"
        onPress={() => navigation.replace("Permissions")}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 80,
  },

  imageContainer: {
    marginTop: 140,
    backgroundColor: colors.card,
    width: 300,
    height: 170,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.6,
  },

  image: {
    width: 140,
    height: 140,
    tintColor: "#656565",
  },

  textBox: {
    alignItems: "center",
    marginTop: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },

  dotsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 60,
    marginBottom: 20,
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.textSecondary,
  },

  completedDot: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },

  activeDot: {
    borderColor: colors.accent,
  },
});
