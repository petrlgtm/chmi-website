import { useState, useRef, useCallback } from "react";
import { X, Video, Headphones } from "lucide-react";
import { usePlayer } from "../hooks/usePlayer";

type Corner = "bottom-right" | "bottom-left" | "top-right" | "top-left";

export default function MiniPlayer() {
  const { currentItem, stop } = usePlayer();

  const [corner, setCorner] = useState<Corner>("bottom-right");
  const [dragging, setDragging] = useState(false);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const dragStart = useRef<{ x: number; y: number; elX: number; elY: number } | null>(null);
  const pipRef = useRef<HTMLDivElement>(null);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    const el = pipRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    dragStart.current = { x: e.clientX, y: e.clientY, elX: rect.left, elY: rect.top };
    setDragging(true);
    setDragPos({ x: rect.left, y: rect.top });
    el.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging || !dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setDragPos({
      x: dragStart.current.elX + dx,
      y: dragStart.current.elY + dy,
    });
  }, [dragging]);

  const onPointerUp = useCallback(() => {
    if (!dragging || !dragPos || !pipRef.current) {
      setDragging(false);
      setDragPos(null);
      return;
    }
    const rect = pipRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const midX = window.innerWidth / 2;
    const midY = window.innerHeight / 2;

    const newCorner: Corner =
      centerY < midY
        ? centerX < midX ? "top-left" : "top-right"
        : centerX < midX ? "bottom-left" : "bottom-right";

    setCorner(newCorner);
    setDragging(false);
    setDragPos(null);
    dragStart.current = null;
  }, [dragging, dragPos]);

  if (!currentItem) return null;

  const isAudio = currentItem.mode === "audio";
  const pipStyle: React.CSSProperties = dragging && dragPos
    ? { top: dragPos.y, left: dragPos.x, right: "auto", bottom: "auto", transition: "none" }
    : {};

  return (
    <div
      ref={pipRef}
      className={`mini-player mini-player--pip mini-player--pip-${corner}${dragging ? " mini-player--pip-dragging" : ""}`}
      role="region"
      aria-label="Media player"
      style={pipStyle}
    >
      <div className="mini-player-pip-video">
        <iframe
          key={currentItem.videoId}
          src={`https://www.youtube.com/embed/${currentItem.videoId}?autoplay=1`}
          title={currentItem.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {dragging && <div className="mini-player-pip-drag-shield" />}
        <button
          className="mini-player-pip-close"
          onClick={stop}
          aria-label="Close player"
        >
          <X size={18} />
        </button>
      </div>
      <div
        className="mini-player-pip-info"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="mini-player-info">
          <span className="mini-player-title">{currentItem.title}</span>
          <span className="mini-player-artist">
            {isAudio ? <Headphones size={11} /> : <Video size={11} />} {currentItem.subtitle}
          </span>
        </div>
      </div>
    </div>
  );
}
