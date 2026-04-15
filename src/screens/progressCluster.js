import React from "react";
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
import { getAssessmentSnapshot } from "./assessmentCluster";

export const PROGRESS_SCREEN_IDS = [
  "71_progress_overview",
  "72_skill_breakdown",
  "73_weekly_trends",
  "74_achievement_badges",
  "75_streak_recovery",
  "76_goal_adjustment",
  "77_friend_leaderboard",
  "78_study_groups",
  "79_share_milestone",
  "80_motivation_settings",
];

const BASE_PROGRESS = {
  streakDays: 12,
  weeklyMinutes: 146,
  dailyGoal: 15,
  leaderboard: [
    { id: "friend-1", name: "Partner A", xp: 1820 },
    { id: "friend-2", name: "You", xp: 1740 },
    { id: "friend-3", name: "Partner B", xp: 1685 },
  ],
  groups: [
    { id: "group-1", title: "Practice Circle", detail: "Shared daily study rhythm" },
    { id: "group-2", title: "Review Circle", detail: "Focused recap and weekly check-ins" },
  ],
  motivation: {
    reminders: true,
    celebrateWins: true,
    weeklyDigest: true,
  },
};

let progressStore = { ...BASE_PROGRESS };

function derivedBadges(summary) {
  return [
    {
      id: "badge-1",
      title: "Consistency",
      detail: `${summary.streakDays}-day streak`,
    },
    {
      id: "badge-2",
      title: "Accuracy",
      detail: `${summary.accuracy}% mastery`,
    },
    {
      id: "badge-3",
      title: "Sessions",
      detail: `${summary.totalSessions} completed`,
    },
  ];
}

function toggleMotivation(key) {
  progressStore = {
    ...progressStore,
    motivation: {
      ...progressStore.motivation,
      [key]: !progressStore.motivation[key],
    },
  };
}

function setDailyGoal(minutes) {
  progressStore = {
    ...progressStore,
    dailyGoal: minutes,
  };
}

function boostStreak() {
  progressStore = {
    ...progressStore,
    streakDays: progressStore.streakDays + 1,
  };
}

function progressSummary() {
  const assessment = getAssessmentSnapshot();
  const accuracy = assessment.summary.percent || 90;
  const totalSessions = Math.max(assessment.answers.length, 6);

  return {
    accuracy,
    totalSessions,
    streakDays: progressStore.streakDays,
    weeklyMinutes: progressStore.weeklyMinutes,
    dailyGoal: progressStore.dailyGoal,
    weakest: assessment.weakest,
    mistakes: assessment.mistakes,
  };
}

function weeklyTrendBars() {
  const summary = progressSummary();
  const base = [18, 22, 16, 28, 24, 19, 30];
  const modifier = Math.max(0, Math.round(summary.accuracy / 20) - 3);

  return base.map((value, index) => ({
    id: `day-${index}`,
    label: ["M", "T", "W", "T", "F", "S", "S"][index],
    value: value + modifier,
  }));
}

function skillBreakdown() {
  const summary = progressSummary();
  const weakest = summary.weakest[0]?.title ?? "Review focus";

  return [
    { id: "skill-1", title: "Vocabulary", score: Math.max(summary.accuracy - 6, 72) },
    { id: "skill-2", title: "Grammar", score: Math.max(summary.accuracy - 2, 78) },
    { id: "skill-3", title: "Listening", score: Math.max(summary.accuracy - 8, 70) },
    { id: "skill-4", title: weakest, score: Math.max(summary.accuracy - 14, 62) },
  ];
}

function StatPanel({ title, value, note }) {
  return (
    <View style={styles.statPanel}>
      <Text style={styles.statPanelTitle}>{title}</Text>
      <Text style={styles.statPanelValue}>{value}</Text>
      <Text style={styles.statPanelNote}>{note}</Text>
    </View>
  );
}

function SimpleRow({ title, detail, onPress, accent }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.rowCard,
        accent && styles.rowCardAccent,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.rowOrb} />
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowDetail}>{detail}</Text>
      </View>
    </Pressable>
  );
}

function ToggleRow({ title, detail, enabled, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.toggleRow, pressed && styles.pressed]}>
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowDetail}>{detail}</Text>
      </View>
      <View style={[styles.toggleShell, enabled && styles.toggleShellActive]}>
        <View style={[styles.toggleKnob, enabled && styles.toggleKnobActive]} />
      </View>
    </Pressable>
  );
}

function ProgressOverviewScreen({ onNavigate, onBack }) {
  const summary = progressSummary();
  const badges = derivedBadges(summary);

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Skill breakdown" onPress={() => onNavigate("72_skill_breakdown")} />
          <PrimaryButton label="Weekly trends" onPress={() => onNavigate("73_weekly_trends")} />
        </>
      }
    >
      <BrandHeader title="Progress" onBack={onBack} />
      <SectionEyebrow>Momentum</SectionEyebrow>
      <Text style={styles.title}>Your learning momentum is building</Text>
      <View style={styles.progressHero}>
        <Text style={styles.progressHeroValue}>{summary.accuracy}%</Text>
        <Text style={styles.progressHeroLabel}>Overall mastery</Text>
      </View>
      <View style={styles.metricRow}>
        <MetricCard label="Streak" value={`${summary.streakDays} days`} />
        <MetricCard label="This week" value={`${summary.weeklyMinutes} mins`} />
      </View>
      <View style={styles.chipRow}>
        <Pill label={`${summary.totalSessions} sessions`} />
        <Pill label={`${badges.length} badges`} />
      </View>
    </AppScreen>
  );
}

function SkillBreakdownScreen({ onNavigate, onBack }) {
  const skills = skillBreakdown();

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Weak points" onPress={() => onNavigate("69_mistake_notebook")} />
          <PrimaryButton label="Badges" onPress={() => onNavigate("74_achievement_badges")} />
        </>
      }
    >
      <BrandHeader title="Skills" onBack={onBack} />
      <SectionEyebrow>Breakdown</SectionEyebrow>
      <Text style={styles.title}>Skill breakdown</Text>
      <View style={styles.cardStack}>
        {skills.map((skill) => (
          <View key={skill.id} style={styles.skillCard}>
            <View style={styles.skillRow}>
              <Text style={styles.skillTitle}>{skill.title}</Text>
              <Text style={styles.skillScore}>{skill.score}%</Text>
            </View>
            <View style={styles.skillTrack}>
              <View style={[styles.skillFill, { width: `${skill.score}%` }]} />
            </View>
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

function WeeklyTrendsScreen({ onNavigate, onBack }) {
  const bars = weeklyTrendBars();
  const max = Math.max(...bars.map((bar) => bar.value));

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Goal settings" onPress={() => onNavigate("76_goal_adjustment")} />
          <PrimaryButton label="Leaderboard" onPress={() => onNavigate("77_friend_leaderboard")} />
        </>
      }
    >
      <BrandHeader title="Weekly Trends" onBack={onBack} />
      <SectionEyebrow>Trend line</SectionEyebrow>
      <Text style={styles.title}>Your weekly rhythm</Text>
      <View style={styles.trendChart}>
        {bars.map((bar) => (
          <View key={bar.id} style={styles.trendColumn}>
            <View style={[styles.trendBar, { height: `${(bar.value / max) * 100}%` }]} />
            <Text style={styles.trendLabel}>{bar.label}</Text>
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

function AchievementBadgesScreen({ onNavigate, onBack }) {
  const badges = derivedBadges(progressSummary());

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Share milestone" onPress={() => onNavigate("79_share_milestone")} />
          <PrimaryButton label="Streak recovery" onPress={() => onNavigate("75_streak_recovery")} />
        </>
      }
    >
      <BrandHeader title="Badges" onBack={onBack} />
      <SectionEyebrow>Achievements</SectionEyebrow>
      <Text style={styles.title}>Badges you unlocked</Text>
      <View style={styles.cardStack}>
        {badges.map((badge) => (
          <SimpleRow key={badge.id} title={badge.title} detail={badge.detail} accent />
        ))}
      </View>
    </AppScreen>
  );
}

function StreakRecoveryScreen({ onNavigate, onBack }) {
  const summary = progressSummary();

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Skip for now" onPress={() => onNavigate("71_progress_overview")} />
          <PrimaryButton
            label="Recover streak"
            onPress={() => {
              boostStreak();
              onNavigate("71_progress_overview");
            }}
          />
        </>
      }
    >
      <BrandHeader title="Streak" onBack={onBack} />
      <SectionEyebrow>Recovery</SectionEyebrow>
      <Text style={styles.title}>Keep your momentum alive</Text>
      <View style={styles.highlightCard}>
        <Text style={styles.highlightValue}>{summary.streakDays} days</Text>
        <Text style={styles.highlightCopy}>
          Complete one short session today to extend the streak and keep the chain unbroken.
        </Text>
      </View>
    </AppScreen>
  );
}

function GoalAdjustmentScreen({ onNavigate, onBack }) {
  const summary = progressSummary();

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Back to trends" onPress={() => onNavigate("73_weekly_trends")} />
          <PrimaryButton label="Motivation settings" onPress={() => onNavigate("80_motivation_settings")} />
        </>
      }
    >
      <BrandHeader title="Goal Adjustment" onBack={onBack} />
      <SectionEyebrow>Daily target</SectionEyebrow>
      <Text style={styles.title}>Adjust your daily study goal</Text>
      <View style={styles.metricRow}>
        <StatPanel title="Current goal" value={`${summary.dailyGoal} min`} note="per day" />
        <StatPanel title="This week" value={`${summary.weeklyMinutes} min`} note="completed" />
      </View>
      <View style={styles.chipRow}>
        {[10, 15, 20].map((minutes) => (
          <Pill
            key={minutes}
            label={`${minutes} min`}
            selected={progressStore.dailyGoal === minutes}
            onPress={() => setDailyGoal(minutes)}
          />
        ))}
      </View>
    </AppScreen>
  );
}

function FriendLeaderboardScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Study groups" onPress={() => onNavigate("78_study_groups")} />
          <PrimaryButton label="Share milestone" onPress={() => onNavigate("79_share_milestone")} />
        </>
      }
    >
      <BrandHeader title="Leaderboard" onBack={onBack} />
      <SectionEyebrow>Social</SectionEyebrow>
      <Text style={styles.title}>Friend leaderboard</Text>
      <View style={styles.cardStack}>
        {progressStore.leaderboard.map((friend, index) => (
          <SimpleRow
            key={friend.id}
            title={`${index + 1}. ${friend.name}`}
            detail={`${friend.xp} XP this week`}
            accent={friend.name === "You"}
          />
        ))}
      </View>
    </AppScreen>
  );
}

function StudyGroupsScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Leaderboard" onPress={() => onNavigate("77_friend_leaderboard")} />
          <PrimaryButton label="Share milestone" onPress={() => onNavigate("79_share_milestone")} />
        </>
      }
    >
      <BrandHeader title="Study Groups" onBack={onBack} />
      <SectionEyebrow>Community</SectionEyebrow>
      <Text style={styles.title}>Groups that fit your pace</Text>
      <View style={styles.cardStack}>
        {progressStore.groups.map((group) => (
          <SimpleRow key={group.id} title={group.title} detail={group.detail} />
        ))}
      </View>
    </AppScreen>
  );
}

function ShareMilestoneScreen({ onNavigate, onBack }) {
  const summary = progressSummary();

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Back to progress" onPress={() => onNavigate("71_progress_overview")} />
          <PrimaryButton label="Celebrate win" onPress={() => onNavigate("80_motivation_settings")} />
        </>
      }
    >
      <BrandHeader title="Share" onBack={onBack} />
      <SectionEyebrow>Milestone</SectionEyebrow>
      <Text style={styles.title}>Share your latest win</Text>
      <View style={styles.highlightCard}>
        <Text style={styles.highlightValue}>{summary.accuracy}% accuracy</Text>
        <Text style={styles.highlightCopy}>
          You kept a {summary.streakDays}-day streak and closed your last assessment with strong accuracy.
        </Text>
      </View>
    </AppScreen>
  );
}

function MotivationSettingsScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Goal settings" onPress={() => onNavigate("76_goal_adjustment")} />
          <PrimaryButton label="Back to progress" onPress={() => onNavigate("71_progress_overview")} />
        </>
      }
    >
      <BrandHeader title="Motivation" onBack={onBack} />
      <SectionEyebrow>Preferences</SectionEyebrow>
      <Text style={styles.title}>Motivation settings</Text>
      <View style={styles.cardStack}>
        <ToggleRow
          title="Daily reminders"
          detail="Keep your habit visible every day"
          enabled={progressStore.motivation.reminders}
          onPress={() => toggleMotivation("reminders")}
        />
        <ToggleRow
          title="Celebrate wins"
          detail="Show milestone moments after quizzes and streaks"
          enabled={progressStore.motivation.celebrateWins}
          onPress={() => toggleMotivation("celebrateWins")}
        />
        <ToggleRow
          title="Weekly digest"
          detail="Summarize your trend every weekend"
          enabled={progressStore.motivation.weeklyDigest}
          onPress={() => toggleMotivation("weeklyDigest")}
        />
      </View>
    </AppScreen>
  );
}

export function renderProgressScreen(screenId, props) {
  switch (screenId) {
    case "71_progress_overview":
      return <ProgressOverviewScreen key={screenId} {...props} />;
    case "72_skill_breakdown":
      return <SkillBreakdownScreen key={screenId} {...props} />;
    case "73_weekly_trends":
      return <WeeklyTrendsScreen key={screenId} {...props} />;
    case "74_achievement_badges":
      return <AchievementBadgesScreen key={screenId} {...props} />;
    case "75_streak_recovery":
      return <StreakRecoveryScreen key={screenId} {...props} />;
    case "76_goal_adjustment":
      return <GoalAdjustmentScreen key={screenId} {...props} />;
    case "77_friend_leaderboard":
      return <FriendLeaderboardScreen key={screenId} {...props} />;
    case "78_study_groups":
      return <StudyGroupsScreen key={screenId} {...props} />;
    case "79_share_milestone":
      return <ShareMilestoneScreen key={screenId} {...props} />;
    case "80_motivation_settings":
      return <MotivationSettingsScreen key={screenId} {...props} />;
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
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
    marginBottom: 12,
  },
  progressHero: {
    borderRadius: 32,
    backgroundColor: COLORS.surface,
    paddingVertical: 34,
    alignItems: "center",
    marginBottom: 18,
  },
  progressHeroValue: {
    color: COLORS.primary,
    fontSize: 54,
    fontWeight: "900",
  },
  progressHeroLabel: {
    color: COLORS.textMuted,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 6,
  },
  metricRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  cardStack: {
    gap: 12,
  },
  skillCard: {
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 18,
  },
  skillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  skillTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
  },
  skillScore: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "800",
  },
  skillTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceHigh,
    overflow: "hidden",
  },
  skillFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  trendChart: {
    height: 220,
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  trendColumn: {
    width: 28,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  trendBar: {
    width: "100%",
    minHeight: 20,
    borderRadius: 14,
    backgroundColor: COLORS.primaryBright,
    marginBottom: 10,
  },
  trendLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  rowCard: {
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  rowCardAccent: {
    backgroundColor: COLORS.surfaceLow,
  },
  rowOrb: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,110,47,0.12)",
  },
  rowCopy: {
    flex: 1,
  },
  rowTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 4,
  },
  rowDetail: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  highlightCard: {
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 24,
  },
  highlightValue: {
    color: COLORS.primary,
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 10,
  },
  highlightCopy: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  statPanel: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: COLORS.surfaceLow,
    padding: 18,
  },
  statPanelTitle: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  statPanelValue: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 6,
  },
  statPanelNote: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  toggleRow: {
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  toggleShell: {
    width: 52,
    height: 30,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceHigh,
    padding: 3,
    justifyContent: "center",
  },
  toggleShellActive: {
    backgroundColor: COLORS.primarySoft,
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  toggleKnobActive: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.primary,
  },
});
