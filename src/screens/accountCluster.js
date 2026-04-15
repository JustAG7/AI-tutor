import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

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

export const ACCOUNT_SCREEN_IDS = [
  "81_pricing_plans",
  "82_plan_comparison",
  "83_checkout_flow",
  "84_success_state",
  "85_profile_overview",
  "86_edit_profile",
  "87_learning_preferences",
  "88_notification_settings",
  "89_language_settings",
  "90_privacy_controls",
];

const SUBSCRIPTION_PLANS = [
  {
    id: "monthly",
    title: "Pro Monthly",
    price: "$9.99",
    cadence: "/month",
    details: "Flexible access with all premium features.",
  },
  {
    id: "annual",
    title: "Pro Annual",
    price: "$79",
    cadence: "/year",
    details: "Best value with full tutor, assessment, and progress tools.",
  },
];

function createAccountStore() {
  return {
    selectedPlanId: "annual",
    checkoutName: "AI Tutor User",
    checkoutEmail: "user@example.com",
    subscriptionStatus: "Free",
    profile: {
      name: "AI Tutor User",
      level: "B1",
      goal: "Daily English practice",
      language: "English",
    },
    learningPreferences: {
      focus: "Conversation",
      pace: "Daily",
      tutorStyle: "Encouraging",
    },
    notifications: {
      dailyReminder: true,
      streakAlerts: true,
      promoUpdates: false,
    },
    languageSettings: {
      appLanguage: "Vietnamese",
      studyLanguage: "English",
      captions: "Bilingual",
    },
    privacy: {
      publicProfile: false,
      analytics: true,
      shareProgress: true,
    },
  };
}

let accountStore = createAccountStore();

function selectedPlan() {
  return (
    SUBSCRIPTION_PLANS.find((plan) => plan.id === accountStore.selectedPlanId) ??
    SUBSCRIPTION_PLANS[0]
  );
}

function choosePlan(planId) {
  accountStore = {
    ...accountStore,
    selectedPlanId: planId,
  };
}

function applyCheckout() {
  const plan = selectedPlan();

  accountStore = {
    ...accountStore,
    subscriptionStatus: plan.title,
    profile: {
      ...accountStore.profile,
      name: accountStore.checkoutName,
    },
  };
}

function updateCheckout(field, value) {
  accountStore = {
    ...accountStore,
    [field]: value,
  };
}

function updateProfile(field, value) {
  accountStore = {
    ...accountStore,
    profile: {
      ...accountStore.profile,
      [field]: value,
    },
  };
}

function updatePreference(field, value) {
  accountStore = {
    ...accountStore,
    learningPreferences: {
      ...accountStore.learningPreferences,
      [field]: value,
    },
  };
}

function updateLanguage(field, value) {
  accountStore = {
    ...accountStore,
    languageSettings: {
      ...accountStore.languageSettings,
      [field]: value,
    },
  };
}

function toggleSetting(section, key) {
  accountStore = {
    ...accountStore,
    [section]: {
      ...accountStore[section],
      [key]: !accountStore[section][key],
    },
  };
}

function PlanCard({ plan, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.planCard,
        selected && styles.planCardSelected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.planTitle, selected && styles.planTitleSelected]}>
        {plan.title}
      </Text>
      <Text style={[styles.planPrice, selected && styles.planTitleSelected]}>
        {plan.price}
        <Text style={[styles.planCadence, selected && styles.planCadenceSelected]}>
          {plan.cadence}
        </Text>
      </Text>
      <Text
        style={[styles.planDetails, selected && styles.planDetailsSelected]}
      >
        {plan.details}
      </Text>
    </Pressable>
  );
}

function SettingRow({ title, detail, onPress, accent }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.settingRow,
        accent && styles.settingRowAccent,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.settingDot} />
      <View style={styles.settingCopy}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDetail}>{detail}</Text>
      </View>
    </Pressable>
  );
}

function ToggleRow({ title, detail, enabled, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.toggleRow, pressed && styles.pressed]}>
      <View style={styles.settingCopy}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDetail}>{detail}</Text>
      </View>
      <View style={[styles.toggleShell, enabled && styles.toggleShellActive]}>
        <View style={[styles.toggleKnob, enabled && styles.toggleKnobActive]} />
      </View>
    </Pressable>
  );
}

function Field({ label, value, onChangeText }) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.fieldInput}
        placeholderTextColor="rgba(61,74,61,0.45)"
      />
    </View>
  );
}

function PricingPlansScreen({ onNavigate, onBack }) {
  const plan = selectedPlan();

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Compare plans" onPress={() => onNavigate("82_plan_comparison")} />
          <PrimaryButton label="Continue to checkout" onPress={() => onNavigate("83_checkout_flow")} />
        </>
      }
    >
      <BrandHeader title="Pricing" onBack={onBack} />
      <SectionEyebrow>Upgrade</SectionEyebrow>
      <Text style={styles.title}>Choose a plan that fits your learning rhythm</Text>
      <View style={styles.stack}>
        {SUBSCRIPTION_PLANS.map((item) => (
          <PlanCard
            key={item.id}
            plan={item}
            selected={plan.id === item.id}
            onPress={() => choosePlan(item.id)}
          />
        ))}
      </View>
    </AppScreen>
  );
}

function PlanComparisonScreen({ onNavigate, onBack }) {
  const plan = selectedPlan();

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Back to plans" onPress={onBack} />
          <PrimaryButton label="Checkout" onPress={() => onNavigate("83_checkout_flow")} />
        </>
      }
    >
      <BrandHeader title="Compare" onBack={onBack} />
      <SectionEyebrow>{plan.title}</SectionEyebrow>
      <Text style={styles.title}>What you unlock with premium</Text>
      <View style={styles.stack}>
        <SettingRow title="AI Tutor" detail="Unlimited guided sessions and roleplay scenarios" accent />
        <SettingRow title="Assessment" detail="Detailed weak-point analysis and retake tools" />
        <SettingRow title="Progress" detail="Full trends, streak recovery, and shareable milestones" />
      </View>
    </AppScreen>
  );
}

function CheckoutScreen({ onNavigate, onBack }) {
  const [name, setName] = useState(accountStore.checkoutName);
  const [email, setEmail] = useState(accountStore.checkoutEmail);
  const plan = selectedPlan();

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Back to compare" onPress={onBack} />
          <PrimaryButton
            label="Pay now"
            onPress={() => {
              updateCheckout("checkoutName", name);
              updateCheckout("checkoutEmail", email);
              applyCheckout();
              onNavigate("84_success_state");
            }}
          />
        </>
      }
    >
      <BrandHeader title="Checkout" onBack={onBack} />
      <SectionEyebrow>{plan.title}</SectionEyebrow>
      <Text style={styles.title}>Complete your upgrade</Text>
      <View style={styles.checkoutCard}>
        <Text style={styles.checkoutPlan}>{plan.price}{plan.cadence}</Text>
        <Text style={styles.checkoutCopy}>{plan.details}</Text>
      </View>
      <Field label="Full name" value={name} onChangeText={setName} />
      <Field label="Email" value={email} onChangeText={setEmail} />
    </AppScreen>
  );
}

function SuccessStateScreen({ onNavigate, onBack }) {
  const plan = selectedPlan();

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Go to profile" onPress={() => onNavigate("85_profile_overview")} />
          <PrimaryButton label="Go home" onPress={() => onNavigate("11_home_dashboard")} />
        </>
      }
    >
      <BrandHeader title="Success" onBack={onBack} />
      <SectionEyebrow>Upgrade complete</SectionEyebrow>
      <Text style={styles.title}>Your plan is active</Text>
      <View style={styles.successCard}>
        <Text style={styles.successTitle}>{plan.title}</Text>
        <Text style={styles.successCopy}>
          Premium access is now active for tutor sessions, assessments, and progress tools.
        </Text>
      </View>
    </AppScreen>
  );
}

function ProfileOverviewScreen({ onNavigate, onBack }) {
  const profile = accountStore.profile;

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Edit profile" onPress={() => onNavigate("86_edit_profile")} />
          <PrimaryButton label="Preferences" onPress={() => onNavigate("87_learning_preferences")} />
        </>
      }
    >
      <BrandHeader title="Profile" onBack={onBack} />
      <SectionEyebrow>{accountStore.subscriptionStatus}</SectionEyebrow>
      <Text style={styles.title}>{profile.name}</Text>
      <View style={styles.metricRow}>
        <MetricCard label="Level" value={profile.level} />
        <MetricCard label="Goal" value={profile.goal} />
      </View>
      <View style={styles.stack}>
        <SettingRow title="Plan" detail={accountStore.subscriptionStatus} onPress={() => onNavigate("81_pricing_plans")} />
        <SettingRow title="Notifications" detail="Manage reminders and streak alerts" onPress={() => onNavigate("88_notification_settings")} />
        <SettingRow title="Privacy" detail="Control public profile and analytics" onPress={() => onNavigate("90_privacy_controls")} />
      </View>
    </AppScreen>
  );
}

function EditProfileScreen({ onNavigate, onBack }) {
  const [name, setName] = useState(accountStore.profile.name);
  const [goal, setGoal] = useState(accountStore.profile.goal);

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Cancel" onPress={onBack} />
          <PrimaryButton
            label="Save changes"
            onPress={() => {
              updateProfile("name", name);
              updateProfile("goal", goal);
              onNavigate("85_profile_overview");
            }}
          />
        </>
      }
    >
      <BrandHeader title="Edit Profile" onBack={onBack} />
      <Field label="Display name" value={name} onChangeText={setName} />
      <Field label="Learning goal" value={goal} onChangeText={setGoal} />
    </AppScreen>
  );
}

function LearningPreferencesScreen({ onNavigate, onBack }) {
  const prefs = accountStore.learningPreferences;

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Profile" onPress={() => onNavigate("85_profile_overview")} />
          <PrimaryButton label="Notifications" onPress={() => onNavigate("88_notification_settings")} />
        </>
      }
    >
      <BrandHeader title="Preferences" onBack={onBack} />
      <SectionEyebrow>Learning style</SectionEyebrow>
      <Text style={styles.title}>Learning preferences</Text>
      <View style={styles.chipRow}>
        {["Conversation", "Grammar", "Vocabulary"].map((focus) => (
          <Pill
            key={focus}
            label={focus}
            selected={prefs.focus === focus}
            onPress={() => updatePreference("focus", focus)}
          />
        ))}
      </View>
      <View style={styles.chipRow}>
        {["Daily", "Flexible", "Sprint"].map((pace) => (
          <Pill
            key={pace}
            label={pace}
            selected={prefs.pace === pace}
            onPress={() => updatePreference("pace", pace)}
          />
        ))}
      </View>
      <View style={styles.chipRow}>
        {["Encouraging", "Direct", "Balanced"].map((style) => (
          <Pill
            key={style}
            label={style}
            selected={prefs.tutorStyle === style}
            onPress={() => updatePreference("tutorStyle", style)}
          />
        ))}
      </View>
    </AppScreen>
  );
}

function NotificationSettingsScreen({ onNavigate, onBack }) {
  const section = accountStore.notifications;

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Preferences" onPress={() => onNavigate("87_learning_preferences")} />
          <PrimaryButton label="Language" onPress={() => onNavigate("89_language_settings")} />
        </>
      }
    >
      <BrandHeader title="Notifications" onBack={onBack} />
      <View style={styles.stack}>
        <ToggleRow
          title="Daily reminder"
          detail="Prompt a short study session each day"
          enabled={section.dailyReminder}
          onPress={() => toggleSetting("notifications", "dailyReminder")}
        />
        <ToggleRow
          title="Streak alerts"
          detail="Warn before your streak expires"
          enabled={section.streakAlerts}
          onPress={() => toggleSetting("notifications", "streakAlerts")}
        />
        <ToggleRow
          title="Product updates"
          detail="Receive occasional premium and feature news"
          enabled={section.promoUpdates}
          onPress={() => toggleSetting("notifications", "promoUpdates")}
        />
      </View>
    </AppScreen>
  );
}

function LanguageSettingsScreen({ onNavigate, onBack }) {
  const section = accountStore.languageSettings;

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Notifications" onPress={() => onNavigate("88_notification_settings")} />
          <PrimaryButton label="Privacy" onPress={() => onNavigate("90_privacy_controls")} />
        </>
      }
    >
      <BrandHeader title="Language" onBack={onBack} />
      <SectionEyebrow>Localization</SectionEyebrow>
      <Text style={styles.title}>Language settings</Text>
      <View style={styles.stack}>
        <SettingRow title="App language" detail={section.appLanguage} accent />
        <SettingRow title="Study language" detail={section.studyLanguage} />
        <SettingRow title="Captions" detail={section.captions} />
      </View>
      <View style={styles.chipRow}>
        {["Vietnamese", "English"].map((language) => (
          <Pill
            key={language}
            label={language}
            selected={section.appLanguage === language}
            onPress={() => updateLanguage("appLanguage", language)}
          />
        ))}
      </View>
    </AppScreen>
  );
}

function PrivacyControlsScreen({ onNavigate, onBack }) {
  const section = accountStore.privacy;

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Language" onPress={() => onNavigate("89_language_settings")} />
          <PrimaryButton label="Go to profile" onPress={() => onNavigate("85_profile_overview")} />
        </>
      }
    >
      <BrandHeader title="Privacy" onBack={onBack} />
      <View style={styles.stack}>
        <ToggleRow
          title="Public profile"
          detail="Allow others to see your study profile"
          enabled={section.publicProfile}
          onPress={() => toggleSetting("privacy", "publicProfile")}
        />
        <ToggleRow
          title="Analytics"
          detail="Help improve the app with anonymous usage data"
          enabled={section.analytics}
          onPress={() => toggleSetting("privacy", "analytics")}
        />
        <ToggleRow
          title="Share progress"
          detail="Allow progress sharing to leaderboard and groups"
          enabled={section.shareProgress}
          onPress={() => toggleSetting("privacy", "shareProgress")}
        />
      </View>
    </AppScreen>
  );
}

export function renderAccountScreen(screenId, props) {
  switch (screenId) {
    case "81_pricing_plans":
      return <PricingPlansScreen key={screenId} {...props} />;
    case "82_plan_comparison":
      return <PlanComparisonScreen key={screenId} {...props} />;
    case "83_checkout_flow":
      return <CheckoutScreen key={screenId} {...props} />;
    case "84_success_state":
      return <SuccessStateScreen key={screenId} {...props} />;
    case "85_profile_overview":
      return <ProfileOverviewScreen key={screenId} {...props} />;
    case "86_edit_profile":
      return <EditProfileScreen key={screenId} {...props} />;
    case "87_learning_preferences":
      return <LearningPreferencesScreen key={screenId} {...props} />;
    case "88_notification_settings":
      return <NotificationSettingsScreen key={screenId} {...props} />;
    case "89_language_settings":
      return <LanguageSettingsScreen key={screenId} {...props} />;
    case "90_privacy_controls":
      return <PrivacyControlsScreen key={screenId} {...props} />;
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
  stack: {
    gap: 12,
  },
  planCard: {
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  planCardSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  planTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },
  planTitleSelected: {
    color: "#FFFFFF",
  },
  planPrice: {
    color: COLORS.primary,
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 8,
  },
  planCadence: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.secondary,
  },
  planCadenceSelected: {
    color: "rgba(255,255,255,0.82)",
  },
  planDetails: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  planDetailsSelected: {
    color: "rgba(255,255,255,0.82)",
  },
  checkoutCard: {
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLow,
    padding: 18,
    marginBottom: 18,
  },
  checkoutPlan: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 8,
  },
  checkoutCopy: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  successCard: {
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 24,
  },
  successTitle: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 10,
  },
  successCopy: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  metricRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },
  settingRow: {
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  settingRowAccent: {
    backgroundColor: COLORS.surfaceLow,
  },
  settingDot: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,110,47,0.12)",
  },
  settingCopy: {
    flex: 1,
  },
  settingTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 4,
  },
  settingDetail: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  fieldWrap: {
    marginBottom: 14,
  },
  fieldLabel: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  fieldInput: {
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    color: COLORS.text,
    fontSize: 16,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
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
