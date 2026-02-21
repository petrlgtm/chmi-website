import {
  Heart,
  Gift,
  HandCoins,
  Sprout,
  Church,
  BookOpen,
  Star,
  Users,
  Flame,
  Headphones,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  Gift,
  HandCoins,
  Sprout,
  Church,
  BookOpen,
  Star,
  Users,
  Flame,
  Headphones,
};

export function resolveIcon(name: string | null | undefined): LucideIcon {
  if (!name) return Heart;
  return ICON_MAP[name] ?? Heart;
}
