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
} from "react-native";

const { width } = Dimensions.get("window");

const footsteps=require("../../assets/images/Footsteps.png");


type Props = {
  navigation: NavigationProp<any>;
};

export default function Onboarding1({ navigation }: Props) {
  return (
    <View style={styles.container}>
      
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

      {/* Continue Button */}
      <PrimaryButton
        title="Continue"
        onPress={() => navigation.navigate("Onboarding2")}
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
    paddingBottom: 60,
  },

  footsteps: {
    position: "absolute",
    top: 120,
    width: width * 1.2,
    opacity: 0.15,
  },

  textBox: {
    position: "absolute",
    top: 350,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    color: colors.textPrimary,
    fontFamily: "Inter-Bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    fontFamily: "Merriweather-Regular",
    color: colors.textSecondary,
    textAlign: "center",
    width: 260,
  },

  dotsRow: {
    flexDirection: "row",
    marginBottom: 25,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.textDisabled,
    marginHorizontal: 6,
  },

  activeDot: {
    backgroundColor: colors.accent,
  },
});
