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

export const ASSESSMENT_SCREEN_IDS = [
  "61_quiz_mode_selector",
  "62_timed_quiz_question",
  "63_untimed_quiz_question",
  "64_hint_usage_state",
  "65_submit_confidence",
  "66_quiz_score_overview",
  "67_ai_weak_point_analysis",
  "68_personalized_review_plan",
  "69_mistake_notebook",
  "70_retake_quiz_flow",
];

const QUESTIONS = [
  {
    id: "q1",
    topic: "Module 1",
    prompt: "Choose the clearest sentence.",
    options: [
      "The summary make the main idea clear.",
      "The summary makes the main idea clear.",
      "The summary making the main idea clear.",
    ],
    correctIndex: 1,
    hint: "Check subject-verb agreement before you choose.",
    insight: "Singular subjects need singular verb forms such as 'makes'.",
  },
  {
    id: "q2",
    topic: "Module 2",
    prompt: "Pick the sentence with the correct pattern.",
    options: [
      "We plan finish the task today.",
      "We plan to finish the task today.",
      "We planning to finish the task today.",
    ],
    correctIndex: 1,
    hint: "Some verbs are followed by 'to' plus base verb.",
    insight: "The pattern here is 'plan to' plus base verb.",
  },
  {
    id: "q3",
    topic: "Module 3",
    prompt: "Choose the response that best matches the request.",
    options: [
      "Sure, I can say that more clearly.",
      "No, I already finished yesterday.",
      "I will send the file next week.",
    ],
    correctIndex: 0,
    hint: "Look for the option that answers the request directly.",
    insight: "The strongest response addresses the request immediately and clearly.",
  },
];

function createAssessmentStore() {
  return {
    mode: "timed",
    currentIndex: 0,
    selectedAnswer: null,
    usedHint: false,
    answers: [],
    confidence: "medium",
  };
}

let assessmentStore = createAssessmentStore();

function currentQuestion() {
  return QUESTIONS[assessmentStore.currentIndex] ?? QUESTIONS[0];
}

function startAssessment(mode) {
  assessmentStore = {
    ...createAssessmentStore(),
    mode,
  };
}

function chooseAnswer(optionIndex) {
  assessmentStore = {
    ...assessmentStore,
    selectedAnswer: optionIndex,
  };
}

function useHint() {
  assessmentStore = {
    ...assessmentStore,
    usedHint: true,
  };
}

function submitConfidence(level) {
  const question = currentQuestion();
  const answerRecord = {
    questionId: question.id,
    topic: question.topic,
    prompt: question.prompt,
    selectedAnswer: assessmentStore.selectedAnswer,
    correctAnswer: question.correctIndex,
    correct: assessmentStore.selectedAnswer === question.correctIndex,
    usedHint: assessmentStore.usedHint,
    confidence: level,
    insight: question.insight,
  };

  assessmentStore = {
    ...assessmentStore,
    confidence: level,
    answers: [...assessmentStore.answers, answerRecord],
    currentIndex: assessmentStore.currentIndex + 1,
    selectedAnswer: null,
    usedHint: false,
  };
}

function scoreSummary() {
  const total = assessmentStore.answers.length || QUESTIONS.length;
  const correct = assessmentStore.answers.filter((answer) => answer.correct).length;
  const percent = Math.round((correct / total) * 100);
  const hints = assessmentStore.answers.filter((answer) => answer.usedHint).length;

  return { total, correct, percent, hints };
}

function weakestTopics() {
  const incorrect = assessmentStore.answers.filter((answer) => !answer.correct);
  if (!incorrect.length) {
    return [
      {
        title: "Strong overall result",
        detail: "This session ended with solid accuracy. Keep the same pace on the next round.",
      },
    ];
  }

  return incorrect.map((answer) => ({
    title: answer.topic,
    detail: answer.insight,
  }));
}

function mistakeNotebookItems() {
  const incorrect = assessmentStore.answers.filter((answer) => !answer.correct);
  if (!incorrect.length) {
    return [
      {
        title: "No saved mistakes",
        detail: "Nothing needs extra review from this pass.",
      },
    ];
  }

  return incorrect.map((answer) => ({
    title: answer.topic,
    detail: answer.prompt,
  }));
}

function nextQuestionScreen() {
  return assessmentStore.mode === "timed"
    ? "62_timed_quiz_question"
    : "63_untimed_quiz_question";
}

export function getAssessmentSnapshot() {
  return {
    mode: assessmentStore.mode,
    currentIndex: assessmentStore.currentIndex,
    totalQuestions: QUESTIONS.length,
    summary: scoreSummary(),
    weakest: weakestTopics(),
    mistakes: mistakeNotebookItems(),
    answers: assessmentStore.answers,
  };
}

function ModeCard({ title, subtitle, meta, onPress, featured }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.modeCard,
        featured && styles.modeCardFeatured,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.modeTitle, featured && styles.modeTitleFeatured]}>{title}</Text>
      <Text style={[styles.modeSubtitle, featured && styles.modeSubtitleFeatured]}>
        {subtitle}
      </Text>
      <Text style={[styles.modeMeta, featured && styles.modeMetaFeatured]}>{meta}</Text>
    </Pressable>
  );
}

function AnswerOption({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.answerOption,
        selected && styles.answerOptionSelected,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.answerOptionText,
          selected && styles.answerOptionTextSelected,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function InsightCard({ title, detail }) {
  return (
    <View style={styles.insightCard}>
      <Text style={styles.insightTitle}>{title}</Text>
      <Text style={styles.insightDetail}>{detail}</Text>
    </View>
  );
}

function ModeSelectorScreen({ onNavigate, onBack }) {
  return (
    <AppScreen decorative={false} footerMode="flow">
      <BrandHeader title="Assessment" onBack={onBack} />
      <SectionEyebrow>Core practice</SectionEyebrow>
      <Text style={styles.title}>Choose your quiz mode</Text>
      <Text style={styles.copy}>Pick the mode shown in the assessment flow.</Text>

      <ModeCard
        title="Timed Quiz"
        subtitle="Fast focus under gentle pressure"
        meta="3 questions · 3 minutes"
        featured
        onPress={() => {
          startAssessment("timed");
          onNavigate("62_timed_quiz_question");
        }}
      />
      <ModeCard
        title="Untimed Quiz"
        subtitle="Think carefully and review each step"
        meta="3 questions · no timer"
        onPress={() => {
          startAssessment("untimed");
          onNavigate("63_untimed_quiz_question");
        }}
      />
    </AppScreen>
  );
}

function QuizQuestionScreen({ onNavigate, onBack, timed }) {
  const question = currentQuestion();
  const progress = `${assessmentStore.currentIndex + 1}/${QUESTIONS.length}`;

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Use hint" onPress={() => onNavigate("64_hint_usage_state")} />
          <PrimaryButton
            label="Submit answer"
            onPress={() => {
              if (assessmentStore.selectedAnswer !== null) {
                onNavigate("65_submit_confidence");
              }
            }}
          />
        </>
      }
    >
      <BrandHeader
        title={timed ? "Timed Quiz" : "Untimed Quiz"}
        progressText={progress}
        progressValue={((assessmentStore.currentIndex + 1) / QUESTIONS.length) * 100}
        onBack={onBack}
      />
      <View style={styles.metaRow}>
        <Pill label={question.topic} />
        <Pill label={timed ? "03:00" : "No timer"} />
      </View>
      <Text style={styles.title}>{question.prompt}</Text>
      <Text style={styles.copy}>Select one answer to continue this quiz flow.</Text>
      <View style={styles.answerStack}>
        {question.options.map((option, index) => (
          <AnswerOption
            key={option}
            label={option}
            selected={assessmentStore.selectedAnswer === index}
            onPress={() => chooseAnswer(index)}
          />
        ))}
      </View>
    </AppScreen>
  );
}

function HintUsageScreen({ onNavigate, onBack }) {
  const question = currentQuestion();

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Back to question" onPress={onBack} />
          <PrimaryButton
            label="Use hint and continue"
            onPress={() => {
              useHint();
              onNavigate("65_submit_confidence");
            }}
          />
        </>
      }
    >
      <BrandHeader title="Hint" onBack={onBack} />
      <SectionEyebrow>{question.topic}</SectionEyebrow>
      <Text style={styles.title}>Need a small nudge?</Text>
      <View style={styles.highlightCard}>
        <Text style={styles.highlightTitle}>Hint</Text>
        <Text style={styles.highlightCopy}>{question.hint}</Text>
      </View>
    </AppScreen>
  );
}

function SubmitConfidenceScreen({ onNavigate, onBack }) {
  const question = currentQuestion();

  return (
    <AppScreen decorative={false} footerMode="flow">
      <BrandHeader title="Confidence Check" onBack={onBack} />
      <SectionEyebrow>Reflection</SectionEyebrow>
      <Text style={styles.title}>How confident are you in this answer?</Text>
      <Text style={styles.copy}>{question.prompt}</Text>
      <View style={styles.confidenceStack}>
        {[
          { key: "low", label: "Low confidence" },
          { key: "medium", label: "Medium confidence" },
          { key: "high", label: "High confidence" },
        ].map((item) => (
          <ModeCard
            key={item.key}
            title={item.label}
            subtitle="Save this reflection with the current answer"
            meta="Stored for session review"
            onPress={() => {
              submitConfidence(item.key);
              onNavigate(
                assessmentStore.currentIndex < QUESTIONS.length
                  ? nextQuestionScreen()
                  : "66_quiz_score_overview"
              );
            }}
          />
        ))}
      </View>
    </AppScreen>
  );
}

function ScoreOverviewScreen({ onNavigate, onBack }) {
  const summary = scoreSummary();

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Retake quiz" onPress={() => onNavigate("70_retake_quiz_flow")} />
          <PrimaryButton label="See analysis" onPress={() => onNavigate("67_ai_weak_point_analysis")} />
        </>
      }
    >
      <BrandHeader title="Score Overview" onBack={onBack} />
      <View style={styles.scoreHero}>
        <Text style={styles.scorePercent}>{summary.percent}%</Text>
        <Text style={styles.scoreLabel}>Accuracy</Text>
      </View>
      <View style={styles.metricRow}>
        <MetricCard label="Correct" value={`${summary.correct}/${summary.total}`} />
        <MetricCard label="Hints used" value={`${summary.hints}`} />
      </View>
    </AppScreen>
  );
}

function WeakPointAnalysisScreen({ onNavigate, onBack }) {
  const insights = weakestTopics();

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Mistake notebook" onPress={() => onNavigate("69_mistake_notebook")} />
          <PrimaryButton label="Review plan" onPress={() => onNavigate("68_personalized_review_plan")} />
        </>
      }
    >
      <BrandHeader title="AI Analysis" onBack={onBack} />
      <SectionEyebrow>Weak points</SectionEyebrow>
      <Text style={styles.title}>Focus areas from this session</Text>
      <View style={styles.cardStack}>
        {insights.map((item) => (
          <InsightCard key={item.title} title={item.title} detail={item.detail} />
        ))}
      </View>
    </AppScreen>
  );
}

function ReviewPlanScreen({ onNavigate, onBack }) {
  const insights = weakestTopics();

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Mistake notebook" onPress={() => onNavigate("69_mistake_notebook")} />
          <PrimaryButton label="Retake flow" onPress={() => onNavigate("70_retake_quiz_flow")} />
        </>
      }
    >
      <BrandHeader title="Review Plan" onBack={onBack} />
      <SectionEyebrow>Next steps</SectionEyebrow>
      <Text style={styles.title}>Personalized review plan</Text>
      <View style={styles.cardStack}>
        {insights.map((item, index) => (
          <View key={item.title} style={styles.planCard}>
            <Text style={styles.planStep}>Step {index + 1}</Text>
            <Text style={styles.insightTitle}>{item.title}</Text>
            <Text style={styles.insightDetail}>{item.detail}</Text>
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

function MistakeNotebookScreen({ onNavigate, onBack }) {
  const items = mistakeNotebookItems();

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Go home" onPress={() => onNavigate("11_home_dashboard")} />
          <PrimaryButton label="Retake quiz" onPress={() => onNavigate("70_retake_quiz_flow")} />
        </>
      }
    >
      <BrandHeader title="Mistake Notebook" onBack={onBack} />
      <SectionEyebrow>Saved review</SectionEyebrow>
      <Text style={styles.title}>Mistakes worth revisiting</Text>
      <View style={styles.cardStack}>
        {items.map((item) => (
          <InsightCard key={item.title} title={item.title} detail={item.detail} />
        ))}
      </View>
    </AppScreen>
  );
}

function RetakeQuizFlowScreen({ onNavigate, onBack }) {
  const modeLabel = assessmentStore.mode === "timed" ? "Timed" : "Untimed";

  return (
    <AppScreen
      decorative={false}
      footerMode="flow"
      footer={
        <>
          <SecondaryButton label="Change mode" onPress={() => onNavigate("61_quiz_mode_selector")} />
          <PrimaryButton
            label="Start again"
            onPress={() => {
              startAssessment(assessmentStore.mode);
              onNavigate(nextQuestionScreen());
            }}
          />
        </>
      }
    >
      <BrandHeader title="Retake Quiz" onBack={onBack} />
      <SectionEyebrow>{modeLabel} mode</SectionEyebrow>
      <Text style={styles.title}>Ready for another pass?</Text>
      <Text style={styles.copy}>Restart this assessment with the same mode.</Text>
      <View style={styles.highlightCard}>
        <Text style={styles.highlightTitle}>Recommended</Text>
        <Text style={styles.highlightCopy}>Review the last notes first, then retake the quiz.</Text>
      </View>
    </AppScreen>
  );
}

export function renderAssessmentScreen(screenId, props) {
  switch (screenId) {
    case "61_quiz_mode_selector":
      return <ModeSelectorScreen key={screenId} {...props} />;
    case "62_timed_quiz_question":
      return <QuizQuestionScreen key={screenId} timed {...props} />;
    case "63_untimed_quiz_question":
      return <QuizQuestionScreen key={screenId} timed={false} {...props} />;
    case "64_hint_usage_state":
      return <HintUsageScreen key={screenId} {...props} />;
    case "65_submit_confidence":
      return <SubmitConfidenceScreen key={screenId} {...props} />;
    case "66_quiz_score_overview":
      return <ScoreOverviewScreen key={screenId} {...props} />;
    case "67_ai_weak_point_analysis":
      return <WeakPointAnalysisScreen key={screenId} {...props} />;
    case "68_personalized_review_plan":
      return <ReviewPlanScreen key={screenId} {...props} />;
    case "69_mistake_notebook":
      return <MistakeNotebookScreen key={screenId} {...props} />;
    case "70_retake_quiz_flow":
      return <RetakeQuizFlowScreen key={screenId} {...props} />;
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
  copy: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 18,
  },
  modeCard: {
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 22,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.24)",
  },
  modeCardFeatured: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  modeTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },
  modeTitleFeatured: {
    color: "#FFFFFF",
  },
  modeSubtitle: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 10,
  },
  modeSubtitleFeatured: {
    color: "rgba(255,255,255,0.82)",
  },
  modeMeta: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  modeMetaFeatured: {
    color: "rgba(255,255,255,0.78)",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  answerStack: {
    gap: 12,
  },
  answerOption: {
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "rgba(188,203,185,0.32)",
  },
  answerOptionSelected: {
    backgroundColor: COLORS.primarySoft,
    borderColor: COLORS.primary,
  },
  answerOptionText: {
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  answerOptionTextSelected: {
    color: COLORS.primary,
    fontWeight: "800",
  },
  confidenceStack: {
    gap: 12,
  },
  scoreHero: {
    borderRadius: 32,
    backgroundColor: COLORS.surface,
    paddingVertical: 40,
    alignItems: "center",
    marginBottom: 18,
  },
  scorePercent: {
    color: COLORS.primary,
    fontSize: 54,
    fontWeight: "900",
    marginBottom: 8,
  },
  scoreLabel: {
    color: COLORS.textMuted,
    fontSize: 16,
    fontWeight: "700",
  },
  metricRow: {
    flexDirection: "row",
    gap: 12,
  },
  cardStack: {
    gap: 12,
  },
  insightCard: {
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 20,
  },
  insightTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  insightDetail: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  planCard: {
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLow,
    padding: 20,
  },
  planStep: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  highlightCard: {
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 22,
  },
  highlightTitle: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  highlightCopy: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
});
