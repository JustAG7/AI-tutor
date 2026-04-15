import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../design/tokens";
import {
  AppScreen,
  BrandHeader,
  MetricCard,
  Pill,
  PrimaryButton,
  SecondaryButton,
  SectionEyebrow,
} from "../components/appPrimitives";

export const LISTENING_SPEAKING_SCREEN_IDS = [
  "41_listening_list",
  "42_audio_player",
  "43_listening_question",
  "44_listening_review",
  "45_speaking_intro",
  "46_recording",
  "47_pronunciation_score",
  "48_ai_feedback_detail",
  "49_shadowing_mode",
  "50_speaking_summary",
];

function ModuleRow({ title, meta, onPress, featured }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.moduleRow,
        featured && styles.moduleRowFeatured,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.moduleArt} />
      <View style={styles.moduleCopy}>
        <Text style={styles.moduleTitle}>{title}</Text>
        <Text style={styles.moduleMeta}>{meta}</Text>
      </View>
    </Pressable>
  );
}

function ListeningListScreen({ onNavigate, onBack }) {
  return (
    <AppScreen footer={<PrimaryButton label="Open player" onPress={() => onNavigate("42_audio_player")} />}>
      <BrandHeader title="Listening" onBack={onBack} />
      <SectionEyebrow>Listening / speaking</SectionEyebrow>
      <Text style={styles.title}>Choose a short listening set.</Text>
      <View style={styles.stack}>
        <ModuleRow title="Daily commute" meta="3 min • intermediate" featured onPress={() => onNavigate("42_audio_player")} />
        <ModuleRow title="At the market" meta="2 min • beginner" onPress={() => onNavigate("42_audio_player")} />
        <ModuleRow title="Team standup" meta="4 min • advanced" onPress={() => onNavigate("42_audio_player")} />
      </View>
    </AppScreen>
  );
}

function AudioPlayerScreen({ onNavigate, onBack }) {
  return (
    <AppScreen footer={<PrimaryButton label="Answer question" onPress={() => onNavigate("43_listening_question")} />}>
      <BrandHeader title="Audio Player" onBack={onBack} />
      <View style={styles.playerCard}>
        <View style={styles.waveBlock}>
          <View style={styles.waveTall} />
          <View style={styles.waveShort} />
          <View style={styles.waveTall} />
          <View style={styles.waveMid} />
          <View style={styles.waveShort} />
          <View style={styles.waveTall} />
        </View>
        <Text style={styles.playerTime}>01:24 / 03:00</Text>
        <View style={styles.controlRow}>
          <View style={styles.controlGhost} />
          <View style={styles.controlPrimary} />
          <View style={styles.controlGhost} />
        </View>
      </View>
    </AppScreen>
  );
}

function ListeningQuestionScreen({ onNavigate, onBack }) {
  const [selected, setSelected] = useState("He missed the train.");
  const options = [
    "He missed the train.",
    "He arrived too early.",
    "He changed his route.",
    "He stayed home instead.",
  ];

  return (
    <AppScreen footer={<PrimaryButton label="Check answer" onPress={() => onNavigate("44_listening_review")} />}>
      <BrandHeader title="Questions" onBack={onBack} progressText="1/3" progressValue={33} />
      <Text style={styles.questionTitle}>What happened to the speaker?</Text>
      <View style={styles.optionStack}>
        {options.map((option) => (
          <Pressable
            key={option}
            onPress={() => setSelected(option)}
            style={({ pressed }) => [
              styles.optionCard,
              selected === option && styles.optionCardSelected,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.optionText, selected === option && styles.optionTextSelected]}>
              {option}
            </Text>
          </Pressable>
        ))}
      </View>
    </AppScreen>
  );
}

function ListeningReviewScreen({ onNavigate, onBack }) {
  return (
    <AppScreen footer={<PrimaryButton label="Start speaking" onPress={() => onNavigate("45_speaking_intro")} />}>
      <BrandHeader title="Review" onBack={onBack} />
      <View style={styles.feedbackCard}>
        <Text style={styles.feedbackEyebrow}>Answer review</Text>
        <Text style={styles.feedbackTitle}>Correct</Text>
        <Text style={styles.feedbackCopy}>
          The speaker said he missed the train because he arrived late to the platform.
        </Text>
      </View>
    </AppScreen>
  );
}

function SpeakingIntroScreen({ onNavigate, onBack }) {
  return (
    <AppScreen footer={<PrimaryButton label="Record voice" onPress={() => onNavigate("46_recording")} />}>
      <BrandHeader title="Speaking Intro" onBack={onBack} />
      <View style={styles.heroCard}>
        <Text style={styles.heroEyebrow}>Shadow and respond</Text>
        <Text style={styles.heroTitle}>Repeat the sentence with natural pacing</Text>
        <Text style={styles.heroCopy}>Listen once, then record your version clearly.</Text>
      </View>
    </AppScreen>
  );
}

function RecordingScreen({ onNavigate, onBack }) {
  return (
    <AppScreen footer={<PrimaryButton label="See score" onPress={() => onNavigate("47_pronunciation_score")} />}>
      <BrandHeader title="Record Voice" onBack={onBack} />
      <View style={styles.recordOrbWrap}>
        <View style={styles.recordOrb}>
          <View style={styles.recordDot} />
        </View>
        <Text style={styles.recordLabel}>Recording</Text>
      </View>
      <Text style={styles.centerCopy}>Try: "I would like to reserve a table for two."</Text>
    </AppScreen>
  );
}

function PronunciationScoreScreen({ onNavigate, onBack }) {
  return (
    <AppScreen footer={<PrimaryButton label="AI feedback" onPress={() => onNavigate("48_ai_feedback_detail")} />}>
      <BrandHeader title="Pronunciation Score" onBack={onBack} />
      <View style={styles.scoreRing}>
        <View style={styles.scoreInner}>
          <Text style={styles.scoreValue}>82%</Text>
        </View>
      </View>
      <View style={styles.metricRow}>
        <MetricCard label="Clarity" value="Good" />
        <MetricCard label="Rhythm" value="Improve" />
      </View>
    </AppScreen>
  );
}

function FeedbackDetailScreen({ onNavigate, onBack }) {
  return (
    <AppScreen footer={<PrimaryButton label="Shadow mode" onPress={() => onNavigate("49_shadowing_mode")} />}>
      <BrandHeader title="AI Feedback Detail" onBack={onBack} />
      <View style={styles.feedbackCard}>
        <Text style={styles.feedbackEyebrow}>Insight</Text>
        <Text style={styles.feedbackTitle}>Soften the ending consonants</Text>
        <Text style={styles.feedbackCopy}>
          Your phrasing is clear, but the last word drops too quickly. Hold the
          final sound a little longer.
        </Text>
      </View>
      <View style={styles.pillRow}>
        <Pill label="Clarity" selected />
        <Pill label="Stress" />
        <Pill label="Pacing" />
      </View>
    </AppScreen>
  );
}

function ShadowingModeScreen({ onNavigate, onBack }) {
  return (
    <AppScreen footer={<PrimaryButton label="Finish session" onPress={() => onNavigate("50_speaking_summary")} />}>
      <BrandHeader title="Shadowing" onBack={onBack} />
      <View style={styles.shadowCard}>
        <Text style={styles.shadowText}>I would like to reserve a table for two.</Text>
      </View>
      <View style={styles.controlRow}>
        <View style={styles.controlGhost} />
        <View style={styles.controlPrimary} />
        <View style={styles.controlGhost} />
      </View>
    </AppScreen>
  );
}

function SpeakingSummaryScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      footer={
        <>
          <PrimaryButton label="Back to home" onPress={() => onNavigate("11_home_dashboard")} />
          <SecondaryButton label="Open tutor" onPress={() => onNavigate("51_ai_tutor_home")} />
        </>
      }
    >
      <BrandHeader title="Summary" onBack={onBack} />
      <View style={styles.metricRow}>
        <MetricCard label="Score" value="82%" />
        <MetricCard label="Attempts" value="3" />
      </View>
      <View style={styles.feedbackCard}>
        <Text style={styles.feedbackEyebrow}>Session summary</Text>
        <Text style={styles.feedbackTitle}>Strong improvement</Text>
        <Text style={styles.feedbackCopy}>
          Your second and third attempts sounded more stable and confident than the first.
        </Text>
      </View>
    </AppScreen>
  );
}

export function renderListeningSpeakingScreen(screenId, props) {
  switch (screenId) {
    case "41_listening_list":
      return <ListeningListScreen key={screenId} {...props} />;
    case "42_audio_player":
      return <AudioPlayerScreen key={screenId} {...props} />;
    case "43_listening_question":
      return <ListeningQuestionScreen key={screenId} {...props} />;
    case "44_listening_review":
      return <ListeningReviewScreen key={screenId} {...props} />;
    case "45_speaking_intro":
      return <SpeakingIntroScreen key={screenId} {...props} />;
    case "46_recording":
      return <RecordingScreen key={screenId} {...props} />;
    case "47_pronunciation_score":
      return <PronunciationScoreScreen key={screenId} {...props} />;
    case "48_ai_feedback_detail":
      return <FeedbackDetailScreen key={screenId} {...props} />;
    case "49_shadowing_mode":
      return <ShadowingModeScreen key={screenId} {...props} />;
    case "50_speaking_summary":
      return <SpeakingSummaryScreen key={screenId} {...props} />;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  title: {
    color: COLORS.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
    marginBottom: 16,
  },
  stack: {
    gap: 14,
  },
  moduleRow: {
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  moduleRowFeatured: {
    backgroundColor: COLORS.surfaceLow,
  },
  moduleArt: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "rgba(0,110,47,0.10)",
  },
  moduleCopy: {
    flex: 1,
  },
  moduleTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  moduleMeta: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  playerCard: {
    borderRadius: 30,
    backgroundColor: COLORS.surface,
    padding: 24,
  },
  waveBlock: {
    minHeight: 180,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLow,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 18,
  },
  waveTall: {
    width: 8,
    height: 88,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  waveMid: {
    width: 8,
    height: 58,
    borderRadius: 999,
    backgroundColor: COLORS.primaryBright,
  },
  waveShort: {
    width: 8,
    height: 36,
    borderRadius: 999,
    backgroundColor: COLORS.tertiary,
  },
  playerTime: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 18,
  },
  controlRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  controlGhost: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surfaceLow,
  },
  controlPrimary: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: COLORS.primary,
  },
  questionTitle: {
    color: COLORS.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    marginBottom: 18,
  },
  optionStack: {
    gap: 12,
  },
  optionCard: {
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  optionCardSelected: {
    backgroundColor: COLORS.surfaceLow,
    borderColor: COLORS.primary,
  },
  optionText: {
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
  },
  optionTextSelected: {
    color: COLORS.primary,
  },
  feedbackCard: {
    borderRadius: 30,
    backgroundColor: COLORS.surface,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  feedbackEyebrow: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  feedbackTitle: {
    color: COLORS.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    marginBottom: 10,
  },
  feedbackCopy: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  heroCard: {
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    padding: 24,
  },
  heroEyebrow: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    marginBottom: 10,
  },
  heroCopy: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 15,
    lineHeight: 24,
  },
  recordOrbWrap: {
    alignItems: "center",
    marginTop: 42,
    marginBottom: 24,
  },
  recordOrb: {
    width: 136,
    height: 136,
    borderRadius: 68,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  recordDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#D92D20",
  },
  recordLabel: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "800",
  },
  centerCopy: {
    color: COLORS.textMuted,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  scoreRing: {
    width: 176,
    height: 176,
    borderRadius: 88,
    alignSelf: "center",
    backgroundColor: "rgba(34,197,94,0.14)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  scoreInner: {
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreValue: {
    color: COLORS.primary,
    fontSize: 40,
    fontWeight: "900",
  },
  metricRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18,
  },
  shadowCard: {
    borderRadius: 30,
    backgroundColor: COLORS.surface,
    padding: 24,
    marginBottom: 22,
  },
  shadowText: {
    color: COLORS.text,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    textAlign: "center",
  },
});
