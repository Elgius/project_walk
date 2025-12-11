import React from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import colors from "@/app/Theme/colors";

interface SecondaryButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ label, onPress, style }) => {
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

export default SecondaryButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 48,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.accentBlue,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  text: {
    color: colors.accentBlue,
    fontSize: 16,
    fontWeight: "600",
  },
});
