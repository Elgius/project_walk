import React from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import colors from "@/app/Theme/colors";

interface PrimaryButtonProps {
  title: string;       // <-- consistent for all buttons
  onPress: () => void;
  style?: ViewStyle;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.button, style]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.accent, // Kanagawa orange (#FFA066)
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.bg,
    fontSize: 16,
    fontWeight: "600",
  },
});
