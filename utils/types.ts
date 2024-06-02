/** The hook options. */
export type DarkModeOptions = {
  defaultValue?: boolean;
  localStorageKey?: string;
  initializeWithValue?: boolean;
};

/** The hook return type. */
export type DarkModeReturn = {
  /** The current state of the dark mode. */
  isDarkMode: boolean;
  /** Function to toggle the dark mode. */
  toggle: () => void;
  /** Function to enable the dark mode. */
  enable: () => void;
  /** Function to disable the dark mode. */
  disable: () => void;
  /** Function to set a specific value to the dark mode. */
  set: (value: boolean) => void;
};
/** Hook options. */
export type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

export type UseLocalStorageOptions<T> = {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;

  initializeWithValue?: boolean;
};
