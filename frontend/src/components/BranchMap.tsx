import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { Branch } from "../types";
import "leaflet/dist/leaflet.css";

const DefaultIcon = L.divIcon({
  className: "map-pin",
  html: '<div class="map-pin-inner"><span class="map-pin-cross">✟</span></div>',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
});

const SelectedIcon = L.divIcon({
  className: "map-pin map-pin-selected",
  html: '<div class="map-pin-inner"><span class="map-pin-cross">✟</span></div>',
  iconSize: [36, 48],
  iconAnchor: [18, 48],
  popupAnchor: [0, -48],
});

(L as any).Marker.prototype.options.icon = DefaultIcon;

/** Fly to selected branch or fit bounds to all visible branches */
function MapController({
  branches,
  selectedId,
  markerRefs,
}: {
  branches: Branch[];
  selectedId?: string;
  markerRefs: React.MutableRefObject<Record<string, L.Marker>>;
}) {
  const map = useMap();

  // Fit bounds to visible branches on mount and when branches list changes
  useEffect(() => {
    if (selectedId) return; // don't override if a branch is selected
    const validBranches = branches.filter((b) => b.lat !== 0 || b.lng !== 0);
    if (validBranches.length === 0) return;

    if (validBranches.length === 1) {
      map.flyTo([validBranches[0].lat, validBranches[0].lng], 13, { duration: 0.5 });
    } else {
      const bounds = L.latLngBounds(validBranches.map((b) => [b.lat, b.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14, animate: true });
    }
  }, [branches, map, selectedId]);

  // Fly to selected branch and open popup
  useEffect(() => {
    if (!selectedId) return;
    const branch = branches.find((b) => b.id === selectedId);
    if (!branch || (branch.lat === 0 && branch.lng === 0)) return;

    map.flyTo([branch.lat, branch.lng], 15, { duration: 0.8 });

    // Open popup after fly animation
    setTimeout(() => {
      const marker = markerRefs.current[selectedId];
      if (marker?.openPopup) marker.openPopup();
    }, 900);
  }, [selectedId, branches, map, markerRefs]);

  return null;
}

// Clear stale geocoding cache from previous version
try { localStorage.removeItem("branchCoords"); } catch { /* ignore */ }

/** Forces Leaflet to recalculate its container size after lazy-loading via Suspense */
function MapSizeGuard() {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 250);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

/** Disable dragging on touch so page scroll works; re-enable on two-finger gesture */
function TouchScrollGuard() {
  const map = useMap();
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) return;

    // Disable one-finger drag so page can scroll
    map.dragging.disable();

    const container = map.getContainer();
    let touchCount = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchCount = e.touches.length;
      if (touchCount >= 2) {
        map.dragging.enable();
      }
    };
    const onTouchEnd = () => {
      touchCount = 0;
      // Re-disable after multi-touch ends
      setTimeout(() => map.dragging.disable(), 100);
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [map]);
  return null;
}

type Props = { branches: Branch[]; selectedId?: string };

export default function BranchMap({ branches, selectedId }: Props) {
  const markerRefs = React.useRef<Record<string, L.Marker>>({});

  const validBranches = useMemo(
    () => branches.filter((b) => b.lat !== 0 || b.lng !== 0),
    [branches]
  );

  // Kampala HQ as default center
  const center: [number, number] = [0.3136, 32.5811];

  return (
    <MapContainer
      id="branch-map"
      center={center}
      zoom={7}
      scrollWheelZoom={false}
      style={{ height: "460px", width: "100%", borderRadius: "var(--radius-xl)", marginBottom: "1rem" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
        crossOrigin=""
      />
      <MapSizeGuard />
      <TouchScrollGuard />
      <MapController
        branches={branches}
        selectedId={selectedId}
        markerRefs={markerRefs}
      />
      {validBranches.map((b) => (
        <Marker
          key={b.id}
          position={[b.lat, b.lng]}
          icon={selectedId === b.id ? SelectedIcon : DefaultIcon}
          ref={(r) => {
            if (r) markerRefs.current[b.id] = r;
          }}
        >
          <Popup>
            <strong>{b.name}</strong>
            <div style={{ fontSize: "0.85em", color: "#666", marginTop: 4 }}>
              {b.address && b.address !== "Online" ? b.address : b.city}
            </div>
            {b.phone && (
              <div style={{ fontSize: "0.85em", marginTop: 2 }}>{b.phone}</div>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
