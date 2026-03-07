"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type FontSize = "small" | "medium" | "large";

interface FontControlContextValue {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  cycleFontSize: () => void;
  label: string;
}

const FontControlContext = createContext<FontControlContextValue | null>(null);

const STORAGE_KEY = "meta21-font-size";

const LABELS: Record<FontSize, string> = {
  small: "P",
  medium: "M",
  large: "G",
};

const CYCLE: Record<FontSize, FontSize> = {
  small: "medium",
  medium: "large",
  large: "small",
};

export function FontControlProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>("medium");

  const applyFontSize = useCallback((size: FontSize) => {
    const root = document.documentElement;
    root.removeAttribute("data-font-size");
    if (size !== "medium") {
      root.setAttribute("data-font-size", size);
    }
  }, []);

  const setFontSize = useCallback(
    (size: FontSize) => {
      setFontSizeState(size);
      localStorage.setItem(STORAGE_KEY, size);
      applyFontSize(size);
    },
    [applyFontSize]
  );

  const cycleFontSize = useCallback(() => {
    setFontSize(CYCLE[fontSize]);
  }, [fontSize, setFontSize]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as FontSize | null;
    const initial = stored ?? "medium";
    setFontSizeState(initial);
    applyFontSize(initial);
  }, [applyFontSize]);

  return (
    <FontControlContext
      value={{
        fontSize,
        setFontSize,
        cycleFontSize,
        label: LABELS[fontSize],
      }}
    >
      {children}
    </FontControlContext>
  );
}

export function useFontControl() {
  const context = useContext(FontControlContext);
  if (!context) {
    throw new Error(
      "useFontControl deve ser usado dentro de <FontControlProvider>"
    );
  }
  return context;
}
