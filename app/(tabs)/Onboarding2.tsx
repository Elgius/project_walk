import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import PrimaryButton from "@/components/PrimaryButton";
import colors from "@/app/Theme/colors";

const { width, height } = Dimensions.get("window");

const dotimg=require("../../assets/images/dot.png");

export default function Onboarding2({ navigation }: any) {

  const positions = [
    { x: 0.15, y: 0.12 },
    { x: 0.75, y: 0.18 },
    { x: 0.30, y: 0.32 },
    { x: 0.65, y: 0.40 },
    { x: 0.20, y: 0.50 },
    { x: 0.80, y: 0.55 },
  ];

  // Create animated dots
  const dots = positions.map((pos) => ({
    x: new Animated.Value(width * pos.x),
    y: new Animated.Value(height * pos.y * 0.6), // stays above text area
  }));

  // Floating animation
  useEffect(() => {
    dots.forEach((dot) => {
      const animate = () => {
        Animated.parallel([
          Animated.timing(dot.x, {
            toValue: width * (0.1 + Math.random() * 0.8),
            duration: 5000,
            useNativeDriver: false,
          }),
          Animated.timing(dot.y, {
            toValue: height * (0.1 + Math.random() * 0.4),
            duration: 5000,
            useNativeDriver: false,
          }),
        ]).start(animate);
      };
      animate();
    });
  }, []);

  return (
    <View style={styles.container}>

      {/* Floating Dots */}
      {dots.map((dot, index) => (
        <Animated.Image
          key={index}
          source={dotimg}
          style={[styles.dotImage, { top: dot.y, left: dot.x }]}
        />
      ))}

      {/* Text */}
      <View style={styles.textBox}>
        <Text style={styles.title}>Earn Points</Text>
        <Text style={styles.subtitle}>Unlock points as you reach milestones.</Text>
      </View>

      {/* Pagination */}
      <View style={styles.dotsRow}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
      </View>

      {/* Button */}
      <PrimaryButton
        title="Continue"
        onPress={() => navigation.navigate("Onboarding3")}
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

  dotImage: {
    position: "absolute",
    width: 38,
    height: 38,
    opacity: 0.22,
  },

  textBox: {
    alignItems: "center",
    marginBottom: 140,
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
    width: 260,
  },

  dotsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.textDisabled,
    opacity: 0.4,
  },

  activeDot: {
    backgroundColor: colors.accent,
    opacity: 1,
  },
});
