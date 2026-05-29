import { GradeColor, gradeColors, withOpacity } from "@/utils/grade-colors";

const successRates: {
  color: GradeColor;
  rate: number;
}[] = [
  { color: "red", rate: 95 },
  { color: "orange", rate: 82 },
  { color: "yellow", rate: 70 },
  { color: "green", rate: 55 },
  { color: "blue", rate: 40 },
  { color: "navy", rate: 28 },
  { color: "purple", rate: 15 },
];

type SuccessRateItemProps = {
  item: {
    color: GradeColor;
    rate: number;
  };
};

function SuccessRateItem({ item }: SuccessRateItemProps) {
  const gradeColor = gradeColors[item.color];
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-label-md text-on-surface">
          {gradeColor.label}
        </span>
        <span
          className="text-label-md font-bold"
          style={{ color: gradeColor.color }}
        >
          {item.rate}%
        </span>
      </div>
      <div
        className="progress"
        style={{
          backgroundColor: withOpacity(gradeColor.color, 0.18),
        }}
      >
        <div
          className="progress-fill"
          style={{
            width: `${item.rate}%`,
            backgroundColor: gradeColor.color,
          }}
        />
      </div>
    </div>
  );
}

export default function RecentSuccessRate() {
  return (
    <section className="card lg:col-span-4">
      <h2 className="text-headline-md mb-lg text-on-surface">Recent</h2>
      <div className="space-y-4">
        {successRates.slice(0, 4).map((item) => (
          <SuccessRateItem key={item.color} item={item} />
        ))}
      </div>
    </section>
  );
}
