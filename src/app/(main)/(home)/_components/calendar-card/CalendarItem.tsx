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
  const firstVisit = visits[0];
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
          "text-title-lg absolute inset-0 z-0 flex items-center justify-center font-bold",
          isToday && !isSelected
            ? "text-primary"
            : "",
          isSelected ? "text-white" : "",
        ].join(" ")}
      >
        {date.getDate()}
      </span>

      {firstVisit && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Image
            src={firstVisit.gymLogoUrl}
            alt={firstVisit.gymName}
            title={firstVisit.gymName}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-white object-cover"
            unoptimized
          />
        </div>
      )}
    </button>
  );
}
