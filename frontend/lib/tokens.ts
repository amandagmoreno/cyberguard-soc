export const T = {
  // Backgrounds
  bg0:      "#04070E",
  bg1:      "#080C18",
  bg2:      "#0C1120",
  bg3:      "#111827",

  // Borders
  border:   "#182035",
  borderHi: "#243050",

  // Brand
  violet:    "#7C3AED",
  violetLo:  "#7C3AED18",
  violetMid: "#7C3AED35",
  violetGlow:"0 0 20px #7C3AED40",

  // Severity
  critical: "#EF4444",
  high:     "#F97316",
  medium:   "#EAB308",
  low:      "#3B82F6",
  success:  "#10B981",
  info:     "#06B6D4",

  // Text
  text0:    "#F1F5F9",
  text1:    "#8899B4",
  text2:    "#3D5070",
} as const;

export const SEV_META = {
  CRITICAL: { color: "#EF4444", bg: "#EF444415", border: "#EF444440" },
  HIGH:     { color: "#F97316", bg: "#F9731615", border: "#F9731640" },
  MEDIUM:   { color: "#EAB308", bg: "#EAB30815", border: "#EAB30840" },
  LOW:      { color: "#3B82F6", bg: "#3B82F615", border: "#3B82F640" },
} as const;

export type SevKey = keyof typeof SEV_META;
