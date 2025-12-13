import React, { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, interpolate } from "react-native-reanimated";
import {
  Home,
  Gift,
  PieChart,
  User,
  BarChartBig,
} from "lucide-react-native";

import colors from "@/app/Theme/colors";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isVisible?: boolean;
}

const NAV_HEIGHT = 70;
const NAV_MARGIN_BOTTOM = 20;

export default function BottomNav({ activeTab, onTabChange, isVisible = true }: BottomNavProps) {
  const insets = useSafeAreaInsets();

  // Calculate total height for translation when hiding
  const totalHeight = NAV_HEIGHT + NAV_MARGIN_BOTTOM + insets.bottom + 10;

  // Shared value for visibility animation (1 = visible, 0 = hidden)
  const visibilityProgress = useSharedValue(isVisible ? 1 : 0);

  // Animate when isVisible changes
  useEffect(() => {
    visibilityProgress.value = withTiming(isVisible ? 1 : 0, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [isVisible]);

  // Animated style for the container
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            visibilityProgress.value,
            [0, 1],
            [totalHeight, 0]
          ),
        },
      ],
      opacity: interpolate(
        visibilityProgress.value,
        [0, 0.5, 1],
        [0, 0.8, 1]
      ),
    };
  });

  return (
    <Animated.View style={[styles.outerContainer, { paddingBottom: insets.bottom }, containerAnimatedStyle]}>
      <View style={styles.pillContainer}>
        <NavItem
          active={activeTab === "home"}
          onPress={() => onTabChange("home")}
          Icon={Home}
        />

        <NavItem
          active={activeTab === "rewards"}
          onPress={() => onTabChange("rewards")}
          Icon={Gift}
        />

        <NavItem
          active={activeTab === "milestones"}
          onPress={() => onTabChange("milestones")}
          Icon={BarChartBig}
        />

        <NavItem
          active={activeTab === "analytics"}
          onPress={() => onTabChange("analytics")}
          Icon={PieChart}
        />

        <NavItem
          active={activeTab === "profile"}
          onPress={() => onTabChange("profile")}
          Icon={User}
        />
      </View>
    </Animated.View>
  );
}

function NavItem({
  active,
  onPress,
  Icon,
}: {
  active: boolean;
  onPress: () => void;
  Icon: any;
}) {
  // Shared values for fade animation
  const outlineOpacity = useSharedValue(active ? 0 : 1);
  const filledOpacity = useSharedValue(active ? 1 : 0);

  // Animate opacity when active state changes
  useEffect(() => {
    const duration = 200;
    const easing = Easing.inOut(Easing.ease);

    outlineOpacity.value = withTiming(active ? 0 : 1, { duration, easing });
    filledOpacity.value = withTiming(active ? 1 : 0, { duration, easing });
  }, [active]);

  // Animated styles
  const outlineStyle = useAnimatedStyle(() => ({
    opacity: outlineOpacity.value,
  }));

  const filledStyle = useAnimatedStyle(() => ({
    opacity: filledOpacity.value,
  }));

  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        {/* Outline icon (fades out when active) */}
        <Animated.View style={[styles.iconWrapper, outlineStyle]}>
          <Icon size={26} strokeWidth={2} color={colors.accentBlue} />
        </Animated.View>
        {/* Filled icon (fades in when active) */}
        <Animated.View style={[styles.iconWrapper, styles.iconAbsolute, filledStyle]}>
          <Icon size={26} strokeWidth={0} color={colors.accentBlue} fill={colors.accentBlue} />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
    paddingTop: 10,
    backgroundColor: "transparent",
  },

  pillContainer: {
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 35,
    marginBottom: 20,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    // Shadow for Android
    elevation: 10,
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
  },

  iconContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  iconAbsolute: {
    position: "absolute",
  },
});
