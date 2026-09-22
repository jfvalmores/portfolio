import { useState } from "react";

const useTheme = () => {
  const [isLight, setIsLight] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;

    return window.matchMedia("(prefers-color-scheme: light)").matches;
  });

  return { isLight, setIsLight };
};

export default useTheme;
