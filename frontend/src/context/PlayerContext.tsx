import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { Song } from "../types";

interface PlayerContextValue {
  currentSong: Song | null;
  isExpanded: boolean;
  play: (song: Song) => void;
  stop: () => void;
  toggleExpanded: () => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const play = useCallback((song: Song) => {
    setCurrentSong((prev) => {
      if (prev?.id === song.id) return prev;
      return song;
    });
    setIsExpanded(false);
  }, []);

  const stop = useCallback(() => {
    setCurrentSong(null);
    setIsExpanded(false);
  }, []);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  useEffect(() => {
    if (currentSong) {
      document.body.classList.add("has-mini-player");
    } else {
      document.body.classList.remove("has-mini-player");
    }
    return () => {
      document.body.classList.remove("has-mini-player");
    };
  }, [currentSong]);

  return (
    <PlayerContext.Provider
      value={{ currentSong, isExpanded, play, stop, toggleExpanded }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
