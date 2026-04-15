import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../design/tokens";

export function AppScreen({
  children,
  footer,
  scroll = true,
  decorative = true,
  footerMode = "floating",
  contentPaddingTop = 28,
  contentPaddingBottom,
}) {
  const resolvedBottomPadding =
    contentPaddingBottom ?? (footerMode === "floating" ? 184 : 48);

  const content = scroll ? (
    <ScrollView
      bounces={false}
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingTop: contentPaddingTop,
          paddingBottom: resolvedBottomPadding,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {children}
      {footer && footerMode !== "floating" ? (
        <View style={styles.footerInline}>{footer}</View>
      ) : null}
    </ScrollView>
  ) : (
    <View
      style={[
        styles.staticContent,
        {
          paddingTop: contentPaddingTop,
          paddingBottom: resolvedBottomPadding,
        },
      ]}
    >
      {children}
      {footer && footerMode !== "floating" ? (
        <View style={styles.footerInline}>{footer}</View>
      ) : null}
    </View>
  );

  return (
    <View style={styles.screen}>
      {decorative ? <View style={styles.glowOne} /> : null}
      {decorative ? <View style={styles.glowTwo} /> : null}
      {content}
      {footer && footerMode === "floating" ? (
        <View style={styles.footer}>{footer}</View>
      ) : null}
    </View>
  );
}

export function BrandHeader({
  title = "AI Tutor",
  progressText,
  progressValue,
  onBack,
}) {
  return (
    <View style={styles.headerRow}>
      <View style={styles.brandRow}>
        {onBack ? (
          <Pressable onPress={onBack} style={styles.backGhost}>
            <Text style={styles.backGhostText}>{"<"}</Text>
          </Pressable>
        ) : (
          <View style={styles.brandIcon}>
            <Text style={styles.brandIconText}>AI</Text>
          </View>
        )}
        <Text style={styles.brandText}>{title}</Text>
      </View>
      {progressText ? (
        <View style={styles.progressRow}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressValue}%` }]} />
          </View>
          <Text style={styles.progressText}>{progressText}</Text>
        </View>
      ) : null}
    </View>
  );
}

export function PrimaryButton({ label, onPress, compact = false }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        compact && styles.primaryButtonCompact,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}

export function SecondaryButton({ label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.secondaryButton,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </Pressable>
  );
}

export function MetricCard({ label, value }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

export function Pill({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        selected && styles.pillSelected,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={[styles.pillText, selected && styles.pillTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function ValueProp({ title }) {
  return (
    <View style={styles.valueRow}>
      <View style={styles.valueDot} />
      <Text style={styles.valueText}>{title}</Text>
    </View>
  );
}

export function HomeNav({ onNavigate }) {
  return (
    <View style={styles.bottomNav}>
      <Pressable
        onPress={() => onNavigate("31_grammar_modules")}
        style={styles.bottomNavItemActive}
      >
        <Text style={styles.bottomNavTextActive}>Learn</Text>
      </Pressable>
      <Pressable
        onPress={() => onNavigate("51_ai_tutor_home")}
        style={styles.bottomNavItem}
      >
        <Text style={styles.bottomNavText}>Tutor</Text>
      </Pressable>
      <Pressable
        onPress={() => onNavigate("71_progress_overview")}
        style={styles.bottomNavItem}
      >
        <Text style={styles.bottomNavText}>Progress</Text>
      </Pressable>
      <Pressable
        onPress={() => onNavigate("85_profile_overview")}
        style={styles.bottomNavItem}
      >
        <Text style={styles.bottomNavText}>Profile</Text>
      </Pressable>
    </View>
  );
}

export function GlowImageCard({ source, height = 188, mode = "cover" }) {
  return (
    <View style={styles.imageCard}>
      <Image source={{ uri: source }} style={[styles.heroImage, { height, resizeMode: mode }]} />
    </View>
  );
}

export function SectionEyebrow({ children }) {
  return <Text style={styles.eyebrow}>{children}</Text>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  staticContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,
    gap: 12,
  },
  footerInline: {
    gap: 12,
    marginTop: 20,
  },
  glowOne: {
    position: "absolute",
    right: -80,
    top: -40,
    width: 240,
    height: 240,
    borderRadius: 999,
    backgroundColor: "rgba(107,255,143,0.16)",
  },
  glowTwo: {
    position: "absolute",
    left: -96,
    top: 240,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: "rgba(109,254,156,0.12)",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  brandIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  brandIconText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
  },
  brandText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "800",
  },
  backGhost: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  backGhostText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "800",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  progressTrack: {
    width: 64,
    height: 6,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceHigh,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  progressText: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  primaryButton: {
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: COLORS.primaryBright,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primary,
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  primaryButtonCompact: {
    minHeight: 52,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  secondaryButton: {
    minHeight: 56,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.55)",
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: "700",
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.94,
  },
  metricCard: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: COLORS.surfaceLow,
    padding: 16,
  },
  metricLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  metricValue: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
  },
  pill: {
    minHeight: 48,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.outline,
    justifyContent: "center",
  },
  pillSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  pillText: {
    color: COLORS.textMuted,
    fontSize: 15,
    fontWeight: "700",
  },
  pillTextSelected: {
    color: "#FFFFFF",
  },
  valueRow: {
    minHeight: 72,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceLow,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    gap: 14,
  },
  valueDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.primary,
  },
  valueText: {
    color: COLORS.textMuted,
    fontSize: 17,
    fontWeight: "600",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(245,250,247,0.94)",
    borderRadius: 28,
    padding: 8,
  },
  bottomNavItem: {
    flex: 1,
    minHeight: 48,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomNavItemActive: {
    flex: 1,
    minHeight: 48,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primarySoft,
  },
  bottomNavText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: "700",
  },
  bottomNavTextActive: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "800",
  },
  imageCard: {
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#DEE4E1",
    minHeight: 180,
  },
  heroImage: {
    width: "100%",
  },
  eyebrow: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: COLORS.primarySoft,
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 14,
  },
});

export const sharedStyles = styles;
