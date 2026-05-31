import { GradeColor } from "@/types/gym";

export default function GradeColorDot({ color }: { color: GradeColor }) {
  return (
    <div
      title={color.name}
      className="h-3 w-3 rounded-full border border-outline-variant"
      style={{ backgroundColor: color.color }}
    />
  );
}
