import { MapPinOff, SearchX } from "lucide-react";
import Link from "next/link";

export default function GymEmptyState({ query }: { query: string }) {
  const hasSearchQuery = Boolean(query.trim());
  const Icon = hasSearchQuery ? SearchX : MapPinOff;

  return (
    <section className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest px-lg py-2xl text-center shadow-card">
      <div className="flex size-12 items-center justify-center rounded-full bg-surface-container text-primary">
        <Icon size={22} />
      </div>

      <h2 className="headline-md mt-md text-on-surface">
        {hasSearchQuery
          ? `"${query}" 검색 결과가 없습니다`
          : "등록된 암장이 없습니다"}
      </h2>

      <p className="body-sm mt-xs text-on-surface-variant">
        {hasSearchQuery
          ? "다른 암장 이름, 브랜드명 또는 지역으로 다시 검색해보세요."
          : "암장이 등록되면 이곳에서 확인할 수 있습니다."}
      </p>

      {hasSearchQuery ? (
        <Link href="/gym" className="btn-secondary mt-lg">
          검색어 초기화
        </Link>
      ) : null}
    </section>
  );
}
