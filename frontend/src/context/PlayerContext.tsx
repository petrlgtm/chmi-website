import { createContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { PlayableItem } from "../types";

export interface PlayerContextValue {
  currentItem: PlayableItem | null;
  isExpanded: boolean;
  play: (item: PlayableItem) => void;
  stop: () => void;
  toggleExpanded: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentItem, setCurrentItem] = useState<PlayableItem | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const play = useCallback((item: PlayableItem) => {
    setCurrentItem((prev) => {
      if (prev?.id === item.id && prev?.mode === item.mode) return prev;
      return item;
    });
    setIsExpanded(item.mode === "video");
  }, []);

  const stop = useCallback(() => {
    setCurrentItem(null);
    setIsExpanded(false);
  }, []);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  useEffect(() => {
    if (currentItem) {
      document.body.classList.add("has-mini-player");
    } else {
      document.body.classList.remove("has-mini-player");
    }
    return () => {
      document.body.classList.remove("has-mini-player");
    };
  }, [currentItem]);

  return (
    <PlayerContext.Provider
      value={{ currentItem, isExpanded, play, stop, toggleExpanded }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
