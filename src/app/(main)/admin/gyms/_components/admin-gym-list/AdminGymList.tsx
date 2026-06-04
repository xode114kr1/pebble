import Link from "next/link";
import { GymBranchWithBrand } from "../../types/adminGym";
import AdminGymItem from "./AdminGymItem";

export default function AdminGymList({
  gymlist,
  query,
}: {
  gymlist: GymBranchWithBrand[];
  query: string;
}) {
  const hasSearchQuery = Boolean(query.trim());

  return (
    <section className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-card">
      <table className="w-full border-collapse text-left">
        <thead className="border-b border-outline-variant bg-surface-container-low">
          <tr>
            <th className="label-sm px-sm py-md uppercase text-on-surface-variant sm:px-lg">
              브랜드명
            </th>
            <th className="label-sm px-sm py-md uppercase text-on-surface-variant sm:px-lg">
              지점명
            </th>
            <th className="label-sm hidden px-lg py-md uppercase text-on-surface-variant lg:table-cell">
              위치
            </th>
            <th className="label-sm hidden px-lg py-md uppercase text-on-surface-variant lg:table-cell">
              난이도 색상 목록
            </th>
            <th className="label-sm px-sm py-md uppercase text-on-surface-variant sm:px-lg">
              등록일
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-outline-variant">
          {gymlist.length > 0 ? (
            gymlist.map((branch) => (
              <AdminGymItem key={branch.id} branch={branch} />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-lg py-16">
                <EmptyGymState hasSearchQuery={hasSearchQuery} />
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex flex-col gap-md border-t border-outline-variant bg-surface-container-lowest px-lg py-md sm:flex-row sm:items-center sm:justify-between">
        <p className="label-sm text-on-surface-variant">
          Showing {gymlist.length > 0 ? 1 : 0} to {gymlist.length} of{" "}
          {gymlist.length} entries
        </p>

        <div className="flex justify-end gap-sm">
          <button
            type="button"
            disabled
            className="rounded-lg border border-outline-variant px-sm py-xs text-on-surface-variant opacity-50"
          >
            이전
          </button>

          <button
            type="button"
            className="label-sm rounded-lg bg-primary px-md py-xs text-on-primary"
          >
            1
          </button>

          <button
            type="button"
            disabled
            className="rounded-lg border border-outline-variant px-sm py-xs text-on-surface-variant opacity-50"
          >
            다음
          </button>
        </div>
      </div>
    </section>
  );
}

function EmptyGymState({ hasSearchQuery }: { hasSearchQuery: boolean }) {
  if (hasSearchQuery) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="space-y-2">
          <p className="font-headline text-title-md text-on-surface">
            검색 결과가 없습니다.
          </p>
          <p className="text-body-sm text-on-surface-variant">
            다른 브랜드명, 지점명, 위치로 다시 검색해보세요.
          </p>
        </div>

        <Link
          href="/admin/gyms"
          className="rounded-lg border border-primary px-4 py-2 font-label text-label-md text-primary transition-colors hover:bg-surface-container-low"
        >
          검색어 초기화
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-2 text-center">
      <p className="font-headline text-title-md text-on-surface">
        등록된 암장 지점이 없습니다.
      </p>
      <p className="text-body-sm text-on-surface-variant">
        암장 지점 등록 버튼으로 첫 지점을 추가해보세요.
      </p>
    </div>
  );
}
