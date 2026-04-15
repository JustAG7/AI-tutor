import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { COLORS } from "../design/tokens";
import {
  AppScreen,
  BrandHeader,
  PrimaryButton,
  SecondaryButton,
  SectionEyebrow,
} from "../components/appPrimitives";

const LESSON_ART =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBBRbCZV6IgWUWtgYvORuSZfiR-RJBzDXTdvyx3pEt3OL2QPk11fYkCj30wOxfQYLoYv8jD_80tsiWrbAuqQa21bhMuZs1KtQ4tdbOw90LcoxoKNv1iTnR6T98QOxMV1mlzqxwR5oBx2gTEOM0HmwWKNhXlRESiS7TUAD8PjahCEwMTSGbkCz7e8ChLsjUcNgYtckasfGF7iSPrfuf8r1aXZ9ED71ay4B108WxQtukPGC6nkz7vJRQVZx25U6WHc-tC_FIMhdvB4naS";
const WRITING_ART =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuByOHcDLeEFOXAHff4wfj5Sji62qg_Hi-YFpuYk4rfLO8K4vq1oZijw-Kn7Q9EIwOhYiNhbNS1PLZ4-_7u6KUHXAhkG4yqmu50A1ksrciYBloG1qe25RYMwvGiKQ1dXHAG8pJV_0RceAvl0DQDirHAPWRWzj7lDvbmoftEKCRbK5mBQ9FhvNzmX5sevLO8LjzlcDDpm56mMmR5g_2_Vumere1m_tM_yr3PQgSGDRFrCWUJSweWlF7Q3SRmOiLhDLmtLZzq028jAwHmc";
const LEAF_ART =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB8ASq4EzoQTtv_vauOLJAIaLN18F9eQH_EnEwL6tXKwt9bBxKmCQ3ZG_edhi1EkKq0HGfBsbalwfWeTFEjhFDWHe6ap8GcfQJBkj16OfflZB94axYLIc2d9j-1wtb0EkvKu_B5R2z9zqrsquYzAgPhPPmK_xP4QKzmOovJqw35eOvkdUrAbt4FwdScnzKH67r9Ro7zV91ccjllzfwmFlC4TFFosklDvBKP_OMh8NUlDBT_ZKgtcvKXN_4Vq0uYc671LunnUb-M6IBT";

export const GRAMMAR_SCREEN_IDS = [
  "31_grammar_modules",
  "32_lesson_reader",
  "33_rule_layout",
  "34_practice_quiz",
  "35_sentence_reorder",
  "36_writing_prompt",
  "37_writing_editor",
  "38_ai_correction",
  "39_error_breakdown",
  "40_save_writing",
];

function ModuleCard({
  title,
  subtitle,
  accent = "surface",
  large = false,
  onPress,
  progressDots = 0,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.moduleCard,
        large && styles.moduleCardLarge,
        accent === "surface" && styles.moduleCardSurface,
        accent === "primary" && styles.moduleCardPrimary,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.moduleMetaRow}>
        <View
          style={[
            styles.moduleIcon,
            accent === "primary" && styles.moduleIconPrimary,
          ]}
        />
        {progressDots ? (
          <View style={styles.dotRow}>
            {Array.from({ length: 4 }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDotSmall,
                  index < progressDots && styles.progressDotSmallActive,
                ]}
              />
            ))}
          </View>
        ) : null}
      </View>
      <Text style={styles.moduleTitle}>{title}</Text>
      {subtitle ? <Text style={styles.moduleSubtitle}>{subtitle}</Text> : null}
    </Pressable>
  );
}

function ExampleStrip({ eyebrow, sentence, iconTone = "primary" }) {
  return (
    <View style={styles.exampleStrip}>
      <View
        style={[
          styles.exampleIconBox,
          iconTone === "secondary" && styles.exampleIconBoxSecondary,
        ]}
      />
      <View style={styles.exampleStripCopy}>
        <Text style={styles.exampleStripEyebrow}>{eyebrow}</Text>
        <Text style={styles.exampleStripSentence}>{sentence}</Text>
      </View>
    </View>
  );
}

function ChoiceTile({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.choiceTile,
        selected && styles.choiceTileSelected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.choiceTileText, selected && styles.choiceTileTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

function WordChip({ label, disabled, onPress }) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.wordChip,
        disabled && styles.wordChipDisabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={[styles.wordChipText, disabled && styles.wordChipTextDisabled]}>
        {label}
      </Text>
    </Pressable>
  );
}

function GrammarModulesScreen({ onNavigate, onBack }) {
  return (
    <AppScreen>
      <BrandHeader title="Grammar Mastery" onBack={onBack} />
      <SectionEyebrow>Curriculum</SectionEyebrow>
      <Text style={styles.screenTitle}>Grammar Modules</Text>

      <View style={styles.moduleGrid}>
        <ModuleCard
          title="Tenses"
          subtitle="Master timelines and aspects"
          accent="primary"
          large
          progressDots={2}
          onPress={() => onNavigate("32_lesson_reader")}
        />
        <ModuleCard
          title="Articles"
          subtitle="A / An / The"
          onPress={() => onNavigate("32_lesson_reader")}
        />
        <ModuleCard
          title="Prepositions"
          subtitle="Place, time and direction"
          onPress={() => onNavigate("32_lesson_reader")}
        />
      </View>

      <Pressable
        onPress={() => onNavigate("33_rule_layout")}
        style={({ pressed }) => [styles.smartTipCard, pressed && styles.pressed]}
      >
        <View style={styles.smartTipOrb} />
        <View>
          <Text style={styles.smartTipEyebrow}>Smart tip</Text>
          <Text style={styles.smartTipTitle}>Review Past Continuous</Text>
        </View>
      </Pressable>

      <View style={styles.inlineNav}>
        <SecondaryButton label="Practice" onPress={() => onNavigate("34_practice_quiz")} />
        <SecondaryButton label="AI Tutor" onPress={() => onNavigate("51_ai_tutor_home")} />
      </View>
    </AppScreen>
  );
}

function LessonReaderScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      footer={<PrimaryButton label="Continue" onPress={() => onNavigate("33_rule_layout")} />}
    >
      <BrandHeader title="Lesson: Present Perfect" onBack={onBack} progressText="35%" progressValue={35} />
      <View style={styles.heroImageFrame}>
        <Image source={{ uri: LESSON_ART }} style={styles.heroImageWide} />
      </View>

      <SectionEyebrow>The concept</SectionEyebrow>
      <Text style={styles.lessonHeadline}>
        Actions with a{"\n"}
        <Text style={styles.headlineAccent}>lasting bridge</Text> to now.
      </Text>
      <Text style={styles.lessonCopy}>
        We use the Present Perfect for actions that happened at an unspecified
        time or started in the past and continue today.
      </Text>

      <View style={styles.structureCard}>
        <View style={styles.structureHeader}>
          <View style={styles.structureIcon} />
          <View>
            <Text style={styles.structureEyebrow}>Structure</Text>
            <Text style={styles.structureTitle}>
              Subject + Have/Has + Past Participle
            </Text>
          </View>
        </View>
        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>
            I <Text style={styles.quoteAccent}>have lived</Text> here since 2010.
          </Text>
          <View style={styles.quotePills}>
            <Text style={styles.quotePill}>Unspecified time</Text>
            <Text style={styles.quotePill}>Still true</Text>
          </View>
        </View>
      </View>
    </AppScreen>
  );
}

function RuleLayoutScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      footer={
        <PrimaryButton
          label="Continue journey"
          onPress={() => onNavigate("34_practice_quiz")}
        />
      }
    >
      <BrandHeader title="Rule Summary" onBack={onBack} />
      <View style={styles.ruleHero}>
        <View style={styles.ruleAccentBar} />
        <Text style={styles.ruleEyebrow}>Core rule</Text>
        <Text style={styles.ruleTitle}>The Present Perfect Tense</Text>
        <Text style={styles.ruleCopy}>
          Connects the past to the present. Use it for actions that happened at
          an unspecified time or started in the past and continue now.
        </Text>
      </View>

      <ExampleStrip
        eyebrow="Ongoing action"
        sentence="I have lived here since 2010."
      />
      <ExampleStrip
        eyebrow="Recent experience"
        sentence="She has already visited Paris."
        iconTone="secondary"
      />
    </AppScreen>
  );
}

function PracticeQuizScreen({ onNavigate, onBack }) {
  const [selected, setSelected] = useState("has");

  return (
    <AppScreen
      footer={<PrimaryButton label="Check" onPress={() => onNavigate("35_sentence_reorder")} />}
    >
      <BrandHeader title="Practice" onBack={onBack} progressText="3/5" progressValue={60} />
      <Text style={styles.quizPrompt}>
        Fill in the missing word to complete the present perfect tense:
      </Text>

      <View style={styles.blankSentence}>
        <Text style={styles.blankSentenceWord}>She</Text>
        <View style={styles.blankLineWrap}>
          <Text style={styles.blankPreview}>_____</Text>
          <View style={styles.blankLine} />
        </View>
        <Text style={styles.blankSentenceWord}>finished</Text>
        <Text style={styles.blankSentenceWord}>her thesis.</Text>
      </View>

      <View style={styles.choiceGrid}>
        {["have", "has", "is", "was"].map((option) => (
          <ChoiceTile
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

function SentenceReorderScreen({ onNavigate, onBack }) {
  const [selectedWords, setSelectedWords] = useState(["Grammar", "mastery"]);
  const wordPool = ["morning", "every", "I", "study", "mastery", "Grammar"];
  const inactiveWords = useMemo(
    () => wordPool.filter((word) => !selectedWords.includes(word)),
    [selectedWords]
  );

  return (
    <AppScreen
      footer={<PrimaryButton label="Submit" onPress={() => onNavigate("36_writing_prompt")} />}
    >
      <BrandHeader title="Reorder" onBack={onBack} progressText="3/4" progressValue={75} />
      <Text style={styles.screenTitle}>Translate this phrase</Text>
      <View style={styles.audioPrompt}>
        <View style={styles.audioOrb} />
        <Text style={styles.audioPromptText}>
          I study grammar every morning.
        </Text>
      </View>

      <View style={styles.composeArea}>
        {selectedWords.map((word) => (
          <WordChip
            key={word}
            label={word}
            onPress={() =>
              setSelectedWords((current) => current.filter((item) => item !== word))
            }
          />
        ))}
      </View>

      <View style={styles.wordPool}>
        {inactiveWords.map((word) => (
          <WordChip
            key={word}
            label={word}
            onPress={() =>
              setSelectedWords((current) => [...current, word])
            }
          />
        ))}
        {selectedWords.map((word) => (
          <WordChip key={`${word}-disabled`} label={word} disabled />
        ))}
      </View>
    </AppScreen>
  );
}

function WritingPromptScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      footer={
        <PrimaryButton
          label="Start writing"
          onPress={() => onNavigate("37_writing_editor")}
        />
      }
    >
      <BrandHeader title="Writing Prompt" onBack={onBack} />
      <View style={styles.writingArtFrame}>
        <Image source={{ uri: WRITING_ART }} style={styles.writingArt} />
        <View style={styles.writingArtBadge} />
      </View>
      <Text style={styles.promptEyebrow}>The Daily Reflection</Text>
      <Text style={styles.promptTitle}>Describe your day.</Text>
    </AppScreen>
  );
}

function WritingEditorScreen({ onNavigate, onBack }) {
  const [draft, setDraft] = useState(
    "Today I studied English in the morning and then wrote a short reflection about my habits."
  );

  return (
    <AppScreen
      footer={<PrimaryButton label="AI Review" onPress={() => onNavigate("38_ai_correction")} />}
    >
      <BrandHeader title="Editor" onBack={onBack} />
      <View style={styles.editorCard}>
        <View style={styles.editorBar}>
          <View style={styles.editorDots}>
            <View style={[styles.editorDot, { backgroundColor: COLORS.primaryBright }]} />
            <View style={[styles.editorDot, { backgroundColor: "#6DFE9C" }]} />
            <View style={[styles.editorDot, { backgroundColor: COLORS.tertiary }]} />
          </View>
          <Text style={styles.editorMeta}>Markdown enabled</Text>
        </View>
        <TextInput
          multiline
          value={draft}
          onChangeText={setDraft}
          style={styles.editorInput}
          textAlignVertical="top"
        />
        <View style={styles.wordCounter}>
          <Text style={styles.wordCounterText}>
            {draft.split(/\s+/).filter(Boolean).length} words
          </Text>
        </View>
      </View>

      <View style={styles.metaGrid}>
        <View style={styles.metaCard}>
          <Text style={styles.metaCardLabel}>Topic</Text>
          <Text style={styles.metaCardValue}>Modern Ethics</Text>
        </View>
        <View style={styles.metaCard}>
          <Text style={styles.metaCardLabel}>Goal</Text>
          <Text style={styles.metaCardValue}>15 mins left</Text>
        </View>
      </View>
    </AppScreen>
  );
}

function AiCorrectionScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      footer={
        <PrimaryButton
          label="Apply correction"
          onPress={() => onNavigate("39_error_breakdown")}
        />
      }
    >
      <BrandHeader title="AI Review" onBack={onBack} />
      <View style={styles.correctionSourceCard}>
        <Text style={styles.correctionSourceLabel}>Your sentence</Text>
        <Text style={styles.correctionSourceText}>
          I have <Text style={styles.errorHighlight}>went</Text> to the library
          yesterday to study.
        </Text>
      </View>

      <View style={styles.suggestionHeader}>
        <View style={styles.suggestionOrb} />
        <Text style={styles.suggestionTitle}>AI suggestion</Text>
      </View>

      <View style={styles.suggestionCard}>
        <View style={styles.suggestionMeta}>
          <Text style={styles.suggestionMetaLabel}>Correction</Text>
          <Text style={styles.suggestionChip}>Grammar</Text>
        </View>
        <View style={styles.swapRow}>
          <Text style={styles.swapWrong}>went</Text>
          <Text style={styles.swapArrow}>{"->"}</Text>
          <Text style={styles.swapRight}>gone</Text>
        </View>
        <Text style={styles.suggestionCopy}>
          Use "gone" with "have" to form the present perfect tense. "Went" is
          the simple past and does not pair with "have."
        </Text>
      </View>
    </AppScreen>
  );
}

function ErrorBreakdownScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      footer={
        <PrimaryButton
          label="Got it, thanks!"
          onPress={() => onNavigate("40_save_writing")}
        />
      }
    >
      <BrandHeader title="Explanation" onBack={onBack} />
      <View style={styles.compareStack}>
        <View style={styles.originalCard}>
          <Text style={styles.compareLabel}>Original</Text>
          <Text style={styles.compareText}>
            I <Text style={styles.compareError}>has</Text> been learning English
            for three years.
          </Text>
        </View>
        <View style={styles.correctedCard}>
          <Text style={styles.correctedLabel}>Corrected</Text>
          <Text style={styles.compareText}>
            I <Text style={styles.correctedAccent}>have</Text> been learning
            English for three years.
          </Text>
        </View>
      </View>

      <View style={styles.explanationCard}>
        <View style={styles.explanationHeader}>
          <View style={styles.explanationIcon} />
          <View>
            <Text style={styles.explanationTitle}>Subject-Verb Agreement</Text>
            <Text style={styles.explanationEyebrow}>Grammar rule</Text>
          </View>
        </View>
        <Text style={styles.explanationCopy}>
          In the Present Perfect Continuous tense, the auxiliary verb must match
          the subject. "I" always takes "have", even though it refers to one
          person.
        </Text>
        <View style={styles.explanationGrid}>
          <View style={styles.explanationMiniCard}>
            <Text style={styles.explanationMiniLabel}>Singular 3rd</Text>
            <Text style={styles.explanationMiniValue}>He / She / It{"\n"}has</Text>
          </View>
          <View style={styles.explanationMiniCardActive}>
            <Text style={styles.explanationMiniLabelActive}>First person</Text>
            <Text style={styles.explanationMiniValueActive}>I / You / We{"\n"}have</Text>
          </View>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipCopy}>
            Remember: "I" always takes the plural auxiliary form "have."
          </Text>
        </View>
      </View>
    </AppScreen>
  );
}

function SaveWritingScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      footer={
        <>
          <PrimaryButton label="Go home" onPress={() => onNavigate("11_home_dashboard")} />
          <SecondaryButton
            label="Review AI notes"
            onPress={() => onNavigate("69_mistake_notebook")}
          />
        </>
      }
    >
      <BrandHeader title="Done" onBack={onBack} />
      <View style={styles.successWrap}>
        <View style={styles.successOrb}>
          <Text style={styles.successCheck}>+</Text>
        </View>
        <Text style={styles.successTitle}>Great job!</Text>
        <Text style={styles.successSubtitle}>Saved to Notebook</Text>
      </View>

      <View style={styles.notebookCard}>
        <View style={styles.notebookIconWrap}>
          <Image source={{ uri: LEAF_ART }} style={styles.notebookArt} />
        </View>
        <View style={styles.notebookCopy}>
          <Text style={styles.notebookTitle}>Practice makes perfect</Text>
          <Text style={styles.notebookText}>
            This correction has been categorized under common verb tense errors.
          </Text>
        </View>
      </View>
    </AppScreen>
  );
}

export function renderGrammarScreen(screenId, props) {
  switch (screenId) {
    case "31_grammar_modules":
      return <GrammarModulesScreen key={screenId} {...props} />;
    case "32_lesson_reader":
      return <LessonReaderScreen key={screenId} {...props} />;
    case "33_rule_layout":
      return <RuleLayoutScreen key={screenId} {...props} />;
    case "34_practice_quiz":
      return <PracticeQuizScreen key={screenId} {...props} />;
    case "35_sentence_reorder":
      return <SentenceReorderScreen key={screenId} {...props} />;
    case "36_writing_prompt":
      return <WritingPromptScreen key={screenId} {...props} />;
    case "37_writing_editor":
      return <WritingEditorScreen key={screenId} {...props} />;
    case "38_ai_correction":
      return <AiCorrectionScreen key={screenId} {...props} />;
    case "39_error_breakdown":
      return <ErrorBreakdownScreen key={screenId} {...props} />;
    case "40_save_writing":
      return <SaveWritingScreen key={screenId} {...props} />;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  screenTitle: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 38,
    marginBottom: 18,
  },
  moduleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 18,
  },
  moduleCard: {
    width: "47%",
    minHeight: 188,
    borderRadius: 30,
    padding: 18,
    justifyContent: "space-between",
    backgroundColor: COLORS.surfaceLow,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.22)",
  },
  moduleCardLarge: {
    width: "100%",
    minHeight: 160,
  },
  moduleCardSurface: {
    backgroundColor: "rgba(0,110,47,0.05)",
    borderColor: "rgba(0,110,47,0.12)",
  },
  moduleCardPrimary: {
    backgroundColor: COLORS.surface,
    borderColor: "rgba(0,110,47,0.12)",
  },
  moduleMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moduleIcon: {
    width: 38,
    height: 38,
    borderRadius: 16,
    backgroundColor: "rgba(0,110,47,0.10)",
  },
  moduleIconPrimary: {
    backgroundColor: "rgba(34,197,94,0.16)",
  },
  dotRow: {
    flexDirection: "row",
    gap: 6,
  },
  progressDotSmall: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(188,203,185,0.45)",
  },
  progressDotSmallActive: {
    backgroundColor: COLORS.primary,
  },
  moduleTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 26,
  },
  moduleSubtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
    fontWeight: "600",
  },
  smartTipCard: {
    borderRadius: 30,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: "rgba(0,110,47,0.12)",
    marginBottom: 16,
  },
  smartTipOrb: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
  },
  smartTipEyebrow: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  smartTipTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
  },
  inlineNav: {
    gap: 12,
  },
  heroImageFrame: {
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: COLORS.surfaceLow,
    marginBottom: 20,
  },
  heroImageWide: {
    width: "100%",
    height: 210,
  },
  lessonHeadline: {
    color: COLORS.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
    marginBottom: 12,
  },
  headlineAccent: {
    color: COLORS.primary,
    fontStyle: "italic",
  },
  lessonCopy: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 18,
  },
  structureCard: {
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.20)",
  },
  structureHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  structureIcon: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: "rgba(109,254,156,0.26)",
  },
  structureEyebrow: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  structureTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "700",
  },
  quoteCard: {
    borderRadius: 22,
    backgroundColor: COLORS.surfaceLow,
    padding: 16,
  },
  quoteText: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 30,
  },
  quoteAccent: {
    color: COLORS.primary,
  },
  quotePills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  quotePill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceHigh,
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "700",
  },
  ruleHero: {
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 24,
    marginBottom: 18,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  ruleAccentBar: {
    width: 8,
    height: 42,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    marginBottom: 16,
  },
  ruleEyebrow: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  ruleTitle: {
    color: COLORS.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    marginBottom: 12,
  },
  ruleCopy: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  exampleStrip: {
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLow,
    padding: 18,
    flexDirection: "row",
    gap: 14,
    marginBottom: 14,
  },
  exampleIconBox: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: "rgba(0,110,47,0.12)",
  },
  exampleIconBoxSecondary: {
    backgroundColor: "rgba(65,102,86,0.14)",
  },
  exampleStripCopy: {
    flex: 1,
  },
  exampleStripEyebrow: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  exampleStripSentence: {
    color: COLORS.text,
    fontSize: 17,
    lineHeight: 23,
    fontStyle: "italic",
    fontWeight: "600",
  },
  quizPrompt: {
    color: COLORS.textMuted,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "500",
    marginBottom: 32,
  },
  blankSentence: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    columnGap: 10,
    rowGap: 18,
    marginBottom: 34,
  },
  blankSentenceWord: {
    color: COLORS.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
  },
  blankLineWrap: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  blankPreview: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
  },
  blankLine: {
    width: 118,
    height: 4,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  choiceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  choiceTile: {
    width: "47%",
    minHeight: 88,
    borderRadius: 26,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  choiceTileSelected: {
    backgroundColor: COLORS.surfaceLow,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  choiceTileText: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "700",
  },
  choiceTileTextSelected: {
    color: COLORS.primary,
  },
  audioPrompt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },
  audioOrb: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.tertiary,
  },
  audioPromptText: {
    color: COLORS.textMuted,
    fontSize: 19,
    lineHeight: 26,
    flex: 1,
    fontStyle: "italic",
  },
  composeArea: {
    minHeight: 180,
    borderRadius: 18,
    backgroundColor: COLORS.surfaceLow,
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    alignContent: "flex-start",
    marginBottom: 28,
  },
  wordPool: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  wordChip: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.25)",
  },
  wordChipDisabled: {
    backgroundColor: COLORS.surfaceLow,
    opacity: 0.35,
  },
  wordChipText: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "700",
  },
  wordChipTextDisabled: {
    color: COLORS.textMuted,
  },
  writingArtFrame: {
    width: 192,
    height: 256,
    borderRadius: 28,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: COLORS.surface,
    marginBottom: 36,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  writingArt: {
    width: "100%",
    height: "100%",
  },
  writingArtBadge: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 46,
    height: 46,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.85)",
  },
  promptEyebrow: {
    color: COLORS.textMuted,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 12,
  },
  promptTitle: {
    color: COLORS.text,
    textAlign: "center",
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "800",
  },
  editorCard: {
    minHeight: 380,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
    marginBottom: 18,
  },
  editorBar: {
    minHeight: 48,
    backgroundColor: "rgba(240,245,242,0.85)",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editorDots: {
    flexDirection: "row",
    gap: 6,
  },
  editorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  editorMeta: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  editorInput: {
    flex: 1,
    minHeight: 260,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 54,
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 24,
  },
  wordCounter: {
    position: "absolute",
    right: 16,
    bottom: 16,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceLow,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  wordCounterText: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "700",
  },
  metaGrid: {
    flexDirection: "row",
    gap: 12,
  },
  metaCard: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLow,
    padding: 16,
  },
  metaCardLabel: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  metaCardValue: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "700",
  },
  correctionSourceCard: {
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.18)",
    marginBottom: 18,
  },
  correctionSourceLabel: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  correctionSourceText: {
    color: COLORS.text,
    fontSize: 22,
    lineHeight: 32,
  },
  errorHighlight: {
    backgroundColor: "#FFDED7",
    color: "#93000A",
  },
  suggestionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  suggestionOrb: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
  },
  suggestionTitle: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  suggestionCard: {
    borderRadius: 28,
    backgroundColor: "rgba(228,233,230,0.65)",
    padding: 22,
  },
  suggestionMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  suggestionMetaLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  suggestionChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(0,110,47,0.10)",
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  swapRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  swapWrong: {
    color: COLORS.primary,
    fontSize: 34,
    fontWeight: "800",
    fontStyle: "italic",
  },
  swapArrow: {
    color: COLORS.textMuted,
    fontSize: 20,
    fontWeight: "700",
  },
  swapRight: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: "800",
  },
  suggestionCopy: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  compareStack: {
    gap: 12,
    marginBottom: 18,
  },
  originalCard: {
    borderRadius: 22,
    backgroundColor: COLORS.surfaceLow,
    padding: 18,
  },
  correctedCard: {
    borderRadius: 22,
    backgroundColor: "rgba(0,110,47,0.06)",
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    padding: 18,
  },
  compareLabel: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  correctedLabel: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
  },
  compareText: {
    color: COLORS.text,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "600",
  },
  compareError: {
    color: "#BA1A1A",
    backgroundColor: "rgba(186,26,26,0.10)",
  },
  correctedAccent: {
    color: COLORS.primary,
    backgroundColor: "rgba(0,110,47,0.10)",
  },
  explanationCard: {
    borderRadius: 30,
    backgroundColor: COLORS.surface,
    padding: 22,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  explanationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  explanationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(141,180,161,0.35)",
  },
  explanationTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },
  explanationEyebrow: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  explanationCopy: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
  },
  explanationGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  explanationMiniCard: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: COLORS.surfaceLow,
    padding: 14,
  },
  explanationMiniCardActive: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: "rgba(0,110,47,0.10)",
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(0,110,47,0.18)",
  },
  explanationMiniLabel: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  explanationMiniValue: {
    color: COLORS.text,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800",
  },
  explanationMiniLabelActive: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  explanationMiniValueActive: {
    color: COLORS.primary,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800",
  },
  tipCard: {
    borderRadius: 18,
    backgroundColor: "rgba(195,236,215,0.42)",
    padding: 14,
  },
  tipCopy: {
    color: COLORS.secondary,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600",
  },
  successWrap: {
    alignItems: "center",
    marginTop: 42,
    marginBottom: 36,
  },
  successOrb: {
    width: 132,
    height: 132,
    borderRadius: 34,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 6,
  },
  successCheck: {
    color: "#FFFFFF",
    fontSize: 62,
    fontWeight: "800",
    lineHeight: 66,
  },
  successTitle: {
    color: COLORS.text,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "800",
    marginBottom: 8,
  },
  successSubtitle: {
    color: COLORS.textMuted,
    fontSize: 22,
    fontWeight: "600",
  },
  notebookCard: {
    borderRadius: 28,
    backgroundColor: COLORS.surfaceLow,
    padding: 18,
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  notebookIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "rgba(141,180,161,0.22)",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  notebookArt: {
    width: 42,
    height: 42,
  },
  notebookCopy: {
    flex: 1,
  },
  notebookTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  notebookText: {
    color: COLORS.textMuted,
    fontSize: 12,
    lineHeight: 19,
  },
});
