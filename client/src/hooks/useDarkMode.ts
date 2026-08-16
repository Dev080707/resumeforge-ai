import { useEffect, useState } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("resumeforge:theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("resumeforge:theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("resumeforge:theme", "light");
    }
  }, [isDark]);

  return { isDark, toggle: () => setIsDark((d) => !d) };
}
