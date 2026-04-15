import React, { useEffect, useMemo, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Animated,
  BackHandler,
  Easing,
  PanResponder,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import { COLORS } from "./src/design/tokens";
import { ALL_SCREEN_IDS } from "./src/navigation/flow";
import { NativeScreenRenderer } from "./src/screens";

const DEFAULT_SCREEN = "01_splash_screen";
const APP_TITLE = "AI Tutor";

const SCREEN_SET = new Set(ALL_SCREEN_IDS);

function getInitialScreen() {
  if (Platform.OS !== "web" || typeof window === "undefined") {
    return DEFAULT_SCREEN;
  }

  const screenId = new URL(window.location.href).searchParams.get("screen");
  return screenId && SCREEN_SET.has(screenId) ? screenId : DEFAULT_SCREEN;
}

export default function App() {
  const [screenStack, setScreenStack] = useState(() => [getInitialScreen()]);
  const historyReadyRef = useRef(false);
  const navigationModeRef = useRef("replace");
  const transitionRef = useRef(new Animated.Value(0)).current;

  const currentScreenId = screenStack[screenStack.length - 1];
  const canGoBack = screenStack.length > 1;

  useEffect(() => {
    transitionRef.setValue(navigationModeRef.current === "back" ? -18 : 18);

    Animated.timing(transitionRef, {
      toValue: 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [currentScreenId, transitionRef]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (!canGoBack) {
          return false;
        }

        goBack();
        return true;
      }
    );

    return () => subscription.remove();
  }, [canGoBack]);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") {
      return undefined;
    }

    const handlePopState = (event) => {
      const targetScreen = event.state?.screenId;

      if (!targetScreen || !SCREEN_SET.has(targetScreen)) {
        setScreenStack([DEFAULT_SCREEN]);
        return;
      }

      navigationModeRef.current = "back";
      setScreenStack((current) => {
        const existingIndex = current.lastIndexOf(targetScreen);
        return existingIndex >= 0
          ? current.slice(0, existingIndex + 1)
          : [targetScreen];
      });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") {
      return undefined;
    }

    const handleKeyDown = (event) => {
      const targetTag = event.target?.tagName?.toLowerCase?.() ?? "";
      const isTypingTarget =
        targetTag === "input" ||
        targetTag === "textarea" ||
        event.target?.isContentEditable;

      if (isTypingTarget || !canGoBack) {
        return;
      }

      const wantsBack =
        event.key === "Escape" ||
        event.key === "Backspace" ||
        (event.altKey && event.key === "ArrowLeft");

      if (!wantsBack) {
        return;
      }

      event.preventDefault();
      goBack();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canGoBack]);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") {
      return;
    }

    document.title = APP_TITLE;

    const url = new URL(window.location.href);
    url.searchParams.set("screen", currentScreenId);

    const nextState = { __aiTutor: true, screenId: currentScreenId };

    if (!historyReadyRef.current) {
      window.history.replaceState(nextState, "", url);
      historyReadyRef.current = true;
      navigationModeRef.current = "replace";
      return;
    }

    if (
      navigationModeRef.current === "push" &&
      window.history.state?.screenId !== currentScreenId
    ) {
      window.history.pushState(nextState, "", url);
    } else if (window.history.state?.screenId !== currentScreenId) {
      window.history.replaceState(nextState, "", url);
    }

    navigationModeRef.current = "replace";
  }, [currentScreenId]);

  const navigateTo = (targetScreen) => {
    if (!targetScreen || !SCREEN_SET.has(targetScreen)) {
      return;
    }

    navigationModeRef.current = "push";
    setScreenStack((current) =>
      current[current.length - 1] === targetScreen
        ? current
        : [...current, targetScreen]
    );
  };

  const goBack = () => {
    if (!canGoBack) {
      return;
    }

    navigationModeRef.current = "back";

    if (Platform.OS === "web" && typeof window !== "undefined") {
      window.history.back();
      return;
    }

    setScreenStack((current) => current.slice(0, -1));
  };

  const swipeBackResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          canGoBack &&
          Math.abs(gestureState.dx) > 12 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
        onPanResponderRelease: (_, gestureState) => {
          if (canGoBack && gestureState.dx > 68) {
            goBack();
          }
        },
      }),
    [canGoBack]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.viewport}>
        <Animated.View
          style={[
            styles.canvas,
            { transform: [{ translateX: transitionRef }] },
          ]}
        >
          <NativeScreenRenderer
            screenId={currentScreenId}
            onNavigate={navigateTo}
            onBack={goBack}
          />
        </Animated.View>
        <View
          pointerEvents={canGoBack ? "auto" : "none"}
          style={styles.edgeSwipeZone}
          {...swipeBackResponder.panHandlers}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  viewport: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  canvas: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.background,
  },
  edgeSwipeZone: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 22,
    zIndex: 3,
  },
});
