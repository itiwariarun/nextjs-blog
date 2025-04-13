import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";
import { useLocalStorage } from "./useLocalStorage";
import { useMediaQuery } from "./useMediaQuery";
import { LOCAL_STORAGE_KEY, COLOR_SCHEME_QUERY } from "@utils/constants";
import { DarkModeOptions, DarkModeReturn } from "@utils/types";

export function useDarkMode(options: DarkModeOptions = {}): DarkModeReturn {
  const {
    defaultValue,
    localStorageKey = LOCAL_STORAGE_KEY,
    initializeWithValue = true,
  } = options;

  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY, {
    initializeWithValue,
    defaultValue,
  });
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    localStorageKey,
    defaultValue ?? isDarkOS ?? false,
    { initializeWithValue }
  );

  // Update darkMode if os prefers changes
  useIsomorphicLayoutEffect(() => {
    if (isDarkOS !== isDarkMode) {
      setDarkMode(isDarkOS);
    }
  }, [isDarkOS]);

  return {
    isDarkMode,
    toggle: () => {
      setDarkMode((prev) => !prev);
    },
    enable: () => {
      setDarkMode(true);
    },
    disable: () => {
      setDarkMode(false);
    },
    set: (value) => {
      setDarkMode(value);
    },
  };
}
