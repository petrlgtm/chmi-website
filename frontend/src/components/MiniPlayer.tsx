import { ChevronUp, ChevronDown, X } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";

export default function MiniPlayer() {
  const { currentSong, isExpanded, stop, toggleExpanded } = usePlayer();

  if (!currentSong) return null;

  return (
    <div className="mini-player" role="region" aria-label="Music player">
      {/* Expandable video */}
      <div className={`mini-player-video${isExpanded ? " mini-player-video--open" : ""}`}>
        <iframe
          key={currentSong.videoId}
          src={`https://www.youtube.com/embed/${currentSong.videoId}?autoplay=1`}
          title={currentSong.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Bottom bar */}
      <div className="mini-player-bar">
        <img
          className="mini-player-thumb"
          src={currentSong.thumbnail}
          alt=""
          width={40}
          height={40}
        />
        <div className="mini-player-info">
          <span className="mini-player-title">{currentSong.title}</span>
          <span className="mini-player-artist">{currentSong.artist}</span>
        </div>
        <div className="mini-player-controls">
          <button
            className="mini-player-btn"
            onClick={toggleExpanded}
            aria-label={isExpanded ? "Collapse video" : "Expand video"}
          >
            {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
          <button
            className="mini-player-btn mini-player-btn--close"
            onClick={stop}
            aria-label="Close player"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
