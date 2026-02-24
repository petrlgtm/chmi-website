import { ChevronUp, ChevronDown, X, Video, Headphones } from "lucide-react";
import { usePlayer } from "../hooks/usePlayer";

export default function MiniPlayer() {
  const { currentItem, isExpanded, stop, toggleExpanded } = usePlayer();

  if (!currentItem) return null;

  const isAudio = currentItem.mode === "audio";

  return (
    <div className="mini-player" role="region" aria-label="Media player">
      {/* Expandable video */}
      <div className={`mini-player-video${isExpanded ? " mini-player-video--open" : ""}`}>
        <iframe
          key={currentItem.videoId}
          src={`https://www.youtube.com/embed/${currentItem.videoId}?autoplay=1`}
          title={currentItem.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Bottom bar */}
      <div className="mini-player-bar">
        <img
          className="mini-player-thumb"
          src={currentItem.thumbnail}
          alt=""
          width={40}
          height={40}
        />
        <div className="mini-player-info">
          <span className="mini-player-title">{currentItem.title}</span>
          <span className="mini-player-artist">
            {isAudio ? <Headphones size={11} /> : <Video size={11} />}
            {" "}{currentItem.subtitle}
          </span>
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
