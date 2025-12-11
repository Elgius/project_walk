import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Home, Gift, PieChart, User, LucideIcon } from "lucide-react-native";

import colors from "@/app/Theme/colors";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface NavItemProps {
  icon: LucideIcon;
  isActive: boolean;
  onPress: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>

      <NavItem
        icon={Home}
        isActive={activeTab === "home"}
        onPress={() => onTabChange("home")}
      />

      <NavItem
        icon={Gift}
        isActive={activeTab === "rewards"}
        onPress={() => onTabChange("rewards")}
      />

      <NavItem
        icon={PieChart}
        isActive={activeTab === "stats"}
        onPress={() => onTabChange("stats")}
      />

      <NavItem
        icon={User}
        isActive={activeTab === "profile"}
        onPress={() => onTabChange("profile")}
      />

    </View>
  );
};

export default BottomNav;

/* ---------------- NavItem Component ---------------- */

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, isActive, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
      <Icon
        size={28}
        strokeWidth={2}
        color={isActive ? colors.accentBlue : colors.textSecondary}
        fill={isActive ? colors.accentBlue : "none"}
      />

      {isActive && <View style={styles.dot} />}
    </TouchableOpacity>
  );
};

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: {
    height: 70,
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
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accentBlue,
    marginTop: 4,
  },
});
