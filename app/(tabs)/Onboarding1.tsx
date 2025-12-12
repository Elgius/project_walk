import colors from "@/app/Theme/colors";
import PrimaryButton from "@/components/PrimaryButton";
import { NavigationProp } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";

const { width, height } = Dimensions.get("window");

const footsteps = require("../../assets/images/footsteps.png");

type Props = {
  navigation: NavigationProp<any>;
};

export default function Onboarding1({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>

      {/* Background Footsteps */}
      <Image
        source={footsteps}
        style={styles.footsteps}
        resizeMode="contain"
      />

      {/* Main Text */}
      <View style={styles.textBox}>
        <Text style={styles.title}>Track Your Steps</Text>
        <Text style={styles.subtitle}>
          Track your daily activity effortlessly.
        </Text>
      </View>

      {/* Pagination Dots */}
      <View style={styles.dotsRow}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Button */}
      <PrimaryButton
        title="Continue"
        onPress={() => navigation.navigate("Onboarding2")}
        style={{ width: "85%", marginBottom: 20 }}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  footsteps: {
    position: "absolute",
    top: height * 0.12,       // Moves footsteps a bit higher (like mockup)
    width: width * 1.4,       // Slight stretch for better coverage
    opacity: 0.18,
  },

  textBox: {
    position: "absolute",
    top: height * 0.42,       // Perfect placement for most devices
    alignItems: "center",
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    width: 260,
    lineHeight: 24,
  },

  dotsRow: {
    flexDirection: "row",
    marginBottom: 18,
    gap: 10,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.textDisabled,
    opacity: 0.5,
  },

  activeDot: {
    backgroundColor: colors.accent,
    opacity: 1,
  },
});
