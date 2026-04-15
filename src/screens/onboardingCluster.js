import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { COLORS } from "../design/tokens";
import {
  AppScreen,
  BrandHeader,
  GlowImageCard,
  MetricCard,
  Pill,
  PrimaryButton,
  SecondaryButton,
  SectionEyebrow,
  ValueProp,
} from "../components/appPrimitives";

const ILLUSTRATION_WELCOME =
  "https://www.figma.com/api/mcp/asset/eae1c3ed-a7d6-487e-b013-1e0ab3b2aaec";
const ILLUSTRATION_LEVEL =
  "https://www.figma.com/api/mcp/asset/36b7304e-69f9-4e9a-b891-6645ccb1b007";
const ILLUSTRATION_WELCOME_EDITORIAL =
  "https://www.figma.com/api/mcp/asset/684ba7e0-11af-42e1-ad17-994d587036c5";

export const ONBOARDING_SCREEN_IDS = [
  "01_splash_screen",
  "02_welcome_intro",
  "02_welcome_step_1",
  "03_goals_selection",
  "04_level_placement_start",
  "05_placement_question",
  "06_placement_result",
  "07_sign_up_sign_in",
  "08_study_schedule",
  "09_notifications_permission",
  "10_onboarding_completion",
];

function OnboardingBrandBar({ centered, progressText, progressValue, onBack }) {
  return (
    <View style={[styles.brandShell, centered && styles.brandShellCentered]}>
      <View style={styles.brandShellLeft}>
        {onBack ? (
          <Pressable onPress={onBack} style={({ pressed }) => [styles.brandBack, pressed && styles.pressed]}>
            <Text style={styles.brandBackText}>{"<"}</Text>
          </Pressable>
        ) : (
          <View style={styles.brandMark} />
        )}
        {!centered ? <Text style={styles.brandShellText}>AI Tutor</Text> : null}
      </View>
      {centered ? <Text style={styles.brandShellText}>AI Tutor</Text> : null}
      {progressText ? (
        <View style={styles.headerProgressWrap}>
          <View style={styles.headerProgressTrack}>
            <View
              style={[
                styles.headerProgressFill,
                { width: `${progressValue}%` },
              ]}
            />
          </View>
          <Text style={styles.headerProgressText}>{progressText}</Text>
        </View>
      ) : (
        <View style={styles.headerSpacer} />
      )}
    </View>
  );
}

function EditorialValueCard({ title }) {
  return (
    <View style={styles.editorialValueCard}>
      <View style={styles.editorialValueOrb} />
      <Text style={styles.editorialValueText}>{title}</Text>
    </View>
  );
}

function MiniMetaCard({ label, value }) {
  return (
    <View style={styles.metaBentoCard}>
      <View style={styles.metaBentoIcon} />
      <Text style={styles.metaBentoLabel}>{label}</Text>
      <Text style={styles.metaBentoValue}>{value}</Text>
    </View>
  );
}

function GoalChoiceCard({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.goalChoiceCard,
        selected && styles.goalChoiceCardSelected,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.goalChoiceOrb, selected && styles.goalChoiceOrbSelected]} />
      <Text style={[styles.goalChoiceText, selected && styles.goalChoiceTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

function AnswerOptionCard({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.answerCard,
        selected && styles.answerCardSelected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.answerCardText, selected && styles.answerCardTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

function SplashScreen({ onNavigate }) {
  useEffect(() => {
    const timer = setTimeout(() => onNavigate("02_welcome_intro"), 1100);
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <AppScreen scroll={false}>
      <View style={styles.centerFill}>
        <View style={styles.splashOrb}>
          <Text style={styles.splashOrbText}>AI</Text>
        </View>
        <Text style={styles.splashTitle}>AI Tutor</Text>
        <Text style={styles.splashSubtitle}>Preparing your learning plan...</Text>
        <View style={styles.loaderRing} />
      </View>
    </AppScreen>
  );
}

function WelcomeIntroScreen({ onNavigate }) {
  return (
    <AppScreen
      footer={
        <>
          <PrimaryButton label="Get started" onPress={() => onNavigate("02_welcome_step_1")} />
          <SecondaryButton label="Log in" onPress={() => onNavigate("07_sign_up_sign_in")} />
        </>
      }
    >
      <OnboardingBrandBar />
      <View style={styles.heroBlock}>
        <SectionEyebrow>Boutique Language Conservatory</SectionEyebrow>
        <Text style={styles.editorialHeadline}>
          Learn practical{"\n"}
          <Text style={styles.headlineAccent}>English</Text> every day
        </Text>
      </View>
      <View style={styles.stackGap}>
        <EditorialValueCard title="5-minute lessons" />
        <EditorialValueCard title="Instant AI corrections" />
        <EditorialValueCard title="Personal study path" />
      </View>
      <GlowImageCard source={ILLUSTRATION_WELCOME_EDITORIAL} height={164} />
    </AppScreen>
  );
}

function WelcomeStepOneScreen({ onNavigate }) {
  return (
    <AppScreen
      footer={<PrimaryButton label="Continue" onPress={() => onNavigate("03_goals_selection")} />}
    >
      <OnboardingBrandBar />
      <View style={styles.iconHero}>
        <Text style={styles.iconHeroText}>*</Text>
      </View>
      <Text style={styles.stepHeadline}>
        Welcome to{"\n"}
        <Text style={styles.headlineAccent}>AI Tutor</Text>
      </Text>
      <Text style={styles.stepBody}>
        Master practical English with personalized AI coaching and daily immersive practice.
      </Text>
      <View style={styles.progressDots}>
        <View style={styles.progressDotActive} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
      </View>
    </AppScreen>
  );
}

function GoalsSelectionScreen({ onNavigate }) {
  const [selected, setSelected] = useState("Conversation");
  const goals = ["Conversation", "Travel", "Career", "Study"];

  return (
    <AppScreen
      footer={<PrimaryButton label="Continue" onPress={() => onNavigate("04_level_placement_start")} />}
    >
      <OnboardingBrandBar />
      <SectionEyebrow>Set your path</SectionEyebrow>
      <Text style={styles.levelTitle}>What do you want to improve first?</Text>
      <Text style={styles.levelBody}>
        We will personalize your lessons, AI prompts, and daily practice plan.
      </Text>
      <View style={styles.goalGrid}>
        {goals.map((goal) => (
          <GoalChoiceCard
            key={goal}
            selected={selected === goal}
            label={goal}
            onPress={() => setSelected(goal)}
          />
        ))}
      </View>
      <View style={styles.featureCard}>
        <Text style={styles.featureTitle}>Selected focus</Text>
        <Text style={styles.featureCopy}>{selected}</Text>
      </View>
    </AppScreen>
  );
}

function LevelPlacementStartScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      footer={
        <>
          <PrimaryButton label="Start test" onPress={() => onNavigate("05_placement_question")} />
          <SecondaryButton label="I already know my level" onPress={() => onNavigate("06_placement_result")} />
        </>
      }
    >
      <OnboardingBrandBar progressText="Step 2 of 4" progressValue={50} onBack={onBack} />
      <View style={styles.levelHeroShell}>
        <View style={styles.imageCardLarge}>
          <Image source={{ uri: ILLUSTRATION_LEVEL }} style={styles.heroImageSquare} />
        </View>
        <View style={styles.phoneticChip}>
          <Text style={styles.phoneticChipText}>/ing-glish/</Text>
        </View>
      </View>
      <Text style={styles.levelTitle}>Quick level check</Text>
      <Text style={styles.levelBody}>
        Answer 8 short questions. Your level can be changed anytime.
      </Text>
      <View style={styles.metricRow}>
        <MiniMetaCard label="3 minutes" value="" />
        <MiniMetaCard label="8 items" value="" />
      </View>
    </AppScreen>
  );
}

function PlacementQuestionScreen({ onNavigate, onBack }) {
  const [selected, setSelected] = useState("have been studying");
  const options = ["study", "studied", "have been studying", "am study"];

  return (
    <AppScreen
      footer={<PrimaryButton label="Next question" onPress={() => onNavigate("06_placement_result")} />}
    >
      <OnboardingBrandBar progressText="Step 2 of 4" progressValue={62} onBack={onBack} />
      <SectionEyebrow>Level check</SectionEyebrow>
      <Text style={styles.levelTitle}>Choose the most natural sentence</Text>
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>I _____ English for two years now.</Text>
      </View>
      <View style={styles.optionList}>
        {options.map((option) => (
          <AnswerOptionCard
            key={option}
            label={option}
            selected={selected === option}
            onPress={() => setSelected(option)}
          />
        ))}
      </View>
    </AppScreen>
  );
}

function PlacementResultScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      footer={<PrimaryButton label="Continue" onPress={() => onNavigate("07_sign_up_sign_in")} />}
    >
      <OnboardingBrandBar progressText="Step 2 of 4" progressValue={80} onBack={onBack} />
      <View style={styles.resultOrb}>
        <Text style={styles.resultScore}>B1</Text>
      </View>
      <Text style={styles.levelTitle}>Intermediate level</Text>
      <Text style={styles.levelBody}>
        You are ready for practical conversation, guided writing, and AI tutor sessions.
      </Text>
      <View style={styles.metricRow}>
        <MetricCard label="Grammar" value="Good" />
        <MetricCard label="Speaking" value="Next focus" />
      </View>
    </AppScreen>
  );
}

function SignUpScreen({ onNavigate, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AppScreen
      footer={<PrimaryButton label="Create account" onPress={() => onNavigate("08_study_schedule")} />}
    >
      <OnboardingBrandBar onBack={onBack} />
      <Text style={styles.levelTitle}>Create account</Text>
      <Text style={styles.levelBody}>
        Join the app and start your personalized learning journey.
      </Text>
      <TextInput
        placeholder="name@example.com"
        placeholderTextColor="#6D7B6C"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Min. 8 characters"
        placeholderTextColor="#6D7B6C"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <View style={styles.socialRow}>
        <Pressable onPress={() => onNavigate("08_study_schedule")} style={({ pressed }) => [styles.socialAuthCard, pressed && styles.pressed]}>
          <Text style={styles.socialAuthText}>Continue with Google</Text>
        </Pressable>
        <Pressable onPress={() => onNavigate("08_study_schedule")} style={({ pressed }) => [styles.socialAuthCard, pressed && styles.pressed]}>
          <Text style={styles.socialAuthText}>Continue with Apple</Text>
        </Pressable>
      </View>
    </AppScreen>
  );
}

function StudyScheduleScreenLegacy({ onNavigate, onBack }) {
  const [selected, setSelected] = useState("Evening");
  const slots = ["Morning", "Afternoon", "Evening"];

  return (
    <AppScreen
      footer={<PrimaryButton label="Save schedule" onPress={() => onNavigate("09_notifications_permission")} />}
    >
      <BrandHeader title="AI Tutor" progressText="Step 3 of 4" progressValue={75} onBack={onBack} />
      <Text style={styles.largeHeadline}>When do you want to study?</Text>
      <Text style={styles.bodyLarge}>
        We will use this to time reminders and daily lesson suggestions.
      </Text>
      <View style={styles.goalGrid}>
        {slots.map((slot) => (
          <Pill
            key={slot}
            label={slot}
            selected={selected === slot}
            onPress={() => setSelected(slot)}
          />
        ))}
      </View>
      <View style={styles.featureCard}>
        <Text style={styles.featureTitle}>Current routine</Text>
        <Text style={styles.featureCopy}>{selected} · 5 min daily</Text>
      </View>
    </AppScreen>
  );
}

function StudyScheduleScreen({ onNavigate, onBack }) {
  const [selected, setSelected] = useState("Evening");
  const slots = ["Morning", "Afternoon", "Evening"];

  return (
    <AppScreen
      footer={<PrimaryButton label="Save schedule" onPress={() => onNavigate("09_notifications_permission")} />}
    >
      <OnboardingBrandBar progressText="Step 3 of 4" progressValue={75} onBack={onBack} />
      <Text style={styles.levelTitle}>When do you want to study?</Text>
      <Text style={styles.levelBody}>
        We will use this to time reminders and daily lesson suggestions.
      </Text>
      <View style={styles.goalGrid}>
        {slots.map((slot) => (
          <GoalChoiceCard
            key={slot}
            label={slot}
            selected={selected === slot}
            onPress={() => setSelected(slot)}
          />
        ))}
      </View>
      <View style={styles.featureCard}>
        <Text style={styles.featureTitle}>Current routine</Text>
        <Text style={styles.featureCopy}>{selected} - 5 min daily</Text>
      </View>
    </AppScreen>
  );
}

function NotificationsPermissionScreen({ onNavigate }) {
  return (
    <AppScreen
      footer={
        <>
          <PrimaryButton label="Allow notifications" onPress={() => onNavigate("10_onboarding_completion")} />
          <SecondaryButton label="Not now" onPress={() => onNavigate("10_onboarding_completion")} />
        </>
      }
    >
      <View style={styles.permissionOrb}>
        <Text style={styles.permissionOrbText}>!</Text>
      </View>
      <Text style={styles.levelTitle}>Stay consistent.</Text>
      <Text style={styles.levelBody}>
        We only send lesson reminders and progress nudges.
      </Text>
      <View style={styles.notificationFeatureCard}>
        <Text style={styles.featureTitle}>Daily lesson ready</Text>
        <Text style={styles.featureBody}>
          Your 5-minute streak is waiting. Ready to flow?
        </Text>
      </View>
    </AppScreen>
  );
}

function CompletionScreenLegacy({ onNavigate }) {
  return (
    <AppScreen
      footer={
        <>
          <PrimaryButton label="Go to home" onPress={() => onNavigate("11_home_dashboard")} />
          <SecondaryButton label="Review plan" onPress={() => onNavigate("12_today_plan_stack")} />
        </>
      }
    >
      <OnboardingBrandBar centered />
      <View style={styles.successOrb}>
        <Text style={styles.successOrbText}>OK</Text>
      </View>
      <Text style={styles.levelTitle}>You're all set</Text>
      <Text style={styles.levelBody}>
        Your personalized learning path is ready. Let's start your journey
        toward fluency.
      </Text>
      <View style={styles.metricRow}>
        <MetricCard label="Level" value="A2" />
        <MetricCard label="Goal" value="Speaking" />
      </View>
      <View style={styles.featureCardWide}>
        <Text style={styles.featureTitle}>Your plan</Text>
        <Text style={styles.featureCopy}>1 lesson · 1 quick review · 1 tutor prompt</Text>
      </View>
    </AppScreen>
  );
}

function CompletionScreen({ onNavigate }) {
  return (
    <AppScreen
      footer={
        <>
          <PrimaryButton label="Go to dashboard" onPress={() => onNavigate("11_home_dashboard")} />
          <SecondaryButton label="Maybe later" onPress={() => onNavigate("12_today_plan_stack")} />
        </>
      }
    >
      <OnboardingBrandBar centered />
      <View style={styles.successOrb}>
        <Text style={styles.successOrbText}>OK</Text>
      </View>
      <Text style={styles.levelTitle}>You're all set</Text>
      <Text style={styles.levelBody}>
        Your personalized learning path is ready. Let's start your journey
        toward fluency.
      </Text>
      <View style={styles.metricRow}>
        <MetricCard label="Level" value="A2" />
        <MetricCard label="Goal" value="Speaking" />
      </View>
      <View style={styles.featureCardWide}>
        <Text style={styles.featureTitle}>Your plan</Text>
        <Text style={styles.featureCopy}>Daily at 7:30 PM</Text>
      </View>
    </AppScreen>
  );
}

export function renderOnboardingScreen(screenId, props) {
  switch (screenId) {
    case "01_splash_screen":
      return <SplashScreen {...props} />;
    case "02_welcome_intro":
      return <WelcomeIntroScreen {...props} />;
    case "02_welcome_step_1":
      return <WelcomeStepOneScreen {...props} />;
    case "03_goals_selection":
      return <GoalsSelectionScreen {...props} />;
    case "04_level_placement_start":
      return <LevelPlacementStartScreen {...props} />;
    case "05_placement_question":
      return <PlacementQuestionScreen {...props} />;
    case "06_placement_result":
      return <PlacementResultScreen {...props} />;
    case "07_sign_up_sign_in":
      return <SignUpScreen {...props} />;
    case "08_study_schedule":
      return <StudyScheduleScreen {...props} />;
    case "09_notifications_permission":
      return <NotificationsPermissionScreen {...props} />;
    case "10_onboarding_completion":
      return <CompletionScreen {...props} />;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  centerFill: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  splashOrb: {
    width: 100,
    height: 100,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  splashOrbText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
  },
  splashTitle: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 8,
  },
  splashSubtitle: {
    color: COLORS.textMuted,
    fontSize: 16,
    marginBottom: 28,
  },
  loaderRing: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 4,
    borderColor: "#E4E9E6",
    borderTopColor: COLORS.primary,
  },
  brandShell: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  brandShellCentered: {
    justifyContent: "center",
    marginBottom: 18,
  },
  brandShellLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  brandMark: {
    width: 20,
    height: 20,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  brandBack: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  brandBackText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "800",
  },
  brandShellText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  headerSpacer: {
    width: 48,
  },
  headerProgressWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerProgressTrack: {
    width: 64,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#DEE4E1",
    overflow: "hidden",
  },
  headerProgressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 999,
  },
  headerProgressText: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  heroBlock: {
    marginBottom: 24,
  },
  editorialHeadline: {
    color: COLORS.text,
    fontSize: 36,
    lineHeight: 40,
    fontWeight: "300",
    letterSpacing: -0.9,
  },
  headline: {
    color: COLORS.text,
    fontSize: 42,
    lineHeight: 46,
    fontWeight: "300",
    letterSpacing: -1.2,
  },
  headlineAccent: {
    color: COLORS.primary,
    fontStyle: "italic",
  },
  stackGap: {
    gap: 16,
    marginBottom: 28,
  },
  editorialValueCard: {
    minHeight: 72,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceLow,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  editorialValueOrb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
  },
  editorialValueText: {
    color: COLORS.textMuted,
    fontSize: 16,
    fontWeight: "600",
  },
  iconHero: {
    width: 84,
    height: 84,
    borderRadius: 28,
    backgroundColor: "rgba(34,197,94,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  iconHeroText: {
    color: COLORS.primary,
    fontSize: 34,
    fontWeight: "900",
  },
  stepHeadline: {
    color: COLORS.text,
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "300",
    letterSpacing: -1,
    marginBottom: 16,
  },
  stepBody: {
    color: COLORS.textMuted,
    fontSize: 18,
    lineHeight: 29,
    maxWidth: 280,
    marginBottom: 28,
  },
  largeHeadline: {
    color: COLORS.text,
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "300",
    letterSpacing: -1.2,
    marginBottom: 14,
  },
  bodyLarge: {
    color: COLORS.textMuted,
    fontSize: 18,
    lineHeight: 30,
    marginBottom: 24,
  },
  progressDots: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  progressDotActive: {
    width: 48,
    height: 4,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  progressDot: {
    width: 16,
    height: 4,
    borderRadius: 999,
    backgroundColor: COLORS.outline,
    opacity: 0.35,
  },
  goalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 18,
  },
  goalChoiceCard: {
    width: "47%",
    minHeight: 120,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
    justifyContent: "space-between",
  },
  goalChoiceCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: "rgba(0,110,47,0.05)",
  },
  goalChoiceOrb: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.surfaceLow,
  },
  goalChoiceOrbSelected: {
    backgroundColor: COLORS.primarySoft,
  },
  goalChoiceText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
  },
  goalChoiceTextSelected: {
    color: COLORS.primary,
  },
  featureCard: {
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 20,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  featureCardWide: {
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLow,
    padding: 20,
  },
  featureTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 6,
  },
  featureCopy: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "700",
  },
  featureBody: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  imageCardLarge: {
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: COLORS.surface,
    padding: 28,
    marginBottom: 24,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  levelHeroShell: {
    marginBottom: 18,
  },
  heroImageSquare: {
    width: "100%",
    height: 240,
    resizeMode: "contain",
  },
  phoneticChip: {
    position: "absolute",
    right: -8,
    bottom: -16,
    borderRadius: 999,
    backgroundColor: COLORS.tertiary,
    paddingHorizontal: 17,
    paddingVertical: 9,
  },
  phoneticChipText: {
    color: "#224638",
    fontSize: 12,
    fontWeight: "600",
  },
  levelTitle: {
    color: COLORS.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
  },
  levelBody: {
    color: COLORS.textMuted,
    fontSize: 16,
    lineHeight: 26,
    textAlign: "center",
    marginBottom: 22,
  },
  centerHeadline: {
    color: COLORS.text,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },
  centerBody: {
    color: COLORS.textMuted,
    fontSize: 16,
    lineHeight: 26,
    textAlign: "center",
    marginBottom: 24,
  },
  metricRow: {
    flexDirection: "row",
    gap: 12,
  },
  metaBentoCard: {
    flex: 1,
    minHeight: 84,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceLow,
    padding: 16,
  },
  metaBentoIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.primarySoft,
    marginBottom: 10,
  },
  metaBentoLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  metaBentoValue: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
  },
  questionCard: {
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 22,
    marginBottom: 18,
  },
  questionText: {
    color: COLORS.text,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "700",
  },
  optionList: {
    gap: 12,
  },
  answerCard: {
    minHeight: 60,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.outline,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  answerCardSelected: {
    backgroundColor: COLORS.surfaceLow,
    borderColor: COLORS.primary,
  },
  answerCardText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
  },
  answerCardTextSelected: {
    color: COLORS.primary,
  },
  answerHint: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginTop: 14,
  },
  resultOrb: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: "center",
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  resultScore: {
    color: COLORS.primary,
    fontSize: 46,
    fontWeight: "900",
  },
  input: {
    minHeight: 58,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.outline,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 12,
  },
  socialRow: {
    gap: 12,
  },
  socialAuthCard: {
    minHeight: 56,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.4)",
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  socialAuthText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
  },
  permissionOrb: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.surface,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  permissionOrbText: {
    color: COLORS.primary,
    fontSize: 32,
    fontWeight: "900",
  },
  notificationFeatureCard: {
    borderRadius: 32,
    backgroundColor: COLORS.surface,
    padding: 25,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  successOrb: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: COLORS.primaryBright,
    borderWidth: 10,
    borderColor: "rgba(0,110,47,0.08)",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 26,
    marginTop: 16,
  },
  successOrbText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
  },
});
