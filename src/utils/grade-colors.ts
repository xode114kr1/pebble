export const gradeColors = {
  red: {
    label: "Red",
    color: "#EF4444",
  },
  orange: {
    label: "Orange",
    color: "#F97316",
  },
  yellow: {
    label: "Yellow",
    color: "#FACC15",
  },
  green: {
    label: "Green",
    color: "#22C55E",
  },
  blue: {
    label: "Blue",
    color: "#3B82F6",
  },
  navy: {
    label: "Navy",
    color: "#1E3A8A",
  },
  purple: {
    label: "Purple",
    color: "#A855F7",
  },
  brown: {
    label: "Brown",
    color: "#92400E",
  },
  black: {
    label: "Black",
    color: "#111827",
  },
  gray: {
    label: "Gray",
    color: "#6B7280",
  },
  white: {
    label: "White",
    color: "#F8FAFC",
  },
  pink: {
    label: "Pink",
    color: "#EC4899",
  },
} as const;

export type GradeColor = keyof typeof gradeColors;

export function withOpacity(hex: string, opacity: number) {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  return `${hex}${alpha}`;
}
