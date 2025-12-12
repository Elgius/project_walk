import colors from "@/app/Theme/colors";
import PrimaryButton from "@/components/PrimaryButton";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const locationimg = require("../assets/images/location.png");
const footsteps = require("../assets/images/footsteps.png");

export default function PermissionsScreen({ navigation }: any) {
  return (
    <View style={styles.container}>

      {/* Top Icon */}
      <Image
        source={locationimg}
        style={styles.icon}
        resizeMode="contain"
      />

      {/* Permission Text */}
      <View style={styles.textBox}>
        <Text style={styles.title}>We need access to your</Text>
        <Text style={styles.title}>motion & fitness activity</Text>
        <Text style={styles.title}>to track steps.</Text>
      </View>

      {/* Footsteps Bottom Decoration */}
      <Image
        source={footsteps}
        style={styles.footsteps}
        resizeMode="contain"
      />

      {/* Button */}
      <PrimaryButton
        title="Allow Motion Tracking"
        onPress={() => navigation.navigate("Home")}
        style={{ width: "80%", marginBottom: 40 }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    paddingTop: 120,
  },

  icon: {
    width: 120,
    height: 120,
    opacity: 0.25,
    marginBottom: 60,
  },

  textBox: {
    alignItems: "center",
    marginBottom: 120,
  },

  title: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 28,
  },

  footsteps: {
    position: "absolute",
    bottom: 120,
    width: "100%",
    height: 120,
    opacity: 0.25,
  },
});
