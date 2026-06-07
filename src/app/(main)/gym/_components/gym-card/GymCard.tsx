import { MapPin } from "lucide-react";
import { GymPreview } from "../../types";

function DistributionBar({
  leftLabel,
  leftPercentage,
  rightLabel,
  rightPercentage,
}: {
  leftLabel: string;
  leftPercentage: number;
  rightLabel: string;
  rightPercentage: number;
}) {
  return (
    <div className="space-y-sm">
      <div className="label-sm flex items-center justify-between">
        <span className="text-primary">
          {leftLabel} {leftPercentage}%
        </span>
        <span className="text-secondary">
          {rightLabel} {rightPercentage}%
        </span>
      </div>
      <div className="flex h-2.5 overflow-hidden rounded-full bg-surface-container">
        <div
          className="h-full bg-primary"
          style={{ width: `${leftPercentage}%` }}
        />
        <div
          className="h-full bg-secondary"
          style={{ width: `${rightPercentage}%` }}
        />
      </div>
    </div>
  );
}

export default function GymCard({ gym }: { gym: GymPreview }) {
  return (
    <article className="group flex min-h-80 flex-col rounded-lg border border-outline-variant bg-card p-lg shadow-card transition-all hover:-translate-y-0.5 hover:border-primary-container hover:shadow-card-hover">
      <div className="min-w-0">
        <h3 className="font-headline text-xl font-semibold text-on-surface transition-colors group-hover:text-primary">
          {gym.name}
        </h3>
        <div className="body-sm mt-xs flex items-start gap-xs text-on-surface-variant">
          <MapPin size={15} className="mt-0.5 shrink-0" />
          <span>{gym.location}</span>
        </div>
      </div>

      <div
        className="mt-lg flex flex-wrap gap-sm border-y border-outline-variant py-md"
        aria-label="암장 난이도 색상"
      >
        {gym.gradeColors.map((color) => (
          <span
            key={color}
            className="size-6 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.16)]"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="mt-lg space-y-lg">
        <DistributionBar
          leftLabel="쉬움"
          leftPercentage={gym.easyPercentage}
          rightLabel="어려움"
          rightPercentage={gym.hardPercentage}
        />
        <DistributionBar
          leftLabel="스테틱"
          leftPercentage={gym.staticPercentage}
          rightLabel="다이나믹"
          rightPercentage={gym.dynamicPercentage}
        />
      </div>

    </article>
  );
}
