"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { dummyVisits, GymVisit } from "./calendar-dummy";
import CalendarItem from "./CalendarItem";
import { formatDateKey, getCalendarDays } from "@/utils/date";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarCard() {
  const today = useMemo(() => new Date(), []);
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);

  const calendarDays = useMemo(
    () => getCalendarDays(currentDate),
    [currentDate],
  );

  const visitMap = useMemo(() => {
    return dummyVisits.reduce<Record<string, GymVisit[]>>((acc, visit) => {
      if (!acc[visit.date]) {
        acc[visit.date] = [];
      }

      acc[visit.date].push(visit);
      return acc;
    }, {});
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  return (
    <section className="card md:col-span-8">
      <div className="mb-lg flex items-center justify-between">
        <div>
          <h2 className="headline-md text-on-surface">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <p className="label-sm mt-1 text-on-surface-variant">history</p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="이전 달"
            onClick={handlePrevMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <ChevronLeft size={18} strokeWidth={2.25} />
          </button>

          <button
            type="button"
            aria-label="다음 달"
            onClick={handleNextMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <ChevronRight size={18} strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weekDays.map((weekDay) => (
          <span
            key={weekDay}
            className="label-sm py-1 text-on-surface-variant opacity-60"
          >
            {weekDay}
          </span>
        ))}

        {calendarDays.map(({ date, isCurrentMonth }) => {
          const dateKey = formatDateKey(date);

          return (
            <CalendarItem
              key={dateKey}
              date={date}
              isCurrentMonth={isCurrentMonth}
              today={today}
              selectedDate={selectedDate}
              visits={visitMap[dateKey] ?? []}
              onSelectDate={setSelectedDate}
            />
          );
        })}
      </div>
    </section>
  );
}
