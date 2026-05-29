const summaryItems = [
  { label: "Height", value: "175cm" },
  { label: "Arm Reach", value: "178cm" },
  { label: "Visits", value: "12" },
  { label: "Total Time", value: "18h 30m" },
];

type SummaryItemProps = {
  item: {
    label: string;
    value: string;
  };
};

function SummaryItem({ item }: SummaryItemProps) {
  return (
    <div className="min-w-0">
      <span className="text-label-sm mb-1 block truncate uppercase tracking-wider text-on-surface-variant">
        {item.label}
      </span>

      <span className="text-body-lg font-bold block truncate text-on-surface">
        {item.value}
      </span>
    </div>
  );
}

export default function SummaryCard() {
  return (
    <section className="card-interactive relative overflow-hidden md:col-span-8">
      <div className="absolute left-0 top-0 h-1 w-full bg-primary" />
      <div className="mb-xl flex items-start">
        <h2 className="text-headline-md text-on-surface">내 정보</h2>
      </div>
      <div className="flex justify-between">
        {summaryItems.map((item) => (
          <SummaryItem key={item.label} item={item} />
        ))}
      </div>
    </section>
  );
}
