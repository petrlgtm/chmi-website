import { createContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { PlayableItem } from "../types";

export interface PlayerContextValue {
  currentItem: PlayableItem | null;
  play: (item: PlayableItem) => void;
  stop: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentItem, setCurrentItem] = useState<PlayableItem | null>(null);

  const play = useCallback((item: PlayableItem) => {
    setCurrentItem((prev) => {
      if (prev?.id === item.id && prev?.mode === item.mode) return prev;
      return item;
    });
  }, []);

  const stop = useCallback(() => {
    setCurrentItem(null);
  }, []);

  useEffect(() => {
    if (currentItem) {
      document.body.classList.add("has-mini-player", "has-mini-player--pip");
    } else {
      document.body.classList.remove("has-mini-player", "has-mini-player--pip");
    }
    return () => {
      document.body.classList.remove("has-mini-player", "has-mini-player--pip");
    };
  }, [currentItem]);

  return (
    <PlayerContext.Provider value={{ currentItem, play, stop }}>
      {children}
    </PlayerContext.Provider>
  );
}
