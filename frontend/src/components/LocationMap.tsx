import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DefaultIcon = L.divIcon({
  className: "map-pin",
  html: '<div class="map-pin-inner"><span class="map-pin-cross">✟</span></div>',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
});
(L as any).Marker.prototype.options.icon = DefaultIcon;

type Props = {
  address: string;
  label: string;
  height?: string;
  zoom?: number;
  lat?: number;
  lng?: number;
};

function FlyToPoint({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], zoom, { duration: 0.5 });
  }, [lat, lng, zoom, map]);
  return null;
}

function MapSizeGuard() {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 250);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

function TouchScrollGuard() {
  const map = useMap();
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) return;

    map.dragging.disable();
    const container = map.getContainer();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length >= 2) map.dragging.enable();
    };
    const onTouchEnd = () => {
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

async function geocodeAddress(query: string): Promise<{ lat: number; lng: number } | null> {
  const cacheKey = "locationMapCache";
  const cached = JSON.parse(localStorage.getItem(cacheKey) || "{}") as Record<string, { lat: number; lng: number }>;
  if (cached[query]) return cached[query];

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    const data = await res.json();
    if (data && data[0]) {
      const result = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      cached[query] = result;
      localStorage.setItem(cacheKey, JSON.stringify(cached));
      return result;
    }
  } catch {
    // ignore
  }
  return null;
}

export default function LocationMap({ address, label, height = "250px", zoom = 15, lat, lng }: Props) {
  const hasCoords = lat != null && lng != null && (lat !== 0 || lng !== 0);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    hasCoords ? { lat: lat!, lng: lng! } : null
  );
  const [loading, setLoading] = useState(!hasCoords);

  useEffect(() => {
    if (hasCoords) return;
    let mounted = true;
    geocodeAddress(address).then((result) => {
      if (mounted) {
        setCoords(result);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [address, hasCoords]);

  if (loading) {
    return (
      <div style={{ height, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--purple-50)", borderRadius: "var(--radius-lg)", color: "var(--text-light)" }}>
        Loading map...
      </div>
    );
  }

  if (!coords) {
    return (
      <div style={{ height, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--purple-50)", borderRadius: "var(--radius-lg)", color: "var(--text-light)", fontSize: "0.85rem" }}>
        Map unavailable for this location
      </div>
    );
  }

  const center: [number, number] = [coords.lat, coords.lng];

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height, width: "100%", borderRadius: "var(--radius-lg)", overflow: "hidden" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
        crossOrigin=""
      />
      <MapSizeGuard />
      <TouchScrollGuard />
      <FlyToPoint lat={coords.lat} lng={coords.lng} zoom={zoom} />
      <Marker position={center}>
        <Popup>
          <strong>{label}</strong>
          <div>{address}</div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
