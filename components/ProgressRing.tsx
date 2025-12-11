// app/components/ProgressRing.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Path, Defs, LinearGradient, Stop, ClipPath } from "react-native-svg";
import colors from "@/app/Theme/colors";
import { PersonStanding, Flame, Clock3, MapPin, LucideIcon } from "lucide-react-native";

interface ProgressRingProps {
  size?: number;
  progress: number;         // 0 → 1
  steps: number;
  goal: number;
}

interface StatChipProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  size = 260,
  progress,
  steps,
  goal,
}) => {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;

  const dashLength = 6;
  const dashGap = 10;

  const waveHeight = size * 0.16;
  const waveBaseY = size * 0.6;

  const wavePath = `
    M 0 ${waveBaseY}
    C ${size * 0.25} ${waveBaseY - waveHeight},
      ${size * 0.5}  ${waveBaseY - waveHeight / 2},
      ${size * 0.75} ${waveBaseY}
    C ${size * 0.9}  ${waveBaseY + waveHeight / 2},
      ${size}        ${waveBaseY + waveHeight},
      ${size}        ${size}
    L ${size} ${size}
    L 0 ${size}
    Z
  `;

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Defs>
          <ClipPath id="clipCircle">
            <Circle cx={cx} cy={cy} r={radius - 8} />
          </ClipPath>

          <LinearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#3D2F3A" stopOpacity={0.9} />
            <Stop offset="100%" stopColor="#1F1F28" stopOpacity={0.95} />
          </LinearGradient>
        </Defs>

        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={colors.accent}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={[dashLength, dashGap]}
          strokeLinecap="round"
        />

        <Path
          d={wavePath}
          fill="url(#waveGradient)"
          clipPath="url(#clipCircle)"
        />
      </Svg>

      <View style={styles.centerContent}>
        <PersonStanding size={40} color={colors.accentBlue} />

        <Text style={styles.stepCount}>{steps.toLocaleString()}</Text>
        <Text style={styles.dailyLabel}>Daily Steps</Text>

        <View style={styles.statsRow}>
          <StatChip icon={Flame} label="236 kcal" />
          <StatChip icon={Clock3} label="50 min" active />
          <StatChip icon={MapPin} label="5 km" />
        </View>
      </View>
    </View>
  );
};

export default ProgressRing;

const StatChip: React.FC<StatChipProps> = ({ icon: Icon, label, active }) => {
  const ringColor = active ? colors.accentBlue : colors.accent;

  return (
    <View style={styles.statChip}>
      <View style={[styles.statIconCircle, { borderColor: ringColor }]}>
        <Icon size={14} color={ringColor} />
      </View>
      <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  centerContent: {
    position: "absolute",
    alignItems: "center",
    width: "100%",
    top: "18%",
  },
  stepCount: {
    fontSize: 34,
    fontWeight: "800",
    color: "#000",
  },
  dailyLabel: {
    marginTop: 4,
    fontSize: 16,
    color: colors.textSecondary,
  },
  statsRow: {
    marginTop: 24,
    flexDirection: "row",
    width: "75%",
    justifyContent: "space-between",
  },
  statChip: {
    alignItems: "center",
  },
  statIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
});
