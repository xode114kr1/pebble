import { MapPin } from "lucide-react";
import { GymBranchListItem } from "@/types/gym";

const DEFAULT_DISTRIBUTIONS = {
  difficulty: {
    leftPercentage: 50,
    rightPercentage: 50,
  },
  movement: {
    leftPercentage: 50,
    rightPercentage: 50,
  },
};

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

export default function GymCard({ gym }: { gym: GymBranchListItem }) {
  return (
    <article className="group flex min-h-80 flex-col rounded-lg border border-outline-variant bg-card p-lg shadow-card transition-all hover:-translate-y-0.5 hover:border-primary-container hover:shadow-card-hover">
      <div className="min-w-0">
        <h3 className="font-headline text-xl font-semibold text-on-surface transition-colors group-hover:text-primary">
          {gym.brand.name} {gym.branchName}
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
        {gym.brand.gradeColors.map((color) => (
          <span
            key={color.id}
            title={color.name}
            className="size-6 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.16)]"
            style={{ backgroundColor: color.color }}
          />
        ))}
      </div>

      <div className="mt-lg space-y-lg">
        <DistributionBar
          leftLabel="쉬움"
          leftPercentage={DEFAULT_DISTRIBUTIONS.difficulty.leftPercentage}
          rightLabel="어려움"
          rightPercentage={DEFAULT_DISTRIBUTIONS.difficulty.rightPercentage}
        />
        <DistributionBar
          leftLabel="스테틱"
          leftPercentage={DEFAULT_DISTRIBUTIONS.movement.leftPercentage}
          rightLabel="다이나믹"
          rightPercentage={DEFAULT_DISTRIBUTIONS.movement.rightPercentage}
        />
      </div>
    </article>
  );
}
