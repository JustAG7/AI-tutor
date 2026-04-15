import React from "react";

import {
  ACCOUNT_SCREEN_IDS,
  renderAccountScreen,
} from "./accountCluster";
import {
  ASSESSMENT_SCREEN_IDS,
  renderAssessmentScreen,
} from "./assessmentCluster";
import { AI_TUTOR_SCREEN_IDS, renderAiTutorScreen } from "./aiTutorCluster";
import { DAILY_SCREEN_IDS, renderDailyScreen } from "./dailyCluster";
import { renderFallbackScreen } from "./fallbackCluster";
import { GRAMMAR_SCREEN_IDS, renderGrammarScreen } from "./grammarCluster";
import { HOME_SCREEN_IDS, renderHomeScreen } from "./homeCluster";
import {
  LISTENING_SPEAKING_SCREEN_IDS,
  renderListeningSpeakingScreen,
} from "./listeningSpeakingCluster";
import {
  ONBOARDING_SCREEN_IDS,
  renderOnboardingScreen,
} from "./onboardingCluster";
import {
  PROGRESS_SCREEN_IDS,
  renderProgressScreen,
} from "./progressCluster";
import {
  SYSTEM_SCREEN_IDS,
  renderSystemScreen,
} from "./systemCluster";
import {
  VOCABULARY_SCREEN_IDS,
  renderVocabularyScreen,
} from "./vocabularyCluster";

export const NATIVE_SCREEN_IDS = new Set([
  ...ACCOUNT_SCREEN_IDS,
  ...ONBOARDING_SCREEN_IDS,
  ...HOME_SCREEN_IDS,
  ...DAILY_SCREEN_IDS,
  ...VOCABULARY_SCREEN_IDS,
  ...GRAMMAR_SCREEN_IDS,
  ...LISTENING_SPEAKING_SCREEN_IDS,
  ...AI_TUTOR_SCREEN_IDS,
  ...ASSESSMENT_SCREEN_IDS,
  ...PROGRESS_SCREEN_IDS,
  ...SYSTEM_SCREEN_IDS,
]);

export function NativeScreenRenderer({ screenId, onNavigate, onBack }) {
  const props = { onNavigate, onBack };

  return (
    renderAccountScreen(screenId, props) ||
    renderOnboardingScreen(screenId, props) ||
    renderHomeScreen(screenId, props) ||
    renderDailyScreen(screenId, props) ||
    renderVocabularyScreen(screenId, props) ||
    renderGrammarScreen(screenId, props) ||
    renderListeningSpeakingScreen(screenId, props) ||
    renderAiTutorScreen(screenId, props) ||
    renderAssessmentScreen(screenId, props) ||
    renderProgressScreen(screenId, props) ||
    renderSystemScreen(screenId, props) ||
    renderFallbackScreen(screenId, props)
  );
}
