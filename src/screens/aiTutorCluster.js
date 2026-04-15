import React, { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { COLORS } from "../design/tokens";
import { AppScreen, PrimaryButton } from "../components/appPrimitives";

export const AI_TUTOR_SCREEN_IDS = [
  "51_ai_tutor_home",
  "52_suggested_prompts",
  "53_chat_conversation",
  "54_grammar_explanation",
  "55_translation_context",
  "56_roleplay_setup",
  "57_roleplay_chat",
  "58_suggestions",
  "59_save_response",
  "60_chat_history",
];

const TUTOR_PROMPTS = [
  {
    id: "daily-routine",
    title: "Practice topic 1",
    eyebrow: "Conversation",
    opening: "Help me improve this short sentence.",
    assistant: "Share one sentence and I will help you make it clearer and smoother.",
    focus: "Session",
  },
  {
    id: "grammar-check",
    title: "Practice topic 2",
    eyebrow: "Accuracy",
    opening: "Can you check this sentence and explain the pattern?",
    assistant: "Send the sentence you want to review and I will explain the key pattern.",
    focus: "Review",
  },
  {
    id: "travel-help",
    title: "Practice topic 3",
    eyebrow: "Scenario",
    opening: "I want help sounding more natural in a short exchange.",
    assistant: "Great choice. We can practice a short exchange and make it feel more natural.",
    focus: "Coach",
  },
];

const ROLEPLAY_SCENARIOS = [
  {
    id: "cafe",
    title: "Scenario A",
    subtitle: "Short service interaction",
    scene: "Cafe counter",
    npc: "Partner",
    opening: "Hello. What would you like to order today?",
  },
  {
    id: "interview",
    title: "Scenario B",
    subtitle: "Short formal exchange",
    scene: "Interview room",
    npc: "Partner",
    opening: "Welcome. Could you introduce yourself briefly?",
  },
  {
    id: "airport",
    title: "Scenario C",
    subtitle: "Short check-in exchange",
    scene: "Front desk",
    npc: "Partner",
    opening: "Good afternoon. May I have your booking details, please?",
  },
];

const TRANSLATION_ENTRIES = {
  komorebi: {
    word: "Context",
    phonetic: "kon-tekst",
    meaning: "The situation that helps a word or phrase make sense.",
    context:
      "This view helps learners choose wording based on where and how a phrase is used.",
  },
  nuance: {
    word: "Nuance",
    phonetic: "noo-ahns",
    meaning: "A small difference in meaning or tone.",
    context:
      "This view helps learners compare close meanings and choose the better fit.",
  },
};

function createTutorStore() {
  return {
    activePromptId: "daily-routine",
    currentMessages: [
      {
        id: "msg-1",
        author: "AI Tutor",
        tone: "light",
        message: "Share the sentence you want to improve, and I will refine it with you.",
      },
      {
        id: "msg-2",
        author: "You",
        tone: "user",
        message: "Can you help me improve this sentence?",
      },
      {
        id: "msg-3",
        author: "AI Tutor",
        tone: "thinking",
        message: "Reviewing tone and structure...",
      },
    ],
    currentDraft: "Can you help me improve this sentence?",
    selectedTranslationKey: "komorebi",
    selectedScenarioId: "cafe",
    roleplayMessages: [
      {
        id: "role-1",
        author: "Partner",
        tone: "light",
        message: "Hello. What would you like to order today?",
      },
      {
        id: "role-2",
        author: "You",
        tone: "user",
        message: "I would like one drink, please.",
      },
      {
        id: "role-3",
        author: "Tutor",
        tone: "light",
        message: "Nice start. Try adding one short politeness marker at the end.",
      },
    ],
    roleplayDraft: "I would like one drink, please.",
    savedSessions: [
      {
        id: "history-1",
        title: "Session 01",
        meta: "Today 10:24 AM",
        target: "53_chat_conversation",
        tone: "featured",
      },
      {
        id: "history-2",
        title: "Session 02",
        meta: "Yesterday",
        target: "54_grammar_explanation",
        tone: "surface",
      },
      {
        id: "history-3",
        title: "Session 03",
        meta: "Roleplay session",
        target: "57_roleplay_chat",
        tone: "surface",
      },
      {
        id: "history-4",
        title: "Session 04",
        meta: "Saved translation notes",
        target: "55_translation_context",
        tone: "surface",
      },
    ],
    lastSavedTitle: "Saved Session",
  };
}

let tutorStore = createTutorStore();

function nextId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function getActivePrompt() {
  return (
    TUTOR_PROMPTS.find((prompt) => prompt.id === tutorStore.activePromptId) ??
    TUTOR_PROMPTS[0]
  );
}

function startPromptSession(promptId) {
  const prompt =
    TUTOR_PROMPTS.find((item) => item.id === promptId) ?? TUTOR_PROMPTS[0];

  tutorStore = {
    ...tutorStore,
    activePromptId: prompt.id,
    currentDraft: prompt.opening,
    currentMessages: [
      {
        id: nextId("msg"),
        author: "AI Tutor",
        tone: "light",
        message: prompt.assistant,
      },
    ],
  };
}

function tutorReplyFor(text) {
  const lower = text.toLowerCase();

  if (lower.includes("looking forward")) {
    return "A more natural version is: I am looking forward to meeting you tomorrow. After 'looking forward to', we use the -ing form.";
  }

  if (lower.includes("help")) {
    return "That works well. We can make it smoother by shortening the sentence and keeping one clear idea.";
  }

  if (lower.includes("sentence")) {
    return "Nice start. Try one cleaner version first, then add detail only if you need it.";
  }

  return "That already makes sense. I would smooth the rhythm a little and keep the wording direct.";
}

function sendTutorMessage(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return;
  }

  tutorStore = {
    ...tutorStore,
    currentDraft: "",
    currentMessages: [
      ...tutorStore.currentMessages,
      {
        id: nextId("msg"),
        author: "You",
        tone: "user",
        message: trimmed,
      },
      {
        id: nextId("msg"),
        author: "AI Tutor",
        tone: "light",
        message: tutorReplyFor(trimmed),
      },
    ],
  };
}

function getGrammarInsight() {
  const lastUserMessage = [...tutorStore.currentMessages]
    .reverse()
    .find((message) => message.tone === "user")?.message;

  if (lastUserMessage?.toLowerCase().includes("looking forward")) {
    return {
      context: '"...looking forward to meet you tomorrow."',
      title: "Looking forward to + verb-ing",
      body:
        'After "looking forward to", English uses the -ing form. That is why "meeting" sounds correct here.',
      corrected: "I am looking forward to meeting you tomorrow.",
    };
  }

  return {
    context: `"${lastUserMessage ?? "Can you help me improve this sentence?"}"`,
    title: "Choose a shorter and clearer pattern",
    body:
      "When a sentence already communicates the idea, the next step is often to shorten it and make the rhythm smoother.",
    corrected: "Could you help me say this more clearly?",
  };
}

function selectTranslationEntry(key) {
  if (!TRANSLATION_ENTRIES[key]) {
    return;
  }

  tutorStore = {
    ...tutorStore,
    selectedTranslationKey: key,
  };
}

function getActiveTranslationEntry() {
  return (
    TRANSLATION_ENTRIES[tutorStore.selectedTranslationKey] ??
    TRANSLATION_ENTRIES.komorebi
  );
}

function selectScenario(scenarioId) {
  const scenario =
    ROLEPLAY_SCENARIOS.find((item) => item.id === scenarioId) ??
    ROLEPLAY_SCENARIOS[0];

  tutorStore = {
    ...tutorStore,
    selectedScenarioId: scenario.id,
    roleplayDraft:
      scenario.id === "interview"
        ? "I have three years of experience in this field."
        : scenario.id === "airport"
          ? "Here you are. I also have one bag to check."
          : "I would like one drink, please.",
    roleplayMessages: [
      {
        id: nextId("role"),
        author: scenario.npc,
        tone: "light",
        message: scenario.opening,
      },
    ],
  };
}

function getSelectedScenario() {
  return (
    ROLEPLAY_SCENARIOS.find((item) => item.id === tutorStore.selectedScenarioId) ??
    ROLEPLAY_SCENARIOS[0]
  );
}

function roleplayReplyFor(text) {
  const scenario = getSelectedScenario();

  return {
    npc: `${scenario.npc}: ${scenario.id === "interview" ? "Thank you. Could you share one recent example?" : scenario.id === "airport" ? "Thank you. Do you prefer an aisle or a window seat?" : "Of course. Would you like anything else with that?"}`,
    coach: "Tutor: Good job. Your phrasing is clear. Add one small detail to make it sound smoother.",
  };
}

function sendRoleplayMessage(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return;
  }

  const reply = roleplayReplyFor(trimmed);

  tutorStore = {
    ...tutorStore,
    roleplayDraft: "",
    roleplayMessages: [
      ...tutorStore.roleplayMessages,
      {
        id: nextId("role"),
        author: "You",
        tone: "user",
        message: trimmed,
      },
      {
        id: nextId("role"),
        author: getSelectedScenario().npc,
        tone: "light",
        message: reply.npc.replace(/^[^:]+:\s*/, ""),
      },
      {
        id: nextId("role"),
        author: "Tutor",
        tone: "light",
        message: reply.coach.replace(/^Tutor:\s*/, ""),
      },
    ],
  };
}

function saveCurrentSession() {
  const prompt = getActivePrompt();
  const scenario = getSelectedScenario();
  const lastUserMessage = [...tutorStore.currentMessages]
    .reverse()
    .find((message) => message.tone === "user")?.message;

  const title =
    tutorStore.roleplayMessages.length > 1
      ? scenario.title
      : prompt.title;

  const meta =
    tutorStore.roleplayMessages.length > 1
      ? "Roleplay session"
      : lastUserMessage
        ? "Saved from current chat"
        : "Tutor session";

  tutorStore = {
    ...tutorStore,
    lastSavedTitle: title,
    savedSessions: [
      {
        id: nextId("history"),
        title,
        meta,
        target:
          tutorStore.roleplayMessages.length > 1
            ? "57_roleplay_chat"
            : "53_chat_conversation",
        tone: "featured",
      },
      ...tutorStore.savedSessions.slice(0, 5).map((item, index) => ({
        ...item,
        tone: index === 0 ? "surface" : item.tone,
      })),
    ],
  };
}

function TutorTopBar({ title, onBack, compact }) {
  return (
    <View style={[styles.topBar, compact && styles.topBarCompact]}>
      <View style={styles.topBarLeft}>
        {onBack ? (
          <Pressable onPress={onBack} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
            <Text style={styles.backButtonText}>{"<"}</Text>
          </Pressable>
        ) : (
          <View style={styles.brandBadge}>
            <Text style={styles.brandBadgeText}>AI</Text>
          </View>
        )}
        <Text style={styles.brandTitle}>{title}</Text>
      </View>
      <View style={styles.avatarShell}>
        <Text style={styles.avatarShellText}>P</Text>
      </View>
    </View>
  );
}

function TutorBottomNav({ active, onNavigate }) {
  const items = [
    { key: "Tutor", target: "51_ai_tutor_home" },
    { key: "Roleplay", target: "56_roleplay_setup" },
    { key: "History", target: "60_chat_history" },
    { key: "Library", target: "21_vocabulary_topics" },
  ];

  return (
    <View style={styles.bottomNav}>
      {items.map((item) => {
        const selected = item.key === active;

        return (
          <Pressable
            key={item.key}
            onPress={() => onNavigate(item.target)}
            style={({ pressed }) => [
              styles.bottomNavItem,
              selected && styles.bottomNavItemActive,
              pressed && styles.pressed,
            ]}
          >
            <View
              style={[
                styles.bottomNavIcon,
                selected && styles.bottomNavIconActive,
              ]}
            />
            <Text
              style={[
                styles.bottomNavLabel,
                selected && styles.bottomNavLabelActive,
              ]}
            >
              {item.key}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function TutorPill({ label, tone = "light", onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        tone === "dark" && styles.pillDark,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.pillText, tone === "dark" && styles.pillTextDark]}>
        {label}
      </Text>
    </Pressable>
  );
}

function StatRing({ value, label }) {
  return (
    <View style={styles.statRingWrap}>
      <View style={styles.statRingOuter}>
        <View style={styles.statRingInner}>
          <Text style={styles.statRingValue}>{value}</Text>
        </View>
      </View>
      <Text style={styles.statRingLabel}>{label}</Text>
    </View>
  );
}

function TutorActionCard({
  title,
  subtitle,
  eyebrow,
  tone = "surface",
  large,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionCard,
        large && styles.actionCardLarge,
        tone === "primary" && styles.actionCardPrimary,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.actionIcon, tone === "primary" && styles.actionIconPrimary]} />
      {eyebrow ? <Text style={styles.actionEyebrow}>{eyebrow}</Text> : null}
      <Text style={[styles.actionTitle, tone === "primary" && styles.actionTitlePrimary]}>
        {title}
      </Text>
      <Text
        style={[
          styles.actionSubtitle,
          tone === "primary" && styles.actionSubtitlePrimary,
        ]}
      >
        {subtitle}
      </Text>
    </Pressable>
  );
}

function ChatBubble({ author, message, tone = "light" }) {
  const user = tone === "user";
  const thinking = tone === "thinking";

  return (
    <View style={[styles.chatRow, user && styles.chatRowUser]}>
      <View
        style={[
          styles.chatBubble,
          user && styles.chatBubbleUser,
          thinking && styles.chatBubbleThinking,
        ]}
      >
        {author ? <Text style={styles.chatAuthor}>{author}</Text> : null}
        <Text
          style={[
            styles.chatMessage,
            user && styles.chatMessageUser,
            thinking && styles.chatMessageThinking,
          ]}
        >
          {message}
        </Text>
      </View>
    </View>
  );
}

function HistoryRow({ title, meta, target, onNavigate, tone = "surface" }) {
  return (
    <Pressable
      onPress={() => onNavigate(target)}
      style={({ pressed }) => [
        styles.historyRow,
        tone === "featured" && styles.historyRowFeatured,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.historyOrb} />
      <View style={styles.historyCopy}>
        <Text style={styles.historyTitle}>{title}</Text>
        <Text style={styles.historyMeta}>{meta}</Text>
      </View>
    </Pressable>
  );
}

function TutorHomeScreen({ onNavigate }) {
  const activePrompt = getActivePrompt();
  const historyCount = tutorStore.savedSessions.length;

  return (
    <AppScreen decorative={false} footer={<TutorBottomNav active="Tutor" onNavigate={onNavigate} />}>
      <TutorTopBar title="AI Tutor" />
      <View style={styles.heroCard}>
        <View style={styles.heroOrb}>
          <View style={styles.heroCore} />
        </View>
        <Text style={styles.heroTitle}>AI Tutor</Text>
        <Text style={styles.heroCopy}>
          Practice, translate, and review with guided help tailored to your
          study flow.
        </Text>
        <View style={styles.topicsRow}>
          <TutorPill label={`${activePrompt.focus} focus`} />
          <TutorPill label={`${historyCount} saved sessions`} />
        </View>
      </View>

      <View style={styles.cardGrid}>
        <TutorActionCard
          title="Start Session"
          subtitle={activePrompt.title}
          eyebrow="Recommended"
          tone="primary"
          large
          onPress={() => onNavigate("52_suggested_prompts")}
        />
        <TutorActionCard
          title="Translate"
          subtitle="Context-first language help"
          onPress={() => onNavigate("55_translation_context")}
        />
        <TutorActionCard
          title="Review"
          subtitle="Past sessions and notes"
          onPress={() => onNavigate("60_chat_history")}
        />
      </View>
    </AppScreen>
  );
}

function SuggestedPromptsScreen({ onNavigate, onBack }) {
  const activePrompt = getActivePrompt();

  return (
    <AppScreen decorative={false} footer={<TutorBottomNav active="Tutor" onNavigate={onNavigate} />}>
      <TutorTopBar title="AI Tutor" onBack={onBack} />
      <Text style={styles.sectionTitle}>Topics</Text>

      <Pressable
        onPress={() => {
          startPromptSession(activePrompt.id);
          onNavigate("53_chat_conversation");
        }}
        style={({ pressed }) => [styles.primaryTopicCard, pressed && styles.pressed]}
      >
        <Text style={styles.primaryTopicEyebrow}>{activePrompt.eyebrow}</Text>
        <Text style={styles.primaryTopicTitle}>Open a fresh session with the tutor</Text>
        <Text style={styles.primaryTopicCopy}>Start with one short exchange and continue from there.</Text>
      </Pressable>

      <View style={styles.cardGrid}>
        <TutorActionCard
          title="Explain a rule"
          subtitle="Get a compact grammar breakdown"
          onPress={() => onNavigate("54_grammar_explanation")}
        />
        <TutorActionCard
          title="Roleplay"
          subtitle="Try a realistic scenario"
          onPress={() => onNavigate("56_roleplay_setup")}
        />
      </View>

      <View style={styles.topicsRow}>
        <TutorPill
          label="Daily routine"
          onPress={() => {
            startPromptSession("daily-routine");
            onNavigate("53_chat_conversation");
          }}
        />
        <TutorPill
          label="Grammar check"
          onPress={() => {
            startPromptSession("grammar-check");
            onNavigate("53_chat_conversation");
          }}
        />
        <TutorPill
          label="Travel help"
          onPress={() => {
            startPromptSession("travel-help");
            selectTranslationEntry("nuance");
            onNavigate("55_translation_context");
          }}
        />
        <TutorPill label="Roleplay" onPress={() => onNavigate("56_roleplay_setup")} />
      </View>

      <StatRing value="65%" label="Focus" />
    </AppScreen>
  );
}

function ChatConversationScreen({ onNavigate, onBack }) {
  const [draft, setDraft] = useState(tutorStore.currentDraft);
  const [messages, setMessages] = useState(tutorStore.currentMessages);

  const submitDraft = () => {
    sendTutorMessage(draft);
    setDraft(tutorStore.currentDraft);
    setMessages(tutorStore.currentMessages);
  };

  return (
    <AppScreen
      decorative={false}
      footer={
        <>
          <View style={styles.chatComposer}>
            <TextInput
              style={styles.chatInput}
              value={draft}
              onChangeText={setDraft}
              placeholder="Ask AI Tutor"
              placeholderTextColor="rgba(61,74,61,0.45)"
            />
            <Pressable
              onPress={submitDraft}
              style={({ pressed }) => [styles.sendButton, pressed && styles.pressed]}
            >
              <Text style={styles.sendButtonText}>{">"}</Text>
            </Pressable>
          </View>
          <TutorBottomNav active="Tutor" onNavigate={onNavigate} />
        </>
      }
    >
      <TutorTopBar title="Conversation" onBack={onBack} />
      <View style={styles.todayPill}>
        <Text style={styles.todayPillText}>{getActivePrompt().title}</Text>
      </View>

      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          author={message.author}
          tone={message.tone}
          message={message.message}
        />
      ))}

      <View style={styles.topicsRow}>
        <TutorPill
          label="Help me translate"
          onPress={() => {
            selectTranslationEntry("komorebi");
            onNavigate("55_translation_context");
          }}
        />
        <TutorPill label="Grammar check" onPress={() => onNavigate("54_grammar_explanation")} />
        <TutorPill label="Word examples" onPress={() => setDraft("Can you give me three short examples with this word?")} />
      </View>
    </AppScreen>
  );
}

function GrammarExplanationScreen({ onNavigate, onBack }) {
  const insight = getGrammarInsight();

  return (
    <AppScreen
      decorative={false}
      footer={
        <>
          <PrimaryButton label="Got it, thanks!" onPress={() => onNavigate("55_translation_context")} />
          <TutorBottomNav active="Tutor" onNavigate={onNavigate} />
        </>
      }
    >
      <TutorTopBar title="Conversation" onBack={onBack} />
      <View style={styles.fadedContext}>
        <Text style={styles.fadedContextText}>
          {insight.context}
        </Text>
      </View>

      <View style={styles.ruleCard}>
        <Text style={styles.ruleLabel}>The rule</Text>
        <Text style={styles.ruleCardTitle}>{insight.title}</Text>
        <Text style={styles.ruleCardCopy}>
          {insight.body}
        </Text>
        <View style={styles.exampleSnippet}>
          <Text style={styles.exampleSnippetText}>
            {insight.corrected}
          </Text>
        </View>
        <View style={styles.topicsRow}>
          <TutorPill label="State" />
          <TutorPill label="Emotion" />
          <TutorPill label="Location" />
        </View>
      </View>

      <StatRing value="75%" label="Grammar Review" />
    </AppScreen>
  );
}

function TranslationContextScreen({ onNavigate, onBack }) {
  const [selectedKey, setSelectedKey] = useState(tutorStore.selectedTranslationKey);
  const entry = TRANSLATION_ENTRIES[selectedKey] ?? TRANSLATION_ENTRIES.komorebi;

  return (
    <AppScreen decorative={false} footer={<TutorBottomNav active="Tutor" onNavigate={onNavigate} />}>
      <TutorTopBar title="Translation" onBack={onBack} />
      <View style={styles.translationHero}>
        <Text style={styles.translationWord}>{entry.word}</Text>
        <Text style={styles.translationPhonetic}>{entry.phonetic}</Text>
      </View>

      <View style={styles.translationCard}>
        <Text style={styles.translationLabel}>Meaning</Text>
        <Text style={styles.translationText}>{entry.meaning}</Text>
      </View>

      <View style={styles.translationCard}>
        <Text style={styles.translationLabel}>Cultural context</Text>
        <Text style={styles.translationBody}>{entry.context}</Text>
      </View>

      <View style={styles.topicsRow}>
        <TutorPill
          label={entry.word.toUpperCase()}
          tone="dark"
          onPress={() => {
            selectTranslationEntry("komorebi");
            setSelectedKey("komorebi");
          }}
        />
        <TutorPill
          label="Nuance"
          onPress={() => {
            selectTranslationEntry("nuance");
            setSelectedKey("nuance");
          }}
        />
        <TutorPill label="Nature" onPress={() => onNavigate("56_roleplay_setup")} />
      </View>
    </AppScreen>
  );
}

function RoleplaySetupScreen({ onNavigate, onBack }) {
  return (
    <AppScreen decorative={false} footer={<TutorBottomNav active="Roleplay" onNavigate={onNavigate} />}>
      <TutorTopBar title="Roleplay" onBack={onBack} />
      <View style={styles.cardGrid}>
        <TutorActionCard
          title="Ordering coffee"
          subtitle="Friendly cafe interaction"
          tone="primary"
          large
          onPress={() => {
            selectScenario("cafe");
            onNavigate("57_roleplay_chat");
          }}
        />
        <TutorActionCard
          title="Job interview"
          subtitle="Answer with confidence"
          onPress={() => {
            selectScenario("interview");
            onNavigate("57_roleplay_chat");
          }}
        />
        <TutorActionCard
          title="Airport check-in"
          subtitle="Travel language practice"
          onPress={() => {
            selectScenario("airport");
            onNavigate("57_roleplay_chat");
          }}
        />
      </View>

      <View style={styles.quoteBanner}>
        <Text style={styles.quoteBannerText}>
          "Practice aloud and refine each reply one turn at a time."
        </Text>
      </View>
    </AppScreen>
  );
}

function RoleplayChatScreen({ onNavigate, onBack }) {
  const [draft, setDraft] = useState(tutorStore.roleplayDraft);
  const [messages, setMessages] = useState(tutorStore.roleplayMessages);
  const scenario = getSelectedScenario();

  const submitDraft = () => {
    sendRoleplayMessage(draft);
    setDraft(tutorStore.roleplayDraft);
    setMessages(tutorStore.roleplayMessages);
  };

  return (
    <AppScreen
      decorative={false}
      footer={
        <>
          <View style={styles.roleplaySuggestions}>
            <TutorPill label="Ask a follow-up" onPress={() => setDraft("Could you tell me a little more, please?")} />
            <TutorPill label="Confirm details" onPress={() => setDraft("Let me confirm the details, please.")} />
            <TutorPill label="Repeat slowly" onPress={() => setDraft("Could you repeat that more slowly, please?")} />
          </View>
          <View style={styles.chatComposer}>
            <TextInput
              style={styles.chatInput}
              value={draft}
              onChangeText={setDraft}
              placeholder="Respond in character"
              placeholderTextColor="rgba(61,74,61,0.45)"
            />
            <Pressable
              onPress={submitDraft}
              style={({ pressed }) => [styles.sendButton, pressed && styles.pressed]}
            >
              <Text style={styles.sendButtonText}>{">"}</Text>
            </Pressable>
          </View>
        </>
      }
    >
      <TutorTopBar title="Roleplay Session" onBack={onBack} compact />
      <View style={styles.roleplayMetaRow}>
        <View style={styles.timerPill}>
          <Text style={styles.timerPillText}>08:42</Text>
        </View>
        <View style={styles.floatingChip}>
          <Text style={styles.floatingChipText}>{scenario.scene}</Text>
        </View>
      </View>

      <View style={styles.scenarioHeader}>
        <Text style={styles.scenarioEyebrow}>Scenario</Text>
        <Text style={styles.scenarioTitle}>{scenario.title}</Text>
      </View>

      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          author={message.author}
          tone={message.tone}
          message={message.message}
        />
      ))}
    </AppScreen>
  );
}

function SuggestionsScreen({ onNavigate, onBack }) {
  const scenario = getSelectedScenario();

  return (
    <AppScreen
      decorative={false}
      footer={
        <>
          <PrimaryButton label="Continue Learning" onPress={() => onNavigate("59_save_response")} />
          <TutorBottomNav active="Tutor" onNavigate={onNavigate} />
        </>
      }
    >
      <TutorTopBar title="Next Steps" onBack={onBack} />
      <View style={styles.cardGrid}>
        <TutorActionCard
          title="Review this pattern"
          subtitle="Revisit the main accuracy note from this session"
          large
          onPress={() => onNavigate("54_grammar_explanation")}
        />
        <TutorActionCard
          title="Practice vocabulary"
          subtitle="Reinforce the key words from this session"
          onPress={() => onNavigate("21_vocabulary_topics")}
        />
        <TutorActionCard
          title="Session insight"
          subtitle={`Your clearest replies appeared during ${scenario.title.toLowerCase()} practice.`}
          onPress={() => onNavigate("59_save_response")}
        />
      </View>
    </AppScreen>
  );
}

function SaveResponseScreen({ onNavigate, onBack }) {
  useEffect(() => {
    saveCurrentSession();
  }, []);

  return (
    <AppScreen
      decorative={false}
      footer={
        <>
          <PrimaryButton label="View Notebook" onPress={() => onNavigate("60_chat_history")} />
          <Pressable
            onPress={() => onNavigate("53_chat_conversation")}
            style={({ pressed }) => [styles.textButton, pressed && styles.pressed]}
          >
            <Text style={styles.textButtonLabel}>Back to Session</Text>
          </Pressable>
          <TutorBottomNav active="History" onNavigate={onNavigate} />
        </>
      }
    >
      <View style={styles.successOrbWrap}>
        <View style={styles.successOrbOuter}>
          <View style={styles.successOrbInner}>
            <Text style={styles.successMark}>+</Text>
          </View>
        </View>
      </View>
      <Text style={styles.saveTitle}>Saved</Text>
      <Text style={styles.saveCopy}>This response is now stored in your notebook.</Text>

      <View style={styles.translationCard}>
        <Text style={styles.translationLabel}>Notebook</Text>
        <Text style={styles.translationText}>{tutorStore.lastSavedTitle}</Text>
      </View>
    </AppScreen>
  );
}

function ChatHistoryScreen({ onNavigate, onBack }) {
  const rows = useMemo(() => tutorStore.savedSessions, []);

  return (
    <AppScreen decorative={false} footer={<TutorBottomNav active="History" onNavigate={onNavigate} />}>
      <TutorTopBar title="History" onBack={onBack} />
      <View style={styles.searchRow}>
        <Text style={styles.searchIcon}>o</Text>
        <Text style={styles.searchPlaceholder}>Search saved sessions</Text>
      </View>

      <View style={styles.historyList}>
        {rows.map((row) => (
          <HistoryRow
            key={row.title}
            title={row.title}
            meta={row.meta}
            target={row.target}
            tone={row.tone}
            onNavigate={onNavigate}
          />
        ))}
      </View>
    </AppScreen>
  );
}

export function renderAiTutorScreen(screenId, props) {
  switch (screenId) {
    case "51_ai_tutor_home":
      return <TutorHomeScreen key={screenId} {...props} />;
    case "52_suggested_prompts":
      return <SuggestedPromptsScreen key={screenId} {...props} />;
    case "53_chat_conversation":
      return <ChatConversationScreen key={screenId} {...props} />;
    case "54_grammar_explanation":
      return <GrammarExplanationScreen key={screenId} {...props} />;
    case "55_translation_context":
      return <TranslationContextScreen key={screenId} {...props} />;
    case "56_roleplay_setup":
      return <RoleplaySetupScreen key={screenId} {...props} />;
    case "57_roleplay_chat":
      return <RoleplayChatScreen key={screenId} {...props} />;
    case "58_suggestions":
      return <SuggestionsScreen key={screenId} {...props} />;
    case "59_save_response":
      return <SaveResponseScreen key={screenId} {...props} />;
    case "60_chat_history":
      return <ChatHistoryScreen key={screenId} {...props} />;
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
  topBarCompact: {
    marginBottom: 18,
  },
  topBarLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "800",
  },
  brandBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  brandBadgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "800",
  },
  brandTitle: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: "800",
  },
  avatarShell: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarShellText: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: "800",
  },
  heroCard: {
    borderRadius: 34,
    backgroundColor: COLORS.surface,
    paddingTop: 26,
    paddingHorizontal: 24,
    paddingBottom: 28,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  heroOrb: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: "rgba(0,110,47,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  heroCore: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  heroTitle: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 8,
  },
  heroCopy: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 18,
  },
  primaryTopicCard: {
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    padding: 24,
    marginBottom: 16,
  },
  primaryTopicEyebrow: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  primaryTopicTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
    marginBottom: 10,
  },
  primaryTopicCopy: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 15,
    lineHeight: 24,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 18,
  },
  actionCard: {
    width: "47%",
    minHeight: 154,
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 18,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  actionCardLarge: {
    width: "100%",
    minHeight: 168,
  },
  actionCardPrimary: {
    backgroundColor: COLORS.primary,
    borderColor: "rgba(0,110,47,0.2)",
  },
  actionIcon: {
    width: 38,
    height: 38,
    borderRadius: 16,
    backgroundColor: "rgba(0,110,47,0.10)",
  },
  actionIconPrimary: {
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  actionEyebrow: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 10,
  },
  actionTitle: {
    color: COLORS.text,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "800",
    marginTop: 10,
  },
  actionTitlePrimary: {
    color: "#FFFFFF",
  },
  actionSubtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  actionSubtitlePrimary: {
    color: "rgba(255,255,255,0.78)",
  },
  topicsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  pill: {
    minHeight: 40,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  pillDark: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  pillText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  pillTextDark: {
    color: "#FFFFFF",
  },
  statRingWrap: {
    alignItems: "center",
    marginTop: 6,
    marginBottom: 8,
  },
  statRingOuter: {
    width: 118,
    height: 118,
    borderRadius: 59,
    borderWidth: 10,
    borderColor: "rgba(34,197,94,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  statRingInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  statRingValue: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: "900",
  },
  statRingLabel: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: "700",
  },
  todayPill: {
    alignSelf: "center",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceLow,
    marginBottom: 16,
  },
  todayPillText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  chatRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  chatRowUser: {
    justifyContent: "flex-end",
  },
  chatBubble: {
    maxWidth: "82%",
    borderRadius: 26,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  chatBubbleUser: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chatBubbleThinking: {
    backgroundColor: "rgba(228,233,230,0.8)",
  },
  chatAuthor: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  chatMessage: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 22,
  },
  chatMessageUser: {
    color: "#FFFFFF",
  },
  chatMessageThinking: {
    color: COLORS.textMuted,
    fontStyle: "italic",
  },
  chatComposer: {
    minHeight: 62,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.94)",
    paddingLeft: 16,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  chatInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15,
    paddingVertical: 12,
  },
  sendButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  fadedContext: {
    borderRadius: 22,
    backgroundColor: "rgba(240,245,242,0.9)",
    padding: 14,
    marginBottom: 16,
  },
  fadedContextText: {
    color: "rgba(61,74,61,0.54)",
    fontSize: 14,
    fontStyle: "italic",
  },
  ruleCard: {
    borderRadius: 30,
    backgroundColor: COLORS.surface,
    padding: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  ruleLabel: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
  },
  ruleCardTitle: {
    color: COLORS.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    marginBottom: 12,
  },
  ruleCardCopy: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
  },
  exampleSnippet: {
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLow,
    padding: 16,
    marginBottom: 14,
  },
  exampleSnippetText: {
    color: COLORS.text,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "700",
  },
  translationHero: {
    borderRadius: 30,
    backgroundColor: COLORS.surface,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  translationWord: {
    color: COLORS.text,
    fontSize: 38,
    fontWeight: "800",
    marginBottom: 6,
  },
  translationPhonetic: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
  },
  translationCard: {
    borderRadius: 26,
    backgroundColor: COLORS.surface,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  translationLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  translationText: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 28,
  },
  translationBody: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  quoteBanner: {
    borderRadius: 26,
    backgroundColor: "rgba(0,110,47,0.08)",
    padding: 18,
  },
  quoteBannerText: {
    color: COLORS.secondary,
    fontSize: 15,
    lineHeight: 24,
    fontStyle: "italic",
    fontWeight: "600",
  },
  roleplayMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  timerPill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: COLORS.primarySoft,
  },
  timerPillText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "800",
  },
  floatingChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  floatingChipText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  scenarioHeader: {
    marginBottom: 18,
  },
  scenarioEyebrow: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  scenarioTitle: {
    color: COLORS.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
  },
  roleplaySuggestions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  successOrbWrap: {
    alignItems: "center",
    marginTop: 42,
    marginBottom: 24,
  },
  successOrbOuter: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: "rgba(0,110,47,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  successOrbInner: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  successMark: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "900",
    lineHeight: 46,
  },
  saveTitle: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },
  saveCopy: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  textButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  textButtonLabel: {
    color: COLORS.secondary,
    fontSize: 15,
    fontWeight: "700",
  },
  searchRow: {
    minHeight: 56,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 18,
  },
  searchIcon: {
    color: COLORS.textMuted,
    fontSize: 16,
    fontWeight: "700",
  },
  searchPlaceholder: {
    color: "rgba(61,74,61,0.55)",
    fontSize: 15,
  },
  historyList: {
    gap: 12,
  },
  historyRow: {
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  historyRowFeatured: {
    backgroundColor: COLORS.surfaceLow,
  },
  historyOrb: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,110,47,0.10)",
  },
  historyCopy: {
    flex: 1,
  },
  historyTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 4,
  },
  historyMeta: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(245,250,247,0.98)",
    borderRadius: 30,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  bottomNavItem: {
    flex: 1,
    minHeight: 56,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  bottomNavItemActive: {
    backgroundColor: COLORS.primarySoft,
  },
  bottomNavIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "rgba(61,74,61,0.18)",
  },
  bottomNavIconActive: {
    backgroundColor: COLORS.primary,
  },
  bottomNavLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "700",
  },
  bottomNavLabelActive: {
    color: COLORS.primary,
    fontWeight: "800",
  },
});
