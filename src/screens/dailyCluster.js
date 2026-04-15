import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../design/tokens";
import {
  AppScreen,
  MetricCard,
  Pill,
  PrimaryButton,
  SecondaryButton,
  SectionEyebrow,
} from "../components/appPrimitives";

export const DAILY_SCREEN_IDS = [
  "12_today_plan_stack",
  "13_continue_lesson",
  "14_streak_xp",
  "15_navigation_variants",
  "16_empty_home_state",
  "17_ai_recommendation",
  "18_quick_practice",
  "19_recent_words_1",
  "19_recent_words_2",
  "20_notifications_entry",
];

function DailyTopBar({ title, onBack }) {
  return (
    <View style={styles.topBar}>
      <View style={styles.topBarLeft}>
        {onBack ? (
          <Pressable onPress={onBack} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
            <Text style={styles.backButtonText}>{"<"}</Text>
          </Pressable>
        ) : (
          <View style={styles.topMark} />
        )}
        <Text style={styles.topTitle}>{title}</Text>
      </View>
      <View style={styles.topAvatar}>
        <Text style={styles.topAvatarText}>P</Text>
      </View>
    </View>
  );
}

function Tile({ title, copy, tone = "surface", onPress, large }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        large && styles.tileLarge,
        tone === "primary" && styles.tilePrimary,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.tileOrb, tone === "primary" && styles.tileOrbPrimary]} />
      <Text style={[styles.tileTitle, tone === "primary" && styles.tileTitlePrimary]}>
        {title}
      </Text>
      <Text style={[styles.tileCopy, tone === "primary" && styles.tileCopyPrimary]}>
        {copy}
      </Text>
    </Pressable>
  );
}

function ListRow({ title, meta, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.listRow, pressed && styles.pressed]}>
      <View style={styles.listRowIcon} />
      <View style={styles.listRowCopy}>
        <Text style={styles.listRowTitle}>{title}</Text>
        <Text style={styles.listRowMeta}>{meta}</Text>
      </View>
    </Pressable>
  );
}

function PlanStep({ index, title, meta, accent, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.planStep, pressed && styles.pressed]}>
      <View style={[styles.planIndex, accent === "primary" && styles.planIndexPrimary]}>
        <Text style={[styles.planIndexText, accent === "primary" && styles.planIndexTextPrimary]}>
          {index}
        </Text>
      </View>
      <View style={styles.planCopy}>
        <Text style={styles.planTitle}>{title}</Text>
        <Text style={styles.planMeta}>{meta}</Text>
      </View>
    </Pressable>
  );
}

function ProgressStrip({ value, label }) {
  return (
    <View style={styles.progressStrip}>
      <View style={styles.progressStripTrack}>
        <View style={[styles.progressStripFill, { width: `${value}%` }]} />
      </View>
      <Text style={styles.progressStripLabel}>{label}</Text>
    </View>
  );
}

function TodayPlanScreen({ onNavigate, onBack }) {
  return (
    <AppScreen>
      <DailyTopBar title="Today Plan" onBack={onBack} />
      <SectionEyebrow>Daily learning</SectionEyebrow>
      <Text style={styles.title}>Stack your progress for today.</Text>
      <View style={styles.metricRow}>
        <MetricCard label="Goal" value="15 min" />
        <MetricCard label="Focus" value="Grammar" />
      </View>

      <View style={styles.planCard}>
        <PlanStep
          index="1"
          title="Continue lesson"
          meta="8 min - Mastering idioms in business"
          accent="primary"
          onPress={() => onNavigate("13_continue_lesson")}
        />
        <PlanStep
          index="2"
          title="Quick practice"
          meta="3 min - reinforce tense recall"
          onPress={() => onNavigate("18_quick_practice")}
        />
        <PlanStep
          index="3"
          title="AI recommendation"
          meta="3 min - tutor-led refresher"
          onPress={() => onNavigate("17_ai_recommendation")}
        />
      </View>

      <View style={styles.grid}>
        <Tile title="Recent words" copy="Review saved vocabulary" onPress={() => onNavigate("19_recent_words_1")} />
        <Tile title="Streak / XP" copy="See momentum and reward" onPress={() => onNavigate("14_streak_xp")} />
      </View>
    </AppScreen>
  );
}

function ContinueLessonScreen({ onNavigate, onBack }) {
  return (
    <AppScreen footer={<PrimaryButton label="Resume lesson" onPress={() => onNavigate("14_streak_xp")} />}>
      <DailyTopBar title="Continue Lesson" onBack={onBack} />
      <View style={styles.heroCard}>
        <Text style={styles.heroEyebrow}>Editorial reading</Text>
        <Text style={styles.heroTitle}>Mastering idioms in business</Text>
        <Text style={styles.heroCopy}>15 minutes left in this lesson path.</Text>
      </View>
      <ProgressStrip value={58} label="58% complete" />
      <View style={styles.listCard}>
        <ListRow title="Vocabulary checkpoint" meta="4 words to review" onPress={() => onNavigate("19_recent_words_1")} />
        <ListRow title="Grammar checkpoint" meta="1 quick question" onPress={() => onNavigate("18_quick_practice")} />
      </View>
    </AppScreen>
  );
}

function StreakXpScreen({ onNavigate, onBack }) {
  return (
    <AppScreen footer={<PrimaryButton label="See recommendation" onPress={() => onNavigate("17_ai_recommendation")} />}>
      <DailyTopBar title="Streak / XP" onBack={onBack} />
      <View style={styles.ringWrap}>
        <View style={styles.ringOuter}>
          <View style={styles.ringInner}>
            <Text style={styles.ringValue}>12</Text>
          </View>
        </View>
        <Text style={styles.ringLabel}>Day streak</Text>
      </View>
      <View style={styles.metricRow}>
        <MetricCard label="XP earned" value="+320" />
        <MetricCard label="Best streak" value="19" />
      </View>
      <View style={styles.weekPulseCard}>
        <Text style={styles.weekPulseLabel}>This week</Text>
        <View style={styles.weekPulseBars}>
          <View style={[styles.weekPulseBar, { height: 34 }]} />
          <View style={[styles.weekPulseBar, { height: 52 }]} />
          <View style={[styles.weekPulseBar, { height: 46 }]} />
          <View style={[styles.weekPulseBar, { height: 64 }]} />
          <View style={[styles.weekPulseBar, { height: 58 }]} />
        </View>
      </View>
    </AppScreen>
  );
}

function NavigationVariantsScreen({ onNavigate, onBack }) {
  return (
    <AppScreen>
      <DailyTopBar title="Navigation" onBack={onBack} />
      <Text style={styles.title}>Choose your next path.</Text>
      <View style={styles.pillRow}>
        <Pill label="Daily" selected />
        <Pill label="Learn" onPress={() => onNavigate("31_grammar_modules")} />
        <Pill label="Tutor" onPress={() => onNavigate("51_ai_tutor_home")} />
      </View>
      <View style={styles.grid}>
        <Tile title="Empty home" copy="State without tasks" onPress={() => onNavigate("16_empty_home_state")} />
        <Tile title="AI recommendation" copy="Personalized suggestion" onPress={() => onNavigate("17_ai_recommendation")} />
      </View>
    </AppScreen>
  );
}

function EmptyHomeScreen({ onNavigate, onBack }) {
  return (
    <AppScreen footer={<PrimaryButton label="Open recommendation" onPress={() => onNavigate("17_ai_recommendation")} />}>
      <DailyTopBar title="Today" onBack={onBack} />
      <View style={styles.emptyOrb} />
      <Text style={styles.centerTitle}>Nothing scheduled yet.</Text>
      <Text style={styles.centerCopy}>
        Let AI Tutor suggest a short session based on your recent activity.
      </Text>
    </AppScreen>
  );
}

function RecommendationScreen({ onNavigate, onBack }) {
  return (
    <AppScreen footer={<PrimaryButton label="Start quick practice" onPress={() => onNavigate("18_quick_practice")} />}>
      <DailyTopBar title="AI Recommendation" onBack={onBack} />
      <View style={styles.heroCard}>
        <Text style={styles.heroEyebrow}>Based on your streak</Text>
        <Text style={styles.heroTitle}>Review present perfect before your tutor session</Text>
        <Text style={styles.heroCopy}>A 3-minute refresher will raise your confidence.</Text>
      </View>
      <View style={styles.pillRow}>
        <Pill label="Grammar" selected />
        <Pill label="3 min" />
        <Pill label="High impact" />
      </View>
      <View style={styles.listCard}>
        <ListRow title="Why this matters" meta="You missed 2 tense items yesterday" onPress={() => onNavigate("34_practice_quiz")} />
        <ListRow title="Suggested next step" meta="Jump into one fast drill now" onPress={() => onNavigate("18_quick_practice")} />
      </View>
    </AppScreen>
  );
}

function QuickPracticeScreen({ onNavigate, onBack }) {
  return (
    <AppScreen footer={<PrimaryButton label="Open saved words" onPress={() => onNavigate("19_recent_words_1")} />}>
      <DailyTopBar title="Quick Practice" onBack={onBack} />
      <View style={styles.grid}>
        <Tile title="Grammar pulse" copy="1 fill-in challenge - 60 sec" tone="primary" onPress={() => onNavigate("34_practice_quiz")} />
        <Tile title="Tutor warm-up" copy="1 short chat turn - 90 sec" onPress={() => onNavigate("53_chat_conversation")} />
        <Tile title="Pronunciation" copy="1 speaking attempt - 2 min" onPress={() => onNavigate("45_speaking_intro")} />
      </View>
    </AppScreen>
  );
}

function RecentWordsOneScreen({ onNavigate, onBack }) {
  return (
    <AppScreen footer={<PrimaryButton label="Alternate view" onPress={() => onNavigate("19_recent_words_2")} />}>
      <DailyTopBar title="Recent Words" onBack={onBack} />
      <View style={styles.listCard}>
        <ListRow title="Komorebi" meta="Saved today" onPress={() => onNavigate("26_word_detail")} />
        <ListRow title="Lluvia" meta="Needs review" onPress={() => onNavigate("26_word_detail")} />
        <ListRow title="Nuance" meta="Strong recall" onPress={() => onNavigate("26_word_detail")} />
      </View>
    </AppScreen>
  );
}

function RecentWordsTwoScreen({ onNavigate, onBack }) {
  return (
    <AppScreen footer={<PrimaryButton label="Notifications" onPress={() => onNavigate("20_notifications_entry")} />}>
      <DailyTopBar title="Recent Words" onBack={onBack} />
      <View style={styles.pillRow}>
        <Pill label="Saved" selected />
        <Pill label="Learning" />
        <Pill label="Mastered" />
      </View>
      <View style={styles.grid}>
        <Tile title="Travel set" copy="6 words" onPress={() => onNavigate("21_vocabulary_topics")} />
        <Tile title="Nature set" copy="4 words" onPress={() => onNavigate("21_vocabulary_topics")} />
      </View>
    </AppScreen>
  );
}

function NotificationsEntryScreen({ onNavigate, onBack }) {
  return (
    <AppScreen footer={<SecondaryButton label="Back home" onPress={() => onNavigate("11_home_dashboard")} />}>
      <DailyTopBar title="Notifications" onBack={onBack} />
      <View style={styles.listCard}>
        <ListRow title="Daily lesson ready" meta="2 min ago" onPress={() => onNavigate("12_today_plan_stack")} />
        <ListRow title="Tutor follow-up saved" meta="Today" onPress={() => onNavigate("60_chat_history")} />
        <ListRow title="Streak at risk" meta="Yesterday" onPress={() => onNavigate("14_streak_xp")} />
      </View>
    </AppScreen>
  );
}

export function renderDailyScreen(screenId, props) {
  switch (screenId) {
    case "12_today_plan_stack":
      return <TodayPlanScreen key={screenId} {...props} />;
    case "13_continue_lesson":
      return <ContinueLessonScreen key={screenId} {...props} />;
    case "14_streak_xp":
      return <StreakXpScreen key={screenId} {...props} />;
    case "15_navigation_variants":
      return <NavigationVariantsScreen key={screenId} {...props} />;
    case "16_empty_home_state":
      return <EmptyHomeScreen key={screenId} {...props} />;
    case "17_ai_recommendation":
      return <RecommendationScreen key={screenId} {...props} />;
    case "18_quick_practice":
      return <QuickPracticeScreen key={screenId} {...props} />;
    case "19_recent_words_1":
      return <RecentWordsOneScreen key={screenId} {...props} />;
    case "19_recent_words_2":
      return <RecentWordsTwoScreen key={screenId} {...props} />;
    case "20_notifications_entry":
      return <NotificationsEntryScreen key={screenId} {...props} />;
    default:
      return null;
  }
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
  topBarLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "800",
  },
  topMark: {
    width: 22,
    height: 22,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  topTitle: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "800",
  },
  topAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  topAvatarText: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: "800",
  },
  title: {
    color: COLORS.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
    marginBottom: 16,
  },
  metricRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },
  planCard: {
    borderRadius: 30,
    backgroundColor: COLORS.surface,
    padding: 16,
    gap: 10,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  planStep: {
    borderRadius: 22,
    backgroundColor: COLORS.surfaceLow,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  planIndex: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(0,110,47,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  planIndexPrimary: {
    backgroundColor: COLORS.primary,
  },
  planIndexText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "900",
  },
  planIndexTextPrimary: {
    color: "#FFFFFF",
  },
  planCopy: {
    flex: 1,
  },
  planTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 3,
  },
  planMeta: {
    color: COLORS.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  progressStrip: {
    gap: 8,
    marginBottom: 18,
  },
  progressStripTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(0,110,47,0.08)",
    overflow: "hidden",
  },
  progressStripFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  progressStripLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  tile: {
    width: "47%",
    minHeight: 152,
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  tileLarge: {
    width: "100%",
    minHeight: 166,
  },
  tilePrimary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tileOrb: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,110,47,0.10)",
    marginBottom: 18,
  },
  tileOrbPrimary: {
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  tileTitle: {
    color: COLORS.text,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "800",
    marginBottom: 8,
  },
  tileTitlePrimary: {
    color: "#FFFFFF",
  },
  tileCopy: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  tileCopyPrimary: {
    color: "rgba(255,255,255,0.82)",
  },
  heroCard: {
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    padding: 24,
    marginBottom: 18,
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
  listCard: {
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 16,
    gap: 12,
  },
  listRow: {
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLow,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  listRowIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0,110,47,0.10)",
  },
  listRowCopy: {
    flex: 1,
  },
  listRowTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  listRowMeta: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  ringWrap: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },
  ringOuter: {
    width: 164,
    height: 164,
    borderRadius: 82,
    borderWidth: 14,
    borderColor: "rgba(34,197,94,0.28)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  ringInner: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  ringValue: {
    color: COLORS.primary,
    fontSize: 44,
    fontWeight: "900",
  },
  ringLabel: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: "700",
  },
  weekPulseCard: {
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 18,
    marginTop: 6,
  },
  weekPulseLabel: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 14,
  },
  weekPulseBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 72,
  },
  weekPulseBar: {
    width: 42,
    borderRadius: 18,
    backgroundColor: "rgba(0,110,47,0.14)",
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  emptyOrb: {
    width: 112,
    height: 112,
    borderRadius: 56,
    alignSelf: "center",
    backgroundColor: COLORS.surfaceLow,
    marginTop: 36,
    marginBottom: 24,
  },
  centerTitle: {
    color: COLORS.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },
  centerCopy: {
    color: COLORS.textMuted,
    fontSize: 16,
    lineHeight: 25,
    textAlign: "center",
  },
});
