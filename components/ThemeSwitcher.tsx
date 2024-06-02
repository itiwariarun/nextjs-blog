import { MoonIcon, SunIcon } from "./Icons";
import { useDarkMode } from "./../utils/hooks/useDarkMode";
import { useEffect } from "react";

export default function ThemeSwitcher() {
  const { isDarkMode, toggle, enable, disable } = useDarkMode();
  const colorTheme = isDarkMode ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <div className="container">
      <label className="toggle" htmlFor="switch">
        <input
          id="switch"
          onChange={toggle}
          defaultValue={isDarkMode as any}
          className="input"
          type="checkbox"
        />
        <div className="icon icon--sun">
          <MoonIcon />
        </div>

        <div className="icon icon--moon">
          <SunIcon />
        </div>
      </label>
    </div>
  );
}
