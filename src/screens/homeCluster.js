import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../design/tokens";
import {
  AppScreen,
  MetricCard,
  PrimaryButton,
  SecondaryButton,
} from "../components/appPrimitives";

export const HOME_SCREEN_IDS = ["11_home_dashboard"];

function HomeTopBar() {
  return (
    <View style={styles.topBar}>
      <View style={styles.brandRow}>
        <View style={styles.brandMark} />
        <Text style={styles.brandText}>AI Tutor</Text>
      </View>
      <View style={styles.avatarShell}>
        <Text style={styles.avatarText}>P</Text>
      </View>
    </View>
  );
}

function HomeBottomTabs({ onNavigate }) {
  const items = [
    { label: "Home", active: true, onPress: () => onNavigate("11_home_dashboard") },
    { label: "Learn", onPress: () => onNavigate("31_grammar_modules") },
    { label: "Tutor", onPress: () => onNavigate("51_ai_tutor_home") },
    { label: "Profile", onPress: () => onNavigate("85_profile_overview") },
  ];

  return (
    <View style={styles.bottomTabs}>
      {items.map((item) => (
        <Pressable
          key={item.label}
          onPress={item.onPress}
          style={({ pressed }) => [
            styles.bottomTab,
            item.active && styles.bottomTabActive,
            pressed && styles.pressed,
          ]}
        >
          <View style={[styles.bottomTabDot, item.active && styles.bottomTabDotActive]} />
          <Text style={[styles.bottomTabLabel, item.active && styles.bottomTabLabelActive]}>
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function HomeDashboardScreen({ onNavigate }) {
  return (
    <AppScreen footer={<HomeBottomTabs onNavigate={onNavigate} />}>
      <HomeTopBar />
      <Text style={styles.homeGreeting}>Welcome back</Text>
      <Text style={styles.largeHeadline}>Focus on today.</Text>

      <View style={styles.goalCard}>
        <View style={styles.goalRing}>
          <View style={styles.goalRingInner}>
            <Text style={styles.goalRingValue}>75%</Text>
          </View>
        </View>
        <View style={styles.goalCopy}>
          <Text style={styles.goalLabel}>Daily goal</Text>
          <Text style={styles.goalTitle}>Almost there.</Text>
          <Text style={styles.goalText}>Two more small actions will complete today's stack.</Text>
        </View>
      </View>

      <Pressable
        onPress={() => onNavigate("12_today_plan_stack")}
        style={({ pressed }) => [styles.todayCard, pressed && styles.todayCardPressed]}
      >
        <Text style={styles.todayTag}>Today's peak</Text>
        <Text style={styles.todayTitle}>Mastering idioms in business</Text>
        <Text style={styles.todayCopy}>15 minutes of immersive contextual practice.</Text>
      </Pressable>
      <View style={styles.metricRow}>
        <MetricCard label="Day streak" value="12" />
        <MetricCard label="Words" value="450" />
      </View>

      <View style={styles.quickRow}>
        <PrimaryButton label="Continue lesson" onPress={() => onNavigate("13_continue_lesson")} compact />
        <SecondaryButton label="Vocabulary" onPress={() => onNavigate("21_vocabulary_topics")} />
      </View>

      <View style={styles.homeActions}>
        <SecondaryButton label="AI Tutor" onPress={() => onNavigate("51_ai_tutor_home")} />
        <SecondaryButton label="Progress" onPress={() => onNavigate("71_progress_overview")} />
      </View>
    </AppScreen>
  );
}

export function renderHomeScreen(screenId, props) {
  if (screenId === "11_home_dashboard") {
    return <HomeDashboardScreen {...props} />;
  }

  return null;
}

const styles = StyleSheet.create({
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  brandMark: {
    width: 24,
    height: 24,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  brandText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "800",
  },
  avatarShell: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: "800",
  },
  homeGreeting: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  largeHeadline: {
    color: COLORS.text,
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "300",
    letterSpacing: -1.2,
    marginBottom: 14,
  },
  goalCard: {
    borderRadius: 30,
    backgroundColor: COLORS.surface,
    padding: 20,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  goalRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(34,197,94,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  goalRingInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  goalRingValue: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "900",
  },
  goalCopy: {
    flex: 1,
  },
  goalLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.1,
    marginBottom: 6,
  },
  goalTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },
  goalText: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  todayCard: {
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    padding: 24,
    marginBottom: 16,
  },
  todayCardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.94,
  },
  todayTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 18,
  },
  todayTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
    marginBottom: 8,
  },
  todayCopy: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 15,
    lineHeight: 24,
  },
  metricRow: {
    flexDirection: "row",
    gap: 12,
  },
  quickRow: {
    gap: 12,
    marginTop: 18,
  },
  homeActions: {
    gap: 12,
    marginTop: 12,
  },
  bottomTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(245,250,247,0.98)",
    borderRadius: 28,
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  bottomTab: {
    flex: 1,
    minHeight: 52,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  bottomTabActive: {
    backgroundColor: COLORS.primarySoft,
  },
  bottomTabDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(61,74,61,0.18)",
  },
  bottomTabDotActive: {
    backgroundColor: COLORS.primary,
  },
  bottomTabLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  bottomTabLabelActive: {
    color: COLORS.primary,
    fontWeight: "800",
  },
});
