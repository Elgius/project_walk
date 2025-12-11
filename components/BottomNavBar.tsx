import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Home, Search, Footprints, Gift, User, LucideIcon } from "lucide-react-native";
import colors from "@/app/Theme/colors";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      
      <NavItem
        icon={Home}
        label="Home"
        isActive={activeTab === "home"}
        onPress={() => onTabChange("home")}
      />

      <NavItem
        icon={Search}
        label="Search"
        isActive={activeTab === "search"}
        onPress={() => onTabChange("search")}
      />

      <NavItem
        icon={Footprints}
        label=""
        isActive={activeTab === "steps"}
        onPress={() => onTabChange("steps")}
        center
      />

      <NavItem
        icon={Gift}
        label="Rewards"
        isActive={activeTab === "rewards"}
        onPress={() => onTabChange("rewards")}
      />

      <NavItem
        icon={User}
        label="Profile"
        isActive={activeTab === "profile"}
        onPress={() => onTabChange("profile")}
      />

    </View>
  );
};

export default BottomNav;

const NavItem: React.FC<NavItemProps & { center?: boolean }> = ({
  icon: Icon,
  label,
  isActive,
  onPress,
  center,
}) => {

  return (
    <TouchableOpacity
      style={center ? styles.centerItemWrapper : styles.item}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Active square background */}
      {isActive && (
        <View style={styles.activeBg} />
      )}

      {/* Icon */}
      <Icon
        size={28}
        strokeWidth={2}
        color={isActive ? "#000" : colors.accentBlue}
        fill={isActive ? "#000" : "none"}
      />

      {/* Label */}
      {label !== "" && (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: {
    height: 85,
    backgroundColor: colors.bg,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  centerItemWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  activeBg: {
    position: "absolute",
    width: 64,
    height: 64,
    backgroundColor: colors.accent,
    borderRadius: 18,
    shadowColor: colors.accentBlue,
    shadowOpacity: 0.5,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },

  label: {
    fontSize: 13,
    color: colors.accentBlue,
    marginTop: 4,
  },
});
