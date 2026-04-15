import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../design/tokens";
import {
  AppScreen,
  BrandHeader,
  MetricCard,
  PrimaryButton,
  SecondaryButton,
  SectionEyebrow,
} from "../components/appPrimitives";
import {
  getNextScreen,
  getPreviousScreen,
  screenIdToCluster,
  screenIdToLabel,
} from "../navigation/flow";

function FallbackScreen({ screenId, onNavigate, onBack }) {
  const nextScreen = getNextScreen(screenId);
  const previousScreen = getPreviousScreen(screenId);

  return (
    <AppScreen
      footer={
        <>
          {previousScreen !== screenId ? (
            <SecondaryButton
              label="Previous frame"
              onPress={() => {
                if (onBack) {
                  onBack();
                  return;
                }

                onNavigate(previousScreen);
              }}
            />
          ) : null}
          {nextScreen !== screenId ? (
            <PrimaryButton
              label="Next frame"
              onPress={() => onNavigate(nextScreen)}
            />
          ) : null}
        </>
      }
    >
      <BrandHeader title="AI Tutor" onBack={onBack} />
      <SectionEyebrow>{screenIdToCluster(screenId)}</SectionEyebrow>
      <Text style={styles.title}>{screenIdToLabel(screenId)}</Text>
      <Text style={styles.copy}>
        This frame is now on the native React Native route map and no longer
        depends on HTML runtime. I will keep replacing these fallback views
        cluster by cluster with full native implementations.
      </Text>

      <View style={styles.metricRow}>
        <MetricCard label="Frame ID" value={screenId.split("_")[0]} />
        <MetricCard label="Cluster" value={screenIdToCluster(screenId)} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardEyebrow}>Current state</Text>
        <Text style={styles.cardTitle}>Native fallback screen</Text>
        <Text style={styles.cardCopy}>
          Navigation, back behavior, and project structure are all React Native
          now. Visual parity for this specific frame is queued in its cluster.
        </Text>
      </View>

      <View style={styles.routeCard}>
        <Text style={styles.routeLabel}>Previous</Text>
        <Text style={styles.routeValue}>
          {previousScreen === screenId
            ? "Start of flow"
            : screenIdToLabel(previousScreen)}
        </Text>
        <Text style={styles.routeLabel}>Next</Text>
        <Text style={styles.routeValue}>
          {nextScreen === screenId ? "End of flow" : screenIdToLabel(nextScreen)}
        </Text>
      </View>
    </AppScreen>
  );
}

export function renderFallbackScreen(screenId, props) {
  return <FallbackScreen key={screenId} screenId={screenId} {...props} />;
}

const styles = StyleSheet.create({
  title: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40,
    marginBottom: 12,
  },
  copy: {
    color: COLORS.textMuted,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  metricRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  card: {
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 24,
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  cardEyebrow: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },
  cardCopy: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 23,
  },
  routeCard: {
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLow,
    padding: 20,
    gap: 6,
  },
  routeLabel: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 6,
  },
  routeValue: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "700",
  },
});
