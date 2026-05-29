import Image from "next/image";
import { isSameDate } from "@/utils/date";
import { GymVisit } from "./calendar-dummy";

type CalendarItemProps = {
  date: Date;
  isCurrentMonth: boolean;
  today: Date;
  selectedDate: Date;
  visits: GymVisit[];
  onSelectDate: (date: Date) => void;
};

export default function CalendarItem({
  date,
  isCurrentMonth,
  today,
  selectedDate,
  visits,
  onSelectDate,
}: CalendarItemProps) {
  const isToday = isSameDate(date, today);
  const isSelected = isSameDate(date, selectedDate);

  return (
    <button
      type="button"
      onClick={() => onSelectDate(date)}
      className={[
        "relative flex min-h-16 flex-col items-center justify-start rounded-xl p-1.5 transition-colors",
        isSelected ? "bg-primary text-white" : "hover:bg-surface-container-low",
        !isCurrentMonth && !isSelected
          ? "text-on-surface-variant opacity-40"
          : "text-on-surface",
      ].join(" ")}
    >
      <span
        className={[
          "label-sm flex h-6 w-6 items-center justify-center rounded-full",
          isToday && !isSelected
            ? "bg-surface-container-highest text-primary font-bold"
            : "",
          isSelected ? "text-white" : "",
        ].join(" ")}
      >
        {date.getDate()}
      </span>

      {visits.length > 0 && (
        <div className="mt-1 flex max-w-full justify-center -space-x-1">
          {visits.slice(0, 3).map((visit) => (
            <Image
              key={visit.id}
              src={visit.gymLogoUrl}
              alt={visit.gymName}
              title={visit.gymName}
              width={20}
              height={20}
              className="h-5 w-5 rounded-full border border-white object-cover"
              unoptimized
            />
          ))}

          {visits.length > 3 && (
            <span className="label-sm flex h-5 w-5 items-center justify-center rounded-full bg-inverse-surface text-[10px] text-inverse-on-surface">
              +{visits.length - 3}
            </span>
          )}
        </div>
      )}
    </button>
  );
}
