import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../design/tokens";
import {
  AppScreen,
  BrandHeader,
  MetricCard,
  PrimaryButton,
  SecondaryButton,
  SectionEyebrow,
} from "../components/appPrimitives";

export const VOCABULARY_SCREEN_IDS = [
  "21_vocabulary_topics",
  "22_topic_detail",
  "23_flashcard_front",
  "24_flashcard_back",
  "25_word_saved",
  "26_word_detail",
  "27_ai_examples",
  "28_ai_nuance_explanation",
  "29_vocabulary_quiz_entry",
  "30_vocabulary_quiz_result",
];

const QUIZ_ENTRY_HERO_IMAGE =
  "https://www.figma.com/api/mcp/asset/c54c237b-bed3-41fd-b16e-6cc5f824083d";
const QUIZ_RESULT_DECOR_IMAGE =
  "https://www.figma.com/api/mcp/asset/ef07f2e7-3731-48c7-a2f2-56da32c51f69";
const FLASHCARD_BACK_DECOR_ICON =
  "https://www.figma.com/api/mcp/asset/500ebdcf-5e6a-40d1-babd-68d935cdbb45";
const WORD_DETAIL_QUOTE_IMAGE =
  "https://www.figma.com/api/mcp/asset/c14fbe60-3845-41d1-8110-634dbe6ec57c";
const TOPIC_NATURE_ICON =
  "https://www.figma.com/api/mcp/asset/3bba6239-8ab3-4d69-b236-12197e45cec7";
const TOPIC_BUSINESS_ICON =
  "https://www.figma.com/api/mcp/asset/43bd627d-859e-4bd7-9460-58a0c5eda6b6";
const TOPIC_TRAVEL_ICON =
  "https://www.figma.com/api/mcp/asset/1b139bb1-f18e-4834-b073-9514018fb892";
const TOPIC_CUISINE_ICON =
  "https://www.figma.com/api/mcp/asset/fa095de4-314e-4b94-886e-2afff7ebf3eb";
const TOPIC_SCIENCE_ICON =
  "https://www.figma.com/api/mcp/asset/9bbdb9cd-f0a3-4f8a-bf56-c63cb3bbd3b6";
const TOPIC_ART_ICON =
  "https://www.figma.com/api/mcp/asset/ab7ae4d1-1e0f-4306-9376-fe65a153bf6f";
const TOPIC_MILESTONE_DECOR =
  "https://www.figma.com/api/mcp/asset/0ccb643f-b86d-45d1-8f16-1912d415bcf5";
const FLASHCARD_FRONT_AUDIO_ICON =
  "https://www.figma.com/api/mcp/asset/37b84973-7bff-4fea-9cb8-4a888ff0b013";
const FLASHCARD_FRONT_DECOR =
  "https://www.figma.com/api/mcp/asset/1df974b8-6f47-4252-9a9f-c82000c68a04";

function QuizTopBar({ avatarAccent }) {
  return (
    <View style={styles.quizTopBar}>
      <View style={styles.quizBrandRow}>
        <View style={styles.menuIcon}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLineShort} />
        </View>
        <Text style={styles.quizBrandText}>AI Tutor</Text>
      </View>
      <View style={[styles.quizAvatar, avatarAccent && styles.quizAvatarActive]}>
        <Text style={styles.quizAvatarText}>P</Text>
      </View>
    </View>
  );
}

function QuizBottomNav({ active, onNavigate }) {
  const items = [
    { key: "modules", label: "Modules", onPress: () => onNavigate("21_vocabulary_topics") },
    { key: "practice", label: "Practice", onPress: () => onNavigate("29_vocabulary_quiz_entry") },
    { key: "tutor", label: "AI Tutor", onPress: () => onNavigate("51_ai_tutor_home") },
    { key: "profile", label: "Profile" },
  ];

  return (
    <View style={styles.quizBottomNav}>
      {items.map((item) => {
        const selected = item.key === active;
        return (
          <Pressable
            key={item.key}
            onPress={item.onPress}
            style={({ pressed }) => [styles.quizBottomItem, pressed && item.onPress && styles.tilePressed]}
          >
            <View style={[styles.quizBottomIcon, selected && styles.quizBottomIconActive]} />
            <Text style={[styles.quizBottomLabel, selected && styles.quizBottomLabelActive]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function QuizMetaCard({ title, subtitle }) {
  return (
    <View style={styles.quizMetaCard}>
      <View style={styles.quizMetaIcon} />
      <Text style={styles.quizMetaTitle}>{title}</Text>
      <Text style={styles.quizMetaSubtitle}>{subtitle}</Text>
    </View>
  );
}

function QuizBenefitRow({ title, strong }) {
  return (
    <View style={styles.quizBenefitRow}>
      <View style={[styles.quizBenefitIcon, strong && styles.quizBenefitIconStrong]} />
      <Text style={styles.quizBenefitText}>{title}</Text>
    </View>
  );
}

function ResultMetricCard({ title, value, accent = "primary" }) {
  return (
    <View style={styles.resultMetricCard}>
      <View style={[styles.resultMetricIcon, accent === "soft" && styles.resultMetricIconSoft]} />
      <Text style={styles.resultMetricValue}>{value}</Text>
      <Text style={styles.resultMetricTitle}>{title}</Text>
    </View>
  );
}

function QuizPrimaryAction({ label, onPress, arrow = false }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.quizPrimaryAction, pressed && styles.tilePressed]}>
      <Text style={styles.quizPrimaryActionText}>{label}</Text>
      {arrow ? <Text style={styles.quizPrimaryArrow}>→</Text> : null}
    </Pressable>
  );
}

function QuizSecondaryAction({ label, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.quizSecondaryAction, pressed && styles.tilePressed]}>
      <Text style={styles.quizSecondaryActionText}>{label}</Text>
    </Pressable>
  );
}

function VocabularyTopBar({ title, onBack, avatarAccent }) {
  return (
    <View style={styles.vocabTopBar}>
      <View style={styles.vocabTopLeft}>
        <Pressable onPress={onBack} style={({ pressed }) => [styles.vocabBackButton, pressed && styles.tilePressed]}>
          <Text style={styles.vocabBackText}>←</Text>
        </Pressable>
        <Text style={styles.vocabTopTitle}>{title}</Text>
      </View>
      <View style={[styles.vocabAvatar, avatarAccent && styles.vocabAvatarAccent]}>
        <Text style={styles.vocabAvatarText}>P</Text>
      </View>
    </View>
  );
}

function TopicStatPill({ label, inverse = false }) {
  return (
    <View style={[styles.topicStatPill, inverse && styles.topicStatPillInverse]}>
      <Text style={[styles.topicStatPillText, inverse && styles.topicStatPillTextInverse]}>{label}</Text>
    </View>
  );
}

function DeckMiniCard({ label, value }) {
  return (
    <View style={styles.deckMiniCard}>
      <Text style={styles.deckMiniLabel}>{label}</Text>
      <Text style={styles.deckMiniValue}>{value}</Text>
    </View>
  );
}

function WordDetailTag({ label }) {
  return (
    <View style={styles.wordDetailTag}>
      <Text style={styles.wordDetailTagText}>{label}</Text>
    </View>
  );
}

function ExactTopicTile({ title, subtitle, icon, onPress, large, wide, footer, progress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.exactTopicTile,
        large && styles.exactTopicTileLarge,
        wide && styles.exactTopicTileWide,
        pressed && styles.tilePressed,
      ]}
    >
      <View style={styles.exactTopicHead}>
        <View style={[styles.exactTopicIconShell, wide && styles.exactTopicIconShellWide]}>
          <Image source={{ uri: icon }} style={styles.exactTopicIcon} />
        </View>
        <View style={styles.exactTopicCopy}>
          <Text style={[styles.exactTopicTitle, wide && styles.exactTopicTitleWide]}>{title}</Text>
          {subtitle ? <Text style={styles.exactTopicSubtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      {progress ? (
        <View style={styles.topicProgressTrack}>
          <View style={[styles.topicProgressFill, { width: progress }]} />
        </View>
      ) : null}
      {footer ? <View style={styles.exactTopicFooter}>{footer}</View> : null}
    </Pressable>
  );
}

function WordRow({ word, meaning, state = "known", onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.wordRow, pressed && styles.tilePressed]}>
      <View style={[styles.wordBadge, state === "locked" && styles.wordBadgeLocked]}>
        <Text style={[styles.wordBadgeText, state === "locked" && styles.wordBadgeTextLocked]}>
          {state === "locked" ? "L" : state === "learning" ? "..." : "OK"}
        </Text>
      </View>
      <View style={styles.wordCopy}>
        <Text style={styles.wordTitle}>{word}</Text>
        <Text style={styles.wordMeaning}>{meaning}</Text>
      </View>
    </Pressable>
  );
}

function TopicsScreen({ onNavigate }) {
  return (
    <View style={styles.vocabStandaloneScreen}>
      <VocabularyTopBar title="Verdant Scholar" avatarAccent />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.topicScreenScroll}
      >
        <Text style={styles.topicScreenEyebrow}>Curated modules</Text>
        <Text style={styles.topicScreenTitle}>Expand Your{`\n`}Lexicon</Text>
        <Text style={styles.topicScreenCopy}>
          Deepen your understanding through context-rich vocabulary clusters.
        </Text>

        <View style={styles.topicExactGrid}>
          <ExactTopicTile
            title="Nature"
            subtitle="124 words"
            icon={TOPIC_NATURE_ICON}
            large
            progress="66%"
            onPress={() => onNavigate("23_flashcard_front")}
          />
          <ExactTopicTile
            title="Business"
            subtitle="85% MASTERED"
            icon={TOPIC_BUSINESS_ICON}
            onPress={() => onNavigate("23_flashcard_front")}
          />
          <ExactTopicTile
            title="Travel"
            icon={TOPIC_TRAVEL_ICON}
            footer={
              <View style={styles.travelDots}>
                <View style={styles.travelDot} />
                <View style={styles.travelDotActive} />
              </View>
            }
            onPress={() => onNavigate("23_flashcard_front")}
          />
          <ExactTopicTile
            title="Cuisine & Dining"
            subtitle="Master the art of conversation over meals."
            icon={TOPIC_CUISINE_ICON}
            wide
            onPress={() => onNavigate("23_flashcard_front")}
          />
          <ExactTopicTile
            title="Science"
            icon={TOPIC_SCIENCE_ICON}
            onPress={() => onNavigate("23_flashcard_front")}
          />
          <ExactTopicTile
            title="Fine Arts"
            icon={TOPIC_ART_ICON}
            onPress={() => onNavigate("23_flashcard_front")}
          />
        </View>

        <Pressable onPress={() => onNavigate("71_progress_overview")} style={({ pressed }) => [styles.topicMilestoneCard, pressed && styles.tilePressed]}>
          <Image source={{ uri: TOPIC_MILESTONE_DECOR }} style={styles.topicMilestoneDecor} />
          <Text style={styles.topicMilestoneEyebrow}>Daily milestone</Text>
          <Text style={styles.topicMilestoneTitle}>You learned 42 new{`\n`}words this week!</Text>
          <View style={styles.topicMilestoneButton}>
            <Text style={styles.topicMilestoneButtonText}>View Progress</Text>
          </View>
        </Pressable>
      </ScrollView>
      <QuizBottomNav active="modules" onNavigate={onNavigate} />
    </View>
  );
}

function TopicDetailScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      footer={<PrimaryButton label="Practice now" onPress={() => onNavigate("23_flashcard_front")} />}
    >
      <BrandHeader title="Nature" onBack={onBack} />

      <View style={styles.topicDetailHero}>
        <View style={styles.topicDetailHeroOrb} />
        <Text style={styles.topicDetailHeroTitle}>Nature set</Text>
        <Text style={styles.topicDetailHeroCopy}>
          Build expressive vocabulary for rain, forests, lightning, wind, and natural scenes.
        </Text>
      </View>

      <View style={styles.masteryCard}>
        <View style={styles.masteryTopRow}>
          <View>
            <Text style={styles.masteryLabel}>Current mastery</Text>
            <Text style={styles.masteryValue}>65%</Text>
          </View>
          <DeckMiniCard label="Deck size" value="20 words" />
        </View>
        <View style={styles.masteryTrack}>
          <View style={[styles.masteryFill, { width: "65%" }]} />
        </View>
        <Text style={styles.masteryMeta}>13/20 words learned - 7 to go</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Vocabulary deck</Text>
        <Text style={styles.sectionSubtitle}>Tap a word to open the flashcard flow.</Text>
      </View>

      <View style={styles.wordList}>
        <WordRow word="Bosque" meaning="Forest" onPress={() => onNavigate("23_flashcard_front")} />
        <WordRow word="Montana" meaning="Mountain" onPress={() => onNavigate("23_flashcard_front")} />
        <WordRow word="Lluvia" meaning="Rain" state="learning" onPress={() => onNavigate("23_flashcard_front")} />
        <WordRow word="Relampago" meaning="Lightning" state="locked" onPress={() => onNavigate("23_flashcard_front")} />
      </View>
    </AppScreen>
  );
}

function FlashcardFrontScreen({ onNavigate, onBack }) {
  return (
    <View style={styles.vocabStandaloneScreen}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flashFrontScreenScroll}
      >
        <Pressable onPress={() => onNavigate("24_flashcard_back")} style={({ pressed }) => [styles.flashFrontCard, pressed && styles.tilePressed]}>
          <View style={styles.flashFrontTopPill}>
            <Text style={styles.flashFrontPillLabel}>Vocabulary</Text>
            <View style={styles.flashFrontPillDot} />
            <Text style={styles.flashFrontPillPhonetic}>/əˈfem(ə)rəl/</Text>
          </View>

          <Text style={styles.flashFrontWord}>Ephemeral</Text>

          <View style={styles.flashFrontAudioButton}>
            <Image source={{ uri: FLASHCARD_FRONT_AUDIO_ICON }} style={styles.flashFrontAudioIcon} />
          </View>

          <View style={styles.flashFrontHintWrap}>
            <Text style={styles.flashFrontHint}>Tap to see meaning</Text>
            <Text style={styles.flashFrontHintHand}>☟</Text>
          </View>

          <Image source={{ uri: FLASHCARD_FRONT_DECOR }} style={styles.flashFrontDecor} />
        </Pressable>
      </ScrollView>
    </View>
  );
}

function FlashcardBackScreen({ onNavigate, onBack }) {
  return (
    <View style={styles.vocabStandaloneScreen}>
      <VocabularyTopBar title="Verdant Scholar" onBack={onBack} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.vocabStandaloneScroll}
      >
        <View style={styles.flashProgressWrap}>
          <View style={styles.flashProgressOuter}>
            <View style={styles.flashProgressInner}>
              <Text style={styles.flashProgressText}>12/15</Text>
            </View>
          </View>
        </View>

        <View style={styles.flashBackCard}>
          <View style={styles.flashBackTagRow}>
            <View style={styles.flashBackTagPrimary}>
              <Text style={styles.flashBackTagPrimaryText}>Adjective</Text>
            </View>
            <View style={styles.flashBackTag}>
              <Text style={styles.flashBackTagText}>B2 Level</Text>
            </View>
          </View>
          <Text style={styles.flashBackWord}>Ephemeral</Text>
          <View style={styles.flashBackPronounceRow}>
            <View style={styles.flashBackSoundDot} />
            <Text style={styles.flashBackPronounce}>/ɪˈfɛm(ə)rəl/</Text>
          </View>
          <Text style={styles.flashBackLabel}>Definition</Text>
          <Text style={styles.flashBackDefinition}>Lasting for a short time.</Text>
          <Image source={{ uri: FLASHCARD_BACK_DECOR_ICON }} style={styles.flashBackDecorIcon} />
        </View>

        <View style={styles.flashUsageCard}>
          <View style={styles.flashUsageHeader}>
            <View style={styles.flashUsageIcon} />
            <Text style={styles.flashUsageTitle}>Example usage</Text>
          </View>
          <View style={styles.flashUsageQuoteBar} />
          <Text style={styles.flashUsageQuote}>
            "The beauty of the sunset was <Text style={styles.flashUsageHighlight}>ephemeral</Text>, fading into darkness within minutes."
          </Text>
        </View>

        <View style={styles.flashChipWrap}>
          <View style={styles.flashChip}><Text style={styles.flashChipText}>transient</Text></View>
          <View style={styles.flashChip}><Text style={styles.flashChipText}>fleeting</Text></View>
          <View style={styles.flashChip}><Text style={styles.flashChipText}>momentary</Text></View>
          <View style={styles.flashChip}><Text style={styles.flashChipText}>short-lived</Text></View>
        </View>

        <View style={styles.flashActionRow}>
          <Pressable onPress={() => onNavigate("23_flashcard_front")} style={({ pressed }) => [styles.flashSecondaryAction, pressed && styles.tilePressed]}>
            <Text style={styles.flashSecondaryActionText}>Repeat</Text>
          </Pressable>
          <Pressable onPress={() => onNavigate("25_word_saved")} style={({ pressed }) => [styles.flashPrimaryAction, pressed && styles.tilePressed]}>
            <Text style={styles.flashPrimaryActionText}>I know this</Text>
          </Pressable>
        </View>
      </ScrollView>
      <QuizBottomNav onNavigate={onNavigate} />
    </View>
  );
}

function WordSavedScreen({ onNavigate }) {
  return (
    <AppScreen
      footer={
        <>
          <PrimaryButton label="Word detail" onPress={() => onNavigate("26_word_detail")} />
          <SecondaryButton label="Next card" onPress={() => onNavigate("23_flashcard_front")} />
        </>
      }
    >
      <View style={styles.resultOrbSuccess}>
        <Text style={styles.resultOrbSuccessText}>+</Text>
      </View>
      <Text style={styles.centerHeadline}>Saved to your deck</Text>
      <Text style={styles.centerBody}>
        "Lluvia" is now part of your active review list.
      </Text>
    </AppScreen>
  );
}

function WordDetailScreen({ onNavigate, onBack }) {
  return (
    <View style={styles.vocabStandaloneScreen}>
      <VocabularyTopBar title="Verdant Scholar" onBack={onBack} avatarAccent />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wordDetailScroll}
      >
        <View style={styles.wordOfDayHero}>
          <View style={styles.wordOfDayGlow} />
          <Text style={styles.wordOfDayEyebrow}>Word of the day</Text>
          <Text style={styles.wordOfDayTitle}>Resilience</Text>
          <View style={styles.wordOfDayMetaRow}>
            <View style={styles.wordOfDayPhoneticPill}>
              <Text style={styles.wordOfDayPhonetic}>/rɪˈzɪl.i.əns/</Text>
            </View>
            <Pressable onPress={() => onNavigate("27_ai_examples")} style={({ pressed }) => [styles.wordAudioButton, pressed && styles.tilePressed]}>
              <Text style={styles.wordAudioIcon}>▶</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.wordDefinitionCard}>
          <Text style={styles.wordSectionLabel}>Definition</Text>
          <Text style={styles.wordDefinitionText}>
            The capacity to withstand or to recover quickly from difficulties; toughness.
          </Text>
          <View style={styles.wordDefinitionTags}>
            <View style={styles.wordDefinitionTag}><Text style={styles.wordDefinitionTagText}>Noun</Text></View>
            <View style={styles.wordDefinitionTag}><Text style={styles.wordDefinitionTagText}>Abstract</Text></View>
          </View>
        </View>

        <View style={styles.wordDetailBentoRow}>
          <View style={styles.wordOriginCard}>
            <Text style={styles.wordMiniLabel}>Origin</Text>
            <Text style={styles.wordOriginText}>
              Latin <Text style={styles.wordOriginEmphasis}>resiliens</Text>, from <Text style={styles.wordOriginItalic}>resilire</Text> "to leap back".
            </Text>
          </View>
          <View style={styles.wordComplexityCard}>
            <View style={styles.wordComplexityRingOuter}>
              <View style={styles.wordComplexityRingInner}>
                <Text style={styles.wordComplexityValue}>B2</Text>
              </View>
            </View>
            <Text style={styles.wordComplexityLabel}>Complexity</Text>
          </View>
        </View>

        <View style={styles.wordQuoteCard}>
          <Image source={{ uri: WORD_DETAIL_QUOTE_IMAGE }} style={styles.wordQuoteImage} />
          <View style={styles.wordQuoteOverlay} />
          <Text style={styles.wordQuoteText}>
            "The oak fought the wind and broke, the willow bent when it must and survived."
          </Text>
          <Text style={styles.wordQuoteAuthor}>- Robert Jordan</Text>
        </View>

        <View style={styles.wordContextCard}>
          <Text style={styles.wordSectionLabel}>In context</Text>
          <View style={styles.wordContextItem}>
            <View style={styles.wordContextBarPrimary} />
            <Text style={styles.wordContextText}>
              "His resilience in the face of adversity was truly inspiring to the entire team."
            </Text>
          </View>
          <View style={styles.wordContextItem}>
            <View style={styles.wordContextBarSecondary} />
            <Text style={styles.wordContextText}>
              "The ecological resilience of the rainforest allows it to heal after natural disasters."
            </Text>
          </View>
        </View>

        <View style={styles.wordSynonymCard}>
          <Text style={styles.wordSectionLabel}>Synonyms</Text>
          <View style={styles.wordSynonymGrid}>
            <View style={styles.wordSynonymChip}><Text style={styles.wordSynonymText}>Toughness</Text></View>
            <View style={styles.wordSynonymChip}><Text style={styles.wordSynonymText}>Adaptability</Text></View>
            <View style={styles.wordSynonymChip}><Text style={styles.wordSynonymText}>Fortitude</Text></View>
            <View style={styles.wordSynonymChip}><Text style={styles.wordSynonymText}>Flexibility</Text></View>
          </View>
        </View>
      </ScrollView>
      <QuizBottomNav active="modules" onNavigate={onNavigate} />
    </View>
  );
}

function AiExamplesScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      footer={<PrimaryButton label="See nuance" onPress={() => onNavigate("28_ai_nuance_explanation")} />}
    >
      <BrandHeader title="AI examples" onBack={onBack} />
      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>The rain made the streets glow softly at night.</Text>
      </View>
      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>We stayed inside because the rain became too heavy.</Text>
      </View>
      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>She loves the sound of rain when she studies.</Text>
      </View>
    </AppScreen>
  );
}

function NuanceScreen({ onNavigate, onBack }) {
  return (
    <AppScreen
      footer={<PrimaryButton label="Start quiz" onPress={() => onNavigate("29_vocabulary_quiz_entry")} />}
    >
      <BrandHeader title="Nuance" onBack={onBack} />
      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>How it feels</Text>
        <Text style={styles.exampleText}>
          "Rain" can sound factual, but in literary use it often adds mood, stillness, or melancholy.
        </Text>
      </View>
      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>Contrast</Text>
        <Text style={styles.exampleText}>
          Use it differently from "storm" or "drizzle" depending on intensity and tone.
        </Text>
      </View>
    </AppScreen>
  );
}

function QuizEntryScreen({ onNavigate }) {
  return (
    <View style={styles.quizStandaloneScreen}>
      <QuizTopBar />
      <View style={styles.quizStandaloneBody}>
        <View style={styles.quizEntryHero}>
          <Image source={{ uri: QUIZ_ENTRY_HERO_IMAGE }} style={styles.quizEntryHeroImage} />
          <View style={styles.quizEntryHeroOverlay} />
          <View style={styles.quizEntryHeroContent}>
            <Text style={styles.quizEntryPill}>Lexicon Module</Text>
            <Text style={styles.quizEntryTitle}>Advanced Verb{`\n`}Mastery</Text>
          </View>
        </View>

        <View style={styles.quizMetaGrid}>
          <QuizMetaCard title="10 Questions" subtitle="Multiple Choice" />
          <QuizMetaCard title="3 Minutes" subtitle="Timed Session" />
        </View>

        <View style={styles.quizDescriptionCard}>
          <Text style={styles.quizDescriptionTitle}>Quiz Description</Text>
          <Text style={styles.quizDescriptionCopy}>
            Test your comprehension of nuanced academic verbs. This session focuses on context clues and synonym selection from our recent editorial reading series.
          </Text>
          <View style={styles.quizBenefitStack}>
            <QuizBenefitRow title="+150 XP Mastery Reward" />
            <QuizBenefitRow title="Precision Badge Eligibility" strong />
          </View>
        </View>
      </View>

      <View style={styles.quizActionArea}>
        <QuizPrimaryAction label="Start Quiz" arrow onPress={() => onNavigate("30_vocabulary_quiz_result")} />
        <Text style={styles.quizPassNote}>Required score for passing: 70%</Text>
      </View>

      <QuizBottomNav active="practice" onNavigate={onNavigate} />
    </View>
  );
}

function QuizResultScreen({ onNavigate }) {
  return (
    <View style={styles.quizStandaloneScreen}>
      <QuizTopBar avatarAccent />
      <Image source={{ uri: QUIZ_RESULT_DECOR_IMAGE }} style={styles.quizResultDecor} />

      <View style={styles.quizStandaloneBody}>
        <View style={styles.quizResultHeader}>
          <Text style={styles.quizResultTitle}>Well done, Scholar!</Text>
          <Text style={styles.quizResultSubtitle}>Your linguistic journey flourishes.</Text>
        </View>

        <View style={styles.quizResultHeroCard}>
          <View style={styles.quizResultGlowOne} />
          <View style={styles.quizResultGlowTwo} />
          <View style={styles.quizResultRingOuter}>
            <View style={styles.quizResultRingInner}>
              <Text style={styles.quizResultPercent}>90%</Text>
              <Text style={styles.quizResultLabel}>Accuracy</Text>
            </View>
          </View>
        </View>

        <View style={styles.resultMetricRow}>
          <ResultMetricCard title="XP EARNED" value="+450" />
          <ResultMetricCard title="DAY STREAK" value="12" accent="soft" />
        </View>
      </View>

      <View style={styles.quizActionArea}> 
        <QuizPrimaryAction label="Continue Learning" onPress={() => onNavigate("21_vocabulary_topics")} />
        <QuizSecondaryAction label="Review Mistakes" onPress={() => onNavigate("69_mistake_notebook")} />
      </View>
    </View>
  );
}

export function renderVocabularyScreen(screenId, props) {
  switch (screenId) {
    case "21_vocabulary_topics":
      return <TopicsScreen {...props} />;
    case "22_topic_detail":
      return <TopicDetailScreen {...props} />;
    case "23_flashcard_front":
      return <FlashcardFrontScreen {...props} />;
    case "24_flashcard_back":
      return <FlashcardBackScreen {...props} />;
    case "25_word_saved":
      return <WordSavedScreen {...props} />;
    case "26_word_detail":
      return <WordDetailScreen {...props} />;
    case "27_ai_examples":
      return <AiExamplesScreen {...props} />;
    case "28_ai_nuance_explanation":
      return <NuanceScreen {...props} />;
    case "29_vocabulary_quiz_entry":
      return <QuizEntryScreen {...props} />;
    case "30_vocabulary_quiz_result":
      return <QuizResultScreen {...props} />;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  clusterTitle: {
    color: COLORS.text,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "800",
    letterSpacing: -1,
    marginBottom: 10,
  },
  clusterCopy: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 18,
  },
  topicHeroCard: {
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    padding: 24,
    marginBottom: 18,
    overflow: "hidden",
  },
  topicHeroGlow: {
    position: "absolute",
    right: -24,
    top: -18,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(109,254,156,0.18)",
  },
  topicHeroHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  topicHeroEyebrow: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  topicHeroTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "800",
    letterSpacing: -1,
    marginBottom: 10,
  },
  topicHeroCopy: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 14,
    lineHeight: 22,
    maxWidth: "85%",
  },
  topicStatPill: {
    alignSelf: "flex-start",
    borderRadius: 999,
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  topicStatPillInverse: {
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  topicStatPillText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  topicStatPillTextInverse: {
    color: "#FFFFFF",
  },
  topicScreenScroll: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 96,
  },
  topicScreenEyebrow: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  topicScreenTitle: {
    color: COLORS.text,
    fontSize: 30,
    lineHeight: 30,
    fontWeight: "800",
    letterSpacing: -0.75,
    marginBottom: 8,
  },
  topicScreenCopy: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 23,
    maxWidth: 240,
    marginBottom: 32,
  },
  topicExactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 32,
  },
  exactTopicTile: {
    width: 132,
    minHeight: 132,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLow,
    padding: 20,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  exactTopicTileLarge: {
    minHeight: 280,
  },
  exactTopicTileWide: {
    width: "100%",
    minHeight: 108,
    flexDirection: "row",
    alignItems: "center",
  },
  exactTopicHead: {
    gap: 8,
  },
  exactTopicIconShell: {
    width: 40,
    height: 36,
    marginBottom: 4,
  },
  exactTopicIconShellWide: {
    width: 48,
    height: 56,
    marginBottom: 0,
    marginRight: 16,
  },
  exactTopicIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  exactTopicCopy: {
    gap: 4,
  },
  exactTopicTitle: {
    color: COLORS.text,
    fontSize: 18,
    lineHeight: 22.5,
    fontWeight: "700",
  },
  exactTopicTitleWide: {
    fontSize: 18,
    lineHeight: 28,
  },
  exactTopicSubtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
  topicProgressTrack: {
    height: 4,
    borderRadius: 999,
    backgroundColor: "#DEE4E1",
    overflow: "hidden",
    marginTop: 8,
  },
  topicProgressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  exactTopicFooter: {
    marginTop: 8,
  },
  travelDots: {
    flexDirection: "row",
    gap: 8,
  },
  travelDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#D1FAE5",
    borderWidth: 2,
    borderColor: COLORS.surfaceLow,
  },
  travelDotActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#A7F3D0",
    borderWidth: 2,
    borderColor: COLORS.surfaceLow,
  },
  topicMilestoneCard: {
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    padding: 24,
    overflow: "hidden",
    minHeight: 164,
  },
  topicMilestoneDecor: {
    position: "absolute",
    right: -8,
    top: -22,
    width: 120,
    height: 158,
    opacity: 0.9,
  },
  topicMilestoneEyebrow: {
    color: "#FFFFFF",
    opacity: 0.8,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 2.4,
    marginBottom: 8,
  },
  topicMilestoneTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
    marginBottom: 16,
  },
  topicMilestoneButton: {
    alignSelf: "flex-start",
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  topicMilestoneButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "800",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  topicTile: {
    width: "48%",
    minHeight: 138,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLow,
    padding: 18,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.12)",
  },
  topicTileLarge: {
    width: "100%",
    minHeight: 142,
  },
  topicTileSurface: {
    backgroundColor: COLORS.surface,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  topicTilePrimary: {
    backgroundColor: COLORS.primary,
  },
  topicTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 24,
  },
  topicTitlePrimary: {
    color: "#FFFFFF",
  },
  topicSubtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  topicSubtitlePrimary: {
    color: "rgba(255,255,255,0.8)",
  },
  tilePressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  milestoneCard: {
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    padding: 22,
    gap: 10,
  },
  milestoneEyebrow: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  milestoneTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
    marginBottom: 8,
  },
  masteryCard: {
    borderRadius: 28,
    backgroundColor: COLORS.surfaceLow,
    padding: 22,
    marginBottom: 22,
  },
  topicDetailHero: {
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 22,
    marginBottom: 18,
    overflow: "hidden",
  },
  topicDetailHeroOrb: {
    position: "absolute",
    right: -16,
    top: -10,
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: "rgba(109,254,156,0.18)",
  },
  topicDetailHeroTitle: {
    color: COLORS.text,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "800",
    marginBottom: 8,
  },
  topicDetailHeroCopy: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 22,
    maxWidth: "80%",
  },
  masteryTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  masteryLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  masteryValue: {
    color: COLORS.text,
    fontSize: 48,
    fontWeight: "900",
    marginVertical: 10,
  },
  masteryTrack: {
    height: 12,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceHigh,
    overflow: "hidden",
  },
  masteryFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.primaryBright,
  },
  masteryMeta: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 10,
  },
  deckMiniCard: {
    minWidth: 92,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  deckMiniLabel: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  deckMiniValue: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "800",
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 4,
  },
  wordList: {
    gap: 12,
  },
  wordRow: {
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  wordBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  wordBadgeLocked: {
    backgroundColor: COLORS.surfaceHigh,
  },
  wordBadgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "900",
  },
  wordBadgeTextLocked: {
    color: COLORS.textMuted,
  },
  wordCopy: {
    flex: 1,
  },
  wordTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
  },
  wordMeaning: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginTop: 2,
  },
  flashCard: {
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    minHeight: 280,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  flashWord: {
    color: COLORS.text,
    fontSize: 42,
    fontWeight: "800",
    marginBottom: 10,
  },
  flashPronounce: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 18,
  },
  flashMeaning: {
    color: COLORS.primary,
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 12,
  },
  flashMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14,
  },
  flashHint: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
  },
  flashContextCard: {
    borderRadius: 22,
    backgroundColor: COLORS.surfaceLow,
    padding: 18,
  },
  flashFrontScreenScroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 24,
  },
  flashFrontCard: {
    height: 456,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 138,
    marginHorizontal: 24,
    shadowColor: "rgba(0,53,33,0.06)",
    shadowOpacity: 1,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
  flashFrontTopPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 999,
    backgroundColor: COLORS.tertiary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 32,
  },
  flashFrontPillLabel: {
    color: "#224638",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.55,
  },
  flashFrontPillDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(34,70,56,0.3)",
  },
  flashFrontPillPhonetic: {
    color: "#224638",
    fontSize: 11,
    fontStyle: "italic",
  },
  flashFrontWord: {
    color: COLORS.text,
    fontSize: 36,
    lineHeight: 40,
    fontWeight: "800",
    letterSpacing: -0.9,
    marginBottom: 24,
  },
  flashFrontAudioButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.surfaceLow,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 64,
  },
  flashFrontAudioIcon: {
    width: 22.5,
    height: 22,
    resizeMode: "contain",
  },
  flashFrontHintWrap: {
    position: "absolute",
    bottom: 48,
    alignItems: "center",
    gap: 8,
  },
  flashFrontHint: {
    color: "rgba(61,74,61,0.5)",
    fontSize: 14,
    fontWeight: "600",
  },
  flashFrontHintHand: {
    color: "rgba(61,74,61,0.35)",
    fontSize: 24,
  },
  flashFrontDecor: {
    position: "absolute",
    right: 16,
    top: 16,
    width: 43,
    height: 43,
    resizeMode: "contain",
  },
  metricRow: {
    flexDirection: "row",
    gap: 12,
  },
  resultOrbSuccess: {
    width: 112,
    height: 112,
    borderRadius: 56,
    alignSelf: "center",
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  resultOrbSuccessText: {
    color: COLORS.primary,
    fontSize: 42,
    fontWeight: "900",
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
  detailWord: {
    color: COLORS.text,
    fontSize: 38,
    fontWeight: "800",
    marginBottom: 6,
  },
  detailMeaning: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 14,
  },
  wordDetailHero: {
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 22,
    marginBottom: 16,
  },
  wordDetailTagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14,
  },
  wordDetailTag: {
    borderRadius: 999,
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  wordDetailTagText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  exampleCard: {
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    padding: 18,
    marginBottom: 14,
  },
  exampleTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 8,
  },
  exampleText: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  quizHero: {
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    padding: 24,
    marginBottom: 20,
  },
  quizHeroEyebrow: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  quizHeroTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
  },
  scoreOrb: {
    width: 168,
    height: 168,
    borderRadius: 84,
    alignSelf: "center",
    backgroundColor: COLORS.surfaceLow,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  scoreOrbText: {
    color: COLORS.primary,
    fontSize: 44,
    fontWeight: "900",
  },
  quizStandaloneScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  quizTopBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 16,
    backgroundColor: "rgba(245,250,247,0.92)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(188,203,185,0.12)",
  },
  quizBrandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuIcon: {
    gap: 3,
  },
  menuLine: {
    width: 16,
    height: 2,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  menuLineShort: {
    width: 10,
    height: 2,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  quizBrandText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -1,
  },
  quizAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primarySoft,
  },
  quizAvatarActive: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.primaryBright,
  },
  quizAvatarText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  quizStandaloneBody: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 24,
  },
  quizEntryHero: {
    height: 256,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: COLORS.text,
    justifyContent: "flex-end",
  },
  quizEntryHeroImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  quizEntryHeroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2,44,34,0.58)",
  },
  quizEntryHeroContent: {
    padding: 22,
    gap: 8,
  },
  quizEntryPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#6DFE9C",
    color: "#007439",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  quizEntryTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    letterSpacing: -1,
  },
  quizMetaGrid: {
    flexDirection: "row",
    gap: 16,
  },
  quizMetaCard: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceLow,
    padding: 20,
    gap: 8,
  },
  quizMetaIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primarySoft,
    marginBottom: 4,
  },
  quizMetaTitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "600",
  },
  quizMetaSubtitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "500",
  },
  quizDescriptionCard: {
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 24,
    gap: 16,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  quizDescriptionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
  },
  quizDescriptionCopy: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 23,
  },
  quizBenefitStack: {
    gap: 16,
    paddingTop: 4,
  },
  quizBenefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  quizBenefitIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primarySoft,
  },
  quizBenefitIconStrong: {
    backgroundColor: "#6DFE9C",
  },
  quizBenefitText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "500",
  },
  quizActionArea: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 12,
  },
  quizPrimaryAction: {
    minHeight: 64,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "rgba(0,110,47,0.22)",
    shadowOpacity: 1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  quizPrimaryActionText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  quizPrimaryArrow: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  quizSecondaryAction: {
    minHeight: 56,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  quizSecondaryActionText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "800",
  },
  quizPassNote: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
  },
  quizBottomNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(6,78,59,0.05)",
    backgroundColor: COLORS.background,
  },
  quizBottomItem: {
    flex: 1,
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
  },
  quizBottomIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(6,78,59,0.18)",
  },
  quizBottomIconActive: {
    backgroundColor: COLORS.primarySoft,
  },
  quizBottomLabel: {
    color: "rgba(6,78,59,0.45)",
    fontSize: 11,
    fontWeight: "500",
  },
  quizBottomLabelActive: {
    color: COLORS.primary,
  },
  quizResultDecor: {
    position: "absolute",
    right: -36,
    bottom: 44,
    width: 192,
    height: 192,
    opacity: 0.12,
  },
  quizResultHeader: {
    alignItems: "center",
    gap: 8,
  },
  quizResultTitle: {
    color: COLORS.text,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.7,
  },
  quizResultSubtitle: {
    color: COLORS.textMuted,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  quizResultHeroCard: {
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    minHeight: 224,
  },
  quizResultGlowOne: {
    position: "absolute",
    left: -32,
    bottom: -24,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(109,254,156,0.16)",
  },
  quizResultGlowTwo: {
    position: "absolute",
    right: -18,
    top: -16,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "rgba(34,197,94,0.1)",
  },
  quizResultRingOuter: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 12,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  quizResultRingInner: {
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  quizResultPercent: {
    color: COLORS.text,
    fontSize: 36,
    fontWeight: "900",
  },
  quizResultLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  resultMetricRow: {
    flexDirection: "row",
    gap: 16,
  },
  resultMetricCard: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLow,
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  resultMetricIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.primaryBright,
  },
  resultMetricIconSoft: {
    backgroundColor: COLORS.tertiary,
  },
  resultMetricValue: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "800",
  },
  resultMetricTitle: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  vocabStandaloneScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  vocabStandaloneScroll: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 136,
  },
  vocabTopBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "rgba(245,250,247,0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(188,203,185,0.12)",
  },
  vocabTopLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  vocabBackButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  vocabBackText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "700",
  },
  vocabTopTitle: {
    color: "#064E3B",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  vocabAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceHigh,
    alignItems: "center",
    justifyContent: "center",
  },
  vocabAvatarAccent: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.primaryBright,
    backgroundColor: COLORS.primary,
  },
  vocabAvatarText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  flashProgressWrap: {
    alignItems: "center",
    marginBottom: 24,
  },
  flashProgressOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  flashProgressInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  flashProgressText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "800",
  },
  flashBackCard: {
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 32,
    marginBottom: 24,
    overflow: "hidden",
    shadowColor: "rgba(0,53,33,0.06)",
    shadowOpacity: 1,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
  flashBackTagRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  flashBackTagPrimary: {
    borderRadius: 999,
    backgroundColor: COLORS.tertiary,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  flashBackTagPrimaryText: {
    color: "#224638",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  flashBackTag: {
    borderRadius: 999,
    backgroundColor: COLORS.surfaceLow,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  flashBackTagText: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  flashBackWord: {
    color: COLORS.primary,
    fontSize: 36,
    lineHeight: 40,
    fontWeight: "800",
    letterSpacing: -0.9,
    marginBottom: 10,
  },
  flashBackPronounceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  flashBackSoundDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.textMuted,
  },
  flashBackPronounce: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontStyle: "italic",
  },
  flashBackLabel: {
    color: "rgba(61,74,61,0.6)",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  flashBackDefinition: {
    color: COLORS.text,
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "500",
  },
  flashBackDecorIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 87,
    height: 81,
    opacity: 0.26,
  },
  flashUsageCard: {
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLow,
    padding: 24,
    marginBottom: 24,
  },
  flashUsageHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  flashUsageIcon: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: "#6DFE9C",
  },
  flashUsageTitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  flashUsageQuoteBar: {
    position: "absolute",
    left: 24,
    top: 80,
    bottom: 24,
    width: 4,
    backgroundColor: COLORS.primary,
  },
  flashUsageQuote: {
    color: COLORS.text,
    fontSize: 18,
    lineHeight: 25,
    fontStyle: "italic",
    paddingLeft: 20,
  },
  flashUsageHighlight: {
    color: COLORS.primary,
    fontWeight: "800",
    fontStyle: "italic",
  },
  flashChipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  flashChip: {
    borderRadius: 999,
    backgroundColor: COLORS.surfaceHigh,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  flashChipText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "600",
  },
  flashActionRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  flashSecondaryAction: {
    flex: 1,
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: "#DEE4E1",
    alignItems: "center",
    justifyContent: "center",
  },
  flashSecondaryActionText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "800",
  },
  flashPrimaryAction: {
    flex: 1,
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0,110,47,0.2)",
    shadowOpacity: 1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  flashPrimaryActionText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  wordDetailScroll: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 96,
    gap: 24,
  },
  wordOfDayHero: {
    marginBottom: 24,
  },
  wordOfDayGlow: {
    position: "absolute",
    right: -16,
    top: -16,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "rgba(109,254,156,0.2)",
  },
  wordOfDayEyebrow: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  wordOfDayTitle: {
    color: COLORS.text,
    fontSize: 48,
    lineHeight: 48,
    fontWeight: "800",
    letterSpacing: -2.4,
    marginBottom: 16,
  },
  wordOfDayMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  wordOfDayPhoneticPill: {
    borderRadius: 999,
    backgroundColor: COLORS.tertiary,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  wordOfDayPhonetic: {
    color: "#224638",
    fontSize: 14,
    fontStyle: "italic",
  },
  wordAudioButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0,110,47,0.2)",
    shadowOpacity: 1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  wordAudioIcon: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 2,
  },
  wordDefinitionCard: {
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 24,
    marginBottom: 16,
    shadowColor: "rgba(0,53,33,0.04)",
    shadowOpacity: 1,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 3,
  },
  wordSectionLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  wordDefinitionText: {
    color: COLORS.text,
    fontSize: 18,
    lineHeight: 29,
    fontWeight: "500",
    marginBottom: 16,
  },
  wordDefinitionTags: {
    flexDirection: "row",
    gap: 8,
  },
  wordDefinitionTag: {
    borderRadius: 8,
    backgroundColor: COLORS.surfaceLow,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  wordDefinitionTagText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "600",
  },
  wordDetailBentoRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  wordOriginCard: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLow,
    padding: 20,
  },
  wordMiniLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  wordOriginText: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 18,
  },
  wordOriginEmphasis: {
    fontStyle: "italic",
    fontWeight: "700",
  },
  wordOriginItalic: {
    fontStyle: "italic",
  },
  wordComplexityCard: {
    width: 163,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLow,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  wordComplexityRingOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  wordComplexityRingInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLow,
    alignItems: "center",
    justifyContent: "center",
  },
  wordComplexityValue: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "800",
  },
  wordComplexityLabel: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  wordQuoteCard: {
    height: 192,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 16,
    justifyContent: "flex-end",
    padding: 24,
  },
  wordQuoteImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  wordQuoteOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2,44,34,0.55)",
  },
  wordQuoteText: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
  },
  wordQuoteAuthor: {
    color: "#A7F3D0",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginTop: 8,
  },
  wordContextCard: {
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 24,
    marginBottom: 16,
    shadowColor: "rgba(0,53,33,0.04)",
    shadowOpacity: 1,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 3,
  },
  wordContextItem: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  wordContextBarPrimary: {
    width: 2.3,
    borderRadius: 999,
    backgroundColor: COLORS.primaryBright,
  },
  wordContextBarSecondary: {
    width: 2.1,
    borderRadius: 999,
    backgroundColor: "rgba(188,203,185,0.3)",
  },
  wordContextText: {
    flex: 1,
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 23,
  },
  wordSynonymCard: {
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLow,
    padding: 24,
    marginBottom: 8,
  },
  wordSynonymGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  wordSynonymChip: {
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  wordSynonymText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "500",
  },
});
