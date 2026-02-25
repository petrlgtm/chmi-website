import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Navigation, X, Church, ChevronRight, Moon, BookOpen, Users, Flame, Headphones } from "lucide-react";
import { branches } from "../data/branches";
import { services } from "../data/services";
import type { Branch } from "../types";

const STORAGE_KEY = "nearbyBranchDismissed";
const DISMISS_TTL = 24 * 60 * 60 * 1000; // 24 hours

const SERVICE_ICONS: Record<string, typeof Clock> = {
  "sunday-services": Church,
  "bible-study": BookOpen,
  "overnight-prayers": Moon,
  "lunch-hour-services": Headphones,
  "home-cells": Users,
  "night-services": Flame,
};

/** Haversine distance in km */
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function findNearest(lat: number, lng: number, count = 3): { branch: Branch; distKm: number }[] {
  return branches
    .filter((b) => !(b.lat === 0 && b.lng === 0))
    .map((b) => ({ branch: b, distKm: haversineKm(lat, lng, b.lat, b.lng) }))
    .sort((a, b) => a.distKm - b.distKm)
    .slice(0, count);
}

function getServicesForBranch(branchId: string) {
  const matched: { id: string; title: string; times: string }[] = [];
  for (const svc of services) {
    // Only show services that physically happen at this branch
    const entry = svc.branchSchedules.find((bs) => bs.branchId === branchId);
    if (entry) {
      matched.push({ id: svc.id, title: svc.title, times: entry.times });
    }
  }
  return matched;
}

function isDismissed(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const { timestamp } = JSON.parse(raw);
    return Date.now() - timestamp < DISMISS_TTL;
  } catch {
    return false;
  }
}

type Step = "ask" | "select" | "locating" | "nearest" | "result";

export default function NearbyBranchPrompt({ onDismiss }: { onDismiss?: () => void }) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<Step>("ask");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [distKm, setDistKm] = useState<number | null>(null);
  const [nearestResults, setNearestResults] = useState<{ branch: Branch; distKm: number }[]>([]);
  const [branchServices, setBranchServices] = useState<{ id: string; title: string; times: string }[]>([]);
  const [branchSearch, setBranchSearch] = useState("");
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if (isDismissed()) {
      onDismiss?.();
      return;
    }
    // Delay 4s so users see the page first before the prompt appears
    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ timestamp: Date.now() }));
    } catch { /* ignore */ }
    onDismiss?.();
  }

  function selectBranch(branch: Branch) {
    setSelectedBranch(branch);
    setBranchServices(getServicesForBranch(branch.id));
    setStep("result");
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setStep("select");
      return;
    }
    setStep("locating");
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const results = findNearest(pos.coords.latitude, pos.coords.longitude, 3);
        if (results.length > 0) {
          setNearestResults(results);
          setStep("nearest");
        } else {
          setStep("select");
        }
      },
      (err) => {
        const messages: Record<number, string> = {
          1: "Location access denied. Please select your branch manually.",
          2: "Could not determine your location. Please try again or select manually.",
          3: "Location request timed out. Please try again or select manually.",
        };
        setLocationError(messages[err.code] || "Could not get location.");
        setStep("select");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  }

  function selectFromNearest(result: { branch: Branch; distKm: number }) {
    setSelectedBranch(result.branch);
    setDistKm(result.distKm);
    setBranchServices(getServicesForBranch(result.branch.id));
    setStep("result");
  }

  if (!visible) return null;

  const filteredBranches = branchSearch
    ? branches.filter(
        (b) =>
          b.name.toLowerCase().includes(branchSearch.toLowerCase()) ||
          b.city.toLowerCase().includes(branchSearch.toLowerCase())
      )
    : branches;

  const mapsUrl = selectedBranch
    ? `https://www.google.com/maps/dir/?api=1&destination=${selectedBranch.lat},${selectedBranch.lng}`
    : "";
  const distText = distKm != null
    ? distKm < 1
      ? `${Math.round(distKm * 1000)}m away`
      : `${distKm.toFixed(1)} km away`
    : null;


  return (
    <>
      <div className="nearby-backdrop" onClick={dismiss} />
      <div className={`nearby-prompt ${visible ? "nearby-prompt-visible" : ""}`}>
        <button className="nearby-prompt-close" onClick={dismiss} aria-label="Dismiss">
          <X size={16} />
        </button>

        {/* Step 1: Ask */}
        {step === "ask" && (
          <div className="nearby-prompt-step">
            <div className="nearby-prompt-icon-lg">
              <Church size={28} />
            </div>
            <h3 className="nearby-prompt-heading">Welcome to Christ's Heart!</h3>
            <p className="nearby-prompt-desc">Let's show you a Christ's Heart branch near you.</p>
            <div className="nearby-prompt-actions-col">
              <button className="btn btn-gold nearby-prompt-btn-full" onClick={() => setStep("select")}>
                <Church size={16} /> I know my branch
              </button>
              <button className="btn nearby-prompt-btn-full nearby-prompt-btn-loc" onClick={useMyLocation}>
                <MapPin size={16} /> Find nearest to me
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select Branch */}
        {step === "select" && (
          <div className="nearby-prompt-step">
            <h3 className="nearby-prompt-heading">Select Your Branch</h3>
            {locationError && (
              <div className="nearby-prompt-error">
                {locationError}
              </div>
            )}
            <div className="nearby-prompt-search">
              <input
                type="text"
                placeholder="Search by name or city..."
                value={branchSearch}
                onChange={(e) => setBranchSearch(e.target.value)}
                autoFocus
              />
            </div>
            <div className="nearby-prompt-list">
              {filteredBranches.map((b) => (
                <button key={b.id} className="nearby-prompt-list-item" onClick={() => selectBranch(b)}>
                  <div>
                    <span className="nearby-prompt-list-name">{b.name}</span>
                    <span className="nearby-prompt-list-city">{b.city}</span>
                  </div>
                  <ChevronRight size={16} />
                </button>
              ))}
              {filteredBranches.length === 0 && (
                <div className="nearby-prompt-list-empty">No branches found</div>
              )}
            </div>
            <button className="nearby-prompt-back" onClick={() => setStep("ask")}>
              ← Back
            </button>
          </div>
        )}

        {/* Step 2b: Locating */}
        {step === "locating" && (
          <div className="nearby-prompt-step" style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}>
            <div className="nearby-prompt-spinner" />
            <p className="nearby-prompt-desc">Getting your precise location...</p>
          </div>
        )}

        {/* Step 2c: Nearest results */}
        {step === "nearest" && nearestResults.length > 0 && (
          <div className="nearby-prompt-step">
            <h3 className="nearby-prompt-heading">Nearest Branches</h3>
            <p className="nearby-prompt-desc" style={{ marginBottom: "1rem" }}>We found these branches near you. Tap to select:</p>
            <div className="nearby-prompt-list">
              {nearestResults.map((r) => (
                <button key={r.branch.id} className="nearby-prompt-list-item" onClick={() => selectFromNearest(r)}>
                  <div>
                    <span className="nearby-prompt-list-name">{r.branch.name}</span>
                    <span className="nearby-prompt-list-city">
                      {r.branch.city} — {r.distKm < 1 ? `${Math.round(r.distKm * 1000)}m` : `${r.distKm.toFixed(1)} km`}
                    </span>
                  </div>
                  <Navigation size={14} />
                </button>
              ))}
            </div>
            <button className="nearby-prompt-back" onClick={() => setStep("select")}>
              Browse all branches
            </button>
          </div>
        )}

        {/* Step 3: Result */}
        {step === "result" && selectedBranch && (
          <div className="nearby-prompt-step">
            <div className="nearby-prompt-result-header">
              <div className="nearby-prompt-icon-sm">
                <Church size={18} />
              </div>
              <div>
                <div className="nearby-prompt-result-name">{selectedBranch.name}</div>
                {distText && (
                  <div className="nearby-prompt-distance">
                    <Navigation size={12} /> {distText}
                  </div>
                )}
              </div>
            </div>

            <div className="nearby-prompt-result-address">
              <MapPin size={14} />
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {selectedBranch.address}
              </a>
            </div>

            <div className="nearby-prompt-services">
              <div className="nearby-prompt-services-label">
                <Clock size={13} /> Services & Gatherings
              </div>
              {branchServices.length > 0 ? (
                branchServices.map((svc) => {
                  const Icon = SERVICE_ICONS[svc.id] || Clock;
                  return (
                    <Link
                      key={svc.id}
                      to={`/services/${svc.id}`}
                      className="nearby-prompt-service-item"
                      onClick={dismiss}
                    >
                      <Icon size={14} className="nearby-prompt-svc-icon" />
                      <div>
                        <span className="nearby-prompt-service-name">{svc.title}</span>
                        <span className="nearby-prompt-service-time">{svc.times}</span>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p style={{ fontSize: "0.78rem", color: "var(--text-light)", margin: "0.5rem 0 0", lineHeight: 1.5 }}>
                  Contact your branch for specific in-person service times.
                </p>
              )}
            </div>

            <div className="nearby-prompt-actions">
              <Link to={`/branches/${selectedBranch.id}`} className="btn btn-gold nearby-prompt-btn" onClick={dismiss}>
                View Branch
              </Link>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn nearby-prompt-btn nearby-prompt-btn-dir"
              >
                <Navigation size={14} /> Directions
              </a>
            </div>

            <button className="nearby-prompt-back" onClick={() => { setStep("ask"); setSelectedBranch(null); setDistKm(null); }}>
              ← Choose different branch
            </button>
          </div>
        )}
      </div>
    </>
  );
}
