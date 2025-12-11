import React from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import colors from "@/app/Theme/colors";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.button, style]}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.bg,
    fontSize: 16,
    fontWeight: "600",
  },
});
