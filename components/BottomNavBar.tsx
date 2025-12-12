import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Home,
  HomeIcon,
  Wallet,
  WalletIcon,
  PieChart,
  PieChartIcon,
  User,
  UserIcon,
  BarChartBig,
  BarChartBigIcon
} from "lucide-react-native";

import colors from "@/app/Theme/colors";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <NavItem
        active={activeTab === "home"}
        onPress={() => onTabChange("home")}
        IconOutline={Home}
        IconFilled={HomeIcon}
      />

      <NavItem
        active={activeTab === "wallet"}
        onPress={() => onTabChange("wallet")}
        IconOutline={Wallet}
        IconFilled={WalletIcon}
      />

      <NavItem
        active={activeTab === "milestones"}
        onPress={() => onTabChange("milestones")}
        IconOutline={BarChartBig}
        IconFilled={BarChartBigIcon}
      />

      <NavItem
        active={activeTab === "analytics"}
        onPress={() => onTabChange("analytics")}
        IconOutline={PieChart}
        IconFilled={PieChartIcon}
      />

      <NavItem
        active={activeTab === "profile"}
        onPress={() => onTabChange("profile")}
        IconOutline={User}
        IconFilled={UserIcon}
      />
    </View>
  );
}

function NavItem({
  active,
  onPress,
  IconOutline,
  IconFilled,
}: {
  active: boolean;
  onPress: () => void;
  IconOutline: any;
  IconFilled: any;
}) {
  const Icon = active ? IconFilled : IconOutline;

  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
      <Icon size={32} strokeWidth={2} color={colors.accentBlue} />

      {active && <View style={styles.dot} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 95,
    backgroundColor: colors.card,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.04)",
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accentBlue,
    marginTop: 6,
  },
});
