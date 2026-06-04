"use client";

import useDebounce from "@/hooks/useDebounce";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

type AdminGymHeaderProps = {
  query: string;
  onCreateGymClick: () => void;
};

export default function AdminGymHeader({
  query,
  onCreateGymClick,
}: AdminGymHeaderProps) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(query);
  const debouncedKeyword = useDebounce(keyword, 300);

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    const trimmedKeyword = debouncedKeyword.trim();
    const trimmedQuery = query.trim();

    if (trimmedKeyword === trimmedQuery) {
      return;
    }

    if (!trimmedKeyword) {
      router.push("/admin/gyms");
      return;
    }

    router.push(`/admin/gyms?query=${encodeURIComponent(trimmedKeyword)}`);
  }, [debouncedKeyword, query, router]);

  return (
    <header className="mb-8 flex flex-col gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:w-105">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
        />

        <input
          name="query"
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="브랜드명, 지점명, 위치로 검색"
          className="w-full rounded-xl border border-outline-variant bg-background py-3 pl-12 pr-4 text-sm font-medium text-on-surface outline-none transition-all placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex w-full gap-3 lg:w-auto">
        <button
          type="button"
          onClick={onCreateGymClick}
          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-on-primary transition-all hover:opacity-90 lg:flex-none"
        >
          <Plus size={16} className="shrink-0" />
          암장 지점 등록
        </button>
      </div>
    </header>
  );
}
