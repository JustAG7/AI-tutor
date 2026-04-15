export const FLOW_GROUPS = [
  [
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
    "11_home_dashboard",
  ],
  [
    "11_home_dashboard",
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
  ],
  [
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
  ],
  [
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
  ],
  [
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
  ],
  [
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
  ],
  [
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
  ],
  [
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
  ],
  [
    "81_pricing_plans",
    "82_plan_comparison",
    "83_checkout_flow",
    "84_success_state",
  ],
  [
    "85_profile_overview",
    "86_edit_profile",
    "87_learning_preferences",
    "88_notification_settings",
    "89_language_settings",
    "90_privacy_controls",
  ],
  [
    "91_offline_mode_notice",
    "92_connection_retry",
    "93_generic_error",
    "94_ai_unavailable_fallback",
    "95_permission_denied",
    "96_empty_state_no_lessons",
    "97_loading_skeleton",
    "98_success_toast_banner",
    "99_critical_confirm_modal",
    "100_session_timeout",
  ],
];

export const ALL_SCREEN_IDS = FLOW_GROUPS.flat();

const NEXT = {};
const PREV = {};

for (const flow of FLOW_GROUPS) {
  flow.forEach((screenId, index) => {
    if (index < flow.length - 1) {
      NEXT[screenId] = flow[index + 1];
    }

    if (index > 0) {
      PREV[screenId] = flow[index - 1];
    }
  });
}

export function getNextScreen(screenId) {
  return NEXT[screenId] ?? screenId;
}

export function getPreviousScreen(screenId) {
  return PREV[screenId] ?? screenId;
}

export function screenIdToLabel(screenId) {
  return screenId
    .replace(/^\d+_/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function screenIdToCluster(screenId) {
  const prefix = Number(screenId.split("_")[0]);

  if (prefix <= 20) return "Onboarding + Daily";
  if (prefix <= 30) return "Vocabulary";
  if (prefix <= 40) return "Grammar + Writing";
  if (prefix <= 50) return "Listening + Speaking";
  if (prefix <= 60) return "AI Tutor";
  if (prefix <= 70) return "Assessment";
  if (prefix <= 80) return "Progress + Social";
  if (prefix <= 90) return "Pricing + Profile";
  return "System States";
}
