import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../design/tokens";
import {
  AppScreen,
  BrandHeader,
  MetricCard,
  PrimaryButton,
  SecondaryButton,
  SectionEyebrow,
} from "../components/appPrimitives";

export const SYSTEM_SCREEN_IDS = [
  "91_offline_mode_notice",
  "92_connection_retry",
  "93_generic_error",
  "94_ai_unavailable_fallback",
  "95_permission_denied",
  "96_empty_state_no_lessons",
  "97_loading_skeleton",
  "98_success_toast_banner",
  "99_critical_confirm_modal",
  "100_session_timeout",
];

let systemStore = {
  retryCount: 0,
  lastToast: "Changes saved",
  sessionExpired: false,
};

function incrementRetry() {
  systemStore = {
    ...systemStore,
    retryCount: systemStore.retryCount + 1,
  };
}

function setToast(message) {
  systemStore = {
    ...systemStore,
    lastToast: message,
  };
}

function SystemHero({ title, copy, accent = "soft" }) {
  return (
    <View style={[styles.heroCard, accent === "strong" && styles.heroCardStrong]}>
      <View style={[styles.heroOrb, accent === "strong" && styles.heroOrbStrong]} />
      <Text style={[styles.heroTitle, accent === "strong" && styles.heroTitleStrong]}>
        {title}
      </Text>
      <Text style={[styles.heroCopy, accent === "strong" && styles.heroCopyStrong]}>
        {copy}
      </Text>
    </View>
  );
}

function OfflineNoticeScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Go home" onPress={() => onNavigate("11_home_dashboard")} />
          <PrimaryButton label="Try reconnecting" onPress={() => onNavigate("92_connection_retry")} />
        </>
      }
    >
      <BrandHeader title="Offline Mode" onBack={onBack} />
      <SectionEyebrow>Connection</SectionEyebrow>
      <SystemHero
        title="You are offline"
        copy="Recently loaded content is still available, but live tutor and sync-dependent actions are paused until the connection returns."
      />
    </AppScreen>
  );
}

function ConnectionRetryScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Open offline mode" onPress={() => onNavigate("91_offline_mode_notice")} />
          <PrimaryButton
            label="Retry now"
            onPress={() => {
              incrementRetry();
              onNavigate("98_success_toast_banner");
            }}
          />
        </>
      }
    >
      <BrandHeader title="Retry Connection" onBack={onBack} />
      <SystemHero
        title="Trying again"
        copy="The app is attempting to reconnect and refresh your latest session data."
      />
      <View style={styles.metricRow}>
        <MetricCard label="Retries" value={`${systemStore.retryCount}`} />
        <MetricCard label="Status" value="Waiting" />
      </View>
    </AppScreen>
  );
}

function GenericErrorScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Report issue" onPress={() => setToast("Error report prepared")} />
          <PrimaryButton label="Go home" onPress={() => onNavigate("11_home_dashboard")} />
        </>
      }
    >
      <BrandHeader title="Error" onBack={onBack} />
      <SystemHero
        title="Something went wrong"
        copy="This action could not be completed right now. You can safely return home and try again."
        accent="strong"
      />
    </AppScreen>
  );
}

function AiUnavailableScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Open vocabulary" onPress={() => onNavigate("21_vocabulary_topics")} />
          <PrimaryButton label="Use assessment instead" onPress={() => onNavigate("61_quiz_mode_selector")} />
        </>
      }
    >
      <BrandHeader title="AI Unavailable" onBack={onBack} />
      <SystemHero
        title="AI Tutor is temporarily unavailable"
        copy="You can continue with modules, assessments, and progress review while live tutor support is paused."
      />
    </AppScreen>
  );
}

function PermissionDeniedScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Open settings" onPress={() => onNavigate("88_notification_settings")} />
          <PrimaryButton label="Continue without permission" onPress={() => onNavigate("11_home_dashboard")} />
        </>
      }
    >
      <BrandHeader title="Permission" onBack={onBack} />
      <SystemHero
        title="Permission denied"
        copy="A required permission was not granted. You can continue using most of the app, or reopen settings and allow access."
      />
    </AppScreen>
  );
}

function EmptyLessonsScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Browse topics" onPress={() => onNavigate("21_vocabulary_topics")} />
          <PrimaryButton label="Open AI Tutor" onPress={() => onNavigate("51_ai_tutor_home")} />
        </>
      }
    >
      <BrandHeader title="Empty State" onBack={onBack} />
      <SystemHero
        title="No lessons available"
        copy="There are no scheduled lessons right now, but you can continue with tutor practice or vocabulary modules."
      />
    </AppScreen>
  );
}

function LoadingSkeletonScreen({ onNavigate, onBack }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        done ? (
          <PrimaryButton label="Continue" onPress={() => onNavigate("11_home_dashboard")} />
        ) : null
      }
    >
      <BrandHeader title="Loading" onBack={onBack} />
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>
          {done ? "Content is ready." : "Preparing your next lesson..."}
        </Text>
      </View>
      <View style={styles.skeletonStack}>
        <View style={styles.skeletonBlockLarge} />
        <View style={styles.skeletonRow}>
          <View style={styles.skeletonBlockSmall} />
          <View style={styles.skeletonBlockSmall} />
        </View>
        <View style={styles.skeletonBlockMedium} />
      </View>
    </AppScreen>
  );
}

function SuccessToastScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Open profile" onPress={() => onNavigate("85_profile_overview")} />
          <PrimaryButton label="Continue home" onPress={() => onNavigate("11_home_dashboard")} />
        </>
      }
    >
      <BrandHeader title="Toast" onBack={onBack} />
      <View style={styles.toastBanner}>
        <Text style={styles.toastTitle}>Success</Text>
        <Text style={styles.toastCopy}>{systemStore.lastToast}</Text>
      </View>
      <SystemHero
        title="Action completed"
        copy="This represents a lightweight success state that can appear after saves, retries, or simple updates."
      />
    </AppScreen>
  );
}

function CriticalConfirmScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Cancel" onPress={onBack} />
          <PrimaryButton
            label="Confirm action"
            onPress={() => {
              setToast("Critical action confirmed");
              onNavigate("98_success_toast_banner");
            }}
          />
        </>
      }
    >
      <BrandHeader title="Confirm" onBack={onBack} />
      <View style={styles.modalCard}>
        <Text style={styles.modalTitle}>Are you sure?</Text>
        <Text style={styles.modalCopy}>
          This confirms a critical action inside the app flow and behaves like a real confirmation state.
        </Text>
      </View>
    </AppScreen>
  );
}

function SessionTimeoutScreen({ onNavigate, onBack }) {
  useEffect(() => {
    systemStore = {
      ...systemStore,
      sessionExpired: true,
    };
  }, []);

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Go home" onPress={() => onNavigate("11_home_dashboard")} />
          <PrimaryButton label="Sign in again" onPress={() => onNavigate("07_sign_up_sign_in")} />
        </>
      }
    >
      <BrandHeader title="Session Timeout" onBack={onBack} />
      <SystemHero
        title="Your session expired"
        copy="For security, the session timed out. Sign in again to resume synchronized features."
        accent="strong"
      />
    </AppScreen>
  );
}

export function renderSystemScreen(screenId, props) {
  switch (screenId) {
    case "91_offline_mode_notice":
      return <OfflineNoticeScreen key={screenId} {...props} />;
    case "92_connection_retry":
      return <ConnectionRetryScreen key={screenId} {...props} />;
    case "93_generic_error":
      return <GenericErrorScreen key={screenId} {...props} />;
    case "94_ai_unavailable_fallback":
      return <AiUnavailableScreen key={screenId} {...props} />;
    case "95_permission_denied":
      return <PermissionDeniedScreen key={screenId} {...props} />;
    case "96_empty_state_no_lessons":
      return <EmptyLessonsScreen key={screenId} {...props} />;
    case "97_loading_skeleton":
      return <LoadingSkeletonScreen key={screenId} {...props} />;
    case "98_success_toast_banner":
      return <SuccessToastScreen key={screenId} {...props} />;
    case "99_critical_confirm_modal":
      return <CriticalConfirmScreen key={screenId} {...props} />;
    case "100_session_timeout":
      return <SessionTimeoutScreen key={screenId} {...props} />;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 30,
    backgroundColor: COLORS.surface,
    padding: 24,
    alignItems: "center",
  },
  heroCardStrong: {
    backgroundColor: COLORS.primary,
  },
  heroOrb: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "rgba(0,110,47,0.12)",
    marginBottom: 18,
  },
  heroOrbStrong: {
    backgroundColor: "rgba(255,255,255,0.16)",
  },
  heroTitle: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },
  heroTitleStrong: {
    color: "#FFFFFF",
  },
  heroCopy: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
  },
  heroCopyStrong: {
    color: "rgba(255,255,255,0.86)",
  },
  metricRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },
  loadingWrap: {
    alignItems: "center",
    marginBottom: 20,
  },
  loadingText: {
    color: COLORS.textMuted,
    fontSize: 15,
    marginTop: 12,
  },
  skeletonStack: {
    gap: 14,
  },
  skeletonRow: {
    flexDirection: "row",
    gap: 14,
  },
  skeletonBlockLarge: {
    height: 120,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLow,
  },
  skeletonBlockMedium: {
    height: 80,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLow,
  },
  skeletonBlockSmall: {
    flex: 1,
    height: 92,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLow,
  },
  toastBanner: {
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    padding: 18,
    marginBottom: 18,
  },
  toastTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  toastCopy: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  modalCard: {
    borderRadius: 30,
    backgroundColor: COLORS.surface,
    padding: 24,
  },
  modalTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 10,
  },
  modalCopy: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
});
