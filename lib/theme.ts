"use client";

import { useEffect, useState } from "react";

const KEY = "auth-theme";

export type AuthTheme = "light" | "dark";

export function useAuthTheme(): [AuthTheme, (t: AuthTheme) => void, boolean] {
  const [theme, setThemeState] = useState<AuthTheme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved =
      (typeof window !== "undefined" && (localStorage.getItem(KEY) as AuthTheme)) || "light";
    setThemeState(saved === "dark" ? "dark" : "light");
    setReady(true);
  }, []);

  const setTheme = (t: AuthTheme) => {
    setThemeState(t);
    try {
      localStorage.setItem(KEY, t);
    } catch {
      /* noop */
    }
  };

  return [theme, setTheme, ready];
}

export const palette = {
  light: {
    canvas: "#ffffff",
    textPrimary: "#2b364a",
    textSecondary: "#6b7280",
    textMuted: "#9ca3af",
    border: "#e5e7eb",
    inputBg: "#ffffff",
    socialBg: "#ffffff",
    hover: "#f9fafb",
    errorBg: "#ffffff",
  },
  dark: {
    canvas: "#0a0f1c",
    textPrimary: "#ffffff",
    textSecondary: "#94a3b8",
    textMuted: "#64748b",
    border: "#1e293b",
    inputBg: "#111827",
    socialBg: "#0f172a",
    hover: "#0f172a",
    errorBg: "#0a0f1c",
  },
} as const;

export const brand = {
  primary: "#13c8b5",
  primaryHover: "#0fb3a1",
  primarySoft: "#e6f8f5",
  danger: "#ef4444",
  dangerSoft: "#fef2f2",
  panelDark: "#0f172a",
};
